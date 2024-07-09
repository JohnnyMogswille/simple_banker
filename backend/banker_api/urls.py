from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import UniversalViewSet, Home
from .models import *
from .serializers import *


class CustomSimpleRouter(SimpleRouter):
  def register(self, prefix, viewset, basename, model, serializer):
    viewset.model = model
    viewset.serializer = serializer
    super().register(prefix, viewset, basename)


router = DefaultRouter(
  trailing_slash=False,
)
router.register(r'deals', UniversalViewSet, basename='deals')

deal_router = CustomSimpleRouter()
deal_router.register(
  r'deals', UniversalViewSet, basename='deal', model=Deal, serializer=DealSerializer
)

urlpatterns = [
  path('', Home.as_view()),
  path('banker/', include(deal_router.urls)),
]
