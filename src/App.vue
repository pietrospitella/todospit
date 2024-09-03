<template>
  <router-view v-slot="{ Component, route }">
    <Toast ref="toastRef" />
      <transition name="slide-fade">
      <div
        :class="`
          card-container h-full min-h-screen max-h-screen overflow-y-auto mt-10 p-4 pb-16 ${authStore.guestMode ? 'bg-slate-300 dark:bg-slate-700' : 'bg-sky-200 dark:bg-gray-900'} 
          bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] 
          dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]
        `"
      >
        <component :is="Component" :key="route.path" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue"
import {useEmitter} from '@nguyenshort/vue3-mitt'
import { useAuthStore } from "@stores/authstore"
import { useSettingsStore } from "@stores/settingsstore"
import Toast from "@components/Toast.vue"

const emitter = useEmitter()
const authStore = useAuthStore()
const toastRef = ref()

onBeforeMount(() => {
  emitter.on('toast', (e: any) => {
    toastRef.value.openToast(e.type, e.message)
  })
})

onMounted(() => {
  const settingsStore = useSettingsStore()
  settingsStore.loadMode()
})
</script>