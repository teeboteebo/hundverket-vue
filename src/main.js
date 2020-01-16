import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"

// Import of bootstrap
import './scss/bootstrap.scss'
import BootstrapVue from 'bootstrap-vue'

// WYSIWYG Editor
import CKEditor from '@ckeditor/ckeditor5-vue';



Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(CKEditor);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
