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

echo "🚀 Собираю Docker образ локально и пушу в registry..."

# Проверяем, что мы в правильной директории
if [ ! -f "backend/Dockerfile" ]; then
    echo "❌ Ошибка: backend/Dockerfile не найден. Запустите скрипт из корня проекта."
    exit 1
fi

    # Собираем backend образ для multi-arch
    echo "🔨 Собираю backend Docker образ для multi-arch..."
    docker buildx create --use --name multiarch-builder 2>/dev/null || docker buildx use multiarch-builder 2>/dev/null || true
    docker buildx build --platform linux/amd64,linux/arm64 -t ${USERNAME}/${IMAGE_NAME}:${TAG} --push ./backend
    
    # Собираем frontend образ для multi-arch
    echo "🔨 Собираю frontend Docker образ для multi-arch..."
    docker buildx build --platform linux/amd64,linux/arm64 -t ${USERNAME}/tattoo-client:${TAG} --push ./frontend

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки образа!"
    exit 1
fi

echo "✅ Образ собран успешно!"

    # Логинимся в registry автоматически
    echo "🔐 Проверяю авторизацию в registry..."
    if ! docker info | grep -q "Username"; then
        echo "⚠️  Не авторизован в Docker Hub. Выполняю автоматический логин..."
        if [ -f "docker-login.sh" ]; then
            ./docker-login.sh
        else
            echo "❌ Скрипт docker-login.sh не найден!"
            echo "Выполните: docker login"
            exit 1
        fi
    fi

    echo "✅ Оба образа успешно собраны и запушены в Docker Hub!"
    echo "🐳 Теперь на сервере выполните:"
    echo "   docker pull ${USERNAME}/${IMAGE_NAME}:${TAG}"
    echo "   docker pull ${USERNAME}/tattoo-client:${TAG}"
    echo "   docker-compose -f docker-compose.prod.yml up -d"