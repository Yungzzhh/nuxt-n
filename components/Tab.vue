<template>
  <div class="tabs">
    <ul class="tab-list">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
        :style="{ color: activeTab === index ? '#000' : '#ccc' }" @click="setActiveTab(index)">
        {{ tab.title }}
      </li>
    </ul>
    <div class="tab-content">
      <slot :name="activeTabName"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Tab {
  title: string;
  name: string;
}

const props = defineProps<{
  tabs: Tab[];
  defaultActiveTab: number;
}>();
const activeTab = ref(props.defaultActiveTab);

const setActiveTab = (index: number) => {
  activeTab.value = index;
};

const activeTabName = computed(() => props.tabs[activeTab.value].name); 
</script>

<style scoped>
.tabs {
  font-family: Arial, sans-serif;
}

.tab-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
}

.tab-list li {
  padding: 10px 20px;
  cursor: pointer;
}

.tab-list li.active {
  background-color: #f0f0f0;
  border-bottom: 2px solid #007bff;
}

.tab-content {
  padding: 20px;
}
</style>