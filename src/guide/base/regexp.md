# 正则匹配

**正则匹配(RegExp)** 同样是 Kotori 中一种监听消息事件的语法糖。它的主要用途是通过正则表达式匹配消息内容,然后执行相应的处理逻辑。值得一提的是,正则匹配位于消息事件的最后一环(在中间件和指令之后执行),这意味着只有通过了所有中间件和指令的消息,才会进入正则匹配的环节。

正则匹配依赖于正则表达式的强大功能,可以实现多种匹配模式,例如完全匹配、模糊匹配等,为消息处理提供了更大的灵活性。

## 注册正则匹配

通过 `ctx.regexp()` 注册一个正则匹配,该方法接受两个参数:

1. `match`: 用于匹配消息内容的正则表达式
2. `callback`: 当正则匹配成功时执行的回调函数

```typescript
ctx.regexp(/^\/start$/, (match, session) => {
  session.send('游戏开始!');
});
```

上述代码注册了一个正则匹配,当收到消息内容为 `/start` 时,它会执行回调函数,并向发送者发送 `'游戏开始!'` 消息。

`callback` 函数接收两个参数:

1. `match`: 正则匹配结果,是一个数组,第一项为完整匹配结果,后续项为各个捕获组的内容
2. `session`: 当前消息事件的上下文信息

在回调函数中,你可以根据匹配结果执行相应的逻辑,回调函数的返回值将作为消息发送的内容。

### 移除正则匹配

`ctx.regexp()` 方法的返回值是一个可以用于移除该正则匹配的函数。

```typescript
const off = ctx.regexp(/pattern/, () => { /* ... */ });

// 移除正则匹配
off();
```

## 正则匹配示例

### 简单匹配

```typescript
ctx.regexp(/^\/echo (.+)$/, (match, session) => {
  const content = match[1]; // 捕获组内容
  session.send(content); // 回声匹配消息
});
```

上述代码注册了一个正则匹配,用于实现 `/echo` 命令。当收到类似 `/echo 你好` 的消息时,正则会匹配到 `你好` 并将其作为第一个捕获组,然后在回调函数中将捕获组的内容作为消息发送出去。

### 复杂匹配

```typescript
ctx.regexp(/^算((数学|语文|英语)\b)\s*(\d+)分$/, (match, session) => {
  const [, , subject, score] = match;
  let msg;
  switch (subject) {
    case '数学':
      msg = `数学 ${score} 分`;
      break;
    case '语文':
      msg = `语文 ${score} 分`;
      break;
    case '英语':
      msg = `英语 ${score} 分`; 
      break;
    default:
      msg = '不支持的科目';
  }
  session.send(msg);
});
```

这个例子演示了一个稍微复杂的正则匹配。正则 `/^算((数学|语文|英语)\b)\s*(\d+)分$/` 用于匹配像 `算数学98分`、`算 语文80分` 这样的消息。正则中使用了一个命名捕获组 `(?<subject>...)`(不过这个语法还未被 Node.js 完全支持,因此这里使用了普通的捕获组)。

在回调函数中,我们通过数组解构拿到匹配的学科和分数,然后根据不同的学科返回对应的消息内容。

### 模糊匹配

```typescript
ctx.regexp(/在\s*吗?/, (match, session) => {
  session.send('我在这里');
});
```

这个例子展示了如何使用正则进行模糊匹配。正则 `/在\s*吗?/` 可以匹配 `在吗`、`在 吗` 以及 `在` 这三种情况。使用 `?` 可以使前面的字符或字符组成为可选。

在回调函数中,我们只需返回一个简单的 `'我在这里'` 消息即可。

### 多个匹配

```typescript
ctx.regexp(/^(加|减|乘|除)\s*(\d+)\s*(加|减|乘|除)?\s*(\d+)?$/, (match, session) => {
  const [, op1, n1, op2, n2] = match;
  let result;
  switch (op1) {
    case '加':
      result = n2 ? parseInt(n1) + parseInt(n2) : parseInt(n1);
      break;
    case '减':
      result = n2 ? parseInt(n1) - parseInt(n2) : -parseInt(n1);
      break;
    case '乘':
      result = n2 ? parseInt(n1) * parseInt(n2) : parseInt(n1);
      break;
    case '除':
      result = n2 ? parseInt(n1) / parseInt(n2) : 1 / parseInt(n1);
      break;
  }
  session.send(`结果是: ${result}`);
});
```

这个例子展示了如何在一个正则匹配中处理多个匹配情况。正则 `/^(加|减|乘|除)\s*(\d+)\s*(加|减|乘|除)?\s*(\d+)?$/` 可以匹配像 `加10`、`减20`、`乘30`、`除40`、`加10除2` 这样的算术表达式。

在回调函数中,我们根据匹配的运算符和操作数进行相应的计算,并将结果作为消息发送出去。需要注意的是,这里我们使用了可选的捕获组,因此在处理单个操作数的情况时需要进行判断。

通过正则匹配的强大功能,我们可以灵活地处理各种复杂的消息,实现个性化的交互体验。而将正则匹配与其他功能(如指令系统、数据持久化等)相结合,就能构建出更加强大的应用程序。
