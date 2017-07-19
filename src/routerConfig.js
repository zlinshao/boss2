import Power from "./compoments/power/power.vue";                       //权限管理
import User from "./compoments/user/user.vue";                          //用户管理
import Role from "./compoments/role/role.vue";                          //角色
// import Village from "./compoments/village/village.vue";
// import VillageDetail from "./compoments/village/villageDetail.vue";
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
import Dream from './compoments/achievement/salemanSalary/dream.vue'        // 梦想包
import Drumstick from './compoments/achievement/salemanSalary/drumstick.vue'    // 鸡腿包
import AFACollect from './compoments/achievement/agencyFeeAplicarion/AFACollect.vue'    // 收房中介费
import AFARenting from './compoments/achievement/agencyFeeAplicarion/AFARenting.vue'    // 租房中介费

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

// 账本
import Account from './compoments/finance/account.vue'                          // 账号管理
import Subject from './compoments/finance/subject/subject.vue'                          // 科目管理
import Classify from './compoments/finance/subject/classify.vue'                          // 科目管理
import Jurisdiction from './compoments/finance/jurisdiction.vue'                          // 科目管理
import CollectFlow from './compoments/finance/incomeFlow/collect.vue'           // 收支流水
import PayFlow from './compoments/finance/incomeFlow/pay.vue'                    // 收支流水
import PayingRent from './compoments/finance/incomeFlow/payingRent.vue'         // 收支流水
import CollectRent from './compoments/finance/incomeFlow/collectRent.vue'         // 收支流水
import PendingItem from './compoments/finance/pendingItem.vue'                  // 待处理项
import GeneralOperation from './compoments/finance/generalOperation.vue'        // 总账操作
import GeneralRecord from './compoments/finance/generalRecord.vue'              // 总账操作记录
import Chart from './compoments/finance/chart/chart.vue'
import LogRecord from './compoments/logRecord/logRecord.vue'                    // 日志操作记录
import MessageCenter from  './compoments/messageCenter/messageCenter.vue'
import CollectOrder from './compoments/user/collectOrder.vue'    //收房订单管理
import RentingOrder from './compoments/user/rentingOrder.vue'    //租房订单管理

import CheckIn from './compoments/checkIn/checkIn.vue'    //定位签到

import ReportedCollect from './compoments/reported/reportedCollect.vue'    //收房报备
import ReportedRenting from './compoments/reported/reportedRenting.vue'    //租房报备



import lockScreen from './compoments/lock_screen/lock_screen.vue'     //锁屏

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
    /*{
        path: '/village',
        name: 'Village',
        component: Village
    },
    {
        path: '/villageDetail',
        name: 'VillageDetail',
        component: VillageDetail
    },*/
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
        path: '/dream',
        name: 'Dream',
        component: Dream
    },
    {
        path: '/drumstick',
        name: 'Drumstick',
        component: Drumstick
    },
    {
        path: '/aFACollect',
        name: 'AFACollect',
        component: AFACollect
    },
    {
        path: '/aFARenting',
        name: 'AFARenting',
        component: AFARenting
    },
    {
        path: '/calc',
        name: 'Calc',
        component: Calc
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
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    },
    {
        path: '/subject',
        name: 'Subject',
        component: Subject
    },
    {
        path: '/classify',
        name: 'Classify',
        component: Classify
    },
    {
        path: '/jurisdiction',
        name: 'Jurisdiction',
        component: Jurisdiction
    },
    {
        path: '/collectFlow',
        name: 'CollectFlow',
        component: CollectFlow
    },
    {
        path: '/payFlow',
        name: 'PayFlow',
        component: PayFlow
    },
    {
        path: '/payingRent',
        name: 'PayingRent',
        component: PayingRent
    },
    {
        path: '/collectRent',
        name: 'CollectRent',
        component: CollectRent
    },
    {
        path: '/pendingItem',
        name: 'PendingItem',
        component: PendingItem
    },
    {
        path: '/generalOperation',
        name: 'GeneralOperation',
        component: GeneralOperation
    },
    {
        path: '/generalRecord',
        name: 'GeneralRecord',
        component: GeneralRecord
    },
    {
        path: '/logRecord',
        name: 'LogRecord',
        component: LogRecord
    },
    {
        path: '/messageCenter',
        name: 'MessageCenter',
        component: MessageCenter
    },
    {
        path: '/orderManage',
        name: 'CollectOrder',
        component: CollectOrder
    },
    {
        path: '/rentingOrder',
        name: 'RentingOrder',
        component: RentingOrder
    },
    {
        path: '/lockScreen',
        name: 'lock_screen',
        component: lockScreen
    },
    {
        path: '/checkIn',
        name: 'CheckIn',
        component: CheckIn
    },
    {
        path: '/reportedCollect',
        name: 'ReportedCollect',
        component: ReportedCollect
    },
    {
        path: '/reportedRenting',
        name: 'ReportedRenting',
        component: ReportedRenting
    }
]