# 🔐 Настройка GitHub Secrets для автоматического деплоя

## 📋 Что нужно настроить:

### **1. Перейдите в ваш GitHub репозиторий:**

```
https://github.com/YOUR_USERNAME/tattoo-server/settings/secrets/actions
```

### **2. Добавьте следующие Secrets:**

#### **DIGITALOCEAN_HOST**

- **Value**: IP адрес вашего сервера (например: `164.92.133.111`)
- **Description**: IP адрес DigitalOcean Droplet

#### **DIGITALOCEAN_USER**

- **Value**: `root`
- **Description**: SSH пользователь для подключения к серверу

#### **DIGITALOCEAN_SSH_KEY**

- **Value**: Содержимое вашего приватного SSH ключа
- **Description**: Приватный SSH ключ для подключения к серверу

### **3. Как получить приватный SSH ключ:**

```bash
# На вашем Mac
cat ~/.ssh/id_ed25519
```

**Скопируйте ВСЕ содержимое** (включая `-----BEGIN OPENSSH PRIVATE KEY-----` и `-----END OPENSSH PRIVATE KEY-----`)

## 🚀 Как это работает:

1. **При мердже в main** → автоматически запускается деплой
2. **GitHub Actions** подключается к вашему серверу
3. **Обновляет код** из репозиториев
4. **Пересобирает** Docker контейнеры
5. **Перезапускает** приложение
6. **Проверяет** работоспособность

## 📝 Пример workflow:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    types: [closed]
```

**Это означает:**

- ✅ Деплой при прямом push в main
- ✅ Деплой при мердже Pull Request в main
- ❌ НЕ деплой при создании/обновлении PR

## 🔧 Дополнительные настройки:

### **Защита ветки main:**

1. Перейдите в `Settings` → `Branches`
2. Добавьте правило для `main`
3. Включите:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

### **Автоматические тесты:**

Добавьте в workflow:

```yaml
- name: 🧪 Run Tests
  run: |
    npm install
    npm run test
```

## 🎯 Результат:

После настройки каждый мердж в main будет автоматически деплоить приложение на ваш сервер! 🚀
