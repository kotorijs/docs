import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from '@vuepress/cli';
import {  defaultTheme } from '@vuepress/theme-default';
import sidebar from './config/sidebar';
import navbar from './config/navbar';

export default defineUserConfig({
  base: '/',
  bundler: viteBundler(),
  title: 'Kotori Doc',
  description: 'ChatBot Framework Base For NodeJS And TypeScript',
  theme: defaultTheme({
    logo: '/assets/kotori.png',
    repo: 'kotorijs/docs',
    navbar: navbar,
    sidebar: sidebar,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',
    openInNewWindow: '在新窗口打开',
    toggleColorMode: '切换颜色模式',
    toggleSidebar: '切换侧边栏',
  }),
});
