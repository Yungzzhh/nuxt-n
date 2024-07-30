<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean,
}>()

</script>

<template>
  <div v-if="isOpen" class=" w-screen h-screen bg-blueGray absolute top-0 bg-op-40 flex justify-center items-center"
    @click.self="$emit('close')">
    <slot></slot>
  </div>
</template>

<style scoped>
/* .modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-zoom-enter-active {
  animation: zoomIn 0.5s ease-out;
}

.modal-zoom-leave-active {
  animation: zoomOut 0.5s ease-in;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
} */
</style>