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

此处默认克隆的是主分支下的代码，也可以选择克隆 dev 分支，该内容将在 [进阶开发中]() 详细说明。进入根目录并使用 pnpm 安装依赖：

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

```
my-plugin
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
│	└── zh_TW.json
└── src
    ├── config.ts
    ├── index.ts
    ├── types.ts
```

`kotori.yml` 仅在直接构建时存在于模块的根目录，工作区开发下将位于工作区的根目录。

- `kotori.yml` Kotori 配置文件
- `package.json` 包信息文件
- `tsconfig.json` TypeScript 配置文件
- `LICENSE` 协议文件
- `README.md` 自述文件
- `.gitignore` Git 忽略文件
- `lib` TypeScript 文件 build 输出目录（前端 `dist`，后端 `lib`）
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
  "main": "lib/index.js",
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

添加一些非必要字段以完善包信息：

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

一个合法的 Kotori 模块其 `package.json` 需要满足一系列来自 Kotori 的约定，只有当其合法时才会被 Kotori 程序所加载。不过当前你无需关心这个问题，元数据与 `package.json` 约定将放在「模块化」章节中讲解。
以下是该 `package.json` 的完整效果：

```json
{
   "name": "kotori-plugin-my-project",
   "version": "1.0.0",
   "description": "This is my first Kotori plugin",
   "main": "lib/index.js",
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
   ], ,
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

在入门教程中提到过使用「[@kotori-bot/kotori-plugin-adapter-cmd](../modules/README.md#@kotori-bot/kotori-plugin-adapter-cmd)」适配器可以在命令行中测试指令，但命令行本身仅支持纯文字交互因此并不友好也不便于开发者调试。同样的，Kotori 已默认安装「[@kotori-bot/kotori-plugin-adapter-sandbox](../modules/README.md#@kotori-bot/kotori-plugin-adapter-sandbox)」适配器，它提供了一个极为方便、全面的机器人沙盒测试环境，只需在 `kotori.yml` 中设置该适配器即可：

```yaml
adapter:
	developer:
		extends: sandbox
		master: 1
		port: 2333
```

从开发环境下启动 Kotori：

```bash
pnpm dev
```

在浏览器中打开 `http://localhost:2333` 即可进入沙盒环境，输入 `/echo Hello,Kotori!` 以查看效果：

![](https://pic.imgdb.cn/item/65abe55e871b83018a1f2b92.png)