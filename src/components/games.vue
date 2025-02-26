<script setup lang="ts">
import { reactive, onMounted, computed, ref } from "vue";

interface Game {
  name: string;
  file: string;
  root: string;
  img: string;
}

const DEFAULT_PARAMS = {
  search: '',
  page: '1'
};

const searchInput = ref(null);
// Move URL params initialization inside setup
const items = reactive({
  all: [] as Game[],
  page: [] as Game[],
  pagenum: 1,
  itemsperpage: 25,
  search: "",
  inputFocused: false,
  dropdown: false,
  urlParams: {
    search: DEFAULT_PARAMS.search,
    page: parseInt(DEFAULT_PARAMS.page)
  },
});

// Initialize URL params in onMounted
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  items.urlParams = {
    search: urlParams.get('search') || DEFAULT_PARAMS.search,
    page: parseInt(urlParams.get('page') || DEFAULT_PARAMS.page)
  };
  fetchStuff();
});

// Modify setParams to check for window
function setParams(search: string, page: number) {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', page.toString());
  urlParams.set('search', search);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
  items.urlParams = {
    search: search,
    page: page
  };
}

async function fetchStuff() {
  try {
    const response = await fetch("/cdn/games.json");
    const data = await response.json();
    items.all = data.sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );
    items.search = items.urlParams.search;

    page(items.urlParams.page);
  } catch (error) {
    console.error('Failed to fetch games:', error);
  }
}

const totalPages = computed(() => {
  if (items.urlParams.search)
    return Math.ceil(lastSearchResultsLength.value / items.itemsperpage);
  return Math.ceil(items.all.length / items.itemsperpage);
});

const lastSearchResultsLength = computed(() => {
  return items.all.filter((game) =>
    game.name.toLowerCase().includes(items.urlParams.search.toLowerCase())
  ).length;
});

const filteredResults = computed(() => {
  if (!items.search) return [];
  return items.all.filter((game) =>
    game.name.toLowerCase().includes(items.search.toLowerCase())
  );
});

const dropdown = computed(() => {
  return filteredResults.value.length && (items.inputFocused || items.dropdown);
});


function page(num: number) {
  if (num > totalPages.value) num = totalPages.value;
  if (num < 1) num = 1;
  items.pagenum = num;
  if (!items.search) {
    setParams("", num)
    items.page = items.all.slice(
      (num - 1) * items.itemsperpage,
      num * items.itemsperpage
    );
  } else {
    setParams(items.search, num)
    items.page = filteredResults.value.slice(
      (num - 1) * items.itemsperpage,
      num * items.itemsperpage
    );
  }
}

function select(file: string, root: string) {
  const path = "/cdn/" + root + "/" + file;
  if (root === "webretro") {
    window.location.href = "/Iframe/cdn/webretro/index.html?core=autodetect&rom=" + file;
  } else {
    window.location.href = "/Iframe" + path;
  }
}
const handleEnterKey = () => {
  page(0)
  items.dropdown = false
  if (searchInput.value !== null) {
    (searchInput.value as HTMLInputElement).blur();
  }
}

</script>

<template>
  <div class="flex justify-center m-6">
    <div class="relative w-96 sm:w-textw">
      <input v-model="items.search" class="w-full rounded-3xl outline-none transition-all h-12 text-center text-2xl"
        ref="searchInput" :class="{
          'rounded-t-md rounded-b-none': dropdown,
          'focus:rounded-md': !dropdown,
        }" placeholder="Search Games" type="text" @keyup.enter="handleEnterKey" @focus="items.inputFocused = true"
        @blur="items.inputFocused = false" />
      <Transition name="slide">
        <div v-if="dropdown"
          class="absolute top-full left-0 w-full bg-white rounded-b-lg z-10 max-h-96 overflow-x-clip overflow-y-scroll shadow-lg"
          @mouseenter="items.dropdown = true" @mouseleave="items.dropdown = false">
          <ul class="list-none text-center">
            <li v-for="game in filteredResults" :key="`${game.root}-${game.file}`" class="p-2 hover:bg-gray-200 cursor-pointer"
              @click="select(game.file, game.root)">
              {{ game.name }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 pt-10">
    <div v-for="game in items.page" :key="`${game.root}-${game.file}`" class="flex flex-col items-center hover:cursor-pointer"
      @click="select(game.file, game.root)">
      <div class="flex justify-center items-center w-44 h-44">
        <img class="rounded-3xl m-3 hover:cursor-pointer max-w-full max-h-full"
          :src="'/cdn/' + game.root + '/' + game.img" />
      </div>
      <h2 class="text-white text-center font-poppins text-lg">
        {{ game.name }}
      </h2>
    </div>
  </div>

  <div class="flex justify-center items-center text-xl font-bold font-poppins text-white m-3">
    <button class="m-1" @click="page(1)">&lt;&lt;</button>
    <button v-if="items.pagenum == totalPages && items.pagenum - 2 > 0" class="m-1 w-8"
      @click="page(items.pagenum - 2)">
      {{ items.pagenum - 2 }}
    </button>
    <button v-if="items.pagenum - 1 > 0" class="m-0.5 w-8" @click="page(--items.pagenum)">
      {{ items.pagenum - 1 }}
    </button>
    <button class="m-0.5 p-1 rounded-full bg-title-blue w-10">
      {{ items.pagenum }}
    </button>
    <button v-if="items.pagenum != totalPages && totalPages != 0" class="m-0.5 w-8" @click="page(++items.pagenum)">
      {{ items.pagenum + 1 }}
    </button>
    <button v-if="items.pagenum - 1 <= 0 && totalPages > 2" class="m-0.5 w-8" @click="page(items.pagenum + 2)">
      {{ items.pagenum + 2 }}
    </button>
    <button class="m-1" @click="page(totalPages)">>></button>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
