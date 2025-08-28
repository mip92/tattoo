# Docker Setup для Tattoo Server

## 🚨 Безопасность

**ВАЖНО**: Этот проект использует переменные окружения для конфиденциальных данных.
Никогда не коммитьте файл `.env` в git!

## Быстрый старт

Для запуска всего проекта (сервер + база данных) одной командой:

```bash
docker-compose up
```

### 🚀 Запуск

```bash
# Запуск всех сервисов
docker-compose up

# Запуск в фоновом режиме
docker-compose up -d

# Остановка
docker-compose down

# Пересборка и запуск
docker-compose up --build
```

## Доступные команды

### Запуск в фоновом режиме

```bash
docker-compose up -d
```

### Остановка всех сервисов

```bash
docker-compose down
```

### Остановка с удалением данных

```bash
docker-compose down -v
```

### Пересборка и запуск

```bash
docker-compose up --build
```

### Просмотр логов

```bash
# Все сервисы
docker-compose logs

# Только сервер
docker-compose logs server

# Только база данных
docker-compose logs database

# Логи в реальном времени
docker-compose logs -f
```

## Доступные сервисы

- **Сервер**: http://localhost:4000
- **База данных**: localhost:5433 (user: tattoo, password: tattoo_pass, db: tattoo_db)

## Переменные окружения

### Настройка переменных

1. Скопируйте файл `env.example` в `.env`:

```bash
cp env.example .env
```

2. Отредактируйте файл `.env` и установите безопасные значения:

```bash
# Обязательно измените эти значения!
POSTGRES_PASSWORD=your-very-secure-password
JWT_SECRET=your-very-long-random-secret-key
```

### Доступные переменные

- `POSTGRES_USER` - пользователь базы данных (по умолчанию: tattoo)
- `POSTGRES_PASSWORD` - пароль базы данных (ОБЯЗАТЕЛЬНО измените!)
- `POSTGRES_DB` - название базы данных (по умолчанию: tattoo_db)
- `DB_PORT` - внешний порт базы данных (по умолчанию: 5433)
- `DATABASE_URL` - строка подключения к базе данных
- `PORT` - внешний порт сервера (по умолчанию: 3000)
- `NODE_ENV` - окружение (development/production)
- `JWT_SECRET` - секретный ключ для JWT токенов (ОБЯЗАТЕЛЬНО измените!)
- `JWT_ACCESS_TOKEN_EXPIRES_IN` - время жизни access токена
- `JWT_REFRESH_TOKEN_EXPIRES_IN` - время жизни refresh токена

### Безопасность

⚠️ **ВАЖНО**: Никогда не коммитьте файл `.env` в git! Он уже добавлен в `.gitignore`.

## 🔄 Как это работает

### **Режим разработки**:

- Монтирует исходный код для hot-reload
- Запускает `npm run start:dev`
- Идеально для разработки
- Простая команда: `docker-compose up`

## Разработка

Для разработки используется команда `npm run start:dev` с hot-reload.

## Продакшн

Для продакшна измените команду в `docker-compose.yml`:

```yaml
command: npm run start:prod
```

И установите `NODE_ENV: production` в переменных окружения.
