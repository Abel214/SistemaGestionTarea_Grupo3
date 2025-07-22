from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import UsuarioProfile

User = get_user_model()


class UsuarioProfileInline(admin.StackedInline):
    model = UsuarioProfile
    can_delete = False
    verbose_name_plural = 'Perfil de usuario'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    inlines = (UsuarioProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    list_select_related = ('profile',)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return []
        return super().get_inline_instances(request, obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
