import Power from './compoments/power/power.vue'
import Region from './compoments/region/region.vue'
import User from './compoments/user/user.vue'
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
]