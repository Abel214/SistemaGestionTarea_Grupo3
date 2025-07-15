from django.apps import AppConfig


class TareasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    # Ajustamos el nombre del módulo para incluir el prefijo del proyecto
    name = 'tareas'

    def ready(self):
        # Importamos los signals aquí para asegurarnos de que se registren
        # cuando la aplicación esté lista.
        import tareas.signals