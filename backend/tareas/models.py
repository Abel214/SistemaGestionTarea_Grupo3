from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError


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

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.get_rol_display()})"


class Ciclo(models.Model):
    nombre = models.CharField(max_length=100)
    is_activo = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre


class PeriodoCiclo(models.Model):
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE, related_name='periodos')
    periodo_inicio = models.DateField()
    periodo_fin = models.DateField()

    def __str__(self):
        return f"{self.ciclo.nombre} ({self.periodo_inicio} - {self.periodo_fin})"


class Asignatura(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    periodo = models.ForeignKey(PeriodoCiclo, on_delete=models.CASCADE, related_name='asignaturas')

    def __str__(self):
        return self.nombre


class Paralelo(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='paralelos')
    nombre = models.CharField(max_length=50)
    docente = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='paralelos_docente'
    )
    estudiantes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='UsuarioParalelo',
        related_name='paralelos_estudiante'
    )

    def get_cant_estudiantes(self):
        return self.estudiantes.count()

    def __str__(self):
        return f"{self.asignatura.nombre} - {self.nombre}"


class UsuarioParalelo(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inscripciones'
    )
    paralelo = models.ForeignKey(
        Paralelo,
        on_delete=models.CASCADE,
        related_name='inscripciones'
    )
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario} en {self.paralelo}"


class GrupoTrabajo(models.Model):
    paralelo = models.ForeignKey(
        Paralelo,
        on_delete=models.CASCADE,
        related_name='grupos_trabajo'
    )
    nombre = models.CharField(max_length=100)
    max_estudiantes = models.PositiveIntegerField()
    estudiantes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='grupos_trabajo'
    )

    def clean(self):
        for estudiante in self.estudiantes.all():
            if getattr(estudiante, 'profile', None) and estudiante.profile.rol != 'EST':
                raise ValidationError("Solo usuarios con rol ESTUDIANTE pueden agregarse al grupo.")
        if self.estudiantes.count() > self.max_estudiantes:
            raise ValidationError("Número de estudiantes supera el máximo permitido.")

    def __str__(self):
        return f"{self.nombre} ({self.paralelo})"


class Reporte(models.Model):
    responsable = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reportes'
    )
    fecha = models.DateField(auto_now_add=True)
    ciclo = models.ForeignKey(
        Ciclo,
        on_delete=models.CASCADE,
        related_name='reportes'
    )
    asignatura = models.ForeignKey(
        Asignatura,
        on_delete=models.CASCADE,
        related_name='reportes'
    )

    def __str__(self):
        return f"Reporte {self.asignatura.nombre} - {self.ciclo.nombre} ({self.fecha})"


class Archivo(models.Model):
    file = models.FileField(upload_to='archivos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name


class Tipo(models.TextChoices):
    TPE = 'TPE', 'Aprendizaje práctico experimental'
    ACD = 'ACD', 'Aprendizaje en contacto con el docente'
    AA = 'AA', 'Aprendizaje autónomo'


class Tarea(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    fecha_limite = models.DateField()
    tipo = models.CharField(max_length=3, choices=Tipo.choices)
    adjuntos = models.ManyToManyField(Archivo, blank=True, related_name='tareas')
    grupos_asignados = models.ManyToManyField(GrupoTrabajo, blank=True, related_name='tareas')
    estudiantes_asignados = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='tareas_asignadas'
    )

    def clean(self):
        for usuario in self.estudiantes_asignados.all():
            if getattr(usuario, 'profile', None) and usuario.profile.rol != 'EST':
                raise ValidationError("Solo usuarios con rol ESTUDIANTE pueden asignarse a la tarea.")

    def __str__(self):
        return self.titulo


class Entrega(models.Model):
    tarea = models.OneToOneField(
        Tarea,
        on_delete=models.CASCADE,
        related_name='entrega',
        null=True,
        blank=True
    )
    adjuntos = models.ManyToManyField(Archivo, blank=True, related_name='entregas')
    is_calificada = models.BooleanField(default=False)
    calificacion = models.FloatField(null=True, blank=True)
    retroalimentacion = models.TextField(blank=True)
    retroalimentacion_adjuntos = models.ManyToManyField(
        Archivo,
        blank=True,
        related_name='entregas_retro'
    )

    def __str__(self):
        return f"Entrega de {self.tarea}"
