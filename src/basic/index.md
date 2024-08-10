# 简介

<!-- markdownlint-disable -->
<script setup>
  import Voice from '../components/Voice.vue';
  import NpmBadge from '../components/NpmBadge.vue';
</script>

<NpmBadge package="kotori-bot" />

---

kotori 是一个**跨平台、解耦合、现代化**于一体的聊天机器人框架，运行于 Node.js 环境，使用 TypeScript 语言开发。

## 概述

「Kotori」是一个罗马字，在日语中是「ことり」（小鳥）的意思，发音为 `/kotolɪ/` <Voice />，该名字取自于 [Key 公式](http://key.visualarts.gr.jp/) 的游戏 [《Rewrite》](https://bgm.tv/subject/4022) 中主要女性角色之一：[神户小鸟](https://bgm.tv/character/12063) (神戸（かんべ） 小鳥（ことり）)。
借助 Kotori，可快速搭建一个多平台、功能强大的聊天机器人应用，通过安装不同模块为 Kotori 扩展功能、玩法和个性化配置等。同时，Kotori 为开发者提供了现成的 Cli 用于模块开发与 Kotori 二次开发。

<!-- markdownlint-enable -->

### 特点

- **跨平台**
  得益于模块化支持，通过编写各种模块实现不同的功能与聊天平台接入

- **解耦合**
  基于控制反转（IOC）与面向切面编程（AOP）思想，减少代码冗余与复杂度

- **现代化**
  使用现代化的 ECMAScript 语法规范与强大的 TypeScript 类型支持

### 扩展支持

#### 平台

- QQ（基于腾讯官方接口）
- QQ（基于 [OneBot11 标准](https://onebot.dev/)，适用于 [NapCat](https://github.com/NapNeko/NapCatQQ)、[go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 等项目）
- CMD 命令行
- Slack
- Telegram
- Email
- Discord
- MinecraftBedrock (基于 WebSocket)

即将支持：

- Kook/开黑啦
- WeChat/微信
- Line
- What's App
- DingTalk

#### 数据

- LevelDb

Kotori 使用极为轻量的 LevelDb 作为数据存储。

## 你是？

- 框架用户，使用 Kotori 搭建自己的机器人：[快速开始](./start)
- 平台用户，使用官方提供的现成机器人：[立即使用](./usage)
- 开发者
  - 模块开发者，开发 Kotori 模块：[开发指南](../guide/)
  - Node.js 开发者，将 Kotori 作为依赖开发自己的项目：[接口参考](../api/)
