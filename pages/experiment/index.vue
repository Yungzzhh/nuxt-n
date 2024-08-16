<template>
  <div class="flex flex-wrap gap-4 mt-10 slide-enter-content">
    <NuxtLink v-for="route in routes" :key="route.path" :to="route.path" class="w-[calc(24%)]">
      <div
        class="w-full h-100px p-2 bg-blue-gray rounded-xl shadow-2xl no-underline text-2xl flex items-center justify-center text-white transition-all duration-300 hover:bg-blue-300 hover:shadow-lg">
        {{ route.name }}
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const routes = [
  { path: "/experiment/modal-transition", name: "modal-transition" },
  { path: "/experiment/waterfall", name: "waterfall" },
  { path: "/experiment/tabswitch", name: "tabswitch" },
  { path: "/experiment/explore", name: "router-intercept" },
  { path: "/experiment/radialBg", name: "radial-background" },
  { path: "/experiment/transiton", name: "transiton" },
];
</script>
<style scoped></style>