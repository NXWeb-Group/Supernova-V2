<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import { items, selectRoom, removeRoom } from './store'
import { actions } from 'astro:actions'

const props = defineProps({
  name: String,
  id: {
    type: [String] as PropType<string | null>,
    default: null,
  },
})

const roomname = ref(props.name)
const edit = ref(false)

async function remove(event: MouseEvent) {
  event.stopPropagation()
  try {
    if (props.id) {
      if (!actions?.aiActions) {
        throw new Error('AI actions not available');
      }

      const response = await actions.aiActions.deleteRoom({
        roomid: props.id,
      })
      removeRoom(props.id)
    }
  } catch (error) {
    console.error('Failed to remove room:', error)
  }
}

function editName(event: MouseEvent) {
  event.stopPropagation()
  edit.value = true
}

async function rename() {
  edit.value = false
  try {
    if (!actions?.aiActions) {
      throw new Error('AI actions not available');
    }
    const response = await actions.aiActions.renameRoom({
      roomid: props.id,
      roomname: roomname.value,
    })
  } catch (error) {
    console.error('Failed to rename room:', error)
  }
}
</script>

<template>
  <div class="p-2 m-3 cursor-pointer transition-colors border-black rounded-lg flex justify-between items-center"
    :class="{
      'hover:bg-gray-500 hover:border': items.selectedRoom !== id,
      'bg-blue-500': items.selectedRoom === id,
    }" @click="selectRoom(props.id)">
    <input v-if="edit === true" v-model="roomname" class="rounded-md" type="text" @click.stop @keydown.enter="rename" />
    <p v-if="edit === false" class="text-xl text-gray-100 overflow-hidden w-4/5">
      {{ roomname || 'Unnamed Room' }}
    </p>
    <div v-if="id !== null">
      <span class="material-symbols-outlined" @click="editName"> edit </span>
      <span class="material-symbols-outlined" @click="remove"> delete </span>
    </div>
  </div>
</template>
