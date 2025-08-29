# Tattoo App - Deployment Guide

## 🚀 Полный процесс деплоя приложения

Этот README описывает пошаговый процесс деплоя полноценного приложения на DigitalOcean сервер с использованием Docker, Docker Compose и GitHub Actions.

## 📋 Описание проекта

**Tattoo App** - это полноценное веб-приложение, состоящее из:

- **Backend**: NestJS API с GraphQL
- **Frontend**: Next.js приложение
- **Database**: PostgreSQL
- **Reverse Proxy**: Nginx

## 🏗️ Архитектура деплоя

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions │───▶│   Docker Hub    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  DigitalOcean   │◀───│   Docker Hub    │
                       │     Server      │    │   Images       │
                       └─────────────────┘    └─────────────────┘
```

## 🔧 Предварительные требования

### На локальной машине:

- Docker
- Docker Compose
- SSH ключ для доступа к серверу
- Git

### На сервере:

- Ubuntu/Debian
- Docker
- Docker Compose
- Открытый порт 80

## 📁 Структура проекта

```
tattoo-nginx/
├── docker-compose.prod.yml      # Продакшн конфигурация
├── docker-hub.env              # Переменные окружения для Docker Hub
├── copy-files-to-server.sh     # Скрипт копирования файлов на сервер
├── nginx/                      # Nginx конфигурация
│   ├── nginx.conf             # Основной конфиг Nginx
│   ├── nginx-local.conf       # Локальный конфиг
│   └── logs/                  # Логи Nginx
└── README.md                   # Этот файл
```

## 🚀 Пошаговый процесс деплоя

### 1. Подготовка локальной среды

#### Создание файла переменных окружения

```bash
# docker-hub.env
DOCKER_USERNAME=your_username
DOCKER_PASSWORD=your_password
SERVER_IP=164.92.133.111
SERVER_USER=root
SSH_KEY_PATH=~/.ssh/id_rsa
```

#### Создание скрипта копирования файлов

```bash
#!/bin/bash
# copy-files-to-server.sh
set -e

if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "❌ Файл docker-hub.env не найден!"
    exit 1
fi

echo "📁 Копирую файлы на сервер ${SERVER_IP}..."
ssh -i ${SSH_KEY_PATH} ${SERVER_USER}@${SERVER_IP} "mkdir -p /root/tattoo-app"

echo "📋 Копирую docker-compose.prod.yml..."
scp -i ${SSH_KEY_PATH} docker-compose.prod.yml ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/

echo "🌐 Копирую nginx конфигурацию..."
scp -i ${SSH_KEY_PATH} -r nginx/ ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/

if [ -f ".env" ]; then
    echo "🔐 Копирую .env файл..."
    scp -i ${SSH_KEY_PATH} .env ${SERVER_USER}@${SERVER_IP}:/root/tattoo-app/
fi

echo "✅ Файлы скопированы на сервер!"
echo "📁 Директория на сервере: /root/tattoo-app/"
```

### 2. Очистка сервера (если необходимо)

```bash
# Полная очистка всех контейнеров, образов и volumes
ssh root@164.92.133.111 "docker stop \$(docker ps -aq) && docker rm \$(docker ps -aq) && docker volume prune -f && docker system prune -af"
```

### 3. Копирование файлов на сервер

```bash
# Запуск скрипта копирования
./copy-files-to-server.sh
```

### 4. Последовательный запуск сервисов

#### Шаг 1: Запуск базы данных

```bash
ssh root@164.92.133.111 "cd /root/tattoo-app && sed -i 's/NODE_ENV=development/NODE_ENV=production/' .env && docker-compose -f docker-compose.prod.yml up -d database"
```

**Ожидание**: 15 секунд для инициализации PostgreSQL

#### Шаг 2: Запуск backend

```bash
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml up -d backend"
```

**Ожидание**: 25 секунд для инициализации NestJS приложения

#### Шаг 3: Запуск frontend

```bash
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml up -d frontend"
```

**Ожидание**: 20 секунд для инициализации Next.js приложения

#### Шаг 4: Запуск Nginx

```bash
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml up -d nginx"
```

### 5. Проверка статуса

```bash
# Проверка всех контейнеров
ssh root@164.92.133.111 "docker ps"

# Ожидаемый результат:
# CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS                    PORTS      NAMES
# xxxxxxxxxxxx   nginx:alpine                 "/docker-entrypoint.…"   10 seconds ago   Up 8 seconds             0.0.0.0:80->80/tcp, [::]:80->80/tcp   tattoo-nginx-prod
# xxxxxxxxxxxx   mip92/tattoo-client:latest   "docker-entrypoint.s…"   51 seconds ago   Up 49 seconds            3000/tcp   tattoo-frontend-prod
# xxxxxxxxxxxx   mip92/tattoo-server:latest   "docker-entrypoint.s…"   About a minute ago   Up About a minute (healthy)   3000/tcp   tattoo-backend-prod
# xxxxxxxxxxxx   postgres:15-alpine           "docker-entrypoint.s…"   2 minutes ago        Up 2 minutes (healthy)        5432/tcp   tattoo-database-prod
```

## 🔍 Проверка работоспособности

### 1. Проверка GraphQL endpoint

```bash
curl -s http://164.92.133.111/graphql
# Ожидаемый ответ: CSRF защита Apollo Server (это нормально)
```

### 2. Проверка главной страницы

```bash
curl -s http://164.92.133.111/ | head -3
# Ожидаемый ответ: HTML страница Next.js приложения
```

### 3. Проверка health check

```bash
curl -s http://164.92.133.111/health
# Ожидаемый ответ: {"status":"ok"}
```

## 🐳 Docker Compose конфигурация

### docker-compose.prod.yml

```yaml
version: "3.8"
services:
  database:
    image: postgres:15-alpine
    container_name: tattoo-database-prod
    environment:
      POSTGRES_DB: tattoo_db
      POSTGRES_USER: tattoo_user
      POSTGRES_PASSWORD: tattoo_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - tattoo-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tattoo_user -d tattoo_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: mip92/tattoo-server:latest
    container_name: tattoo-backend-prod
    environment:
      DATABASE_URL: postgresql://tattoo_user:tattoo_password@database:5432/tattoo_db
      NODE_ENV: production
    depends_on:
      database:
        condition: service_healthy
    networks:
      - tattoo-network
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1",
        ]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: mip92/tattoo-client:latest
    container_name: tattoo-frontend-prod
    environment:
      NEXT_PUBLIC_API_URL: http://164.92.133.111/graphql
    depends_on:
      - backend
    networks:
      - tattoo-network

  nginx:
    image: nginx:alpine
    container_name: tattoo-nginx-prod
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend
    networks:
      - tattoo-network

