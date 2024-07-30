<template>
  <div class="flex gap-8 flex-col items-center my-10">
    <div v-for="item in items" :key="item.id" @click="handleItemClick(item)"
      class="w-400px h-200px flex justify-center items-center bg-gray-4 rounded-2xl shadow-2xl">
      {{ item.name }}
    </div>

    <Modal :isOpen="showModal" @close="handleCloseModal">
      <div class=" bg-white w-1/2 h-1/4 rounded-2xl p-4">
        <div class="flex flex-col items-center gap-4 ">
          <div>title</div>
          <div>content</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
const route = useRoute()

const items = ref([])
const selectedItem = ref(null)
const showModal = computed(() => !!selectedItem.value)

// 模拟获取items的函数
const fetchItems = async () => {
  return [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ]
}

// 模拟获取单个item的函数
const fetchItemById = async (id) => {
  // 在实际应用中，这里应该是一个API调用
  return items.value.find(item => item.id === id) || { id, name: `Item ${id}` }
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

// 处理item点击事件
const handleItemClick = (item) => {
  selectedItem.value = item
  updateUrl(`/experiment/explore/${item.id}`)
}

// 处理modal关闭事件
const handleCloseModal = () => {
  selectedItem.value = null
  updateUrl('/experiment/explore')
}

// 更新URL而不刷新页面
const updateUrl = (url) => {
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