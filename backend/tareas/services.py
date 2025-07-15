from django.contrib.auth import get_user_model
from .models import UsuarioProfile
from django.core.mail import send_mail

User = get_user_model()


def crear_usuario_profile(nombre, apellido, dni, correo, contraseña, rol='EST'):
    """
    Crea un User y su perfil asociado.
    """
    user = User.objects.create_user(
        username=correo,
        email=correo,
        password=contraseña,
        first_name=nombre,
        last_name=apellido
    )
    profile = UsuarioProfile.objects.create(
        user=user,
        nombre=nombre,
        apellido=apellido,
        dni=dni,
        rol=rol
    )
    return profile


def enviar_recuperacion_clave(profile):
    send_mail(
        subject="Recuperación de contraseña",
        message="Visita este enlace para restablecer tu contraseña...",
        from_email="no-reply@tuapp.com",
        recipient_list=[profile.user.email],
    )
