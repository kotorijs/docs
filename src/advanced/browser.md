# Use in browser

To wait better supports...

```bash
pnpm install @kotori-bot/core
```

The `@kotori-bot/core` package is the core package of the bot,it only used ecmascript standard api,
so you can use it in any the environments which support ecmascript >= 2020.

```typescript
import { Adapter, Api, Core, Elements, type Message, Messages, MessageScope } from '@kotori-bot/core'

const core = new Core({
  global: {
    commandPrefix: '/'
  }
})

function MyPlugin(ctx: Core) {
  ctx.command('echo <msg>').action(({ args: [msg] }, session) => {
    alert(`You said: ${msg}`)
    console.log(session)
  })
}

core.load(MyPlugin)

core.start()

class BrowserAdapter extends Adapter {
  public platform = 'browser'

  public constructor(ctx: Core) {
    super(ctx, { commandPrefix: '/', extends: 'browser', master: '1', lang: 'zh_CN' }, 'browser')
  }

  public api = new (class extends Api {
    public getSupportedEvents(): ReturnType<Api['getSupportedEvents']> {
      return ['on_message']
    }
  })(this) as Api

  public elements = new (class extends Elements {
    getSupportsElements(): ReturnType<Elements['getSupportsElements']> {
      return []
    }

    decode(message: Message): string {
      return message.toString()
    }

    encode(raw: string): Message {
      return Messages(raw)
    }
  })(this) as Elements

  public handle = this.session.bind(this)

  public start() {}
  public stop() {}
  public send() {}
}

const bot = new BrowserAdapter(core)

const result = prompt('input:')

bot.handle('on_message', {
  type: MessageScope.PRIVATE,
  message: result ?? '',
  messageAlt: 'alt',
  messageId: '1',
  time: Date.now(),
  userId: '1',
  sender: {
    nickname: 'my-browser'
  }
})
```
