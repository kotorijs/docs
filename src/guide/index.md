# 前言

> [!IMPORTANT]
> 阅读本章前请确保你已阅读完毕 [入门教程](../basic/start)。

---

> [!WARNING]
> 虽然目前开发文档已涵盖大部分基础内容，但在 v1.6 版本中刚加入的不少新特性并未在文档中更新。

## 前置要求

- 拥有一定的 JavaScript 与 Node.js 知识基础。

Kotori 运行于 Node.js 环境，因此开发 Kotori 模块前掌握 JavaScript 与 Node.js 基础内容是必然的。此处推荐几个文档：

- [JavaScript 教程](https://wangdoc.com/javascript)
- [ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)

> 基于 TypeScript 与现代化 ECMAScript 开发。

TypeScript 是 JavaScript 的超集，TypeScript 在继承了 JavaScript 全部特性的同时，为弱类型动态语言的 JavaScript 提供了一个独立且强大的类型系统。同时，使用 TypeScript 基本意味着使用 ESModule 与现代化的 JavaScript 语法与规范，这是 Kotori 三大特点之一。理论上在 Kotori 程序的生产环境中可正常运行由 JavaScript 直接编写的模块，但 Kotori 本身便使用 TypeScript 开发，因此更推荐你使用 TypeScript 用于你的模块开发，尽管这并不是必须的。

- [TypeScript 教程](https://wangdoc.com/typescript)

## 读后

- [接口文档](../api/)
  用于全面了解与查阅 Kotori 提供的所有公开 API。
- [深入了解](../advanced/)
  Kotori 的开发历程、版本记录、运行流程、设计构思、设计参考等。
