<template>
  <div class="max-w-md mb-4 px-2 py-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 flex justify-between">
      <div class="flex items-center w-full relative transition ease-out duration-300">
        <input
          :id="`checkbox-${id}`"
          type="checkbox"
          :checked="checked"
          @change="handleCheck"
          class="w-8 h-8 text-green-600 bg-white rounded-full border-none focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-600"
        />
        <label
          v-linkify
          :for="`checkbox-${id}`"
          :id="id"
          class="col-span-2 ml-4 w-4/6 whitespace-nowrap text-ellipsis overflow-hidden text-left text-sm font-medium text-gray-900 dark:text-gray-300"
          :style="checked ? 'text-decoration: line-through' : ''"
        >
          {{todo}}
        </label>
        <Button
          btnColor="red"
          iconName="hi-trash"
          :handleClick="handleDelete"
          extraClass="justify-self-end absolute right-0"
        /> 
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "@components/Button.vue"

const props = defineProps(['id','todo','checked','handleCheck','handleDelete'])


</script>