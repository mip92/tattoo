# Multi-stage build for Next.js frontend
FROM node:22-alpine AS builder

# Accept build argument for API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Install dependencies for build
RUN apk add --update --no-cache openssl

WORKDIR /app

# Copy dependency files FIRST for better caching
COPY package*.json ./
COPY next.config.ts ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY tsconfig.json ./
COPY graphql.config.ts ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci --production=false --no-audit --no-fund --prefer-offline --no-optional

# Copy source code AFTER installing dependencies
COPY . .

# Generate GraphQL types
RUN npm run codegen

# Build application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Accept build argument for API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Install only necessary packages
RUN apk add --update --no-cache openssl

WORKDIR /app

# Copy package.json for production dependencies
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production --no-audit --no-fund --prefer-offline --no-optional

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Limit memory for Node.js
ENV NODE_OPTIONS="--max-old-space-size=128"

EXPOSE 3000

CMD ["npm", "start"]
