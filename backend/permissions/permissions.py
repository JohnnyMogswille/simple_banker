from rest_framework.permissions import BasePermission


class BankerPermissions(BasePermission):
  def __init__(self, allowed_groups=None):
    self.allowed_groups = allowed_groups or []

  def has_permission(self, request, view):
    # Проверяем, что пользователь аутентифицирован
    if not request.user.is_authenticated:
      return False

    # Проверяем, что у пользователя есть нужные группы
    if self.allowed_groups:
      if not request.user.groups.filter(name__in=self.allowed_groups).exists():
        return False

    return True
