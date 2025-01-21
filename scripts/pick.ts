import { modulePackageSchema } from '@kotori-bot/loader'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import type { DataDetail, DataDetails, NpmRequester } from '../src/components/types'

interface TimelineData {
  latest: string
  data: {
    [timestamp: string]: {
      [packageName: string]:
        | { type: 'add'; version: string }
        | { type: 'update'; version: string; oldVersion: string }
        | { type: 'delete' }
    }
  }
}

const BASE_DEPS = [
  '@kotori-bot/kotori-plugin-access',
  '@kotori-bot/kotori-plugin-adapter-cmd',
  '@kotori-bot/kotori-plugin-adapter-sandbox',
  // '@kotori-bot/kotori-plugin-adapter-onebot',
  // '@kotori-bot/kotori-plugin-adapter-qq',
  '@kotori-bot/kotori-plugin-alias',
  '@kotori-bot/kotori-plugin-core',
  '@kotori-bot/kotori-plugin-filter',
  '@kotori-bot/kotori-plugin-helper',
  '@kotori-bot/kotori-plugin-status',
  '@kotori-bot/kotori-plugin-webui',
  'kotori-plugin-requester',
  'kotori-bot'
]

const NPM_REGISTRY = 'https://registry.npmjs.org/'
const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DETAILS_FILE = resolve(__dirname, '../src/public/assets/data_details.json')
const DEPS_FILE = resolve(__dirname, '../src/public/assets/deps.json')
const TIMELINE_FILE = resolve(__dirname, '../src/public/assets/timeline.json')

async function main() {
  console.time('Search completed in')
  const record = { failed: 0, success: 0 }
  const dataList: DataDetail[] = []

  const previousData = new Map<string, DataDetail>()
  let timeline: TimelineData = { latest: '', data: {} }

  if (existsSync(DATA_DETAILS_FILE)) {
    for (const pkg of JSON.parse(readFileSync(DATA_DETAILS_FILE, 'utf-8')).list) previousData.set(pkg.name, pkg)
  }
  if (existsSync(TIMELINE_FILE)) {
    timeline = JSON.parse(readFileSync(TIMELINE_FILE, 'utf-8'))
  }

  const searchUrl = `${NPM_REGISTRY}-/v1/search?text=keywords:kotori-plugin&size=250`
  const packages = Array.from(
    (await (await fetch(searchUrl)).json()).objects
      .filter((obj) => {
        const r = modulePackageSchema.parseSafe({
          ...obj.package,
          main: '',
          author: '',
          peerDependencies: { 'kotori-bot': '' }
        })
        if (r.value) return true
        console.log(`Invalid ${obj.package.name}: ${r.error.message}`)
        return false
      })
      .map((obj) => obj.package.name)
  ) as string[]

  await Promise.all(
    packages.map(async (packageName) => {
      try {
        const res: NpmRequester = await fetch(`${NPM_REGISTRY}${packageName}`).then((r) => r.json())

        if (!('dist-tags' in res) || !('latest' in res['dist-tags']) || !(res['dist-tags'].latest in res.versions)) {
          console.log(`Get ${packageName} failed: no latest version or package not exist`)
          record.failed++
          return
        }

        const latestVersion = res['dist-tags'].latest
        // biome-ignore lint:
        const latestData = res.versions[latestVersion] as any

        const category: DataDetail['category'] = []
        if (packageName.startsWith('@kotori-bot/')) category.push('official')
        category.push(packageName.includes('adapter-') ? 'adapter' : 'plugin')

        dataList.push({
          name: packageName,
          description: latestData.description || '',
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
          repository: latestData.repository?.url || '',
          keywords: (res.keywords ?? []).filter((el) => !['kotori', 'chatbot', 'kotori-plugin'].includes(el)),
          readme: res.readme
        })

        console.info(`Get ${packageName} success:`, latestVersion)
        record.success++
      } catch (err) {
        console.error(`Get ${packageName} failed:`, err)
        record.failed++
      }
    })
  )

  const currentTimestamp = new Date().toLocaleString()
  const changes: TimelineData['data'][string] = {}

  for (const pkg of dataList) {
    const previous = previousData.get(pkg.name)
    if (!previous) {
      changes[pkg.name] = { type: 'add', version: pkg.version }
    } else if (previous.version !== pkg.version) {
      changes[pkg.name] = {
        type: 'update',
        version: pkg.version,
        oldVersion: previous.version
      }
    }
    previousData.delete(pkg.name)
  }

  for (const [name] of previousData) {
    changes[name] = { type: 'delete' }
  }

  if (Object.keys(changes).length > 0) {
    timeline.data[currentTimestamp] = changes
    timeline.latest = currentTimestamp
  }

  const dataDetails: DataDetails = {
    meta: {
      registry: NPM_REGISTRY,
      time: new Date().getTime(),
      total: dataList.length
    },
    list: dataList.sort((a, b) => b.time.modified - a.time.modified)
  }

  const kotoriBotLatest = (await (await fetch(`${NPM_REGISTRY}kotori-bot`)).json())['dist-tags'].latest
  const deps: Record<string, string> = { 'kotori-bot': `^${kotoriBotLatest}` }

  for (const dep of BASE_DEPS) {
    const result = dataDetails.list.find((val) => val.name === dep)
    if (result) deps[dep] = `^${result.version}`
  }

  writeFileSync(DATA_DETAILS_FILE, JSON.stringify(dataDetails, null, 2))
  writeFileSync(TIMELINE_FILE, JSON.stringify(timeline, null, 2))
  writeFileSync(DEPS_FILE, JSON.stringify(deps, null, 2))

  console.timeEnd('Search completed in')
  console.log(`Get ${record.success} success${record.failed > 0 ? `, ${record.failed} failed` : ''}`)
}

main().catch(console.error)
