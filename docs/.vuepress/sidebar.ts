export default {
  '/guide/': [{
    text: '使用指南',
    children: ['/guide/introduce.html', '/guide/start.html', '/guide/modules.html', '/guide/config.html', '/guide/usage.html'],
  }],
  '/develop/': [{
    text: '开发指南',
    link: '/develop/',
    children: [
      { text: '总览', link: '/develop/nav.html' },
      {
        text: '快速入门',
        children: [
          { text: '环境搭建', link: '/develop/start/environment.html' },
          { text: '项目构建', link: '/develop/start/setup.html' },
          { text: '模块发布', link: '/develop/start/publish.html' },
        ]
      },
      {
        text: '基础设施',
        children: [
          { text: '事件订阅', link: '/develop/base/events.html' },
          { text: '指令注册', link: '/develop/base/command.html' },
          { text: '中间件', link: '/develop/base/middleware.html' },
          { text: '正则匹配', link: '/develop/base/regexp.html' },
          { text: '计划任务', link: '/develop/base/schedule.html' }
        ]
      },
      {
        text: '模块化',
        children: [
          { text: '插件范式', link: '/develop/modules/plugin.html' },
          { text: '上下文', link: '/develop/modules/context.html' },
          { text: '动态检查', link: '/develop/modules/schema.html' },
          { text: '生命周期', link: '/develop/modules/lifecycle.html' },
          { text: '依赖与服务', link: '/develop/modules/service.html' }
        ]
      },
      {
        text: '适配器',
        children: [
          { text: '实现元素类', link: '/develop/adapter/elements.html' },
          { text: '实现接口类', link: '/develop/adapter/api.html' },
          { text: '实现适配器类', link: '/develop/adapter/adapter.html' },
          { text: '数据库服务', link: '/develop/adapter/database.html' },
          { text: '自定义服务', link: '/develop/adapter/custom' }
        ]
      },
      {
        text: '扩展功能',
        children: [
          { text: '滤器', link: '/develop/extend/filter.html' },
          { text: '内部接口', link: '/develop/extend/internal.html' },
          { text: '数据库', link: '/develop/extend/database.html' },
          { text: '国际化', link: '/develop/extend/i18n.html' },
          { text: '日志打印', link: '/develop/extend/logger.html' },
          { text: '工具函数', link: '/develop/extend/tools.html' }
        ]
      }
    ]
  }]
}