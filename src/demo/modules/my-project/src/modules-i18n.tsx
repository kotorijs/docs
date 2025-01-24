declare const formatFactory: typeof import('kotori-bot').formatFactory
// #region i2
import type { Context } from 'kotori-bot'
import { join } from 'node:path'

export function main(ctx: Context) {
  // 直接注册
  ctx.i18n.use(join(__dirname, '../locales'))
}

// 或使用语法糖（建议）:
export const lang = [__dirname, '../locales']
// #endregion i2

/* --- */
;(ctx: Context) => {
  // #region i1
  const localesData = {
    message: 'Hello, {0}!',
    count: 'There are {0} apples',
    welcome: 'Welcome to use Kotori'
  }

  ctx.i18n.use(localesData, 'en_US')
  // #endregion i1

  // #region i3
  ctx.i18n.locale('message', 'en_US') // "Hello, {0}!"
  ctx.i18n.locale('message', 'zh_CN') // "你好，{0}！"

  // 使用模板字符串函数语法糖
  ctx.i18n.t`message` // "Hello, {0}!"

  // 获取/设置当前语言
  ctx.i18n.get() // 'en_US'
  ctx.i18n.set('zh_CN')
  ctx.i18n.get() // 'zh_CN'
  // #endregion i3

  // #region i4

  // 格式化日期
  ctx.i18n.date(new Date(), 'full') // "Friday, January 24, 2025"
  ctx.i18n.date(new Date(), 'long', 'zh_CN') // "2025年1月24日"

  // 格式化时间
  ctx.i18n.time(new Date(), 'medium') // "7:14:49 AM"
  ctx.i18n.time(new Date(), 'short', 'zh_CN') // "上午7:14"

  // 格式化时段
  ctx.i18n.period(new Date()) // "in the morning"
  ctx.i18n.period(new Date(), undefined, 'zh_CN') // "上午"

  // 格式化数字
  ctx.i18n.number(1234567.89) // "1,234,567.89"
  ctx.i18n.number(1234567.89, { style: 'currency', currency: 'CNY' }, 'zh_CN') // "¥1,234,567.89"

  // 格式化列表
  ctx.i18n.list(['apple', 'banana', 'orange']) // "apple, banana, and orange"
  ctx.i18n.list(['苹果', '香蕉', '橘子'], undefined, 'zh_CN') // "苹果、香蕉和橘子"

  // 相对时间格式化
  ctx.i18n.rtime(-1, 'day') // "yesterday"
  ctx.i18n.rtime(3, 'month', undefined, 'zh_CN') // "3个月后"

  // 文本分词
  ctx.i18n.segmenter('Hello, World!') // { value: "Hello", done: false }
  ctx.i18n.segmenter('你好，世界！', undefined, 'zh_CN') // { value: "你好", done: false }
  // #endregion i4

  // #region i5
  const format = formatFactory(ctx.i18n)
  // 不带有 i18n 直接输出
  format('hello, {0}!', ['world'])
  // 带有 i18n 自动转换（根据当前上下文中的语言设置）
  ctx.i18n.set('zh_CN')
  format('message', ['world']) // "你好，world！"
  // #endregion i5

  // #region i6
  const child = ctx.i18n.extends('zh_CN')
  child.locale('hello') // "你好，{0}！"
  ctx.i18n.get() // 'en_US' (父实例的语言设置不受影响)
  // #endregion i6
}
