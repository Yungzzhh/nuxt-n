import { createI18n } from 'vue-i18n'
import en from '~/locales/en-US'
import zh from '~/locales/zh-CN'
import zhHK from '~/locales/zh-HK'

export default defineNuxtPlugin(({ vueApp }) => {
  // 这里设置了默认启动时从cookie获取语言配置。至于为什么是cookie ，是因为nuxt 的首屏服务端加载原因
  const language = useCookie('lang').value || 'en'
  const i18n = createI18n({
    fallbackLocale: 'zh',
    locale: language,
    messages: {
      zh,
      en,
      zhHK
    }
  })

  vueApp.use(i18n)
})

// export default defineNuxtPlugin(() => { })