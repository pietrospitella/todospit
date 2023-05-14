import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settigsstore", {
  state: () => ({
    dark: false,
  }),
  getters: {
    getDark: (state: any) => state.dark
  },
  actions: {
    loadMode(){
      var root = document.getElementById("app");
      if(this.dark){
        root?.classList.add("dark")
        console.log(this.dark)
      }
    },
    switchMode(){
      var root = document.getElementById("app");
      if(root?.classList.contains('dark')){
        root?.classList.remove("dark");
        this.$patch({dark: false})
        console.log(this.dark)
      }
      else {
        this.$patch({dark: true})
        root?.classList.add("dark")
        console.log(this.dark)
      }
    }
  },
  persist: true
});
