import pytest
from rest_framework import status


@pytest.mark.django_db
def test_export_to_xlsx(authenticated_client, create_deal):
  deal = create_deal()
  data = {
    'model': 'your_app.models.Deal',
    'serializer_class': 'your_app.serializers.DealSerializer',
  }
  response = authenticated_client.post('/api/deals/export/', data, format='json')

  assert deal.id is not None
  assert response.status_code == status.HTTP_200_OK
