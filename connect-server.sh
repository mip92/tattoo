#!/bin/bash
# Загружаем переменные окружения
if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "⚠️  Файл docker-hub.env не найден. Используем значения по умолчанию."
    SERVER_IP="164.92.133.111"
    SERVER_USER="root"
    SSH_KEY_PATH="~/.ssh/id_ed25519"
fi

# Скрипт для подключения к продакшн серверу
echo "🚀 Подключаюсь к продакшн серверу..."
echo "📍 Сервер: $SERVER_IP"
echo "👤 Пользователь: $SERVER_USER"
echo "🔑 Ключ: $SSH_KEY_PATH"
echo ""

# Проверяем наличие SSH ключа
if [ ! -f $SSH_KEY_PATH ]; then
    echo "❌ SSH ключ не найден: $SSH_KEY_PATH"
    echo "Создайте ключ командой: ssh-keygen -t ed25519"
    exit 1
fi

echo "✅ SSH ключ найден"
echo "🔌 Подключаюсь..."
echo ""

# Подключение к серверу
ssh -i $SSH_KEY_PATH $SERVER_USER@$SERVER_IP
