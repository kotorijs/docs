export default {
  '/basic/': [
    {
      items: [{ text: '简介', link: '/basic/' }]
    },
    {
      text: '入门',
      items: [
        { text: '快速开始', link: '/basic/start' },
        { text: '模块安装', link: '/basic/modules' },
        { text: '配置详解', link: '/basic/config' }
      ]
    },
    { items: [{ text: '立即使用', link: '/basic/usage' }] }
  ],
  '/guide/': [
    {
      items: [{ text: '前言', link: '/guide/' }]
    },
    {
      text: '准备流程',
      items: [
        { text: '环境搭建', link: '/guide/start/environment' },
        { text: '项目构建', link: '/guide/start/setup' },
        { text: '模块发布', link: '/guide/start/publish' }
      ]
    },
    {
      text: '基础设施',
      items: [
        { text: '事件系统（Events）', link: '/guide/base/events' },
        { text: '指令注册（Command）', link: '/guide/base/command' },
        { text: '中间件（Middleware）', link: '/guide/base/middleware' },
        { text: '正则匹配（RegExp）', link: '/guide/base/regexp' },
        { text: '计划任务（Task）', link: '/guide/base/task' }
      ]
    },
    {
      text: '模块化',
      items: [
        { text: '插件范式（Plugin）', link: '/guide/modules/plugin' },
        { text: '上下文（Context）', link: '/guide/modules/context' }, // merge with lifecycle
        { text: '配置检测（Schema）', link: '/guide/modules/schema' },
        { text: '国际化（i18n）', link: '/guide/modules/i18n' },
        { text: '服务依赖（Service）', link: '/guide/modules/service' },
        { text: '滤器（Filter）', link: '/guide/modules/filter' },
        { text: '装饰器（Decorator）', link: '/guide/modules/decorator' },
        { text: '使用 ReScript 开发', link: '/guide/modules/rescript' }
      ]
    },
    {
      text: '组件化',
      items: [
        { text: '实现元素类（Elements）', link: '/guide/adapter/elements' },
        { text: '实现接口类（Api）', link: '/guide/adapter/api' },
        { text: '实现适配器类（Adapter）', link: '/guide/adapter/adapter' },
        { text: '自定义服务（Service）', link: '/guide/adapter/custom' }
      ]
    },
    {
      text: '扩展功能',
      items: [
        // { text: '滤器', link: '/guide/extend/filter' },
        // { text: '数据库', link: '/guide/extend/database' },
        // { text: '日志打印', link: '/guide/extend/logger' },
        { text: '工具类', link: '/guide/extend/tools' }
      ]
    }
  ],
  '/advanced/': [
    { text: '氟框架', link: '/advanced/' },
    { text: '架构', link: '/advanced/architecture' },
    {
      text: '开发',
      items: [
        { text: '单元测试', link: '/advanced/testing' },
        { text: '作为依赖与二次开发', link: '/advanced/develop' },
        { text: '在浏览器使用', link: '/advanced/browser' }
      ]
    },
    {
      text: '关于',
      items: [
        { text: '历史', link: '/advanced/history' },
        { text: '贡献', link: '/advanced/contributing' },
        { text: '感谢', link: '/advanced/thanks' }
      ]
    }
  ]
}
