import { type Context, MessageScope, type SessionMsg } from 'kotori-bot'

// #region e8-1
declare module 'kotori-bot' {
  interface EventsMapping {
    custom_event1(data: string): void
  }
}
// #endregion e8-1

// #region e10-1

declare module 'kotori-bot' {
  interface EventsMapping {
    custom_event2(arg1: string, arg2: number, arg3: boolean): void
    // biome-ignore lint:
    custom_event3(...args: any[]): void
  }
}
// #endregion e10-1

export function main(ctx: Context) {
  // #region e1
  ctx.on('on_message', (session) => {
    if (session.message !== '你是谁') return
    if (session.type === MessageScope.GROUP) {
      session.api.sendGroupMsg('是 Kotori！', session.groupId)
    } else {
      session.api.sendPrivateMsg('是 Kotori！', session.userId)
    }
  })
  // #endregion e1

  // #region e2
  ctx.on('on_message', (session) => {
    if (session.message !== '你是谁') return
    session.send('是 Kotori！')
  })
  // #endregion e2

  // #region e3
  const handle = (_session: SessionMsg) => {
    ctx.off('on_message', handle)
    // ...
  }

  ctx.on('on_message', handle)
  // #endregion e3

  // #region e4
  ctx.once('on_message', (_session) => {
    // ...
  })
  // #endregion e4

  // #region e5
  ctx.once('on_message', (_session) => {
    // ...
  })

  ctx.once('on_message', (_session) => {
    // ...
  })

  ctx.on('on_message', (session) => {
    if (session.message === '消失吧！') return
    ctx.offAll('on_message')
  })
  // #endregion e5

  // #region e6
  ctx.on('status', (data) => {
    if (data.status !== 'online') return
    const { api, config } = data.adapter
    api.sendPrivateMsg('上线了！', config.master)
  })
  // #endregion e6

  // #region e7
  ctx.on('on_group_increase', (session) => {
    session.send(
      <seg>
        因为遇见了 <mention userId={session.userId} />
        ，我的世界才充满颜色！
      </seg>
    )
  })
  // #endregion e7

  // #region e8-2
  ctx.on('custom_event1', (data) => {
    ctx.logger.debug(data)
  })
  // #endregion e8-2

  // #region e9
  ctx.emit('custom_event1', '这是事件数据')
  ctx.emit('custom_event1', '这里也是事件数据')
  // #endregion e9

  // #region e10-2
  ctx.emit('custom_event2', 'string', 42, true)
  ctx.emit('custom_event3', 'string1', 'string2', 233, 2333, { value: 42 })
  // #endregion e10-2
}
