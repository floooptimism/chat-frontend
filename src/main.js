import { createApp } from "vue";
import { initSupaBase } from "./modules/supabase/supabase";
import App from "./App.vue";
import "./global.css";
import { vfmPlugin } from 'vue-final-modal'

//* Pages
import Chat from "./pages/ChatPage.vue";
import Login from "./pages/LoginPage.vue";

//* Router
import { createRouter, createWebHistory } from "vue-router";

//* Pinia instance and some stores
import pinia from "./stores/piniaInstance";
import useAuthStore from "./stores/auth.store";

//* Initialize supabase
initSupaBase();

const authStore = useAuthStore();


const routes = [
  {
    path: "/",
    name: "chat",
    component: Chat,
    beforeEnter: () => {
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
    beforeEnter: () => {
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
app.use(vfmPlugin);

app.mount("#app");


