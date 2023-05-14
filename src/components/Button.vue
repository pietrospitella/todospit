<template>
    <button type="button" :class="`${btnHoverOpacity ? 'hover:opacity-60' : ''} ${btnColor ? btnClasses[btnColor] : ''} text-white font-bold py-2 px-4 ml-4 rounded-full ${extraClass ?? ''}`"
        @click="handleClick">
        <v-icon :name="iconName" :scale="iconScale ?? 1.2" :fill="btnColor === 'transparent' ? (isDark ? 'white' : 'black') : 'white'" :animation="iconAnimation ?? null" :hover="iconHover" />
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
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

const btnClasses: any = {
    blue: 'bg-blue-500 hover:bg-blue-700',
    red: 'bg-red-500 hover:bg-red-700',
    green: 'bg-green-500 hover:bg-green-700',
    white: 'bg-white-500 hover:bg-white-700 text-black',
    black: 'bg-black-500 hover:bg-black-700 text-white'
}

const isDark = computed(()=>{
    return settingsStore.getDark
})

</script>