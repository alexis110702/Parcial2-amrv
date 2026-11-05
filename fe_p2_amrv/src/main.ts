import './assets/main.css'

import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  license: import.meta.env.VITE_PRIMEUI_LICENSE,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.app-dark',
      cssLayer: false,
    },
  },
})

app.mount('#app')
