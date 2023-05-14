<template>
    <header class="w-auto flex justify-center items-center">
            <Button
                btnColor="transparent"
                iconName="hi-chevron-left"
                :handleClick="() => router.back()"
                extraClass="absolute left-0"
            /> 
            <h1
                class="self-center py-4 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Impostazioni
            </h1>
        </header>
        <p class="text-gray-900 dark:text-white text-center text-lg mt-10">Work in progress... ⚠️🛠️</p>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@components/Button.vue"

const router = useRouter()
</script>