# 快速开始

## 安装 Node.js

前往 [Node.js 官网](https://nodejs.org) 根据系统版本选择对应的安装方式，确保 Node.js 版本 >= 17.9.0。输入以下命令确认安装成功：

```bash
node -v
npm -v
```

## 下载 Kotori

### 一键安装脚本

该内容待更新....
### **使用 Git**

```bash
git clone https://github.com/kotori/kotori.git
```

## 使用 pnpm 安装依赖

Kotori 基于 pnpm 的 Monorepo 进行开发，因此需要先安装 pnpm：

```bash
npm install pnpm -g
```

进入到 Kotori 根目录并使用 pnpm 安装所有依赖：

```bash
cd ./kotori-bot-master
pnpm install
```

## 配置 kotori.yml

使用文本编辑器打开位于 Kotori 根目录的 `kotori.yml`，当前你还无需对该文件配置进行必要的改动。

```yaml
global:
  lang: zh_CN
  command-prefix: /
  dirs:
    - ./node_modules/
    - ./node_modules/@kotori-bot/

adapter:
  cmd-test:
    extends: cmd
    master: 2333
    nickname: Kotarou
    age: 18
    sex: male
    self-id: 720

plugin:
  console:
    test: 1
```

> 关于 kotori.yml 的详细介绍请参考 [配置详解](./config)

## 运行 Kotori

- 生产模式运行：

```bash
pnpm start
```

- 开发模式运行：

```bash
pnpm dev
```
