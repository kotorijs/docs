# 模块安装

## 介绍

**模块（Modules）** 是 Kotori 的重要组成部分之一，通过使用模块以扩展各式各样的功能。

模块根据功能与应用范围不同，主要分为以下三大类型：

- **插件（Plugin）**：为用户提供多种功能、玩法、扩展，数量最多的类型
- **服务（Service）**：用于提供封装好的接口
- **适配器（Adapter）**：用于接入各个聊天平台

## 寻找模块

**[Kotori 模块中心](../modules/)** 内收录了大部分 Kotori 模块。选择所需模块，在详情页中会有插件的基础信息、介绍、使用说明、配置说明等。

## 下载与安装

此处以「QQ 适配器服务模块」（[@kotori-bot/kotori-plugin-adapter-qq](../modules/#@kotori-bot/kotori-plugin-adapter-qq)）为例。

> 模块的包名除去 `@xxx/` 的部分（如果有），会有一段相似的开始字段，将其称之为「**模块前缀**」。通过模块前缀可判断模块类型，如「kotori-plugin-adapter-xxx」表示**适配器**，「kotori-plugin-database-xxx」表示**数据库服务**，「kotori-plugin-xxx」表示**插件**或**自定义服务**，详细内容请参考 [开发文档 - 插件范式](../guide/modules/plugin)

### 使用包管理工具

复制模块详情页里中的安装指令，或手动输入对应模块的 npm 包名，在 Kotori 根目录运行：

```bash
npm install @kotori-bot/kotori-plugin-adapter-qq
```

### 手动下载安装

> [!WARNING]
> 该方法目前仅建议插件开发者在工作区下可适当使用。

在模块详情页里跳转至对应的 npm 地址或 GitHub 地址，下载模块的构建产物。
解压压缩包并移动至 Kotori 根目录下的 `./modules/` 内。

> GitHub 仓库中存有模块的源码，在当前阶段，你应下载并使用模块的构建产物而非源码

务必确保解压后的模块文件夹仅有一层文件夹而非多层，否则将无法识别与加载模块。

### 添加加载目录

> 模块安装在 `./modules` 目录内请忽略该步骤

通过包管理工具安装的模块一般会安装在 Kotori 根目录下的 `./node_modules/` 内，如若插件包名带有 `@xxx/` 的前缀，表示为包的命名空间，上述示例模块中的「@kotori-bot/」为 Kotori 官方包的命名空间，表示**官方模块**，其余的命名空间或无命名空间的模块为**社区模块**。

所有未安装在 `./modules/` 都应配置 `kotori.yml` 的 `global.dirs` 项以设置额外的加载根目录，但对于 `./node_modules/` 与 `@kotori-bot/` 命名空间已经存在于 `Kotori.yml` 默认配置中，因此无需担心。

对于其它安装目录或命名空间则需手动添加到 `Kotori.yml` 中，如：

- 使用包管理工具安装一个命名空间为 `@custom-scope/` 的模块
- 将模块安装在 Kotori 根目录下的 `./test_modules/` 内

对应配置为：

```toml
[global]:
dirs = [
  "./node_modules/",
  "./node_modules/@kotori-bot/",
  "./node_modules/@custom-scope/",
  "- ./test_modules"
]
```

## 配置模块

根据安装的模块类型不同，配置策略也将不同。

### 插件

插件配置数据应写在 `kotori.yml` 的 `plugin.<plugin-name>` 项下，其中 `<plugin-name>` 为插件名字，不应含有包的命名空间与模块前缀，值必须是一个对象。插件的配置项由插件本身提供与指定，并非所有插件本身都会提供配置项。一般地，有提供配置项的插件内都会有一套默认配置，因此不配置也可以正常运行插件。插件的配置和说明可参考该插件的详情页，此处以 「菜单插件」（[@kotori-bot/kotori-plugin-menu](../modules/#@kotori-bot/kotori-plugin-menu)）为例，在详情页查看配置说明后在 `kotori.yml` 中配置相关内容：

```toml
[plugin.menu]
alias = "cd"
keywords = [ "菜单", "功能", "帮助" ]
content = "菜单 | 小鳥%break%/menu - 查看BOT菜单%break%/hitokoto - 获取一条一言%break%ByHotaru"
```

### 适配器

适配器配置数据应写在 `kotori.yml` 的 `adapter[instanceName]` 项下，其中 `instanceName` 为适配器实例（以下简称「Bot」）名字应由小写英语字母、数字、连字符（\[a-z0-9\]）组成，值必须是一个对象。适配器的配置数据不会作用于适配器模块，Kotori 会根据配置数据创建对应 Bot。对于适配器的配置，必须提供一些必要配置项才能确保实例的正常运行，其中有部分配置项由 Kotori 内部定义，如：

```toml
[adapter.cmd-test]
extends = "cmd"
master = 2_333
```

「cmd-test」是该 Bot 的名字也是在 kotori 程序运行中的唯一标识符，不可重复。`extends` 用于指定该实例使用的适配器，值为适配器模块的包名除去命名空间与适配器服务前缀的字符串，如：使用「@kotori-bot/kotori-plugin-adapter-qq」适配器，则应填入「qq」。`master` 用于指定该实例的最高管理员（Admin），值类型可为数字或字符串，非必填。
除去由 Kotori 内部定义的配置项以外，一般还需要填入该适配器要求传入的必要配置项。

```toml
[adapter.cmd-test]
extends = "cmd"
master = 2_333
nickname = "Kotarou"
age = 18
sex = "male"
self-id = 720
```

> cmd 适配器即「[@kotori-bot/kotori-plugin-adapter-cmd](../modules/#@kotori-bot/kotori-plugin-adapter-cmd)」，属于 kotori 预装模块之一，为 kotori 程序当前所在控制台提供聊天交互功能，也是最方便的测试机器人的场所（但并不推荐，因为只支持文字交互，模块开发有更好的测试场所选择，详细内容请参考 [开发文档 - 项目构建](../guide/start/setup)）

不过此处使用的 cmd 适配器定义的配置项均有默认值因此为可选。接着使用「@kotori-bot/kotori-plugin-adapter-qq」适配器再创建一个 Bot：

```toml
[adapter.cmd-test]
extends = "cmd"
master = 2_333
nickname = "Kotarou"
age = 18
sex = "male"
self-id = 720

[adapter.kisaki]
extends = "qq"
appid = "xxxx"
secret = "xxxxx"
master = 2_333
retry = 10
```

查看 QQ 适配器的详情页面可知，`appid` 、 `secret` 为其定义的必要配置项，`retry` 为其定义的可选配置项，关于 QQ 适配器的具体使用与配置项含义请查看其插件详情页。

> 关于配置文件的详细介绍请参考 [配置详解](./config)
