import Power from "./compoments/power/power.vue";                       //权限管理
import Region from "./compoments/region/region.vue";
import User from "./compoments/user/user.vue";                          //用户管理
import Role from "./compoments/role/role.vue";                          //角色
import Group from "./compoments/region/group.vue";
import Village from "./compoments/village/village.vue";
import VillageDetail from "./compoments/village/villageDetail.vue";
import Custom from "./compoments/custom/custom.vue";                        //客户
import Details from "./compoments/custom/custom_more.vue";                  //客户详情
import CustomerPool from "./compoments/custom/custom_pool.vue";             //客户池
import OkCollect from "./compoments/collect/okCollect.vue";                 //已收房源
import CollectDetail from "./compoments/collect/okCollect_more.vue";        //已收房源更多
import NoCollect from "./compoments/collect/noCollect.vue";                 //未收房源
import Collect_More from "./compoments/collect/noCollect_more.vue";         //未收房源更多

import yi from "./compoments/role/1.vue";

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
        path: '/region',
        name: 'Region',
        component: Region
    },
    {
        path: '/role',              //角色
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
        path: '/details',           //客户详情
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
        path: '/yi',
        name: 'yi',
        component: yi
    }
]