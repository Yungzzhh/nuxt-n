<script setup lang="ts">
import { useCounterStore } from '~/stores/counter';
// const { data, error, refresh } = await useFetch('/api/users')
const { data, error, refresh } = await useAsyncData(
  'unique-key',
  async () => {
    const raw = await $fetch('/api/users')
    return raw.map(item => ({ ...item }))
  },
  {
    lazy: false,
    // server: false,
    // default: () => [],
    // immediate: false,
    // getCachedData: () => [],
    // pick: ['name', 'id'],
  },
)
console.log(data);

// await refresh();
const router = useRouter();

const counter = useCounterStore();
</script>

<template>
  <div>
    <div>
      <NuxtLink to="/">back to home</NuxtLink>
    </div>
    about page

    <div>
      <ClientOnly fallback-tag="span">
        <div class="border border-1 border-dashed p-1">
          <div>Client render only</div>
          <div>
            <p>Count: {{ counter.count }}</p>
            <p>Double count: {{ counter.doubleCount }}</p>
            <button @click="counter.increment">Increment</button>
          </div>
        </div>
        <template #fallback>
          <span>Server render only</span>
          <span>loading...</span>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>