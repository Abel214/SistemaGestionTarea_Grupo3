import json
from email._header_value_parser import get_token
from urllib import response

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
    queryset = UsuarioProfile.objects.select_related('user').all()
    serializer_class = UserProfileSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        profile = self.get_object()
        profile.user.is_active = False
        profile.user.save()
        return Response({'detail': 'Usuario desactivado correctamente'}, status=status.HTTP_204_NO_CONTENT)


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
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class UsuarioParaleloViewSet(viewsets.ModelViewSet):
    queryset = UsuarioParalelo.objects.all()
    serializer_class = UsuarioParaleloSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class GrupoTrabajoViewSet(viewsets.ModelViewSet):
    queryset = GrupoTrabajo.objects.all()
    serializer_class = GrupoTrabajoSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(creada_por=self.request.user)


class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]


from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def login_view(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({
                'success': False,
                'error': 'Email y contraseña son requeridos'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)

        if user is None:
            return Response({
                'success': False,
                'error': 'Correo electrónico o contraseña incorrectos'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'success': False,
                'error': 'Tu cuenta está desactivada'
            }, status=status.HTTP_403_FORBIDDEN)

        login(request, user)

        # Generar nuevo token CSRF
        csrf_token = get_token(request)

        response = JsonResponse({
            'success': True,
            'email': user.email,
            'rol': user.profile.rol if hasattr(user, 'profile') else None
        })

        response['X-CSRFToken'] = csrf_token
        return response

    except Exception as e:
        print("Error en login:", str(e))
        return Response({'success': False, 'error': 'Error interno del servidor'}, status=500)


class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({'detail': 'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)


@ensure_csrf_cookie
def csrf_token_view(request):
    response = JsonResponse({"detail": "CSRF cookie set"})
    response["X-CSRFToken"] = request.META.get("CSRF_COOKIE", "")
    return response
