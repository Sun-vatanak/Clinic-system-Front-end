import "@/assets/css/custom.scss";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "@/assets/css/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/views/auth/auth";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_HOST;

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
authStore.loadUser();


app.mount("#app");
