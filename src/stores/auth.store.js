import { defineStore } from "pinia";

const useAuth = defineStore("auth", {
  state: () => {
    return {
      authenticated: false,
      token: "",
    };
  },

  actions: {
    setAuth(auth) {
      this.authenticated = auth;
    },
    setToken(token) {
      this.token = token;
    },
  },
});

export default useAuth;
