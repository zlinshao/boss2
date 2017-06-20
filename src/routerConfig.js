import Vue from 'vue'
import Router from 'vue-router'

import Power from './compoments/power/power.vue'
import Region from './compoments/region/region.vue'
import User from './compoments/user/user.vue'
import Area from './compoments/region/group.vue'
import Village from './compoments/village/village.vue'
import VillageDetail from './compoments/village/VillageDetail.vue'

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
        },
        {
            path: '/group',
            name: 'Area',
            component: Area
        },
        {
            path: '/village',
            name: 'Village',
            component: Village
        },
        {
            path: '/VillageDetail',
            name: 'VillageDetail',
            component: VillageDetail
        }
    ]
})