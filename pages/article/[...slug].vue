<template>
  <main class=" standard-layout slide-enter-content">
    <!-- <div class="flex flex-col"> -->
    <ContentDoc v-slot="{ doc }">
      <h1>{{ doc?.title }}</h1>
      <h3>{{ doc.description }}</h3>
      <h3>{{ doc.time }}</h3>
      <ContentRenderer :value="doc" />
    </ContentDoc>
    <!-- </div> -->
  </main>
</template>

<script setup>
const route = useRoute()
const res = await useAsyncData(`content-${route.path}`, () =>
  queryContent(route.path).findOne()
)

const a = useContent()
console.log(a);
</script>