from django.contrib import admin
from unfold.admin import ModelAdmin

from import_export.admin import ImportExportActionModelAdmin
from django.db.models.fields.reverse_related import ManyToOneRel, OneToOneRel
from .models import *


def get_fields_your_model(model):
  fields = []
  for field in model._meta.get_fields():
    if any([type(field) is ManyToOneRel, type(field) is OneToOneRel]):
      pass
    else:
      fields.append(field.name)
  return fields


@admin.register(Deal)
class Deal_Admin(ModelAdmin, ImportExportActionModelAdmin):
  list_display = get_fields_your_model(Deal)
  list_display_links = ('id', 'contractor', 'deal')
  search_fields = ('contractor', 'deal')
  ordering = ('id',)
