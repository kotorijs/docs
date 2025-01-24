import type { Context } from 'kotori-bot'

declare module 'kotori-bot' {
  interface Context {
    // biome-ignore lint:
    rss: any
  }
}

// #region s
export const inject = ['rss']

export function main(ctx: Context) {
  // 创建 RSS 订阅
  ctx.rss.create('kotori-releases', {
    url: 'https://github.com/kotorijs/kotori/releases.atom',
    interval: 3600000, // 1小时检查一次
    // biome-ignore lint:
    callback: (items: any[]) =>
      items.map((item) => {
        ctx.logger.info('New release:', {
          title: item.title,
          link: item.link,
          date: item.pubDate
        })
      })
  })

  // 管理订阅
  const feed = ctx.rss.get('kotori-releases')
  if (feed) {
    // 修改检查间隔
    feed.setInterval(7200000) // 2小时

    // 暂停订阅
    feed.pause()

    // 恢复订阅
    feed.resume()
  }

  // 移除订阅
  ctx.rss.remove('kotori-releases')

  // 获取所有订阅
  ctx.rss.getAll()
}
// #endregion s
