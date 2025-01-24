import { type Context, Tsu, type ModuleConfig } from 'kotori-bot'

export const config = Tsu.Object({
  value: Tsu.String()
})

export function main(ctx: Context, cfg: Tsu.infer<typeof config>) {
  ctx.logger.debug(ctx.identity, cfg.value) // my-project here is a string
  const subCfg = {
    value: 233
  } satisfies ModuleConfig

  ctx.load({
    name: 'plugin1',
    main: ((subCtx: Context, cfg: typeof subCfg) => {
      subCtx.logger.debug(subCtx.identity, cfg.value) // plugin1 233
    }) as (ctx: Context, cfg: ModuleConfig) => void
  })
}
