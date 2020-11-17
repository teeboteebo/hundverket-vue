import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from 'axios'

// Import of bootstrap
import "./scss/bootstrap.scss";
import BootstrapVue from "bootstrap-vue";

// WYSIWYG Editor
import CKEditor from "@ckeditor/ckeditor5-vue";
// axios.defaults.baseURL = "http://localhost:9000"
axios.defaults.baseURL = "https://hundverket.herokuapp.com"
axios.defaults.headers['Access-Control-Allow-Origin'] = "*"
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(CKEditor);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
