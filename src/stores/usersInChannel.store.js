import { defineStore } from "pinia";

const useUsersInChannel = defineStore("usersInChannel", {
  state: () => {
    return {
      users: [],
    };
  },

  actions: {
    updateUsers(users) {
      this.users = users;
    },
  },
});

export default useUsersInChannel;
