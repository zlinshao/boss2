import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routerConfig.js'
// import vuex from 'vuex'

import  Head from './compoments/header'
import  AddGroup from './compoments/addGroup'

import axios from 'axios'
Vue.prototype.$http = axios;

Vue.use(Head);
Vue.use(VueRouter);
// Vue.use(vuex)
Vue.use(AddGroup)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
