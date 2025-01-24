import { Symbols, type Context } from 'kotori-bot'

export function main(ctx: Context) {
  // #region t1
  ctx.task('0 0 * * *', () => {
    // 每天 00:00 执行
    console.log('每天凌晨触发的任务')
  })
  // #endregion t1

  // #region t2
  const dispose = ctx.task('*/30 * * * *', () => {
    console.log('每30分钟执行一次')
  })

  // 移除任务
  dispose()
  // #endregion t2

  // #region t3
  ctx.task(
    {
      cron: '0 8 * * *',
      timeZone: 'Asia/Shanghai',
      start: true
    },
    () => {
      console.log('每天北京时间 8:00 执行')
    }
  )
  // #endregion t3

  // #region t4
  // 每分钟的第30秒执行
  ctx.task('30 * * * * *', async (ctx) => {
    ctx.boardcast()

    await Promise.all(
      Array.from(ctx[Symbols.bot].values()).map((apis) =>
        Array.from(apis.values()).map(async (api) =>
          (await api.getGroupList()).map(({ groupId }) => api.sendGroupMsg('每分钟的第 30 秒执行', groupId))
        )
      )
    )
  })
  // #endregion t4

  // #region t5
  // 工作日的下午3点执行
  ctx.task('0 15 * * 1-5', () => {
    // 其实用外部或者内部的 ctx 都是一样的
    ctx.logger.debug('该下班了！')
  })
  // #endregion t5
}
