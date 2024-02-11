// .vitepress/config.ts
import { defineConfig } from "file:///C:/data/kotori-docs/node_modules/.pnpm/vitepress@1.0.0-rc.42_@algolia+client-search@4.22.1_search-insights@2.13.0/node_modules/vitepress/dist/node/index.js";

// .vitepress/config/navbar.ts
var navbar_default = [
  { text: "Home", link: "/" },
  { text: "Guide", link: "/guide/introduce" },
  { text: "Modules", link: "/modules/" },
  { text: "Develop", link: "/develop/nav" },
  { text: "Api", link: "/api/" }
];

// .vitepress/config/sidebar.ts
var sidebar_default = {
  "/guide/": [
    {
      text: "\u4F7F\u7528\u6307\u5357",
      children: ["/guide/introduce", "/guide/start", "/guide/modules", "/guide/config", "/guide/usage"]
    }
  ],
  "/develop/": [
    {
      text: "\u5F00\u53D1\u6307\u5357",
      children: [
        "/develop/nav",
        {
          text: "\u5FEB\u901F\u5165\u95E8",
          collapsible: true,
          children: ["/develop/start/environment", "/develop/start/setup", "/develop/start/publish"]
        },
        {
          text: "\u57FA\u7840\u8BBE\u65BD",
          collapsible: true,
          children: [
            "/develop/base/events",
            "/develop/base/command",
            "/develop/base/middleware",
            "/develop/base/regexp",
            "/develop/base/schedule"
          ]
        },
        {
          text: "\u6A21\u5757\u5316",
          collapsible: true,
          children: [
            "/develop/modules/plugin",
            "/develop/modules/context",
            "/develop/modules/schema",
            "/develop/modules/lifecycle",
            "/develop/modules/service"
          ]
        },
        {
          text: "\u9002\u914D\u5668",
          collapsible: true,
          children: [
            "/develop/adapter/elements",
            "/develop/adapter/api",
            "/develop/adapter/adapter",
            "/develop/adapter/database",
            "/develop/adapter/custom"
          ]
        },
        {
          text: "\u6269\u5C55\u529F\u80FD",
          collapsible: true,
          children: [
            "/develop/extend/filter",
            "/develop/extend/internal",
            "/develop/extend/database",
            "/develop/extend/i18n",
            "/develop/extend/logger",
            "/develop/extend/tools"
          ]
        }
      ]
    }
  ]
};

