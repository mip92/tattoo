# Многоэтапная сборка для экономии ресурсов
FROM node:20-alpine AS builder

# Ограничиваем ресурсы для сборки
ENV NODE_OPTIONS="--max-old-space-size=256"

RUN apk add --update --no-cache openssl

WORKDIR /app

# Копируем только файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости с ограничениями
RUN npm ci --production=false --no-audit --no-fund

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение с ограничениями памяти
RUN npm run build

# Продакшн образ
FROM node:20-alpine AS production

RUN apk add --update --no-cache openssl

WORKDIR /app

# Копируем только необходимые файлы
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем только продакшн зависимости
RUN npm ci --only=production --no-audit --no-fund

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Генерируем Prisma клиент для продакшна
RUN npx prisma generate

# Ограничиваем ресурсы для запуска
ENV NODE_OPTIONS="--max-old-space-size=256"

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
