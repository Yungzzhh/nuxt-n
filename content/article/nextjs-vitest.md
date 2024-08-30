---
title: 'Nextjs-单元测试'
description: 'A project about nextjs' 
time: '2024-08-30'
tag: '#Nextjs'
--- 

## 单元测试集成

采用 **vitest** 进行单元测试

- 安装

```bash
npm install vitest --save-dev
```

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

- 配置

```json
// package.json start nextjs with https
{
  "name": "nextjs-app",
  "scripts": { 
    "dev-https": "next dev --experimental-https", 
  }
}
```
