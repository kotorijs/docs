export default {
  '/guide/': [
    {
      text: '使用指南',
      children: ['/guide/introduce', '/guide/start', '/guide/modules', '/guide/config', '/guide/usage'],
    },
  ],
  '/develop/': [
    {
      text: '开发指南',
      link: '/develop/',
      children: [
        '/develop/nav',
        {
          text: '快速入门',
          children: ['/develop/start/environment', '/develop/start/setup', '/develop/start/publish'],
        },
        {
          text: '基础设施',
          children: [
            '/develop/base/events',
            '/develop/base/command',
            '/develop/base/middleware',
            '/develop/base/regexp',
            '/develop/base/schedule',
          ],
        },
        {
          text: '模块化',
          children: [
            '/develop/modules/plugin',
            '/develop/modules/context',
            '/develop/modules/schema',
            '/develop/modules/lifecycle',
            '/develop/modules/service',
          ],
        },
        {
          text: '适配器',
          children: [
            '/develop/adapter/elements',
            '/develop/adapter/api',
            '/develop/adapter/adapter',
            '/develop/adapter/database',
            '/develop/adapter/custom',
          ],
        },
        {
          text: '扩展功能',
          children: [
            '/develop/extend/filter',
            '/develop/extend/internal',
            '/develop/extend/database',
            '/develop/extend/i18n',
            '/develop/extend/logger',
            '/develop/extend/tools',
          ],
        },
      ],
    },
  ],
};
