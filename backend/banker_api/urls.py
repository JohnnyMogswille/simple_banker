from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import UniversalViewSet, Home, ExportData
from .models import *
from .serializers import *

DEAL_GROUPS = ['admins', 'dealStaff']


class CustomSimpleRouter(SimpleRouter):
  def register(self, prefix, viewset, basename, model, serializer, allowed_groups=None):
    viewset.model = model
    viewset.serializer = serializer
    viewset.allowed_groups = allowed_groups
    super().register(prefix, viewset, basename)


deal_router = CustomSimpleRouter()
deal_router.register(
  r'deals',
  UniversalViewSet,
  basename='deal',
  model=Deal,
  serializer=DealSerializer,
  allowed_groups=DEAL_GROUPS,
)

# print(deal_router.urls)


urlpatterns = [
  path('', Home.as_view()),
  path('banker/', include(deal_router.urls)),
  path(
    'deals/export/',
    ExportData.as_view(model=Deal, serializer_class=DealSerializer),
    name='export_data',
  ),
]
