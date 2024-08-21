<template>
  <div class="pt-24 slide-enter-content">
    <template v-if="groupedArticles.length > 0">
      <div v-for="(articles, index) in groupedArticles" :key="index" class="mb-6">
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
    </template>
    <div v-else>
      <p>No articles found.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

const groupedArticles: any = ref([])

if (Array.isArray(articles.value) && articles.value.length > 0) {
  groupedArticles.value = articles.value.reduce((acc: any, article: any) => {
    const year = new Date(article.time).getFullYear()
    console.log(year, 'year');

    let yearGroup = acc.find((group: any) => group.year === year);
    if (!yearGroup) {
      yearGroup = { year, article: [] };
      acc.push(yearGroup);
    }
    yearGroup.article.push(article);
    return acc;
  }, []);
}
console.log(groupedArticles.value);

</script>

<style></style>