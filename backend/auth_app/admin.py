from django.contrib import admin
from unfold.admin import ModelAdmin

# from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()


@admin.register(User)
class AppUserAdmin(ModelAdmin):
  list_display = [
    'username',
    'email',
    'first_name',
    'middle_name',
    'last_name',
    'is_superuser',
    'is_staff',
    'is_active',
  ]
  fieldsets = (
    (None, {'fields': ('username', 'password')}),
    (
      'Персональная информация',
      {'fields': ('first_name', 'middle_name', 'last_name', 'email')},
    ),
    (
      'Разрешения',
      {
        'fields': (
          'is_active',
          'is_staff',
          'is_superuser',
          'groups',
          'user_permissions',
        )
      },
    ),
    ('Важные даты', {'fields': ('last_login', 'date_joined')}),
  )

  add_fieldsets = (
    (
      None,
      {
        'classes': ('wide',),
        'fields': (
          'first_name',
          'middle_name',
          'last_name',
          'username',
          'email',
          'password',
        ),
      },
    ),
  )
