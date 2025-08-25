<template>
  <div>{{ $t('message.hello') }}</div>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh-CN">zn-CN</option>
  </select>
  <div>
    <a-badge count="5">
      一些内容
    </a-badge>
    <Badge>456789</Badge>
  </div>
</template>

<script setup lang="ts">
import { Badge } from 'ant-design-vue'

import { loadLocaleMessages } from '@/modules/i18n'
const locale = ref('zn-CN')
watch(locale, (newLocale) => {
  loadLocaleMessages(newLocale)
})
</script>

<style scoped></style>
