# 配置检测

**配置检测(Schema)** 是 Kotori 中的一个重要概念和功能,其相关的所有实现均来源于 [Tsukiko](https://github.com/biyuehu/tsukiko) 库。Kotori 对 Tsukiko 进行了重新导出,因此可直接在 Kotori 中使用。

## Tsukiko 简介

Tsukiko 库本身是用于运行时进行动态类型检查的。比如说,当从数据库获取数据、请求 HTTP API、读取本地 JSON 配置文件等,这些数据都是动态的,我们在编写代码时编辑器无法获知其类型信息。因此很多时候只能将它们断言为 `any` 类型,这显然不符合 TypeScript 的初衷。并且在断言为 `any` 后,对未知数据进行无限制的访问很可能会出现一些意料之外的问题(比如将 `undefined` 作为对象进行访问)。

又或者,数据库数据不符合预期、API 服务器出问题无法正常返回、本地配置文件里的配置的某些值错误(比如类型错误、数字不符合要求、字符串不符合预定要求、缺少属性)等情况。因此,Tsukiko 应运而生。

特别地,在读取配置文件时,有时一些配置属性是希望可选的或者在内部有默认值,这些都可以不必在配置文件中定义。在经过 Schema 处理后的数据会传入实际数据中不存在的默认值,从而返回完整配置。同时,通过 Schema 定义后,也可以快速的将 Schema 转换为 TypeScript 类型,以便在编写代码时获得类型提示。

## Parser 解析器

Tsukiko 提供了多种解析器(Parser),用于定义不同类型的数据结构:

- `NumberParser`: 数字解析器
- `StringParser`: 字符串解析器
- `BooleanParser`: 布尔值解析器
- `NullParser`: Null 解析器
- `UndefinedParser`: Undefined 解析器
- `AnyParser`: Any 解析器
- `UnknownParser`: Unknown 解析器
- `NeverParser`: Never 解析器
- `ArrayParser`: 数组解析器
- `TupleParser`: 元组解析器
- `ObjectParser`: 对象解析器
- `LiteralParser`: 字面量解析器
- `IntersectionParser`: 交集解析器
- `UnionParser`: 并集解析器
- `CustomParser`: 自定义解析器

## 示例

以下是一些使用 Tsukiko 定义 Schema 的示例:

```typescript
import Tsu, { tsuFactory } from 'tsukiko';

// 定义一个元组 Schema
const schema = Tsu.Tuple([Tsu.Number()]);
export type Schema = typeof schema.infer;

// 定义一个数组 Schema
const schema2 = Tsu.Array(Tsu.String());
export type Schema2 = typeof schema2.infer;

// 定义一个对象 Schema
const schema3 = Tsu.Object({
  value: Tsu.Number(),
  name: schema2,
  host: Tsu.String().regexp(/http(s)?:\/\/(.*)/),
  port: Tsu.Number().range(1, 65535).int(),
  allowList: Tsu.Array(Tsu.String()),
  listType: Tsu.Union([Tsu.Literal('include'), Tsu.Literal('exclude')])
});
export type Schema3 = typeof schema3.infer;

// 使用交集解析器
const schema4 = Tsu.Intersection([Tsu.Number(), Tsu.Literal(1)]);
export type Schema4 = typeof schema4.infer;

// 组合使用多个解析器
const schema5 = Tsu.Intersection([
  Tsu.Literal('hello world'),
  Tsu.Union([schema, Tsu.Union([Tsu.Number().optional(), schema2])])
]);
export type Schema5 = typeof schema5.infer;

// 使用索引签名定义 Schema
const schema6 = Tsu.Object({}).index(
  Tsu.String().regexp(/[0-9]+\.[0-9]+\.[0-9]+/),
  Tsu.String().regexp(/kotori-plugin-(.*)/)
);
export type Schema6 = typeof schema6.infer;
export const example6: Schema6 = {
  'kotori-plugin-adapter-qq': '1.5.0',
  'kotori-plugin-adapter-wechat': '0.2.0',
  'kotori-plugin-database-sqlite': '2.1.0',
  'kotori-plugin-database-mysql': '3.1.0',
  'kotori-plugin-help': '1.2.0',
  'kotori-plugin-wiki': '1.0.0'
};
```

上述示例展示了如何使用 Tsukiko 定义各种形式的 Schema,包括元组、数组、对象、字面量等,并利用 `infer` 推导出相应的类型。您还可以通过 `tsuFactory` 创建针对不同语言环境的解析器实例。

在 Kotori 中,Schema 主要用于对配置文件、API 响应数据等进行检测和规范化处理,以确保数据符合预期。以下是一些在 Kotori 中使用 Schema 的示例:

```typescript
// 定义 bangumi 日历 API 响应数据的 Schema
const bgmcSchema = Tsu.Array(
  Tsu.Object({
    weekday: Tsu.Object({
      en: Tsu.String(),
      cn: Tsu.String(),
      ja: Tsu.String()
    }),
    items: Tsu.Array(
      Tsu.Object({
        name: Tsu.String(),
        name_cn: Tsu.String(),
        air_date: Tsu.String(),
        images: Tsu.Object({ large: Tsu.String() })
      })
    )
  })
);

ctx.command('bgmc - bangumi.descr.bgmc').action(async (_, session) => {
  const res = bgmcSchema.parse(await http(`calendar`));
  // ... 使用 res 处理 bgmc 命令
});

// 定义 Kotori 全局配置的 Schema
export const config = Tsu.Intersection([
  Tsu.Object({
    port: Tsu.Number().int().range(1, 65535),
    address: Tsu.String()
      .regexp(/^ws(s)?:\/\/([\\w-]+\.)+[\\w-]+(\/[\\w-./?%&=]*)?$/)
      .default('ws://127.0.0.1'),
    retry: Tsu.Number().int().min(1).default(10)
  }),
  Tsu.Union([
    Tsu.Object({ mode: Tsu.Literal('ws') }),
    Tsu.Object({ mode: Tsu.Literal('ws-reverse') })
```
