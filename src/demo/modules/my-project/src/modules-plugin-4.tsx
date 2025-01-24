import { type Context, Tsu } from 'kotori-bot'

// #region p1
export const config = Tsu.Object({
  key1: Tsu.String(),
  key2: Tsu.Number().range(0, 10),
  key3: Tsu.Boolean()
})
// #endregion p1

// #region p2
export function main(ctx: Context, cfg: Tsu.infer<typeof config>) {
  ctx.logger.debug(cfg.key1, cfg)
  // 'value1' { key1: 'value1', key2: 0, key3: true }
}
// #endregion p2
