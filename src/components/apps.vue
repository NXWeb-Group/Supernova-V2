<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface App {
  alt: string
  url: string
  type: string
  img: string
}

const loadScramjet = async () => {
  try {
    const module = await import('../assets/scramjet.ts')
    return module.scramjet
  } catch (error) {
    console.error('Failed to load search module:', error)
    return null
  }
}

let scramjet: null | any
const items = ref<App[]>([])

async function fetchStuff() {
  try {
    const response = await fetch('/cdn/apps.json')
    items.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch apps:', error)
  }
}

function go(url: string, type: string) {
  if (type == 'uv') {
    window.location.href = '/Iframe' + __uv$config.prefix + __uv$config.encodeUrl(url)
  } else if (type == 'scramjet') {
    if (scramjet) {
      window.location.href = '/Iframe' + scramjet.encodeUrl(url)
    } else {
      console.error('scramjet is null')
    }
  } else {
    window.location.href = '/Iframe' + url
  }
}
onMounted(async () => {
  scramjet = await loadScramjet()
  fetchStuff()
})
</script>

<template>
  <div>
    <h1 class="font-rubik text-center text-title-blue text-7xl p-16">Apps</h1>
    <div class="flex flex-wrap justify-center">
      <div v-for="app in items" :key="app.alt" class="p-2">
        <button @click="go(app.url, app.type)">
          <img class="w-60 h-60 rounded-3xl hover:cursor-pointer" :src="app.img" :alt="app.alt" />
        </button>
      </div>
    </div>
  </div>
</template>
