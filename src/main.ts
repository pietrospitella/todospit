import { createApp } from "vue";
import { createPinia } from 'pinia'
// import "./styles.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Settings from "./pages/Settings.vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createRouter, createWebHashHistory} from 'vue-router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as HiIcons from "oh-vue-icons/icons/hi";
import { invoke } from '@tauri-apps/api/tauri'
import Vue3linkify from "vue-3-linkify";

const pinia = createPinia()
const app = createApp(App)
app.use(Vue3linkify)
const Hi = Object.values({ ...HiIcons });
addIcons(...Hi);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/settings', name: 'settings', component: Settings },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.component("v-icon", OhVueIcon)
app.mount('#app')

document.addEventListener('DOMContentLoaded', () => {
  // This will wait for the window to load, but you could
  // run this function on whatever trigger you want
  invoke('close_splashscreen')
})