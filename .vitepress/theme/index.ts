// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import CustomHome from './components/CustomHome.vue';
import type { Theme } from 'vitepress';
// import './custom.scss'

const theme: Theme= {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('CustomHome', CustomHome);
  }
};

export default theme;
