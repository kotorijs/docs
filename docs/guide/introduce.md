# 简介

[![Build](https://hotaru.icu/api/agent/?url=https://github.com/kotorijs/kotori/actions/workflows/build.yml/badge.svg&content-type=image%2Fsvg%2Bxml)](https://github.com/kotorijs/kotori/actions/workflows/build.yml) ![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/biyuehu/biyuehu) ![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/kotorijs/kotori/master) ![GitHub contributors](https://img.shields.io/github/contributors/biyuehu/kotori-bot) ![GitHub](https://img.shields.io/github/license/biyuehu/kotori-bot?color=deepgreen) ![GitHub Repo stars](https://img.shields.io/github/stars/biyuehu/kotori-bot?style=social)

::: warning
`KotoriV1` 文档正在建设并完善中
:::

---

kotori 是一个**跨平台、解耦合、现代化**于一体的聊天机器人框架，运行于 NodeJS 环境并使用 TypeScript 语言开发。

---

## 概述

「Kotori」是一个罗马字，在日语中是「ことり」（小鳥）的意思，发音为 `/kotoɾʲi‾/`<!--  <Voice /> -->，该名字取自于 [Key 公式](http://key.visualarts.gr.jp/) 的游戏 [《Rewrite》](https://bgm.tv/subject/4022) 及其衍生作品中的主要女性角色之一的 [神户小鸟](https://bgm.tv/character/12063) (神戸（かんべ） 小鳥（ことり）)。

### 特点

- **跨平台**
  得益于模块化支持，通过编写各种模块实现不同的功能与聊天平台接入

- **解耦合**
  对底层事件封装实现核心功能，减少代码冗余与复杂度，提升开发效率

- **现代化**
  使用现代化的 ECMAScript 语法规范与强大的 TypeScript 类型检查

### 扩展支持

#### 平台

- QQ（基于 Tencent 官方 API）
- QQ（基于 Onebot 标准的 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 项目）
- CMD 命令行
  即将支持：
- Telegram
- Kook/开黑啦
- MinecraftBedrock（基于 Websocket）
- WeChat/微信
- Discord

#### 数据库（待支持）

- Memory
- Sqlite
- Mysql

---

## 你是？

- 框架用户，使用 Kotori 搭建自己的机器人：[快速开始](./start.md)
- 平台用户，使用、游玩官方提供的现成机器人：[立即使用](./usage.md)
- 开发者
  - 模块开发者，开发 Kotori 模块：[开发文档](../develop/README.md)
  - Node.js 开发者，将 Kotori 作为依赖开发自己的项目：[接口文档](../api)
