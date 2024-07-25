<template>
  <main class=" standard-layout slide-enter-content">
    <ContentDoc v-slot="{ doc }">
      <h1>{{ doc?.title }}</h1>
      <h3>{{ doc.description }}</h3>
      <h3>{{ doc.time }}</h3>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>

<script setup>
const route = useRoute()
const res = await useAsyncData(`content-${route.path}`, () =>
  queryContent(route.path).findOne()
) 
</script>