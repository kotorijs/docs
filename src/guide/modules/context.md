# 上下文

**上下文（Context）** 是整个 Kotori 的核心机制，不仅是 Kotori 模块围绕着上下文实例实现一系列功能，即便是在 Kotori 内部也依赖于上下文实现各组件之间的通信与解耦合，同时也为 Kotori 的扩展提供了可能。犹如一个树根，Kotori 本身在内的各种内容均为其枝干，并通过不同的组合丰富枝干上枝叶的内容，上下文机制充分体现了**依赖注入（Dependency Injection）**和**面向切面编程（Aspect Oriented Programming）**的思想。

## 注册与获取

上下文实例中包含诸多属性和方法，但绝大部分功能并非来源于上下文本身，而是来源于 Kotori 内部的其它组件。通过 `ctx.provide()` 可将指定对象注册到当前上下文实例中，并通过 `ctx.get()` 获取。

```typescript
declare class Server {}

const ctx = new Context();
ctx.provide('config', {
  port: 3000,
  host: 'localhost'
});
ctx.provide('server', new Server());

const config = ctx.get('config'); // { port: 3000 }
const server = ctx.get('server'); // Server {}
```

无论是对象字面量还是实例对象，都可以作为上下文实例的提供者。请注意，此处所有对象均是直接引用并未进行深拷贝。

## 注入与混合

使用 `ctx.inject()` 注入指定的已注册到当前上下文实例中的对象，注入后即可在上下文中通过注册名称直接获取到注入的实例，而无需再通过 `ctx.get()` 获取。

```typescript
ctx.provide('config', {
  port: 3000,
  host: 'localhost'
});
ctx.config.port; // TypeError: Cannot read properties of undefined (reading 'port')
ctx.inject('config');
ctx.config.port; // 3000
```

除了注入外，当只期望目标对象的部分属性或方法被装饰到上下文实例中时，可使用 `ctx.mixin()`。

```typescript
ctx.provide('demo', {
  name: 'hello, kotori!',
  display() {
    return this.name;
  }
});

ctx.display(); // Uncaught TypeError: ctx.display is not a function
ctx.mixin('demo', ['display']);
ctx.display(); // hello, kotori!
```

相比注入，混合更加颗粒化同时减去不必要的属性访问。无论是注入还是混合，都并非直接对对象进行复制或建立新引用，其通过代理控制对象的每个属性或方法的操作，以便解决在混合后，原对象中 this 指向等问题。

对于上面的演示代码，还可以进一步做一些对开发者友好的工作，凭借 TypeScript 中声明合并的特性，为开发者提供良好的代码补全提示。

```typescript
const ctx = new Context();

const config = {
  /* ... */
};
const demo = {
  /* ... */
};

declare interface Context {
  config: typeof config;
  display: (typeof demo)['display'];
}

ctx.provide('demo', demo);
ctx.inject('config');

ctx.provide('demo', config);
ctx.mixin('demo', ['display']);
```

## 继承

此外，通过代理得以实现父子级上下文的概念。如，Kotori 直接给与每个模块的执行主体的上下文实例均为独一无二，它是 Kotori 内部中根上下文实例的子级上下文实例，此外也有部分上下文实例是孙级上下文实例或更深。当访问上下文中的属性或方法时，若当前上下文实例中不存在，则会沿着继承链向上查找，直到根上下文为止，这点与 JavaScript 中原型链的查找方式类似，但原理不同。使用 `ctx.extends()` 继承当前上下文。

```typescript
const ctx = new Context();
const ctxChild1 = ctx.extends();
const ctxChild2 = ctx.extends();

ctx.provide('data1', { value: 1 });
ctx.inject('data1');
ctx.data1.value; // 1
ctxChild1.data1.value; // 1

ctxChild1.provide('data2', { value: 2 });
ctxChild1.inject('data2');
ctx.data2; // undefined
ctxChild1.data2.value; // 2

ctxChild2.provide('data3', { value: 3 });
ctxChild2.inject('data3');
ctx.data3; // undefined
ctxChild1.data3; // undefined
ctxChild2.data3.value; // 3
```

