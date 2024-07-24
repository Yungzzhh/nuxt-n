<template>
  <div>
    child
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['foobar'])

console.log(props.foobar)
</script>

<style>

</style>