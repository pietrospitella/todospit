<template>
    <div>
        <header class="w-auto flex justify-between items-center">
            <h1
                class="py-4 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                <img :src="logo" alt="logo" style="border-radius: 8px; max-height: 104px; display: inline-block;">
                TodoSpit
            </h1>
            <Button
                variant="ghost"
                iconOnly="hi-adjustments"
                iconScale=1.8
                :handleClick="() => router.push({name: 'settings'})"
            />
        </header>
        <div class="p-inputgroup flex">
            <input type="text" v-model="input" placeholder="Add Task"
                class="rounded-full border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                @keyup="($event) => { $event.key === 'Enter' ? addTodo(input) : null }" />
            <Button
                variant="icon"
                btnColor="blue"
                iconOnly="hi-plus"
                extraClass="ml-2"
                :handleClick="()=>addTodo(input)"
            />
            <Button
                variant="icon"
                btnColor="green"
                :iconOnly="modeIcon"
                extraClass="ml-2"
                :handleClick="() => settingsStore.switchMode()"
            />
        </div>
        <h2 class="my-4 text-xl text-black dark:text-white font-bold">To Be Completed</h2>
        <TransitionGroup tag="div" name="list" v-if="list.length > 0"
            class="block font-bold text-center border-round py-4">
            <div 
                v-for="item in list.sort((a: any, b: any) => (a.id > b.id) ? -1 : 1)" 
                :key="item.id"
            >
                <list-item 
                    :key="listItemKey"
                    :id="item.id" 
                    :title="item.title"
                    :dueDate="item.dueDate"
                    :isDone="item.isDone" 
                    @edit="(data: any) => editTodo(item, data)"
                    :handleCheck="() => checkTodo(item)"
                    :handleDelete="() => deleteTodo(item)" 
                />
            </div>
        </TransitionGroup>
        <p v-else class="text-left text-black dark:text-white">
            No todos to complete 👏🏻
        </p>
        <h2 class="my-4 text-xl text-black dark:text-white font-bold">Completed</h2>
        <TransitionGroup tag="div" name="list" v-if="doneList.length > 0"
            class="block font-bold text-center border-round py-4">
            <div v-for="item in doneList.sort()" :key="item.id">
                <list-item 
                    :key="listItemKey"
                    :id="item.id" 
                    :title="item.title"
                    :isDone="item.isDone" 
                    @edit="(data: any) => editTodo(item, data)"
                    :handleCheck="() => checkTodo(item)"
                    :handleDelete="() => deleteTodo(item)" 
                />
            </div>
        </TransitionGroup>
        <p v-else class="text-left text-black dark:text-white">
            No todos completed</p>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import ListItem from "@components/ListItem.vue"
