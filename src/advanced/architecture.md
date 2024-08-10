<!-- markdownlint-disable -->
<script setup>
  import Voice from '../components/Voice.vue';
  import NpmBadge from '../components/NpmBadge.vue';
</script>
<!-- markdownlint-enable -->

# Architecture

Kotori use workspace developing (monorepo) by [pnpm](https://pnpm.io/) and submodules management by git,
and linter and formatter by [Biome](https://biomejs.dev/) (fucks eslint and prettier).

## Packages

### fluoro (submodule)

<!-- markdownlint-disable-next-line -->
<NpmBadge package="fluoro" />

Fluoro is universal meta-framework,provides `Context` `Modules` and `Events`.
it is the base of whole Kotori,more details view [Fluoro](./fluoro.md).

### @kotori-bot/core

<!-- markdownlint-disable-next-line -->
<NpmBadge package="@kotori-bot/core" />

It is the core of Kotori and provides many important features of kotori (encapsulates `fluoro`).It has fully the support for browser and other not node.js
(such as [quick.js](https://bellard.org/quickjs/) or service-worker),more details view [Use in browser](./browser.md).

### @kotori-bot/loader

<!-- markdownlint-disable-next-line -->
<NpmBadge package="@kotori-bot/loader" />

It encapsulates `@kotori-bot/loader` and provides some interface and features need server environments (Node.js).

### @kotori-bot/logger

<!-- markdownlint-disable-next-line -->
<NpmBadge package="@kotori-bot/logger" />

It is fully functional logger base on adapters thinking and supports browser.

### @kotori-bot/i18n

<!-- markdownlint-disable-next-line -->
<NpmBadge package="@kotori-bot/i18n" />

It is a i18n module,provides `i18n` for `@kotori-bot/core`.

### @kotori-bot/tools

<!-- markdownlint-disable-next-line -->
<NpmBadge package="@kotori-bot/tools" />

It is a tools module,provides some useful tools for `@kotori-bot/core` and `@kotori-bot/loader`.

### tsukiko

<!-- markdownlint-disable-next-line -->
<NpmBadge package="tsukiko" />

It used to parse and check data type at running time.

## Process image

![architecture](/architecture.svg)
