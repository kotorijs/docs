import type { Context } from 'kotori-bot'

export function main(ctx: Context) {
  // #region s
  // 设置缓存
  ctx.cache.set('session', { userId: 123 })

  // 获取缓存
  ctx.cache.get('session')

  // 使用容器
  ctx.cache.getContainer()
  // #endregion s
}
