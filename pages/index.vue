<template>
  <div class=" standard-layout pt-36 slide-enter-content">
    <div v-for="link of articles" class="mb-6 text-gray-500 hover:text-black cursor-pointer"
      @click="navigateTo(`${link._path}`)">
      <div @click="navigateTo(`${link._path}`)">
        <span class="text-2xl font-bold  mr-2">
          {{ link.title || link._file }}
        </span>
        <span class="text-sm">{{ link.time }}</span>
      </div>
    </div>

  </div>
  <template v-if="totalPages !== 1">
    <div class="standard-layout flex justify-between pt-18">
      <div @click="changePage(currentPage - 1)" class="i-icon-park-solid:arrow-circle-left text-2xl"
        :class="isFirstPage ? 'text-coolgray  cursor-not-allowed' : ''"></div>
      <span class="text-gray-700">{{ currentPage }} / {{ totalPages }}</span>
      <div @click="changePage(currentPage + 1)" class="i-icon-park-solid:arrow-circle-right text-2xl"
        :class="isLastPage ? 'text-coolgray cursor-not-allowed' : ''"></div>
    </div>
  </template>
</template>

<script setup>
useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'This is the home page of my blog'
    }
  ]
})
const isFirstPage = computed(() => currentPage.value === 1)
const isLastPage = computed(() => currentPage.value === totalPages.value)
const { currentPage, totalPages, setCurrentPage, setTotalPages } = usePagination()

const limit = 999
const skip = computed(() => (currentPage.value - 1) * limit)


const { data: articles } = await useAsyncData('articles', () => queryContent('article')
  .skip(skip.value)
  .limit(limit)
  .find()
)
// 获取文章总数
const { data: totalArticles } = await useAsyncData('totalArticles', () =>
  queryContent('article').count()
)
setTotalPages(Math.ceil(totalArticles.value / limit))

function changePage(newPage) {
  if (newPage < 1 || newPage > totalPages.value) return
  setCurrentPage(newPage)
}

// 当页面改变时，重新获取文章
watch(currentPage, async () => {
  console.log(currentPage.value, 'currentPage');

  await refreshNuxtData('articles')
})
</script>

<style>
.text-up {
  opacity: 0;
  transform: translateY(100%);
  animation: slide-up 1s forwards;
}

@keyframes slide-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>