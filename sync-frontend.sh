#!/bin/bash

echo "🔄 Синхронизация frontend репозитория..."

# Проверяем, что frontend директория существует
if [ ! -d "frontend" ]; then
    echo "❌ Директория frontend не найдена. Запустите сначала ./clone-repos.sh"
    exit 1
fi

cd frontend

echo "📥 Получаем последние изменения из tfront репозитория..."
git fetch origin

echo "🔄 Сбрасываем локальные изменения на последнюю версию main..."
git reset --hard origin/main

echo "✅ Frontend синхронизирован с последней версией main ветки"
echo "📁 Текущий коммит: $(git log --oneline -1)"

cd ..
echo "🎯 Готово! Теперь можно перезапустить приложение:"
echo "   docker-compose -f docker-compose.prod.yml --env-file .env.local up -d"
