import pytest
from rest_framework import status
from banker_api.models import Deal


@pytest.mark.django_db
def test_get_deal(authenticated_client, create_deal):
  deal = create_deal()
  response = authenticated_client.get(f'/api/banker/deals/{deal.id}/')

  assert response.status_code == status.HTTP_200_OK
  assert response.data['contractor'] == deal.contractor


@pytest.mark.django_db
def test_create_deal(authenticated_client):
  data = {
    'contractor': 'тестовый подрядчик B',
    'deal': 'Сделка B',
    'cost': 2000.0,
    'date': '2024-07-12',
    'status': 'pending',
  }
  response = authenticated_client.post('/api/banker/deals/', data)

  assert response.status_code == status.HTTP_201_CREATED
  assert Deal.objects.count() == 1
  assert Deal.objects.get(id=response.data['id']).contractor == 'тестовый подрядчик B'


@pytest.mark.django_db
def test_update_deal(authenticated_client, create_deal):
  deal = create_deal()
  data = {'cost': 1500.0}
  response = authenticated_client.patch(f'/api/banker/deals/{deal.id}/', data)

  assert response.status_code == status.HTTP_200_OK

  deal.refresh_from_db()

  assert deal.cost == 1500.0


@pytest.mark.django_db
def test_delete_deal(authenticated_client, create_deal):
  deal = create_deal()
  response = authenticated_client.delete(f'/api/banker/deals/{deal.id}/')

  assert response.status_code == status.HTTP_204_NO_CONTENT
  assert Deal.objects.count() == 0
