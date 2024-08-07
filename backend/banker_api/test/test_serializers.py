import pytest
from banker_api.models import Deal
from banker_api.serializers import DealSerializer


@pytest.mark.django_db
def test_deal_serializer_fields(create_deal):
  deal = create_deal()
  serializer = DealSerializer(instance=deal)
  data = serializer.data
  expected_fields = [
    'id',
    'contractor',
    'deal',
    'cost',
    'date',
    'status',
    'docs',
    'date_log',
    'user_log',
  ]
  assert set(data.keys()) == set(expected_fields)


@pytest.mark.django_db
def test_deal_serializer_content(create_deal):
  deal_data = {
    'contractor': 'Тестовый подрядчик А',
    'deal': 'Сделка A',
    'cost': 1000.0,
    'date': '2024-07-12',
    'status': 'active',
  }
  deal = create_deal(**deal_data)
  serializer = DealSerializer(instance=deal)
  data = serializer.data
  for key, value in deal_data.items():
    assert data[key] == value
