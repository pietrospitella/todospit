<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <div
        class="card-container h-full min-h-screen max-h-screen overflow-y-auto mt-10 p-4 pb-16 bg-sky-200 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSettingsStore } from "./stores/settingsstore";

const showScrollbar = (event: any) => {
 if(event){
  
 }
}

onMounted(() => {
  const settingsStore = useSettingsStore()
  settingsStore.loadMode()
})
</script>