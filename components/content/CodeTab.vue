<template>
  <div>
    <div class="tab-list">
      <button v-for="(tab, index) in tabs" :key="index" :class="{ active: selectedIndex === index }"
        @click="selectedIndex = index">
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <div v-for="(tab, index) in tabs" :key="index" v-show="selectedIndex === index">
        <slot :name="tab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Tab {
  label: string;
  slot: string;
}

const props = defineProps<{
  tabs: Tab[];
}>();

const selectedIndex = ref(0); 
</script>

<style scoped>
.tab-list {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.tab-list button {
  padding: 10px;
  cursor: pointer;
  border: none;
  background: none;
}

.tab-list button.active {
  border-bottom: 2px solid #007bff;
  font-weight: bold;
}

.tab-content {
  padding: 10px;
}
</style>