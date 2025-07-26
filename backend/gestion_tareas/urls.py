"""
URL configuration for gestion_tareas project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from os.path import basename

from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from django.http import JsonResponse
from setuptools.extern import names

from tareas.views import (RegisterStudentView, RegisterStaffView, login_view, csrf_token_view, UserProfileViewSet)
router = DefaultRouter()

router.register(r'api/users', UserProfileViewSet, basename='user-profile')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tareas/', include('tareas.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/login/', login_view, name='api_token_auth'),
    path('api/register-student/', RegisterStudentView.as_view(), name='register-student'),
    path('api/register-staff/', RegisterStaffView.as_view(), name='register-staff'),
    path("api/csrf-cookie/", csrf_token_view, name='csrf-cookie'),
    path('', include(router.urls)),

]
