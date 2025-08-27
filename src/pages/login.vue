<template>
  <div>
    this is login
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const currentRoute = router.currentRoute.value;
console.log("🚀 ~ currentRoute:", currentRoute)
</script>

<route lang="json">
{
  "name": "Login",
  "meta": {
    "name": "登录页"
  }
}
</route>
