import { defineStore } from "pinia";

const useChatClientState = defineStore("chatClientState", {
  state: () => {
    return {
      isConnected: false,
      isConnecting: false,
    };
  },

  actions: {
    connecting() {
      this.isConnecting = true;
    },
    connected() {
      this.isConnecting = false;
      this.isConnected = true;
    },
    disconnected() {
      this.isConnected = false;
    },
  },
});

export default useChatClientState;
