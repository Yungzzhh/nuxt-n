<template>
  <div class=" standard-layout pt-36 slide-enter-content">
    <div v-for="link of articles" class="mb-6 text-gray-500 hover:text-black cursor-pointer"
      @click="navigateTo(`${link._path}`)">
      <div @click="navigateTo(`${link._path}`)" class="dark:hover:!text-white">
        <span class="text-2xl font-bold  mr-2">
          {{ link.title || link._file }}
        </span>
        <span class="text-sm">{{ link.time }}</span>
      </div>
    </div>
  </div>
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
// const isFirstPage = computed(() => currentPage.value === 1)
// const isLastPage = computed(() => currentPage.value === totalPages.value)
// const { currentPage, totalPages, setCurrentPage, setTotalPages } = usePagination()

// const limit = 999
// const skip = computed(() => (currentPage.value - 1) * limit)


// const { data: articles } = await useAsyncData('articles', () => queryContent('article')
//   .skip(skip.value)
//   .limit(limit)
//   .find()
// )
// // 获取文章总数
// const { data: totalArticles } = await useAsyncData('totalArticles', () =>
//   queryContent('article').count()
// )
// setTotalPages(Math.ceil(totalArticles.value / limit))

// function changePage(newPage) {
//   if (newPage < 1 || newPage > totalPages.value) return
//   setCurrentPage(newPage)
// }

// // 当页面改变时，重新获取文章
// watch(currentPage, async () => {
//   console.log(currentPage.value, 'currentPage');

//   await refreshNuxtData('articles')
// })
const { data: articles } = await useAsyncData('articles', () => queryContent('article')
  .find()
)

</script>

<style></style>