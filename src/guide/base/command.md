# 指令注册

## 引入

在上一节中学习了事件系统的使用,现在通过 `on_message` 事件实现一个小功能:

```typescript
ctx.on('on_message', (session) => {
  if (!session.message.startsWith('/')) return;
  const command = session.message.slice(1);

  if (command === 'echo') {
    const content = command.slice(5);
    session.send(content ? content : '输入内容为空');
  } else if (command === 'time') {
    session.send(`现在的时间是 ${new Date().getTime()}`);
  } else {
    session.send('未知的指令');
  }
});
```

当收到「/echo xxx」消息时将发送「xxx」;当收到「/time」消息时将发送当前时间戳;两者都不是时发送「未知的指令」。然而当结果越来越多后,`if...else` 语句也会越来越多,显然,这是十分糟糕的。尽管可以考虑将条件内容作为键、结果处理包装成回调函数作为值,以键值对形式装进一个对象或者 Map 中,然后遍历执行。但是当条件越来越复杂时,字符串的键远无法满足需求,同时也可能有相当一部分内容仅在私聊或者群聊下可用,其次,参数的处理也需要在结果处理内部中完成,这是十分复杂与繁琐的,因此便有入了本节内容。

## 基本使用

**指令(Command)** 是 Kotori 的核心功能,也是最常见的交互方式,指令实质是 Kotori 内部对 `on_message` 事件的再处理与封装,这点与下一节中将学习的中间件是一致的,因此也可以看作是一个事件处理的语法糖。通过 `ctx.command()` 可注册一条指令,参数为指令模板字符,返回 `Command` 实例对象,实例上有着若干方法用于装饰该指令,其返回值同样为当前指令的实例对象。

```typescript
ctx.command('echo <...content>').action((data) => data.args.join(' '));

ctx.command('time')
  .action(() => {
    const time = new Date().getTime();
    return time;
  });
```

### 指令模板字符

```typescript
ctx.command('bar');
ctx.command('car <arg1> <arg2>');
ctx.command('dar <arg1> [arg2] [arg3=value]');
ctx.command('ear [arg1:number=1] [...args:string] - 指令描述');
```

上述演示了指令模板字符的基本格式。

- 尖括号 `<>` 表示必要参数,方括号 `[]` 为可选参数
- 括号内部内容格式是 `参数名:参数类型`,参数名应为小写字母与数字([a-z0-9])组成,参数类型可省略,默认 `string`,支持的类型有: `string`、`number`、`boolean`
- 可选参数中可在参数类型后添加 `=值` 设置默认参数
- 参数中可在参数名前添加 `...` 设置剩余参数,与 TypeScript 不同的是,剩余参数的类型不需要加上数组表示
- 在指令模板字符最后添加 ` - 指令描述` 设置指令描述
- 指令内容为截止到第一个参数出现之前的字符串(不含空格)
- 参数名应尽量语义化;剩余参数应在所有参数最后面;应仅在可选参数中设置默认参数;必要参数应在可选参数之前;指令模板字符不应包含指令前缀

### 指令选项

通过 `Command.option()` 设置指令选项,第一个参数为该选项的缩写名,第二个参数为选模板字符,可设置多个指令选项。

```typescript
ctx.command('bar')
  .option('n', '<name>')
  .option('a', '[age:number]')
  .action((data) => {
    // 处理 data.options.name 和 data.options.age
  });
```

### 指令处理

通过 `Command.action()` 设置指令的回调函数,回调函数中第一个参数为 `args` 与 `options` 两个键组成的对象,类型分别为 `(string | number | boolean)[]` 与 `Record<string, string | number | boolean>`,分别代表输入的参数值与选项值。每个指令仅可设置一个回调函数。

> `options` 中的键为对应选项的全名而非缩写名。

```typescript
ctx.command('bar <...args>')
  .action((data) => {
    console.log(data.args); // 输出参数值数组
  });
```

指令处理函数的返回值将作为该指令的最终返回内容发送。如果返回普通字符串,则直接发送;如果返回数组,则将数组的第一项作为 i18n 键,剩余项作为数据传入模板引擎渲染后发送;如果返回 Promise,则等待 Promise 完成后再做上述处理。

```typescript
ctx.command('concat <str1> <str2>')
  .action(({ args: [str1, str2] }) => str1 + str2);

ctx.command('render')
  .action(() => ['template.text', { content: '这是模板内容' }]);

ctx.command('fetch')
  .action(async () => {
    const res = await ctx.http.get('https://api.example.com');
    return ['template.status', { status: res.status }];  
  });
```

## 指令上下文

在指令处理函数中可以通过解构赋值获取指令处理上下文 `session`。

```typescript
ctx.command('sendMsg')
  .action(async ({ session }) => {
    await session.send('这是一条消息');
  });
```

`session` 对象包含了当前指令触发产生的所有上下文信息,比如消息 id、消息类型、触发指令的账号、Bot 实例等,在处理函数中可以方便地与 Bot 进行交互。还可以从 `session` 中获取诸如发送消息、获取用户信息等实用工具函数。

```typescript
ctx.command('at')
  .action(async ({ session }) => {
    const { userId, nickname } = await session.getAccountInfo();
    session.send(`你好,${session.el.at(userId)}@${nickname}`);
  });
```

## 指令作用域

通过 `Command.scope()` 设置指令作用域,可选值有 `'private'`、`'group'` 和 `'both'`,默认为 `'both'`。

