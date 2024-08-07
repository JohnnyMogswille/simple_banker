from django.db import models
from django.contrib.auth.models import AbstractUser


class AppUser(AbstractUser):
  middle_name = models.CharField(
    max_length=150, verbose_name='Отчество', blank=True, null=True
  )

  def __str__(self):
    return self.username
