import Vue from 'vue'
import Router from 'vue-router'

import Head from './compoments/header'
import Power from './compoments/power/power.vue'
import Region from './compoments/region/region.vue'
import User from './compoments/user/user.vue'

Vue.use(Head)
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/power',
            name: 'Power',
            component: Power
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/region',
            name: 'Region',
            component: Region
        }
    ]
})