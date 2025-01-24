# 装饰器

装饰器（Decorators）往往在许多经典 OOP 编程语言中都有所体现。Kotori 的装饰器式模块设计参考了某些企业级后端框架。它在功能上与前面文档演示中所一直用的导出式等价，这仅仅是一种风格的选择问题，尽管目前确实更推荐使用装饰器式。

## 获取装饰器对象

通过 kotori 导出的 `plugins()` 方法获取，其接收一个字符串数组或带有 `name` 属性的对象，两者实质一样，目的均在于获取模块名字作为模块上下文的标识符：

<<< @/demo/modules/my-project/src/modules-decorators.tsx#d1

## 基础装饰器

基础装饰器用于定义插件的核心特性，包括服务注入和配置模式：

<<< @/demo/modules/my-project/src/modules-decorators.tsx#d2

`KotoriPlugin<C>` 接收一个可选的泛型参数，表示插件的配置数据类型，配合 `Tsu.infer<S>` 使用更为优雅。

### @plugin.import

- 将类标记为 Kotori 插件
- 必须继承 `KotoriPlugin` 类

### @plugin.inject

- 声明插件依赖的服务
- 注入的服务可通过 `this.ctx` 访问

### @plugin.schema

- 定义插件配置的数据结构
- 使用 `Tsu` 验证器进行类型检查

## 事件处理

事件装饰器用于处理各种系统事件：

<<< @/demo/modules/my-project/src/modules-decorators.tsx#d3

### @plugin.on

支持的事件类型包括：

- `ready`: 插件就绪
- `message`: 收到消息
- `error`: 发生错误
- 更多事件类型...

## 命令处理

命令装饰器用于创建和处理用户命令：

<<< @/demo/modules/my-project/src/modules-decorators.tsx#d4

### @plugin.command

命令配置选项：

- `template`: 命令模板，定义参数格式
- `access`: 访问权限级别
- `options`: 命令选项定义
- 更多配置...

## 中间件和其他功能

其他实用装饰器：

<<< @/demo/modules/my-project/src/modules-decorators.tsx#d5

### @plugin.midware

- 定义处理中间件
- 可设置优先级
- 支持异步处理

### @plugin.regexp

- 基于正则表达式的消息处理
- 自动提取匹配组

### @plugin.task

- 创建定时任务
- 使用 cron 表达式定义执行时间

> [!TIP]
> 装饰器的执行顺序是确定的：
>
> 1. @plugin.import
> 2. @plugin.inject 和 @plugin.schema
> 3. 其他装饰器（按声明顺序）

## 建议与习惯

1. 模块类的导出并非必要（因为通过装饰器外部已经可以获取到类对象），仅仅在于可以让 IDE 的未使用提示闭嘴
2. 继承 `KotoriPlugin` 类并非必要，仅仅在于它会手动设置上下文与配置数据便于获取，但建议最好写上
3. 使用 `@plugin.inject` 或 `@plugin.schema` 时，其属性必须为静态属性，因为装饰器无法获取实例属性
4. 成员修饰符与名字不影响均布影响效果，但建议按照约定来
5. 一个成员方法中需要使用 `this.ctx` 或 `this.config` 时，建议将其声明为实例属性，否则声明为静态属性
