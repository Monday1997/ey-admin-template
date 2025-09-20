import { ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'
export interface RegisterSWOptions {
  immediate?: boolean
  onNeedRefresh?: () => void
  onOfflineReady?: () => void
  /**
   * Called once the service worker is registered (requires version `0.12.8+`).
   *
   * @param swScriptUrl The service worker script url.
   * @param registration The service worker registration if available.
   */
  onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void
  onRegisterError?: (error: any) => void
}

export function useRegisterSW(options: RegisterSWOptions = {}) {
  const { immediate = true, onNeedRefresh, onOfflineReady, onRegisteredSW, onRegisterError } = options

  const needRefresh = ref(false)
  const offlineReady = ref(false)

  const updateServiceWorker = registerSW({
    immediate,
    onNeedRefresh() {
      needRefresh.value = true
      onNeedRefresh?.()
    },
    onOfflineReady() {
      offlineReady.value = true
      onOfflineReady?.()
    },
    onRegisteredSW,
    onRegisterError,
  })

  return {
    updateServiceWorker,
    offlineReady,
    needRefresh,
  }
}
