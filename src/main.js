import Vue from 'vue'
//import Vuex from 'vuex'
//import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './routes/index'
import App from './App.vue'
import iView from 'iview'
import  './assets/css/iview.css'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});



