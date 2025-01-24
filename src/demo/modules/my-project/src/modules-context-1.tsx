// @ts-nocheck
import type { Context } from 'kotori-bot'

// #region c
function plugin1(ctx: Context) {
  ctx.logger.debug('plugin1 loaded')
}

export function main(ctx: Context) {
  // output: module(main plugin) loaded
  ctx.on('read_module', (data: EventDataModule) => {
    if (data.instance === main) ctx.logger.debug('module(main plugin) loaded')
    else if (data.instance === plugin1) ctx.logger.debug('plugin1(sub plugin) loaded')
  })
  ctx.load(plugin1) // output: plugin1(sub plugin) loaded
}
// #endregion c
