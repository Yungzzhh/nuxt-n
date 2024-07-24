<template>
  <div>
    <div>title: custom</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
</script>
<style></style>