# 插件范式

## 前言

恭喜你，只要学习完本章你将成为一名合格的⌈Kotori Developer⌋！在本章将围绕 Kotori 中最重要的概念⌈上下文⌋为你讲解一系列模块化内容。

## 插件与模块

**插件（Plugin）** 是 Kotori 中的最小运行实例，它是模块的真子集，在真正学习到上下文之前，可暂且默认插件等同于模块。

在第一章里你已通过 Cli 初步创建了一个 Kotori 模块工程，但那并不是最小的有效模块，现在，让一切重零开始。

### package.json 规范

这是一个最小且有效的 package.json 例子：

```json
{
  "name": "kotori-plugin-my-project",
  "version": "1.0.0",
  "description": "This is my first Kotori plugin",
  "main": "lib/index.js",
  "keywords": [
    "kotori",
    "chatbot",
    "kotori-plugin"
  ],
  "license": "GPL-3.0",
  "files": [
    "lib",
    "locales",
    "LICENSE",
    "README.md"
  ],
  "author": "Himeno",
  "peerDependencies": {
    "kotori-bot": "^1.3.0"
  }
}
```

> [!TIP]
> 请不要模仿，package.json 应附有更详尽的包信息。

一个对于 Kotori 而言合法的 package.json 的类型信息大概是这样子：

```typescript
interface ModulePackage {
  name: string,
  version: string,
  description: string,
  main: string,
  license: 'GPL-3.0',
  keywords: string[],
  author: string | string[],
  peerDependencies: Record<string, string>,
  kotori?: {
    enforce?: 'pre' | 'post',
    meta?: {
      language?: 'en_US' | 'ja_JP' | 'zh_TW' | 'zh_CN'
    }
  }
}
```

但仅以 TypeScript 形式展现并不够全面，因为除此之外 Kotori 对合法的 package.json 有以下特殊要求：

- `name` 必须满足 `/kotori-plugin-[a-z]([a-z,0-9]{2,13})\b/`，即以「kotori-plugin-」加一个小写字母开头，后接 2 ~ 13 个 小写字母与数字的组合
- `license` 必须为 `'GPL-3.0'`，因为 Kotori 本身即使用的 GPL-3.0 协议
- `keywords` 中必须含有 `'kotori'`、`'chatbot'`、`'kotori-plugin'` 三个值，主要是为了 npm 包统计考虑
- `peerDependencies` 中必须含有名为 `'kotori-bot'` 的键，具体作用请参考 [Peer Dependencies](https://nodejs.org/en/blog/npm/peer-dependencies)

对于包名，除去普通模块以外，往往会有一些非强制性规范的特殊值：

- `kotori-plugin-adapter-xxx` 表示适配器服务
- `kotori-plugin-database` 表示数据库

### 元数据信息

在上面例子中，可能你已注意到除了常规的属性以外，还有一个为 `kotori` 的属性，其会被 Kotori 读取用作模块的额外信息，目前其中仅有 `meta` 一个属性，`meta` 之下有两个属性：

- `enforce` 模块加载顺序，对于某些前置性模块和自定义服务模块可能有用，Kotori 模块加载顺序：数据库服务 > 适配器服务 > 核心模块（模块列表请查看 Kotori 源码）> `'pre'` > `undefined` > `'post'`
- `language` 模块加载列表，若为 `undefined` 或 `[]` 则表示支持所有语言或无文字内容

### index.ts