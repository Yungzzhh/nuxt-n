<template>
  <div>
    <div class=" m-10 w-10 h-10 bg-red-500" id="box" @click="handleClick"></div>

    <Teleport to="body">
      <div v-if="isOpen" class="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]" @click.stop="handleClose">
        <div class="w-10 h-10 bg-red-500" id="box2" :style="modelStyle"></div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'

const isOpen = ref(false)
const modelStyle = ref<any>({})

const isScale = ref(false)

const handleClick = () => {
  const card = document.querySelector('#box')
  if (!card) return
  const cardRect = card.getBoundingClientRect()

  modelStyle.value = {
    position: 'fixed',
    top: `${cardRect.top}px`,
    left: `${cardRect.left}px`,
    width: `${cardRect.width}px`,
    height: `${cardRect.height}px`,
  }
  isOpen.value = true

  nextTick(() => {
    gsap.to('#box2', {
      top: '5%',
      left: '5%',
      width: '90vw',
      height: '90vh',
      maxHeight: `${window.innerHeight * 0.8}px`,
      duration: 0.3,
      ease: 'none'
    })
  })
}

const handleClose = () => {
  gsap.to('#box2', {
    top: modelStyle.value.top,
    left: modelStyle.value.left,
    xPercent: 0,
    yPercent: 0,
    width: modelStyle.value.width,
    height: modelStyle.value.height,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      isOpen.value = false
    }
  })
}
</script>

<style></style>