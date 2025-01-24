import { type Context, Http } from 'kotori-bot'

export function main(ctx: Context) {
  // #region h1
  // 使用上下文中的 http 实例
  ctx.http.get('https://api.github.com/users/BIYUEHU').then((user) => {
    console.log(user) // 直接访问响应数据
  })
  ctx.http.post('https://api.example.com/items', {
    name: 'test',
    value: 123
  })
  // 带查询参数的 get 请求
  ctx.http.get('https://api.example.com/search', {
    q: 'kotori',
    page: 1
  })
  // #endregion h1

  // #region h2
  // 创建自定义 HTTP 实例
  const http = new Http({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer token'
    }
  })

  // 发送请求
  http.get('/users')
  http.post('/users', { name: 'kotori' })

  // 扩展实例配置
  const newHttp = http.extend({
    headers: {
      'X-Custom-Header': 'value'
    }
  })
  newHttp.get('/users')
  // #endregion h2

  // #region h3
  // WebSocket 支持
  const ws = ctx.http.ws('wss://echo.websocket.org')

  ws.onopen = () => {
    ws.send('Hello WebSocket!')
  }
  ws.onmessage = (data) => {
    console.log('Received:', data)
  }

  // 请求拦截器
  ctx.http.request((config) => {
    config.headers['X-Request-Time'] = Date.now()
    return config
  })

  // 响应拦截器
  ctx.http.response((response) => {
    console.log(`Status: ${response.status}`)
    return response
  })
  // #endregion h3
}
