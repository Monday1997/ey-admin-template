<template>
  <div class="min-h-screen flex justify-center bg-gray-50 dark:bg-gray-900">
    <div class="bg-white mt-20 h-1/6 dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
      <!-- 标题 -->
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {{ $t('message.hello') }}
      </h1>

      <!-- 语言选择 -->
      <div class="flex flex-col items-center gap-4">
        <label class="text-gray-600 dark:text-gray-300">🌐 选择语言-i18n</label>
        <select
          v-model="locale"
          class="w-40 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="en">English</option>
          <option value="zh-CN">简体中文</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { loadLocaleMessages } from '@/modules/i18n'

const locale = ref('zh-CN')
watch(locale, (newLocale) => {
  loadLocaleMessages(newLocale)
})

const route = useRoute()
console.log('🚀 ~ route:', route)
console.log('🚀 ~ route:', route.meta.name)
</script>
<route lang="json">
{
  "name": "index",
  "meta": {
    "name": "test-name"
  }
}
</route>
