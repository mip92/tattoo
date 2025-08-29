#!/bin/bash

# Скрипт для копирования файлов на сервер
set -e

# Загружаем переменные окружения
if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "❌ Файл docker-hub.env не найден!"
    exit 1
fi

echo "📁 Копирую файлы на сервер ${SERVER_IP}..."

# Создаем директорию на сервере
ssh -i ${SSH_KEY_PATH} ${SERVER_USER}@${SERVER_IP} "mkdir -p /root/tattoo-app"

# Копируем docker-compose.prod.yml
echo "📋 Копирую docker-compose.prod.yml..."
scp -i ${SSH_KEY_PATH} docker-compose.prod.yml ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/

# Копируем nginx конфигурацию
echo "🌐 Копирую nginx конфигурацию..."
scp -i ${SSH_KEY_PATH} -r nginx/ ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/

# Копируем .env файл если есть
if [ -f ".env" ]; then
    echo "🔐 Копирую .env файл..."
    scp -i ${SSH_KEY_PATH} .env ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/
fi

echo "✅ Файлы скопированы на сервер!"
echo "📁 Директория на сервере: /root/tattoo-app/"
