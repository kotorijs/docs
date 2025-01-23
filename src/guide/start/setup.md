# 项目构建

<!-- TODO: LINK -->

在本阶段中开发模块一并通过搭建工作区开发，此外还可通过克隆 Kotori 源码或单独创建包进行开发，对于前者请参考 [深入了解](https://kotori.js.org/advanced/)，对于后者则无需赘述。

## 基于 create-kotori 快速搭建工作区

「[create-kotori](https://github.com/kotorijs/create-kotori)」是专用于构建 Kotori 模块的 Cli 工具。

- 命令语法：`create-kotori <project-name>`

```bash
pnpm create kotori@latest
```

除此之外，也可以将其安装在全局使用：

```bash
npm install create-kotori -g
create-kotori
```

## 项目结构

```text
my-project
├── package.json
├── tsconfig.json
├── tsconfig.base.json
├── pnpm-workspace.json
├── kotori.toml
├── LICENSE.md
├── README.md
├── .gitignore
├── build.ts
└── project
    └── my-project
      ├── package.json
      ├── LICENSE.md
      ├── README.md
      ├── tsconfig.json
      ├── lib
      │   ├── ...
      ├── locales
      │   ├── en_US.json
      │   ├── ja_JP.json
      │   ├── zh_CN.json
      │   └── zh_TW.json
      └── src
          └── index.tsx
    └── my-project-res
      ├── package.json
      ├── LICENSE.md
      ├── README.md
      ├── rescript.json
      ├── lib
      │   ├── ...
      └── src
          └── Main.res
```

- `kotori.toml` Kotori 配置文件
- `package.json` 包信息文件
- `tsconfig.json` TypeScript 配置文件
- `rescript.json` ReScript 配置文件
- `LICENSE.md` 协议文件
- `README.md` 自述文件
- `.gitignore` git 忽略文件
- `lib` 构建产物输出目录（前端为 `dist`，后端为 `lib`）
- `locales` 国际化文件夹，将在后面的章节中讲解
- `src` 工程文件夹，代码存放处
  - `index.tsx` TypeScript 模块的入口文件
  - `Main.res` ReScript 模块的入口文件

## package.json

以下为默认创建的 `package.json`：

<<< @/demo/modules/my-project/package.json

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

一个合法的 Kotori 模块其 `package.json` 需要满足一系列来自 Kotori 的约定，Kotori 程序只有在其合法时才会加载该模块。不过当前你无需关心这个问题，元数据与 `package.json` 约定将放在第三章中讲解。

> 关于 `package.json` 的默认配置项与更多信息请参考 [npm Docs](https://docs.npmjs.com/cli/v6/configuring-npm/package-json/)

## index.tsx

以下为是默认创建的 `index.tsx` 文件，当前你还无需理解其具体含义：

<<< @/demo/modules/my-project/src/index.tsx

> [!TIP]
> 当然它其实也可以是 `index.ts` 或者 `index.js`，对于前者意味着将无法使用 JSX 语法糖进行处理消息，这完全是不必要的，对于后者意味着直接使用 JavaScript 语言进行开发，如果你喜欢的话可以选择。JSX 相关内容将在后续章节中详细介绍。

## 模块测试

在入门教程中提到过使用「[@kotori-bot/kotori-plugin-adapter-cmd](../../modules/#@kotori-bot/kotori-plugin-adapter-cmd)」适配器可以在命令行中测试指令，但命令行本身仅支持纯文字交互因此并不友好也不便于开发者调试。同样的，Kotori 已默认安装「[@kotori-bot/kotori-plugin-adapter-sandbox](../../modules/#@kotori-bot/kotori-plugin-adapter-sandbox)」适配器，它提供了一个极为方便、全面的机器人沙盒测试环境，只需在 `kotori.toml` 中设置该适配器即可：

```toml
adapter:
  developer:
    extends: sandbox
    master: 1
    port: 2333
```

### 运行模式

<!-- TODO: update -->

> [!WARN]
> 以下内容有待更新

运行模式分为 「生产模式（Build）」与「开发模式（Dev）」两种：

- Build 模式将显示更少的日志输出，有利于减少不必要信息方便用户使用；Dev 模式会有详尽的错误日志与开发日志输出，有利于开发者快速找到问题。
- Build 模式有更牢固的错误捕获与进程守护，长期运行更加稳定；Dev 模式下在遇到某些关键性错误时会退出整个 Kotori 程序。
- Dev 模式会有实时的代码文件变动监听与模块自动重载（热更新），为开发者提供犹如前端开发般的便捷体验。
- Dev 模式能够直接运行 TypeScript 文件，在加载模块时会优先检测模块文件夹内是否有 `src/index.tsx` 或者 `src/index.ts` 。

从 Dev 模式下启动 Kotori：

```bash
pnpm dev
```

在浏览器中打开 `http://localhost:2333` 即可进入沙盒环境，输入 `/echo Hello,Kotori!` 以查看效果：

![show](https://pic.imgdb.cn/item/65abe55e871b83018a1f2b92.png)

> [!TIP]
> 你可能注意到目录中有一些 `ReScript` 相关的内容，事实上 Kotori 并不仅仅只支持 TypeScript 语言开发，文档将在后续章节中详细介绍。
