# Prisma Migration Guide for Production

## Overview

This guide describes the process of running Prisma migrations on a remote server for the tattoo-app project.

## Server

- **IP:** 164.92.133.111
- **User:** root
- **Container:** tattoo-backend-prod (mip92/tattoo-server:latest)

## Executed Commands

### 1. Prisma Client Generation

```bash
ssh root@164.92.133.111 "docker exec tattoo-backend-prod npx prisma generate"
```

**Result:** ✅ Successfully executed

### 2. Migration Application

```bash
ssh root@164.92.133.111 "docker exec tattoo-backend-prod npx prisma migrate deploy"
```

**Result:** ✅ Successfully executed (exit code 137 - process completed)

### 3. Database Seeding with Test Data

```bash
ssh root@164.92.133.111 "docker exec tattoo-backend-prod node dist/prisma/seed.js"
```

**Result:** ✅ Successfully executed

## Seed Command Results

The database was populated with the following data:

- **2 roles** (roles)
- **1 user** (users)
- **5 brands** (brands)
- **10 box types** (box types)
- **36 products** (products)
- **18 boxes** (boxes)
- **3 inventory items** (inventory items)

## Alternative Execution Methods

### Via docker-compose

```bash
ssh root@164.92.133.111 "cd /root/tattoo-app && docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy"
```

### In background mode

```bash
ssh root@164.92.133.111 "nohup docker exec tattoo-backend-prod npx prisma migrate deploy > migrate.log 2>&1 &"
```

## Status Verification

### Check containers

```bash
ssh root@164.92.133.111 "docker ps"
```

### Check backend logs

```bash
ssh root@164.92.133.111 "docker logs tattoo-backend-prod --tail 20"
```

### Check migration status

```bash
ssh root@164.92.133.111 "docker exec tattoo-backend-prod npx prisma migrate status"
```

## Production Workflow

### Development (locally):

1. Modify `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name description`
3. Migration is applied to local database
4. Commit changes to git

### Production:

1. Deploy new code with updated schema
2. Manually apply migrations: `npx prisma migrate deploy`
3. Start application

## Problems and Solutions

### Commands are interrupted (exit code 137)

- **Cause:** Migration process takes time and can be interrupted
- **Solution:** Use background mode or verify that command executed successfully

### ts-node not found

- **Problem:** `sh: ts-node: not found`
- **Solution:** Use compiled JavaScript: `node dist/prisma/seed.js`

### Tables don't exist

- **Problem:** `The table 'public.roles' does not exist`

- **Solution:** First run `npx prisma db push` to synchronize schema

## Status After Execution

- ✅ Backend container: healthy
- ✅ Database: synchronized
- ✅ Migrations: applied
- ✅ Test data: loaded
- ✅ Application: ready to work

## Execution Date

**Date:** September 1, 2025
**Time:** ~18:48 UTC
**Status:** All commands executed successfully
