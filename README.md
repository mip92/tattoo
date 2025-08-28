# Tattoo Server - Backend Repository

Этот репозиторий содержит backend код и конфигурацию для деплоя всего приложения.

## 🏗️ Структура проекта

```
tattoo-server/
├── backend/          # Backend код (NestJS)
├── frontend/         # Frontend код (клонированный из tfront repo)
├── nginx/            # Nginx конфигурация
├── docker-compose.prod.yml  # Docker Compose для продакшена
├── .env.local        # Локальные переменные окружения
└── .github/workflows/ # CI/CD для автоматического деплоя
```

## 🚀 Как управлять изменениями

### Backend изменения (в этом репозитории)

```bash
# Редактируем backend код
cd backend/
# ... вносим изменения ...

# Коммитим и пушим
git add .
git commit -m "feat: add new API endpoint"
git push origin main
```

### Frontend изменения (в tfront репозитории)

```bash
# Редактируем frontend код
cd frontend/
# ... вносим изменения ...

# Коммитим и пушим в tfront репозиторий
git add .
git commit -m "feat: add new component"
git push origin main  # пушим в tfront repo
```

## 🔄 Синхронизация frontend

Если frontend код изменился в tfront репозитории:

```bash
cd frontend/
git fetch origin
git reset --hard origin/main
```

## 🐳 Локальный запуск

```bash
# Клонируем репозитории
./clone-repos.sh

# Запускаем локально
docker-compose -f docker-compose.prod.yml --env-file .env.local up -d

# Проверяем статус
docker-compose -f docker-compose.prod.yml ps
```

## 🌐 Доступ к приложению

- **Frontend**: http://localhost/
- **Backend API**: http://localhost/graphql
- **Health Check**: http://localhost/health

## 📝 Файлы, которые НЕ идут в Git

- `.env.local` - локальные переменные окружения
- `node_modules/` - зависимости
- `dist/`, `build/` - собранные файлы
- `logs/` - логи
- Временные файлы

## 🚀 Автоматический деплой

При пуше в `main` ветку этого репозитория автоматически запускается деплой на DigitalOcean сервер.

## 📋 Требования

- Docker & Docker Compose
- Node.js 18+
- Git
# tattoo
