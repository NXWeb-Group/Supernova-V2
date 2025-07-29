<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { search, defaultConfig } from '../assets/stuff.ts'


const loadScramjet = async () => {
  try {
    const module = await import('../assets/scramjet.ts')
    return module.scramjet
  } catch (error) {
    console.error('Failed to load search module:', error)
    return null
  }
}

// can't import $scramjetLoadController() because import with script after build
let scramjet: null | any

onMounted(async () => {
  data.proxy = localStorage.getItem('proxy') || defaultConfig.proxy
  scramjet = await loadScramjet()
})

const props = defineProps({
  uvimg: String,
  sjimg: String,
})

const data = reactive({
  text: '',
  proxy: '',
})

function go() {
  const url = search(data.text)
  if (data.proxy === 'uv') {
    window.location.href = '/Iframe' + __uv$config.prefix + __uv$config.encodeUrl(url)
  } else if (data.proxy === 'scramjet') {
    if (scramjet) {
      window.location.href = '/Iframe' + scramjet.encodeUrl(url)
    } else {
      console.error('scramjet is null')
    }
  } else {
    window.location.href = '/Iframe' + url
  }
}
</script>
<template>
  <div>
    <div class="flex justify-center p-5">
      <img
        v-if="data.proxy === 'uv'"
        :src="props.uvimg"
        alt="uv logo"
        style="width: 20%; height: 20%"
      />
      <img
        v-if="data.proxy === 'scramjet'"
        :src="props.sjimg"
        alt="scramjet logo"
        style="width: 30%; height: 30%"
      />
    </div>
    <div class="flex justify-center">
      <form @submit.prevent="go">
        <input
          v-model="data.text"
          type="text"
          class="w-96 md:w-[45rem] lg:w-textw h-16 m-2 font-poppins rounded-3xl text-2xl placeholder:text-gray-500"
          placeholder="Search the web freely"
        />
      </form>
    </div>
  </div>
</template>
