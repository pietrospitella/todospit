import { SettingsStore } from "@/types/store"
import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settigsstore", {
  state: (): SettingsStore => ({
    dark: false
  }),
  getters: {
    getDark: (state: any) => state.dark
  },
  actions: {
    loadMode(){
      var root = document.getElementById("app")
      if(this.dark){
        root?.classList.add("dark")
      }
    },
    switchMode(){
      var root = document.getElementById("app")
      if(root?.classList.contains('dark')){
        root?.classList.remove("dark");
        this.$patch({dark: false})
      }
      else {
        this.$patch({dark: true})
        root?.classList.add("dark")
      }
    }
  },
  persist: true
});
