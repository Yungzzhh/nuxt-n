<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtPage :foobar="123" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
      console.log('Middleware');
    },
    "auth",
    "n-middleware",
  ]
})
</script>

<style></style>