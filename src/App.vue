<template>
  <RouterView />
</template>
<script setup lang="ts">
import { registerPwaWatcher } from '@/modules/pwa/pwa'
registerPwaWatcher(5 * 1000)
</script>
