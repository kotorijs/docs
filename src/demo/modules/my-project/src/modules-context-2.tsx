// @ts-nocheck
import type { Context } from 'kotori-bot'

// #region c
interface SubConfig {
  port: number
}

export function main(ctx: Context) {
  ctx.load(
    class {
      public constructor(private subCtx: Context) {}
    }
  )
  ctx.load({
    config: { port: 3000 },
    main: (subCtx: Context, cfg: SubConfig) => {}
  })
}
// #endregion c
