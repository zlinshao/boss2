import Power from './compoments/power/power.vue'
import Region from './compoments/region/region.vue'
import User from './compoments/user/user.vue'
import Tea from './compoments/region/1.vue'

export default[
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
        path: '/role',
        name: 'Role',
        component: Role
    },
    {
        path: '/group',
        name: 'Group',
        component: Group
    },
    {
        path: '/village',
        name: 'Village',
        component: Village
    },
    {
        path: '/villageDetail',
        name: 'VillageDetail',
        component: VillageDetail
    }
]