import Power from "./compoments/power/power.vue";                       //权限管理
import User from "./compoments/user/user.vue";                          //用户管理
import Role from "./compoments/role/role.vue";                          //角色
// import Village from "./compoments/village/village.vue";
import VillageDetail from "./compoments/village/villageDetail.vue";
import CACollect from './compoments/achievement/companyAchievement/CACollect.vue'
import CARenting from './compoments/achievement/companyAchievement/CARenting.vue'
import GNCollect from './compoments/achievement/gleefulNews/GNCollect.vue'
import GNRenting from './compoments/achievement/gleefulNews/GNRenting.vue'
import PeriodicForGroup from './compoments/achievement/periodic/periodicForGroup.vue'
import PeriodicForPeople from './compoments/achievement/periodic/periodicForPeople.vue'
import WACollect from './compoments/achievement/wagesAchievement/WACollect.vue'
import WARenting from './compoments/achievement/wagesAchievement/WARenting.vue'
import Compare from './compoments/achievement/companyAchievement/compare.vue'   // 公司业绩收租房对比
import Calc from './compoments/achievement/wagesAchievement/calc.vue'       // 计算详情
import Chart from './compoments/achievement/chart/chart.vue'

import Custom from "./compoments/custom/custom.vue";                        //客户
import Details from "./compoments/custom/custom_more.vue";                  //客户详情
import CustomerPool from "./compoments/custom/custom_pool.vue";             //客户池
import OkCollect from "./compoments/housingSupervise/collectHouse.vue";                     //已收房源
import CollectDetail from "./compoments/housingSupervise/collectHouseDetail.vue";           //已收房源更多
import NoCollect from "./compoments/housingSupervise/uncollectHouse.vue";                   //未收房源
import Collect_More from "./compoments/housingSupervise/uncollectHouseDetail.vue";          //未收房源更多
import CollectContract from "./compoments/contract/collectContract.vue";         //收房合同
import RentingContract from "./compoments/contract/rentingContract.vue";         //租房合同
import ContractDetail from './compoments/contract/contractDetail.vue'           // 合同详情

import  Back from './compoments/user/back.vue'

export default[
    {
        path: '/power',             //权限管理
        name: 'Power',
        component: Power
    },
    {
        path: '/user',              //角色管理
        name: 'User',
        component: User
    },
    {
        path: '/role',              //角色
        name: 'Role',
        component: Role
    },
    // {
    //     path: '/village',
    //     name: 'Village',
    //     component: Village
    // },
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
        path: '/collectDetail',     //客户详情
        name: 'collectDetail',
        component: CollectDetail
    },{
        path: '/collectMore',       //客户详情
        name: 'collectMore',
        component: Collect_More
    },
    {
        path: '/compare',
        name: 'Compare',
        component: Compare
    },
    {
        path: '/calc',
        name: 'Calc',
        component: Calc
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart
    },
    {
        path: '/back',
        name: 'Back',
        component: Back
    },
    {
        path: '/CollectContract',
        name: 'CollectContract',
        component: CollectContract
    },
    {
        path: '/RentingContract',
        name: 'RentingContract',
        component: RentingContract
    },
    {
        path: '/contractDetail',
        name: 'ContractDetail',
        component: ContractDetail
    }
]