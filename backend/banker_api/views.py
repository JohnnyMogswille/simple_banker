from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from banker_api.models import Deal
from banker_api.serializers import DealSerializer
from permissions.permissions import BankerPermissions


class Home(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    content = {'message': 'Hello, World!'}
    return Response(content)


class UniversalViewSet(viewsets.ModelViewSet):
  authentication_classes = [JWTAuthentication]
  permission_classes = [BankerPermissions]

  def __call__(self, *args, **kwargs):
    return super().__call__(*args, **kwargs)

  def get_queryset(self):
    model = Deal
    return model.objects.all()

  def get_serializer_class(self):
    serializer = DealSerializer
    return serializer
