# frontend.Dockerfile
# Указываем версию node
FROM node:21-alpine

# Установка зависимостей системы
RUN apk update && apk add --no-cache \
    vim \
    curl

WORKDIR /app

# Копируем зависимости
COPY package*.json /app

RUN mkdir -p /app/node_modules/.cache && chown -R node:node /app/node_modules/.cache && chmod -R 775 /app/node_modules/.cache

# Устанавливаем зависимости
RUN npm install

# Меняем пользователя
USER node

# Копируем проект
COPY . .

# Запускаем приложение
CMD npm run serve