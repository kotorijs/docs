import type { Context } from 'kotori-bot'

// #region s
export const inject = ['file']

export function main(ctx: Context) {
  // 获取文件路径
  ctx.file.getDir()
  ctx.file.getFile('config.json')

  // 加载文件
  ctx.file.load('config.json', 'json', {})
  ctx.file.load('readme.md', 'text', '')

  // 保存文件
  ctx.file.save('data.json', { key: 'value' })

  // 创建文件
  ctx.file.create('new.json', { created: true })
}
// #endregion s
