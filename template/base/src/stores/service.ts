
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const baseUrl = ref('')
  function setBaseUrl(url: string) {
    baseUrl.value = url
  }
  return { baseUrl, setBaseUrl }
})
