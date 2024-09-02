import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  experimental: {
    viewTransition: true
  },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    "@nuxt/content",
    '@nuxt/image',
    '@vueuse/nuxt',
    "@nuxt/ui",
    "nuxt-monaco-editor",
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      tempDir: process.cwd()
    }
  },
  monacoEditor: {
    // These are default values:
    locale: 'en',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  },
  nitro: {
    preset: 'node-server',
    prerender: {
      routes: ['/feed.xml']
    }
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    // fallback: 'light', // fallback value if not system preference found
    // hid: 'nuxt-color-mode-script',
    // globalName: '__NUXT_COLOR_MODE__',
    // componentName: 'ColorScheme',
    // classPrefix: '',
    classSuffix: '',
    // storageKey: 'nuxt-color-mode'
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  unocss: {
    // UnoCSS 选项
    uno: true,
    attributify: true,
    icons: true,
  },
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      langs: ['ts', 'js', 'css', 'html', 'vue', 'json', 'tsx']
    },
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
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/transition.css',
    '~/assets/css/prose.css',
    'animate.css'
  ],
  build: {
    transpile: ['medium-zoom', '@giscus/vue']
  },
  ui: {
  },
})