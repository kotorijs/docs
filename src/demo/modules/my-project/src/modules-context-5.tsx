// @ts-nocheck
import type { Context } from 'kotori-bot'

// #region c
export function main(ctx: Context) {
  ctx.load({
    name: 'plugin1',
    main: (subCtx: Context) => {
      subCtx.logger.debug('will not be loaded')
    },
    Main: class {
      constructor(subCtx: Context) {
        subCtx.logger.debug('will not be loaded')
      }
    },
    default: (subCtx: Context) => {
      subCtx.logger.deug('will be loaded')
    }
  })
}
// #endregion c
