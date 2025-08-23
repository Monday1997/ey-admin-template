<template>
    <div>这是一个test{{ count }}aaa</div>
</template>

<script setup lang="ts">
defineProps<{
    count: number
}>()
</script>
