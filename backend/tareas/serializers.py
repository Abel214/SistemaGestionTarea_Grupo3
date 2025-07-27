from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    UsuarioProfile, Ciclo, PeriodoCiclo, Asignatura, Paralelo,
    UsuarioParalelo, GrupoTrabajo, Reporte, Archivo, Tarea, Entrega
)
from .services import crear_usuario_profile

User = get_user_model()


class UserRegistrationSerializer(serializers.Serializer):
    nombre = serializers.CharField()
    apellido = serializers.CharField()
    dni = serializers.CharField()
    correo = serializers.EmailField()
    contraseña = serializers.CharField(write_only=True)
    ciclo = serializers.PrimaryKeyRelatedField(queryset=Ciclo.objects.filter(is_activo=True), required=False)

    def create(self, validated_data):
        return crear_usuario_profile(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            dni=validated_data['dni'],
            correo=validated_data['correo'],
            contraseña=validated_data['contraseña'],
            rol='EST',
            ciclo=validated_data.get('ciclo')
        )


class StaffRegistrationSerializer(serializers.Serializer):
    nombre = serializers.CharField()
    apellido = serializers.CharField()
    dni = serializers.CharField()
    correo = serializers.EmailField()
    contraseña = serializers.CharField(write_only=True)
    rol = serializers.ChoiceField(choices=UsuarioProfile._meta.get_field('rol').choices)
    ciclo = serializers.PrimaryKeyRelatedField(
        queryset=Ciclo.objects.all(),
        required=False,
        allow_null=True
    )

    def validate(self, attrs):
        rol = attrs.get('rol')
        ciclo = attrs.get('ciclo')

        # Si es DOC u OBS, ciclo es obligatorio
        if rol in ['DOC', 'OBS'] and not ciclo:
            raise serializers.ValidationError({
                'ciclo': 'Este campo es obligatorio para docentes y observadores.'
            })

        # Si es ADM, se fuerza ciclo a None aunque lo envíen
        if rol == 'ADM':
            attrs['ciclo'] = None

        return attrs

    def create(self, validated_data):
        return crear_usuario_profile(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            dni=validated_data['dni'],
            correo=validated_data['correo'],
            contraseña=validated_data['contraseña'],
            rol=validated_data['rol'],
            ciclo=validated_data.get('ciclo')  # Será None si es ADM
        )

class UserProfileSerializer(serializers.ModelSerializer):
    correo = serializers.EmailField(source='user.email', required=False)
    is_active = serializers.BooleanField(source='user.is_active', required=False)
    ciclo = serializers.PrimaryKeyRelatedField(queryset=Ciclo.objects.all(), required=False)

    class Meta:
        model = UsuarioProfile
        fields = ['id', 'nombre', 'apellido', 'dni', 'rol', 'correo', 'is_active', 'ciclo']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        user = instance.user
        if 'email' in user_data:
            user.email = user_data['email']
            user.username = user_data['email']
        if 'is_active' in user_data:
            user.is_active = user_data['is_active']
        user.save()

        return instance


class PasswordRecoverySerializer(serializers.Serializer):
    correo = serializers.EmailField()

    def validate_correo(self, value):
        if not User.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("No existe una cuenta activa con ese correo.")
        return value


class CicloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo
        fields = ['id', 'codigo', 'numero', 'nombre', 'estudiantes_totales', 'is_activo', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_numero(self, value):
        if value <= 0:
            raise serializers.ValidationError("El número del ciclo debe ser mayor que 0.")
        return value


class PeriodoCicloSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodoCiclo
        fields = '__all__'

    def validate(self, attrs):
        if attrs['periodo_fin'] <= attrs['periodo_inicio']:
            raise serializers.ValidationError("La fecha fin debe ser mayor a la fecha inicio.")
        return attrs


class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = [
            'id', 'codigo', 'nombre', 'descripcion', 'periodo', 'ciclo',
            'unidades_totales', 'horas_programadas', 'is_activa',
            'docentes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class ParaleloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paralelo
        fields = ['id', 'asignatura', 'nombre', 'docente', 'estudiantes']


class UsuarioParaleloSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioParalelo
        fields = '__all__'


class GrupoTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoTrabajo
        fields = '__all__'


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'


class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = '__all__'


class TareaSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Tarea
        fields = [
            'id', 'titulo', 'descripcion', 'fecha_limite', 'tipo', 'tipo_display',
            'unidad', 'creada_por', 'asignatura',
            'adjuntos', 'grupos_asignados', 'estudiantes_asignados'
        ]  # 👈 se eliminó 'ponderacion'
        read_only_fields = ['creada_por']


class EntregaSerializer(serializers.ModelSerializer):
    def validate_calificacion(self, value):
        if value is not None:
            if value < 0 or value > 10:
                raise serializers.ValidationError("La calificación debe estar entre 0 y 10 puntos.")
        return value

    class Meta:
        model = Entrega
        fields = [
            'id', 'tarea', 'estudiante', 'adjuntos',
            'is_calificada', 'calificacion',
            'retroalimentacion', 'retroalimentacion_adjuntos'
        ]
