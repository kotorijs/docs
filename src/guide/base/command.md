# 指令注册

## 引入

在上一节中学习了事件系统的使用，现在通过 `on_message` 事件实现一个小功能:

<<< @/demo/modules/my-project/src/base-command.tsx#c1

当收到「/echo xxx」消息时将发送「xxx」;当收到「/time」消息时将发送当前时间戳;两者都不是时发送「未知的指令」。然而当结果越来越多后，`if...else` 语句也会越来越多，显然，这是十分糟糕的。尽管可以考虑将条件内容作为键、结果处理包装成回调函数作为值，以键值对形式装进一个对象或者 Map 中，然后遍历执行。但是当条件越来越复杂时，字符串的键远无法满足需求，同时也可能有相当一部分内容仅在私聊或者群聊下可用，其次，参数的处理也需要在结果处理内部中完成，这是十分复杂与繁琐的，因此便有入了本节内容。

## 基本使用

**指令(Command)** 是 Kotori 的核心功能，也是最常见的交互方式，指令实质是 Kotori 内部对 `on_message` 事件的再处理与封装，这点与后续将学习的中间件和正则匹配是一致的，因此也可以看作是一个事件处理的语法糖。通过 `ctx.command()` 可注册一条指令，参数为指令模板字符，返回 `Command` 实例对象，实例上有着若干方法用于装饰该指令，其返回值同样为当前指令的实例对象。

<<< @/demo/modules/my-project/src/base-command.tsx#c2

### 指令模板字符

<<< @/demo/modules/my-project/src/base-command.tsx#c3

上述演示了指令模板字符的基本格式。

- 尖括号 `<>` 表示必要参数，方括号 `[]` 为可选参数
- 括号内部内容格式是 `参数名:参数类型`，参数名应为小写字母与数字（[a-z0-9]）组成，参数类型可省略，默认 `string`，支持的类型有: `string`、`number`、`boolean`
- 可选参数中可在参数类型后添加 `=值` 设置默认参数
- 参数中可在参数名前添加 `...` 设置剩余参数，与 TypeScript 不同的是，剩余参数的类型不需要加上数组表示
- 在指令模板字符最后添加 `- 指令描述` 设置指令描述
- 指令内容为截止到第一个参数出现之前的字符串（不含空格）
- 参数名应尽量语义化；剩余参数应在所有参数最后面；应仅在可选参数中设置默认参数；必要参数应在可选参数之前;指令模板字符不应包含指令前缀

### 选项

通过 `Command.option()` 设置指令选项，接受两个参数：

1. 该选项的缩写名
2. 选项模板字符，可设置多个指令选项

<<< @/demo/modules/my-project/src/base-command.tsx#c4

- 一般地，使用单个大写字母作为缩写名，解析器将把字符串中单个连接符 `-` 开头内容作为选项缩写名解析
- 使用多个小写字母作为全名（多个单词使用 单个连接符 `-` 解析），解析器将把字符串中两个连接符 `--` 开头的内容作为选项全名解析
- 在选项模板字符最后添加 `- 指令描述` 设置选项描述
- 类似地，选项模板字符有着与指令模板字符一样的类型注解方式，默认 `string`，支持的类型有: `string`、`number`、`boolean`
- 选项模板字符不支持设置默认值

### 回调函数

通过 `Command.action()` 设置指令的回调函数，且每个指令仅可设置一个回调函数，回调函数中接收两个参数：

1. `args` 与 `options` 两个键组成的对象，类型分别为 `(string | number | boolean)[]` 与 `Record<string， string | number | boolean>`，分别代表用户输入的参数值与选项值
2. 会话事件数据

> `options` 中的键为对应选项的全名而非缩写名。

<<< @/demo/modules/my-project/src/base-command.tsx#c5

回调函数中的第二个参数为当前会话事件数据 `session`。`session` 对象包含了当前指令触发产生的所有上下文信息，比如消息 id、消息类型、触发指令的账号、Bot 实例等，在处理函数中可以方便地与 Bot 进行交互。还可以从 `session` 中获取诸如发送消息等实用工具函数。下文将详细讲解 `session` 对象相关内容，此处仅做演示。

<<< @/demo/modules/my-project/src/base-command.tsx#c6

### 作用域

通过 `Command.scope()` 设置指令作用域，值类型为 `MessageScope`，如若不设置则默认所有场景均可使用。

```typescript
/** Message scope (session type) */
export declare enum MessageScope {
    /** Private message */
    PRIVATE = 0,
    /** Group message */
    GROUP = 1,
    /** Channel message */
    CHANNEL = 2
}
```

<<< @/demo/modules/my-project/src/base-command.tsx#c7

### 别名

通过 `Command.alias()` 设置指令别名，参数为 `string | string[]`。

<<< @/demo/modules/my-project/src/base-command.tsx#c8

### 权限

通过 `Command.access()` 设置指令权限，值类型为 `CommandAccess`。