```typescript
ctx.command('test')
  .scope('private') // 仅在私聊下可用
  .action(() => '这是一条私聊消息');

ctx.command('hello')
  .scope('group') // 仅在群聊下可用  
  .action(({ session }) => {
    session.send(`你好,${session.groupName}`);
  });
```

## 指令别名

通过 `Command.alias()` 设置指令别名,参数可以是单个字符串或字符串数组。

```typescript
ctx.command('original')
  .alias('o') // 别名可以是单个字符串
  .alias(['ori', 'org']) // 也可以是字符串数组
  .action(() => '这是原版指令');
```

## 指令权限

通过 `Command.access()` 设置指令权限,可选值为 `'all'`、`'master'`、`'admin'` 和 `'user'`。

- `'all'`: 所有人均可使用
- `'master'`: 仅主人可使用 
- `'admin'`: 仅主人和管理员可使用
- `'user'`: 仅主人、管理员和普通用户可使用

```typescript
ctx.command('op')
  .access('master') // 仅主人可用
  .action(() => '这是一条特殊指令');
```

## 指令帮助

通过 `Command.help()` 设置指令帮助信息,通常配合主帮助命令使用。


当收到「/echo xxx」消息时将发送 「xxx」；当收到「/time」消息时将发送当前时间戳；两者都不是时发送「未知的指令」。然而当结果越来越多后，`if...else` 语句也会越来越多，显然，这是十分糟糕的。尽管可以考虑将条件内容作为键、结果处理包装成回调函数作为值，以键值对形式装进一个对象或者 Map 中，然后遍历执行。但是当条件越来越复杂时，字符串的键远无法满足需求，同时也可能有相当一部分内容仅在私聊或者群聊下可用，其次，参数的处理也需要在结果处理内部中完成，这是十分复杂与繁琐的，因此便有入了本节内容。

## 基本使用

**指令（Command）** 是 Kotori 的核心功能，也是最常见的交互方式，指令实质是 Kotori 内部对 `on_message` 事件的再处理与封装，这点与下一节中将学习的中间件是一致的，因此也可以看作是一个事件处理的语法糖。通过 `ctx.command()` 可注册一条指令，参数为指令模板字符，返回 `Command` 实例对象，实例上有着若干方法用于装饰该指令，其返回值同样为当前指令的实例对象。

```typescript
ctx.command('echo <...content>').action((data) => data.args.join(' '));
ctx.command('time')
	.action(() => {
		const time = new Date().getTime();
		return time;
});
```

### 指令模板字符

```typescript
ctx.command('bar');
ctx.command('car <arg1> <arg2>');
ctx.command('dar <arg1> [arg2] [arg3=value]');
ctx.command('ear [arg1:number=1] [...args:string] - 指令描述');
```

上述演示了指令模板字符的基本格式。

- 尖括号 `<>` 表示必要参数，方括号 `[]` 为可选参数
- 括号内部内容格式是 `参数名:参数类型`，参数名应为小写字母与数字（\[a-z0-9\]）组成，参数类型可省略，默认 `string`，支持的类型有：`string`、`number`、`boolean`
- 可选参数中可在参数类型后添加 `=值` 设置默认参数
- 参数中可在参数名前添加 `...` 设置剩余参数，与 TypeScript 不同的是，剩余参数的类型不需要加上数组表示
- 在指令模板字符最后添加 ` - 指令描述` 设置指令描述
- 指令内容为截止到第一个参数出现之前的字符串（不含空格）
- 参数名应尽量语义化；剩余参数应在所有参数最后面；应仅在可选参数中设置默认参数；必要参数应在可选参数之前；指令模板字符)g不应包含指令前缀
### 指令选项

通过 `Command.option()` 设置指令选项，第一个参数为该选项的缩写名，第二个参数为选模板字符，可设置多个指令选项。

```typescript
ctx.command('bar')
	.options(
```

### 指令处理

通过 `Command.action()` 设置指令的回调函数，回调函数中第一个参数为 `args` 与 `options` 两个键组成的对象，类型分别为 `(string | number | boolean)[]` 与 `Record<string, string | number | boolean>`，分别代表输入的参数值与选项值。每个指令仅可设置一个回调函数。

> `options` 中的键为对应选项的全名而非缩写名。

```typescript

```


```typescript
ctx.command('help')
  .help('获取帮助信息')
  .action(async ({ session }) => {
    const helps = ctx.commands
      .filter(cmd => cmd.meta.help)
      .map(cmd => `${cmd.meta.root} - ${cmd.meta.help}`);

    session.send(helps.join('\n'));    
  });
```

以上就是指令系统的全部内容,通过 Kotori 提供的指令系统可以简单快速地实现命令行式的交互体验。当然,除了指令系统,中间件同样重要,下一节将对其进行学习。
```m# 指令注册

## 引入

在上一节中学习了事件系统的使用，现在通过 `on_message` 事件实现一个小功能：

```typescript
ctx.on('on_message', (session) => {
	if (!session.message.startWith('/')) return;
	const command = session.message.slice(1);
	if (command === 'echo') {
		const content = command.slice(5);
		session.send(content ? content : '输入内容为空');
	} else if (command === 'time') {
		session.send(`现在的时间是 ${new Date().getTime()}`);
	} else {
		session.send('未知的指令');
	}
});
```
