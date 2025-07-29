<script setup lang="ts">
import { page, items, totalPages } from './Games'
</script>

<template>
  <div class="flex justify-center items-center text-xl font-bold font-poppins text-white m-3">
    <button class="m-1 hover:cursor-pointer" @click="page(1)">&lt;&lt;</button>
    <button
      v-if="items.pagenum == totalPages && items.pagenum - 2 > 0"
      class="m-1 w-8 hover:cursor-pointer"
      @click="page(items.pagenum - 2)"
    >
      {{ items.pagenum - 2 }}
    </button>
    <button
      v-if="items.pagenum - 1 > 0"
      class="m-0.5 w-8 hover:cursor-pointer"
      @click="page(--items.pagenum)"
    >
      {{ items.pagenum - 1 }}
    </button>
    <button class="m-0.5 p-1 rounded-full bg-title-blue w-10 hover:cursor-pointer">
      {{ items.pagenum }}
    </button>
    <button
      v-if="items.pagenum != totalPages && totalPages != 0"
      class="m-0.5 w-8 hover:cursor-pointer"
      @click="page(++items.pagenum)"
    >
      {{ items.pagenum + 1 }}
    </button>
    <button
      v-if="items.pagenum - 1 <= 0 && totalPages > 2"
      class="m-0.5 w-8 hover:cursor-pointer"
      @click="page(items.pagenum + 2)"
    >
      {{ items.pagenum + 2 }}
    </button>
    <button class="m-1 hover:cursor-pointer" @click="page(totalPages)">>></button>
  </div>
</template>
