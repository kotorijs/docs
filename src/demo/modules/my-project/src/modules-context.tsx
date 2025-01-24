// @ts-nocheck
import { Context } from 'kotori-bot'

// #region c1
declare class Server {}

const ctx = new Context()
ctx.provide('config', {
  port: 3000,
  host: 'localhost'
})
ctx.provide('server', new Server())

const config = ctx.get('config') // { port: 3000 }
const server = ctx.get('server') // Server {}
// #endregion c1

// #region c2
ctx.provide('config', {
  port: 3000,
  host: 'localhost'
})
ctx.config.port // TypeError: Cannot read properties of undefined (reading 'port')
ctx.inject('config')
ctx.config.port // 3000
// #endregion c2

// #region c3
ctx.provide('demo', {
  name: 'hello, kotori!',
  display() {
    return this.name
  }
})

ctx.display() // Uncaught TypeError: ctx.display is not a function
ctx.mixin('demo', ['display'])
ctx.display() // hello, kotori!
// #endregion c3

/* --- */
;() => {
  // #region c4
  const config = {
    /* ... */
  }
  const demo = {
    /* ... */
  }

  declare module 'kotori-bot' {
    interface Context {
      myConfig: typeof config
      display: (typeof demo)['display']
    }
  }

  ctx.provide('demo', demo)
  ctx.inject('config')

  ctx.provide('demo', config)
  ctx.mixin('demo', ['display'])
  // #endregion c4

  // #region c5
  const ctxChild1 = ctx.extends()
  const ctxChild2 = ctx.extends()

  ctx.provide('data1', { value: 1 })
  ctx.inject('data1')
  ctx.data1.value // 1
  ctxChild1.data1.value // 1

  ctxChild1.provide('data2', { value: 2 })
  ctxChild1.inject('data2')
  ctx.data2 // undefined
  ctxChild1.data2.value // 2

  ctxChild2.provide('data3', { value: 3 })
  ctxChild2.inject('data3')
  ctx.data3 // undefined
  ctxChild1.data3 // undefined
  ctxChild2.data3.value // 3
  // #endregion c5
}

/* --- */
;() => {
  // #region c6
  const ctx = new Context()
  const ctxChild1 = ctx.extends()
  const ctxChild2 = ctx.extends('child2')

  ctx.identity // undefined
  ctxChild1.identity // 'sub'
  ctxChild2.identity // 'child2'
  // #endregion c6
}

/* --- */
;() => {
  // #region c7
  const ctx = new Context()
  const ctxChild = ctx.extends()
  const ctxChild1 = ctx.extends()
  const ctxChild2 = ctx.extends()
  const ctxChild3 = ctxChild1.extends()

  ctx.root === ctx // true
  ctxChild1.root === ctxChild1 || ctxChild1.root === ctxChild2 // false
  ctxChild1.root === ctx && ctxChild2.root === ctx // true
  ctxChild3.root === ctxChild1 // false
  ctxChild3.root === ctx // true
  // #endregion c7
}
