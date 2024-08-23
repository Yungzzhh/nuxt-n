<script setup lang="ts">
import { navigateTo, useFetch } from 'nuxt/app';
import { computed } from 'vue';


const { data: images } = await useFetch('/api/image')
console.log(images, 'images');

const routeIdParam = computed(() => {
  if (!images.value || !Array.isArray(images.value)) return []
  return images.value
})

console.log(routeIdParam.value);

const navigateToLarge = (id: string) => {
  if (document!.startViewTransition) {
    document.startViewTransition(() => {
      navigateTo(`/experiment/card/${id}`)
    })
  } else {
    navigateTo(`/experiment/card/${id}`)
  }
}

</script>


<template>
  <div mb-10 text-center>
    <NuxtLink to="/experiment">BACK</NuxtLink>
  </div>
  <div overflow-auto flex items-center gap-2>

    <div v-for="i of routeIdParam" :key="i.id">
      <NuxtLink :to="`/experiment/transition/${i.id}`">
        <NuxtImg width="600" height="400" transition duration-400 object-cover :src="`/temp/${i.imageName}`"
          :style="{ 'view-transition-name': `item-${i.id}` }" />
      </NuxtLink>
    </div>

  </div>
  <div class=" h-100px"></div>
  <!-- <div class=" flex overflow-auto gap-2">
    <div class=" w-200px h-400px object-cover flex gap-3 bg-bluegray" v-for="i of routeIdParam">
      <div class="card small" @click="() => navigateToLarge(i.id)">
        <img :src="`/temp/${i.image}`" width="300" height="200"
          :style="{ viewTransitionName: `card-image-${i.image}` }" />
        <div class="card-content transition-delay-100">
          <h3 :style="{ viewTransitionName: `card-title-${i.image}` }">{{ i.total }}</h3>
        </div>
      </div>
    </div>
  </div> -->

</template>

<style scoped>
.card.small {
  width: 300px;
  height: 200px;
  cursor: pointer;
}

.card.small img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>