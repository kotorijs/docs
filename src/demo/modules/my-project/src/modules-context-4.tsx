// @ts-nocheck
import type { Context } from 'kotori-bot'

// #region c
export const inject = []

export function main(ctx: Context) {
  ctx.load({
    name: 'plugin1',
    inject: ['database'],
    main: (subCtx: Context) => {
      /* ctx.database... */
    }
  })
  ctx.logger.debug(ctx.database) // undefined
}
// #endregion c
