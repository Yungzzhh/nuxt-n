import { defineConfig } from 'unocss'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        'icon-park-solid': () => import('@iconify-json/icon-park-solid/icons.json').then(i => i.default),
      }
    }),
  ],
  // 自定义规则
  rules: [
    ['custom-rule', { color: 'red' }]
  ],
  // 自定义快捷方式
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-green': 'text-white bg-green-500 hover:bg-green-700',
    'standard-layout': 'max-w-4xl mx-a px-2',
    'blog-link': 'text-3xl font-bold opacity-60 hover:opacity-100 cursor-pointer mb-3',
    'text-up': 'opacity-0 translate-y-full animate-[slide-up_2s_forwards]'
  },
  theme: {
    keyframes: {
      'slide-up': '{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}'
    },
    colors: {
      primary: {
        light: '',
        dark: '',
      }
    },
    extend: {
      animation: {
        'circle-expand': 'circle-expand 0.5s ease-out forwards',
      },
      keyframes: {
        'circle-expand': {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(200)',
            opacity: '1',
          },
        },
      },
    },
  },
})