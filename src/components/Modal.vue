<template>
    <dialog id="my_modal" class="modal" ref="modalRef">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-4">{{modalConfig.title}}</h3>
            <div>
                <slot />
            </div>
            <Button
                variant="ghost"
                labelColor="gray"
                :labelText="modalConfig.cancelBtn.label"
                :handleClick="() => handleCancelBtn()" 
                extraClass="mr-4"
            />
            <Button
                :labelText="modalConfig.okBtn.label"
                :handleClick="() => handleOkBtn()"
                btnColor="blue"
            />
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>



<script setup lang="ts">
import { ref } from "vue"
import Button from "@components/Button.vue"

const props = defineProps<{
    modalConfig: {
        title?: string,
        cancelBtn: {
            label: string,
            fn: () => void
        },
        okBtn: {
            label: string,
            fn: () => void
        }
    }
}>()

const modalRef = ref() 

function openModal() {
    if (modalRef.value) {
        modalRef.value.showModal()
    }
}

const handleCancelBtn = () => {
    modalRef.value.close()
    props.modalConfig.cancelBtn.fn()
}
const handleOkBtn = () => {
    props.modalConfig.okBtn.fn()
    modalRef.value.close()
}

defineExpose({ openModal })

</script>