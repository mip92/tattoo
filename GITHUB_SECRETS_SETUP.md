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

#### `POSTGRES_USER`

- **Value**: Your PostgreSQL username
- **Description**: Database user for PostgreSQL connection

#### `POSTGRES_PASSWORD`

- **Value**: Your PostgreSQL password
- **Description**: Database password for PostgreSQL connection

#### `POSTGRES_DB`

- **Value**: Your PostgreSQL database name
- **Description**: Database name for the application

#### `DATABASE_URL`

- **Value**: `postgresql://username:password@postgres:5432/database_name`
- **Description**: Full database connection URL

#### `SERVER_PORT`

- **Value**: `3000`
- **Description**: Port for the backend server

#### `JWT_SECRET`

- **Value**: Your JWT secret key
- **Description**: Secret key for JWT token generation

#### `JWT_ACCESS_TOKEN_EXPIRES_IN`

- **Value**: `15m`
- **Description**: Access token expiration time

#### `JWT_REFRESH_TOKEN_EXPIRES_IN`

- **Value**: `7d`
- **Description**: Refresh token expiration time

#### `NEXT_PUBLIC_API_URL`

- **Value**: `http://164.92.133.111/graphql`
- **Description**: Public API URL for frontend

#### `S3_ACCESS_KEY_ID`

- **Value**: Your S3 access key ID
- **Description**: S3 storage access key ID

#### `S3_SECRET_ACCESS_KEY`

- **Value**: Your S3 secret access key
- **Description**: S3 storage secret access key

#### `S3_BUCKET_NAME`

- **Value**: Your S3 bucket name
- **Description**: S3 bucket name for file storage

#### `S3_ENDPOINT`

- **Value**: Your S3 endpoint URL
- **Description**: S3 service endpoint URL

#### `S3_PUBLIC_DOMAIN`

- **Value**: Your S3 public domain
- **Description**: Public domain for accessing S3 files

#### `ALLOWED_ORIGINS`

- **Value**: Comma-separated list of allowed origins (e.g., `http://localhost:3000,https://yourdomain.com`)
- **Description**: CORS configuration for allowed origins

#### `MAIL_HOST`

- **Value**: Your mail server host (e.g., `smtp.gmail.com`)
- **Description**: SMTP server host for sending emails

#### `MAIL_PORT`

- **Value**: Your mail server port (e.g., `587` or `465`)
- **Description**: SMTP server port for sending emails

#### `MAIL_LOGIN`

- **Value**: Your mail server username/email
- **Description**: SMTP server authentication username

#### `MAIL_PASSWORD`

- **Value**: Your mail server password/app password
- **Description**: SMTP server authentication password

#### `DOCKERHUB_USERNAME`

- **Value**: Your Docker Hub username
- **Description**: Docker Hub username for image publishing

#### `DOCKERHUB_TOKEN`

- **Value**: Your Docker Hub access token
- **Description**: Docker Hub access token for authentication

#### `PAT_TOKEN`

- **Value**: Your GitHub Personal Access Token
- **Description**: GitHub token for repository dispatch events

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
