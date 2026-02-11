<script setup lang="ts">
import { reactive, nextTick } from 'vue'
import { actions } from 'astro:actions'
import { items } from './store'

import chat from './AiChat.vue'

const props = defineProps({
  chats: Number,
  max:Number
})

const stuff = reactive({
  text: '',
  error: '' as string | boolean,
  chats: props.chats
})

function addmessage(role: string, content: string) {
  items.chats.push({ role, content })
  nextTick(() => {
    const chatContainer = document.querySelector('.overflow-y-auto')
    chatContainer?.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: 'smooth'
    })
  })
}

async function enter(event: KeyboardEvent) {
  if (!event.shiftKey) {
    event.preventDefault()
    if (stuff.text && stuff.text.trim()) {
      if (!items.isSending) {
        try {
          items.isSending = stuff.text
          stuff.text = ''

          addmessage('user', String(items.isSending))
          if (!actions?.aiActions) {
            throw new Error('AI actions not available');
          }
          const response = await actions.aiActions.ask({
            text: items.isSending,
            roomid: items.selectedRoom,
          })
          if (!response.data?.error) {
            if (response.data?.message) {
              addmessage('assistant', response.data.message)
            }
            if (response.data?.roomid) {
              items.rooms.push({ roomid: response.data.roomid, name: 'Unnamed Room' })
              items.selectedRoom = response.data.roomid
            }
            stuff.chats = response.data?.chats;
          } else stuff.error = response.data.error
          console.log(response)
        } catch (error) {
          console.warn(error)
        } finally {
          items.isSending = false
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-x-hidden">
    <div class="flex-1 p-4 space-y-4 overflow-y-auto">
      <chat v-for="(message, index) in items.chats" :key="index" :ai="message.role !== 'user'"
        :stuff="message.content" />
      <div v-if="items.chats.length === 0" class="flex justify-center">
        <div class="text-3xl font-poppins rounded-lg px-4 py-2 break-words bg-blue-600 text-white">
          Enter a Prompt
        </div>
      </div>
      <div v-show="items.isSending" class="flex justify-start">
        <div class="bg-blue-600 rounded-lg px-12 py-2">
          <slot />
        </div>
      </div>
    </div>

    <div class="flex gap-2 p-4 py-6 items-center relative">
      <span v-if="stuff.error" class="text-red-500 absolute top-0 left-1/2">{{ stuff.error }}</span>
      <span class="text-white absolute right-4 top-0">{{ `${stuff.chats}/${props.max}` }}</span>
      <div class="relative flex-1">
        <textarea v-model="stuff.text" placeholder="Type your message" maxlength="2000"
          class="w-full px-4 py-4 rounded-lg focus:outline-hidden resize-none" @keydown.enter="enter" />
        <span class="text-black absolute bottom-4 right-4">{{ stuff.text.length }} / 2000</span>
      </div>
      <!-- <button @click="post" class="px-10 py-4 bg-title-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
            Send
          </button> -->
    </div>
  </div>
</template>
