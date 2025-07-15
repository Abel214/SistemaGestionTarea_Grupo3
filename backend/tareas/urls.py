from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from tareas.views import RegisterStudentView, RegisterStaffView, UserProfileViewSet, PasswordRecoveryView, LoginAPIView

from tareas.views import CicloViewSet, PeriodoCicloViewSet, AsignaturaViewSet, ParaleloViewSet, \
    UsuarioParaleloViewSet, GrupoTrabajoViewSet, ReporteViewSet, TareaViewSet, ArchivoViewSet, EntregaViewSet

router = DefaultRouter()

router.register(r'users', UserProfileViewSet, basename='user-profile')
router.register(r'ciclos', CicloViewSet)
router.register(r'periodos', PeriodoCicloViewSet)
router.register(r'asignaturas', AsignaturaViewSet)
router.register(r'paralelos', ParaleloViewSet)
router.register(r'inscripciones', UsuarioParaleloViewSet)
router.register(r'grupos-trabajo', GrupoTrabajoViewSet)
router.register(r'reportes', ReporteViewSet)
router.register(r'archivos', ArchivoViewSet)
router.register(r'tareas', TareaViewSet)
router.register(r'entregas', EntregaViewSet)

urlpatterns = [
    path('register-student/', RegisterStudentView.as_view(), name='register-student'),
    path('register-staff/', RegisterStaffView.as_view(), name='register-staff'),
    path('recover-password/', PasswordRecoveryView.as_view(), name='recover-password'),
    path('', include(router.urls)),
]
