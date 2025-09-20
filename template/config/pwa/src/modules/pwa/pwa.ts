import { watch } from 'vue'
import { Modal } from 'ant-design-vue'

import { useRegisterSW } from './pwa-vue'
const defautReloadTime = 30 * 60 * 1000
export function registerPwaWatcher(timmer: number = defautReloadTime) {
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(url, registration) {
      setInterval(() => {
        console.log('🚀 ~ onRegisteredSW ~ registration:', registration)
        registration?.update()
      }, timmer)
    },
  })
  updateServiceWorker()
  watch(
    () => needRefresh.value,
    (val) => {
      val &&
        Modal.confirm({
          title: '重新加载',
          content: '资源已刷新，是否重新加载',
          okText: '加载',
          cancelText: '取消',
          onOk() {
            updateServiceWorker()
          },
        })
    },
  )
}
