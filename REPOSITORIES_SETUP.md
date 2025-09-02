# 🔧 Neighboring Repositories Setup

## 📋 What needs to be configured

To enable full deployment automation, you need to configure GitHub Actions in the `tclient` and `tserver` repositories.

## 🎯 `tclient` Repository (Frontend)

### 1. Create `.github/workflows/` folder

```bash
mkdir -p .github/workflows/
```

### 2. Create `build-and-push.yml` file in `.github/workflows/` with frontend build configuration

### 3. Configure GitHub Secrets

Go to `Settings → Secrets and variables → Actions → New repository secret`

#### `DOCKERHUB_USERNAME`

- **Value**: `mip92`
- **Description**: Your Docker Hub username

#### `DOCKERHUB_TOKEN`

- **Value**: Your Docker Hub access token
- **Description**: Docker Hub access token (NOT password!)

## 🎯 `tserver` Repository (Backend)

### 1. Create `.github/workflows/` folder

```bash
mkdir -p .github/workflows/
```

### 2. Create `build-and-push.yml` file in `.github/workflows/` with backend build configuration

### 3. Configure GitHub Secrets

Go to `Settings → Secrets and variables → Actions → New repository secret`

#### `DOCKERHUB_USERNAME`

- **Value**: `mip92`
- **Description**: Your Docker Hub username

#### `DOCKERHUB_TOKEN`

- **Value**: Your Docker Hub access token
- **Description**: Docker Hub access token (NOT password!)

## 🔑 How to get Docker Hub Access Token

### 1. Login to Docker Hub

Go to https://hub.docker.com/

### 2. Create Access Token

- `Account Settings` → `Security` → `New Access Token`
- Name: `github-actions`
- Permissions: `Read & Write`
- Copy the token

### 3. Add token to GitHub Secrets

- In each repository, add `DOCKERHUB_TOKEN` with this token

## 🔄 How automation works now

### **Full automation cycle:**

1. **You merge code to `tclient` main**
   → GitHub Actions automatically builds and pushes `mip92/tattoo-client:latest`

2. **You merge code to `tserver` main**
   → GitHub Actions automatically builds and pushes `mip92/tattoo-server:latest`

3. **This repository manually**
   → Deploy workflows can be triggered manually when new images are available

## 📁 File structure

### In `tclient` repository:

```
tclient/
├── .github/
│   └── workflows/
│       └── build-and-push.yml  # ← Create frontend build workflow
├── Dockerfile
├── package.json
└── ... (other files)
```

### In `tserver` repository:

```
tserver/
├── .github/
│   └── workflows/
│       └── build-and-push.yml  # ← Create backend build workflow
├── Dockerfile
├── package.json
└── ... (other files)
```

## 🧪 Testing

### 1. **In `tclient` repository:**

- Make a test commit to main
- Check GitHub Actions → "Build and Push Frontend" should start
- Ensure image appears in Docker Hub

### 2. **In `tserver` repository:**

- Make a test commit to main
- Check GitHub Actions → "Build and Push Backend" should start
- Ensure image appears in Docker Hub

### 3. **In this repository:**

- Manually run "Deploy Frontend"/"Deploy Backend" workflows when new images are available
- Check that new images are deployed when workflows are triggered

## 🚨 Important notes

### **Security:**

- Docker Hub access token should have `Read & Write` permissions
- Token should be added to GitHub Secrets
- DO NOT commit token to code!

### **Access permissions:**

- Ensure you have push rights to Docker Hub repository `mip92/tattoo-client`
- Ensure you have push rights to Docker Hub repository `mip92/tattoo-server`

### **Verification:**

- After setup, verify that images are built and pushed
- Check that multi-arch build works (amd64 + arm64)

## 🎉 Result

After setting up all three repositories, you will have:

✅ **Fully automated CI/CD pipeline**  
✅ **Automatic build on merge to main**  
✅ **Automatic deployment to production server**  
✅ **Monitoring of all processes**  
✅ **Zero-downtime deployments**

**Now you can simply merge code and get automatic deployment!** 🚀
