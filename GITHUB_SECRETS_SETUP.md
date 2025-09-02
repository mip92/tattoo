# 🔐 GitHub Secrets Setup for Automatic Deployment

## 📋 What needs to be configured

To enable automatic deployment, you need to add the following secrets to your repository settings:

### 1. Go to repository settings

```
Settings → Secrets and variables → Actions → New repository secret
```

### 2. Add the following secrets:

#### `SERVER_IP`

- **Value**: `164.92.133.111`
- **Description**: IP address of your DigitalOcean server

#### `SERVER_USER`

- **Value**: `root`
- **Description**: User for SSH connection to the server

#### `SSH_PRIVATE_KEY`

- **Value**: Content of your private SSH key
- **Description**: Private SSH key for server connection

## 🔑 How to get SSH key

### If you already have an SSH key:

```bash
cat ~/.ssh/id_rsa
# Copy ALL content (including BEGIN and END lines)
```

### If you need to create a new SSH key:

```bash
# Generate new key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id root@164.92.133.111

# Copy private key for GitHub
cat ~/.ssh/id_rsa
```

## ⚠️ Important notes

1. **SSH key must be added to the server** in `~/.ssh/authorized_keys`
2. **Private key should NOT contain extra characters** (spaces, line breaks)
3. **All secrets are case-sensitive** - use exact names
4. **After adding secrets** GitHub Actions will automatically have access to them

## 🧪 Testing

After setting up secrets:

1. **Go to Actions** in your repository
2. **Select any workflow** (e.g., "Deploy Infrastructure")
3. **Click "Run workflow"** → "Run workflow"
4. **Check execution logs**

## 🔄 Automation

After setup:

- **When merging to main** → automatic infrastructure deployment
- **Manual triggers** → deploy frontend/backend when needed
- **When images are updated** → automatic deployment

## 🚨 Security

- **SSH key** should be password protected
- **Server access** should be limited to necessary IPs only
- **Deployment logs** are only available to repository owners
- **Secrets** are encrypted and not visible in logs

## 📞 Support

If you have setup issues:

1. Check SSH key correctness
2. Ensure key is added to the server
3. Verify server access permissions
4. Check execution logs in GitHub Actions
