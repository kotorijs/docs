import { ConsoleTransport, type Context, FileTransport, Logger, LoggerLevel } from 'kotori-bot'

// #region l1
new Logger({
  level: LoggerLevel.TRACE, // 设置日志级别
  label: ['App'], // 默认标签
  transports: new ConsoleTransport() // 设置传输器：输出到控制台
})

new Logger({
  level: LoggerLevel.INFO,
  transports: [
    new ConsoleTransport(),
    new FileTransport({
      dir: 'logs' // 设置日志文件目录
    })
  ]
})

const logger = new Logger({
  level: LoggerLevel.DEBUG,
  transports: new ConsoleTransport({
    useColor: true, // 开启颜色输出
    template: '{time} [{level}] {labels} - {message}' // 设置日志格式
  })
})
// #endregion l1

// #region l1
logger.info('kotori version:', 'v1.0.0')
logger.debug('config loaded:', { port: 3000, env: 'dev' })
logger.warn('deprecated api used:', '/v1/users')
logger.error('failed to connect:', { host: 'db.example.com', port: 5432 })
logger.trace('entering function:', 'getUserProfile', { id: 123 })
logger.fatal('system panic:', new Error('Out of memory'))
// #endregion l1

// #region l2
logger.label('HTTP').info('GET /api/users - 200 OK')
logger.label('Auth').warn('Invalid token received')

logger.label('Database').label('Query').error('Connection failed:', { code: 'ETIMEDOUT' })

logger.label('System').label('Memory').label('Heap').warn('High memory usage:', '85%')

logger.info('base type:', 'string', 233, null, undefined, true, false, 2.71828184)
logger.fatal('normal object (json):', { value: 1, content: 'content', extends: { value: 2 } }, [
  1,
  null,
  { value: false },
  'string'
])
// biome-ignore lint:
const obj: any = {}
obj.value = obj
logger.error('loop object:', obj)
logger.warn('javascript special type:', Symbol(233), BigInt('1234567891011121314151617181920'))
logger.debug('javascript object:', Math, globalThis)
logger.trace('javascript constructor:', Object, Function, String, Number, Boolean, Set, Map, Symbol, Error, Date)
logger.label('label1').info(
  'javascript object instance',
  new Map([
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5]
  ]),
  new Set([1, 3, 3, 4, 5, 6, 7, 7, 8]),
  new Proxy({}, {}),
  new Error('a error'),
  new Date()
)

// #endregion l2

// #region l3

function a() {}
class A {}
const b = () => {}
logger
  .label('label father')
  .label('label child')
  .warn('function and class', a, A, b, () => {}, new A())
// #endregion l3

// #region l4
try {
  throw new Error('Something went wrong')
} catch (err) {
  logger.error('Caught error:', err)
}

console.time('operation')
// ... some operations
console.timeEnd('operation')
logger.info('Operation completed in:', 'operation')
// #endregion l4

// #region l5
const chainLogger = logger
  .extends({ label: ['API'] })
  .extends({ level: LoggerLevel.DEBUG })
  .extends({
    transports: new FileTransport({ dir: 'api-logs' })
  })
chainLogger.info('API started')
// #endregion l5

// #region l6
export function main(ctx: Context) {
  ctx.logger.info('Hello, world!')
}
// #endregion l6

// #region l7
Logger.error('global error')
Logger.fatal('global fatal error')
Logger.warn('global warning')
Logger.info('global info')
// #endregion l7
