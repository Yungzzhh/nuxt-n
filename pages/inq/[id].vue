<template>
  <div>
    <div v-if="id">
      <NuxtImg :src="image.image" />
      {{ id }}
      <NuxtLink to="/inq">
        <button>返回</button>
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/inq">
        <button>返回</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: images } = await useFetch('/api/image')
const image = images.value?.find(i => i.id === route.params.id)!
const id = route.params.id;
definePageMeta({
  middleware: ['modal']
})

</script>

<style></style>