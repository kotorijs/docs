/** File structures
 * src
 * * index.ts
 * * plugin
 * * * index.ts
 */

import type { Context } from 'kotori-bot'
import { resolve } from 'node:path'

export function main(ctx: Context) {
  ctx.load(require(resolve('./plugin')))
  // Async version which better handled
  import(resolve('./plugin'))
    .then((plugin) => ctx.load(plugin))
    .catch((err) => ctx.logger.error('Error in dynamic import plugin!', err))
}
