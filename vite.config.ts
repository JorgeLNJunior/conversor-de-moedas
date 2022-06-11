/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@components': resolve('src', 'components'),
      '@api': resolve('src', 'api')
    }
  }
})
