import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Gallery from "../views/Gallery.vue"
import Dogs from "../views/Dogs.vue"
import Ebbe from "../views/Ebbe.vue"
import Sally from "../views/Sally.vue"
import Admin from "../views/Admin.vue"

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
    component: Gallery,
  },
  {
    path: "/hundarna",
    name: "hundarna",
    component: Dogs
  },
  {
    path: "/hundarna/ebbe",
    name: "ebbe",
    component: Ebbe
  },
  {
    path: "/hundarna/sally",
    name: "sally",
    component: Sally
  },
  {
    path: "/om",
    name: "om mig",
    component: About,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  }  
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router;
