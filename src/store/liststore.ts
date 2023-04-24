import { defineStore } from "pinia";

export const useListStore = defineStore("liststore", {
//   return {
    state: () => ({
      list: [],
      doneList: [],
    }),
    getters: {
      getList: (state: any) => state.list,
      getDoneList: (state: any) => state.doneList,
    },
    actions: {
      updateList(newList: any){
        debugger
        this.$patch({list: newList})
        console.log(this.list)
      },
      updateDoneList(newDoneList: any){
        this.$patch({doneList: newDoneList})
      },
    },
    persist: true
//   };
});
