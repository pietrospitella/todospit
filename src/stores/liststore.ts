import { IListItem } from "@/types/list"
import { ListStore } from "@/types/store"
import { defineStore } from "pinia"

export const useListStore = defineStore("liststore", {
  state: (): ListStore => ({
    list: [],
    doneList: []
  }),
  getters: {
    getList: (state: any) => state.list,
    getDoneList: (state: any) => state.doneList
  },
  actions: {
    updateList(newList: any) {
      this.$patch({list: newList})
    },
    updateDoneList(newDoneList: any) {
      this.$patch({doneList: newDoneList})
    },
    editListItem(item: IListItem, data: IListItem) {
      this.$patch((state) => {
        const listToUpdate = item.isDone ? state.doneList : state.list
        const idx = listToUpdate.findIndex((e) => e.id === item.id)
        if (idx !== -1) {
          listToUpdate[idx].title = data.title
          listToUpdate[idx].isDone = item.isDone
          listToUpdate[idx].dueDate = item.dueDate
          listToUpdate[idx].createDate = item.createDate
        }
      })
    }
  },
  persist: true
})
