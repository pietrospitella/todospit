import { createApp } from "vue"
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.js'
// import "./styles.css";
import App from "./App.vue"
import Auth from "./pages/Auth.vue"
import Home from "./pages/Home.vue"
import Settings from "./pages/Settings.vue"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createRouter, createWebHashHistory} from 'vue-router'
import { OhVueIcon, addIcons } from "oh-vue-icons"
import * as HiIcons from "oh-vue-icons/icons/hi"
import * as FcIcons from "oh-vue-icons/icons/fc"
import { invoke } from '@tauri-apps/api/tauri'
import Vue3linkify from "vue-3-linkify"
import { appWindow } from '@tauri-apps/api/window'
// Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// Vue Mitter
import VueMitter from '@nguyenshort/vue3-mitt'

if (window.__TAURI__) {
  let actions = document?.getElementById('titlebar-actions')
  if (actions) actions.style.display = 'block'
  document?.getElementById('titlebar-minimize')?.addEventListener('click', () => appWindow.minimize())
  document?.getElementById('titlebar-maximize')?.addEventListener('click', () => appWindow.toggleMaximize())
  document?.getElementById('titlebar-close')?.addEventListener('click', () => appWindow.close())
}

const pinia = createPinia()
const app = createApp(App)
app.use(Vue3linkify)
const Hi = Object.values({ ...HiIcons })
const Fc = Object.values({ ...FcIcons })
addIcons(...Hi)
addIcons(...Fc)

const routes = [
  { path: '/', name: 'auth', component: Auth },
  { path: '/home', name: 'home', component: Home },
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
// FormKit
app.use(plugin, defaultConfig(config))
app.use(VueMitter)
app.component("v-icon", OhVueIcon)
app.mount('#app')

document.addEventListener('DOMContentLoaded', () => {
  // This will wait for the window to load, but you could
  // run this function on whatever trigger you want
  invoke('close_splashscreen')
})

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE)
const fbApp = initializeApp(firebaseConfig)


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(fbApp)