---
title: 'Nextjs-Auth'
description: 'auth low cost' 
time: '2024-09-04'
tag: '#Nextjs'
--- 

## 使用 NextAuth 实现登录

### 概念

```markdown
Next-Auth 使用 JWT（JSON Web Token）来管理会话。当用户登录成功后，服务器会生成一个包含用户信息的 JWT，并将其存储在 cookie 中发送给客户端。客户端在后续的请求中会自动将这个 cookie 发送回服务器，服务器通过验证 JWT 的有效性来确定用户的登录状态。

下面是 Next-Auth 维护登录状态的基本流程：

用户通过 GitHub 进行身份验证，并授权应用访问其 GitHub 账户信息。

GitHub 将用户重定向回应用，并携带授权码（authorization code）。

应用使用授权码向 GitHub 请求访问令牌（access token）。

应用使用访问令牌获取用户的 GitHub 个人信息。

应用在服务器端创建一个会话，并生成包含用户信息的 JWT。

服务器将 JWT 存储在 cookie 中，并将其发送给客户端。

客户端在后续的请求中自动将 cookie 发送回服务器。

服务器通过验证 JWT 的有效性来确定用户的登录状态。

如果 JWT 有效，则用户被视为已登录状态，可以访问受保护的路由和资源。

如果用户注销，服务器会销毁会话并清除相关的 cookie。

Next-Auth 提供了一些配置选项来自定义会话的行为，例如会话的有效期、cookie 的名称和选项等。你可以根据自己的需求进行配置。

总之，Next-Auth 通过使用 JWT 和 cookie 来自动维护用户的登录状态，简化了身份验证的过程。你只需要配置好 Next-Auth，并在需要的地方使用提供的 API 来检查用户的登录状态即可。
```

### 前置

### 安装

```bash
npm install next-auth
```
