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

此外，通过代理得以实现父子上下文的概念。如，Kotori 直接给与每个模块的执行主体的上下文均为独一无二，它是 Kotori 内部中根上下文的子上下文，此外也有部分上下文是子上下文的子上下文。当访问上下文中的属性或方法时，若当前上下文实例中不存在，则会沿着继承链向上查找，直到根上下文为止，这点与 JavaScript 中原型链的查找方式类似，但原理不同。

## Kotori 中的上下文
