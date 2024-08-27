<script lang="ts" setup>
import { useRoute } from 'nuxt/app';

const route = useRoute();
const { data: images } = await useFetch('/api/image')

const image = images.value?.find(i => i.id === route.params.id)!

const subImageList = computed(() => {
  return images.value?.filter(i => i.id !== route.params.id)
})

</script>

<template>
  <div mb-10 text-center>
    <NuxtLink to="/experiment/transiton">BACK</NuxtLink>
  </div>
  <div class="card large">
    <img :src="`/temp/${image.imageName}`" width="600" height="400"
      :style="{ viewTransitionName: `card-image-${route.params.id}` }" />
  </div>
</template>

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