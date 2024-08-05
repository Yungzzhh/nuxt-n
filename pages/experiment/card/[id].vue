<template>
  <div mb-10 text-center>
    <NuxtLink to="/experiment/transiton">BACK</NuxtLink>
  </div>
  <div class="card large">
    <img :src="`/temp/${route.params.id}.jpg`" width="600" height="400"
      :style="{ viewTransitionName: `card-image-${route.params.id}` }" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
<style scoped>
.card.large {
  width: 600px;
  height: 400px;
}

.card.large img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>