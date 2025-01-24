# 网络服务

Kotori 提供了基于 axios 的 HTTP 客户端，但进行了更友好和符合 Kotori 设计理念的封装。`Http` 由 [`@kotori-bot/tools`](https://www.npmjs.com/package/@kotori-bot/tools) 库提供后经由 [`@kotori-bot/core`](https://www.npmjs.com/package/@kotori-bot/core) 库传递给 `kotori-bot` 重新导出。

## 基础使用

HTTP 客户端可以通过上下文直接访问，或创建新实例：

<<< @/demo/modules/my-project/src/extend-http.tsx#h1

支持的请求方法：

- `get`: GET 请求
- `post`: POST 请求
- `put`: PUT 请求
- `patch`: PATCH 请求
- `delete`: DELETE 请求
- `head`: HEAD 请求
- `options`: OPTIONS 请求

## 自定义实例

你可以创建自定义的 HTTP 实例，并进行配置扩展：

<<< @/demo/modules/my-project/src/extend-http.tsx#h2

## WebSocket 客户端和拦截器

除了基本的 HTTP 请求，还支持 WebSocket 连接和请求/响应拦截：

<<< @/demo/modules/my-project/src/extend-http.tsx#h3

> [!TIP]
> 建议使用上下文中的 `ctx.http` 实例，除非需要特殊配置。
