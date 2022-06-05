<script setup lang="ts">
import CurrencyApi from '../api/Currency.api'
import LoadingIcon from './icons/LoadingIcon.vue'
import MoneyIcon from './icons/MoneyIcon.vue'

import { AxiosError } from 'axios'
import { currencyData } from '../data/Currency.data'
import { onBeforeMount, reactive, ref } from 'vue'
import { Currency } from '../types/Currency.interface'

const api = new CurrencyApi()

const style = reactive({
  isBtnDisabled: false,
  isLoading: false
})

let convertionResult = ref<string>('0.00')

const ammount = reactive({
  value: 272.45,
  from: { name: 'Real Brasileiro', code: 'BRL' } as Currency,
  to: { name: 'Dólar Americano', code: 'USD' } as Currency
})

const options = reactive(currencyData)

onBeforeMount(async () => await setConversionResult())

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
  <div class="p-4 w-2/3 rounded-lg border border-gray-200 shadow-md">
    <h5 class="text-center text-xl text-gray-900 font-medium">Converter</h5>
    <div class="bg-gray-100 h-0.5 rounded-lg my-2"></div>
    <form class="space-y-6" @submit.prevent="setConversionResult()">
      <div class="md:flex justify-between">
        <!-- Ammount input -->
        <div class="flex p-2 md:w-1/2">
          <span
            class="inline-flex items-center px-3 text-small bg-gray-200 border border-r-0 border-gray-300 rounded-l-lg"
          >
            <MoneyIcon />
          </span>
          <input
            v-model="ammount.value"
            type="number"
            min="1"
            step="0.01"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-green-500 focus:ring-1 focus:border-green-500 focus:outline-none block w-full p-2.5"
            placeholder="500,00"
            required
          />
        </div>
        <!-- Select 1 -->
        <div class="p-2 md:w-1/4">
          <select
            v-model="ammount.from"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:ring-1 focus:border-green-500 focus:outline-none block w-full p-2.5"
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:ring-1 focus:border-green-500 focus:outline-none block w-full p-2.5"
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
        <span class="text-gray-900 font-medium">{{ convertionResult }}</span>
      </div>
      <!-- Convert button -->
      <div class="flex justify-center">
        <button
          :disabled="style.isBtnDisabled || style.isLoading"
          :class="{
            'cursor-not-allowed': style.isBtnDisabled || style.isLoading
          }"
          class="w-full md:w-1/2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
        >
          <LoadingIcon v-if="style.isLoading" />
          <span v-else>Converter</span>
        </button>
      </div>
    </form>
  </div>
</template>
