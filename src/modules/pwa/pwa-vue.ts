import { ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'
export interface RegisterSWOptions {
  immediate?: boolean
  onNeedRefresh?: () => void
  onOfflineReady?: () => void
  /**
   * Called only if `onRegisteredSW` is not provided.
   *
   * @deprecated Use `onRegisteredSW` instead.
   * @param registration The service worker registration if available.
   */
  onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
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
  const { immediate = true, onNeedRefresh, onOfflineReady, onRegistered, onRegisteredSW, onRegisterError } = options

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
    onRegistered,
    onRegisteredSW,
    onRegisterError,
  })

  return {
    updateServiceWorker,
    offlineReady,
    needRefresh,
  }
}
