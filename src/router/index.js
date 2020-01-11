import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Gallery from "../views/Gallery.vue"
import Dogs from "../views/Dogs.vue"
import Dog from "../views/Dog.vue"
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
    path: "/hundarna/:dog",
    name: "hund",
    component: Dog
  },
  {
    path: "/om-oss",
    name: "om oss",
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
