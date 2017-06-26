import Power from "./compoments/power/power.vue";
import Region from "./compoments/region/region.vue";
import User from "./compoments/user/user.vue";
import Role from "./compoments/role/role.vue";
import Group from "./compoments/region/group.vue";
import Village from "./compoments/village/village.vue";
import VillageDetail from "./compoments/village/villageDetail.vue";
import Custom from "./compoments/custom/custom.vue";                    //客户
import Details from "./compoments/custom/details.vue";                  //客户详情
import CustomerPool from "./compoments/custom/customerPool.vue";        //客户池
import OkCollect from "./compoments/collect/okCollect.vue";             //已收房源
import NoCollect from "./compoments/collect/noCollect.vue";             //未收房源
import CACollect from './compoments/achievement/companyAchievement/CACollect.vue'
import CARenting from './compoments/achievement/companyAchievement/CARenting.vue'
import GNCollect from './compoments/achievement/gleefulNews/GNCollect.vue'
import GNRenting from './compoments/achievement/gleefulNews/GNRenting.vue'
import PeriodicForGroup from './compoments/achievement/periodic/periodicForGroup.vue'
import PeriodicForPeople from './compoments/achievement/periodic/periodicForPeople.vue'
import WACollect from './compoments/achievement/wagesAchievement/WACollect.vue'
import WARenting from './compoments/achievement/wagesAchievement/WARenting.vue'


import yi from "./compoments/role/1.vue";
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
    },
    {
        path: '/custom',            //客户
        name: 'custom',
        component: Custom
    },
    {
        path: '/customerPool',      //客户池
        name: 'customerPool',
        component: CustomerPool
    },
    {
        path: '/OkCollect',         //已收房源
        name: 'OkCollect',
        component: OkCollect
    },
    {
        path: '/noCollect',         //未收房源
        name: 'noCollect',
        component: NoCollect
    },
    {
        path: '/details',         //客户详情
        name: 'details',
        component: Details
    },
    {
        path: '/yi',
        name: 'yi',
        component: yi
    }
]