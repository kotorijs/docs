import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { DataDetail, DataDetails, ModulesData, NpmRequester } from '../src/components/types';

const DATA_SET_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/public/data.json');
const DATA_DETAILS_FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../src/public/assets/data_details.json');

const RECORD = {
  failed: 0,
  success: 0
};

let DATA_META: DataDetails['meta'] | undefined;
const DATA_LIST: DataDetail[] = [];

function getNpmData(registry: string, item: ModulesData['list'][number]) {
  const { name, description } = item;

  return fetch(`${registry}${name}`)
    .then((res) => res.json())
    .then((res: NpmRequester) => {
      if (!('dist-tags' in res) || !('latest' in res['dist-tags']) || !(res['dist-tags'].latest in res.versions)) {
        console.log(`Get ${name} failed: no latest version or package not exist`);
        RECORD.failed += 1;
        return;
      }

      const latestVersion = res['dist-tags'].latest;
      const latestData = res.versions[latestVersion];

      const category: DataDetail['category'] = [];
      if (name.startsWith('@kotori-bot/')) category.push('official');
      category.push(name.includes('adapter-') ? 'adapter' : 'plugin');

      DATA_LIST.push({
        name,
        description,
        category,
        version: latestVersion,
        author: res.maintainers[0],
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
      });

      console.info(`Get ${name} success:`, latestVersion);
      RECORD.success += 1;
    })
    .catch((err: unknown) => {
      console.error(`Get ${name} failed:`, err);
      RECORD.failed += 1;
    });
}

(async () => {
  console.time();
  const { meta, list }: ModulesData = JSON.parse(readFileSync(DATA_SET_FILE, 'utf-8'));
  DATA_META = { registry: meta.registry, time: new Date().getTime(), total: NaN };

  const requests = list.map((item) => getNpmData(meta.registry, item));
  await Promise.all(requests);
})()
  .catch(console.error)
  .finally(() => {
    if (DATA_META) DATA_META.total = DATA_LIST.length;
    const DATA_DETAILS = { meta: DATA_META, list: DATA_LIST.sort((a,b) => b.time.modified - a.time.modified) };
    writeFileSync(DATA_DETAILS_FILE, JSON.stringify(DATA_DETAILS, null, 2));

    console.timeEnd();
    console.log(`Get ${RECORD.success} success${RECORD.failed > 0 ? `, ${RECORD.failed} failed` : ''}`);
  });
