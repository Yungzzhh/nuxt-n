<template>
  <div :style="{ viewTransitionName: 'page-title' }"
    class="container mx-auto p-10 flex flex-col justify-center items-center bg-gray-400 rounded-xl">
    <h1>页面标题</h1>
    <button @click="goBack" class="mt-4 px-4 py-2 rounded cursor-pointer">
      返回
    </button>
  </div>
</template>

<script setup>

function goBack() {
  navigateTo('./')
}
</script>