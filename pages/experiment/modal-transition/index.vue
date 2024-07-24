<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Item List</h1>
    <div class="flex flex-col gap-4">
      <div v-for="item of list" :key="item.id"
        class="rounded-xl border bg-gray-400 hover:bg-gray-600 cursor-pointer h-32 w-xl">
        <div class="flex justify-between items-center p-4 shadow-coolGray">
          <div class="font-bold">{{ item.title }}</div>
          <div class="font-bold">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
const list = ref([
  { id: 1, title: 'Item 1', description: 'This is the full description for Item 1.' },
  { id: 2, title: 'Item 2', description: 'This is the full description for Item 2.' },
  { id: 3, title: 'Item 3', description: 'This is the full description for Item 3.' },
])

</script>