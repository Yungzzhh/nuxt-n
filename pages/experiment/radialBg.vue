<template>
  <NuxtLayout name="experiment">
    <section class=" p-4"
      :style="{ '--i0': i0, '--j0': j0, '--k0': k0, '--gradient-start': gradientStart, '--gradient-end': gradientEnd }">
      <div class="halftone"></div>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const i0 = ref(0)
const j0 = ref(0)
const k0 = ref(0)
const gradientStart = ref('7.5%')
const gradientEnd = ref('30%')

function handleMouseMove(event: MouseEvent) {
  i0.value = event.clientX / window.innerWidth
  j0.value = event.clientY / window.innerHeight
  k0.value = i0.value // 或者使用其他逻辑
}

function setGradientSteps(start: number, end: number, start2: number, end2: number, steps: number, delay: number) {
  const stepDifference = (start - end) / (steps - 1)
  const stepDifference2 = (start2 - end2) / (steps - 1)

  for (let i = 0; i < steps; i++) {
    setTimeout(() => {
      gradientStart.value = `${start - (i * stepDifference)}%`
      gradientEnd.value = `${start2 - (i * stepDifference2)}%`
    }, i * delay)
  }
}

function handleMouseUp() {
  setGradientSteps(7.5, 2.5, 30, 25, 10, 50)
}

function handleMouseDown() {
  setGradientSteps(2.5, 5.5, 25, 30, 10, 50)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('mousedown', handleMouseDown)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('mousedown', handleMouseDown)
})
</script>

<style>
@property --i0 {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --j0 {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --k0 {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}


:root {
  --i0: 0;
  --j0: 0;
  --k0: 0;
  --gradient-start: 7.5%;
  --gradient-end: 30%;
}

section {
  cursor: none;
  display: grid;
  height: 1000px;

  *,
  &::before {
    grid-column: 1;
    grid-row: 1;
  }

  &::before {
    background: rgba(255, 0, 0, 1);
    content: "";
  }

  --gradient-start: 7.5%;
  --gradient-end: 30%;
  --map: radial-gradient(circle at calc(var(--i0) * 100%) calc(var(--j0) * 100%),
    #777 var(--gradient-start),
    #000 var(--gradient-end));
}

.halftone {
  place-self: stretch;
  position: relative;
  z-index: 1;
  background: var(--map,
      linear-gradient(calc(var(--k0) * 360deg), #777 9%, #000)),
    var(--pattern, radial-gradient(closest-corner, #888, #000) 0 / 1em 1em round);
  background-blend-mode: screen;
  mix-blend-mode: multiply;
  filter: contrast(20);
}
</style>