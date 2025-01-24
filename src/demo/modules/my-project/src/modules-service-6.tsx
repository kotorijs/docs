import type { Context } from 'kotori-bot'
// 导入浏览器服务
import '@kotori-bot/browser'

export const inject = ['browser']

export async function main(ctx: Context) {
  // 创建新页面
  const page = await ctx.browser.page()

  // 基本导航
  await page.goto('https://github.com/kotorijs/kotori')

  // 等待元素加载
  await page.waitForSelector('.repository-content')

  // 截图
  await page.screenshot({
    path: 'repo.png',
    fullPage: true
  })

  // 获取页面内容
  await page.$eval('h1', (el: HTMLElement) => el.textContent)

  // 关闭页面
  await page.close()
}
