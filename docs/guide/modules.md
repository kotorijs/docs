# 模块安装

## 介绍

**模块（ Modules ）** 是 Kotori 功能的重要组成部分之一。通过使用模块，扩展各式各样的功能。

模块根据功能与应用范围不同，主要分为以下两大类型：

-   插件（ Plugin ） 面向 平台用户 或 框架用户 提供的功能，数量最多的类型
-   服务（ Server ） 为 Kotori 底层提供的功能
    -   适配器（ Adapter ） 用于接入各个聊天平台
    -   数据库（ Database ） 用于为 Kotori 提供数据存储方案

## 下载与安装

通过在 **[Kotori模块中心](../modules)** 里浏览所有收录的模块，选择所需要并打开详情页，此处以 `QQ适配器服务模块（@kotori-bot/kotori-plugin-adapter-qq）` 为例。

> 可通过包名中的关键字段判断模块类型，如 "plugin-adapter-xxx" 表示**适配器服务**，"plugin-database-xxx" 表示**数据库服务**，"plugin-xxx" 表示**插件**。

### 使用 包管理工具 安装

复制模块详情页里中的安装指令，或手动输入对应模块的 `NPM包名`。
在 Kotori 根目录里运行：

```bash
pnpm install @kotori-bot/kotori-plugin-adapter-qq
```

### 手动下载安装

在模块详情页里打开 **github** 仓库地址或 **npmjs.org** 的地址，下载整个源码。
解压压缩包并移动至 Kotori 根目录下的 `./modules/` 内。

> **请注意：务必确保解压后的模块文件夹仅有一层文件夹而非多层，否则将导致模块无法被加载到。**

### 配置加载目录

> 使用手动下载安装或模块安装在 ./modules 目录内请忽略该步骤。

通过包管理工具安装的模块一般会安装在 Kotori 根目录下的 `./node_modules/` 内，如若插件包名带有 `@xxx/` 的前缀，表示为包的命名空间，上述示例模块中的 `@kotori-bot/` 为 Kotori 官方包的命名空间，表示**官方模块**，其余的命名空间或无命名空间的模块为**社区模块**。

所有未安装在 `./modules/` 都应在 `kotori.yml` 中配置 `global.dirs` 设置额外的 加载根目录 ，但对于 `./node_modules/` 与 `@kotori-bot/`命名空间 已经存在于 `Kotori.yml` 默认配置中，因此无需担心。

对于其它的安装目录或命名空间则需手动添加到 `Kotori.yml` 中，如：

-   使用包管理工具安装一个命名空间为 `@custom-scope/` 的模块
-   将模块安装在 Kotori 根目录下的 `./test_modules/` 内

对应配置应是：

```yaml
global:
   # ....
  dirs: [
   './node_modules/',
   './node_modules/@kotori-bot/',
   # 上面为默认配置的加载目录
   './node_modules/@custom-scope/',
   './test_modules'
]

# ....
```

## 配置模块

<!-- old ↓

**适配器（ Adapter ）** 是 模块 中的一种，也是 Kotori 功能的重要组成部分之一，用于接入各个 聊天平台 。

将插件根文件夹或单文件放置在`plugins/`目录下，Kotori会自动加载该目录下的所有相关文件

插件加载目录配置kotori.yml

收集插件将不定期更新，你可以直接通过**Pull Request**的方式将你的插件加入(或更新时)到仓库并更新`docs/PLUGINS.md`中的插件列表信息
 -->
