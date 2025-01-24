import { join } from 'node:path'
import type { Context } from 'kotori-bot'

export function main(ctx: Context) {
  ctx.i18n.use(join(__dirname, '../locales'))
}
