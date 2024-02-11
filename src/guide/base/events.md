# 事件系统

**事件系统（Events）** 的上游是**事件订阅者模式（Events Emiter）**，该设计模式与事件系统共同构成了 Kotori 的基础，Kotori 内部通过订阅事件保持各部分间的联系和协作任务。同时也有来自各个聊天平台的事件，通过订阅这些事件能实现丰富多样的功能。
## 订阅事件

事件系统的使用方法与常规的事件订阅者一致，通过 `ctx.on()` 订阅一个事件，第一个参数为事件名，第二个参数为回调函数，事件被触发时事件数据将作为实际参数传给回调函数。

```typescript
import { MessageScope } from 'kotori-bot'

// ...

ctx.on('on_message', (session) => {
	if (session.message !== '你是谁') return;
	if (session.type === MessageScope.GROUP) {
		session.api.sendGroupMsg('是 Kotori！', session.groupId);
	} else {
		session.api.sendPrivateMsg('是 Kotori！', session.userId);	
	}
});
```

从上述代码中可以看出，当收到消息时，如果不是「你是谁」则立即退出，执行完毕。如果是则判断 `session.type` 的值，调用相应的发送消息接口发送「是 Kotori！」。根据语义化命名可知：`session.type` 为消息类型，值是一个 `MessageScope` 枚举值，分为 「GROUP」（群聊）和「PRIVATE」（私聊）；`session.api` 是 `Api` 的实例对象，提供了多种与聊天平台交互的接口，此处用到的 `sendG丨groupMsg` 与 `sendPrivateMsg` 分别是发送群聊消息与发送私聊消息，第一个参数为消息内容，第二个参数分别为群聊 id 与用户 id。

> id 一般为对应聊天平台提供的 id/uid，叫法不一，值类型为 string 或 number。如当你收到由适配器 @kotori-bot/kotori-plugin-adapter-onebot 发出的消息时，`groupId` 为 QQ 群号，`userId` 为 QQ 号。

上面的代码每次都需要判断消息类型再执行相应方法，显得有点繁琐，因此 kotori 提供了一个语法糖：

```typescript
ctx.on('on_message', (session) => {
	if (session.message !== '你是谁') return;
		session.send('是 Kotori！');	
	}
});
```

使用 `session.send()` 只需要传入消息内容即可，消息类型判断和传入相应 id 的工作已在该方法内部完成。`session` 上还有不少与之类似的语法糖，将在后面章节中逐一提到，也因如此，`session.send()` 在实际开发中使用率并不高，因为它对后续内容而言依旧很繁琐。
## 取消订阅事件

正如订阅事件是「on」，取消订阅事件则是「off」。`ctx.off()` 的使用方法与 `ctx.on()` 一致。

```typescript

const handle = (session: Session['on_message']) => {
	ctx.off('on_message', handle);
	// ...
}

ctx.on('on_message', handle);
```

上述代码中，触发事件后会立即取消订阅事件，意味着它只会被触发一次。`ctx.on()` 在执行后会返回取消订阅自己的方法，因此可以这样简化：

```typescript
const off = ctx.on('on_message', (session) => {
	off();
	// ...
});
```

使用 `ctx.once()` 再进一步简化：

```typescript
ctx.once('on_message', (session) => {
	// ...
});
```

工作流程与上面一致，通过 `ctx.once()` 订阅事件，在触发后会立即取消订阅。

使用 `ctx.offAll()` 取消订阅指定事件名下所有事件：

```typescript
ctx.once('on_message', (session) => {
	// ...
});

ctx.once('on_message', (session) => {
	// ...
});

ctx.on('on_message', (session) => {
	if (session.message === '消失吧！') return;
		ctx.ofAll('on_message');
	}
});
```

在第三个回调函数中，当收到消息「消失吧！」时将取消订阅所有 `on_message` 事件。

## 事件类型

Kotori 中事件类型大致分为三类：
- **系统事件（System Event）**：与生命周期和适配器有关的事件，回调函数中的参数名一般为 `data`。
- **会话事件（Session Event）**：与聊天平台有关的事件，回调函数中的参数名一般为 `session`。
- **自定义事件（Custom Event）**：由模块定义的事件，一般用于模块内部或多个模块间通信，参数量不固定。
### 系统事件

常见的系统事件有：
- `ready` ：当加载完所有模块时触发
- `dispose` ：当 Kotori 关闭时触发
- `status` ：当 Bot 的在线状态改变时触发

通过 `status` 实现 Bot 上线后自动发送消息给最高管理员：

```typescript
ctx.on('status', (data) => {
	if (data.status !== 'online') return;
	const { api, config } = data.adapter;
	api.sendPrivateMsg('上线了！', config.master);
});
```

由于 `status` 是由适配器发出的系统事件，它并没有类似于会话事件中的 `session.send()`，因此只能使用最原始的办法发送消息。`status`  的事件数据中仅有两个值，一个是 `data.status` 表示当前在线状态（「online」或「offline」），`data.adapter` 为目标 Bot，Bot 上有 `adapter.api` 与 `adapter.config`，前者等价于会话事件中的 `session.api`，后者为 Bot 配置，来自于 `kotori.yml`。

### 会话事件

常见的会话事件有：
- `on_message` ：当收到消息时触发
- `on_recall` ：当有消息撤回时触发
- `on_group_increase` ：当群人数增加时触发

通过  `on_group_increase` 实现群欢迎：

```typescript
ctx.on('on_group_increase', (session) => {
	session.send(`因为遇见了${session.el.at(session.userId)}，我的世界才充满颜色！`);
});
```
其中 `session.el` 与 `session.api` 类似，是 `Elements` 的实例对象，它提供了用于转换消息元素的接口，如 `session.el.at()` 传入用户 id 转换成艾特消息，`session.el.image()` 传入图片 URL 转换成图片消息。当然，并不是所有聊天平台都支持所有的消息元素，应以具体聊天平台为准。
## 自定义事件与发出事件

得益于 TypeScript 有着 **声明合并（Declaration Merging）** 的特性，在模块中可通过其实现自定义事件的局部声明。

```typescript
declare module 'kotori-bot' {
	interface EventsMapping {
		custom_event1(data: string): void;
	}
}

ctx.on('custom_event1', (data) => {
	ctx.logger.debug(data);
});
```

Kotori 中所有事件均定义在 `EventsMapping` 接口上。`custom_event1` 事件触发后将打印事件数据。`ctx.logger` 是一个日志打印工具，`ctx.logger.debug()` 意味着打印内容仅在 `dev` 模式下运行 Kotori 可见。然而，订阅事件后，事件却从来没有发出，因此需要发出事件：

```typescript
// ...

ctx.emit('custom_event1', '这是事件数据');
ctx.emit('custom_event1', '这里也是事件数据');
```

`ctx.emit()` 第一个参数为事件名，然后为剩余参数，剩余参数与该事件参数一一对应。虽然 Kotori 中系统事件与会话事件的参数均只有一个，但是可以在自定义事件中实现任意多个参数：

```typescript
declare module 'kotori-bot' {
	interface EventsMapping {
		custom_event2(arg1: string, arg2: number, arg3: boolean): void;
		custom_event3(...args: any[]): void;
	}
}

ctx.emit('custom_event2', 'string', 42, true);
ctx.emit('custom_event3', 'string1', 'string2', 233, 2333, {value: 42});
```

> 一般地，自定义事件应只用于单个模块内部，用于多个模块间相互通信传输数据时，每个涉及模块应先加载定义自定义事件的模块，以免出现类型定义的问题。