FROM python:3.12-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Установка зависимостей системы
RUN apk update && apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    libffi-dev \
    build-base \
    vim \
    curl

# Создаем пользователя appuser 
ARG UID=10001
RUN adduser \
        --disabled-password \
        --gecos "" \
        --home "/nonexistent" \
        --shell "/sbin/nologin" \
        --no-create-home \
        --uid "${UID}" \
        appuser

# Устанавливаем рабочий каталог
WORKDIR /app

# Создаем папки статики и медиа
RUN mkdir /app/static && mkdir /app/media
# Копируем проект и устанавливаем владельца appuser
COPY --chown=appuser:appuser . .

# устанавливаем зависимости
RUN pip install -r r.txt 

# Меняем пользователя
USER appuser

# Сигнал другим, что мы будем слушать этот порт
EXPOSE 8000

# Сначала создаем необходимую базу данных выполнив миграции, далее создаем суперпользователя
# После собираем статические файлы и запускаем через uvicorn
CMD python manage.py makemigrations \
    && python manage.py migrate \
    && python manage.py collectstatic --no-input \
    && python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='ee.mogush').exists() or User.objects.create_superuser('ee.mogush', 'ee.mogush@example.com', 'Notready13!')" \
    && uvicorn backend.asgi:application --host 0.0.0.0 --port 8000 --workers 5 --log-level debug