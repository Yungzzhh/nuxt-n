<template>
  <div class="flex flex-col gap-4 mt-10 slide-enter-content">
    <NuxtLink v-for="route in routes" :key="route.path" :to="route.path">
      <div class="link w-max">
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
  { path: "/inq", name: "小红书" },
  { path: "/experiment/color-palette", name: "color-palette" },
];
</script>
<style scoped></style>