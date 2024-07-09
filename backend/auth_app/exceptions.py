from rest_framework.views import exception_handler
from rest_framework import status


def custom_exception_handler(exc, context):
  response = exception_handler(exc, context)

  if response is not None:
    if response.status_code == status.HTTP_401_UNAUTHORIZED:
      response.data = {
        'detail': 'Токен недействителен или истек. Пожалуйста, авторизуйтесь заново'
      }

  return response