可见，上下文继承后具有相对隔离性，对于子级上下文来说，只能访问自己父级上下文中注册的对象（即便是在自己被继承后注册的），而不能访问非自己父级上下文和其它子级上下文中注册的对象。而父级上下文也只能往上获取，无法往下获取自己子级上下文单独注册的对象。

```typescript
const ctx = new Context();
const ctxChild1 = ctx.extends();
const ctxChild2 = ctx.extends({meta: 'some meta data', 'child2'});

ctx.meta; // undefined
ctxChild1.meta; // undefined
ctxChild2.meta; //'some meta data'

ctx.identity; // undefined
ctxChild1.identity; // 'sub'
ctxChild2.identity; // 'child2'
```

在继承时，可传入两个可选参数用于标记新的子级上下文实例，第一个参数类型为对象，作用效果类似于将对象注册后并将对象上所有属性执行 `ctx.mixin()`，但原理并不同，可用作传入一些子级上下文必要的元数据信息。第二个参数类型为字符串，为该子级上下文实例设置唯一标识符。对于根上下文实例而言，其标识符为 `undefined`，对于未设置标识符的子级上下文实例，其标识符为 `'sub'`。

```typescript
const ctx = new Context();
const ctxChild1 = ctx.extends();
const ctxChild2 = ctx.extends();
const ctxChild3 = ctxChild1.extends();

ctx.root === ctx; // true
ctxChild1.root === ctxChild1 || ctxChild1.root === ctxChild2; // false
ctxChild1.root === ctx && ctxChild2.root === ctx; // true
ctxChild3.root === ctxChild1; // false
ctxChild3.root === ctx; // true
```

通过 `ctx.root` 属性可获取当前上下文的根上下文实例，无论是子级上下文 `ctxChild1`、`ctxChild2`，还是继承了 `ctxChild1` 的孙级上下文 `ctxChild3`，其根上下文实例均指向 `ctx`，而根上下午实例的 `ctx.root` 指向自身。

## 事件系统

以上内容均由最初的 `Context` 类定义，通过类原生的继承方式和 `ctx.inject()`、`ctx.mixin()` 等方法对 `Context` 进行装饰或扩展。而在 `Context` 类内部，它本身就已为自己注册并注入了两个实例对象，其一便是事件系统，这也是在第二章中介绍事件系统时说道⌈事件订阅者模式与事件系统共同构成了 Kotori 的基础⌋的原由，只不过 `Context` 类本身并未使用事件系统功能，且仅直接定义了 `ready` 与 `dispose` 事件，两者被作为整个程序生命周期的重要一环，其余事件由另一实例对象（见下文）或 Kotori 核心类定义。

## 插件系统

其二便是插件系统，它定义了 `ready_module` 与 `dispose_module` 事件。在上一节说过⌈在真正学习到上下文之前，可暂且默认插件等同于模块⌋，而现在你将会对⌈插件⌋有更深的认知。

通过 `ctx.load()` 加载插件并触发 `ready_module` 事件，且 `ready_module` 事件在插件加载完毕后触发。

```typescript
/* types */
type ModuleInstanceClass = new (ctx: Context, config: ModuleConfig) => void;
type ModuleInstanceFunction = (ctx: Context, config: ModuleConfig) => void;

interface ModuleExport {
  name?: string;
  main?: ModuleInstanceFunction;
  Main?: ModuleInstanceClass;
  default?: ModuleInstanceFunction | ModuleInstanceClass;
  inject?: string[];
  config?: ModuleConfig;
}

interface EventDataModule {
  instance: ModuleExport | string | ModuleInstanceFunction | ModuleInstanceClass;
}

/* index.ts */
function plugin1(ctx: Context) {
  ctx.logger.debug('plugin1 loaded');
}

export function main(ctx: Context) {
  // output: module(main plugin) loaded
  ctx.on('read_module', (data: EventDataModule) => {
    if (data.instance === main) ctx.logger.debug('module(main plugin) loaded');
    else if (data.instance === plugin1) ctx.logger.debug('plugin1(sub plugin) loaded');
  });
  ctx.load(plugin1); // output: plugin1(sub plugin) loaded
}
```

