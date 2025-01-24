import type { Context } from 'kotori-bot'

export const inject = ['database']

export function main(ctx: Context) {
  ctx.on('ready', async () => {
    if (!(await ctx.db.get('test'))) return
    await ctx.db.put('test', 'injecting database!')
  })
}
