<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
function onClick() {
  count.value++
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col justify-center h-screen items-center">
      <h1 class="text-3xl font-bold underline py-2">Hello world!</h1>
      <button
        class="text-gray-800 border border-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2py-2"
        @click="onClick()"
      >
        Click
      </button>
      <p class="text-gray-800 py-2">Count: {{ count }}</p>
    </div>
  </div>
</template>

<style></style>
