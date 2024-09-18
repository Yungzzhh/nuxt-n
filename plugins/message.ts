// // plugins/message.ts
// import { defineNuxtPlugin } from '#app'
// import MessageComponent from '~/components/Message.vue'
// import { createApp, h } from 'vue'

// interface MessageOptions {
//   content: string
//   type?: 'info' | 'success' | 'warning' | 'error'
//   duration?: number
//   size?: 'small' | 'medium' | 'large'
//   offset?: number
//   animation?: 'slide' | 'fade' | 'scale'
// }

// interface MessageInstance extends ComponentPublicInstance {
//   show: () => void
// }

// let messageQueue: MessageOptions[] = []
// let isMessageShowing = false


// const createMessage = (options: MessageOptions): MessageInstance => {
//   const container = document.createElement('div')
//   document.body.appendChild(container)
//   console.log(MessageComponent);

//   // const messageInstance = createApp(MessageComponent, { props: options }).mount(container) as MessageInstance
//   const messageInstance = createApp({
//     setup() {
//       return {
//         options
//       }
//     },
//     render() {
//       return h(MessageComponent, {
//         ...this.options
//       })
//     }
//   }).mount(container) as MessageInstance
//   // document.body.appendChild(container)
//   return messageInstance
// }

// const showMessage = (options: MessageOptions) => {
//   if (!options.content) {
//     console.error('Message content is required')
//     return
//   }
//   messageQueue.push(options)
//   if (!isMessageShowing) {
//     processQueue()
//   }
// }

// const processQueue = () => {
//   if (messageQueue.length === 0) {
//     isMessageShowing = false
//     return
//   }

//   isMessageShowing = true
//   const options = messageQueue.shift()!

//   const messageInstance = createMessage(options)
//   messageInstance.show()

//   setTimeout(() => {
//     document.body.removeChild(messageInstance.$el.parentElement!)
//     processQueue()
//   }, options.duration || 3000)
// }

// const message = {
//   info(content: string, options: Partial<MessageOptions> = {}) {
//     showMessage({ content, type: 'info', ...options })
//   },
//   success(content: string, options: Partial<MessageOptions> = {}) {
//     showMessage({ content, type: 'success', ...options })
//   },
//   warning(content: string, options: Partial<MessageOptions> = {}) {
//     showMessage({ content, type: 'warning', ...options })
//   },
//   error(content: string, options: Partial<MessageOptions> = {}) {
//     showMessage({ content, type: 'error', ...options })
//   }
// }

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.provide('message', message)
// })


export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.use(MessageComponent)
})