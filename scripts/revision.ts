import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import type { DataDetail, DataDetails, ModulesData, NpmRequester } from '../src/components/types'

const BASE_DEPS = [
  '@kotori-bot/kotori-plugin-access',
  '@kotori-bot/kotori-plugin-adapter-cmd',
  '@kotori-bot/kotori-plugin-adapter-sandbox',
  '@kotori-bot/kotori-plugin-alias',
  '@kotori-bot/kotori-plugin-core',
  '@kotori-bot/kotori-plugin-filter',
  '@kotori-bot/kotori-plugin-helper',
  '@kotori-bot/kotori-plugin-status',
  '@kotori-bot/kotori-plugin-webui',
  'kotori-bot'
]

const DATA_SET_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/public/data.json')
const DATA_DETAILS_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/public/assets/data_details.json')
const DEPS_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/public/assets/deps.json')

const RECORD = {
  failed: 0,
  success: 0
}

let DATA_META: DataDetails['meta'] | undefined
const DATA_LIST: DataDetail[] = []

function getNpmData(registry: string, item: ModulesData['list'][number]) {
  const { name, description } = item

  return fetch(`${registry}${name}`)
    .then((res) => res.json())
    .then((res: NpmRequester) => {
      if (!('dist-tags' in res) || !('latest' in res['dist-tags']) || !(res['dist-tags'].latest in res.versions)) {
        console.log(`Get ${name} failed: no latest version or package not exist`)
        RECORD.failed += 1
        return
      }

      const latestVersion = res['dist-tags'].latest
      const latestData = res.versions[latestVersion]

      const category: DataDetail['category'] = []
      if (name.startsWith('@kotori-bot/')) category.push('official')
      category.push(name.includes('adapter-') ? 'adapter' : 'plugin')

      DATA_LIST.push({
        name,
        description,
        category,
        version: latestVersion,
        author: {
          name: res.maintainers[0].name === 'biyuehu' ? 'Arimura Sena' : res.maintainers[0].name,
          email: res.maintainers[0].email
        },
        time: {
          created: new Date(res.time.created).getTime(),
          modified: new Date(res.time.modified).getTime()
        },
        dist: {
          dependencies: Object.keys(latestData.dependencies ?? {}).length,
          fileCount: latestData.dist.fileCount,
          unpackedSize: latestData.dist.unpackedSize,
          tarball: latestData.dist.tarball
        },
        repository: item.repository,
        keywords: (res.keywords ?? []).filter((el) => !['kotori', 'chatbot', 'kotori-plugin'].includes(el)),
        readme: res.readme
      })

      console.info(`Get ${name} success:`, latestVersion)
      RECORD.success += 1
    })
    .catch((err: unknown) => {
      console.error(`Get ${name} failed:`, err)
      RECORD.failed += 1
    })
}

let KotoriBotLatest: string
;(async () => {
  console.time()
  const { meta, list }: ModulesData = JSON.parse(readFileSync(DATA_SET_FILE, 'utf-8'))
  DATA_META = { registry: meta.registry, time: new Date().getTime(), total: Number.NaN }

  const requests = list.map((item) => getNpmData(meta.registry, item))
  await Promise.all(requests)
  KotoriBotLatest = (await (await fetch('https://registry.npmjs.org/kotori-bot')).json())['dist-tags'].latest
})()
  .catch(console.error)
  .finally(() => {
    if (DATA_META) DATA_META.total = DATA_LIST.length
    const DATA_DETAILS = { meta: DATA_META, list: DATA_LIST.sort((a, b) => b.time.modified - a.time.modified) }
    writeFileSync(DATA_DETAILS_FILE, JSON.stringify(DATA_DETAILS, null, 2))

    console.timeEnd()
    console.log(`Get ${RECORD.success} success${RECORD.failed > 0 ? `, ${RECORD.failed} failed` : ''}`)
    const deps: Record<string, string> = { 'kotori-bot': `^${KotoriBotLatest}` }
    for (const dep of BASE_DEPS) {
      const result = DATA_DETAILS.list.find((val) => val.name === dep)
      if (result) deps[dep] = `^${result.version}`
    }
    writeFileSync(DEPS_FILE, JSON.stringify(deps, null, 2))
  })
