import Power from './compoments/power/power.vue'
import Region from './compoments/region/region.vue'
import User from './compoments/user/user.vue'
import Group from './compoments/region/group.vue'
import Village from './compoments/village/village.vue'
import VillageDetail from './compoments/village/villageDetail.vue'
import Role from './compoments/role/role.vue'
import CACollect from './compoments/achievement/companyAchievement/CACollect.vue'
import CARenting from './compoments/achievement/companyAchievement/CARenting.vue'
import GNCollect from './compoments/achievement/gleefulNews/GNCollect.vue'
import GNRenting from './compoments/achievement/gleefulNews/GNRenting.vue'
import PeriodicForGroup from './compoments/achievement/periodic/periodicForGroup.vue'
import PeriodicForPeople from './compoments/achievement/periodic/periodicForPeople.vue'
import WACollect from './compoments/achievement/wagesAchievement/WACollect.vue'
import WARenting from './compoments/achievement/wagesAchievement/WARenting.vue'

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
    },
    {
        path: '/cACollect',
        name: 'CACollect',
        component: CACollect
    },
    {
        path: '/cARenting',
        name: 'CARenting',
        component: CARenting
    },
    {
        path: '/gNCollect',
        name: 'GNCollect',
        component: GNCollect
    },
    {
        path: '/gNRenting',
        name: 'GNRenting',
        component: GNRenting
    },
    {
        path: '/periodicForGroup',
        name: 'PeriodicForGroup',
        component: PeriodicForGroup
    },
    {
        path: '/periodicForPeople',
        name: 'PeriodicForPeople',
        component: PeriodicForPeople
    },
    {
        path: '/wACollect',
        name: 'WACollect',
        component: WACollect
    },
    {
        path: '/wARenting',
        name: 'WARenting',
        component: WARenting
    }
]