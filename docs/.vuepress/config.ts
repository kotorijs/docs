import { defineUserConfig } from '@vuepress/cli';
import { getDirname, path } from '@vuepress/utils';
import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { searchPlugin } from '@vuepress/plugin-search'
import sidebar from './config/sidebar';
import navbar from './config/navbar';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: '/',
  bundler: viteBundler(),
  title: 'Kotori Docs',
  description: 'ChatBot Framework Base For NodeJS And TypeScript',
  theme: defaultTheme({
    docsRepo: 'https://github.com/kotorijs/docs',
    docsBranch: 'master',
    logo: '/assets/kotori.png',
    navbar: navbar,
    sidebar: sidebar,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    notFound: ['这里什么都没有', '我们怎么到这来了？', '这是一个 404 页面', '看起来我们进入了错误的链接'],
    backToHome: '返回首页',
    openInNewWindow: '在新窗口打开',
    toggleColorMode: '切换颜色模式',
    toggleSidebar: '切换侧边栏',
  }),
  plugins: [
    /*  docsearchPlugin({
      appId: '34YFD9IUQ2',
      apiKey: '9a9058b8655746634e01071411c366b8',
      indexName: 'vuepress',
      searchParameters: {
        facetFilters: ['tags:v2'],
      },
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }), */
    googleAnalyticsPlugin({
        id: 'G-NES42R3BKE',
      }),
      searchPlugin({
        locales: {
          '/': {
        placeholder: '搜索',
          }
        }
      }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    shikiPlugin({
      langs: ['bash', 'diff', 'json', 'md', 'ts', 'vue'],
      theme: 'dark-plus',
    }),
  ],
});