// .vitepress/config.ts
var config_default = defineConfig({
  srcDir: "src",
  title: "Kotori Docs",
  description: "ChatBot Framework Base For NodeJS And TypeScript",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: navbar_default,
    sidebar: sidebar_default,
    socialLinks: [{ icon: "github", link: "https://github.com/kotorijs/kotori" }]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbmF2YmFyLnRzIiwgIi52aXRlcHJlc3MvY29uZmlnL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkYXRhXFxcXGtvdG9yaS1kb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGRhdGFcXFxca290b3JpLWRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2RhdGEva290b3JpLWRvY3MvLnZpdGVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuL2NvbmZpZy9uYXZiYXInO1xuaW1wb3J0IHNpZGViYXIgZnJvbSAnLi9jb25maWcvc2lkZWJhcic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNyY0RpcjogJ3NyYycsXG4gIHRpdGxlOiAnS290b3JpIERvY3MnLFxuICBkZXNjcmlwdGlvbjogJ0NoYXRCb3QgRnJhbWV3b3JrIEJhc2UgRm9yIE5vZGVKUyBBbmQgVHlwZVNjcmlwdCcsXG4gIGhlYWQ6IFtbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2Zhdmljb24uaWNvJyB9XV0sXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgbmF2OiBuYXZiYXIsXG4gICAgc2lkZWJhcjogc2lkZWJhcixcbiAgICBzb2NpYWxMaW5rczogW3sgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20va290b3JpanMva290b3JpJyB9XVxuICB9XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZGF0YVxcXFxrb3RvcmktZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZGF0YVxcXFxrb3RvcmktZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxuYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2RhdGEva290b3JpLWRvY3MvLnZpdGVwcmVzcy9jb25maWcvbmF2YmFyLnRzXCI7ZXhwb3J0IGRlZmF1bHQgW1xuICB7IHRleHQ6ICdIb21lJywgbGluazogJy8nIH0sXG4gIHsgdGV4dDogJ0d1aWRlJywgbGluazogJy9ndWlkZS9pbnRyb2R1Y2UnIH0sXG4gIHsgdGV4dDogJ01vZHVsZXMnLCBsaW5rOiAnL21vZHVsZXMvJyB9LFxuICB7IHRleHQ6ICdEZXZlbG9wJywgbGluazogJy9kZXZlbG9wL25hdicgfSxcbiAgeyB0ZXh0OiAnQXBpJywgbGluazogJy9hcGkvJyB9LFxuXTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZGF0YVxcXFxrb3RvcmktZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZGF0YVxcXFxrb3RvcmktZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9kYXRhL2tvdG9yaS1kb2NzLy52aXRlcHJlc3MvY29uZmlnL3NpZGViYXIudHNcIjtleHBvcnQgZGVmYXVsdCB7XG4gICcvZ3VpZGUvJzogW1xuICAgIHtcbiAgICAgIHRleHQ6ICdcdTRGN0ZcdTc1MjhcdTYzMDdcdTUzNTcnLFxuICAgICAgY2hpbGRyZW46IFsnL2d1aWRlL2ludHJvZHVjZScsICcvZ3VpZGUvc3RhcnQnLCAnL2d1aWRlL21vZHVsZXMnLCAnL2d1aWRlL2NvbmZpZycsICcvZ3VpZGUvdXNhZ2UnXSxcbiAgICB9LFxuICBdLFxuICAnL2RldmVsb3AvJzogW1xuICAgIHtcbiAgICAgIHRleHQ6ICdcdTVGMDBcdTUzRDFcdTYzMDdcdTUzNTcnLFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgJy9kZXZlbG9wL25hdicsXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4JyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogWycvZGV2ZWxvcC9zdGFydC9lbnZpcm9ubWVudCcsICcvZGV2ZWxvcC9zdGFydC9zZXR1cCcsICcvZGV2ZWxvcC9zdGFydC9wdWJsaXNoJ10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU1N0ZBXHU3ODQwXHU4QkJFXHU2NUJEJyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgJy9kZXZlbG9wL2Jhc2UvZXZlbnRzJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9iYXNlL2NvbW1hbmQnLFxuICAgICAgICAgICAgJy9kZXZlbG9wL2Jhc2UvbWlkZGxld2FyZScsXG4gICAgICAgICAgICAnL2RldmVsb3AvYmFzZS9yZWdleHAnLFxuICAgICAgICAgICAgJy9kZXZlbG9wL2Jhc2Uvc2NoZWR1bGUnLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU2QTIxXHU1NzU3XHU1MzE2JyxcbiAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgJy9kZXZlbG9wL21vZHVsZXMvcGx1Z2luJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9tb2R1bGVzL2NvbnRleHQnLFxuICAgICAgICAgICAgJy9kZXZlbG9wL21vZHVsZXMvc2NoZW1hJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9tb2R1bGVzL2xpZmVjeWNsZScsXG4gICAgICAgICAgICAnL2RldmVsb3AvbW9kdWxlcy9zZXJ2aWNlJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1OTAwMlx1OTE0RFx1NTY2OCcsXG4gICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICcvZGV2ZWxvcC9hZGFwdGVyL2VsZW1lbnRzJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9hZGFwdGVyL2FwaScsXG4gICAgICAgICAgICAnL2RldmVsb3AvYWRhcHRlci9hZGFwdGVyJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9hZGFwdGVyL2RhdGFiYXNlJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9hZGFwdGVyL2N1c3RvbScsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTYyNjlcdTVDNTVcdTUyOUZcdTgwRkQnLFxuICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAnL2RldmVsb3AvZXh0ZW5kL2ZpbHRlcicsXG4gICAgICAgICAgICAnL2RldmVsb3AvZXh0ZW5kL2ludGVybmFsJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9leHRlbmQvZGF0YWJhc2UnLFxuICAgICAgICAgICAgJy9kZXZlbG9wL2V4dGVuZC9pMThuJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9leHRlbmQvbG9nZ2VyJyxcbiAgICAgICAgICAgICcvZGV2ZWxvcC9leHRlbmQvdG9vbHMnLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUSxTQUFTLG9CQUFvQjs7O0FDQU4sSUFBTyxpQkFBUTtBQUFBLEVBQzlTLEVBQUUsTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUFBLEVBQzFCLEVBQUUsTUFBTSxTQUFTLE1BQU0sbUJBQW1CO0FBQUEsRUFDMUMsRUFBRSxNQUFNLFdBQVcsTUFBTSxZQUFZO0FBQUEsRUFDckMsRUFBRSxNQUFNLFdBQVcsTUFBTSxlQUFlO0FBQUEsRUFDeEMsRUFBRSxNQUFNLE9BQU8sTUFBTSxRQUFRO0FBQy9COzs7QUNObVMsSUFBTyxrQkFBUTtBQUFBLEVBQ2hULFdBQVc7QUFBQSxJQUNUO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsb0JBQW9CLGdCQUFnQixrQkFBa0IsaUJBQWlCLGNBQWM7QUFBQSxJQUNsRztBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWE7QUFBQSxJQUNYO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLFVBQVUsQ0FBQyw4QkFBOEIsd0JBQXdCLHdCQUF3QjtBQUFBLFFBQzNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxVQUNiLFVBQVU7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsVUFBVTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBRjdEQSxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0sZUFBZSxDQUFDLENBQUM7QUFBQSxFQUN0RCxhQUFhO0FBQUEsSUFDWCxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxhQUFhLENBQUMsRUFBRSxNQUFNLFVBQVUsTUFBTSxxQ0FBcUMsQ0FBQztBQUFBLEVBQzlFO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
