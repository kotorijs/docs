# 快速开始

## 一键使用仓库

尽管 Kotori 的安装几乎已可以说是开箱即用的地步，只需要简单动用一下包管理器同时写入配置文件即可完成安装，但鉴于这仅仅安装了本体，并未附带一些基础且必要的模块，因此这里有一份来自于社区的 [Kotori 手把手安装教程](https://github.com/kotorijs/kotori-app)，该仓库提供了一个包含基础模块的 `package.json` 与 Kotori 配置文件以及启动脚本。

<!-- markdownlint-disable -->
<video controls src="https://raw.githubusercontent.com/kotorijs/res/master/video/Kotori.mp4?raw=true" >
</video>
<!-- markdownlint-enable -->

> [!NOTE]
> 如若视频加载不出来请考虑使用 VPN，当然这并不重要。

### 下载该仓库

- 方法 1：使用 git 克隆

```bash
git clone https://github.com/kotorijs/kotori-app.git
```

- 方法 2：直接下载压缩包并解压

[下载地址](https://github.com/kotorijs/kotori-app/archive/refs/heads/master.zip)

### 安装依赖

1.安装 Node.js

- 下载地址：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

2.安装项目依赖

支持 `npm`、`yarn` 主流包管理器安装，`pnpm` 安装后可能存在启动问题，`cnpm`、`deno`、`bun` 未经测试，但理论仍可以进行安装并运行。先进入仓库根目录，输入以下任一命令安装：

```bash
npm install
```

如若出现安装失败问题则强制安装：

```bash
npm install --force
```

强制更新所有包：

```bash
npm update --force
```

### 配置 `kotori.toml`

> 关于 kotori.toml 的详细介绍请参考 [配置详解](./config.md)

### 正式启动

在仓库根目录打开命令行输入：

```bash
npm exec kotori
```

当然，也可以直接使用仓库根目录下提供的两个启动文件：

- Windows 平台下使用 `start.bat`
- Linux/Mac 平台下使用 `start.sh`

启动完成后，在控制台内输入 `/status` 查看，输入 `/help` 查看帮助内容

### 进入 Webui

启动 Kotori 后，会在控制台看到以下类似信息：

```log
7/19 23:59:59 LOG (1372799) : Http server started at http://127.0.0.1:720
7/20 0:0:0 LOG (1372799) : WebSocket server started at ws://127.0.0.1:720
KotoriO > 当前未设置 Webui 账号与密码，请输入 /webui 指令以进行初始化
```

此处的 `http://127.0.0.1:720` 即为 Kotori 网页控制台，第一次启动会提示设置用户名与密码，通过输入 `/webui` 命令进行设置：

```bash
/webui
KotoriO > 请输入 Webui 用户名：
Admin
KotoriO > 请输入 Webui 密码：
kotori666
8/11 10:37:5 LOG (1435470) [cmd/cmd-test]: User 2333 exec command webui successfully
KotoriO > 配置成功！请再次输入指令以查看运行状态
/webui
8/11 10:47:30 LOG (1435470) [cmd/cmd-test]: User 2333 exec command webui successfully
KotoriO > Webui 服务已启动！运行端口：720
```

当想重置用户名或密码时也可以输入以下指令：

```bash
/webui -R
8/11 10:35:51 LOG (1372799) [cmd/cmd-test]: User 2333 exec command webui -R successfully
KotoriO > Webui 账户数据已重置
```

### 安装适配器与插件

- 适配器：用于对接各个聊天平台，比如说你要用 qq 即安装 qq 适配器即可

- 插件：扩展机器人的各种功能

- [模块中心](../modules/)

此处收录了大部分的 Kotori 模块，选择自己喜欢的模块打开详情页查看说明，复制包名使用你的包管理器进行安装。以下指令会为你安装一些重要的基础插件：

### 更新 Kotori 与模块

一般地，在需要更新时使用以下命令即可进行更新：

```bash
npm update -f
```

此外，当变动较大时可重新重复上述安装步骤。

### 使用 GUI

Kotori 内置了一个简易的交互式命令行功能，用于执行简单的操作，在根目录下输入以下命令：

```bash
npm exec kotori ui
```

![ui1](https://pic.imgdb.cn/item/66b824c6d9c307b7e9dc4f87.png)

![gui2](https://pic.imgdb.cn/item/66b824c6d9c307b7e9dc4f6d.png)

### 启用守护进程

程序运行中可能总会发生一些不会如用户所愿的错误和异常，为了避免这种情况，Kotori 提供了守护进程功能，当程序崩溃时，守护进程会自动重启程序，而在默认情况下（即程序处于 `build` 模式），守护进程是会自动启用的，想改变这一策略可更改环境变量或 CLI 参数，具体参见 [配置详解](./config.md)。

```bash
24/8/11 10:35:56 INFO (1372340) : [Daemon] Starting...
```

当 Kotori 启动时出现以上消息则表明守护进程成功启用。同时在启用守护进程后，也可以通过指令 `/restart`（来自「[@kotori-bot/kotori-plugin-core](../modules/#@kotori-bot/kotori-plugin-core)」） 手动进行重启：

```bash
/restart
KotoriO > Kotori 正在重启中...
8/11 10:35:56 LOG (1372799) [cmd/cmd-test]: User 2333 exec command restart successfully
24/8/11 10:35:56 WARN (1372340) : [Daemon] Restarting...
```

当然，守护进程在程序崩溃时也有一套判定规则，如若程序在短时间内多次崩溃，则视为存在重大异常问题，此时便会停止自动重启需要人工进行排查原因。。

## 从源码构建

请参考 [作为依赖与二次开发](../advanced/develop.md)。

## 其它方式

N.A
