import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    content: null as any,
  }),
  actions: {
    openModal(route: any) {
      this.isOpen = true
      this.content = route
    },
    closeModal() {
      this.isOpen = false
      this.content = null
    },
  },
})