FROM node:20-alpine

RUN apk add --update --no-cache openssl1.1-compat

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build
