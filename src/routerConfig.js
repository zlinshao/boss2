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
        path: '/tea',
        name: 'Tea',
        component: Tea
    },
    {
        path: '/region',
        name: 'Region',
        component: Region
    }
]