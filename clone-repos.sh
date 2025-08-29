#!/bin/bash

echo "📥 Cloning repositories for deployment..."

# Проверяем, что мы в правильной директории
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Клонируем backend репозиторий
echo "🔧 Setting up backend..."
if [ ! -d "backend" ]; then
    echo "📁 Cloning backend repository..."
    git clone https://github.com/mip92/tserver.git backend
    echo "✅ Backend repository cloned to backend/ directory"
else
    echo "✅ Backend directory already exists"
fi

# Клонируем frontend репозиторий
echo "🎨 Setting up frontend..."
if [ ! -d "frontend" ]; then
    echo "📁 Cloning frontend repository..."
    git clone https://github.com/mip92/tfront.git frontend
    echo "✅ Frontend repository cloned to frontend/ directory"
else
    echo "✅ Frontend directory already exists"
fi

# Проверяем .env файл
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found! Please create it manually with proper configuration"
    echo "   Required variables: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DATABASE_URL, JWT_SECRET"
else
    echo "✅ .env file exists"
fi

echo ""
echo "🎉 Repository setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update NEXT_PUBLIC_API_URL in .env with your domain"
echo "2. Frontend will use npm run start (no Dockerfile needed)"
echo "3. Run: docker-compose -f docker-compose.prod.yml up -d"
echo ""
echo "📁 Directory structure:"
echo "├── backend/          # NestJS API"
echo "├── frontend/         # Next.js app"
echo "├── nginx/            # Nginx config"
echo "├── docker-compose.prod.yml"
echo "└── .env"
