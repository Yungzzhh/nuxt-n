<script lang="ts" setup>
import { useRoute } from 'nuxt/app';

const route = useRoute();
const { data: images } = await useFetch('/api/image')


const subImageList = computed(() => {
  const list = images.value?.map(i => i.split('.')[0])!.filter(i => i !== route.params.id)
  return list
})

</script>

<template>
  <div>
    <div mb-10 text-center>
      <NuxtLink to="/experiment/transiton">BACK</NuxtLink>
    </div>
    <NuxtImg text-center width="800" height="600" :src="`/temp/${route.params.id}.jpg`"
      :style="{ 'view-transition-name': `item-${route.params.id}` }" />


    <div class=" h-100px"></div>
    <div class="flex gap-4">
      <NuxtImg :src="`/temp/${i}.jpg`" v-for="i of subImageList" :key="i"
        :style="{ 'view-transition-name': `item-${i}` }" width="600" height="400" />
    </div>
  </div>
</template>