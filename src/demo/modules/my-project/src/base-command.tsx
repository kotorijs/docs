import { MessageScope, type Context, UserAccess } from 'kotori-bot'

export function main(ctx: Context) {
  // #region c1
  ctx.on('on_message', (session) => {
    if (!session.message.startsWith('/')) return
    const command = session.message.slice(1)

    if (command === 'echo') {
      const content = command.slice(5)
      session.send(content ? content : '输入内容为空')
    } else if (command === 'time') {
      session.send(`现在的时间是 ${new Date().getTime()}`)
    } else {
      session.send('未知的指令')
    }
  })
  // #endregion c1

  // #region c2
  ctx.command('echo <...content>').action((data) => data.args.join(' '))

  ctx.command('time').action(() => {
    const time = new Date().getTime()
    return time.toString()
  })
  // #endregion c2

  // #region c3
  ctx.command('bar')
  ctx.command('car <arg1> <arg2>')
  ctx.command('dar <arg1> [arg2] [arg3=value]')
  ctx.command('ear [arg1:number=1] [...args:string] - 指令描述')
  // #endregion c3

  // #region c4
  ctx
    .command('bar')
    .option('S', 'speaker - 这是选项的描述')
    .option('G', 'global:boolean - 这是一个布尔类型的选项')
    .option('T', 'time:number - 这是一个数字类型的选项')
  // #endregion c4

  // #region c5
  ctx.command('bar <...args>').action((data, session) => {
    ctx.logger.info(data.args) // 输出参数值数组
    ctx.logger.info(data.options) // 输出选项值对象
    session.send('这是一条消息')
  })
  // #endregion c5

  // #region c6
  ctx.command('at').action((_, session) => {
    session.send(
      <seg>
        你好，
        <mention userId={session.userId} />
        ，你的名字是 {session.sender.nickname}
      </seg>
    )
  })
  // #endregion c6

  // #region c7
  ctx
    .command('test')
    .scope(MessageScope.PRIVATE)
    .action(() => '这是一条仅私聊可用的消息')

  ctx
    .command('hello')
    .scope(MessageScope.GROUP)
    .action((_, session) => {
      session.send('这是一条仅群聊可用的消息')
    })
  // #endregion c7

  // #region c8
  ctx
    .command('original')
    .alias('o') // 别名可以是单个字符串
    .alias(['ori', 'org']) // 也可以是字符串数组
    .action(() => '这是原版指令')
  // #endregion c8

  // #region c9
  ctx
    .command('op')
    .access(UserAccess.ADMIN)
    .action(() => '这是一条特殊指令')
  // #endregion c9

  // #region c10
  ctx.command('bar').help('这里是指令的帮助信息')
  // #endregion c10

  // #region c11
  ctx.command('concat <str1> <str2>').action(({ args: [str1, str2] }) => str1 + str2)

  ctx.command('render').action(() => (
    <format template="template.content">
      <text>这是模板内容</text>
    </format>
  ))

  ctx.command('fetch').action(async () => {
    const res = await ctx.http.get('https://api.example.com')
    return (
      <format template="template.content">
        <text>{String(res)}</text>
      </format>
    )
  })
  // #endregion c11

  // #region c12
  /* 错误示例不要抄 */
  ctx.command('black <ways> - manger.descr.black.query').action(({ args }) => {
    switch (args[0]) {
      case 'query':
        return '查询黑名单成功'
      case 'add':
        return '添加黑名单成功'
      case 'remove':
        return '移除黑名单成功'
      default:
        return `无效的参数 ${args[0]}`
    }
  })
  // #endregion c12

  // #region c13
  ctx.command('cmd sub1').action(() => '操作1')
  ctx.command('cmd sub2').action(() => '操作2')

  // 甚至可以支持嵌套子指令...
  ctx.command('cmd sub3 sub1').action(() => '操作3的操作1')
  ctx.command('cmd sub3 sub2').action(() => '操作3的第二个操作')

  // 多个不同子指令间可设置不同的权限、作用域等，互不影响
  ctx
    .command('cmd sub4 group')
    .action(() => '这个子指令仅群聊可用')
    .scope(MessageScope.GROUP)

  ctx
    .command('cmd sub4 manger')
    .action(() => '这个子指令仅管理员可用')
    .access(UserAccess.MANGER)

  ctx
    .command('cmd sub4 ADMIN_private')
    .action(() => '这个子指令仅最高管理员且在私聊下可用')
    .access(UserAccess.ADMIN)
    .scope(MessageScope.PRIVATE)
  // #endregion c13

  // #region c14
  ctx.command('list query - 查询列表').action(() => {
    /* ... */
  })

  ctx
    .command('list add <target> - 从列表中添加指定目标')
    .action(() => {
      /* ... */
    })
    .access(UserAccess.MANGER)

  ctx
    .command('list remove <target> - 从列表中删除指定目标')
    .action(() => {
      /* ... */
    })
    .access(UserAccess.MANGER)
  // #endregion c14

  // #region c15
  ctx.command('himeki').action((_, session) => {
    session.format('名字：%name%\n身高：%height%cm\n口头禅：%msg%', {
      name: 'Ichinose Himeki',
      height: 153,
      msg: '最喜欢你了，欧尼酱'
    })
    // 等同于：
    session.format('名字：{0}\n身高：{1}cm\n口头禅：{2}', ['Ichinose Himeki', 153, '最喜欢你了，欧尼酱'])
    // 最终输出：名字：Ichinose Himeki\n年龄：153\n口头禅：最喜欢你了，欧尼酱
  })
  // #endregion c15

  // #region c16
  ctx.command('tamaki').action(() => {
    ;<format template="名字：{0}\n身高：{1}cm\n口头禅：{2}">
      <text>Tamaki Sakura</text>
      <text>160</text>
      <text>兔巴尼！</text>
    </format>
  })
  // #endregion c16

  // #region c18
  ctx.command('question').action(async (_, session) => {
    await session.quick('这里有一个问题想问你...')
    const likeme = await session.confirm({
      message: '你喜欢我吗?',
      sure: '喜欢'
    })
    if (!likeme) return '伤透了我的心'
    const ago = Number(await session.prompt('喜欢我多久了?'))
    if (Number.isNaN(ago) || ago < 0) return '这可不是一个有效的Number啊！'
    await session.quick(ago >= 0 && ago <= 1 ? '什么嘛...原来才刚刚开始喜欢啊' : `居然喜欢了 ${ago} 这么久啊！`)
    return '谢谢你的喜欢哦~'
  })
  // #endregion c18

  // #region c19
  ctx.command('hitokoto').action(async (_, session) => {
    const res = await ctx.http.get('https://api.hotaru.icu/api/hitokoto/v2/')

    if (
      !res ||
      typeof res !== 'object' ||
      !('data' in res) ||
      !res.data ||
      typeof res.data !== 'object' ||
      !('hitokoto' in res.data) ||
      !res.data.hitokoto ||
      typeof res.data.hitokoto !== 'string' ||
      !('from' in res.data) ||
      !res.data.from ||
      typeof res.data.from !== 'string'
    ) {
      throw session.error('res_error', { error: new Error('res.data 格式错误') })
    }

    return (
      <format template="今日一言: {0}{1}">
        <text>{res.data.hitokoto}</text>
        <seg>{res.data.from ? `——${res.data.from}` : ''}</seg>
      </format>
    )
  })
  // #endregion c19
}

// #region c17
// 告诉 Kotori 自动加载国际化文件
export const lang = [__dirname, '../locales']

export default function (ctx: Context) {
  ctx.command('himeki').action((_, session) => {
    // 使用 session.send()：
    const hitokoto = session.i18n.locale('test.msg.himeki.hitokoto')
    const msg = session.format(session.i18n.locale('test.msg.himeki'), ['Ichinose Himeki', 153, hitokoto])
    session.send(msg)
    // 使用 session.quick()：
    session.quick(['test.msg.himeki', ['Ichinose Himeki', 153, 'test.msg.himeki.hitokoto']])
    // 直接返回：
    return ['test.msg.himeki', ['Ichinose Himeki', 153, 'test.msg.himeki.hitokoto']]
  })
}
// #endregion c17
