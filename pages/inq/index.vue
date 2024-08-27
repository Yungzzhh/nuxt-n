<template>
  <ClientOnly>
    <div :class="containerClass">
      <div v-for="(column, index) in columns" :key="index" class="flex flex-col gap-4">
        <div v-for="(item, i) in column" :key="item.id" class="w-full">
          <div class="cursor-pointer rounded-2xl transition-all duration-300 ease p-2 shadow-2xl "
            :id="`card-${item.id}`" @click="openModal(item.id)">
            <NuxtImg :src="`/temp/${item.content}`" />
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </ClientOnly>

  <Teleport to="body">
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal flex bg-white overflow-hidden" :style="modalStyle" @click.stop>
        <div class="w-2/3">
          <NuxtImg :src="`/temp/${selectedCard.content}`" class="w-full h-full object-cover" />
        </div>
        <div class="w-1/3  p-2">
          {{ selectedCard.title }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import gsap from 'gsap'
const cards = ref<any>([]);
const columns = ref<any>([]);

const containerClass = computed(() => ({
  'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5': true
}));
const isClient = typeof window !== 'undefined';
const getColumnCount = () => {
  if (!isClient) return 4; // 默认列数，可以根据需要调整
  return window.innerWidth < 640 ? 2 :
    window.innerWidth < 768 ? 3 :
      window.innerWidth < 1024 ? 4 : 5;
};
const distributeItems = () => {
  const columnCount = getColumnCount();

  columns.value = Array.from({ length: columnCount }, () => []);

  cards.value.forEach((item: any) => {
    const shortestColumn = columns.value.reduce((min: any, column: any, i: any) =>
      column.reduce((sum: any, item: any) => sum + item.height, 0) <
        columns.value[min].reduce((sum: any, item: any) => sum + item.height, 0) ? i : min, 0);

    columns.value[shortestColumn].push(item);
  });

};
watch(() => cards.value, distributeItems);

onMounted(() => {
  distributeItems();
  if (isClient) {
    window.addEventListener('resize', distributeItems);
  }
});

const fetchImage = async () => {
  const { data, status } = await useFetch('/api/image')
  if (status.value === 'success') {
    console.log(data.value)
    if (data.value) {
      cards.value = data.value!.map((item) => ({
        id: item.id,
        title: item.imageName,
        content: item.imageName,
        height: 400
      }))
    }
  }
}
fetchImage()
// 保存原始的 body overflow 样式
let originalBodyOverflow: any;

function disableScroll() {
  originalBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function enableScroll() {
  document.body.style.overflow = originalBodyOverflow
}

const isModalOpen = ref(false)
const selectedCardIndex = ref<any>(null)
const modalStyle = ref<any>({})

const selectedCard = computed(() => {
  return cards.value.find((item: any) => item.id === selectedCardIndex.value)
})

function openModal(id: any) {
  selectedCardIndex.value = id
  const card = document.querySelector(`#card-${id}`);
  if (!card) return
  const cardRect = card.getBoundingClientRect()

  modalStyle.value = {
    position: 'fixed',
    top: `${cardRect.top}px`,
    left: `${cardRect.left}px`,
    width: `${cardRect.width}px`,
    height: `${cardRect.height}px`,
  }

  isModalOpen.value = true
  window.history.pushState({}, '', `/inq/${id}`)
  disableScroll()

  // 使用 nextTick 确保 DOM 更新后再执行动画
  nextTick(() => {
    gsap.to('.modal', {
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '80vw',
      height: '80vh',
      maxHeight: `${window.innerHeight * 0.8}px`,
      duration: 0.5,
      ease: 'power2.inOut'
    })
  })
}

function closeModal() {
  gsap.to('.modal', {
    top: modalStyle.value.top,
    left: modalStyle.value.left,
    xPercent: 0,
    yPercent: 0,
    width: modalStyle.value.width,
    height: modalStyle.value.height,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      isModalOpen.value = false
      selectedCardIndex.value = null
      enableScroll()
    }
  })
}


// 确保在组件卸载时恢复滚动
onUnmounted(() => {
  if (isModalOpen.value) {
    enableScroll()
  }
})
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  width: 400px;
  height: max-content;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  transition: transform 0.3s ease;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  border-radius: 10px;
  color: white;
  overflow: hidden;
}
</style>