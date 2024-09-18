import { createVNode, render } from 'vue'
import Notification from './index.vue'

interface NotificationOptions {
  title?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number,
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

let seed = 1
let vm: any = null

const createNotification = (options: NotificationOptions) => {
  if (!vm) {
    const container = document.createElement('div')
    vm = createVNode(Notification, { position: options.position })
    render(vm, container)
    document.body.appendChild(container.firstElementChild!)
  }
  const id = seed++
  vm.component?.exposed?.add({
    id,
    ...options,
  })
}

export default {
  info(options: NotificationOptions) {
    createNotification({ ...options, type: 'info' })
  },
  success(options: NotificationOptions) {
    createNotification({ ...options, type: 'success' })
  },
  warning(options: NotificationOptions) {
    createNotification({ ...options, type: 'warning' })
  },
  error(options: NotificationOptions) {
    createNotification({ ...options, type: 'error' })
  }
}