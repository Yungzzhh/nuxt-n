<template>
  <div :class="containerClass">
    <div v-for="(column, index) in columns" :key="index" class="column">
      <div v-for="item in column" :key="item.id" class="item">
        <img :src="item.src" :alt="item.alt" :style="{ height: item.height + 'px' }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const containerClass = computed(() => ({
  'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5': true
}));

const columns = ref([]);
const isClient = typeof window !== 'undefined';

const getColumnCount = () => {
  if (!isClient) return 4; // 默认列数，可以根据需要调整
  return window.innerWidth < 640 ? 2 :
    window.innerWidth < 768 ? 3 :
      window.innerWidth < 1024 ? 4 : 5;
};


const distributeItems = () => {
  const columnCount = getColumnCount();

  columns.value = Array.from({ length: columnCount }, () => []);

  props.items.forEach((item) => {
    const shortestColumn = columns.value.reduce((min, column, i) =>
      column.reduce((sum, item) => sum + item.height, 0) <
        columns.value[min].reduce((sum, item) => sum + item.height, 0) ? i : min, 0);

    columns.value[shortestColumn].push(item);
  });
};

watch(() => props.items, distributeItems, { immediate: true });

onMounted(() => {
  distributeItems();
  if (isClient) {
    window.addEventListener('resize', distributeItems);
  }
});
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  width: 100%;
}

img {
  width: 100%;
  object-fit: cover;
}
</style>