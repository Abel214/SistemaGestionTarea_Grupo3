from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UsuarioProfile

User = get_user_model()


@receiver(post_save, sender=User)
def crear_profile(sender, instance, created, **kwargs):
    if created:
        UsuarioProfile.objects.create(
            user=instance,
            nombre=instance.first_name,
            apellido=instance.last_name,
            dni='',
        )
