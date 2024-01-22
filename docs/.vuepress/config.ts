import { defineUserConfig, defaultTheme } from 'vuepress';
import sidebar from './config/sidebar';
import navbar from './config/navbar';

export default defineUserConfig({
  title: 'Kotori Doc',
  description: 'ChatBot Framework Base For NodeJS And TypeScript',
  theme: defaultTheme({
    logo: '/assets/kotori.png',
    navbar: navbar,
    sidebar: sidebar,
    repo: 'kotorijs/docs',
    repoLabel: 'Github',
    docsDir: 'docs',
    docsBranch: 'master',
  }),
});
