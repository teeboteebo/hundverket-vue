import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    toggleLogin(state, value) {
      state.loggedIn = value;
    }
  },
  actions: {
    async checkIfLoggedIn(context) {      
      let loggedIn = await axios({
        method: 'get',
        url: '/api/login'
      })
      if (loggedIn.data._id){
        context.commit('toggleLogin', loggedIn.data)
      } else {
        context.commit('toggleLogin', false)
      }
    }
  },
  modules: {}
});