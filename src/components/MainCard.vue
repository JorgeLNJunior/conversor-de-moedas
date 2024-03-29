<script setup lang="ts">
import { CurrencyApi } from '@api/Currency.api'
import LoadingIcon from '@components/icons/LoadingIcon.vue'
import MoneyIcon from '@components/icons/MoneyIcon.vue'
import PageLoader from '@components/loaders/PageLoader.vue'
import { currencyData } from '../data/Currency.data'

import { AxiosError } from 'axios'
import { onBeforeMount, reactive, ref, watch } from 'vue'

const api = new CurrencyApi()

const style = reactive({
  isBtnDisabled: false,
  isLoading: false
})

let convertionResult = ref<string>('0.00')

const ammount = reactive({
  value: 272.45,
  from: currencyData.from[0],
  to: currencyData.to[11] || currencyData.to[0] // American Dollar (index 11) or index 0 to prevent undefined values.
})

const options = reactive(currencyData)

onBeforeMount(async () => await setConversionResult())

watch(ammount, () => {
  style.isBtnDisabled = ammount.from.code === ammount.to.code
})

async function setConversionResult() {
  try {
    style.isLoading = true
    style.isBtnDisabled = true

    const response = await api
      .last(ammount.from.code, ammount.to.code)
      .finally(() => {
        style.isLoading = false
        style.isBtnDisabled = false
      })

    convertionResult.value = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: ammount.to.code
    }).format(Number(response.high) * ammount.value)
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      switch (error.response.status) {
        case 404:
          convertionResult.value = 'Moeda não econtrada!'
          break
        default:
          convertionResult.value = 'Erro do servidor!'
          break
      }
    } else convertionResult.value = 'Erro desconhecido!'
  }
}
</script>

<template>
  <!-- only load the component when the first api call have ended -->
  <PageLoader v-if="Number(convertionResult) === 0" class="pt-20" />
  <!-- Card -->
  <div
    v-else
    class="p-4 w-2/3 rounded-lg border border-gray-200 shadow-md dark:border-slate-700"
  >
    <h5
      class="text-center text-xl text-gray-900 font-medium dark:text-slate-200"
    >
      Converter
    </h5>
    <!-- divider -->
    <div class="bg-gray-100 h-0.5 rounded-lg my-2 dark:bg-slate-700"></div>
    <form class="space-y-6" @submit.prevent="setConversionResult()">
      <div class="md:flex justify-between">
        <!-- Ammount input -->
        <div class="flex p-2 md:w-1/2">
          <span
            class="inline-flex items-center px-3 text-small rounded-l-lg border border-r-0 border-gray-300 bg-gray-200 dark:bg-slate-900 dark:border-slate-900"
          >
            <MoneyIcon />
          </span>
          <input
            v-model="ammount.value"
            type="number"
            min="1"
            step="0.01"
            class="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-green-500 focus:ring-1 focus:border-green-500 focus:outline-none dark:bg-slate-800 dark:border-slate-900 dark:text-slate-200 dark:focus:border-green-800 dark:focus:ring-green-800"
            placeholder="500,00"
            required
          />
        </div>
        <!-- Select 1 -->
        <div class="p-2 md:w-1/4">
          <select
            v-model="ammount.from"
            class="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:ring-1 focus:border-green-500 focus:outline-none dark:bg-slate-800 dark:border-slate-900 dark:text-slate-200 dark:focus:border-green-800 dark:focus:ring-green-800"
            required
          >
            <option
              v-for="option in options.from"
              :key="option.code"
              :value="option"
            >
              {{ option.code }} - {{ option.name }}
            </option>
          </select>
        </div>
        <!-- Select 2 -->
        <div class="p-2 md:w-1/4">
          <select
            v-model="ammount.to"
            class="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:ring-1 focus:border-green-500 focus:outline-none dark:bg-slate-800 dark:border-slate-900 dark:text-slate-200 dark:focus:border-green-800 dark:focus:ring-green-800"
            required
          >
            <option
              v-for="option in options.to"
              :key="option.code"
              :value="option"
            >
              {{ option.code }} - {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <!-- Convertion Result -->
      <div class="text-center">
        <span class="text-gray-800 font-medium dark:text-slate-200">
          {{ convertionResult }}
        </span>
      </div>
      <!-- Convert Button -->
      <div class="flex justify-center">
        <button
          :disabled="style.isBtnDisabled || style.isLoading"
          class="w-full md:w-1/2 text-white bg-green-600 hover:bg-green-700 focus:ring-green-300 focus:ring-4 focus:outline-none dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-green-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-red-600 disabled:hover:bg-red-600 dark:disabled:bg-red-800 dark:disabled:hover:bg-red-800 font-medium leading-tight text-md text-center rounded-lg px-5 py-2.5 transition duration-300"
        >
          <LoadingIcon v-if="style.isLoading" />
          <span v-else>Converter</span>
        </button>
      </div>
    </form>
  </div>
</template>
