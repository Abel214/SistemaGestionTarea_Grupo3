from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import UsuarioProfile
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .serializers import UserProfileSerializer, UserRegistrationSerializer, StaffRegistrationSerializer, \
    PasswordRecoverySerializer

from .models import (
    Ciclo, PeriodoCiclo, Asignatura, Paralelo,
    UsuarioParalelo, GrupoTrabajo, Reporte,
    Archivo, Tarea, Entrega
)
from .serializers import (
    CicloSerializer, PeriodoCicloSerializer, AsignaturaSerializer,
    ParaleloSerializer, UsuarioParaleloSerializer, GrupoTrabajoSerializer,
    ReporteSerializer, ArchivoSerializer, TareaSerializer, EntregaSerializer
)
from .services import enviar_recuperacion_clave


class RegisterStudentView(APIView):
    """Permite a un estudiante registrarse a sí mismo"""
    permission_classes = []
    authentication_classes = []

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            return Response({
                'id': profile.user.id,
                'correo': profile.user.email,
                'rol': profile.rol,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterStaffView(APIView):
    """Permite al adminsitrador registrar usuarios"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        print("Usuario:", request.user, "is_authenticated:", request.user.is_authenticated, "is_staff:",
              request.user.is_staff)
        print("Usuario:", request.user, "¿Es admin?", request.user.is_staff)
        serializer = StaffRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            return Response({
                'success': True,
                'data': {
                    'id': profile.user.id,
                    'correo': profile.user.email,
                    'rol': profile.rol,
                }
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    """
    GET    /users/           → lista todos los perfiles
    GET    /users/{pk}/      → detalle de un perfil
    PUT    /users/{pk}/      → edita perfil + user (correo, is_active)
    PATCH  /users/{pk}/      → edita parcialmente
    DELETE /users/{pk}/      → desactiva la cuenta (soft-delete)
    """
    queryset = UsuarioProfile.objects.select_related('user').all()
    serializer_class = UserProfileSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        profile = self.get_object()
        profile.user.is_active = False
        profile.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordRecoveryView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None):
        serializer = PasswordRecoverySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        correo = serializer.validated_data['correo']
        try:
            profile = UsuarioProfile.objects.get(user__email=correo, user__is_active=True)
        except UsuarioProfile.DoesNotExist:
            # Aunque valide_correo ya lo comprueba, protegemos contra race conditions
            return Response(
                {"correo": ["No existe una cuenta activa con ese correo."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        enviar_recuperacion_clave(profile)

        return Response(
            {
                "detail": "Si existe una cuenta con ese correo, te hemos enviado instrucciones para restablecer la contraseña."},
            status=status.HTTP_200_OK
        )


class CicloViewSet(viewsets.ModelViewSet):
    queryset = Ciclo.objects.all()
    serializer_class = CicloSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class PeriodoCicloViewSet(viewsets.ModelViewSet):
    queryset = PeriodoCiclo.objects.all()
    serializer_class = PeriodoCicloSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class ParaleloViewSet(viewsets.ModelViewSet):
    queryset = Paralelo.objects.all()
    serializer_class = ParaleloSerializer
    permission_classes = [IsAdminUser]


class UsuarioParaleloViewSet(viewsets.ModelViewSet):
    queryset = UsuarioParalelo.objects.all()
    serializer_class = UsuarioParaleloSerializer
    permission_classes = [IsAdminUser]


class GrupoTrabajoViewSet(viewsets.ModelViewSet):
    queryset = GrupoTrabajo.objects.all()
    serializer_class = GrupoTrabajoSerializer
    permission_classes = [IsAdminUser]


class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer
    permission_classes = [IsAdminUser]


class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    permission_classes = [IsAdminUser]


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    permission_classes = [IsAdminUser]


class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer
    permission_classes = [IsAdminUser]


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    print("📨 Login recibido:", email, password)

    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        print("🔐 LOGIN =>", user.username, user.is_staff, user.is_superuser)

        try:
            rol = user.profile.rol
        except Exception as e:
            rol = "EST"
            print("⚠️ No se pudo obtener rol:", e)

        return Response({'message': 'Login exitoso', 'rol': rol}, status=200)
    else:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({'detail': 'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({'detail': 'CSRF cookie set'})
