import type { Context } from 'kotori-bot'

// #region s5
export const inject = ['server']

export function main(ctx: Context) {
  // 配置路由
  ctx.server.get('/api/users', async (_req, res) => {
    res.json({ users: [] })
  })

  ctx.server.post('/api/user', ctx.server.json(), async (_req, res) => {
    res.json({ created: true })
  })

  // WebSocket 支持
  ctx.server.wss('/ws', (socket, _req) => {
    socket.send('connected')
  })

  // 静态文件服务
  ctx.server.use(ctx.server.static('public'))

  // 启动服务器
  ctx.server.start(() => {
    ctx.logger.info('Server started')
  })
}
// #endregion s5
