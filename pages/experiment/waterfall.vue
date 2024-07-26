<template>
  <NuxtLayout name="experiment">
    <div class="container mx-auto ">
      <ClientOnly>
        <WaterfallLayout :items="images" />
      </ClientOnly>
      <div v-if="loading" class="loading">
        加载中...
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import WaterfallLayout from '~/components/WaterfallLayout.vue';

const images = ref([]);
const loading = ref(false);
const page = ref(2);
const toBottomDistance = 100;

const fetchImages = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page.value}&limit=30`);
    const data = await response.json();
    const newImages = data.map((item, index) => ({
      id: `${page.value}-${index}`,
      src: item.download_url,
      alt: `Image ${images.value.length + index + 1}`,
      height: item.height * (300 / item.width) // 将宽度标准化为300px，等比缩放高度
    }));
    images.value = [...images.value, ...newImages];
    page.value++;
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - scrollTop <= clientHeight + toBottomDistance && !loading.value) {
    fetchImages();
  }
};

onMounted(() => {
  fetchImages();
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 1rem;
}
</style>