<template>
    <input
        ref="inputRef"
        v-model="inputModel"
        :type="type" 
        :placeholder="placeholder"
        class="rounded-full border-0 py-1.5 pl-7 pr-20 m-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
    />
    <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useSettingsStore } from "@stores/settingsstore"

const settingsStore = useSettingsStore()

const props = defineProps([
    'externalValue',
    'type',
    'placeholder',
    'keyUpAction'
])

const inputModel = ref()
const inputRef = ref()

onMounted(() => {
    if (props.externalValue) {
        inputModel.value = props.externalValue
    }
})
</script>