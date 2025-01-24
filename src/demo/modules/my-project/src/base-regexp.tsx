import type { Context } from 'kotori-bot'

export function main(ctx: Context) {
  // #region r1
  ctx.regexp(/^\/start$/, (_match, session) => {
    session.send('游戏开始!')
  })
  // #endregion r1

  // #region r2
  const off = ctx.regexp(/pattern/, () => {
    /* ... */
  })

  // 移除正则匹配
  off()
  // #endregion r2

  // #region r3
  ctx.regexp(/^\/echo (.+)$/, (match, session) => {
    const content = match[1] // 捕获组内容
    session.send(content) // 回声匹配消息
  })
  // #endregion r3

  // #region r4
  ctx.regexp(/^算((数学|语文|英语)\b)\s*(\d+)分$/, (match, session) => {
    const [, , subject, score] = match
    let msg: string
    switch (subject) {
      case '数学':
        msg = `数学 ${score} 分`
        break
      case '语文':
        msg = `语文 ${score} 分`
        break
      case '英语':
        msg = `英语 ${score} 分`
        break
      default:
        msg = '不支持的科目'
    }
    session.send(msg)
  })
  // #endregion r4

  // #region r5
  ctx.regexp(/在\s*吗?/, (_match, session) => {
    session.send('我在这里')
  })
  // #endregion r5

  // #region r6
  ctx.regexp(/^(加|减|乘|除)\s*(\d+)\s*(加|减|乘|除)?\s*(\d+)?$/, (match, session) => {
    const [, op1, n1, _op2, n2] = match
    let result: number
    switch (op1) {
      case '加':
        result = n2 ? Number(n1) + Number(n2) : Number(n1)
        break
      case '减':
        result = n2 ? Number(n1) - Number(n2) : -Number(n1)
        break
      case '乘':
        result = n2 ? Number(n1) * Number(n2) : Number(n1)
        break
      case '除':
        result = n2 ? Number(n1) / Number(n2) : 1 / Number(n1)
        break
      default:
        session.send('不支持的运算符')
        return
    }
    session.send(`结果是: ${result}`)
  })
  // #endregion r6
}
