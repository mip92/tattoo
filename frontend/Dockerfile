# Multi-stage build для Next.js frontend
FROM node:22-alpine AS builder

# Принимаем build argument для API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Устанавливаем зависимости для сборки
RUN apk add --update --no-cache openssl

WORKDIR /app

# Копируем файлы зависимостей ПЕРВЫМИ для лучшего кеширования
COPY package*.json ./
COPY next.config.ts ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY tsconfig.json ./
COPY graphql.config.ts ./

# Устанавливаем ВСЕ зависимости (включая devDependencies для сборки)
RUN npm ci --production=false --no-audit --no-fund --prefer-offline --no-optional

# Копируем исходный код ПОСЛЕ установки зависимостей
COPY . .

# Генерируем GraphQL типы и собираем приложение
RUN npm run codegen
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Принимаем build argument для API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Устанавливаем только необходимые пакеты
RUN apk add --update --no-cache openssl

WORKDIR /app

# Копируем package.json для production зависимостей
COPY package*.json ./

# Устанавливаем ТОЛЬКО production зависимости
RUN npm ci --only=production --no-audit --no-fund --prefer-offline --no-optional

# Копируем собранное приложение из builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Ограничиваем память для Node.js
ENV NODE_OPTIONS="--max-old-space-size=128"

EXPOSE 3000

CMD ["npm", "start"]
