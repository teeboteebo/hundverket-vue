import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "hem",
    component: Home
  },
  {
    path: "/galleri",
    name: "galleri",
    component: About,
  },
  {
    path: "/hundarna",
    name: "hundarna",
    component: Home
  },
  {
    path: "/om",
    name: "om mig",
    component: About,
  },
  {
    path: "/admin",
    name: "admin",
    component: About,
  }  
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router;
