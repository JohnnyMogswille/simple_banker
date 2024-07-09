from rest_framework import serializers

from banker_api.models import *


# Серииализатор для модели Deal
class DealSerializer(serializers.ModelSerializer):
  class Meta:
    model = Deal
    fields = '__all__'
