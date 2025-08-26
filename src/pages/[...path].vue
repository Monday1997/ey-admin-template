<template>
  <div class="bg-red-500 p-40 text-white text-center">404页面</div>
  <a-button @click="increment" type="primary">+1</a-button>
  <div>{{ store.count }}-{{ store.doubleCount }}</div>
  <div>一些内容666 看看兼容一下自动路由</div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
const { increment } = store
</script>
