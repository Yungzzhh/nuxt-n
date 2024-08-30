<!-- InteractiveCard.vue -->
<template>
  <div class="card-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @click="toggleFlip">
    <div class="card-reverse" :style="cardStyle" :class="{ 'is-flipped': isFlipped }">
      <div class="card-face card-front">
        <slot name="front">Front Content</slot>
      </div>
      <div class="card-face card-back">
        <div class="card-back-content">
          <slot name="back">Back Content</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isFlipped = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}

const handleMouseMove = (event: any) => {
  amplitude.value = 20
  const rect = event.target.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
  amplitude.value = 0
}

const amplitude = ref(0)

const cardStyle = computed(() => {
  const cardWidth = 300 // Adjust based on your card size
  const cardHeight = 200 // Adjust based on your card size
  const rotateY = ((mouseX.value - cardWidth / 2) / cardWidth) * amplitude.value
  const rotateX = -((mouseY.value - cardHeight / 2) / cardHeight) * amplitude.value

  let transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  if (isFlipped.value) {
    transform += ' rotateY(180deg)'
  }

  return {
    transform
  }
})

</script>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.card-reverse {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

.card-reverse.is-flipped {
  transform: rotateX(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-front {
  background-color: #3498db;
  color: white;
}

.card-back {
  background-color: #2ecc71;
  color: white;
  transform: rotateX(180deg);
}

.card-back-content {
  transform: rotateZ(180deg);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>