<template>
  <div>
    <textarea class="textarea" rows="4" cols="50" />
  </div>
  <div class=" mt-20 mx-auto max-w-5xl flex gap-20 overflow-x-auto">
    <div v-for="image in newImages" :key="image.id" class="flex-none w-1/3 article">
      <img :src="image.src" :alt="image.alt" height="300" class="w-full object-cover" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=30`);
const data = await response.json();
const newImages = data.map((item: any, index: number) => ({
  id: `1-${index}`,
  src: item.download_url,
  alt: `Image ${index + 1}`, // 将宽度标准化为300px，等比缩放高度
}));

</script>

<style>
.container {
  width: 100%;
  overflow-y: auto;
}

#section1,
#section3 {
  height: 500px;
}

#section2 {
  height: 700px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}


/* 为了演示效果，给每个部分添加不同的背景色 */
#section1 {
  background-color: #f0f0f0;
}

#section2 {
  background-color: #e0e0e0;
}

#section3 {
  background-color: #d0d0d0;
}

.card {
  flex: 0 0 auto;
  width: 200px;
  height: 300px;
  margin-right: 20px;
  background-color: #4CAF50;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border-radius: 10px;
}


.textarea {
  /* padding-block: 10px;
  scroll-padding-block: 10px; */
  padding: 10px 15px;
}
</style>