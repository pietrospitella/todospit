<template>
    <div>
        <header class="w-auto flex justify-between items-center">
            <h1
                class="py-4 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                <img :src="logo" alt="logo" style="border-radius: 8px; max-height: 104px; display: inline-block;">
                TodoSpit
            </h1>
            <Button
                btnHoverOpacity
                btnColor="transparent"
                iconName="hi-adjustments"
                iconScale=2
                :handleClick="() => router.push({name: 'settings'})"
            />
        </header>
        <div class="p-inputgroup flex">
            <input type="text" v-model="input" placeholder="Aggiungi Task"
                class="rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                @keyup="($event) => { $event.key === 'Enter' ? addTodo(input) : null }" />
            <Button
                btnColor="blue"
                iconName="hi-plus"
                :handleClick="()=>addTodo(input)"
            />
            <Button
                btnColor="green"
                iconName="hi-moon"
                :handleClick="() => settingsStore.switchMode()"
            />
        </div>
        <h2 class="my-4 text-xl text-black dark:text-white font-bold">Da fare</h2>
        <TransitionGroup tag="div" name="list" v-if="list.length > 0"
            class="block font-bold text-center border-round py-4">
            <div v-for="//@ts-ignore 
                key in list.sort((a, b) => (a.id > b.id) ? -1 : 1)" :key="key.id">
                <list-item :id="key.id" :checked="key.checked" :handleCheck="() => checkTodo(key)"
                    :handleDelete="() => deleteTodo(key)" :todo="key.todo">
                </list-item>
            </div>
        </TransitionGroup>
        <p v-else class="text-left text-black dark:text-white">
            Nesun todo da completare 👏🏻
        </p>
        <h2 class="my-4 text-xl text-black dark:text-white font-bold">Completati</h2>
        <TransitionGroup tag="div" name="list" v-if="doneList.length > 0"
            class="block font-bold text-center border-round py-4">
            <div v-for="key in doneList.sort()" :key="key.id">
                <list-item :id="key.id" :checked="key.checked" :handleCheck="() => checkTodo(key)"
                    :handleDelete="() => deleteTodo(key)" :todo="key.todo"></list-item>
            </div>
        </TransitionGroup>
        <p v-else class="text-left text-black dark:text-white">
            Nesun todo completato</p>
    </div>
</template>
  
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from "vue"
import { FcSettings } from "oh-vue-icons/icons"
//@ts-ignore 
import ListItem from "@components/ListItem.vue"
import Button from "@components/Button.vue"
import { useListStore } from "../stores/liststore"
import { useSettingsStore } from "../stores/settingsstore"
import logo from "@assets/todospit_logo.png"
import { useRouter } from "vue-router"

const router = useRouter()
const list = ref([]) as any
const doneList = ref([]) as any
const input = ref('')
const listStore = useListStore()
const settingsStore = useSettingsStore()
const Dark = ref()

const addTodo = (todo: any, event?: any) => {
    // create new todo
    const newTodo = {
        id: new Date().getTime().toString() + Math.floor(Math.random() * 1000000),
        todo,
        checked: false,
    }
    // if field is not empty
    if (todo) {
        let oldList = JSON.parse(JSON.stringify(list.value))
        // add the todo to the list
        let newList = [...oldList, newTodo];
        list.value = newList;
        listStore.updateList(newList);
        console.log(newList);
    }
    // clear input box
    input.value = "";
};

const deleteTodo = (item: any) => {
    // Filter out todo with the id
    if (item.checked === true) {
        let newDoneList = doneList.value.filter((todo: any) => todo.id !== item.id);
        doneList.value = newDoneList;
        listStore.updateDoneList(newDoneList);
        console.log(newDoneList);
    } else {
        let newList = list.value.filter((todo: any) => todo.id !== item.id);
        list.value = newList;
        listStore.updateList(newList);
        console.log(newList);
    }
};

const checkTodo = (item: any) => {
    //prepare the checked todo
    const checkedTodo = {
        id: item.id,
        todo: item.todo,
        checked: true,
    };

    //prepare the todo to uncheck
    const uncheckedTodo = {
        id: item.id,
        todo: item.todo,
        checked: false,
    };

    let oldList = JSON.parse(JSON.stringify(list.value))
    let oldDoneList = JSON.parse(JSON.stringify(doneList.value))

    if (item.checked === false) {
        let uncheckedList = oldList.filter((todo: any) => todo.id !== item.id);
        list.value = uncheckedList;
        console.log(uncheckedList);
        // add the todo to the list
        let checkedList = [...oldDoneList, checkedTodo];
        doneList.value = checkedList;
        console.log(checkedList);
        listStore.updateList(uncheckedList);
        listStore.updateDoneList(checkedList);
    } else {
        let uncheckedList = [...oldList, uncheckedTodo];
        list.value = uncheckedList;
        listStore.updateList(uncheckedList);
        console.log(uncheckedList);

        const checkedList = oldDoneList.filter(
            (todo: any) => todo.id !== item.id
        );

        console.log(checkedList);
        doneList.value = checkedList;
        listStore.updateDoneList(checkedList);
    }
};

onMounted(() => {
    list.value = listStore.getList;
    doneList.value = listStore.getDoneList;
    Dark.value = settingsStore.getDark
});
</script>
  