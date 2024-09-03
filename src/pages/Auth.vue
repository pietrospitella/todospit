<template>
    <header class="w-auto flex justify-center items-center">
        <h1
            class="self-center py-4 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Login
        </h1>
    </header>
    <p class="text-gray-900 dark:text-white text-center text-lg mt-10">Enter your credentials</p>
    <div class="w-full pt-4 flex justify-center items-center flex-col">
        <FormKit 
            type="form"
            id="loginForm"
            submit-label="Register" 
            @submit="login" 
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
                name="email"
                placeholder="jane@example.com"
                validation="email" 
            />
            <FormKit
                type="password"
                name="password"
                placeholder="Your password"
            />
            <Button
                btnColor="sky"
                type="submit"
                fullWidth
                labelText="Login"
                extraClass="w-full" 
            />
        </FormKit>
        <!-- <div class="divider max-w-24 mx-auto">OR</div>
        <Button btnColor="blue" labelText="Login with Google" :handleClick="() => login()" iconName="fc-google" /> -->
    </div>
    <div class="w-auto mx-20 pt-4 flex justify-center items-center flex-col">
        <!-- <span class="text-gray-700 font-medium text-center">Never been here?</span> -->
        <!-- <Button 
            labelColor="blue" 
            variant="link" 
            labelText="Register Now" 
            :handleClick="() => registerModalRef.openModal()" 
        /> -->
        <Button 
            variant="glass"
            class="mt-10"
            btnColor="gray"
            labelText="Guest Mode" 
            rightIcon="hi-status-offline"
            :handleClick="() => loginGuest()" 
        />
        
        <Modal 
            ref="registerModalRef"
            :modalConfig="registerModalConfig"
        >
            <FormKit
                type="form"
                id="registrationForm"
                submit-label="Register" 
                @submit="register" 
                :actions="false" 
                #default="{ value }"
                :submit-attrs="{
                    inputClass: 'im-on-the-button bg-red-100',
                    wrapperClass: 'im-on-the-wrapper bg-red-100',
                    outerClass: 'im-on-the-outer-wrapper bg-red-100'
                }"
            >
                <FormKit 
                    type="text" 
                    name="name" 
                    label="Your name" 
                    placeholder="Jane Doe"
                    validation="required" 
                />
                <FormKit
                    type="text"
                    name="email"
                    label="Your email"
                    placeholder="jane@example.com"
                    validation="required|email" 
                />
                <div class="double">
                    <FormKit
                        type="password"
                        name="password"
                        label="Password"
                        validation="required|length:6|matches:/[^a-zA-Z]/"
                         :validation-messages="{
                            matches: 'Please include at least one symbol',
                        }"
                        placeholder="Your password"
                    />
                    <FormKit
                        type="password"
                        name="password_confirm"
                        label="Confirm password"
                        placeholder="Confirm password"
                        validation="required|confirm" 
                    />
                </div>
            </FormKit>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Button from "@components/Button.vue"
import Modal from "@components/Modal.vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAuthStore } from "@stores/authstore"
import { useListStore } from "@stores/liststore"
import "firebase/firestore"
import { collection, DocumentData, getDocs } from "firebase/firestore"
import { db } from "@/main"
import { useEmitter } from "@nguyenshort/vue3-mitt"

const router = useRouter()
const emitter = useEmitter()
const authStore = useAuthStore()
const listStore = useListStore()

const registerModalRef = ref()

const login = (data: any) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
            // Signed in 
            authStore.loadUser(userCredential.user)
            const allDones: DocumentData[] = []
            const allNotDones: DocumentData[] = []
            const docs = collection(db, "users", userCredential.user.uid, "todos")
            const docSnap = await getDocs(docs)
            docSnap.forEach((doc) => {
                const data = doc.data()
                if (data.isDone) {
                    allDones.push(doc.data())
                } else {
                    allNotDones.push(doc.data())
                }
            })
            listStore.updateDoneList(allDones)
            listStore.updateList(allNotDones)

            router.push('home')
            emitter.emit('toast', {
                type: 'success', 
                message: `Logged in as ${auth.currentUser?.displayName}`
            })
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = errorCode === 'auth/invalid-credential' ? 'Credentials not valid' : error.message
            emitter.emit('toast', {
                type: 'error', 
                message: errorMessage
            })
        })

}

const loginGuest = () => {
    authStore.$reset()
    authStore.setGuestMode(true) 
    listStore.updateList([])
    listStore.updateDoneList([])
    emitter.emit('toast', {
        type: 'info', 
        message: 'Logged as a Guest'
    })
    router.push('home')
}

const register = () => {
    console.log("registration successful")
}

const registerModalConfig = {
    title: "Register",
    okBtn: {
        label: "Create Account",
        fn: register
    },
    cancelBtn: {
        label: "Cancel",
        fn: () => { /* */ }
    },
    form: {
        name: '',
        email: '',
        password: ''
    }
}

onMounted(() => {
  if (authStore.guestMode) {
    router.push('home')
  }  
})
</script>