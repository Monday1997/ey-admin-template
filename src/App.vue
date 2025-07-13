<template>
    <div>{{ $t('message.hello') }}</div>
    <header>
        <select v-model="locale">
            <option value="en">en</option>
            <option value="zh-CN">zn-CN</option>
        </select>
    </header>
    <RouterView />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { loadLocaleMessages } from '@/modules/i18n'
const locale = ref('zn-CN')
watch(locale, (newLocale) => {
    loadLocaleMessages(newLocale)
})
</script>
<style scoped></style>
