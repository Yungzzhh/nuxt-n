<template>
  <div class="w-full">
    <div class="flex justify-between items-center standard-layout h-18">
      <div class="font-600 text-3xl">Michael`s Blog</div>
      <div class="flex flex-row items-center gap-2xl">
        <div v-for="link of linkList" :key="link.title">
          <div class="flex items-end font-bold opacity-60  hover:opacity-100 cursor-pointer"
            @click="navigateTo(link.path)">
            <div>{{ link.title }}</div>
          </div>
        </div>
        <div class="relative text-xl cursor-pointer" @click="handleToggleClick">
          <div class="inset-0 transition-opacity duration-300" :class="[
            isDark ?
              'i-icon-park-solid:dark-mode' : 'i-icon-park-solid:sun'
          ]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const linkList = [
  { title: 'Home', path: '/' },
  { title: 'Experiment', path: '/experiment' },
]

const isDark = ref(false)
const isAnimating = ref(false)

const handleToggleClick = (event: MouseEvent) => {
  if (isAnimating.value) return

  isAnimating.value = true
  const toggle = event.currentTarget as HTMLElement
  toggle.classList.add('animate')

  setTimeout(() => {
    toggle.classList.toggle('active')
    toggleTheme(event)
  }, 150)

  setTimeout(() => {
    toggle.classList.remove('animate')
    isAnimating.value = false
  }, 300)
}

const toggleTheme = (event: MouseEvent) => {
  const willDark = !isDark.value

  // 检查浏览器是否支持 View Transitions API
  if (!document.startViewTransition || isReducedMotion()) {
    toggleDark()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
      {
        clipPath: willDark ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: willDark
          ? '::view-transition-new(root)'
          : '::view-transition-old(root)'
      }
    )
  })
}

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const isReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
}

// 初始化主题
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

</script>