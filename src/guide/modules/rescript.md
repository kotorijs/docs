# 使用 ReScript 开发

**ReScript** 是一门健壮的类型化语言，可以编译成高效易读的 JavaScript。相比于 TypeScript，ReScript 是 JavaScript 的子集，有着远比 TypeScript 更为严格和安全的类型系统。也是 ocmal 的方言之一，结合了大量函数式编程与现代化编程特性，同时保留了 C 系语言的花括号语法风格，这使你不会像面对其它函数式编程一样对其陌生语法感到茫然，变得极易上手和入门。如果你是一名 Rust 开发者将会对 ReScript 很多地方感到亲切（就像是没有所有权和生命周期的 Rust）。

## 基本使用

Kotori 从 v1.7 开始支持用 ReScript 编写插件，尽管这并非强制性，但如若你对函数式编程感兴趣或者对安全性有要求，那么使用 ReScript 编写 Kotori 插件将是不二之举。

```rescript
let main = (ctx: Kotori.context) => {
   open Kotori.Utils;

   "echo <message> - print string"->ctx.cmd.new->ctx.cmd.action(async ({args: [msg]}, session) => {
	   msg->session.quick
	   ""
   })->ignore
}
```
