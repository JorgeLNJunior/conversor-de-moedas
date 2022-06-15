<script setup lang="ts">
import ThemeSwitch from '@components/utils/ThemeSwitch.vue'
</script>

<template>
  <nav
    class="bg-white border-b border-gray-200 px-2 py-2.5 rounded-b dark:bg-slate-800 dark:border-slate-700"
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="#" class="flex items-center">
        <img src="../assets/logo.png" class="h-10 mr-3" alt="logo" />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-gray-200"
        >
          Conversor de Moedas
        </span>
      </a>
      <div>
        <ThemeSwitch />
      </div>
    </div>
  </nav>
</template>
