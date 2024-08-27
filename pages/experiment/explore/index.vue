<template>
  <div class="flex gap-8 flex-col items-center my-10">
    <div v-for="item in items" :key="item.id" @click="handleItemClick(item)"
      :style="{ viewTransitionName: `card-image-${item.id}` }"
      class="  transition-all duration-300 ease-in-out w-400px h-200px flex justify-center items-center bg-gray-4 rounded-2xl shadow-2xl">
      {{ item.name }}
    </div>

    <Transition name="modal">
      <div v-if="showModal && selectedItem && selectedItem.id"
        class=" w-screen h-screen bg-blueGray absolute top-0 bg-op-40 flex justify-center items-center"
        @click.self="handleCloseModal">
        <div class=" bg-white w-1/2 h-1/4 rounded-2xl p-4"
          :style="{ viewTransitionName: `card-image-${selectedItem.id}` }">
          <div class="flex flex-col items-center gap-4 ">
            <div>title</div>
            <div>content</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const items: any = ref([])
const selectedItem: any = ref(null)
const showModal = ref(false)

// 模拟获取items的函数
const fetchItems = async () => {
  return [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ]
}

// 模拟获取单个item的函数
const fetchItemById = async (id: any) => {
  // 在实际应用中，这里应该是一个API调用
  return items.value.find((item: any) => item.id === id) || { id, name: `Item ${id}` }
}

// 初始化数据
onMounted(async () => {
  items.value = await fetchItems()

  // 检查初始路由是否包含 itemId
  const initialItemId = route.params.itemId
  if (initialItemId) {
    const item = await fetchItemById(initialItemId)
    selectedItem.value = item
  }
})

const navigateToLarge = (id: string) => {
  if (document!.startViewTransition) {
    document.startViewTransition(() => {
      navigateTo(`/experiment/card/${id}`)
    })
  } else {
    navigateTo(`/experiment/card/${id}`)
  }
}

// 处理item点击事件
const handleItemClick = (item: any) => {
  selectedItem.value = item
  showModal.value = true
  if (document!.startViewTransition) {
    document.startViewTransition(() => {
      updateUrl(`/experiment/explore/${item.id}`)
    })
  } else {
    updateUrl(`/experiment/explore/${item.id}`)
  }
}

// 处理modal关闭事件
const handleCloseModal = () => {
  selectedItem.value = null
  showModal.value = false
  updateUrl('/experiment/explore')
}

// 更新URL而不刷新页面
const updateUrl = (url: string) => {
  window.history.pushState({}, '', url)
}

// 监听popstate事件来处理浏览器的前进/后退操作
onMounted(() => {
  window.addEventListener('popstate', handlePopState)
})

const handlePopState = () => {
  const itemId = window.location.pathname.split('/').pop()
  if (itemId && itemId !== 'explore') {
    fetchItemById(itemId).then(item => {
      selectedItem.value = item
    })
  } else {
    selectedItem.value = null
  }
} 
</script>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 0.3s ease;
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.zoom-fade-enter-to,
.zoom-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>