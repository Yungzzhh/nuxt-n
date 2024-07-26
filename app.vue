<script setup lang="ts">
const layout = "default"
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>


<style>
::view-transition-old(modal-content),
::view-transition-new(modal-content) {
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}

::view-transition-old(modal-content) {
  animation-name: fade-out;
}

::view-transition-new(modal-content) {
  animation-name: fade-in;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.1);
  }
}

.card {
  view-transition-name: var(--view-transition-name, none);
}

.card-detail {
  view-transition-name: var(--view-transition-name, none);
}
</style>