import Button from "@components/Button.vue"
import { useListStore } from "@stores/liststore.ts"
import { useSettingsStore } from "@stores/settingsstore.ts"
import { useAuthStore } from "@stores/authstore.ts"
import logo from "@assets/todospit_logo.png"
import { useRouter } from "vue-router"
import { onSnapshot, collection, query, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { db } from '../main'
import { IListItem } from "@/types/list"

const router = useRouter()
const authStore = useAuthStore()
const listStore = useListStore()
const settingsStore = useSettingsStore()
const list = ref<IListItem[]>([])
const doneList = ref<IListItem[]>([])
const input = ref('')
const Dark = ref()
const listItemKey = ref(0)

const modeIcon = computed(() => {
    if (settingsStore.getDark) {
        return 'hi-sun'
    } else {
        return 'hi-moon'
    }
})

const generateUUID = () => {
  const uuid = crypto.randomUUID()
  const formattedUUID = uuid.replace(/([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/g, '$1-$2-$3-$4-$5')
  return formattedUUID.toUpperCase()
}

const addTodo = async (title: any, event?: any) => {
    // create new todo
    let newTodoId = generateUUID()
    
    const newTodo = {
        id: newTodoId,
        title,
        createDate: new Date().getTime() / 1000,
        dueDate: new Date().getTime() / 1000,
        isDone: false
    }
    // if field is not empty
    if (title) {
        let oldList = JSON.parse(JSON.stringify(list.value))
        // add the todo to the list
        let newList = [...oldList, newTodo]
        list.value = newList
        listStore.updateList(newList)
    }
    if (!authStore.guestMode) {
        const userTodosRef = collection(db, "users", authStore.user?.uid, "todos")
        await setDoc(doc(userTodosRef, newTodoId), newTodo)
    }
    // clear input box
    input.value = ""
}

const editTodo = async (item: any, data: any) => {
    listStore.editListItem(item, data.data)
    if (!authStore.guestMode) {
        const userTodosRef = collection(db, "users", authStore.user?.uid, "todos")
        await updateDoc(doc(userTodosRef, item.id), {
            title: data.data.title
            // dueDate: data.data.dueDate,
            // createDate: data.data.createDate,
            // isDone: data.data.isDone
        }) 
    }
    listItemKey.value += 1
}

const deleteTodo = async (item: any) => {
    // Filter out todo with the id
    if (item.isDone) {
        let newDoneList = doneList.value.filter((todo: any) => todo.id !== item.id)
        doneList.value = newDoneList
        listStore.updateDoneList(newDoneList)
    } else {
        let newList = list.value.filter((todo: any) => todo.id !== item.id)
        list.value = newList
        listStore.updateList(newList)
    }
    if (!authStore.guestMode) {
        const userTodosRef = collection(db, "users", authStore.user.uid, "todos")
        await deleteDoc(doc(userTodosRef, item.id))
    }
}

const checkTodo =async (item: any) => {
    // prepare the checked todo
    const checkedTodo = {
        id: item.id,
        title: item.title,
        createDate: item.createDate,
        dueDate: item.dueDate,
        isDone: true
    }

    //prepare the todo to uncheck
    const uncheckedTodo = {
        id: item.id,
        title: item.title,
        createDate: item.createDate,
        dueDate: item.dueDate,
        isDone: false
    }

    let oldList = JSON.parse(JSON.stringify(list.value))
    let oldDoneList = JSON.parse(JSON.stringify(doneList.value))

    if (item.isDone === false) {
        let uncheckedList = oldList.filter((todo: any) => todo.id !== item.id)
        list.value = uncheckedList
        // add the todo to the list
        let checkedList = [...oldDoneList, checkedTodo]
        doneList.value = checkedList
        listStore.updateList(uncheckedList)
        listStore.updateDoneList(checkedList)
    } else {
        let uncheckedList = [...oldList, uncheckedTodo]
        list.value = uncheckedList
        listStore.updateList(uncheckedList)

        const checkedList = oldDoneList.filter(
            (todo: any) => todo.id !== item.id
        )

        doneList.value = checkedList
        listStore.updateDoneList(checkedList)
    }
    if (!authStore.guestMode) {
        const userTodosRef = collection(db, "users", authStore.user.uid, "todos")
        await updateDoc(doc(userTodosRef, item.id), {
            isDone: !item.isDone
        }) 
    }
}

onMounted(async () => {
    if (!authStore.guestMode) {
        const userTodosRef = collection(db, "users", authStore.user.uid, "todos")
        const q = query(userTodosRef)
        onSnapshot(q, (snapshot) => {
            const newList: IListItem[] = []
            const newDoneList: IListItem[] = []
            snapshot.forEach((doc) => {
                const todo = { id: doc.id, ...doc.data() } as IListItem
                if (todo.isDone) {
                    newDoneList.push(todo)
                } else {
                    newList.push(todo)
                }
            })
            list.value = newList
            doneList.value = newDoneList
            listStore.updateList(newList)
            listStore.updateDoneList(newDoneList)
        })
    } else {
        list.value = listStore.getList
        doneList.value = listStore.getDoneList
    }
    Dark.value = settingsStore.getDark
});
</script>
