// @ts-nocheck
// #region p
import Kotori from 'kotori-bot'
import type { Context } from 'kotori-bot'
import { join } from 'node:path'

Kotori.i18n.use(join(__dirname, '../locales'))

Kotori.on('ready', async () => {
  const db = Kotori.get('database') as Context['db']
  if (!(await db.get('test'))) return
  /* ... */
})

Kotori.midware((next, session) => {
  /* ... */
}, 10)

Kotori.command('ping')

Kotori.regexp(/^\d+$/, (match, session) => {
  /* ... */
})
// #endregion p
