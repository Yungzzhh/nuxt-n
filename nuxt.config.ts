import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    "@nuxt/content"
  ],
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
    documentDriven: true
  },
  css: [
    '~/assets/css/main.css',
  ],
})
