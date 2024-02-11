# 立即使用

::: tip
本篇适用于想立即体验基于 Kotori 搭建的 Bot 实际效果、或单纯想使用由官方提供的各平台 Bot 服务的平台用户。
:::

---

## 服务平台

目前共提供 1 个平台、两个 Bot：

### QQ

#### ~~Kanbe Kotori（小鳥一号）~~

#### 小鳥二号

基于 Onebot 标准的 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 项目（[@Kotori-bot/kotori-plugin-adapter-onebot](../modules/#@kotori-bot/kotori-plugin-adapter-onebot)）。相比于官方 QQ 机器人，第三方 QQ 机器人拥有着更健全的基础功能，权限使用上几乎无任何限制，缺点是因某种原因导致 go-cqhttp 等第三方 QQ 机器人项目跑路或归档，稳定性低于官方机器人。

> 立即使用：[Kotori 交流群](https://qm.qq.com/q/Z88lFtJbAk)。

#### 小鳥三号

基于 Tencent 官方 API（[@Kotori-bot/kotori-plugin-adapter-qq](../modules/#@kotori-bot/kotori-plugin-adapter-qq)）。相比于第三方 QQ 机器人，限制较多（不可发送主动消息、URL 需备案等），但稳定性较高，其余功能与「小鳥二号」基本一致。

> 立即使用：[Kotori 交流群](https://qm.qq.com/q/Z88lFtJbAk)。

### Telegram

### Discord

## Bot 申请

除了加入官方群或添加 Bot 账户直接使用以外，也可以申请对应平台的 Bot 接入到你自己的群聊。

> 申请链接：[Github Issues](https://github.com/kotorijs/kotori/issue)

请仔细查看说明并填写信息，一般在 24 小时内处理完毕 issue。

## 功能一览

以下展示并非全部功能。

### [@kotori-bot/kotori-plugin-core](../modules/#@kotori-bot/kotori-plugin-core)

- `/core` 查看实例统计信息
- `/bot` 查看当前 bot 信息与运行状态
- `/bots` 查看所有 bot 信息与运行状态
- `/version` 查看版本信息
- `/about` 帮助信息
- `/update` 检查更新

### [@kotori-bot/kotori-plugin-help](../modules/#@kotori-bot/kotori-plugin-help)

- `/help [command]` 查看指令帮助信息

### [@kotori-bot/kotori-plugin-menu](../modules/#@kotori-bot/kotori-plugin-menu)

`/menu` 查看 BOT 菜单
别名：cd

### [kotori-plugin-random-img](../modules/#kotori-plugin-random-img)

- `/sex [tags]` Pixiv 图片
- `/sexh` HuliImg 图片
- `/bing` 必应每日图
- `/day` 60s 带你看世界
- `/earth` 实时地球
- `/china` 实时中国

### [kotori-plugin-bangumi](../modules/#kotori-plugin-bangumi)

- `/bgm <content> [order：number=1]` 番组计划搜索游戏/动漫
- `/bgmc` 获取番组计划今日放送

```bash
/bgm 素晴日
> 原名：素晴らしき日々～不連続存在～公式ビジュアルアーカイヴ
中文名：素晴之日 不连续的存在 Official Visual Archive
介绍：人気アダルトゲームブランド「ケロQ」から、実に６年ぶりに発売された新作『素晴らしき日々 ～不連続存在～』。その魅力をギュッと閉じ込めたファン必携の一冊。描き下ろしイラスト＆原作を担当したSCA－自（すかぢ）氏の新作書き下ろしテキスト満載でお届け。
标签：素晴らしき日々 设定集 电波 神作 素晴日 公式书 2010 百合 FanBook 悬疑 画集 画集・設定資料集 推理 VFB
详情：https://bgm.tv/subject/8318
[image]
```

### ~~[kotori-plugin-bilibili](../modules/#kotori-plugin-bilibili)~~

- `/bili <bvid>` Bilibili 视频信息查询
- `/bilier <uid>` Bilibili 用户信息查询

### [kotori-plugin-hitokoto](../modules/#kotori-plugin-hitokoto)

- `/hitokotos` 随机语录
- `/hitokoto` 获取一条一言

```bash
/hitokoto
> 如果人们不相信数学简单，那是因为他们没有意识到人生有多复杂。——冯诺依曼
类型：俗语
```

### [kotori-plugin-mediawiki](../modules/#kotori-plugin-mediawiki)

- `/wiki <content> [order]` 搜索 MediaWiki
- `/wikil` 查看 MediaWiki 列表

```bash
/wiki 月社妃
> 标题：月社妃
内容：月社妃（日语：月社（つきやしろ） 妃（きさき））是由ウグイスカグラ所制作的18禁galgame《纸上的魔法使》及其衍生作品的登场角色。是主人公四条琉璃的同胞妹妹。
https://mzh.moegirl.org.cn/.php?curid=384932
来源：萌娘百科
```

### [kotori-plugin-github](../modules/#kotori-plugin-github)

- `/github <repository>` 查询 Github 仓库信息

```bash
/github kotorijs/kotori
> 地址：kotorijs/kotori
描述：Cross platform, decoupled, and modernized ChatBot framework base on NodeJS
语言：TypeScript
所有者：kotorijs
创建时间：
2023-06-14T11:45:16Z
最后更新时间：2023-12-31T15:28:10Z
最后推送时间：2024-01-14T09:48:13Z
开源协议：GNU General Public License v3.0
```

### [kotori-plugin-music](../modules/#kotori-plugin-music)

- `/music <name> [order：number=1]` 网易云点歌
  序号默认为 1，填 0 显示歌曲列表

```bash
/music 夢水の調べ
> 歌曲ID：2077744375
歌曲标题：夢水の調べ
歌曲作者：おはる
歌曲下载：http://music.163.com/song/media/outer/url?id=2077744375.mp3
歌曲封面：[image]
```

### [kotori-plugin-weather](../modules/#kotori-plugin-weather)

- `/weather <area>` 查询城市天气

```bash
/weather 北京
> 城市：北京市
日期：周四
温度：-6～4℃
天气：晴
风度：南风-2级
空气质量：良

日期：周五
温度：-5～0℃
天气：阴
风度：东风-1级
空气质量：良

日期：周六
温度：-8～0℃
天气：阴
风度：东北风-1级
空气质量：良
```
