import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { RequireComponents as RequireFormComponents } from '@/services/form/RequireComponents'
import { Http } from '@/services/api/client/Http'

const app = createApp(App)

// Global http client service
app.config.globalProperties.$http = Http

// Lazy import of form components
RequireFormComponents().forEach((component) => {
  app.component(component.name, component.config)
})

app.use(store).use(router).mount('#app')
