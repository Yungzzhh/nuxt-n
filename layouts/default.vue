<template>
  <div class="default-layout" id="default-layout">
    <base-nav></base-nav>
    <NuxtPage />
    <SearchDialog />
  </div>
</template>

<script lang="ts" setup>
import SearchDialog from '~/components/SearchDialog.vue'
</script>

<style></style>