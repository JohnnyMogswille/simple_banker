import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from banker_api.models import Deal


DEAL_STATUS = ['active', 'done', 'canceled', 'pending']


User = get_user_model()


@pytest.fixture
def create_user(db):
  user = User.objects.create_user(
    username='testuser', password='password', email='test@example.com'
  )
  return user


@pytest.fixture
def api_client():
  return APIClient()


@pytest.fixture
def authenticated_client(create_user, api_client):
  refresh = RefreshToken.for_user(create_user)
  api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

  return api_client


@pytest.fixture
def create_deal():
  def _create_deal(**kwargs):
    defaults = {
      'contractor': 'Тестовый Подрядчик',
      'deal': 'Тестовая сделка',
      'date': '2022-01-01',
      'cost': 1000,
      'status': 'active',
    }

    defaults.update(kwargs)

    return Deal.objects.create(**defaults)

  return _create_deal


@pytest.fixture(params=DEAL_STATUS)
def create_deal_with_status(request):
  return Deal.objects.create(
    contractor='Тестовый Подрядчик',
    deal='Тестовая сделка',
    date='2022-01-01',
    cost=1000,
    status=request.param,
  )
