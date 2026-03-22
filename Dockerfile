FROM oven/bun:1-alpine

WORKDIR /app

# Установим зависимости через Bun
COPY package.json bun.lockb* ./
RUN bun install

# Скопируем код приложения
COPY . .

# Nuxt dev/preview слушает этот порт
EXPOSE 3000

# Запуск Nuxt в dev-режиме, доступен извне контейнера
CMD ["bun", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]

