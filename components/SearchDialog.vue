<!-- GlobalSearch.vue -->
<template>
  <div>
    <Teleport to="body">
      <div v-if="isDialogOpen" class="dialog-overlay" @click="closeDialog">
        <div class="dialog" @click.stop>
          <div class="search-input-wrapper">
            <Icon name="uil:search" class="search-icon" />
            <input ref="searchInput" v-model="searchQuery" placeholder="Search documentation..."
              @keyup.esc="closeDialog" @keydown.down.prevent="navigateResults('down')"
              @keydown.up.prevent="navigateResults('up')" @keydown.enter.prevent="handleEnter" />
            <kbd class="keyboard-shortcut">ESC</kbd>
          </div>
          <ul v-if="searchResults.length" class="search-results">
            <li v-for="(result, index) in searchResults" :key="result.id">
              <NuxtLink :to="`${result.id}`" @click="closeDialog">
                <div class="flex items-center gap-2" :class="{ 'text-emerald': index === activeIndex }">
                  <div class="i-uil:file-edit-alt"></div>
                  {{ result.title }}
                </div>
                <div class="text-sm mt-2" v-html="highlightMatch(result.content, searchQuery)"></div>
              </NuxtLink>
            </li>
          </ul>
          <ul v-else class="search-results">
            <li v-for="(link, index) in defaultTemplateList" :key="link.id" class="flex gap-2 items-center">
              <div class="text-xl"
                :class="[{ 'text-emerald': index === activeIndex }, { 'text-white': index !== activeIndex }, link.icon]" />
              <NuxtLink :to="`${link.id}`" @click="closeDialog">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const defaultTemplateList = [
  {
    id: '/',
    title: 'Home',
    icon: 'i-uil:home'
  },
  {
    id: '/article',
    title: 'Article',
    icon: 'i-uil:file-edit-alt'
  }, {
    id: '/experiment',
    title: 'Experiment',
    icon: 'i-uil:brackets-curly'
  }
]

const isDialogOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<any>(null)
const searchResults = ref<any[]>([])
const activeIndex = ref(-1)

const openDialog = () => {
  isDialogOpen.value = true
  setTimeout(() => {
    searchInput.value.focus()
  }, 0)
}

const closeDialog = () => {
  isDialogOpen.value = false
  searchQuery.value = ''
  activeIndex.value = -1
}

const performSearch = async () => {
  if (searchQuery.value.trim() === '') {
    searchResults.value = []
    return
  }

  const res = await searchContent(searchQuery)
  console.log(res.value);
  searchResults.value = res.value as any[]
  activeIndex.value = -1
}

const listForNavigation = computed(() => {
  return searchResults.value.length ? searchResults.value : defaultTemplateList
})

const navigateResults = (direction: 'up' | 'down') => {
  console.log(listForNavigation.value);
  const listLength = listForNavigation.value.length

  if (listLength === 0) return
  if (direction === 'down') {
    activeIndex.value = (activeIndex.value + 1) % listLength
  } else {
    activeIndex.value = (activeIndex.value - 1 + listLength) % listLength
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.metaKey && event.key === 'k') {
    event.preventDefault()
    openDialog()
  }
}

const handleEnter = () => {
  if (activeIndex.value !== -1 && listForNavigation.value.length > 0) {
    const selectedResult = listForNavigation.value[activeIndex.value];
    navigateTo(`${selectedResult.id}`);
    closeDialog();
  }
}

const highlightMatch = (text: string, searchQuery: string) => {
  if (!searchQuery) return text;
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  return text.replace(regex, '<span class=" text-emerald">$1</span>');
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(searchQuery, performSearch)
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  z-index: 1000;
}

.dialog {
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #333;
}

.search-icon {
  color: #00dc82;
  font-size: 20px;
  margin-right: 12px;
}

input {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
}

input::placeholder {
  color: #888;
}

.keyboard-shortcut {
  background-color: #333;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
}

.search-results {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
}

.search-results li {
  padding: 12px 16px;
  border-bottom: 1px solid #333;
}

.search-results li:last-child {
  border-bottom: none;
}

.search-results a {
  color: #fff;
  text-decoration: none;
  display: block;
}

.search-results a:hover {
  color: #00dc82;
}

.search-results li.active {
  background-color: rgba(0, 220, 130, 0.1);
}

.search-results li.active a {
  color: #00dc82;
}

/* 
.search-results li.active .icon {
  color: #00dc82;
} */

.highlight {
  background-color: yellow;
  font-weight: bold;
}
</style>