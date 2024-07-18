from base.serializers import BaseSerializer

from banker_api.models import *


# Серииализатор для модели Deal
class DealSerializer(BaseSerializer):
  class Meta:
    model = Deal
    fields = '__all__'
    export_fields = '__all__'
