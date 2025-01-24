# 模块发布

当开发完毕模块后，可以将它发布至社区，一个 Kotori 模块一般会同时发布到如下三个平台：

- [npmjs.org](https://npmjs.org)
- [Kotori 模块中心](../../modules/)
- 开源社区：[GitHub](https://github.com)

优先级（重要程度）：npm > 模块中心 > 开源社区。每一个公开的 Kotori 模块都应发布至 npm 并作为模块的主要获取途径。Kotori 使用 BCU 协议，该协议要求 Kotori 的所有模块及其二次开发项目也必须使用 BCU 协议且开源，因此发布到开源社区是必要的，开源行为本身也是一种无私奉献、共享知识和回馈社区的体现。

## 构建产物

「构建产物」在 JavaScript 生态中指将源码（Kotori 模块开发中一般为 TypeScript 文件）进行处理以适用于生产环境中（处理过程一般有 TypeScript 转为 JavaScript、向下兼容语法、压缩代码等）。JavaScript 生态中构建工具非常多，你可以选择喜欢的构建工具并自习配置，当然如果你对此并不了解也可以使用 Kotori 默认的构建方式（通过 TypeScript 自带的 tsc 程序），在你的模块根目录中输入以下指令：

```bash
pnpm build
```

一般地，你将会发现在模块根目录出现了一个 `lib` 文件夹，这在上一节已有提到，它是构建产物的输出目录，有必要的话可在 `tsconfig.json` 文件中更改：

<<< @/demo/modules/my-project/tsconfig.json

> 关于 `tsconfig.json` 的更多内容：[TypeScript Documentation](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html)

## 文件忽略

对于模块发布主要分为发布构建产物（publish）与推送源码（push），两种情况下需要发布的文件内容会有些许不同，因此便引入了「文件忽略」。

### .npmignore

用于指定在发布构建产物时忽略的文件与文件夹，在模块根目录创建一个 `.npmignore` 文件：

```text
node_modules
src
test

tsconfig.json
!README.md
```

实际上在发布构建产物时只需要附带少数文件即可，而 `.npmignore` 采用的是黑名单机制显得很繁琐，因此 Kotori 模块的默认模板中并未使用该方式，也并不推荐。

### package.files

在上一节的 `package.json` 示例中会发现有一个以字符串数组为值的 `files` 配置项，其用于指定在使用 `publish` 时需要附带的文件与文件夹。

<<< @/demo/modules/my-project/package.json{12-17}

`files` 配置项优先级高于 `.npmignore`，其直接写在 `package.json` 中显得十分简洁也会减少整个模块目录的文件冗余。

### .gitignore

不同于前两者，`.gitignore` 用于指定在使用 Git 进行版本控制时需要忽略的文件，语法与 `.npmignore` 类似，同样位于模块根目录：

<<< @/demo/.gitignore

## 发布构建产物

使用工作区开发时，需确保当前为待发布模块根目录，而非工作区根目录。首先检查 npm 源是否为 `http://registry.npmjs.org`：

```bash
npm config get registry
# If not:
# npm config set registry=http://registry.npmjs.org
```

前往 [npmjs.org](https://npmjs.org) 注册账号，然后根据提示在浏览器内登录：

```bash
npm login
```

当一切就绪时：

```bash
npm publish
```

当没有任何意外问题时，访问 npm 个人页即可查看刚才发布的插件： [kotori-plugin-my-project](https://www.npmjs.com/package/kotori-plugin-my-project)。

## 发布源码

使用 Git 前务必先配置好你的账号、邮箱和与 GitHub 通信的 ssh，可参考 [手把手教你配置 git 和 git 仓库](https://www.cnblogs.com/techflow/p/13703721.html)。使用工作区开发时，可选择发布整个工作区也可仅发布单个模块，切换到相应目录即可。首先在 [GitHub New](https://github.com) 页面创建一个远程仓库，接着在本地仓库中关联到该远程仓库：

```bash
git remote add origin git@github.com:kotorijs/kotori-plugin-my-project
```

提交并推送至远程仓库

```bash
git add .
git commit -m 'feat: create a project'
git push origin master
```

当然，你也可以为本次提交添加一个 tag：

```bash
git tag v1.0.0
git push --tags
```

## 收录至模块市场

模块市场是 Kotori 官方维护的模块仓库，目前通过自动化流程从 npm 上查找所有符合条件的包，只要你的包符合规范并发布到 npm，将会在半小时内自动同步到模块市场。

## 放在最后

- 对于项目的版本号应遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)。
- 有必要使用一些用于提高代码质量的格式化工具：[ESLint](https://eslint.org/)、[Prettier](https://prettier.io/)。
- Git 提交信息应遵循 [Angular 规范](https://zj-git-guide.readthedocs.io/zh-cn/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)
