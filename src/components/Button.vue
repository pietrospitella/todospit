<template>
    <button type="button" :class="`${btnHoverOpacity ? 'hover:opacity-60' : ''} bg-${btnColor}-500 hover:bg-${btnColor}-700 text-white font-bold py-2 px-4 ml-4 rounded-full ${extraClass}`"
        @click="handleClick">
        <v-icon :name="iconName" :scale="iconScale ?? 1.2" :fill="btnColor === 'transparent' ? (settingsStore.getDark ? 'black' : 'white') : 'white'" :animation="iconAnimation ?? null" :hover="iconHover" />
    </button>
</template>

<script setup lang="ts">
import { useSettingsStore } from "../stores/settingsstore"

const settingsStore = useSettingsStore()
const props = defineProps([
    'btnColor',
    'btnHoverOpacity',
    'iconName',
    'iconScale',
    'iconColor',
    'iconAnimation',
    'iconHover',
    'handleClick',
    'extraClass'
])

</script>