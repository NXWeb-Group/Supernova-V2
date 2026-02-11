<script setup lang="ts">
import { items } from './store'
import { ref, type PropType } from 'vue'
import room from './AiRoom.vue'

const props = defineProps({
  rooms: Array as PropType<{ roomid: string; name: string }[]>,
})

const show = ref(true)
items.rooms = props.rooms || []

function toggle() {
  show.value = !show.value
}

</script>

<template>
  <div :class="show ? 'w-80' : 'w-10'"
    class="transition-all duration-300 ease-in-out border-l-2 border-black bg-gray-600">
    <div v-show="!show" class="flex p-4 justify-center">
      <span class="material-symbols-outlined hover:cursor-pointer absolute right-2" @click="toggle">
        chevron_backward </span>
    </div>
    <div v-show="show" class="flex justify-between items-center p-4 bg-gray-600 border-b-2 border-black">
      <h2 class="text-2xl font-semibold text-white">Chat Rooms:</h2>
      <span class="material-symbols-outlined hover:cursor-pointer absolute right-2" @click="toggle">
        chevron_forward </span>
    </div>
    <div v-show="show" class="overflow-y-auto h-full">
      <room v-for="item in items.rooms" :key="item.roomid" :id="item.roomid" :name="item.name" />
      <room :id="null" name="New Room" />
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
</style>
