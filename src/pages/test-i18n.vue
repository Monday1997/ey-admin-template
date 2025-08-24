<template>
  <div>{{ $t('message.hello') }}</div>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh-CN">zn-CN</option>
  </select>
</template>

<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i18n'
const locale = ref('zn-CN')
watch(locale, (newLocale) => {
  loadLocaleMessages(newLocale)
})
</script>

<style scoped></style>
