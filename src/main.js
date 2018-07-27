import Vue from 'vue'
import App from './App.vue'
import Boss from './boss.config.js'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './store/index.js'
import routes from './routerConfig.js'
import Loading from './compoments/loading'
import Vuex from 'vuex'
// import Vueditor from 'vueditor'
// 引入echarts
import echarts from 'echarts'

Vue.use(Loading);
Vue.use(Vuex);

Vue.use(Boss);
Vue.use(VueRouter);
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Env'] = globalConfig.env;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = globalConfig.server;
Vue.prototype.$echarts = echarts;


const router = new VueRouter({
    mode: 'history', //切换路径模式，变成history模式
    scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use((config) => {  //配置发送请求的信息
    if(router.currentRoute.path !=='/meeting'){
        store.dispatch('showLoading');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => { //配置请求回来的信息
    store.dispatch('hideLoading');
    return response;
}, function (error) {
    return Promise.reject(error);
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
