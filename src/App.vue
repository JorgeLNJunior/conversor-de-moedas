<script setup lang="ts">
import NavBar from '@components/NavBar.vue'
import MainCard from '@components/MainCard.vue'

if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
</script>

<template>
  <NavBar />
  <div class="container mx-auto dark:bg-slate-800">
    <div class="flex justify-center items-center pt-40">
      <MainCard />
    </div>
  </div>
</template>
