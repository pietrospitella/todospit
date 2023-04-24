<template>
  <div class="card-container h-screen p-4 bg-white dark:bg-black">
    <h1
      class="py-4 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight"
    >
      <img :src="logo" alt="logo" style="border-radius: 8px; max-height: 104px; display: inline-block;">
      TodoSpit
    </h1>
    <div class="p-inputgroup flex">
      <input
        type="text"
        v-model="input"
        placeholder="Aggiungi Task"
        class="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        @keyup="($event)=>{$event.key === 'Enter' ? addTodo(input) : null}"
      />
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded"
        @click="()=>addTodo(input)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <button
        type="button"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded"
        @click="()=>switchMode()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </button>
    </div>
    <h2 class="my-4 text-xl text-black dark:text-white font-bold">Da fare</h2>
    <div
      v-if="list.length > 0"
      class="block font-bold text-center border-round py-4"
    >
      <div v-for="key in list.sort((a, b) => (a.id > b.id) ? -1 : 1)" :key="key.id">
        <list-item
          :id="key.id"
          :checked="key.checked"
          :handleCheck="()=>checkTodo(key)"
          :handleDelete="()=>deleteTodo(key)"
          :todo="key.todo"
        >
        </list-item>
      </div>
    </div>
    <p v-else class="text-left text-black dark:text-white">
      Nesun todo da completare 👏🏻
    </p>
    <h2 class="my-4 text-xl text-black dark:text-white font-bold">Completati</h2>
    <div
      v-if="doneList.length > 0"
      class="block font-bold text-center border-round py-4"
    >
      <div v-for="key in doneList.sort()" :key="key.id">
        <list-item
          :id="key.id"
          :checked="key.checked"
          :handleCheck="()=>checkTodo(key)"
          :handleDelete="()=>deleteTodo(key)"
          :todo="key.todo"
        ></list-item>
      </div>
    </div>
    <p v-else class="text-left text-black dark:text-white">
      Nesun todo completato</p>
  </div>
</template>

<script setup lang="ts">
import './styles.css'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from "vue";
import ListItem from "./components/ListItem.vue";
import { useListStore } from "./store/liststore";
const list = ref([]) as any;
const doneList = ref([]) as any;
const input = ref('');
const listStore = useListStore();
import logo from '../src/assets/todospit_logo.png'

const switchMode = () => {
  var root = document.getElementById("app");
  root?.classList.toggle("dark");
};

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
});
</script>
