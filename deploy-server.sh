#!/bin/bash

# Загружаем переменные окружения
if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "⚠️  Файл docker-hub.env не найден. Используем значения по умолчанию."
    # Конфигурация по умолчанию
    REGISTRY="docker.io"
    USERNAME="mip92"
    IMAGE_NAME="tattoo-server"
    TAG="latest"
fi

echo "🚀 Деплою на сервер (только pull и запуск)..."

# Останавливаем текущие контейнеры
echo "📦 Останавливаю текущие контейнеры..."
docker-compose -f docker-compose.prod.yml down

# Очищаем неиспользуемые образы
echo "🧹 Очищаю неиспользуемые образы..."
docker system prune -f

# Тянем готовый образ из registry
echo "📥 Тяну готовый образ из registry..."
docker pull ${REGISTRY}/${USERNAME}/${IMAGE_NAME}:${TAG}

if [ $? -ne 0 ]; then
    echo "❌ Ошибка загрузки образа!"
    exit 1
fi

echo "✅ Образ загружен успешно!"

# Запускаем сервисы
echo "🚀 Запускаю сервисы..."
docker-compose -f docker-compose.prod.yml up -d

if [ $? -ne 0 ]; then
    echo "❌ Ошибка запуска сервисов!"
    exit 1
fi

echo "✅ Сервисы запущены успешно!"
echo "📊 Мониторинг ресурсов:"
docker stats --no-stream

echo ""
echo "🎉 Деплой завершен! Сервер работает с готовым образом."
echo "💡 Ресурсы сервера потрачены только на:"
echo "   - Загрузку образа (docker pull)"
echo "   - Запуск контейнеров"
echo "   - НЕ на сборку!"
