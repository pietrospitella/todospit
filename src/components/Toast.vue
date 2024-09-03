<template>
    <div id="toast" class="toast">
        <div :class="`alert ${toastConfig[toastValue.type].classes}`">
            <v-icon
                class="ml-2"
                :name="toastConfig[toastValue.type].icon.name" 
                :scale="1.2" 
                :fill="toastConfig[toastValue.type].icon.color"  
            />
            <span>{{ toastValue.msg }}</span>
            <progress class="absolute bottom-[2px] left-0 right-0 progress w-40 mx-auto h-1 brightness-125" :value="progressValue" max="100"></progress>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

type ToastType = 'error' | 'success' | 'info' | 'warning'

const progressValue = ref(0)
const toastValue = ref<{ type: ToastType; msg: string }>({
    type: 'info',
    msg: ''
})

const toastConfig = {
    error: {
        classes: 'bg-error text-white',
        progress: 'progress-error',
        icon: {
            name: 'hi-exclamation-circle',
            color: 'white'
        }
    },
    success: {
        classes: 'bg-success text-white',
        progress: 'progress-success',
        icon: {
            name: 'hi-check-circle',
            color: 'white'
        }
    },
    info: {
        classes: 'bg-info text-white',
        progress: 'progress-info',
        icon: {
            name: 'hi-information-circle',
            color: 'white'
        }
    },
    warning: {
        classes: 'bg-warning',
        progress: 'progress-warning',
        icon: {
            name: 'hi-exclamation',
            color: 'black'
        }
    }
}

function openToast(type: ToastType, msg: string) {
    if (type && msg) {
        toastValue.value.type = type
        toastValue.value.msg = msg
    }
    let toastEl = document.getElementById("toast")
    if (toastEl) {
        toastEl.className = "show"
        progressValue.value = 0
        let interval = setInterval(() => {
            progressValue.value += 1
            if (progressValue.value >= 100) {
                clearInterval(interval)
            }
        }, 20)
        setTimeout(() => { 
            toastEl.className = toastEl.className.replace("show", "") 
        }, 3000)
    }
}

defineExpose({ openToast })

</script>

<style>
#toast {
  visibility: hidden;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translate(-50%);
  top: 56px;
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;} 
  to {top: 56px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 56px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 56px; opacity: 1;} 
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 56px; opacity: 1;}
  to {top: 0; opacity: 0;}
}
</style>