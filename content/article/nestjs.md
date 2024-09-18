--- 
title: 'Nestjs'
description: '--' 
time: '2024-08-13'
tag: '#Nestjs'
---

- CRUD 生成器
```bash
nest g resource [name]
```

- Controller 控制器
负责处理传入的请求并返回响应给客户端。它们定义路由和处理请求的方法,是应用程序的入口点
```bash
nest g controller [name]
```

- Service 服务
可能被视为提供者 - 服务、存储库、工厂、助手等。它们主要用于依赖注入。
```bash
nest g service [name]
```

- Module 模块
用@Module()装饰器注释的类。@Module()装饰器提供了元数据,Nest用它来组织应用程序结构
```bash
nest g module [name]
```

- Pipe 管道 
用@Injectable()装饰器注释的类。管道应实现PipeTransform接口。管道有两个典型的应用场景:
 - 转换:将输入数据转换为所需的形式
 - 验证:评估输入数据,如果有效,只需将其原样传递;否则,抛出异常
```bash
nest g pipe [name]
```

- 中间件
在路由处理程序之前调用的函数。中间件函数可以访问请求和响应对象,以及应用程序的请求-响应周期中的next()中间件函数

- Guard 守卫
一个使用@Injectable()装饰器的类。守卫应该实现CanActivate接口。守卫有一个单一责任。它们根据运行时出现的某些条件(例如权限、角色、ACL等)来确定给定的请求是否由路由处理程序处理。
```bash
nest g guard [name]
```

- Interceptor 拦截器
使用@Injectable()装饰器注释的类。拦截器应该实现NestInterceptor接口。拦截器具有一系列有用的功能,这些功能受面向切面编程(AOP)技术的启发。
```bash
nest g interceptor [name]
```

- Filter 过滤器
```bash
nest g filter [name]
```

- Exception 异常
负责处理整个应用程序中的所有抛出的异常
```bash
nest g exception [name]
``` 


### 修改一个 model 的数据结构时

```bash
npx prisma migrate dev --name add_password_to_user --create-only
```

在新的sql文件中替换成
```sql
-- 首先添加可为空的列
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- 更新现有行,设置一个临时密码
UPDATE "User" SET "password" = 'temporaryPassword';

-- 将列设置为非空
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
```

再进行应用迁移
```bash
npx prisma migrate dev
```