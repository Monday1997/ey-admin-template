<template>
    <Test />
    <TestA :count="213" />
</template>
<script setup lang="ts">
const route = useRoute()
console.log('🚀 ~ route:', route.meta.name)
</script>
<route lang="yaml"></route>
