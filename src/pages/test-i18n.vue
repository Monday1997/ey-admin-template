<template>
  <div>{{ $t('message.hello') }}</div>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh-CN">zn-CN</option>
  </select>
  <div>兼容了cdn缓存,测试测试</div>
</template>

<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i18n'
const locale = ref('zn-CN')
watch(locale, (newLocale) => {
  loadLocaleMessages(newLocale)
})
</script>
