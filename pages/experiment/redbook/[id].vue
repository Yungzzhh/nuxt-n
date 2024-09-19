<template>
  <div>
    <div v-if="id">
      <NuxtImg :src="`/temp/${id}.jpg`" />
      {{ id }}
      <NuxtLink to="/experiment/redbook">
        <button>返回</button>
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/experiment/redbook">
        <button>返回</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id;
definePageMeta({
  middleware: ['modal']
})

</script>

<style></style>