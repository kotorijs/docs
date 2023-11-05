# 快速开始

## 安装 Node.js
Node.js官网： [https://nodejs.org](https://nodejs.org)
根据系统版本选择对应的安装方式即可，请确保 Node.js 版本>=**18.0**。

安装完毕后输入以下命令，如若没有报错则表示安装成功。

```bash
node -v
npm -v
```

## 下载 Kotori

### **使用 Git**

    ```bash
    git clone https://github.com/BIYUEHU/kotori-bot.git
    ```

### **手动下载**
转到 Release 页面，选择最新的 tag 下载。

下载完成后解压即可。

## 使用 pnpm 安装依赖

由于 Kotori 项目基于 pnpm 的 **monorepo** 进行开发，因此需要先安装 pnpm。

```bash
npm install pnpm -g
```

进入到 Kotori 的根目录并使用 pnpm 安装相关依赖

```bash
cd ./kotori-bot-master
pnpm install
```

## 配置 kotori.yml
使用文本编辑器打开位于 Kotori 根目录的 `kotori.yml` 文件，当前你还无需对该文件配置进行必要的改动。

```yaml
global:
  command-prefix: '/'
  command-alias: ['<at target=${selfId} /> ']
  lang: 'zh_CN'
  dirs: [
   './node_modules/',
   './node_modules/@kotori-bot/'
]

adapter:
  cmd-test:
      extend: 'cmd'
      master: 0720

plugin:

```

> 关于 Kotori.yml 的详细介绍请参考 **[配置详解](./config.yml)**

## 运行 Kotori

-   生产环境运行

```bash
pnpm start
```

-   开发环境运行

```bash
pnpm dev
```