<script setup lang="ts">
import { ref } from 'vue'

interface Friend {
  name: string
  desc: string
  avatar: string
  link: string
}

const friends = ref<Friend[]>([
  {
    name: 'Romi Blog',
    desc: 'ArimuraSena 的个人网站，基于 Angular & Rust',
    avatar: 'https://hotaru.icu/favicon.ico',
    link: 'https://hotaru.icu'
  },
  {
    name: '火神80的小窝',
    link: 'https://huoshen80.top/',
    avatar: 'https://huoshen80.top/favicon.ico',
    desc: '一位热爱 Coding、MC、原神、galgame 的b站up主'
  },
  {
    name: 'Sena Language',
    link: 'https://l.himeno-sena.com',
    avatar: 'https://l.himeno-sena.com/favicon-7a447ed069013842.ico',
    desc: '基于 Rust 的实验性一等类型&依赖类型编程语言'
  }
])

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="friends-grid">
    <div
      v-for="(friend, index) in friends"
      :key="index"
      class="friend-card"
      @click="openLink(friend.link)"
    >
      <div class="card-header">
        <img class="avatar" :src="friend.avatar" :alt="friend.name" loading="lazy" />
        <div class="name-box">
          <span class="name">{{ friend.name }}</span>
        </div>
      </div>
      <p class="desc">{{ friend.desc }}</p>
    </div>
  </div>
</template>

<style scoped>
.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.friend-card {
  position: relative;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-alt);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid var(--vp-c-bg);
  transition: transform 0.3s ease;
}

.friend-card:hover .avatar {
  transform: rotate(360deg);
}

.name-box {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
  
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>