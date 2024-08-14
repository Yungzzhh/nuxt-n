<template>
  <div class="json-editor">
    <textarea ref="textarea" :value="modelValue" @input="updateValue" @keydown.tab.prevent="handleTab"></textarea>
    <pre><code class="language-json" v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-json'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const textarea = ref(null)

const highlightedCode = computed(() => {
  return Prism.highlight(props.modelValue, Prism.languages.json, 'json')
})

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleTab = (event) => {
  const start = event.target.selectionStart
  const end = event.target.selectionEnd

  event.target.value = event.target.value.substring(0, start) + '  ' + event.target.value.substring(end)
  event.target.selectionStart = event.target.selectionEnd = start + 2
}

onMounted(() => {
  Prism.highlightAll()
})

watch(() => props.modelValue, () => {
  Prism.highlightAll()
})
</script>

<style scoped>
.json-editor {
  position: relative;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea,
pre {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  border: none;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
}

textarea {
  color: transparent;
  background: transparent;
  caret-color: black;
  z-index: 1;
}

pre {
  pointer-events: none;
  background-color: #f5f5f5;
  z-index: 0;
}
</style>