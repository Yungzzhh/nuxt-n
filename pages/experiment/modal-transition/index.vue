<template>
  <NuxtLayout name="experiment">
    <div class="container mx-auto p-4">
      <div v-for="(item, index) in list" :key="item.id"
        class="slide-in-item rounded-xl border bg-gray-400 cursor-pointer h-32 w-xl mb-2" :style="{ '--index': index }">
        <div class="flex justify-between items-center p-4 shadow-coolGray  ">
          <div class="font-bold">{{ item.title }}</div>
          <div class="font-bold">{{ item.description }}</div>
        </div>
      </div>
    </div>

  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const layout = 'experiment'

const list = ref([
  { id: 1, title: 'Item 1', description: 'This is the full description for Item 1.' },
  { id: 2, title: 'Item 2', description: 'This is the full description for Item 2.' },
  { id: 3, title: 'Item 3', description: 'This is the full description for Item 3.' },
])


</script>

<style scoped>
.slide-in-item {
  opacity: 0;
  transform: translateX(-50px);
  animation: slideIn 0.5s ease forwards;
  animation-delay: calc(var(--index) * 0.2s);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

::view-transition-old(page-title),
::view-transition-new(page-title) {
  height: 100%;
}

::view-transition-old(page-title) {
  animation: fade-out 2s ease-in-out;
}

::view-transition-new(page-title) {
  animation: fade-in 2s ease-in-out;
}

@keyframes fade-in {
  from {
    transform: translateY(-20px)
  }

  to {
    transform: translateY(0);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>