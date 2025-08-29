#!/bin/bash

# Конфигурация
REGISTRY="docker.io"
USERNAME="mip92"
IMAGE_NAME="tattoo-server"
TAG="latest"

echo "🚀 Собираю Docker образ локально и пушу в registry..."

# Проверяем, что мы в правильной директории
if [ ! -f "backend/Dockerfile" ]; then
    echo "❌ Ошибка: backend/Dockerfile не найден. Запустите скрипт из корня проекта."
    exit 1
fi

# Собираем образ локально (без ограничений ресурсов)
echo "🔨 Собираю Docker образ локально..."
docker build -t ${USERNAME}/${IMAGE_NAME}:${TAG} ./backend

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки образа!"
    exit 1
fi

echo "✅ Образ собран успешно!"

    # Логинимся в registry (если нужно)
    echo "🔐 Проверяю авторизацию в registry..."
    if ! docker info | grep -q "Username"; then
        echo "⚠️  Не авторизован в Docker Hub. Выполните:"
        echo "   docker login"
        read -p "Продолжить без авторизации? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

# Пушем образ в registry
echo "📤 Пушу образ в registry..."
docker push ${REGISTRY}/${USERNAME}/${IMAGE_NAME}:${TAG}

if [ $? -ne 0 ]; then
    echo "❌ Ошибка пуша образа!"
    exit 1
fi

    echo "✅ Образ успешно запушен в Docker Hub!"
    echo "🐳 Теперь на сервере выполните:"
          echo "   docker pull ${USERNAME}/${IMAGE_NAME}:${TAG}"
      echo "   docker-compose -f docker-compose.prod.yml up -d"