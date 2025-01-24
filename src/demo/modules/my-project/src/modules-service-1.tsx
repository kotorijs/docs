import type { Context } from 'kotori-bot'

// #region s
export const inject = ['database', 'cache']

export function main(ctx: Context) {
  // 通过提前声明注入服务
  ctx.db.get('users')
  ctx.cache.get('session')

  // 动态注入服务
  if (ctx.inject('server', true)) {
    ctx.server.start()
  }
}
// #endregion s
