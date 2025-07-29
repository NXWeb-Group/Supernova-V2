<script setup lang="ts">
import { actions } from 'astro:actions'
const props = defineProps({
  accountInfo: Object,
})

async function logout() {
  try {
    if (!actions?.accountActions) {
      throw new Error('AI actions not available');
    }
    const status = await actions.accountActions.logout({idk: "random data that should not be necessary but idk"})
    if (status.data?.status === 'success') {
      window.location.reload()
    }
  } catch (error) {
    console.error('Failed to logout:', error)
  }
}
</script>

<template>
  <div class="flex items-center">
    <div v-if="props.accountInfo" class="flex items-center pr-8 space-x-5">
      <p class="font-poppins text-3xl text-white no-underline truncate max-w-[20ch]">
        {{ props.accountInfo.username }}
      </p>
      <button class="text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 text-2xl hover:cursor-pointer"
        @click="logout">
        Logout
      </button>
    </div>
    <a v-else
      class="mr-8 text-black bg-blue-700 font-poppins rounded-xl w-36 h-12 text-center no-underline text-2xl flex items-center justify-center"
      href="/login">Login</a>
  </div>
</template>
