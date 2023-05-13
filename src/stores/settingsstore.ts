import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settigsstore", {
  state: () => ({
    dark: false,
  }),
  getters: {
    getDark: (state: any) => state.dark
  },
  actions: {
    switchMode(){
      var root = document.getElementById("app");
      if(root?.classList.contains('dark')){
        this.$patch({dark: true})
        root?.classList.toggle("dark");
      }
      else {
        this.$patch({dark: false})
        root?.classList.toggle("dark")
      }
      console.log(this.dark)
    }
  },
  persist: true
});
