from rest_framework.response import Response
from rest_framework import status


class ExportDataHelper:
  def __init__(self, model, serializer):
    self.model = model
    self.serializer = serializer

  def get_queryset(self):
    return self.model.objects.all()

  def export_to_xlsx(self):
    if not self.model or not self.serializer:
      return Response(
        {
          'is_valid': False,
          'status': 'error',
          'message': 'Model or serializer class not provided.',
        },
        status=status.HTTP_400_BAD_REQUEST,
      )

    objects = self.get_queryset()
    serializer_instance = self.serializer()

    try:
      response = serializer_instance.export_to_xlsx(
        objects, filename=f'{self.model._meta.verbose_name_plural}.xlsx'
      )

      print(response)

      return response
    except Exception as e:
      return Response(
        {
          'is_valid': False,
          'status': 'error',
          'message': f'Ошибка при экспорте данных: {str(e)}',
        },
        status=status.HTTP_400_BAD_REQUEST,
      )
