<template>
  <div class="list_item max-w-md mb-4 px-2 py-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 flex justify-between">
    <div class="flex items-center w-full relative transition ease-out duration-300">
      <input 
        :id="`checkbox-${id}`" 
        type="checkbox"
        :checked="isDone" 
        @change="handleCheck"
        class="checkbox cursor-pointer w-8 h-8 text-green-600 bg-white rounded-full border-none focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-600" 
      />
      <label
        :id="id"
        :for="`checkbox-${id}`" 
        class="col-span-2 ml-4 w-4/6 whitespace-nowrap text-ellipsis overflow-hidden text-left text-sm font-medium text-gray-900 dark:text-gray-300"
        :style="isDone ? 'text-decoration: line-through' : ''"
      >
        {{ title }}
      </label>
      <Button 
        variant="ghost"
        btnColor="transparent" 
        iconOnly="hi-pencil" 
        :handleClick="() => editTodoModalRef.openModal()"
        extraClass="show_edit justify-self-end absolute right-12" 
      />
      <Button 
        variant="icon"
        btnColor="red" 
        iconOnly="hi-trash" 
        :handleClick="handleDelete"
        extraClass="justify-self-end absolute right-0" 
      />
    </div>
    <Modal 
      ref="editTodoModalRef"
      :modalConfig="editTodoModalConfig"
    >
      <FormKit
        type="form"
        id="editTodoForm"
        ref="editTodoFormRef"
        @submit="editTodoData" 
        :actions="false"
        v-model="editValue"
        #default="{ value }"
      >
        <FormKit 
          type="text" 
          name="title" 
          :value="title"
          outer-class="max-w-full"
          placeholder="title"
          validation="required" 
        />
        <FormKit
          type="date"
          name="dueDate"
          disabled
          :value="formatDate(dueDate)"
          outer-class="max-w-full"
          validation-visibility="live"
        />
      </FormKit>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Button from "@components/Button.vue"
import Modal from "@components/Modal.vue"

const emit = defineEmits(['edit'])
const props = defineProps([
  'id',
  'title',
  'dueDate',
  'isDone',
  'handleCheck',
  'handleEdit',
  'handleDelete'
])

const editTodoModalRef = ref()
const editValue = ref()

const editTodoData = () => {
  emit('edit', { data: editValue.value })
}

const formatDate = (date: number) => {
  let dateObj = new Date(date * 1000).toISOString()
  let dateString = dateObj.split('T')[0]
  let dateArray = dateString.split('-')
  let year = dateArray[0]
  let month = dateArray[1]
  let day = dateArray[2]
  return `${year}-${month}-${day}`
}

const editTodoModalConfig = {
  title: `Edit "${props.title}"`,
  okBtn: {
    label: "Edit",
    fn: editTodoData
  },
  cancelBtn: {
    label: "Cancel",
    fn: () => console.log('cancel')
  }
}


</script>