// @ts-nocheck
// #region p
import { type Context, Tsu } from 'kotori-bot'

/*
export const lang = [__dirname, '../locales']

export const config = Tsu.Object({ ... })

export const inject = ['database'];
*/

export class Main {
  public static lang = [__dirname, '../locales']

  public static config = Tsu.Object({
    /* ... */
  })

  public static inject = ['database']

  public constructor(
    private ctx: Context,
    private cfg: Tsu.infer<typeof Main.config>
  ) {
    /* ... */
  }
}
// #endregion p
