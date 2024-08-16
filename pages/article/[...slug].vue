<template>
  <main class="prose standard-layout slide-enter-content">
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

      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>

<script setup>
const route = useRoute()
const res = await useAsyncData(`content-${route.path}`, () =>
  queryContent(route.path).findOne()
) 
</script>

<style scoped>
.blog-post {
  max-width: 800px;
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