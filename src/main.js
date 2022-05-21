import { createApp } from "vue";
import App from "./App.vue";
import "./global.css";
import faker from "@faker-js/faker";

// Pinia instance
import pinia from "./stores/piniaInstance";

const app = createApp(App);

app.use(pinia);

let username = faker.animal.dog();
let token = faker.animal.fish();

app.mount("#app");
