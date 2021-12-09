import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { Http } from '@/api/connector/Http'
import { RequireComponents as RequireFormComponents } from '@/services/form/RequireComponents'

const app = createApp(App)

// Global http client service
app.config.globalProperties.$http = Http

// Lazy import of form components
RequireFormComponents().forEach((component) => {
  app.component(component.name, component.config)
})

app.use(store).use(router).mount('#app')
