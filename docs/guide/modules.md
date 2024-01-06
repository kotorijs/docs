# 模块安装

## 介绍

**模块（Modules）** 是 Kotori 的重要组成部分之一，通过使用模块以扩展各式各样的功能。

模块根据功能与应用范围不同，主要分为以下两大类型：

- 插件（Plugin） 面向机器人使用者或框架用户提供多种功能、玩法、扩展，数量最多的类型
- 服务（Service） 为 Kotori 底层提供的功能
    - 适配器（Adapter） 用于接入各个聊天平台
    - 数据库（Database） 用于为 Kotori 提供数据存储方案
    - 自定义（Custom） 自定义的服务，大多用于对插件提供封装好的开发接口

## 寻找模块
**[Kotori模块中心](../modules)** 内收录了大部分 Kotori 模块，可前往此处寻找心仪的模块。选择所需模块并点击打开详情页，在详情页中会有插件的基础信息、介绍与使用说明等。
## 下载与安装

此处以「QQ适配器服务模块」（@kotori-bot/kotori-plugin-adapter-qq）为例。

> 模块的包名除去 `@xxx/` 的部分（如果有），会有一段相似的开始字段，将其称之为**模块前缀**。通过模块前缀可判断模块类型，如「kotori-plugin-adapter-xxx」表示**适配器服务**，「kotori-plugin-database-xxx」表示**数据库服务**，「kotori-plugin-xxx」表示**插件**或**自定义服务**，详细内容请参考 [开发文档]()。

### 使用包管理工具

复制模块详情页里中的安装指令，或手动输入对应模块的 npm 包名，在 Kotori 根目录里运行：

```bash
pnpm install @kotori-bot/kotori-plugin-adapter-qq
```

### 手动下载安装
> 该方法在非必要情况下不推荐使用

在模块详情页里打开 **Github** 仓库地址或 **npm** 发布包地址，下载模块的源码或构建产物。
解压压缩包并移动至 Kotori 根目录下的 `./modules/` 内。
> 如若下载的是模块的源码应将其手动编译成构建产物后再安装，或在 `dev` 模式下运行 Kotori 程序，详细内容请参考 [开发文档]()。

> 务必确保解压后的模块文件夹仅有一层文件夹而非多层，否则将导致模块无法被识别与加载。

### 添加加载目录

> 模块安装在 `./modules` 目录内请忽略该步骤。

通过包管理工具安装的模块一般会安装在 Kotori 根目录下的 `./node_modules/` 内，如若插件包名带有 `@xxx/` 的前缀，表示为包的命名空间，上述示例模块中的「@kotori-bot/」为 Kotori 官方包的命名空间，表示**官方模块**，其余的命名空间或无命名空间的模块为**社区模块**。

所有未安装在 `./modules/` 都应配置 `kotori.yml` 的 `global.dirs` 项以设置额外的加载根目录，但对于 `./node_modules/` 与 `@kotori-bot/` 命名空间已经存在于 `Kotori.yml` 默认配置中，因此无需担心。

对于其它安装目录或命名空间则需手动添加到 `Kotori.yml` 中，如：

-   使用包管理工具安装一个命名空间为 `@custom-scope/` 的模块
-   将模块安装在 Kotori 根目录下的 `./test_modules/` 内

对应配置应是：

```yaml
global:
  # ....
  dirs:
    - ./node_modules/
    - ./node_modules/@kotori-bot/ 
    # 上面为默认配置的加载目录
    - ./node_modules/@custom-scope/
    - ./test_modules
]

# ....
```

## 配置模块
根据安装的模块类型不同，配置策略也截然不同。
### 插件
插件配置数据应写在 `kotori.yml` 的 `plugin.<plugin-name>` 项下，其中 `<plugin-name>` 为插件名字，且不应含有包的命名空间与模块前缀，值应是一个对象。插件的配置项由插件本身提供与指定，并非所有插件本身都会提供配置项。一般情况下，有提供配置项的插件内都会有一套默认配置，因此不配置也可以正常运行插件，若有手动配置项则会覆盖对应的默认配置项。插件的配置与其说明可参考该插件的详情页，此处以 「菜单插件」（@kotori-bot/kotori-plugin-menu）为例，在详情页查看配置说明后在 `kotori.yml` 中配置相关内容：

```yaml
# ...
plugin:
  menu:
    alias: cd
    keywords: [ 菜单, 功能, 帮助]
    content: 菜单 | 小鳥%break%/menu - 查看BOT菜单%break%/hitokoto - 获取一条一言%break%ByHotaru
```

### 适配器
适配器配置数据应写在 `kotori.yml` 的 `adapter.<instance-name>` 项下，其中 `<instance-name>` 为实例名字，值也同样为一个对象。适配器的配置数据不会作用于适配器模块，Kotori 会根据对应的实例配置创建对应 Bot 实例。对于适配器的配置，必须提供一些必要配置项（由 Kotori 指定，其中可能也有来自对应适配器指定的配置项）的值才可确保实例的正常运行

### 固有配置项

<!-- old ↓

**适配器（ Adapter ）** 是 模块 中的一种，也是 Kotori 功能的重要组成部分之一，用于接入各个 聊天平台 。

将插件根文件夹或单文件放置在`plugins/`目录下，Kotori会自动加载该目录下的所有相关文件

插件加载目录配置kotori.yml

收集插件将不定期更新，你可以直接通过**Pull Request**的方式将你的插件加入(或更新时)到仓库并更新`docs/PLUGINS.md`中的插件列表信息
 -->
