<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6">
    <h1 class="text-9xl font-extrabold text-gray-800 dark:text-gray-200">404</h1>
    <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">抱歉，您访问的页面不存在。</p>
    <a-button type="primary" shape="round" size="large" class="mt-6" @click="goHome"> 返回首页 </a-button>
  </div>
</template>
