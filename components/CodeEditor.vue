<template>
  <div>
    <ClientOnly>
      <div>
        <MonacoEditor v-model="codeValue" lang="json" class="w-full h-4xl " />
      </div>
      <template #fallback>
        <div class="w-full h-3xl ">
          loading...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const codeValue = ref('')
</script>

<style></style>