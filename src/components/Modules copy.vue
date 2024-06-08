<script setup lang="ts">
import { ref } from 'vue';
import { DataDetail, DataDetails } from './types';

const CategoryReflect = {
  adapter: '适配器',
  plugin: '插件',
  official: '官方'
};

function handleUrlQuery(input: string) {
  return input.split('#').length > 1 ? input.split('#')[1] : '';
}

async function getModulesData() {
  const { meta, list } = (await (await fetch('/assets/data_details.json')).json()) as DataDetails;

  metaInfo.value = meta;
  data.value = targetPkgName.value ? list.find((element) => element.name === targetPkgName.value) : list;
  isLoading.value = false;
}

const isLoading = ref(true);
const targetPkgName = ref(handleUrlQuery(location.href));
const data = ref<DataDetail | DataDetail[] | undefined>();
const metaInfo = ref<DataDetails['meta'] | undefined>();

setInterval(() => {
  const value = handleUrlQuery(location.href);
  if (targetPkgName.value === value) return;
  targetPkgName.value = value;
  getModulesData();
}, 500);

getModulesData();
</script>

<template>
  <div v-if="isLoading" align="center">加载数据中...</div>
  <div v-else>
    <div v-if="data">
      <div v-if="Array.isArray(data)">
        <h2>Kotori | 模块中心</h2>
        <div>收录插件总数：{{ data.length }}</div>
        <span v-for="data in data" :key="data.name">
          <a :href="`/modules/#${data.name}`"
            ><h2>{{ data.name }}</h2></a
          >
          <span>{{ data.description }}</span>
          <br />
          <span>v{{ data.version }} {{ data.author.name }}</span>
        </span>
      </div>
      <div v-else>
        <h2>{{ data.name }}</h2>
        <span>{{ data.description }}</span>
        <br />
        <li>类别：{{ data.category.map((el) => CategoryReflect[el]).join('、') }}</li>
        <li>作者：{{ data.author.name }}</li>
        <li v-if="data.keywords.length > 0">{{ data.keywords.join('、') }}</li>
        <h3>版本信息</h3>
        <li>最新版本：v{{ data.version }}</li>
        <li>创建时间：{{ new Date(data.time.created).toLocaleString() }}</li>
        <li>更新时间：{{ new Date(data.time.modified).toLocaleString() }}</li>
        <h3>文件信息</h3>
        <li v-if="data.dist.dependencies">依赖数：{{ data.dist.dependencies }}</li>
        <li>文件数：{{ data.dist.fileCount }}</li>
        <li>大小：{{ (data.dist.unpackedSize / 1024).toFixed(2) }} KB</li>
        <h3>下载：</h3>
        <li>
          <a :href="`https://www.npmjs.com/package/${data.name}`" target="_blank">npm</a>
        </li>
        <li v-if="data.repository">
          <a :href="`https://github.com/${data.repository}`" target="_blank">源码：Github</a>
        </li>
        <li>
          <a :href="data.dist.tarball" target="_blank">直接下载</a>
        </li>
        <br />
        <!-- here need markdown render -->
        <!-- <span v-if="data.readme">{{ data.readme }}</span> -->
      </div>
    </div>
    <div v-else align="center">未找到需要的模块 {{ targetPkgName }}</div>
  </div>
</template>
