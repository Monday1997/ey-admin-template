<template>
    <div>{{ $t('message.hello') }}</div>
    <header>
        <select v-model="locale">
            <option value="en">en</option>
            <option value="zh-CN">zn-CN</option>
        </select>
        <div class="bg-red-500 width-full text-white leading-normal">这是一些内容</div>
    </header>
    <RouterView />
    <Test />
    <TestA :count="288" />
</template>
<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i18n'
const locale = ref('zn-CN')
watch(locale, (newLocale) => {
    loadLocaleMessages(newLocale)
})
</script>
