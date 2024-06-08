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

  metaData.value = meta;
  details.value = targetPkgName.value ? list.find((element) => element.name === targetPkgName.value) : list;
  isLoading.value = false;
}

const isLoading = ref(true);
const targetPkgName = ref(handleUrlQuery(location.href));
const metaData = ref<DataDetails['meta']>();
const details = ref<DataDetail | DataDetail[]>();

setInterval(() => {
  const value = handleUrlQuery(location.href);
  if (targetPkgName.value === value) return;
  targetPkgName.value = value;
  getModulesData();
}, 500);

getModulesData();
</script>
<template>
  <div class="app-container">
    <div v-if="isLoading" class="loading">加载数据中...</div>
    <div v-else class="content">
      <h2 class="title">Kotori | 模块中心</h2>
      <div v-if="details && Array.isArray(details)">
        <h5 class="title">
          收录插件总数：{{ details.length }} <br />
          最后更新时间：{{ new Date(metaData!.time).toLocaleString() }}
        </h5>
        <div class="module-list">
          <div class="module-items">
            <div v-for="data in details" :key="data.name" class="module-item">
              <a :href="`/modules/#${data.name}`" class="module-link">
                <h3>{{ data.name }}</h3>
                <p class="">{{ data.description }}</p>
                <p>v{{ data.version }} {{ data.author.name }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="details">
        <div>
          <h1>{{ details.name }}</h1>
          <p>{{ details.description }}</p>
        </div>
        <div>
          <ul>
            <li><strong>类别：</strong>{{ details.category.map((el) => CategoryReflect[el]).join('、') }}</li>
            <li><strong>作者：</strong>{{ details.author.name }}</li>
            <li v-if="details.keywords.length"><strong>关键词：</strong>{{ details.keywords.join('、') }}</li>
          </ul>
        </div>
        <div>
          <h3>版本信息</h3>
          <ul>
            <li><strong>最新版本：</strong>v{{ details.version }}</li>
            <li><strong>创建时间：</strong>{{ new Date(details.time.created).toLocaleString() }}</li>
            <li><strong>更新时间：</strong>{{ new Date(details.time.modified).toLocaleString() }}</li>
          </ul>
        </div>
        <div v-if="details.dist">
          <h3>文件信息</h3>
          <ul>
            <li v-if="details.dist.dependencies"><strong>依赖数：</strong>{{ details.dist.dependencies }}</li>
            <li><strong>文件数：</strong>{{ details.dist.fileCount }}</li>
            <li><strong>大小：</strong>{{ (details.dist.unpackedSize / 1024).toFixed(2) }} KB</li>
          </ul>
        </div>
        <div class="module-download">
          <h3>下载链接：</h3>
          <ul>
            <li><a :href="`https://www.npmjs.com/package/${details.name}`" target="_blank">npm</a></li>
            <li v-if="details.repository">
              <a :href="`https://github.com/${details.repository}`" target="_blank">源码：Github</a>
            </li>
            <li><a :href="details.dist.tarball" target="_blank">直接下载</a></li>
          </ul>
        </div>
        <!-- 预留的Markdown渲染区域 -->
      </div>
      <div v-else class="not-found">未找到需要的模块 {{ targetPkgName }}</div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 95vw;
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-container li {
  list-style: none;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #47caff;
}

.content {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.module-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.module-items {
  display: contents;
}

.module-item {
  flex: 1 1 250px; /* 基础宽度为250px，允许增长和缩小 */
  max-width: calc(33.333% - 20px); /* 在较大屏幕上，目标是三列布局，减去间隔 */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

@media (max-width: 1200px) {
  .module-item {
    max-width: calc(50% - 20px); /* 在中等屏幕上，改为两列布局 */
  }
}

@media (max-width: 768px) {
  .module-item {
    max-width: 100%; /* 在小屏幕上，改为单列布局 */
  }
}

.module-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.module-link:hover {
  text-decoration: none;
}

.module-details {
  margin-bottom: 20px;
}

.module-download a {
  text-decoration: none;
}

.module-download a:hover {
  text-decoration: underline;
}

.not-found {
  text-align: center;
  color: red;
}
</style>
