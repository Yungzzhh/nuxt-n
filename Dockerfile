# # 使用Node.js 20.15.0作为基础镜像
# FROM node:20.15.0-alpine

# # 设置工作目录
# WORKDIR /app

# # 复制package.json和package-lock.json(如果存在)
# COPY package*.json ./

# # 安装项目依赖
# RUN npm install

# # 复制项目文件到工作目录
# COPY . .

# # 构建应用
# RUN npm run build

# # 暴露3000端口
# EXPOSE 3000

# # 设置环境变量
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# # 启动命令
# CMD [ "node", ".output/server/index.mjs" ]
# 使用Node.js作为基础镜像
FROM node:18-alpine AS build

# 安装pnpm和必要的构建工具
# RUN apk add --no-cache python3 make g++ pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制pnpm-lock.yaml（如果存在）
COPY pnpm-lock.yaml* ./

# 复制package.json
COPY package.json ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件
COPY . .

# 如果.env.production存在则复制,否则尝试复制.env（如果存在）
RUN if [ -f .env.production ]; then \
  cp .env.production .env; \
  elif [ -f .env ] && [ ! -f .env.production ]; then \
  cp .env .env.tmp && mv .env.tmp .env; \
  fi

# 构建应用
RUN pnpm run build

# 生产环境
FROM node:18-alpine

# 安装pnpm和运行时所需的库
RUN apk add --no-cache libjpeg-turbo giflib \
  python3 make g++ pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev && \
  npm install -g pnpm

WORKDIR /app

# 从构建阶段复制必要文件
COPY --from=build /app/.output /app/.output
# COPY --from=build /app/.env /app/.env
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml

# 设置环境变量以跳过 husky 安装
ENV HUSKY=0

# 安装生产依赖
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 设置默认端口为3000，但允许从外部覆盖
ENV PORT=3000

# 暴露端口（使用环境变量）
EXPOSE $PORT

# 启动应用
CMD ["sh", "-c", "node .output/server/index.mjs"]