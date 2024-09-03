<template>
    <button 
        :type="type ?? 'button'" 
        :class="`btn ${variant ? variantClasses[variant] : ''} ${btnColor ? bgClasses[btnColor] : ''} ${labelColor ? textClasses[labelColor] : 'text-white'} ${typeof fullWidth !== 'undefined' ? 'max-w-[24em]' : 'w-max'} font-bold py-2 px-4 border-none rounded-full ${extraClass ?? ''}`"
        @click="handleClick"
        :disabled="disabled"
    >
    <v-icon 
        v-if="labelText && leftIcon && !iconOnly && !loading" 
        :class="labelText && 'mr-2'"
        :name="leftIcon" 
        :scale="iconScale ?? 1.2" 
        :fill="btnColor === 'transparent' ? (isDark ? 'white' : 'black') : 'white'" 
        :animation="iconAnimation ?? null" 
        :hover="iconHover"
     />
    <span v-if="loading && leftIcon" class="loading loading-spinner"></span>
    <v-icon 
        v-if="iconOnly" 
        :name="iconOnly" 
        :scale="iconScale ?? 1.2" 
        :fill="variant === 'ghost' ? (isDark ? 'white' : 'black') : 'white'" 
        :animation="iconAnimation ?? null" 
        :hover="iconHover"
    />
    <span v-if="labelText && !iconOnly" class="text-center">{{ labelText }}</span>
    <v-icon 
        v-if="labelText && rightIcon && !iconOnly && !loading" 
        :class="labelText && 'ml-2'"
        :name="rightIcon" 
        :scale="iconScale ?? 1.2" 
        :fill="btnColor === 'transparent' ? (isDark ? 'white' : 'black') : 'white'" 
        :animation="iconAnimation ?? null" 
        :hover="iconHover" 
    />
    <span v-if="loading && rightIcon" class="loading loading-spinner"></span>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useSettingsStore } from "../stores/settingsstore"

const settingsStore = useSettingsStore()

const props = defineProps<{
    type?: 'button' | 'submit' | 'reset',
    variant?: 'icon' | 'link' | 'ghost' | 'glass',
    btnColor?: 'sky' | 'blue' | 'red' | 'green' | 'white' | 'gray' | 'black' | 'transparent',
    labelText?: string,
    labelColor?: 'sky' | 'blue' | 'red' | 'green' | 'white' | 'gray' | 'black',
    leftIcon?: string,
    iconOnly?: string,
    rightIcon?: string,
    iconScale?: number | string,
    iconColor?: string,
    iconAnimation?: string,
    iconHover?: string,
    handleClick?: () => void,
    extraClass?: string,
    disabled?: boolean,
    fullWidth?: boolean,
    loading?: boolean
}>()

const variantClasses = {
    icon: 'btn-circle',
    link: 'btn-link',
    ghost: 'btn-ghost',
    glass: 'btn-glass'
}

const bgClasses: any = {
    sky: 'bg-sky-500 hover:bg-sky-700',
    blue: 'bg-blue-500 hover:bg-blue-700',
    red: 'bg-red-500 hover:bg-red-700',
    green: 'bg-green-500 hover:bg-green-700',
    white: 'bg-white-500 hover:bg-white-700 text-black',
    gray: 'bg-gray-500 hover:bg-gray-700 text-black',
    black: 'bg-black-500 hover:bg-black-700 text-white'
}

const textClasses: any = {
    sky: 'text-sky-500 hover:text-sky-700',
    blue: 'text-blue-500 hover:text-blue-700',
    red: 'text-red-500 hover:text-red-700',
    green: 'text-green-500 hover:text-green-700',
    white: 'text-white hover:text-white-700',
    gray: 'text-gray-500 hover:text-gray-700',
    black: 'text-black-500 hover:text-black-700'
}

const isDark = computed(()=>{
    return settingsStore.getDark
})

</script>