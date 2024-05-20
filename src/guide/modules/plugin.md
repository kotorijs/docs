# 模块与插件

## 前言

恭喜你，只要学习完本章你将成为一名合格的⌈Kotori Developer⌋！在本章将围绕 Kotori 中最重要的概念⌈上下文⌋为你讲解一系列模块化内容。

## package.json 规范

**插件（Plugin）** 是 Kotori 中的最小运行实例，它是模块的真子集，在真正学习到上下文之前，可暂且默认插件等同于模块。在第一章里你已通过 Cli 初步创建了一个 Kotori 模块工程，但那并不是最小的有效模块，现在，让一切重零开始。

这是一个最小且有效的 package.json 例子：

```json
{
  "name": "kotori-plugin-my-project",
  "version": "1.0.0",
  "description": "This is my first Kotori plugin",
  "main": "lib/index.js",
  "keywords": ["kotori", "chatbot", "kotori-plugin"],
  "license": "GPL-3.0",
  "files": ["lib", "locales", "LICENSE", "README.md"],
  "author": "Himeno",
  "peerDependencies": {
    "kotori-bot": "^1.3.0"
  }
}
```

> [!TIP]
> 请不要模仿，package.json 应附有更详尽的包信息。

一个对于 Kotori 而言合法的 package.json 的类型信息大概是这样子：

```typescript
interface ModulePackage {
  name: string;
  version: string;
  description: string;
  main: string;
  license: 'GPL-3.0';
  keywords: string[];
  author: string | string[];
  peerDependencies: Record<string, string>;
  kotori?: {
    enforce?: 'pre' | 'post';
    meta?: {
      language?: 'en_US' | 'ja_JP' | 'zh_TW' | 'zh_CN';
    };
  };
}
```

但仅以 TypeScript 形式展现并不够全面，因为除此之外 Kotori 对合法的 package.json 有以下特殊要求：

