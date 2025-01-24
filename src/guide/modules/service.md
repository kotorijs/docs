# 依赖与服务

**服务（Service）** 是 Kotori 中一种特殊的可复用组件，它们通过依赖注入的方式被模块使用。本节将详细介绍服务的使用方法和最佳实践。

## 服务注入

要使用一个服务，首先需要在模块中声明依赖。有两种方式可以注入服务：

<<< @/demo/modules/my-project/src/modules-service-1.tsx#s

1. **声明式注入**（推荐）：通过导出 `inject` 数组声明模块依赖的服务
2. **动态注入**：使用 `ctx.inject()` 方法在插件实例中注入服务
   - 返回 `boolean` 值表示注入是否成功
   - 可选的 `force` 参数用于强制重新注入（即便服务所占据的属性已存在于当前 `ctx` 中）

## 模块隔离

虽然每个服务在整个 Kotori 实例中是单例存在的，但除了部分特殊服务外（如 `Server`），大部分服务都秉持着数据隔离的原则，即一个模块通过某一服务产生的数据仅有该模块的上下文自己能够访问，且数据间彼此互不影响（这在数据库中保证数据安全尤为重要）。即便是模块中通过 `ctx.plugin()` 注册的子插件，只要上下文标识符不一致，子插件的上下文也无法访问父模块的数据（反之亦然）。

## 服务使用

Kotori 本身已提供了多个基础服务：

- 缓存服务 (Cache)
- 数据库服务 (Database)
- 文件服务 (File)
- 服务器服务 (Server)

其中缓存服务由 [`@kotori-bot/core`](https://www.npmjs.com/package/@kotori-bot/core) 库直接提供，其它三者由 [`@kotori-bot/loader`](https://www.npmjs.com/package/@kotori-bot/loader) 库提供。

提供了类型定义但需要安装相应依赖：

- 浏览器服务 (Browser)

未提供类型定义的第三方服务如：

- RSS 服务（Rss）

### 缓存服务 (Cache)

缓存服务提供了临时数据存储功能，主要用于存储会话数据或需要快速访问的数据。一般地，缓存服务已提前注入到上下文中，因此无需再次声明注入。

<<< @/demo/modules/my-project/src/modules-service-2.tsx#s

主要方法：

- `get(prop)`: 获取缓存值
- `set(prop, value)`: 设置缓存值
- `getContainer()`: 获取缓存容器

### 数据库服务 (Database)

数据库服务基于 LevelDB 提供了持久化存储功能，支持单个和批量操作。

<<< @/demo/modules/my-project/src/modules-service-3.tsx#s

主要方法：

- `get(key, init?)`: 获取值，可提供默认值
- `put(key, value)`: 存储值
- `del(key)`: 删除值
- `batch(operations)`: 批量操作
- `getMany(keys)`: 批量获取值

> [!NOTE]
> 虽然数据库服务的名称是 "database"，但在上下文中使用时应通过 `ctx.db` 访问。

### 文件服务 (File)

文件服务提供了文件系统操作能力，支持多种格式的文件读写，其本身就是对 Node.js 的 `fs` 模块的封装。或许你会疑惑为何不直接通过 Node.js 的文件接口操作文件，原因同样在于数据隔离以及统一化管理数据存储目录，尽管现在确实更加推荐使用 `Database` 服务进行数据存储。

<<< @/demo/modules/my-project/src/modules-service-4.tsx#s

主要方法：

- `getDir()`: 获取模块的数据目录
- `getFile(filename)`: 获取文件完整路径
- `load(filename, type?, init?)`: 加载文件
- `save(filename, data, type?)`: 保存文件
- `create(filename, data?, type?)`: 创建文件

### 服务器服务 (Server)

服务器服务提供了 HTTP 和 WebSocket 服务器功能，基于 Koa.js 封装（其上下文设计理念与 Kotori 类似）。

<<< @/demo/modules/my-project/src/modules-service-5.tsx#s

主要功能：

- HTTP 路由（GET, POST, PUT, PATCH, DELETE）
- WebSocket 支持
- 静态文件服务
- 中间件支持（JSON 解析、URL 编码等）

### 浏览器服务 (Browser)

浏览器服务提供了基于 Puppeteer 的无头浏览器功能，可用于网页抓取、截图等自动化任务。

使用前需要额外安装依赖：

```bash
pnpm install @kotori-bot/browser
```

> [!WARNING]
> 由于用到了 Puppeteer，所以请确保你的系统已安装 Chromium 或 Chrome。

<<< @/demo/modules/my-project/src/modules-service-6.tsx

主要功能：

- 页面导航和操作
- 页面内容提取
- 页面截图
- 网页自动化
- 资源拦截和修改

优化建议：

1. 及时关闭不再使用的页面以释放内存
2. 使用 `dispose` 事件确保浏览器实例被正确关闭
3. 考虑使用页面池来复用页面实例
4. 设置适当的超时和重试策略

### RSS 服务

RSS 服务提供了 RSS/Atom 订阅源的监控和解析功能。

使用前需要额外安装依赖：

```bash
# 该功能正在开发中
```

<<< @/demo/modules/my-project/src/modules-service-7.tsx#s

主要功能：

- 创建和管理 RSS 订阅
- 自动检查订阅更新
- 自定义更新回调
- 订阅状态管理

配置选项：

```typescript
interface RSSConfig {
  url: string;              // 订阅源 URL
  interval?: number;        // 检查间隔（毫秒）
  maxItems?: number;        // 最大条目数
  callback: (items) => void; // 更新回调
}
```

特性：

- 支持 RSS 1.0/2.0 和 Atom 格式
- 自动处理订阅源编码
- 智能的更新检测
- 内置的重试机制

> [!TIP]
> 为避免过多的网络请求，建议：
>
> 1.设置合理的检查间隔（建议至少 15 分钟）
>
> 2.适当限制 `maxItems` 数量
>
> 3.在不需要时暂停或移除订阅