```typescript
/** User access */
export declare enum UserAccess {
    /** Normal member */
    MEMBER = 0,
    /** Manager (group owner and group mangers) */
    MANGER = 1,
    /** Admin (master of bot instance) */
    ADMIN = 2
}
```

> `CommandAccess.ADMIN` 对应 `kotori.toml` 中的 `AdapterConfig.master` 选项

<<< @/demo/modules/my-project/src/base-command.tsx#c9

### 帮助信息

通过 `Command.help()` 设置指令帮助信息，相对于指令模板字符中的指令描述，其提供更为详尽全面的信息。

<<< @/demo/modules/my-project/src/base-command.tsx#c10

## 返回值处理

在上述众多演示中，可能你已注意到，与事件系统不同，指令的回调函数可以直接返回一个值作为消息发出，而不必使用 `session.send()` 方法。其本质上是自动将回调函数返回值作为参数传入 `session.quick()` 方法，具体处理逻辑请参考下文。

<<< @/demo/modules/my-project/src/base-command.tsx#c11

> 部分内容涉及到国际化相关内容，将在第三章中讲解

## 子指令

试想一下，有一个指令 `list` 有着多个操作，如查询、添加、删除列表等，大可以使用多个完全独立的指令如 `list_query`、`list_add`、`list_remove`，但这并不优雅。此处通过注册一个指令并判断其第一个参数的值执行相应操作

<<< @/demo/modules/my-project/src/base-command.tsx#c12

但是，其需要判断 `args[0]` 并处理无效时的情况，额外的代码嵌套依旧不够优雅。且多个操作下对于参数个数要求不一，如查询可以直接输入 `list query`，但对于添加/删除往往需要在后方再传入一个参数以指定添加/删除目标 `list add xxx`。因此，当同一指令有多个操作（即多个指令回调函数）且各个操作间相对独立时可使用子指令。基础用法：

<<< @/demo/modules/my-project/src/base-command.tsx#c13

使用子指令实现 `list` 指令：

<<< @/demo/modules/my-project/src/base-command.tsx#c14

## 会话事件数据

上一节的会话事件部分和本节中均提到了会话事件数据 `session`，又或是后面的中间件与正则匹配，都会有着它的身影。而指令系统作为 Kotori 中使用最广泛的功能且当前你已掌握事件系统的概念，会话事件数据的内容得以放在此处进行详细讲解。

### 重要属性

> 具体内容参考 [接口文档](../../api/)

`session` 对象本质上就是一个事件数据对象（即会话事件），上述是会话事件的共有属性，不同会话事件中有着不同的额外属性，如 `EventDataGroupMsg` 事件有 `messageId`、`sender`、`message`、`groupId`，而 `EventDataPrivateMsg` 事件没有 `groupId`，`EventDataPrivateRecall` 事件其中的仅有 `messageId`，这些额外属性均不在当前讨论范围内，具体内容参考接口文档。对于上述的共有属性在当前阶段也不必全部掌握。

- api: `Api` 实例对象，提供多个与当前聊天平台的交互接口
- el: `Elements` 实例对象，`api.adapter.elements` 属性的语法糖
- i18n: 国际化相关方法

### 字符串处理

```typescript
export type CommandArgType = string | number | boolean;
type ObjectArgs = Record<string, CommandArgType>;
type ArrayArgs = CommandArgType[];
```

`session.format()` 方法是一个简单的模板字符串替换工具（此处请区别于 JavaScript 中的 「模板字符串」）。接收两个参数：

1. 源字符串
2. 模板字符串参数，其类型有两种，分别为 `ObjectArgs`、`ArrayArgs`。

<<< @/demo/modules/my-project/src/base-command.tsx#c15

通过上述代码可知：

- 对象模板：通过 `%key%` 的形式进行替换，与对象键值一一对应，其更具有语义性，适合文本长且参数较多使用，但使用过多易造成代码冗余
- 数组模板：通过 `{index}` 的形式进行替换，与数组索引一一对应，缺少语义性但更简洁，适合短文本使用，不易造成代码冗余
- 模板字符串替换适合动态获取数据后呈现数据
- 适当的对模板字符串参数嵌套使用 `session.format()` 可实现较为复杂的动态数据展示，但不宜过多

一般地更推荐后者，并且在有 JSX 语法糖加持的情况下，数组模板替换可以使用 `<format />` 实现：

<<< @/demo/modules/my-project/src/base-command.tsx#c16

### 消息发送

在上一节已提到 `session.send()` 方法是对 `session.api` 上发送消息方法的封装，而 `session.quick()` 方法则是对 `session.send()` 的封装。一般地，在有会话事件数据可使用且无特殊需求下，均推荐使用 `session.quick()`，后续所有代码演示无特殊情况也默认使用该方法。

- 对于 `string` 将调用 `i18n.locale()` 方法实现国际化
- 对于 `[string, ObjectArgs | ArrayArgs]` 参数，将先遍历数组中第二个值下的所有属性并调用 `i18n.locale()` 进行替换，然后将其传入 `session.format()` 方法
- 对于 `undefined`、`''`、`void`、`null`、`0` 则不作处理（一般不允许传入这些东西，主要发生在指令处理的回调函数返回值上）
- 对于 `Error` 则另作处理（一般不允许传入这些东西，主要发生在指令处理的回调函数返回值上）
- 对于 `Promise` 则等待 Promise 完成后再做上述处理

