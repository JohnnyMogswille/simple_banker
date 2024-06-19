from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.utils.translation import gettext_lazy as _


class AppUser(AbstractUser):
  middle_name = models.CharField(
    max_length=150, verbose_name='Отчество', blank=True, null=True
  )

  def __str__(self):
    return self.username
