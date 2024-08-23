<script lang="ts" setup>
import { useRoute } from 'nuxt/app';

const route = useRoute();
const { data: images } = await useFetch('/api/image')
console.log(images.value, 'images');

const image = images.value?.find(i => i.id === route.params.id)!
console.log(image, 'image');

const subImageList = computed(() => {
  return images.value?.filter(i => i.id !== route.params.id)
})
console.log(subImageList.value, 'subImageList');

</script>

<template>
  <div>
    <div mb-10 text-center>
      <NuxtLink to="/experiment/transiton">BACK</NuxtLink>
    </div>
    <NuxtImg text-center width="800" height="600" :src="`/temp/${image.imageName}`"
      :style="{ 'view-transition-name': `item-${route.params.id}` }" />

    <div class=" h-100px"></div>
    <div class="flex gap-4">
      <NuxtImg :src="`/temp/${i.imageName}`" v-for="i of subImageList" :key="i.id"
        :style="{ 'view-transition-name': `item-${i.id}` }" width="600" height="400" />
    </div>
  </div>
</template>