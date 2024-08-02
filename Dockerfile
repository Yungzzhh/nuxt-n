# 使用Node.js 20.15.0作为基础镜像
FROM node:20.15.0-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json(如果存在)
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建应用
RUN npm run build

# 暴露3000端口
EXPOSE 3000

# 设置环境变量
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# 启动命令
CMD [ "node", ".output/server/index.mjs" ]