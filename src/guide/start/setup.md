# 项目构建

## 基于 create-kotori 直接构建

「[create-kotori](https://github.com/kotorijs/create-kotori)」是专用于构建 Kotori 模块的 Cli 工具。

- 命令语法：`create-kotori <project-name>`

```bash
pnpm init kotori@latest my-project
```

除此之外，也可以将其安装在全局使用：

```bash
npm install create-kotori -g
create-kotori my-project
```

## 基于 Kotori 源码构建

亦称为「工作区开发」，该方法适用于有一定 Node.js 开发经验的开发者，并不推荐新人使用。使用该方法可同时开发多个插件，也可在开发当前插件时安装使用其它插件，同时可以便捷的修改与调试 Kotori 源码并进行二次开发。使用 Git 直接克隆 `Kotorijs/kotori` 仓库的源码：

```bash
git clone https://github.com/kotorijs/kotori.git
```

此处默认克隆的是主分支下的代码，也可以选择克隆 dev 分支，该内容将在 [进阶开发中](../../advanced/) 详细说明。进入根目录并使用 pnpm 安装依赖：

```bash
cd ./kotori-bot-master
pnpm install
```

在 `./modules/` 目录下使用 create-kotori 创建一个模块：

```bash
cd ./modules/
pnpm init kotori@latest my-project
cd ./my-project/
```

## 项目结构

```text
my-project
├── kotori.yml
├── package.json
├── tsconfig.json
├── LICENSE
├── README.md
├── .gitignore
├── node_modules
├── lib
│   ├── index.js
│   ├── index.d.ts
│   ├── ...
├── locales
│   ├── en_US.json
│   ├── ja_JP.json
│   ├── zh_CN.json
│ └── zh_TW.json
└── src
    ├── config.ts
    ├── index.ts
    ├── types.ts
```

`kotori.yml` 仅在直接构建时存在于模块根目录，工作区开发下将位于工作区的根目录。

- `kotori.yml` Kotori 配置文件
- `kotori.dev.yml` Kotori Dev 模式下配置文件
- `package.json` 包信息文件
- `tsconfig.json` TypeScript 配置文件
- `LICENSE` 协议文件
- `README.md` 自述文件
- `.gitignore` git 忽略文件
- `lib` 构建产物输出目录（前端为 `dist`，后端为 `lib`）
- `locales` 国际化文件夹，将在后面的章节中讲解
- `src` 工程文件夹，代码存放处
  - `cofig.ts` 默认配置数据文件
  - `index.ts` 整个模块的入口文件
  - `types.ts` 公共类型文件

## package.json

以下为默认创建的 `package.json`：

```json
{
  "name": "kotori-plugin-my-project",
  "version": "1.0.0",
  "description": "This is my first Kotori plugin",
  "main": "lib/.js",
  "scripts": {
    "build": "tsc --build"
  },
  "license": "GPL-3.0",
  "keywords": ["kotori-plugin"],
  "files": ["lib", "LICENSE", "README.md"],
  "peerDependencies": {
    "kotori-bot": "1.1.0"
  }
}
```

添加一些非必要配置项以完善包信息：

```json
{
  "author": "Himeno <biyuehuya@gmail.com>",
  "bugs": {
    "url": "https://github.com/kotorijs/my-project/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/kotorijs/my-project.git"
  },
  "homepage": "https://github.com/kotorijs/my-project/"
}
```

添加用于传给 Kotori 的元数据：

```json
{
  "kotori": {
    "enforce": "pre",
    "meta": {
      "languages": ["en_US", "ja_JP", "zh_TW", "zh_CN"]
    }
  }
}
```

一个合法的 Kotori 模块其 `package.json` 需要满足一系列来自 Kotori 的约定，Kotori 程序只有在其合法时才会加载该模块。不过当前你无需关心这个问题，元数据与 `package.json` 约定将放在「模块化」章节中讲解。以下是该 package.json 的完整效果：

```json
{
    "name": "kotori-plugin-my-project",
    "version": "1.0.0",
    "description": "This is my first Kotori plugin",
    "main": "lib/.js",
    "scripts": {
        "build": "tsc --build"
    },
    "license": "GPL-3.0",
    "keywords": [
        "kotori-plugin"
    ],
    "files": [
        "lib",
        "LICENSE",
        "README.md"
    ],
    ,
    "peerDependencies": {
        "kotori-bot": "1.1.0"
    },
    "author": "Himeno <biyuehuya@gmail.com>",
    "bugs": {
        "url": "https://github.com/kotorijs/my-project/issues"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/kotorijs/my-project.git"
    },
    "homepage": "https://github.com/kotorijs/my-project/",
    "kotori": {
        "enforce": "pre",
        "meta": {
            "languages": [
                "en_US",
                "ja_JP",
                "zh_TW",
                "zh_CN"
            ]
        }
    }
}
```

> 关于 `package.json` 的默认配置项与更多信息请参考 [npm Docs](https://docs.npmjs.com/cli/v6/configuring-npm/package-json/)。

## index.ts

以下为默认创建的 index.ts，当前你还无需理解其具体含义：

```typescript
import type { Context } from 'kotori-bot';
import config from './config.ts';
import types from './types.ts';

export function main(ctx: Context) {
  ctx
    .command('echo <content> [num:number=3]')
    .action((data, message) => {
      ctx.logger.debug(data, data.args[0]);
      ctx.logger.debug(message);
      return [
        `返回消息:~%message%`,
        {
          message: data.args[0],
        },
      ];
    })
    .alias('print')
    .scope('group');

  ctx.regexp(/^(.*)#print$/, match => match[1]);

  ctx.command('ison').action((_, events) => {
    if (events.api.adapter.config.master === events.userId) return `在的哟主人~`;
    return '你是...谁?';
  });
}
```

## 模块测试

在入门教程中提到过使用「[@kotori-bot/kotori-plugin-adapter-cmd](../../modules/#@kotori-bot/kotori-plugin-adapter-cmd)」适配器可以在命令行中测试指令，但命令行本身仅支持纯文字交互因此并不友好也不便于开发者调试。同样的，Kotori 已默认安装「[@kotori-bot/kotori-plugin-adapter-sandbox](../../modules/#@kotori-bot/kotori-plugin-adapter-sandbox)」适配器，它提供了一个极为方便、全面的机器人沙盒测试环境，只需在 `kotori.yml` 中设置该适配器即可：

```yaml
adapter:
 developer:
  extends: sandbox
  master: 1
  port: 2333
```

### 运行模式

运行模式分为 「生产模式（Build）」与「开发模式（Dev）」两种：
- Build 模式将显示更少的日志输出，有利于减少不必要信息方便用户使用；Dev 模式会有详尽的错误日志与开发日志输出，有利于开发者快速找到问题。
- Build 模式有更牢固的错误捕获与进程守护，长期运行更加稳定；Dev 模式下在遇到某些关键性错误时会退出整个 Kotori 程序。
- Dev 模式会有实时的代码文件变动监听与模块自动重载（热更新），为开发者提供犹如前端开发般的便捷体验。
- Dev 模式能够直接运行 TypeScript 文件，在加载模块时会优先检测模块文件夹内是否有 `src/.ts` 。
- Build 模式下读取 `kotori.yml`，Dev 模式下读取 `kotori.dev.yml`，两者用法与实际效果均一致，旨在区分不同模式下不同配置。

从 Dev 模式下启动 Kotori：

```bash
pnpm dev
```

在浏览器中打开 `http://localhost:2333` 即可进入沙盒环境，输入 `/echo Hello,Kotori!` 以查看效果：

![show](https://pic.imgdb.cn/item/65abe55e871b83018a1f2b92.png)
