<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean,
  item: any
}>()

const route = useRoute()
console.log(props.item);

watch(() => props.item, (newVal) => {
  console.log(newVal);
})
</script>

<template>
  <div v-if="isOpen" :style="props.item.id ? { viewTransitionName: `card-image-${props.item.id}` } : {}"
    class=" w-screen h-screen bg-blueGray absolute top-0 bg-op-40 flex justify-center items-center"
    @click.self="$emit('close')">
    <slot></slot>
  </div>
</template>