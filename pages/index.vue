<template>
  <div class=" pt-16 slide-enter-content ">
    <div class="hidden md:block mb-4">Welcome to my blog 👋, try `Command + K` to search.</div>
    <div class="mb-2 text-2xl font-bold mb-4">About me</div>
    <div class="text-[#555555]">
      <div class=" mb-2">A frontend developer</div>
      <div class=" mb-2">Expanding knowledge of AI, Apps, Backends, O&M, and more.</div>
      <div class=" mb-2">Techs: Next, Nuxt, Tailwind, Node, Flutter, and more.</div>
      <div class=" mb-2">U can find some <span class="link">
          <NuxtLink to="/article">notes</NuxtLink>
        </span> & <span class="link">
          <NuxtLink to="/experiment">some thoughts</NuxtLink>
        </span> here.</div>
      <div class=" mb-2">Find me on</div>
      <div>
        <NuxtLink to="https://github.com/Yungzzhh" target="_blank" class="w-max flex items-center gap-1 link">
          <div class=" i-uil:github"></div>
          <div>Github</div>
        </NuxtLink>
      </div>
      <div class="mt-4">Or mail me at michaelyung0123@gmail.com </div>
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

</script>

<style>
.glow-text {
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
}
</style>