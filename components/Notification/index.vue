<template>
  <transition-group name="notification" tag="div" class="notification-container" v-if="notifications.length > 0" :style="{
    ...containerPositionStyle
  }">
    <div v-for="item in notifications" :key="item.id" class="notification" :class="item.type">
      <div class="notification-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.message }}</p>
      </div>
      <button class="close-btn" @click="close(item.id)">×</button>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Notification {
  id: number
  title?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  top?: number
}

const props = withDefaults(defineProps<{
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}>(), {
  position: 'top-right'
})

const containerPositionStyle = computed(() => {
  return {
    'top-right': {
      right: '20px',
      top: '20px',
    },
    'top-left': {
      left: '20px',
      top: '20px',
    },
    'bottom-right': {
      right: '20px',
      bottom: '20px',
      flexDirection: 'column-reverse' as const
    },
    'bottom-left': {
      left: '20px',
      bottom: '20px',
      flexDirection: 'column-reverse' as const
    }
  }[props.position]
})

const notifications = ref<Notification[]>([])

const add = (notification: Omit<Notification, 'top'>) => {
  notifications.value.push({ ...notification })
  setTimeout(() => {
    remove(notification.id)
  }, notification.duration || 3000)
}

const remove = (id: number) => {
  const index = notifications.value.findIndex(item => item.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
  }
}

const close = (id: number) => {
  remove(id)
}

defineExpose({
  add
})
</script>

<style scoped>
.notification-container {
  position: fixed;
  z-index: 9999;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.notification {
  width: 300px;
  margin-bottom: 10px;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: start;
}

.notification.info {
  background-color: #e6f7ff;
  color: #1890ff;
}

.notification.success {
  background-color: #f6ffed;
  color: #52c41a;
}

.notification.warning {
  background-color: #fffbe6;
  color: #faad14;
}

.notification.error {
  background-color: #fff2f0;
  color: #ff4d4f;
}

.notification-content {
  flex: 1;
  margin-right: 16px;
}

.close-btn {
  border: none;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
}


/* 添加过渡效果的样式 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* 其他样式保持不变 */
</style>