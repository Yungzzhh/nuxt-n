---
title: 'Nuxt Content'
description: 'Customer render in nuxt/content'
time: '2024-08-19'
tag: '#Vue, #Nuxt'
---

::fancy-header
That text paragraph will be unwrapped.
::

可以试试全局搜索功能，nuxt/content 官方提供了 **searchContent** 方法来搜索 **content** 目录下的内容。
另外需要在 **nuxt.config.ts** 中配置 **search** 插件。

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-content'
  ],
  content: {
    experimental: {
      search: {
        indexed: true,
        options: {
          fields: [
            "title",
            "content",
          ],
          storeFields: [
            "title",
            "content",
          ],
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: {
              title: 4,
              content: 2,
              titles: 1,
            },
          },
        },
      },
    },
})
```

本博客采用了 **Command + K** 来触发全局搜索功能。