- `name` 必须满足 `/kotori-plugin-[a-z]([a-z,0-9]{2,13})\b/`，即以「kotori-plugin-」加一个小写字母开头，后接 2 ~ 13 个 小写字母与数字的组合
- `license` 必须为 `'GPL-3.0'`，因为 Kotori 本身即使用的 GPL-3.0 协议
- `keywords` 中必须含有 `'kotori'`、`'chatbot'`、`'kotori-plugin'` 三个值，主要是为了 npm 包统计考虑
- `peerDependencies` 中必须含有名为 `'kotori-bot'` 的键，具体作用请参考 [Peer Dependencies](https://nodejs.org/en/blog/npm/peer-dependencies)

对于包名，除去普通模块以外，往往会有一些非强制性规范的特殊值：

- `kotori-plugin-adapter-xxx` 表示适配器服务
- `kotori-plugin-database` 表示数据库

## 元数据信息

在上面例子中，可能你已注意到除了常规的属性以外，还有一个为 `kotori` 的属性，其会被 Kotori 读取用作模块的额外信息，目前其中仅有 `meta` 一个属性，`meta` 之下有两个属性：

- `enforce` 模块加载顺序，对于某些前置性模块和自定义服务模块可能有用，Kotori 模块加载顺序：数据库服务 > 适配器服务 > 核心模块（模块列表请查看 Kotori 源码）> `'pre'` > `undefined` > `'post'`
- `language` 模块加载列表，若为 `undefined` 或 `[]` 则表示支持所有语言或无文字内容

## 入口文件

一般地，使用 `src/index.ts` 作为默认入口文件，最终将由 tsc 或其它的打包工具编译成 `lib/index.js`。以下是一个最基础的入口文件示例：

```typescript
import { Context } from 'kotori-bot';

export function main(ctx: Context) {}
```

入口文件一般导出一个名为 `main()` 的函数，接收一个 `Context` 实例作为参数，诸如之前介绍的事件系统、指令、中间件、正则匹配等功能均是在其上进行的操作。除此之外，入口文件还可以导出一些其他的变量，供其他模块调用。

### 注册国际化文件目录

```typescript
import { join } from 'path';
import { Context } from 'kotori-bot';

export function main(ctx: Context) {
  ctx.i18n.use(join(__dirname, '../locales'));
}
```

> 国际化文件目录（一般为 `../locales` 文件夹）下有多份多个语言文件（一般为 `json` 文件）

此处在 `main()` 被调用后通过执行 `ctx.i18n.use()` 方法注册了当前模块的国际化文件目录，出于目录路径位置原因，此处还用到了 Node.js 内置的 `path` 模块的方法，但如果每个模块都需要这样做就很繁琐，Kotori 为此提供了语法糖：

```typescript
import { Context } from 'kotori-bot';

export const lang = [__dirname, '../locales'];
// equal to: export const lang = path.join(__dirname, '../locales');

export function main(ctx: Context) {}
```

在入口文件中导出一个 `lang` 变量，使得 Kotori 在加载模块执行 `main()` 之前自动通过该变量注册国际化文件目录，`lang` 的值可以是字符串或数组，若为字符串则表示目录路径，若为数组则自动调用 `path.join()` 处理成路径字符串。

### 自定义模块配置

```typescript
import { Tsu } from 'kotori-bot';

/* ... */

export const config = Tsu.Object({
  key1: Tsu.String(),
  key2: Tsu.Number().range(0, 10),
  key3: Tsu.Boolean()
});
```

通过 `config` 变量定义模块的配置项，它是一个 `Tsu.Object()` 实例，并通过 `Tsu.infer<>` 类型推导获取配置项的类型。在模块中编写了配置项后便可直接在 Kotori 根目录的 `kotori.yml` 文件中进行模块配置：

```yaml
# ...

plugin:
  my-project:
    key1: value1
    key2: 0
    key3: true
```

通过 `main()` 函数的第二个参数 `config` 获取模块的实际配置信息：

```typescript
/* ... */

export function main(ctx: Context, cfg: Tsu.infer<typeof config>) {
  ctx.logger.debug(cfg.key1, cfg);
  // 'value1' { key1: 'value1', key2: 0, key3: true }
}
```

### 设置依赖服务

```typescript
/* ... */

export const inject = ['database'];

export function main(ctx: Context) {
  ctx.on('ready', async () => {
    if (await ctx.db.schema.hasTable('test')) return;
    await ctx.db.schema.createTable('test', (table) => {
      table.increments();
      table.string('name');
      table.timestamps();
    });
  });
}
```

通过 `inject` 变量定义模块的依赖服务，它是一个字符串数组，数组中的每个值都必须是已注册的服务名称，服务包括 Kotori 内置服务与第三方模块提供的服务。尽管服务实例只要一经定义就会因声明合并的缘故显示在 `Context` 实例上，但请注意，所有服务均不会自动挂载到 `Context` 实例上，无论是内置服务和还是第三方服务均需要使用 `inject` 进行声明后才可在 `Context` 上直接访问、使用。此处依赖了 `database` 数据库服务，并通过监听 `ready` 事件（当加载完所有模块时）进行数据库初始化操作。

## 模块风格与范式

Kotori 中大体上提供了三种额风格的模块范式：

- 导出式
  - 导出函数式
  - 导出类式
- 直接调用式
- 装饰器式

### 导出式

整合一下上面写的所有代码：

```typescript
import { Context, Tsu } from 'kotori-bot';

export const lang = [__dirname, '../locales'];

export const config = Tsu.Object({
  /* ... */
});

export const inject = ['database'];

export function main(ctx: Context, cfg: Tsu.infer<typeof config>) {
  /* ... */
}
```

你会发现，无论是当前还是以往的所有演示代码都使用的导出式风格，或许称不上是 Kotori 官方推荐的模块风格，但它一定是在 Web 生态中最经典的一种风格，无论是 Vue、React 等前端响应式框架还是 Webpack、Rollup、eslint、Vite 这种工具链的插件系统都清一色的使用类似的导出式风格。就新人而言，是很推荐使用这种方式的，因为它很容易上手。

### 导出类式

导出式可细分成导出函数式和导出类式（这里的⌈导出⌋特指模块的执行主体），导出函数式相信你已见过太多演示就不再赘述。这里是一个与上面完全一致的导出类式示例：

```typescript
import { Context, Tsu } from 'kotori-bot';

/*
export const lang = [__dirname, '../locales'];

export const config = Tsu.Object({ /* ... */ });

export const inject = ['database'];
*/

export class Main {
  public static lang = [__dirname, '../locales'];

  public static config = Tsu.Object({ /* ... */ });

  public static inject = ['database'];

  public constructor(
    private ctx: Context,
    private cfg: Tsu.infer<typeof config>
  ) {
    /* ... */
  }
}
```

在导出类式中，可同时在外部导出诸如 `config`、`lang`、`inject` 属性，也可在类中设置相应的静态属性，一般地，请使用后者。如若两者同时存在，类中的属性将会覆盖外部导出的属性。

诚然，Kotori 目前对导出类式的支持并不全面，它看起来仅仅是将原本的导出函数替换成导出类后调用其构造函数，并未充分发挥类的特性，但如果你很喜欢面向对象编程，这或许还是很适合你的。不过有一点注意，为与函数区分，导出函数式的函数名使用 `main` 而导出类式的类名使用 `Main`，如若两者互换将不会被 Kotori 识别为有效的模块。

### 默认导出

无论是导出函数还是导出类，均将其称之为⌈模块的执行主体⌋，当入口文件中需要导出的只有执行主体本身时，你大可使用默认导出，此时函数名或类名都无关紧要，如：

```typescript
import { Context } from 'kotori-bot';

export default function main(ctx: Context) {}
```

又或者是默认导出一个类：

```typescript
import { Context } from 'kotori-bot';

export default class {
  public constructor(private ctx: Context) {}
}
```

对于执行主体的各种导出形式，以下是 Kotori 的识别顺序（一经识别成功将不再继续识别后续内容）：

1. 适配器类实现
2. 默认导出类
3. 默认导出函数
4. `main()` 导出函数
5. `Main` 导出类

### 直接调用式

```typescript
import Kotori from 'kotori-bot';
import { join } from 'path';

Kotori.i18n.use(join(__dirname, '../locales'));

Kotori.on('ready', () => {
  const db = Kotori.get('database');
  if (await db.schema.hasTable('test')) return;
  /* ... */
});

Kotori.midware((next, session) => {
  /* ... */
}, 10);

Kotori.command(/* ... */);

Kotori.regexp(/* ... */);
```

通过直接访问 `kotori-bot` 模块默认导出的 `Kotori` 对象进行各种操作，包括注册国际化文件目录、服务、中间件、指令、正则匹配等，对于服务实例则通过 `ctx.get()` 手动获取（或者通过 `ctx.inject()` 手动挂载，具体内容参考下一节）。`Kotori` 对象本身即为一个 `Context` 实例，但它并不是本体而是一个双重 `Proxy`。这种方式的优点是简单和灵活，但缺点是不够模块化，且有副作用，对于开发 Kotori 模块强烈不推荐使用该方式，因为它违背了 Kotori 的原则。如果你基于 Kotori 为依赖库开发一个新的库，则推荐使用该方式。

<!-- TODO: 更新链接 -->

> 将 Kotori 作为依赖开发请参考 [深入了解](../../advanced/)

### 装饰器式

```typescript
import { Tsu, CommandAction, Context, MessageScope, plugins, SessionData } from 'kotori-bot';

const plugin = plugins([__dirname, '../']);

@plugin.import
export default class Plugin {
  private ctx: Context;

  private config: Tsu.infer<typeof Plugin.schema>;

  @plugin.lang
  public static lang = [__dirname, '../locales'];

  @plugin.schema
  public static schema = Tsu.Object({ /* ... */ });

  @plugin.inject
  public static inject = ['database'];

  public constructor(ctx: Context, config: Tsu.infer<typeof Plugin.schema>) {
    this.ctx = ctx;
    this.config = config;
  }

  @plugin.on({ type: 'on_group_decrease' })
  public groupDecrease(session: SessionData) {
     // ...
  }

  @plugin.midware({ priority: 10 })
  public midware(next: () => void, session: SessionData) {
    // ...
  }

  @plugin.command({
    template: 'echo <content> [num:number=3]',
    scope: MessageScope.GROUP
  })
  public echo(data: Parameters<CommandAction>[0], session: SessionData) {
    // ...
  }

  @plugin.regexp({ match: /^(.*)#print$/ })
  public static print(match: RegExpExecArray) {
    return match[1];
  }
}
```

以上是一个简单的装饰器式示例，与导出式相比，它的风格截然不同，语法上它足够的优雅。模块自己主动创造全局唯一的实例对象 `plugin`，在其基础上使用装饰器注册的各种内容，天生即具有良好的扩展性和模块化性。装饰器特性更常见于后端或服务端语言中，在 Web 中使用较多的为 Angular、Nest.js 等深受后端架构思想（主要指 Spring）熏陶的框架。为数不多的缺点是它需要手动声明类型且对新手而言不容易上手，但如若你有足够的基础则强烈推荐使用。

当然，这并不算在此展开详细介绍，它还需要你了解一点其它内容作为基础，因而它被放在本章最后一节进行具体讲述。
