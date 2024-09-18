<template>
  <div class="relative w-80 h-80">
    <div v-for="(color, index) in props.color"
      :class="[getPosition(index), 'absolute w-40 h-40 cursor-pointer shadow-2xl rounded-3xl']"
      :style="{ backgroundColor: color.bgcolor }" @click="handleClick(color)">
      <div :class="[getTextPosition(index), 'absolute text-xl font-bold']" :style="{ color: color.textcolor }">{{
        color.bgcolor }}</div>
    </div>
  </div>

  <transition enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-x-full opacity-0" enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition duration-300 ease-in" leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0">
    <div v-if="show" class="alert" :style="{
      backgroundColor: alertColor.backgroundColor,
      color: alertColor.color
    }">
      颜色复制成功！</div>
  </transition>
</template>

<script setup lang="ts">
interface Color {
  bgcolor: string,
  textcolor: string
}
const props = defineProps<{
  color: Color[]
}>();

const getPosition = (index: number) => {
  if (index === 0) {
    return 'top-0 left-0 z-20'
  } else if (index === 1) {
    return 'top-10 right-20 z-30'
  } else if (index === 2) {
    return 'bottom-20 left-4 z-10 '
  }
};

const getTextPosition = (index: number) => {
  if (index === 0) {
    return 'top-4 left-4'
  } else if (index === 1) {
    return 'top-4 right-4'
  } else if (index === 2) {
    return 'bottom-4 left-4'
  }
};

const alertColor = ref({
  color: '#ffffff',
  backgroundColor: '#000000'
})

const show = ref(false);

const handleClick = (color: Color) => {
  alertColor.value.color = color.textcolor
  alertColor.value.backgroundColor = color.bgcolor
  navigator.clipboard.writeText(color.bgcolor).then(() => {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 2000); // 2秒后消失
  });
}

</script>
<style scoped>
.alert {
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  top: 0px;
  right: 20px;
  z-index: 1000;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 2s ease, opacity 2s ease;
}

.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>