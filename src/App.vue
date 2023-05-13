<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <div class="card-container h-full min-h-screen p-4 bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 dark:bg-gradient-to-b dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
</template>