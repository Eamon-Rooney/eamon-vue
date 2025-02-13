import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { useSearchFilterStore } from './stores/searchFilterStore'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.mount('#app')

// Flag to prevent infinite loop
let isUpdatingFromStorageEvent = false

// Listen for storage events and update the store
window.addEventListener('storage', (event) => {
  if (event.key === 'searchFilter' && !isUpdatingFromStorageEvent) {
    isUpdatingFromStorageEvent = true
    const searchFilterStore = useSearchFilterStore()
    searchFilterStore.$patch(JSON.parse(event.newValue || '{}'))
    setTimeout(() => {
      isUpdatingFromStorageEvent = false
    }, 100) // Adjust the timeout as needed
  }
})