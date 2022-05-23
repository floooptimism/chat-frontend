import { defineStore } from "pinia";

const useSideBarStore = defineStore("sidebar", {
  states: {
    isOpen: false,
    isDisplayingChannels: false,
  },

  actions: {
    toggleSideBar() {
      this.isOpen = !this.isOpen;
    },
    toggleIsDisplayingChannels() {
      this.isDisplayingChannels = !this.isDisplayingChannels;
    },
    setIsDisplayingChannels(param) {
      this.isDisplayingChannels = param;
    },
  },
});

export default useSideBarStore;
