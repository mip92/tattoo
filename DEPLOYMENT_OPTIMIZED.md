# 🚀 Оптимизированный деплой для слабого сервера

## 📋 Стратегия деплоя

Вместо сборки на слабом сервере (512MB RAM, 1 CPU), мы:

1. **Собираем образ локально** (на мощной машине)
2. **Пушим в GitHub Container Registry (ghcr.io)**
3. **На сервере только `docker pull` + `docker-compose up`**

## 🔧 Локальная сборка и пуш

### 1. Подготовка

```bash
# Логинимся в GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Или через браузер
docker login ghcr.io
```

### 2. Сборка и пуш

```bash
# Собираем образ локально и пушим в registry
./build-and-push.sh
```

## 🖥️ Деплой на сервере

### 1. Клонируем проект

```bash
git clone https://github.com/oleksandrboicenko/tattoo-server.git
cd tattoo-server
```

### 2. Запускаем деплой

```bash
# Только pull образа и запуск (БЕЗ сборки!)
./deploy-server.sh
```

## 📊 Экономия ресурсов

### ❌ Старый способ (на сервере):

- `npm ci` - очень ресурсоемко
- `npm run build` - может уронить сервер
- Общее время: 2-5 минут
- Риск падения сервера: **ВЫСОКИЙ**

### ✅ Новый способ (локально + registry):

- **Сборка:** 0% ресурсов сервера
- **Деплой:** только `docker pull` + запуск
- Общее время: 30-60 секунд
- Риск падения сервера: **МИНИМАЛЬНЫЙ**

## 🐳 Docker образы

### Registry

- **Backend:** `ghcr.io/oleksandrboicenko/tattoo-server:latest`
- **Database:** `postgres:15-alpine` (из Docker Hub)
- **Frontend:** `node:22-alpine` (из Docker Hub)
- **Nginx:** `nginx:alpine` (из Docker Hub)

### Размеры образов

- **Backend:** ~200-300MB
- **Database:** ~200MB
- **Frontend:** ~100MB
- **Nginx:** ~50MB

## 🔄 Workflow деплоя

```mermaid
graph LR
    A[Локальная машина] --> B[Сборка образа]
    B --> C[Пуш в ghcr.io]
    C --> D[Сервер]
    D --> E[docker pull]
    E --> F[docker-compose up]
```

## 🚨 Troubleshooting

### Ошибка авторизации в registry

```bash
# Проверяем токен
echo $GITHUB_TOKEN

# Логинимся заново
docker login ghcr.io
```

### Ошибка загрузки образа

```bash
# Проверяем доступность
docker pull ghcr.io/oleksandrboicenko/tattoo-server:latest

# Проверяем права доступа к registry
```

### Ошибка запуска контейнеров

```bash
# Проверяем логи
docker-compose -f docker-compose.prod.yml logs

# Проверяем статус
docker-compose -f docker-compose.prod.yml ps
```

## 💡 Преимущества

1. **Сервер не падает** от сборки
2. **Быстрый деплой** (30-60 сек вместо 2-5 мин)
3. **Надежность** - образ протестирован локально
4. **Масштабируемость** - легко развернуть на нескольких серверах
5. **Версионирование** - можно откатиться к предыдущей версии
