<template>
  <Tab :tabs="tabs" :defaultActiveTab="0">
    <template #dopamine>
      <div class="flex flex-wrap gap-2">
        <ColorBlock v-for="color in dopamineColors" :color="color" />
      </div>
    </template>
    <template #retro>
      <div class="flex flex-wrap gap-2">
        <ColorBlock v-for="color in retroColors" :color="color" />
      </div>
    </template>
  </Tab>

  <div class="mb-4">
    渐变色
  </div>
  <div class="flex flex-wrap gap-6">
    <div v-for="(color, index) in gradientColors" :key="index" class="w-50 h-30 rounded-2xl shadow-2xl cursor-pointer "
      :style="{
        background: `linear-gradient(${color.join(', ')})`
      }" @click="handleGradientColorClick(color)" />
  </div>
</template>

<script setup lang="ts">
import Notification from '~/components/Notification/NotificationCreation';

// 多巴胺配色
let dopamineColors = [
  [
    {
      bgcolor: '#ffe101',
      textcolor: '#d92164'
    }, {
      bgcolor: '#fff3c3',
      textcolor: '#ffe101'
    }, {
      bgcolor: '#d92164',
      textcolor: '#fff3c3'
    }
  ],
  [
    {
      bgcolor: '#7fd3ff',
      textcolor: '#36cc39'
    }, {
      bgcolor: '#36cc39',
      textcolor: '#ffde23'
    }, {
      bgcolor: '#ffde23',
      textcolor: '#7fd3ff'
    }
  ],
  [
    {
      bgcolor: '#fa6c05',
      textcolor: '#ffe101'
    }, {
      bgcolor: '#ffe101',
      textcolor: '#ffff99'
    }, {
      bgcolor: '#ffff99',
      textcolor: '#fa6c05'
    }
  ],
  [
    {
      bgcolor: '#ff4491',
      textcolor: '#ffe202'
    }, {
      bgcolor: '#ffe202',
      textcolor: '#000000'
    }, {
      bgcolor: '#b3fbfe',
      textcolor: '#ff4491'
    }
  ],
  [
    {
      bgcolor: '#ee204f',
      textcolor: '#fff97b'
    }, {
      bgcolor: '#fff97b',
      textcolor: '#79c4ff'
    }, {
      bgcolor: '#79c4ff',
      textcolor: '#ee204f'
    }
  ], [
    {
      bgcolor: '#7f29e9',
      textcolor: '#1ce4b6'
    }, {
      bgcolor: '#1ce4b6',
      textcolor: '#ff7711'
    }, {
      bgcolor: '#ff7711',
      textcolor: '#71f29e9'
    }
  ]
]

// 复古配色
const retroColors = [
  [
    {
      bgcolor: '#F3A23E',
      textcolor: '#B21312'
    }, {
      bgcolor: '#B21312',
      textcolor: '#244868'
    }, {
      bgcolor: '#244868',
      textcolor: '#F3A23E'
    }
  ], [
    {
      bgcolor: '#f0cba1',
      textcolor: '#ae4516'
    }, {
      bgcolor: '#ae4516',
      textcolor: '#42563b'
    }, {
      bgcolor: '#42563b',
      textcolor: '#f0cba1'
    }
  ], [
    {
      bgcolor: '#ece1cd',
      textcolor: '#973532'
    }, {
      bgcolor: '#973532',
      textcolor: '#508897'
    }, {
      bgcolor: '#508897',
      textcolor: '#ece1cd'
    }
  ], [
    {
      bgcolor: '#edd2b6',
      textcolor: '#1a81a0'
    }, {
      bgcolor: '#1a81a0',
      textcolor: '#da6635'
    }, {
      bgcolor: '#da6635',
      textcolor: '#edd2b6'
    }
  ], [
    {
      bgcolor: '#e6f6d6',
      textcolor: '#4a496d'
    }, {
      bgcolor: '#4a496d',
      textcolor: '#d36820'
    }, {
      bgcolor: '#d36820',
      textcolor: '#e6f6d6'
    }
  ], [
    {
      bgcolor: '#f6b752',
      textcolor: '#42ab75'
    }, {
      bgcolor: '#42ab75',
      textcolor: '#c7626e'
    }, {
      bgcolor: '#c7626e',
      textcolor: '#f6b752'
    }
  ]
]

const tabs = [
  {
    title: '多巴胺配色',
    name: 'dopamine',
    content: dopamineColors
  },
  {
    title: '复古配色',
    name: 'retro',
    content: retroColors
  }
];

// 渐变
const gradientColors = [
  ['#d7b3be', '#a8b5c0'],
  ['#e5cfc7', '#6f8aa7'],
  ['#ADC4D4', '#DFD6D8'],
  ['#DBCAB5', '#C1D2C1'],
  ["#A3A4BC", "#7990A9"],
  ["#DABBAE", "#A3B7C3"],
  ['#D5AAA7', '#B9C2D2'],
  ['#EAD4C1', '#EEDAD9'],
  ['#949F97', '#EBE2AA'],
  ['#CBD5C5', '#EEE9D0'],
  ["#CFA996", "#D2BEB2"],
  ["#D7C8B4", "#DDDCD9"]
]

const handleGradientColorClick = (color: string[]) => {
  navigator.clipboard.writeText(`background: linear-gradient(${color.join(', ')})`).then(() => {
    showCustomMessage();
  });
}

const showCustomMessage = () => {
  Notification.success({
    title: '复制成功',
    message: '颜色复制成功！',
  })
}
</script>