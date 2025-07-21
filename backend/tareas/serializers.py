from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UsuarioProfile
from .services import crear_usuario_profile
from .models import (
    Ciclo, PeriodoCiclo, Asignatura, Paralelo,
    UsuarioParalelo, GrupoTrabajo, Reporte,
    Archivo, Tarea, Entrega
)

User = get_user_model()


class UserRegistrationSerializer(serializers.Serializer):
    nombre = serializers.CharField()
    apellido = serializers.CharField()
    dni = serializers.CharField()
    correo = serializers.EmailField()
    contraseña = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return crear_usuario_profile(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            dni=validated_data['dni'],
            correo=validated_data['correo'],
            contraseña=validated_data['contraseña'],
            rol=UsuarioProfile.Rol.ESTUDIANTE
        )


class StaffRegistrationSerializer(serializers.Serializer):
    nombre = serializers.CharField()
    apellido = serializers.CharField()
    dni = serializers.CharField()
    correo = serializers.EmailField()
    contraseña = serializers.CharField(write_only=True)
    rol = serializers.ChoiceField(
        choices=UsuarioProfile._meta.get_field('rol').choices
    )

    def create(self, validated_data):
        return crear_usuario_profile(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            dni=validated_data['dni'],
            correo=validated_data['correo'],
            contraseña=validated_data['contraseña'],
            rol=validated_data['rol'],
        )


class UserProfileSerializer(serializers.ModelSerializer):
    correo = serializers.EmailField(source='user.email', required=False)
    is_active = serializers.BooleanField(source='user.is_active', required=False)

    class Meta:
        model = UsuarioProfile
        fields = [
            'id',
            'nombre',
            'apellido',
            'dni',
            'rol',
            'correo',
            'is_active',
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        user = instance.user
        if 'email' in user_data:
            nuevo = user_data['email']
            user.email = nuevo
            user.username = nuevo
        if 'is_active' in user_data:
            user.is_active = user_data['is_active']
        user.save()

        return instance


class PasswordRecoverySerializer(serializers.Serializer):
    correo = serializers.EmailField()

    def validate_correo(self, value):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        if not User.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("No existe una cuenta activa con ese correo.")
        return value


class CicloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo
        fields = '__all__'


class PeriodoCicloSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodoCiclo
        fields = '__all__'


class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = '__all__'


class ParaleloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paralelo
        fields = '__all__'


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
    class Meta:
        model = Tarea
        fields = '__all__'


class EntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = '__all__'
