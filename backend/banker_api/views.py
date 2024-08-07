from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets

from banker_api.serializers import DealSerializer
from banker_api.api.export_data import ExportDataHelper
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
    return self.model.objects.all()

  def get_serializer_class(self):
    serializer = DealSerializer
    return serializer


class ExportData(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [BankerPermissions]

  model = None
  serializer_class = None

  def get(self, request):
    helper = ExportDataHelper(self.model, self.serializer_class)
    response = helper.export_to_xlsx()

    return response
