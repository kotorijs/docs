# Develop

## As dependence

```bash
pnpm install kotori-bot
```

Of course, you can also install `@kotori-bot/core` or `@kotori-bot/loader` by according your needs,
about the difference and modifications between them, see [architecture](./architecture.md).

```typescript
import { Loader } from 'kotori-bot'

const loader = new Loader()

loader.run(true)
```

## Secondary development

1.Clone the repository

```bash
git clone https://github.com/kotorijs/kotori
```

2.Install dependencies

```bash
pnpm install
```

3.Run

```bash
pnpm dev
```

Other scripts:

- `build` Build all packages at the workspace
- `build:action` Build all packages at the workspace base safe mode.
- `dev:only` Only start else `nodemon`
- `pub` Publish all packages at the workspace base `public` access
- `test` Run all unit tests at the workspace
- `version` Generate `CHANGELOG.md`
