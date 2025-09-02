# Tattoo App - Automated Deployment Guide

## 🚀 Automated Application Deployment

This repository contains **infrastructure and automation** for deploying Tattoo App to a DigitalOcean server.

**🎯 Main goal**: Fully automated deployment without manual commands!

## ⚠️ Important: Setup of All Repositories

For full automation, you need to configure **THREE repositories**:

1. **`tattoo-nginx`** (this one) - infrastructure and automatic deployment ✅
2. **`tclient`** - automatic frontend image builds ⚠️
3. **`tserver`** - automatic backend image builds ⚠️

**📋 Instructions for setting up neighboring repositories**: [REPOSITORIES_SETUP.md](./REPOSITORIES_SETUP.md)

## 🏗️ Automation Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │───▶│  GitHub Actions │───▶│   Docker Hub    │
│   Repository    │    │  (tclient)      │    │   Images        │
│   (tclient)     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
┌─────────────────┐             │                       │
│   Backend       │─────────────┘                       │
│   Repository    │                                     │
│   (tserver)     │                                     │
└─────────────────┘                                     │
                                │                       ▼
                                ▼                ┌─────────────────┐
                       ┌─────────────────┐      │   Docker Hub    │
                       │  Infrastructure │◀─────│   Images        │
                       │  Repository     │      └─────────────────┘
                       │  (tattoo-nginx) │
                       └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  DigitalOcean   │
                       │     Server      │
                       └─────────────────┘
```

## 🔄 How Automation Works

### 1. **Frontend Updates** (`tclient` repository)

- On merge to `main` → automatic Docker image build
- Image is pushed to Docker Hub
- **This repository** can be triggered to deploy frontend when new images are available

### 2. **Backend Updates** (`tserver` repository)

- On merge to `main` → automatic Docker image build
- Image is pushed to Docker Hub
- **This repository** can be triggered to deploy backend when new images are available

### 3. **Infrastructure Changes** (this repository)

- On merge to `main` → full infrastructure redeployment
- Configuration updates, Nginx, environment variables

## 📁 Project Structure

```
tattoo-nginx/
├── .github/workflows/           # GitHub Actions for automatic deployment
│   ├── deploy-infrastructure.yml # Full infrastructure deployment
│   ├── deploy-frontend.yml      # Automatic frontend deployment
│   └── deploy-backend.yml       # Automatic backend deployment
├── docker-compose.prod.yml      # Production configuration
├── nginx/                       # Nginx configuration
├── REPOSITORIES_SETUP.md        # Instructions for setting up neighboring repositories
├── GITHUB_SECRETS_SETUP.md      # Instructions for setting up secrets
└── README.md                    # This file
```

## 🚀 What Happens Automatically

### **On merge to main of any repository:**

1. **Frontend merge** → manual trigger needed for frontend deployment
2. **Backend merge** → manual trigger needed for backend deployment
3. **Infrastructure merge** → full system redeployment

### **Manual triggers:**

- Deploy Frontend workflow can be triggered manually
- Deploy Backend workflow can be triggered manually
- Deploy Infrastructure workflow runs on push to main

## 🔧 Automation Setup

### Step 1: Setup this repository

Follow instructions in [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md)

#### Environment Variables Setup

Create `.env` file on the server in `/root/tattoo-app/` directory with the following content:

```bash
# Database Configuration
POSTGRES_USER=tattoo_user
POSTGRES_PASSWORD=tattoo_password_2024
POSTGRES_DB=tattoo_db

# Server Configuration
SERVER_PORT=3000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_2024_change_in_production
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=7d

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://backend:3000
```

**⚠️ Important**: Change passwords and JWT_SECRET to unique values for production!

### Step 2: Setup neighboring repositories

Follow instructions in [REPOSITORIES_SETUP.md](./REPOSITORIES_SETUP.md)

### Step 3: Verify functionality

1. Go to **Actions** in each repository
2. Select any workflow
3. Click **"Run workflow"**

### Step 4: Testing

- Make a test commit to main in each repository
- Check automatic deployment launch
- Ensure all services are working

## 🎯 Benefits of New System

✅ **Full automation** - no manual commands  
✅ **Security** - deployment only after merge to main  
✅ **Monitoring** - all deployments are logged in GitHub Actions  
✅ **Rollback** - easy return to previous version  
✅ **Separation of concerns** - each repository is responsible for its part

## 📊 Deployment Monitoring

### GitHub Actions Dashboard

- All deployments are displayed in **Actions** section
- Detailed logs of each stage
- Execution status (success/error)

### Automatic Notifications

- Successful deployment → ✅ green status
- Deployment error → ❌ red status with details
- Health checks → automatic functionality verification

## 🚨 What to Do When Problems Occur

### 1. **Check GitHub Actions logs**

- Go to Actions → select workflow → view logs

### 2. **Check server status**

```bash
ssh root@164.92.133.111 "docker ps"
```

### 3. **Run deployment manually**

- In GitHub Actions → select workflow → "Run workflow"

### 4. **Check secrets**

- Ensure all secrets are configured correctly
- Verify SSH key on server

## 🔄 Manual Deployment (if needed)

### Full infrastructure redeployment:

```bash
# In GitHub Actions → "Deploy Infrastructure" → "Run workflow"
```

### Frontend only deployment:

```bash
# In GitHub Actions → "Deploy Frontend" → "Run workflow"
```

### Backend only deployment:

```bash
# In GitHub Actions → "Deploy Backend" → "Run workflow"
```

## 📝 Setup Checklist

### In this repository (tattoo-nginx):

- [ ] GitHub Secrets configured (`SERVER_IP`, `SERVER_USER`, `SSH_PRIVATE_KEY`)
- [ ] SSH key added to server
- [ ] `.env` file created on server with environment variables
- [ ] First automatic deployment tested

### In tclient repository (frontend):

- [ ] `.github/workflows/` folder created
- [ ] Secrets configured (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`)
- [ ] Automatic build tested

### In tserver repository (backend):

- [ ] `.github/workflows/` folder created
- [ ] Secrets configured (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`)
- [ ] Automatic build tested

### General checks:

- [ ] All services functionality verified
- [ ] Notifications configured (optional)
- [ ] Full automation cycle tested

## 🎉 Result

After setup, you will have:

- 🚀 **Fully automated deployment**
- 📊 **Monitoring of all processes**
- 🔒 **Secure update system**
- 📈 **Scalable infrastructure**

**Setup time**: ~30 minutes (all three repositories)  
**Deployment time**: ~2-5 minutes  
**Automation**: 100%

---

## 📞 Support

If problems occur:

1. Check logs in GitHub Actions
2. Verify secrets are correct
3. Check server status
4. Run deployment manually if needed

**🎯 Now you can simply merge code to main and get automatic deployment!**
