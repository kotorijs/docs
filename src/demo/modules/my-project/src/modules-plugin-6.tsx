// @ts-nocheck
// #region p
import { type Context, Tsu } from 'kotori-bot'

export const lang = [__dirname, '../locales']

export const config = Tsu.Object({
  /* ... */
})

export const inject = ['database']

export function main(ctx: Context, cfg: Tsu.infer<typeof config>) {
  /* ... */
}
// #endregion p
