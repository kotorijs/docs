import { KotoriPlugin, UserAccess, Tsu, plugins, type SessionMsg } from 'kotori-bot'

// #region d1
// 手动传入模块名字
const plugin2 = plugins({
  name: 'plugin2'
})
// 直接导入 package.json
const plugin3 = plugins(require('../package.json'))
// 直接提供 package.json 所在路径，推荐使用
const plugin = plugins([__dirname, '../'])

// #endregion d1

// #region d2
@plugin.import
export class BasicPlugin extends KotoriPlugin<Tsu.infer<typeof BasicPlugin.schema>> {
  // 注入服务
  @plugin.inject
  public static inject = ['db', 'cache']

  // 配置模式
  @plugin.schema
  public static schema = Tsu.Object({
    maxRetries: Tsu.Number().min(0).max(5).default(3),
    enableDebug: Tsu.Boolean().default(false),
    mode: Tsu.Union(Tsu.Literal('simple'), Tsu.Literal('advanced')).default('simple')
  })

  @plugin.on({ type: 'ready' })
  public async onReady() {
    // 访问上下文对象
    this.ctx.logger.info('Plugin is ready!')
    // 访问配置数据
    this.ctx.logger.info(this.config.maxRetries)
  }
}
// #endregion d2

// #region d3
@plugin.import
export class EventPlugin extends KotoriPlugin {
  // 处理就绪事件
  @plugin.on({ type: 'ready' })
  public async onReady() {
    this.ctx.logger.info('Plugin is ready!')
  }

  // 处理销毁事件
  @plugin.on({ type: 'dispose' })
  public async onDispose() {}

  // 处理错误事件
  @plugin.on({ type: 'error' })
  public async onError(error: Error) {
    this.ctx.logger.error('Error occurred:', error)
  }
}
// #endregion d3

// #region d4
@plugin.import
export class CommandPlugin extends KotoriPlugin {
  // 简单命令
  @plugin.command({
    template: 'greet <name>'
  })
  public async greet({ args }: { args: string[] }) {
    return `Hello, ${args[0]}!`
  }

  // 带选项的复杂命令
  @plugin.command({
    template: 'calc <num1:number> <num2:number>',
    access: UserAccess.ADMIN,
    options: [
      ['m', 'mode:string'],
      ['d', 'decimal:number']
    ]
  })
  public async calc({ args, options }: { args: number[]; options: { mode?: string; decimal?: number } }) {
    const [num1, num2] = args
    const mode = options.mode || 'add'
    const decimal = options.decimal || 2

    let result: number
    switch (mode) {
      case 'add':
        result = num1 + num2
        break
      case 'sub':
        result = num1 - num2
        break
      default:
        result = num1 + num2
    }

    return `Result: ${result.toFixed(decimal)}`
  }
}
// #endregion d4

// #region d5
@plugin.import
export class MiddlewarePlugin extends KotoriPlugin {
  // 优先级中间件
  @plugin.midware({ priority: 10 })
  public async logMiddleware(next: () => Promise<void>, _session: SessionMsg) {
    const start = Date.now()
    await next()
    const time = Date.now() - start
    this.ctx.logger.debug(`Request processed in ${time}ms`)
  }

  // 正则匹配处理
  @plugin.regexp({ match: /^#(\w+)=(.*)$/ })
  public async handleKeyValue(match: RegExpExecArray) {
    const [, key, value] = match
    return `Setting ${key} to ${value}`
  }

  // 定时任务
  @plugin.task({ cron: '0 */30 * * * *' })
  public async scheduledTask() {
    this.ctx.logger.info('Running scheduled task')
  }
}
// #endregion d5

export { plugin2, plugin3 }
