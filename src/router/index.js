import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Gallery from "../views/Gallery.vue"
import Dogs from "../views/Dogs.vue"
import Dog from "../views/Dog.vue"
import Admin from "../views/Admin.vue"
import NewArticle from "../views/NewArticle.vue"
import ArticlePage from "../views/ArticlePage.vue"
import MissingPage from "../views/MissingPage.vue"

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
  },
  {
    path: "*",
    name: "missingpage",
    component: MissingPage
  },
  {
    path: "/api*",
    name: "missingpage",
    component: MissingPage
  },
  {
    path: "/nytt-inlagg",
    name: "nyttinlagg",
    component: NewArticle
  },
  {
    path: "/inlagg/:link",
    name: "inlagg",
    component: ArticlePage,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router;
