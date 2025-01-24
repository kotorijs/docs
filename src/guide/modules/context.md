# 上下文

**上下文（Context）** 是整个 Kotori 的核心机制，不仅是 Kotori 模块围绕着上下文实例实现一系列功能，即便是在 Kotori 内部也依赖于上下文实现各组件之间的通信与解耦合，同时也为 Kotori 的扩展提供了可能。犹如一个树根，Kotori 本身在内的各种内容均为其枝干，并通过不同的组合丰富枝干上枝叶的内容，上下文机制充分体现了**依赖注入（Dependency Injection）**和**面向切面编程（Aspect Oriented Programming）**的思想。本节绝大部分内容来自 [`fluoro`](https://www.npmjs.com/package/fluoro) 库，同时它也是 Kotori 的基础。

## 注册与获取

上下文实例中包含诸多属性和方法，但绝大部分功能并非来源于上下文本身，而是来源于 Kotori 内部的其它组件。通过 `ctx.provide()` 可将指定对象注册到当前上下文实例中，并通过 `ctx.get()` 获取。

<<< @/demo/modules/my-project/src/modules-context.tsx#c1

无论是对象字面量还是实例对象，都可以作为上下文实例的提供者。请注意，此处所有对象均是直接引用并未进行深拷贝。

## 注入与混合

使用 `ctx.inject()` 注入指定的已注册到当前上下文实例中的对象，注入后即可在上下文中通过注册名称直接获取到注入的实例，而无需再通过 `ctx.get()` 获取。

<<< @/demo/modules/my-project/src/modules-context.tsx#c2

除了注入外，当只期望目标对象的部分属性或方法被装饰到上下文实例中时，可使用 `ctx.mixin()`。

<<< @/demo/modules/my-project/src/modules-context.tsx#c3

相比注入，混合更加颗粒化同时减去不必要的属性访问。无论是注入还是混合，都并非直接对对象进行复制或建立新引用，其通过代理控制对象的每个属性或方法的操作，以便解决在混合后，原对象中 this 指向等问题。

对于上面的演示代码，还可以进一步做一些对开发者友好的工作，凭借 TypeScript 中声明合并的特性，为开发者提供良好的代码补全提示。

<<< @/demo/modules/my-project/src/modules-context.tsx#c4

## 继承

此外，通过代理得以实现父子级上下文的概念。如，Kotori 直接给与每个模块的执行主体的上下文实例均为独一无二，它是 Kotori 内部中根上下文实例的子级上下文实例，此外也有部分上下文实例是孙级上下文实例或更深。当访问上下文中的属性或方法时，若当前上下文实例中不存在，则会沿着继承链向上查找，直到根上下文为止，这点与 JavaScript 中原型链的查找方式类似，但原理不同。使用 `ctx.extends()` 继承当前上下文。

<<< @/demo/modules/my-project/src/modules-context.tsx#c5

可见，上下文继承后具有相对隔离性，对于子级上下文来说，只能访问自己父级上下文中注册的对象（即便是在自己被继承后注册的），而不能访问非自己父级上下文和其它子级上下文中注册的对象。而父级上下文也只能往上获取，无法往下获取自己子级上下文单独注册的对象。

<<< @/demo/modules/my-project/src/modules-context.tsx#c6

在继承时，可传入两个可选参数用于标记新的子级上下文实例，第一个参数类型为对象，作用效果类似于将对象注册后并将对象上所有属性执行 `ctx.mixin()`，但原理并不同，可用作传入一些子级上下文必要的元数据信息。第二个参数类型为字符串，为该子级上下文实例设置唯一标识符。对于根上下文实例而言，其标识符为 `undefined`，对于未设置标识符的子级上下文实例，其标识符为 `'sub'`。

<<< @/demo/modules/my-project/src/modules-context.tsx#c7

通过 `ctx.root` 属性可获取当前上下文的根上下文实例，无论是子级上下文 `ctxChild1`、`ctxChild2`，还是继承了 `ctxChild1` 的孙级上下文 `ctxChild3`，其根上下文实例均指向 `ctx`，而根上下午实例的 `ctx.root` 指向自身。

## 事件系统

以上内容均由最初的 `Context` 类定义，通过类原生的继承方式和 `ctx.inject()`、`ctx.mixin()` 等方法对 `Context` 进行装饰或扩展。而在 `Context` 类内部，它本身就已为自己注册并注入了两个实例对象，其一便是事件系统，这也是在第二章中介绍事件系统时说道「事件订阅者模式与事件系统共同构成了 Kotori 的基础」的原由，只不过 `Context` 类本身并未使用事件系统功能，且仅直接定义了 `ready` 与 `dispose` 事件，两者被作为整个程序生命周期的重要一环，其余事件由另一实例对象（见下文）或 Kotori 核心类定义。

## 插件系统

其二便是插件系统，它定义了 `ready_module` 与 `dispose_module` 事件。在上一节说过「在真正学习到上下文之前，可暂且默认插件等同于模块」，而现在你将会对「插件」有更深的认知。

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
```

<<< @/demo/modules/my-project/src/modules-context-1.tsx#c

`ctx.load()` 支持四种参数形式，最常用的是直接传入执行主体函数（`ModuleInstanceFunction`），此外也可以通过传入执行主体类（`ModuleInstanceClass`），亦或你想为子插件传入配置或注册依赖等也可使用导出对象形式（`ModuleExport`）：

<<< @/demo/modules/my-project/src/modules-context-2.tsx#c

导出对象形式与模块入口文件的导出是一致的。在 Kotori 内部，由加载器自动加载所有的模块入口文件进行预处理，然后转接给此处的 `ctx.load()` 进行调用执行主体。不同的是，此处可以定义 `name` 属性用于标记插件的名称，这将作用于该插件的上下文实例的 `ctx.identity` 中，而模块中的 `ctx.identity` 由加载器通过 `package.json` 中的包名自动获取。即便是子插件，它的上下文实例与配置数据也是完全独立，区别在于模块（由加载器加载）的上下文实例继承自 Kotori 内部中的根上下文实例，而子插件的上下文实例继承于当前模块的上下文实例，以此类推。入口文件中导出的 `config` 是一个配置检测者，加载器会调用它来验证 `kotori.toml` 中相应的实际配置数据是否符合要求，符合则将替换 `config` 为实际数据再传入 `ctx.load()` 作后续处理，在模块中执行 `ctx.load()`，其配置数据拥有确定性（指由开发者保证，与 Kotori 无关），因此要求此处直接传入配置数据。

<<< @/demo/kotori.toml#p1

<<< @/demo/modules/my-project/src/modules-context-3.tsx#c

子插件与当前模块的上下文实例完全独立，具有隔离性，由此可通过这一点做一些需要隔离的操作：

<<< @/demo/modules/my-project/src/modules-context-4.tsx#c

上述代码加载了一个依赖 `database` 服务的子插件，便可在其内部进行调用数据库操作，而在外层的模块中，并未依赖因此无法使用 `ctx.database` 属性。

当然你也可以指定多个函数主体，这将会验证上一节所讲的执行主体的识别顺序，因此这只会执行其中一个：

<<< @/demo/modules/my-project/src/modules-context-5.tsx#c

此外，也可以外层调用 CommonJS 规范的 `require()` 或 ESModule 规范的 `import()` 方法，两个方法将会返回动态导入文件的导出对象，区别在于前者是同步执行后者为异步执行，这将间接实现动态导入并加载外部 TypeScript/JavaScript 文件的插件。

<<< @/demo/modules/my-project/src/modules-context-6.tsx#c

> [!WARN]
> 请慎重并正确使用该操作，绝对不可直接导入 `.ts` 或 `.js` 后缀的路径

因 Kotori 运行模式不同，直接导入带后缀的路径并不可取。在开发模式中，Kotori **v1.5.0** 及以上版本通过 [tsx](https://github.com/privatenumber/tsx) 运行，同时支持 TS/JS 文件，在 **v1.5.0** 以下版本通过 [ts-node](https://github.com/TypeStrong/ts-node) 运行，仅支持 TS 文件；在生产模式中，通过 Node.js 运行，仅支持 JS 文件。因此，为使你的模块更加坚固，考虑并适配不同情况是必要的。在上述代码中，通过上下文实例获取到当前运行模式以返回不同的文件扩展名动态导入，但这并不完全可靠和优雅。

<<< @/demo/modules/my-project/src/modules-context-7.tsx

在这一版中，通过改变文件目录结构并利用入口文件特性，以直接减少代码中多余的判断逻辑，并且通过 `node:path` 模块将输入路径处理成绝对路径。此外，在使用 `import()` 时进行异步处理与错误捕获，而非使用 `await` 关键字进行同步操作。对于两种方式，优缺点请自行甄别与选择使用，但值得一提的是，Kotori 加载器（`@kotori-bbot/loader`）在实现自动加载目录下所有有效 npm 模块时，为杜绝异步操作的传染性，因而选择 `require()` 实现。
