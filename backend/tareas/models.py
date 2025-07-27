from time import timezone

from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.core.validators import MinValueValidator, MaxValueValidator

class Persona(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=20, unique=True)

    class Meta:
        abstract = True


class UsuarioProfile(Persona):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )

    rol = models.CharField(
        max_length=3,
        choices=[
            ('EST', 'Estudiante'),
            ('DOC', 'Docente'),
            ('ADM', 'Administrador'),
            ('OBS', 'Observador'),
        ],
        default='EST'
    )
    ciclo = models.ForeignKey('Ciclo', null=True, blank=True, on_delete=models.SET_NULL, related_name='usuarios')

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.get_rol_display()})"


class Ciclo(models.Model):
    nombre = models.CharField(max_length=100)
    is_activo = models.BooleanField(default=False)
    codigo = models.CharField(max_length=30, unique=True)
    numero = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    estudiantes_totales = models.PositiveIntegerField(
        null=True, blank=True, default=None
    )

    def __str__(self):
        return self.nombre


class PeriodoCiclo(models.Model):
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE, related_name='periodos')
    periodo_inicio = models.DateField()
    periodo_fin = models.DateField()
    is_actual = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_actual:
            # Solo un periodo actual por ciclo
            PeriodoCiclo.objects.filter(ciclo=self.ciclo, is_actual=True).update(is_actual=False)
        super().save(*args, **kwargs)

    @property
    def es_actual(self) -> bool:
        """Retorna True si hoy está dentro del rango de este periodo"""
        today = timezone.now().date()
        return self.periodo_inicio <= today <= self.periodo_fin

    def __str__(self):
        return f"{self.ciclo.nombre} ({self.periodo_inicio} - {self.periodo_fin})"


class Asignatura(models.Model):
    codigo = models.CharField(max_length=20, unique=True, verbose_name="Código")
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField(blank=True)
    periodo = models.ForeignKey('PeriodoCiclo', on_delete=models.CASCADE, related_name='asignaturas')
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE, related_name='asignaturas')
    unidades_totales = models.PositiveSmallIntegerField("Unidades totales", validators=[MinValueValidator(1)],
                                                        null=True, blank=True)
    horas_programadas = models.PositiveSmallIntegerField("Horas programadas", validators=[MinValueValidator(1)],
                                                         null=True, blank=True)
    is_activa = models.BooleanField(default=True)
    docentes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='asignaturas_docente', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("codigo",)

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"


class Paralelo(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='paralelos')
    nombre = models.CharField(max_length=50)
    docente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                                related_name='paralelos_docente')
    estudiantes = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UsuarioParalelo',
                                         related_name='paralelos_estudiante')

    def get_cant_estudiantes(self):
        return self.estudiantes.count()

    def __str__(self):
        return f"{self.asignatura.nombre} - {self.nombre}"


class UsuarioParalelo(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='inscripciones')
    paralelo = models.ForeignKey(Paralelo, on_delete=models.CASCADE, related_name='inscripciones')
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario} en {self.paralelo}"


class GrupoTrabajo(models.Model):
    paralelo = models.ForeignKey(Paralelo, on_delete=models.CASCADE, related_name='grupos_trabajo')
    nombre = models.CharField(max_length=100)
    max_estudiantes = models.PositiveIntegerField()
    estudiantes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='grupos_trabajo')

    def clean(self):
        for estudiante in self.estudiantes.all():
            if getattr(estudiante, 'profile', None) and estudiante.profile.rol != 'EST':
                raise ValidationError("Solo estudiantes pueden agregarse al grupo.")
        if self.estudiantes.count() > self.max_estudiantes:
            raise ValidationError("Número de estudiantes supera el máximo permitido.")

    def __str__(self):
        return f"{self.nombre} ({self.paralelo})"


class Archivo(models.Model):
    file = models.FileField(upload_to='archivos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.file.name


class Reporte(models.Model):
    responsable = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reportes')
    fecha = models.DateField(auto_now_add=True)
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE, related_name='reportes')
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='reportes')

    def __str__(self):
        return f"Reporte {self.asignatura.nombre} - {self.ciclo.nombre} ({self.fecha})"


# --- Tipos de Tarea ---
class Tipo(models.TextChoices):
    TPE = 'TPE', 'Aprendizaje práctico experimental'
    ACD = 'ACD', 'Aprendizaje en contacto con el docente'
    AA = 'AA', 'Aprendizaje autónomo'


# --- Tarea ---
class Tarea(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    fecha_limite = models.DateField()
    tipo = models.CharField(max_length=3, choices=Tipo.choices)
    unidad = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    ponderacion = models.FloatField(validators=[MinValueValidator(0.1)],
                                    help_text="Peso que aporta esta tarea dentro de su tipo")
    creada_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tareas_creadas')
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='tareas')
    adjuntos = models.ManyToManyField(Archivo, blank=True, related_name='tareas')
    grupos_asignados = models.ManyToManyField(GrupoTrabajo, blank=True, related_name='tareas')
    estudiantes_asignados = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True,
                                                   related_name='tareas_asignadas')

    def clean(self):
        LIMITE_TIPO = {'ACD': 2.0, 'TPE': 2.5, 'AA': 2.0}
        tareas_existentes = Tarea.objects.filter(
            tipo=self.tipo,
            unidad=self.unidad,
            asignatura=self.asignatura
        ).exclude(pk=self.pk)

        suma_ponderacion = sum(t.ponderacion for t in tareas_existentes)
        if suma_ponderacion + self.ponderacion > LIMITE_TIPO[self.tipo]:
            raise ValidationError(
                f"Ponderación total para {self.get_tipo_display()} en la unidad {self.unidad} excede {LIMITE_TIPO[self.tipo]}")

        if self.creada_por.profile.rol != 'DOC':
            raise ValidationError("Solo los docentes pueden crear tareas.")

    def __str__(self):
        return self.titulo


# --- Entrega ---
class Entrega(models.Model):
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name='entregas')
    estudiante = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='entregas')
    adjuntos = models.ManyToManyField(Archivo, blank=True, related_name='entregas')
    is_calificada = models.BooleanField(default=False)
    calificacion = models.FloatField(null=True, blank=True, validators=[MaxValueValidator(6.5)])
    retroalimentacion = models.TextField(blank=True)
    retroalimentacion_adjuntos = models.ManyToManyField(Archivo, blank=True, related_name='entregas_retro')

    class Meta:
        unique_together = ('tarea', 'estudiante')

    def clean(self):
        if self.calificacion and self.calificacion > 6.5:
            raise ValidationError("La calificación no puede superar los 6.5 puntos.")

    def __str__(self):
        return f"Entrega de {self.estudiante} - {self.tarea}"
