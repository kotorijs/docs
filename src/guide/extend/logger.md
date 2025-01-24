# 日志打印

Kotori 提供了强大日志系统，由 [`@kotori-bot/logger`](https://www.npmjs.com/package/@kotori-bot/logger) 库提供后经由 [`@kotori-bot/loader`](https://www.npmjs.com/package/@kotori-bot/loader) 传递给 `kotori-bot` 重新导出。支持多级别日志输出、链式调用的标签系统、丰富的数据类型展示以及多种日志传输器。

## 初始化与配置

Logger 支持多种 transport 类型和配置选项。可以使用单一 transport，或组合多个 transport 来满足不同的日志需求：

<<< @/demo/modules/my-project/src/extend-logger.tsx#l1

### 传输器

传输器负责将日志输出到不同的位置，默认提供了以下传输器：

- **ConsoleTransport**: 输出到控制台
- **FileTransport**: 输出到文件，支持日志轮转

相关传输器的配置选项请参考 [接口文档](../../api/)。当然，也可以自定义 Transport，只需要继承 `Transport` 基类并实现相关方法，如输出到浏览器控制台的 `BrowserTransport`。

> [!NOTE]
> 对于 `ConsoleTransport`，当处于浏览器环境时使用 `console.log()` 和 `console.error()` 输出日志，当处于 Node.js 环境时则使用 `process.stdout.write()` 和 `process.stderr.write()` 输出日志。

### 日志输出级别

> TRACE < DEBUG < INFO < WARN < ERROR < FATAL < SILENT

```ts
export declare enum LoggerLevel {
    TRACE = 10,
    DEBUG = 20,
    RECORD = 25,
    INFO = 30,
    WARN = 40,
    ERROR = 50,
    FATAL = 60,
    SILENT = 70
}
```

## 基础使用

<<< @/demo/modules/my-project/src/extend-logger.tsx#l2

## 标签系统

`logger.label()` 返回基于当前实例的新 `logger` 实例 意味着支持链式调用，可以将多个标签组合在一起，并在输出时打印出来。

<<< @/demo/modules/my-project/src/extend-logger.tsx#l4

## 继承

`logger.label()` 本身即是对 `logger.extend()` 的封装

<<< @/demo/modules/my-project/src/extend-logger.tsx#l5

## 其它使用方式

### 在上下文中直接使用

通过 `ctx.logger`：

<<< @/demo/modules/my-project/src/extend-logger.tsx#l6

推荐，因为这全权由 Kotori 进行控制和管理，同时还能追踪不同模块上下文打印的日志。

### 直接使用

`Logger` 构造函数本身也是一个不完全的 `logger` 实例，可以直接使用：

<<< @/demo/modules/my-project/src/extend-logger.tsx#l7

> [!CAUTION]
> 完全不推荐，`Logger` 本身只支持 `LoggerLevel.INFO` 及以上级别的日志输出，传输器仅支持 `ConsoleTransport`，且不可更改配置、不可继承、不可增加标签。
