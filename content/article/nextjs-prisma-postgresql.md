---
title: 'Nextjs 使用 Prisma 连接 Postgresql'
description: '初步学习Nextjs' 
time: '2024-09-03'
tag: '#Backend,#Nextjs'
--- 
 

## Nextjs 使用 Prisma 连接 Postgresql

### 前置准备

- 安装nodejs
- 安装postgresql

```bash
brew install postgresql@14

export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"

source ~/.zshrc

brew services start postgresql@14
```

可以通过
```bash
brew services list | grep postgresql
```
检查 PostgreSQL 服务是否正在运行



### 创建项目

- 创建nextjs项目

- 安装prisma

```bash
npm install prisma --save-dev && npm install @prisma/client
npx prisma init
```

### 配置数据库

- .env 文件中添加
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/todolist?schema=public"
```
现在基于本地的postgresql进行开发，则需要改为

```bash
DATABASE_URL="postgresql://[你的系统用户名]@localhost:5432/todolist?schema=public"
```

#### 创建库
- 在 prisma/schema.prisma 中添加
```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
表的例子
```bash
modal Todos {
  id String @id @default(cuid())
  title String
  completed Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

然后执行
```bash
npx prisma migrate dev --name init
```

- 当你修改了表结构，需要重新生成表结构
```bash
npx prisma generate
```

- 如果需要新增表
```bash
npx prisma migrate dev --name add_[表名]_table
npx prisma generate
```

- 如果需要删除表
在prisma/schema.prisma中删除表，然后执行
```bash
npx prisma generate
```

### 可视化数据库
```bash
npx prisma studio
```

或者 通过扩展 PostgreSQL by clickhouse 连接数据库


<!-- 

- 通过bash安装 postgres 
```bash


DATABASE_URL="postgresql://localhost:5432/todolist?schema=public"
DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/todolist?schema=public"
DATABASE_URL="postgresql://[你的系统用户名]@localhost:5432/todolist?schema=public"
npx prisma db push 
``` -->
 

<!-- ## 记录学习使用Docker

创建 PostgreSQL 实例

文件根目录下创建 `docker-compose.yml` 文件

```yaml
# docker-compose.yml
version: '3.1'
services:
  db:
    image: postgres
    volumes:
       - ./postgres:/var/lib/postgresql/data
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

一个是 postgres 对应 5432 端口，volumes 卷代表文件映射，将容器中的数据库映射到当前主机，避免容器服务销毁的时候数据库丢失。

另一个 adminer 是一个轻量的数据库管理客户端，支持多种关系型数据库，启动在 8080 端口。

保证端口不被占用的同时还需要将 Docker 打开

```bash
docker-compose up -d
```
 -->
