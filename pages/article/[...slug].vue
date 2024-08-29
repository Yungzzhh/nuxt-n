<template>
  <div class="w-full relative">
    <main class=" mt-10 slide-enter-content">
      <ContentDoc v-slot="{ doc }">
        <article class="blog-post">
          <header class="post-header">
            <h1 class="post-title">{{ doc?.title }}</h1>
            <div class="post-meta">
              <time class="post-time">{{ doc.time }}</time>
            </div>
          </header>
          <div class="post-description">
            <p>{{ doc.description }}</p>
          </div>
        </article>

        <div class="prose">
          <ContentRenderer :value="doc" :components="components">

            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </div>

      </ContentDoc>
      <ClientOnly>
        <Giscus repo="Yungzzhh/nuxt-n" repoId="R_kgDOMay9Dw" category="General" categoryId="DIC_kwDOMay9D84CiBwf"
          mapping="pathname" inputPosition="top" theme="light" lang="zh-CN" />
      </ClientOnly>
    </main>
  </div>
</template>

<script setup>
import FancyHeader from '~/components/content/FancyHeader.vue';
import { defineAsyncComponent } from 'vue'

const Giscus = defineAsyncComponent(() => import('@giscus/vue'))
const components = {
  'fancy-header': FancyHeader
}
const route = useRoute()
const res = await useAsyncData(`content-${route.path}`, () =>
  queryContent(route.path).findOne()
)
// const catalogList = res.data.value.body.children.filter((item) => item.tag === 'h2');

// console.log(catalogList);

</script>

<style scoped>
.blog-post {
  /* max-width: 800px; */
  font-family: Arial, sans-serif;
}

.post-header {
  margin-bottom: 20px;
}

.post-title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.post-meta {
  font-size: 0.9em;
  color: #666;
}

.post-time {
  font-style: italic;
}

.post-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #444;
}
</style>