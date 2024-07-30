<template>
  <div>
    detail page
  </div>
</template>

<script setup>
const route = useRoute()
console.log(route.params.itemId); 
</script>