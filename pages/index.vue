<template>
  <div class="  pt-36 slide-enter-content">
    <div v-for="articles of groupedArticles" :key="year" class="mb-6">
      <h2 class="text-3xl font-bold mb-4">{{ articles.year }}</h2>
      <div v-for="link in articles.article" :key="link._path" class="mb-4 text-gray-500">
        <div class="hover:text-black dark:hover:!text-white w-max cursor-pointer hover:translate-y-[-2px]"
          @click.stop="navigateTo(`${link._path}`)">
          <span class="text-2xl font-bold mr-2">
            {{ link.title || link._file }}
          </span>
          <span class="text-sm">{{ link.time }}</span>
        </div>
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
const { data: articles } = await useAsyncData('articles', () => queryContent('article').only(["time", "title", "_path", "_file"]).sort({
  time: -1
}).find())

const groupedArticles = ref({})

groupedArticles.value = articles.value.reduce((acc, article) => {
  const year = new Date(article.time).getFullYear()
  let yearGroup = acc.find(group => group.year === year);
  if (!yearGroup) {
    yearGroup = { year, article: [] };
    acc.push(yearGroup);
  }
  yearGroup.article.push(article);
  return acc;
}, []);



</script>

<style></style>