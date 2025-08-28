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

# Создаем .env файл если его нет
if [ ! -f ".env" ]; then
    echo "🔐 Creating .env file..."
    cat > .env << EOF
# Database Configuration
POSTGRES_USER=tattoo_user
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=tattoo_db
DATABASE_URL=postgresql://tattoo_user:\${POSTGRES_PASSWORD}@database:5432/tattoo_db

# JWT Configuration
JWT_SECRET=$(openssl rand -base64 64)
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=7d

# Frontend Configuration
NEXT_PUBLIC_API_URL=https://your-domain.com/graphql
EOF
    echo "✅ .env file created"
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
