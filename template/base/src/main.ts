import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.vue'
import I18n from './modules/i18n'
import router from './router'
<%- importers && importers.join('\n') %>

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(I18n)
<%- appPlugins.join(',\n') %>
app.mount('#app')
