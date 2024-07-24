<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div ref="modalRef" class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" :style="modalStyle">
      <h2 class="text-2xl font-bold mb-4">{{ item.title }}</h2>
      <p class="text-gray-700 mb-4">{{ item.description }}</p>
      <button @click="$emit('close')"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps(['item', 'isOpen', 'cardRect'])
const modalRef = ref(null)

const modalStyle = computed(() => ({
  position: 'fixed',
  transition: 'all 0.3s ease-in-out',
  ...props.cardRect
}))

onMounted(() => {
  if (modalRef.value) {
    // 触发重排以开始过渡
    modalRef.value.offsetHeight
    modalRef.value.style.top = '50%'
    modalRef.value.style.left = '50%'
    modalRef.value.style.transform = 'translate(-50%, -50%)'
    modalRef.value.style.width = 'auto'
    modalRef.value.style.height = 'auto'
  }
})

onUnmounted(() => {
  if (modalRef.value) {
    modalRef.value.style.top = `${props.cardRect.top}px`
    modalRef.value.style.left = `${props.cardRect.left}px`
    modalRef.value.style.width = `${props.cardRect.width}px`
    modalRef.value.style.height = `${props.cardRect.height}px`
    modalRef.value.style.transform = 'none'
  }
})
</script>