from django.db import models

# Create your models here.


class Deal(models.Model):
  DEAL_STATUS = (
    ('active', 'Активен'),
    ('done', 'Завершен'),
    ('canceled', 'Отменен'),
    ('pending', 'Выполняется'),
  )

  contractor = models.CharField(
    max_length=150, blank=False, null=False, verbose_name='Подрядчик'
  )
  deal = models.CharField(
    max_length=150, blank=False, null=False, verbose_name='Наименование сделки'
  )
  cost = models.FloatField(
    blank=True, null=False, verbose_name='Сумма сделки', default=0
  )
  date = models.DateField(blank=False, null=False, verbose_name='Дата сделки')
  status = models.CharField(
    max_length=20,
    blank=False,
    null=False,
    verbose_name='Статус сделки',
    choices=DEAL_STATUS,
  )
  date_log = models.DateTimeField(
    blank=False, null=False, verbose_name='Дата внесения изменений', auto_now=True
  )
  user_log = models.CharField(
    max_length=50, blank=False, null=False, verbose_name='Пользователь', default='-'
  )

  class Meta:
    app_label = 'banker_api'
    managed = True
    db_table = 'deals'
    verbose_name = 'Сделка'
    verbose_name_plural = 'Сделки'

  def __str__(self):
    return f'{self.deal} от {self.date.strftime("%d.%m.%Y")}'
