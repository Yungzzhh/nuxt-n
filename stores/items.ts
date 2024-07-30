import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
    currentItem: null,
  }),
  actions: {
    async fetchItems() {
      if (this.items.length) return
      const { data } = await useFetch('/api/items')
      this.items = data.value as any
    },
    async fetchItemById(id: string) {
      const { data } = await useFetch(`/api/items/${id}`)
      this.currentItem = data.value as any
    },
  },
})