> 关于 `i18n.locale()` 方法当前可粗略理解为：传入一个已预定好且唯一的字符串值，根据当前使用语言返回相应语言文本。当然，不理解并不妨碍你使用 `session.quick()` 方法

```json
// locales/zh_CN.json
{
  "test.msg.himeki.hitokoto": "最喜欢你了，欧尼酱",
  "test.msg.himeki": "名字：{0}\n身高：{1}cm\n口头禅：{2}"
}
```

<<< @/demo/modules/my-project/src/base-command.tsx#c17

### 会话交互

目前 Kotori 原生提供了两个会话交互方法：`session.prompt()` 与 `session.confirm()`，它们和浏览器中的 `prompt()` 与 `confirm()` 类似，分别对应为输入框和提示框。

<<< @/demo/modules/my-project/src/base-command.tsx#c18

> [!WARNING]
> 一次性有多个会话交互（消息、输入、确认...）时请注意不用遗漏 `await` 关键词，否则可能会有一些意料之外的效果。

- 两者参数均只有一个且可选
- `session.prompt()` 参数为 `string`，对应提示消息，返回 `Promise<string>`
- `session.confirm()` 参数为 `{ message: string, sure: string }`，分别对应提示消息和确认消息（只有用户发送消息与确认消息完全一致时返回 `true` 反之 `false`），返回 `Promise<boolean>`

> [!NOTE]
> 目前会话交互功能甚少，内容也不全面，如对 i18n 支持不够完善、需手动进行数据校验、Promise 超时等问题，如有能力欢迎你前来帮助 Kotori 完善。

### 错误处理

随着功能的不断增多，不稳定性也随之增多，面对用户传入的各种奇怪数据，虽有着 Kotori 本身的指令参数和数据校验用于防护，但这并不能百分百避免所有错误发生，因此学会自行错误处理至关重要。以下是 Kotori 内置的指令错误类型可供参考：

```typescript
type CommandArgTypeSign = 'string' | 'number' | 'boolean';

interface CommandParseResult {
  option_error: { expected: CommandArgTypeSign; reality: CommandArgTypeSign; target: string }; // 选项类型错误
  arg_error: { expected: CommandArgTypeSign; reality: CommandArgTypeSign; index: number }; // 参数类型错误
  arg_many: { expected: number; reality: number }; // 参数过多
  arg_few: CommandParseResult['arg_many']; // 参数过少
  syntax: { index: number; char: string }; // 语法错误（引号、反斜杠问题）
  unknown: { input: string }; // 未知的指令
}

export interface CommandResult extends CommandParseResult {
  error: { error: unknown }; // 未知错误
  data_error: { target: string | number };
  res_error: { error: TsuError };
  num_error: null;
  no_access_manger: null; // 无管理员权限
  no_access_admin: null; // 无最高管理员权限
  disable: null;
  exists: { target: string };
  no_exists: CommandResult['exists'];
}
```

Kotori 中指令指令错误分为两大类：

- 指令解析时错误：即上述的 `CommandParseResult`，这些在指令系统不需要你操心，因为它们已全部交由上游的 Kotori 内置中间件进行处理，在解析指令时就会被发现
- 指令运行时错误：即上述的 `Omit<CommandResult, keyof CommandParseResult>`，它们有的发生在指令执行前（如 `no_access_manger`、`no_access_admin`），又或者 `error` 这种错误之外的错误（执行回调函数时捕获的错误），这两者也不需要你操心

需要操心的是剩下可能发生在指令执行期间的错误，这些错误无法由 Kotori 处理，全需要你在编写代码时手动处理：

- `data_error` 参数错误（不同于参数类型错误）
- `res_error` 资源错误（主要是指网络请求第三方 Api 时返回数据类型有误）
- `num_error` 序号错误（主要是指需要用户传入数字进行选择的情况）
- `exists` 目标已存在（如添加目标到名单里但目标已存在于名单）
- `no_exists` 目标不存在（如删除目标从名单里但目标不存在于名单）

使用 `session.error()` 方法即可在运行时阶段抛出错误，

<<< @/demo/modules/my-project/src/base-command.tsx#c19

上述代码展示了其非常经典的一个例子，机器人的功能往往部分来自于网络接口请求，确保其第三方内容的稳定性更是必要的，因此对获取的数据进行检查，然后再进行访问属性操作，如若获取的数据与预期不一致则使用 `session.error()` 抛出错误

> `ctx.http` 是一个网络请求工具，基于 Axios 封装，具体内容参考[接口文档](../../api/)；此处你会发现出于不愿意写 `as any` 的原因，对于动态数据的校验往往很繁琐，但这并非最佳实践，第三章中将讲到 Schema，专门用于运行时下检验动态数据（或者说 The-First-Class Type）
