import type { Context } from 'kotori-bot'

export function main(ctx: Context) {
  // #region m1
  ctx.midware((next, _session) => {
    // 中间件逻辑...
    next() // 通过此中间件
  }, 80) // 优先级为 80
  // #endregion m1

  // #region m2
  const dispose = ctx.midware((next) => {
    // ...
    next()
  })

  // 移除中间件
  dispose()
  // #endregion m2

  // #region m3
  ctx.midware((next, _session) => {
    console.log('收到一条消息')
    next()
  })

  ctx.midware((next, session) => {
    console.log('这是另一个中间件')
    session.quick('这条消息将被发送')
    next()
  })
  // #endregion m3

  // #region m4
  ctx.midware((next, session) => {
    if (session.message !== 'hello') return
    next()
  })

  ctx.command('hello').action(() => 'Hello World!')
  // #endregion m4

  // #region m5
  // 用于存储命令使用记录
  const cmdUsageRecord = new Map()

  ctx.midware((next, session) => {
    // 检查是否为命令消息
    if (!session.message.startsWith('/')) {
      next() // 非命令消息，直接通过
      return
    }

    const cmd = session.message.slice(1) // 获取命令名
    const userId = session.userId // 获取发送者ID

    // 如果此命令无使用记录，则新建一个记录
    if (!cmdUsageRecord.has(cmd)) {
      cmdUsageRecord.set(cmd, new Map())
    }
    const userRecord = cmdUsageRecord.get(cmd)

    // 获取该用户对此命令的最后使用时间
    const lastUsedAt = userRecord.get(userId) || 0

    // 计算距离最后一次使用的时间间隔(单位:秒)
    const constInterval = (Date.now() - lastUsedAt) / 1000

    // 如果间隔小于10秒，则拒绝执行该命令
    if (constInterval < 10) {
      session.quick('命令使用过于频繁，请稍后再试')
      return
    }

    // 更新该用户对此命令的最后使用时间
    userRecord.set(userId, Date.now())

    next() // 通过中间件
  }, 10) // 设置较高优先级
  // #endregion m5
}
