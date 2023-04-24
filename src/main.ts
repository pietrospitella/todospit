import { createApp } from "vue";
import { createPinia } from 'pinia'
import "./styles.css";
import App from "./App.vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.mount('#app')

// With the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'

document.addEventListener('DOMContentLoaded', () => {
  // This will wait for the window to load, but you could
  // run this function on whatever trigger you want
  invoke('close_splashscreen')
})