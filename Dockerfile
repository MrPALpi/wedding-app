FROM oven/bun:latest as base
WORKDIR /app

# Установка зависимостей
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Сборка проекта
COPY . .
RUN bun run build

# Запуск приложения
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "start"]
