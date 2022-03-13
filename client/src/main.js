import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './Store/store'
import axios from 'axios'


Vue.config.productionTip = false

//Setting up tdefault vue's http modules for api calls
Vue.prototype.$http = axios;
//Load the token from the localStorage
const token = localStorage.getItem("token");
//If there is a token, we will append default axios authorization headers
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
