# 配置检测

**配置检测(Schema)** 是 Kotori 中的一个重要概念和功能，其相关的所有实现均来源于 [Tsukiko](https://github.com/biyuehu/tsukiko) 库。Kotori 对 Tsukiko 进行了重新导出，因此可直接在 Kotori 中使用。
## Tsukiko 简介

**Tsukiko** 是一个基于 TypeScript 开发的运行时下动态类型检查库，最初作为 kotori 开发中的副产物诞生，其作用与应用场景类似于 io-ts 之类的库，常用于 JSON/YAML/TOML 文件数据格式检验、第三方 HTTP API 数据格式检验、数据库返回数据格式检验（尽管此处推荐直接用更为成熟的 ORM 框架）等。

> 视频介绍与演示：[哔哩哔哩](https://b23.tv/ejhXmIx)

项目名字取自于轻小说《変態王子と笑わない猫。》中的女主角——[筒隠月子（Tsukakushi Tsukiko）](https://mzh.moegirl.org.cn/%E7%AD%92%E9%9A%90%E6%9C%88%E5%AD%90)

## 基本使用

### 类型检验

Tsukiko 中带有多种类型解析器，通过不同的解析器可以实现对未知值的类型校验与处理：

```typescript
import { Tsu } from 'kotori-bot'

const strSchema = Tsu.String()
strSchema.check(233) // false
strSchema.check('Hello,Tsukiko!') // true
```

`schema.check()` 接收一个参数，返回值表示该参数类型是否匹配。此外，与之类似的还有以下多种校验方法：

```typescript
/* ... */

const value = strSchema.parse(raw)
// if passed the value must be a string
// if not passrd: throw TsuError
```

`schema.parse()` 会处理传入值并判断是否符合要求，如若不符合将抛出错误（`TsuError`）并附带详细原因。不过有时并不想直接抛出错误则可以使用 `schema.parseSafe()`：

```typescript
/* ... */

const result = strSchema.parseSafe(raw)
if (result.value) {

	console.log('Passed:', result.data)

} else {
   console.log("Error:", result.error.message)
}
```

该方法会返回一个对象，当 `value` 为 `true` 时，对象上存在 `data` 属性，其值即为处理后的结果，当 `value` 为 `false` 时，对象上存在 `error` 属性，其值即为错误信息。此外，还有一个异步版本 `schema.parseAsync`：

```typescript
/* ... */

strSchema.parseAsync(raw)
   .then((data) => console.log('Passed', data))
   .catch((error) => console.log('Fatal', error))
```

上面有提到，`schema.parse()` 及相关的解析方法，在传入值符合要求时返回的数据会经过一定的处理，其主要体现为默认值处理：

```typescript
const schema = Tsu.Object({
   name: Tsu.String().default('Romi'),
   age: Tsu.Stting().default(16)
}).default({
   name: 'Romi',
   age: 16
})

schema.parse({ name: 'Yuki', age: 17 }) // Passed { name: 'Yuki', age: 17 }
schema.parse({ name: 'Kisaki' }) // Passed { name: 'Kisaki', age: 16 }
schema.parse({}) // Passed { name: 'Romi', age: 16 }
schema.parse([]) // Error
```

在不同的解析器下也有一定的体现，如：

```typescript
const strSchema = Tsu.String()

strSchema(233) // Passed '233'
strSchema(true) // Error
```

`Tsu.String()` 解析器默认允许数字传入（出于兼容性考虑），并会将其处理成字符串返回。

### 类型修饰

最典型的修饰方法为 `schema.default()` 与 `schema.optional()`，前者用于设置默认值，后者用于设置可选类型：

```typescript
const numSchema = Tsu.Number().default(2333)

numSchema.parse() // 2333

const strSchema = Tsu.String().optional()

strSchema.parse(undefined) // Passed
strSchema.parse(null) // Passed
```

同样是出于兼容性考虑，解析器默认会允许 `null`，如若想只允许 `undefined` 作为空值，则可以使用 `schema.empty()`：

```typescript

const strSchema = Tsu.String().optional().empty()

strSchema.parse(undefined) // Passed
strSchema.parse(null) // Error
```

除去以上所有解析器共有方法以外，每个解析器也有自己专门的修饰方法，详情可查看下文。可以看到，在 `schema.optional()` 之后可以继续调用方法，因为包括以上在内的绝大部分修饰方法都会返回当前实例，链式调用便是 Tsukiko 最大特点。不过，同一个修饰方法应当在同一个解析器中仅调用一次，因为不同的修饰方法其执行行为有所不同：

- 开关解析器上的某一内部属性（如 `Tsu.String()` 与 `Tsu.Object()` 上均存在的 `.strict()`），这使得可以在调用方法时传入一个 `Boolean` 值 ，一般地，这些方法的参数会有默认值
- 单向设置解析器上的某一内部属性（如上文的 `schema.optional()`、`schema.empty()`、`schema.default()`），大部分不需要传参，但也有些需要传参
- 多个同级方法间合并解析器上的多个内部属性（如很多解析器上都存在的 `.min()`、`.max()`、`range()`）
### 类型导出

[**JSON Schema**](https://json-schema.org/) 是用于验证 JSON 数据结构的强大工具。在必要时可通过 `schema.schema()` 将任意解析器导出成 JSON Schema。不过在此之前，Tsukiko 提供了额外两个关于 JSON Schema 的新方法：

```typescript
const config = Tsu.Object({
   port: Tsu.Number().port().describe('Server port')
   address: Tsu.String().describe('Server display address')
}).title('Plugin configuration')
```

`schema.`
## 解析器

### 基础类型

### 引用类型

### 标准类型
### 高级类型

## 在 Kotori 中的引用

### 配置文件

### 数据检验

