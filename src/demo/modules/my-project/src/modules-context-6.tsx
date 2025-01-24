// @ts-nocheck
import type { Context } from 'kotori-bot'

// #region c
/** File structures
 * src
 * * index.ts
 * * plugin.ts
 */

export async function main(ctx: Context) {
  // Wrong way of writing
  ctx.load(require('./plugin.js'))
  // or:
  ctx.load(await import('./plugin.ts'))

  // Correct but not perfect writing
  const file = `./plugin.${ctx.options.mode === 'dev' ? '.ts' : '.js'}`
  ctx.load(require(file))
  // or:
  ctx.load(await import(file))
}
// #endregion c
