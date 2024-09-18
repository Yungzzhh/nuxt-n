---
title: 'Nextjs-Docker'
description: 'auth low cost' 
time: '2024-09-04'
tag: '#Nextjs'
--- 


希望使用Github Action 部署到服务器
通过Docker Compose 部署


Github Action 配置

```yml
name: Deploy Next Application

on:
  # push:
  #   branches:
  #     - main # 或你希望触发部署的分支
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20" # 根据你的项目需要选择 Node.js 版本

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9 # 使用最新的稳定版本，你也可以指定具体版本

      - name: Install system dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y build-essential libvips-dev
      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Build Nuxt application
        run: pnpm run build --verbose

      - name: Prepare deployment package
        run: |
          tar -czf deployment.tar.gz -C .output .

      - name: Copy file to server
        uses: appleboy/scp-action@v0.1.4
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.PORT }}
          source: "deployment.tar.gz"
          target: "/home/michael/next-blog"

      - name: Deploy to Server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.PORT }}
          script: |
            cd /home/michael/next-blog
            rm -rf .output
            tar -xzf deployment.tar.gz
            rm deployment.tar.gz
            pm2 restart rzh-next-blog

```

HOST: 服务器ip

USERNAME: root

SSH_PRIVATE_KEY: 私钥 可以进入ssh管理处获取

PORT 需要到服务器上获取 可以进入ssh管理处获取

Docker Compose 配置

```yml
name: Build and Deploy Docker Image

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Build Docker image
        run: |
          docker build -t michael/next-blog:latest .
          docker save michael/next-blog:latest > image.tar

      - name: Copy Docker image and docker-compose file to server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.PORT }}
          source: "image.tar,docker-compose.yml"
          target: "/home/michael/next-blog-deploy"

      - name: Deploy on server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.PORT }}
          script: |
            cd /home/michael/next-blog-deploy
            docker load < image.tar
            cd /home/michael/next-blog-deploy/docker-compose.yml
            docker compose up -d
            rm image.tar

```