volumes:
  postgres_data:

networks:
  tattoo-network:
    driver: bridge
```

## 🔄 GitHub Actions для автоматической сборки

### .github/workflows/build-and-deploy.yml

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Backend Image
        run: |
          docker buildx build --platform linux/amd64,linux/arm64 \
            -t mip92/tattoo-server:latest \
            --push \
            ./backend

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Frontend Image
        run: |
          docker buildx build --platform linux/amd64,linux/arm64 \
            -t mip92/tattoo-client:latest \
            --push \
            ./frontend
```

## 🚨 Устранение неполадок

### 1. Backend не запускается

```bash
# Проверка логов
ssh root@164.92.133.111 "docker logs tattoo-backend-prod --tail 20"

# Частые проблемы:
# - Неправильный путь к main.js в Dockerfile
# - Отсутствие переменных окружения
# - Проблемы с подключением к базе данных
```

### 2. Frontend не запускается

```bash
# Проверка логов
ssh root@164.92.133.111 "docker logs tattoo-frontend-prod --tail 20"

# Частые проблемы:
# - Отсутствие build артефактов
# - Проблемы с TypeScript зависимостями
# - Неправильная архитектура образа
```

### 3. База данных не подключается

```bash
# Проверка статуса
ssh root@164.92.133.111 "docker exec tattoo-database-prod pg_isready -U tattoo_user -d tattoo_db"

# Проверка переменных окружения
ssh root@164.92.133.111 "docker exec tattoo-backend-prod env | grep DATABASE"
```

## 📊 Мониторинг и логи

### Просмотр логов в реальном времени

```bash
# Backend логи
ssh root@164.92.133.111 "docker logs -f tattoo-backend-prod"

# Frontend логи
ssh root@164.92.133.111 "docker logs -f tattoo-frontend-prod"

# Nginx логи
ssh root@164.92.133.111 "docker logs -f tattoo-nginx-prod"
```

### Проверка использования ресурсов

```bash
# Статистика контейнеров
ssh root@164.92.133.111 "docker stats --no-stream"

# Использование диска
ssh root@164.92.133.111 "df -h"
```

## 🔒 Безопасность

### 1. Firewall

```bash
# Открыть только необходимые порты
ufw allow 80/tcp
ufw allow 22/tcp
ufw enable
```

### 2. SSL/TLS (для продакшена)

```bash
# Установка Certbot
apt install certbot python3-certbot-nginx

# Получение SSL сертификата
certbot --nginx -d yourdomain.com
```

## 📈 Масштабирование

### Горизонтальное масштабирование

```bash
# Увеличение количества backend инстансов
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml up -d --scale backend=3"
```

### Вертикальное масштабирование

```yaml
# В docker-compose.prod.yml добавить:
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: "0.5"
```

## 🧹 Обслуживание

### Очистка неиспользуемых ресурсов

```bash
# Очистка образов
ssh root@164.92.133.111 "docker image prune -f"

# Очистка volumes
ssh root@164.92.133.111 "docker volume prune -f"

# Полная очистка системы
ssh root@164.92.133.111 "docker system prune -af"
```

### Обновление приложения

```bash
# Остановка всех сервисов
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml down"

# Запуск с новыми образами
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml up -d"
```

## 📝 Чек-лист деплоя

- [ ] Создан файл `docker-hub.env` с правильными переменными
- [ ] Создан скрипт `copy-files-to-server.sh`
- [ ] Настроены GitHub Actions для автоматической сборки
- [ ] Сервер очищен от старых контейнеров и образов
- [ ] Файлы скопированы на сервер
- [ ] База данных запущена и здорова
- [ ] Backend запущен и здоров
- [ ] Frontend запущен
- [ ] Nginx запущен и доступен на порту 80
- [ ] Все endpoints отвечают корректно
- [ ] Проверены логи на наличие ошибок

## 🎯 Результат

После выполнения всех шагов у вас будет:

- ✅ Полностью рабочее приложение на сервере
- ✅ Автоматическая сборка при пуше в main ветку
- ✅ Масштабируемая архитектура
- ✅ Мониторинг и логирование
- ✅ Возможность быстрого обновления

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи контейнеров
2. Убедитесь в правильности переменных окружения
3. Проверьте статус всех сервисов
4. При необходимости выполните полную пересборку

---

**Время выполнения полного деплоя**: ~5-10 минут  
**Сложность**: Средняя  
**Автоматизация**: GitHub Actions + Docker  
**Мониторинг**: Встроенный в Docker
