// plugins/route-modal-handler.ts
import { useModalStore } from '~/stores/modalStore'

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router as any; // Provide the type for nuxtApp.$router
  nuxtApp.hook('app:created', () => {
    const modalStore = useModalStore()

    router.beforeEach((to: any, from: any, next: any) => { // Use the router variable instead of nuxtApp.$router
      // 检查路由是否需要在模态框中显示
      if (to.meta.modal) {
        // 更新 URL，但不实际导航
        window.history.pushState(null, '', to.fullPath)

        // 打开模态框并加载内容
        modalStore.openModal(to)

        next(false) // 阻止实际的路由导航
      } else {
        next() // 对于其他路由，正常导航
      }
    })

    // 处理浏览器的后退操作
    window && window.addEventListener('popstate', () => {
      if (modalStore.isOpen) {
        modalStore.closeModal()
      }
    })
  })
})