`ctx.load()` 支持四种参数形式，最常用的是直接传入执行主体函数（`ModuleInstanceFunction`），此外也可以通过传入执行主体类（`ModuleInstanceClass`），亦或你想为子插件传入配置或注册依赖等也可使用导出对象形式（`ModuleExport`）：

```typescript
interface SubConfig {
  port: number;
}

export function main(ctx: Context) {
  ctx.load(
    class {
      public constructor(private subCtx: Context) {}
    }
  );
  ctx.load({
    config: { port: 3000 },
    main: (subCtx: Context, cfg: SubConfig) => {}
  });
}
```

导出对象形式与模块入口文件的导出是一致的。在 Kotori 内部，由加载器自动加载所有的模块入口文件进行预处理，然后转接给此处的 `ctx.load()` 进行调用执行主体。不同的是，此处可以定义 `name` 属性用于标记插件的名称，这将作用于该插件的上下文实例的 `ctx.identity` 中，而模块中的 `ctx.identity` 由加载器通过 `package.json` 中的包名自动获取（仅保留 `kotori-plugin-` 以后字段）。即便是子插件，它的上下文实例与配置数据也是完全独立，区别在于模块（由加载器加载）的上下文实例继承自 Kotori 内部中的根上下文实例，而子插件的上下文实例继承于当前模块的上下文实例，以此类推。入口文件中导出的 `config` 是一个配置检测者，加载器会调用它来验证 `kotori.yml` 中相应的实际配置数据是否符合要求，符合则将替换 `config` 为实际数据再传入 `ctx.load()` 作后续处理，在模块中执行 `ctx.load()`，其配置数据拥有确定性（指由开发者保证，与 Kotori 无关），因此要求此处直接传入配置数据。

```yaml
plugin:
  my-project:
    value: 'here is a string'
```

```typescript
export const config = Tsu.Object({
  value: Tsu.String()
});

export function main(ctx: Context, cfg: Tsu.infer<typeof config>) {
  ctx.logger.debug(ctx.identity, cfg.value); // my-project here is a string
  const subCfg = {
    value: 233
  }
  ctx.load({
    name: 'plugin1',
    main: (subCtx: Context, cfg: typeof 233) => {
      subCtx.logger.debug(subCtx.identity, cfg.value); // plugin1 233
    }
  });
}
```

子插件与当前模块的上下文实例完全独立，具有隔离性，由此可通过这一点做一些需要隔离的操作：

```typescript
export const inject = [];

export function main(ctx: Context) {
  ctx.load({
    name: 'plugin1',
    inject: ['database']
    main: (subCtx: Context) => {
      /* ctx.database... */
    }
  });
  ctx.logger.debug(ctx.database) // undefined
}
```

当然你也可以指定多个函数主体，这将会验证上一节所讲的执行主体的识别顺序，因此这只会执行其中一个：

```typescript
export function main(ctx: Context) {
  ctx.load({
    name: 'plugin1',
    inject: ['database']
    main: (subCtx: Context) => {
      /* ctx.database... */
    }
  });
  ctx.logger.debug(ctx.database) // undefined
}
```

加载一个依赖了 `database` 服务的子插件便可在其内部进行调用数据库操作，而在外层的模块中，并未依赖因此无法使用 `ctx.database` 属性。

此外，还有一项实验性功能，可直接将字符串（TypeScript/JavaScript 文件路径）作为参数传入 `ctx.load()`，但因其原本的加载文件功能被放置到加载器中实现，`ctx.load()` 仅会以同步形式直接调用执行主体，传入文件路径则会先动态加载文件，因此 `ctx.load()` 此时将变成一个异步函数。

```typescript

```
