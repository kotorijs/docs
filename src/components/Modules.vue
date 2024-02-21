<script setup lang="ts">
import { ref } from 'vue';

const handle = (input: string) => (input.split('#').length > 1 ? input.split('#')[1] : '');
const isloading = ref(true);
const target = ref(handle(location.href));

setInterval(() => {
  const value = handle(location.href);
  if (target.value === value) return;
  target.value = value;
  method();
}, 500);

const res = ref(null) as any;
const res2 = ref(null) as any;

const method = async () => {
  const data = await (await fetch('/data.json')).json();

  if (target.value) {
    const handle = data.filter((element) => element.name === target.value);
    if (handle.length > 0) {
      res.value = handle[0];
      try {
        const handle2 = await (await fetch(`https://registry.npmjs.org/${target.value}`)).json();
        if (handle2.name) res2.value = handle2;
      } catch (e) {
        console.log(e);
      }
    }
    isloading.value = false;
  } else {
    res.value = data;
    isloading.value = false;
  }
};
method();
</script>

<template>
  <div v-if="isloading" align="center">loading...</div>
  <div v-else>
    <div v-if="res && typeof res === 'object'">
      <div v-if="Array.isArray(res)">
        <h2>Kotori | 模块中心</h2>
        <div>收录插件总数：{{ res.length }}</div>
        <div v-for="data in res" :key="data.name">
          <a :href="`/modules/#${data.name}`" target="_blank"
            ><h2>{{ data.name }}</h2></a
          >
          <span>{{ data.description }}</span>
        </div>
      </div>
      <div v-else>
        <h2>{{ res.name }}</h2>
        <span>{{ res.description }}</span>
        <div v-if="res2">
          <h3>元信息</h3>
          <li>
            <strong> 作者：</strong>
            {{ Array.isArray(res2.author) ? res2.author.map((element) => element.name).join(' ') : res2.author.name }}
          </li>
          <li><strong> 协议：</strong>{{ res2.license }}</li>
          <li><strong> 最新版本：</strong>v{{ res2['dist-tags'].latest }}</li>
          <li><strong> 最后更新：</strong>{{ Object.values(res2.time)[Object.keys(res2.time).length - 1] }}</li>
          <h3>下载：</h3>
          <li>
            <a :href="`https://www.npmjs.com/package/${res.name}`" target="_blank">npm</a>
          </li>
          <li v-if="res.github">
            <a :href="`https://github.com/${res.github}`" target="_blank">Github</a>
          </li>
        </div>
        <div v-else>未在 npm 找到该包或访问 npm 失败</div>
      </div>
    </div>
    <div v-else align="center">未找到需要的模块 {{ target }}</div>
  </div>
</template>
