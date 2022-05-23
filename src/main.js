import { createApp } from "vue";
import App from "./App.vue";
import "./global.css";
import { initSupaBase } from "./modules/supabase/supabase";

//* Initialize supabase
initSupaBase();

//* Pages
import Login from "./pages/Login.vue";
import Chat from "./pages/Chat.vue";

//* Pinia instance and some stores
import pinia from "./stores/piniaInstance";
import useAuthStore from "./stores/auth.store";
const authStore = useAuthStore();

//* Router
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "chat",
    component: Chat,
    beforeEnter: (to, from) => {
      if (!authStore.authenticated) {
        return { name: "login" };
      }
      return true;
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from) => {
      if (authStore.authenticated) {
        return { name: "chat" };
      }
      return true;
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount("#app");
