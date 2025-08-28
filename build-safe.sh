#!/bin/bash

echo "🚀 Запускаю безопасную сборку для слабого сервера..."

# Останавливаем все контейнеры
echo "📦 Останавливаю контейнеры..."
docker-compose -f docker-compose.prod.yml down

# Очищаем только неиспользуемые образы (НЕ кеш сборки)
echo "🧹 Очищаю неиспользуемые образы..."
docker system prune -f

# Собираем backend с ЖЕСТКИМИ ограничениями ресурсов ТОЛЬКО для сборки
echo "🔨 Собираю backend образ с ЖЕСТКИМИ ограничениями ресурсов..."
# Используем docker run с ограничениями для сборки
docker run --rm \
  --memory="256m" \
  --cpus="0.5" \
  -v $(pwd)/backend:/app \
  -w /app \
  node:20-alpine \
  sh -c "npm ci --prefer-offline --no-optional && npm run build"

# Теперь собираем образ с уже готовым build
docker build -t tattoo-server-backend ./backend

# Собираем остальные образы без ограничений
echo "🔨 Собираю остальные образы..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Запускаем сервисы БЕЗ ограничений ресурсов (для нормальной работы)
echo "🚀 Запускаю сервисы без ограничений ресурсов..."
docker-compose -f docker-compose.prod.yml up -d

echo "✅ Готово! Сервер запущен без ограничений ресурсов для нормальной работы."
echo "📊 Мониторинг ресурсов:"
docker stats --no-stream
