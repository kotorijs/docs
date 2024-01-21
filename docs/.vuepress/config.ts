import { defineUserConfig, defaultTheme } from 'vuepress';
import sidebar from './sidebar';
import navbar from './navbar';
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'Kotori Doc',
  description: 'ChatBot Framework Base For TypeScript And NodeJS',
  theme: defaultTheme({
    logo: '/kotori.png',
    navbar: navbar,
    sidebar: sidebar,
    repo: 'kotorijs/kotori',
    repoLabel: 'Github',
    docsDir: 'docs',
    docsBranch: 'docs',
  }),
});
