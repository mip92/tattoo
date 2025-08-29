# 🔧 Настройка соседних репозиториев

## 📋 Что нужно настроить

Для полной автоматизации деплоя необходимо настроить GitHub Actions в репозиториях `tclient` и `tserver`.

## 🎯 Репозиторий `tclient` (Frontend)

### 1. Создайте папку `.github/workflows/`

```bash
mkdir -p .github/workflows/
```

### 2. Скопируйте файл `frontend-workflow.yml` в `.github/workflows/build-and-push.yml`

### 3. Настройте GitHub Secrets

Перейдите в `Settings → Secrets and variables → Actions → New repository secret`

#### `DOCKER_USERNAME`

- **Значение**: `mip92`
- **Описание**: Ваш Docker Hub username

#### `DOCKER_PASSWORD`

- **Значение**: Ваш Docker Hub access token
- **Описание**: Docker Hub access token (НЕ пароль!)

## 🎯 Репозиторий `tserver` (Backend)

### 1. Создайте папку `.github/workflows/`

```bash
mkdir -p .github/workflows/
```

### 2. Скопируйте файл `backend-workflow.yml` в `.github/workflows/build-and-push.yml`

### 3. Настройте GitHub Secrets

Перейдите в `Settings → Secrets and variables → Actions → New repository secret`

#### `DOCKER_USERNAME`

- **Значение**: `mip92`
- **Описание**: Ваш Docker Hub username

#### `DOCKER_PASSWORD`

- **Значение**: Ваш Docker Hub access token
- **Описание**: Docker Hub access token (НЕ пароль!)

## 🔑 Как получить Docker Hub Access Token

### 1. Войдите в Docker Hub

Перейдите на https://hub.docker.com/

### 2. Создайте Access Token

- `Account Settings` → `Security` → `New Access Token`
- Название: `github-actions`
- Права: `Read & Write`
- Скопируйте токен

### 3. Добавьте токен в GitHub Secrets

- В каждом репозитории добавьте `DOCKER_PASSWORD` с этим токеном

## 🔄 Как теперь работает автоматизация

### **Полный цикл автоматизации:**

1. **Вы мержите код в `tclient` main**
   → GitHub Actions автоматически собирает и пушит `mip92/tattoo-client:latest`

2. **Вы мержите код в `tserver` main**
   → GitHub Actions автоматически собирает и пушит `mip92/tattoo-server:latest`

3. **Этот репозиторий каждые 6 часов**
   → Проверяет обновления образов и автоматически деплоит на сервер

## 📁 Структура файлов

### В `tclient` репозитории:

```
tclient/
├── .github/
│   └── workflows/
│       └── build-and-push.yml  # ← Скопировать frontend-workflow.yml
├── Dockerfile
├── package.json
└── ... (остальные файлы)
```

### В `tserver` репозитории:

```
tserver/
├── .github/
│   └── workflows/
│       └── build-and-push.yml  # ← Скопировать backend-workflow.yml
├── Dockerfile
├── package.json
└── ... (остальные файлы)
```

## 🧪 Тестирование

### 1. **В `tclient` репозитории:**

- Сделайте тестовый коммит в main
- Проверьте GitHub Actions → должен запуститься "Build and Push Frontend"
- Убедитесь, что образ появился в Docker Hub

### 2. **В `tserver` репозитории:**

- Сделайте тестовый коммит в main
- Проверьте GitHub Actions → должен запуститься "Build and Push Backend"
- Убедитесь, что образ появился в Docker Hub

### 3. **В этом репозитории:**

- Подождите до 6 часов или запустите вручную "Deploy Frontend"/"Deploy Backend"
- Проверьте, что новые образы автоматически задеплоились

## 🚨 Важные моменты

### **Безопасность:**

- Docker Hub access token должен иметь права `Read & Write`
- Токен должен быть добавлен в GitHub Secrets
- НЕ коммитьте токен в код!

### **Права доступа:**

- Убедитесь, что у вас есть права на push в Docker Hub репозиторий `mip92/tattoo-client`
- Убедитесь, что у вас есть права на push в Docker Hub репозиторий `mip92/tattoo-server`

### **Проверка:**

- После настройки проверьте, что образы собираются и пушатся
- Проверьте, что multi-arch сборка работает (amd64 + arm64)

## 🎉 Результат

После настройки всех трех репозиториев у вас будет:

✅ **Полностью автоматизированный CI/CD pipeline**  
✅ **Автоматическая сборка при мерже в main**  
✅ **Автоматический деплой на продакшн сервер**  
✅ **Мониторинг всех процессов**  
✅ **Zero-downtime деплои**

**Теперь вы можете просто мержить код и получать автоматический деплой!** 🚀
