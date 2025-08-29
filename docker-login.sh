#!/bin/bash
# Скрипт для автоматического логина в Docker Hub

# Загружаем переменные окружения
if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "❌ Файл docker-hub.env не найден!"
    echo "Создайте файл docker-hub.env с переменными DOCKER_USERNAME и DOCKER_PASSWORD"
    exit 1
fi

echo "🔐 Логинюсь в Docker Hub..."
echo "👤 Пользователь: $DOCKER_USERNAME"
echo "🔑 Использую пароль из docker-hub.env"
echo ""

# Логинимся в Docker Hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

if [ $? -eq 0 ]; then
    echo "✅ Успешный логин в Docker Hub!"
else
    echo "❌ Ошибка логина в Docker Hub!"
    exit 1
fi
