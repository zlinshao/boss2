import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routerConfig.js'
import  Loading from './compoments/header'
import axios from 'axios'
Vue.prototype.$http = axios;


Vue.use(Loading);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
