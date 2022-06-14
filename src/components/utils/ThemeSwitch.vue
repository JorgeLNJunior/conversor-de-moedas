<script setup lang="ts">
import SunIcon from '@components/icons/SunIcon.vue'
import MoonIcon from '@components/icons/MoonIcon.vue'

import { onBeforeMount, ref } from 'vue'

const theme = ref<'dark' | 'light'>('light')

onBeforeMount(() => {
  const themeStorageValue = localStorage.getItem('theme')

  if (themeStorageValue === 'light') theme.value = 'light'
  if (themeStorageValue === 'dark') theme.value = 'dark'

  if (!themeStorageValue) theme.value = 'light'
})

function switchTheme() {
  if (localStorage.theme === 'dark') {
    theme.value = 'light'
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
  } else {
    theme.value = 'dark'
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
  }
}
</script>

<template>
  <button
    class="rounded-md p-2 hover:bg-slate-300 focus:ring-green-300 focus:ring-2 focus:outline-none dark:hover:bg-slate-900 dark:focus:ring-green-700"
    @click="switchTheme()"
  >
    <SunIcon v-if="theme === 'dark'" />
    <MoonIcon v-else />
  </button>
</template>
