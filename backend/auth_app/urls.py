from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import GroupsTokenObtainPairView


urlpatterns = [
  path('api/token/', GroupsTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
