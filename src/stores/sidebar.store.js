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
    setIsDisplayingChannels(displayChannel) {
      this.isDisplayingChannels = displayChannel;
    },
  },
});

export default useSideBarStore;
