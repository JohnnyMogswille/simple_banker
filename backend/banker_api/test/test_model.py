import pytest
from banker_api.models import Deal
from banker_api.test.conftest import DEAL_STATUS


@pytest.mark.django_db
def test_deal_creation(create_deal):
  deal = create_deal()

  assert deal.id is not None


@pytest.mark.django_db
def test_deal_update(create_deal):
  deal = create_deal()
  deal.cost = 2000
  deal.save()

  assert deal.cost == 2000


@pytest.mark.django_db
def test_deal_deletion(create_deal):
  deal = create_deal()
  deal.delete()

  assert Deal.objects.count() == 0


@pytest.mark.django_db
def test_deal_creation_with_status(create_deal_with_status):
  deal = create_deal_with_status

  assert deal.id is not None
  assert deal.status in DEAL_STATUS
