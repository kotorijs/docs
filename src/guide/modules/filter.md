# 过滤器

过滤器是 Kotori 提供的一种强大的上下文筛选机制，可以根据多种条件对消息和事件进行过滤。通过过滤器，你可以精确控制模块的处理范围。

## 基本用法

过滤器通过 `ctx.filter()` 方法使用，接受一个过滤选项对象作为参数，返回新的上下文对象。过滤选项可以是单个条件或条件组：

<<< @/demo/modules/my-project/src/modules-filter.tsx#f1

### 多条件过滤

当需要更复杂的过滤逻辑时，可以使用条件组：

<<< @/demo/modules/my-project/src/modules-filter.tsx#f2

### 条件组类型

- `all_of`: 所有条件都必须匹配
- `any_of`: 任意一个条件匹配即可
- `none_of`: 所有条件都不能匹配

## 过滤条件

> [!NOTE]
> 滤器的过滤选项设计参考了 [某个像素游戏](https://addonwiki.github.io/%E4%B8%93%E8%BE%91%E7%AF%87/%E6%BB%A4%E5%99%A8/index.html) 中的设计。

### 测试项

```typescript
enum FilterTestList {
  PLATFORM = "platform",      // 平台名称
  USER_ID = "userId",        // 用户 ID
  GROUP_ID = "groupId",      // 群组 ID
  OPERATOR_ID = "operatorId", // 操作者 ID
  MESSAGE_ID = "messageId",   // 消息 ID
  SCOPE = "scope",           // 作用域
  ACCESS = "access",         // 访问权限等级
  IDENTITY = "identity",     // 身份标识
  LOCALE_TYPE = "localeType", // 语言类型
  SELF_ID = "selfId"         // 机器人账号
}
```

### 操作符

支持以下比较操作符：

- `==`: 等于
- `!=`: 不等于
- `>`: 大于
- `<`: 小于
- `>=`: 大于等于
- `<=`: 小于等于

## 最佳实践

查看以下示例了解过滤器的正确使用方式：

<<< @/demo/modules/my-project/src/modules-filter.tsx#f3

> [!TIP]
> 过滤器的条件会按声明顺序依次执行，建议将开销较小的条件放在前面，可以提高性能。
