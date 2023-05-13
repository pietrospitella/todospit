<template>
    <Button
        btnColor="transparent"
        iconName="hi-chevron-left"
        :handleClick="() => router.back()"
    /> 
    settings
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@components/Button.vue"

const router = useRouter()
</script>