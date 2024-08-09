import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
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
  ],
  colorMode: {
    // preference: 'system', // default value of $colorMode.preference
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
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/transition.css',
  ],
  build: {
    transpile: ['medium-zoom']
  }
})
