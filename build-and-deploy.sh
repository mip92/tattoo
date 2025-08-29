#!/bin/bash

# Скрипт для правильной последовательности сборки и деплоя
# 1. Клонируем/обновляем репозитории
# 2. Собираем backend и пушим в Docker Hub
# 3. Деплоим backend на сервер
# 4. Ждем, пока backend будет готов
# 5. Собираем frontend с переменной окружения для API
# 6. Деплоим frontend

set -e

# Загружаем переменные окружения
if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "❌ Файл docker-hub.env не найден!"
    echo "Создайте файл docker-hub.env с переменными DOCKER_USERNAME и DOCKER_PASSWORD"
    exit 1
fi

echo "🚀 Начинаю правильную последовательность сборки и деплоя..."
echo ""

# Шаг 1: Клонируем/обновляем репозитории
echo "📥 Шаг 1: Клонирую/обновляю репозитории..."
./clone-repos.sh

# Проверяем, что репозитории существуют
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Репозитории не найдены! Запустите ./clone-repos.sh"
    exit 1
fi

echo "✅ Репозитории готовы!"
echo ""

# Шаг 2: Собираем и пушим backend
echo "🔨 Шаг 2: Собираю backend Docker образ..."
docker buildx create --use --name multiarch-builder 2>/dev/null || docker buildx use multiarch-builder 2>/dev/null || true
docker buildx build --platform linux/amd64,linux/arm64 -t ${USERNAME}/${IMAGE_NAME}:${TAG} --push ./backend

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки backend образа!"
    exit 1
fi
echo "✅ Backend образ собран и запушен успешно!"
echo ""

# Шаг 3: Деплоим backend на сервер
echo "🚀 Шаг 3: Деплою backend на сервер..."
echo "Подключаюсь к серверу ${SERVER_IP}..."

# Копируем скрипт деплоя на сервер
scp -i ${SSH_KEY_PATH} deploy-server.sh ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/

# Запускаем деплой backend на сервере
ssh -i ${SSH_KEY_PATH} ${SERVER_USER}@${SERVER_IP} << 'EOF'
    cd /root/tattoo-app
    chmod +x deploy-server.sh
    
    # Останавливаем все контейнеры
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Запускаем только backend
    echo "Запускаю только backend..."
    docker-compose -f docker-compose.prod.yml up -d database backend
    
    echo "Жду, пока backend будет готов..."
    # Ждем, пока backend будет готов (проверяем health endpoint)
    for i in {1..30}; do
        if curl -f http://localhost:3000/health >/dev/null 2>&1; then
            echo "✅ Backend готов к работе!"
            break
        fi
        echo "⏳ Жду... ($i/30)"
        sleep 10
    done
    
    if [ $i -eq 30 ]; then
        echo "❌ Backend не готов после 5 минут ожидания!"
        exit 1
    fi
EOF

if [ $? -ne 0 ]; then
    echo "❌ Ошибка деплоя backend на сервер!"
    exit 1
fi
echo "✅ Backend успешно развернут на сервере!"
echo ""

# Шаг 4: Собираем frontend с переменной окружения для API
echo "🔨 Шаг 4: Собираю frontend Docker образ..."
echo "Использую переменную окружения для API URL во время сборки..."

# Собираем frontend образ с переменной окружения для API
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --build-arg NEXT_PUBLIC_API_URL=http://backend:3000 \
  -t ${USERNAME}/tattoo-client:${TAG} \
  --push ./frontend

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки frontend образа!"
    exit 1
fi
echo "✅ Frontend образ собран и запушен успешно!"
echo ""

# Шаг 5: Деплоим frontend на сервер
echo "🚀 Шаг 5: Деплою frontend на сервер..."
ssh -i ${SSH_KEY_PATH} ${SERVER_USER}@${SERVER_IP} << 'EOF'
    cd /root/tattoo-app
    
    # Тянем frontend образ
    echo "Загружаю frontend образ..."
    docker pull ${REGISTRY}/${USERNAME}/tattoo-client:${TAG}
    
    # Запускаем frontend
    echo "Запускаю frontend..."
    docker-compose -f docker-compose.prod.yml up -d frontend nginx
    
    echo "Проверяю статус всех сервисов..."
    docker-compose -f docker-compose.prod.yml ps
EOF

if [ $? -ne 0 ]; then
    echo "❌ Ошибка деплоя frontend на сервер!"
    exit 1
fi

echo ""
echo "🎉 Все готово! Приложение развернуто на сервере:"
echo "   🌐 Frontend: http://${SERVER_IP}"
echo "   🔌 API: http://${SERVER_IP}/graphql"
echo "   💚 Health: http://${SERVER_IP}/health"
echo ""
echo "Для проверки статуса на сервере:"
echo "   ssh -i ${SSH_KEY_PATH} ${SERVER_USER}@${SERVER_IP}"
echo "   docker-compose -f docker-compose.prod.yml ps"
