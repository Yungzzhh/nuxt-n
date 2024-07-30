<template>
  <div>
    <h1>Explore Items</h1>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id">
        <NuxtLink :to="`/experiment/explore/${item.id}`">{{ item.title }}</NuxtLink>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { useItemsStore } from '~/stores/items'

const store = useItemsStore()
const { items } = storeToRefs(store)

await useAsyncData('items', () => store.fetchItems())
</script>