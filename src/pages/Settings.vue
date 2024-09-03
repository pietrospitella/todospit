<template>
    <header class="w-auto flex justify-center items-center">
        <Button
            variant="ghost"
            iconOnly="hi-chevron-left"
            :handleClick="() => router.back()"
            iconScale=1.8
            extraClass="absolute left-4"
        /> 
        <h1
            class="self-center py-4 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Settings
        </h1>
    </header>
    <div class="flex flex-col items-center">
        <v-icon 
            :name="authStore.guestMode ? 'hi-user-circle' : 'hi-solid-user-circle'" 
            :scale="8"
            :fill="(isDark ? 'white' : 'black')" 
        />
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{{ nameVal ?? 'Guest' }}</h2>
        <FormKit 
            v-if="!authStore.guestMode"
            type="form"
            id="userUpdateForm"
            submit-label="Register" 
            @submit="(value) => updateUserProfile(value)" 
            :submit-attrs="{
                inputClass: 'w-full',
                wrapperClass: 'im-on-the-wrapper',
                outerClass: 'im-on-the-outer-wrapper'
            }" 
            :actions="false" 
            #default="{ value }"
        >
            <FormKit
                type="text"
                name="nickname"
                v-model="nameVal"
                placeholder="andrew123"
                validation="required" 
            />
            <Button
                btnColor="sky"
                type="submit"
                fullWidth
                labelText="Change Name"
                extraClass="w-full" 
            />
        </FormKit>
        <Button
            btnColor="red"
            labelColor="white"
            labelText="Log Out"
            rightIcon="hi-logout"
            extraClass="mt-10"
            :handleClick="() => logOut()"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { getAuth, signOut, updateProfile, User } from "firebase/auth"
import Button from "@components/Button.vue"
import { useAuthStore } from "@stores/authstore"
import { useSettingsStore } from "@stores/settingsstore"
import { useEmitter } from "@nguyenshort/vue3-mitt"

const router = useRouter()
const emitter = useEmitter()
const auth = getAuth()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const nameVal = ref('')

const isDark = computed(() => {
    return settingsStore.getDark
})

const updateUserProfile = (data: string | any) => {
    const auth = getAuth()
    updateProfile(auth.currentUser as User, {
        displayName: data.nickname
    }).then(() => {
        emitter.emit('toast', {
            type: 'success',
            message: `Name changed successfully! Hello ${data.nickname}`
        })
        authStore.loadUser(auth.currentUser)
    }).catch((error) => {
        emitter.emit('toast', {
            type: 'error',
            message: `Error: ${error}`
        })
    })
}

const logOut = () => {
    if (!authStore.guestMode && authStore.isSignedIn) {
        signOut(auth).then(() => {
            router.push('/')
            emitter.emit('toast', {
                type: 'success', 
                message: 'Logout successful'
            })
        }).catch((error) => {
            emitter.emit('toast', {
                type: 'error', 
                message: `Error logging out: ${error}`
            })
        })
    } else {
        authStore.setGuestMode(false)
        emitter.emit('toast', {
            type: 'success', 
            message: 'Logout successful'
        })
        router.push('/')
    }
}

onMounted(() => {
    nameVal.value = authStore.guestMode ? 'Guest' : authStore.user?.providerData[0].displayName
})
</script>