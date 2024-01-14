# 配置详解

先前已对 `kotori.yml` 有了大概的认识，现在本篇将更为全面的介绍它。
`kotori.yml` 是一个 Kotori 程序的核心配置文件，它一般位于 Kotori 的根目录且与 `package.json` 文件同级，使用 **YAML** 格式。

> 关于 YAML 格式的语法与规范请参考 [YAML 入门教程](https://www.runoob.com/w3cnote/yaml-intro.html)

以下是一个将先前的配置片段集中在一起的例子（仅作参考请勿直接复制）：

```yaml
global:
  lang: zh_CN
  command-prefix: /
  dirs:
    - ./node_modules/
    - ./node_modules/@kotori-bot/
    # 上面为默认配置的加载目录
    - ./node_modules/@custom-scope/
    - ./test_modules

adapter:
  cmd-test:
    extends: cmd
    master: 2333
    nickname: Kotarou
    age: 18
    sex: male
    self-id: 720

  kisaki:
    extends: qq
    appid: "xxxx"
    secret: "xxxxx"
    master: 2333
    retry: 10

plugin:
  console:
	filter: {}
    test: 1

  menu:
    alias: cd
    keywords: [ 菜单, 功能, 帮助]
    content: 菜单 | 小鳥%break%/menu - 查看BOT菜单%break%/hitokoto - 获取一条一言%break%ByHotaru
```

## global

定义全局相关的配置。

- 值：**GlobalConfig**
- 默认值：参考下面

```typescript
interface GlobalConfig {
  lang?: LocaleType;
  'command-prefix'?: string;
  dirs?: string[];
  filter?: {};
}
```

### lang

定义全局使用的语言，目前 Kotori 有且仅支持 英语、日语、台湾语、中文 四门语言。

- 值：`LocaleType`，
- 默认值：`'en_US'`

```typescript
type LocaleType = 'en_US' | 'ja_JP' | 'zh_TW' | 'zh_CN';
```

### command-prefix

定义全局使用的命令前缀。

- 值：**string**
- 默认值： `'/'`

### dirs

定义需要加载的模块目录。

- 值：**string[]**
- 默认值：`['./node_modules/', './node_modules/@kotori-bot/']`

### filter

定义全局使用的过滤器，目前过滤器功能正在实现中，该项暂时无实际效果。

- 值：{}
- 默认值：{}

## adapter

定义 Bot。

- 值：`{ [botName: string]: AdapterConfig }`
- 默认值：`{}`
- botName：Bot 的唯一标识符，可自定义，建议仅使用小写英语字母、数字、间隔符字符

```typescript
interface AdapterConfig {
	extends: string;
	master?: number;
	lang?: langType;
	'command-prefix'?: string;
	[propName: string]?: unknown;
}
```

### extends

定义该 Bot 使用的适配器。

- 值：**string**
- 可选：否

### master

定义该 Bot 的主人 ID（即该用户在平台的 ID）。

- 值：**string** | **number**
- 可选：是

### lang

定义该 Bot 使用的语言。

- 值：`LocaleType`，
- 默认值：继承于 `global.lang`

### command-prefix

定义该 Bot 使用的命令前缀。

- 值：**string**
- 默认值： 继承与 `global['command-prefix']`

### [propName]

除去以上由 Kotori 内部定义的配置项，`extends` 中指定的适配器一般情况下也会定义一些配置项用于 Bot 内部，当然这些配置项也可能不存在或为可选，具体请参考该模块的详情页。

## plugin

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

### filter

定义该插件使用的过滤器。

- 值：{}
- 默认值：{}

### [propName]

类似于 AdapterConfig 中的 `[propName]`，该插件也可能会定义一些配置项用于插件内部，具体请参考该模块的详情页。
