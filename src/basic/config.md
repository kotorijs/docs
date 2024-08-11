# 配置详解

前面一节已对 `kotori.toml` 有了大概认识，本节内容将更为全面的介绍它。`kotori.toml` 是一个 Kotori 程序的核心配置文件，它一般位于 Kotori 根目录，与 package.json 文件同级，使用 TOML 格式。

## 文件格式

虽然默认使用的是 TOML 格式，但 Kotori 也支持 YAML 格式（`.yaml` 或 `.yml`）与 JSON 格式，其它格式使用方法请参考下文

## 配置项

以下是将先前的配置片段集中在一起的例子（仅作参考请勿直接复制）：

```toml
[global]
port = 720
dbPrefix = "romiChan"
lang = "en_US"
commandPrefix = "/"
noColor = false
level = 25
dirs = [
  "./node_modules/@custom-scope/",
  "./test_modules"
]

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

[plugin.menu]
alias = "cd"
keywords = [ "菜单", "功能", "帮助" ]
content = "菜单 | 小鳥%break%/menu - 查看BOT菜单%break%/hitokoto - 获取一条一言%break%ByHotaru"
```

### global.lang

定义全局使用的语言，目前仅支持英语、日语、台湾语、中文四门语言。

- 值：`LocaleType`，
- 默认值：`'en_US'`

```typescript
type LocaleType = 'en_US' | 'ja_JP' | 'zh_TW' | 'zh_CN';
```

### global.commandPrefix

定义全局使用的命令前缀。

- 值：**string**
- 默认值： `'/'`

### global.dirs

定义需要加载的模块目录。

- 值：**string[]**
- 默认值：`['./node_modules/', './node_modules/@kotori-bot/']`

<!-- ## global.filter

定义全局使用的过滤器，目前过滤器功能正在实现中，该项暂时无实际效果。

- 值：{}
- 默认值：{} -->

### global.port

定义 Kotori 使用的端口（Http 服务器与 WebSocket 服务器）。

- 值：**number**
- 默认值：`720`

### global.dbPrefix

定义 Kotori 使用的数据库前缀。

- 值：**string**
- 默认值：`'romiChan'`

### global.noColor

定义是否禁用彩色输出。

- 值：**boolean**
- 默认值：`false`

### global.level

定义日志输出级别。

- 值：**LoggerLevel**
- 默认值：`25`

```typescript
export enum LoggerLevel {
  TRACE = 10,
  DEBUG = 20,
  RECORD = 25,
  INFO = 30,
  WARN = 40,
  ERROR = 50,
  FATAL = 60,
  SILENT = 70
}
```

### adapter

定义 Bot。

- 值：`{ [botName: string]: AdapterConfig }`
- 默认值：`{}`
- botName：Bot 的唯一标识符，可自定义，建议仅使用小写英语字母、数字、连字符字符（\[a-z0-9-\]）

```typescript
interface AdapterConfig {
  extends: string;
  master?: number;
  lang?: langType;
  commandPrefix?: string;
  [propName: string]?: unknown;
}
```

### AdapterConfig.extends

定义该 Bot 使用的适配器。

- 值：**string**
- 可选：否

### AdapterConfig.master

定义该 Bot 的最高管理员 id（即该用户在平台的 id）。

- 值：**string** | **number**
- 可选：是

### AdapterConfig.lang

定义该 Bot 使用的语言。

- 值：`LocaleType`，
- 默认值：继承自 `global.lang`

### AdapterConfig.commandPrefix

定义该 Bot 使用的命令前缀。

- 值：**string**
- 默认值： 继承自 `global.commandPrefix`

### AdapterConfig[propName]

除去以上由 Kotori 内部定义的配置项，`extends` 中指定的适配器一般会额外定义配置项用于 Bot 内部，这些配置项也可能不存在或为可选，具体请参考该模块的详情页。

### plugin

定义插件的配置项。

- 值：`{ [pluginName: string]: PluginConfig }`
- 默认值：`{}`
- pluginName：模块的 id，去掉该模块包名中的命名空间与模块前缀（Kotori-plugin-）部分

```typescript
interface PluginConfig {
  filter?: {};
  [propName: string]?: unknown;
}
```

### PluginConfig.filter

定义该插件使用的滤器。

- 值：`FilterOption`
- 默认值：{}

> 关于滤器使用请参考 [滤器](../guide/modules/filter.md)

### PluginConfig[propName]

类似于 AdapterConfig 中的 `[propName]`，该插件也可能会定义一些配置项用于插件内部，具体请参考该模块的详情页。

## CLI 参数

Kotori 提供了一些 CLI 参数，用于在启动时修改配置文件中的配置项。

- `--daemon`：是否使用守护进程
- `--mode [name]`：设置程序运行模式，`build` 或 `dev`
- `--dir [path]`：设置程序运行根目录
- `--config [name]`：设置配置文件名
- `--level [number]`：设置日志输出级别
- `--port [number]`：设置服务器端口
- `--dbPrefix [string]`：设置数据库前缀
- `--noColor`：禁用彩色输出

## 环境变量

Kotori 提供了一些环境变量，用于在启动时修改配置文件中的配置项。

- `NODE_ENV`：设置程序运行模式，`build` 或 `dev`
- `DIR`：设置程序运行根目录
- `CONFIG`：设置配置文件名
- `PORT`：设置服务器端口
- `DB_PREFIX`：设置数据库前缀
- `LEVEL`：设置日志输出级别
- `NO_COLOR`：禁用彩色输出
- `DAEMON`：是否使用守护进程

设置环境变量只需在运行根目录下创建 `.env` 文件，并以 `KEY=VALUE` 的形式写入即可，例如：

```ini
NODE_ENV=build
CONFIG=config.toml
PORT=720
DB_PREFIX=romiChan
LEVEL=25
NO_COLOR=off
DAEMON=on
```

> [!NOTE]
> 在环境变量文件中，对于 `boolean` 值，使用 `on` 表示 `true`，使用 `off` 或其它任何值表示 `false`。

## 优先级

一般地，CLI 参数 > 环境变量 > 配置文件 > 默认值
