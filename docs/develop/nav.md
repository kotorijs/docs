# 总览

- 快速入门
  - [环境搭建](./start/environment.md)
  - [项目构建](/start/setup.md)
  - [模块发布](/start/publish.md)
- 基础设施
  - [事件订阅（Events）](./base/events.md)
  - [指令注册（Command）](./base/command.md)
  - [中间件（Middleware）](./base/middleware.md)
  - [正则匹配（Regexp）](./base/regexp.md)
  - [计划任务（schedule）](./base/schedule.md)
- 模块系统
  - [插件范式（Plugin）](./modules/plugin.md)
  - [上下文（Context）](./modules/context.md)
  - [动态检查（Schema）](./modules/schema.md)
  - [生命周期（Lifecycle）](./modules/lifecycle.md)
  - [依赖与服务（Service）](./modules/service.md)
- 适配器
  - [实现元素类（Elements）](./adapter/elements.md)
  - [实现接口类（Api）](./adapter/api.md)
  - [实现适配器类（Adapter）](./adapter/adapter.md)
  - [数据库服务（Database）](./adapter/database.md)
  - [自定义服务（Custom）](./adapter/custom.md)
- 扩展功能
  - [滤器（Filter）](./extend/filter.md)
  - [内部接口（Internal）](./extend/internal.md)
  - [数据库（Database）](./extend/database.md)
  - [国际化（i18n）](./extend/i18n.md)
  - [日志打印（Logger）](./extend/logger.md)
  - [工具函数（Tools）](./extend/tools.md)

::: tip
阅读本章前请确保你已阅读完毕 [使用指南](../guide/README.md)。
:::

## 前置要求

> 拥有一定的 JavaScript 与 Node.js 知识基础。

Kotori 运行于 Node.js 环境，因此开发 Kotori 插件需掌握 JavaScript 与 Node.js 基础内容是必然的。此处推荐几个相关文档：

- [JavaScript 教程](https://wangdoc.com/javascript)
- [ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)

> 基于 TypeScript 与现代化 ECMAScript 开发。

TypeScript 是 JavaScript 的超集，TypeScript 在继承了 JavaScript 全部特性的同时，为弱类型动态语言的 JavaScript 提供了一个独立且强大的类型系统。同时，使用 TypeScript 基本意味着使用 ESModule 与现代化的 JavaScript 语法与规范，这是 Kotori 三大特点之一。理论上在 Kotori 程序的生产环境中可正常运行由 JavaScript 直接编写的模块，但 Kotori 本身便使用 TypeScript 开发，因此更推荐你使用 TypeScript 用于你的模块开发。

- [TypeScript 教程](https://wangdoc.com/typescript)

## 读后

- [接口文档](../api)
  用于全面了解与查阅 Kotori 提供的所有公开 API。
- [深入了解](../deep)
  Kotori 的开发历程、版本记录、运行流程、设计构思、设计参考等。
