import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import App from "./App.vue";
import RettiwtPost from "./components/RettiwtPost";
import LogIn from "./components/LogIn";
import RegisterIn from "./components/RegisterIn";

const routes = [
  { path: "/", component: RettiwtPost },
  { path: "/login", component: LogIn },
  { path: "/register", component: RegisterIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(router).mount("#app");
