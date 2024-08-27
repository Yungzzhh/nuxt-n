<script setup lang="ts">
defineProps<{
  isOpen: boolean,
  item: any
}>()

defineEmits(['close'])

</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen"
      class=" w-screen h-screen bg-blueGray absolute top-0 z-1000 bg-op-80 flex justify-center items-center"
      @click.self="$emit('close')">
      <slot></slot>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-content {}
</style>