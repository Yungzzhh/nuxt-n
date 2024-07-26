<template>
  <div class="relative w-100 mx-auto">
    <nav class="flex justify-between relative">
      <div v-for="(item, index) in navItems" :key="index" :class="[
        'px-5 py-2 cursor-pointer transition-colors duration-300',
        'hover:text-blue-600',
        { 'text-blue-600': index === activeIndex }
      ]" @click="setActive(index)">
        {{ item.name }}
      </div>
      <div class="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out" :style="indicatorStyle">
      </div>
    </nav>
  </div>
</template>

<script setup>
const navItems = ref([])

const { data } = await useAsyncData(
  'tabList',
  async () => {
    const raw = await $fetch('/api/tabs')
    return raw
  })

navItems.value = data.value.data

const activeIndex = ref(0)

const setActive = (index) => {
  activeIndex.value = index
}

const indicatorStyle = computed(() => ({
  left: `calc(${activeIndex.value} * 25%)`,
  width: '25%'
}))
</script>

<style scoped>
nav {
  --items: 4;
}

nav>div {
  flex: 1;
  text-align: center;
}

nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(100% / var(--items));
  /* background-color: #e6f2ff; */
  transition: all 0.3s ease-in-out;
  z-index: -1;
  transform: translateX(calc(var(--active-index) * 100%));
}

nav:hover::before {
  opacity: 0;
}

nav>div:hover {
  background-color: #e6f2ff;
}
</style>