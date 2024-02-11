import { defineConfig } from 'vitepress';
import navbar from './config/navbar';
import sidebar from './config/sidebar';

export default defineConfig({
  srcDir: 'src',
  title: 'Kotori',
  description: 'ChatBot Framework Base For NodeJS And TypeScript',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-NES42R3BKE' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-NES42R3BKE');`
    ]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/kotorijs/kotori' }],
    footer: {
      copyright: 'MIT Licensed | Copyright © 2023 - 2024 Hotaru'
    },
    editLink: {
      pattern: 'https://github.com/kotorijs/docs/edit/master/src/:path',
      text: '在 Github 上编辑此页面'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航'
    },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  },
  lastUpdated: true
});
