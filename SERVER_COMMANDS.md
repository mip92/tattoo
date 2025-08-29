# 🚀 Команды для работы с продакшн сервером

## 🔐 Подключение к серверу

### Переменные окружения

Создайте файл `docker-hub.env` с вашими данными:

```bash
# Docker Hub Configuration
DOCKER_USERNAME=your_username
DOCKER_PASSWORD=your_docker_hub_password
DOCKER_REGISTRY=docker.io
DOCKER_IMAGE_NAME=tattoo-server
DOCKER_IMAGE_TAG=latest

# Server Configuration
SERVER_IP=164.92.133.111
SERVER_USER=root
SSH_KEY_PATH=~/.ssh/id_ed25519
```

**Важно:** Используйте **пароль от Docker Hub аккаунта**, а не токен!

### Быстрое подключение

```bash
./connect-server.sh
```

### Ручное подключение

```bash
ssh -i ~/.ssh/id_ed25519 root@164.92.133.111
```

## 📍 Информация о сервере

- **IP адрес:** 164.92.133.111
- **Пользователь:** root
- **SSH ключ:** ~/.ssh/id_ed25519
- **Спецификация:** 512MB RAM, 1 CPU, 10GB SSD
- **Провайдер:** DigitalOcean
- **Локация:** Frankfurt, Germany

## 🐳 Команды на сервере

### После подключения к серверу

```bash
# 1. Клонировать репозиторий (если первый раз)
git clone https://github.com/oleksandrboicenko/tattoo-server.git
cd tattoo-server

# 2. Запустить деплой
./deploy-server.sh

# 3. Проверить статус
docker ps
docker-compose -f docker-compose.prod.yml ps

# 4. Посмотреть логи
docker logs tattoo-backend-prod
docker logs tattoo-database-prod
```

### Мониторинг ресурсов

```bash
# Статус контейнеров
docker stats --no-stream

# Использование диска
df -h

# Использование памяти
free -h

# Загрузка CPU
htop
```

### Перезапуск сервисов

```bash
# Перезапустить все
docker-compose -f docker-compose.prod.yml restart

# Перезапустить только backend
docker restart tattoo-backend-prod

# Перезапустить только базу данных
docker restart tattoo-database-prod
```

## 🚨 Аварийные ситуации

### Если сервер не отвечает

```bash
# Перезагрузить сервер
sudo reboot

# После перезагрузки проверить статус
docker ps
```

### Если контейнеры не запускаются

```bash
# Очистить все контейнеры и образы
docker system prune -a -f

# Запустить заново
./deploy-server.sh
```

## 📊 Проверка работоспособности

```bash
# Health check
curl http://localhost/health

# GraphQL API
curl -X POST http://localhost/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'

# Проверка портов
netstat -tlnp | grep :80
netstat -tlnp | grep :3000
```
