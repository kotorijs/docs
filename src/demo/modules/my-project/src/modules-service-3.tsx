import type { Context } from 'kotori-bot'

// #region s
export const inject = ['database']

export function main(ctx: Context) {
  // 基础操作
  ctx.db.get('users', []) // 设置默认值
  ctx.db.put('count', 1)
  ctx.db.del('temp')

  // 批量操作
  ctx.db.batch([
    { type: 'put', key: 'user:1', value: { name: 'kotori' } },
    { type: 'del', key: 'user:2' }
  ])

  // 获取多个值
  ctx.db.getMany(['user:1', 'user:2'])
}
// #endregion s
