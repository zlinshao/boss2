import Power from "./compoments/power/power.vue";                                               //权限管理
import Index from "./index.vue";                                                                //权限管理
import User from "./compoments/user/user.vue";                                                  //用户管理
import Role from "./compoments/role/role.vue";                                                  //角色

import FunctionLine from "./compoments/functionLine/function_line.vue";                         //功能排期
// import Village from "./compoments/village/village.vue";
// import VillageDetail from "./compoments/village/villageDetail.vue";
import CACollect from './compoments/achievement/companyAchievement/CACollect.vue'
import CARenting from './compoments/achievement/companyAchievement/CARenting.vue'
import GNCollect from './compoments/achievement/gleefulNews/GNCollect.vue'
import GNRenting from './compoments/achievement/gleefulNews/GNRenting.vue'
import PeriodicForGroup from './compoments/achievement/periodic/periodicForGroup.vue'
import PeriodicForGcompany from './compoments/achievement/periodic/periodicForGcompany.vue'
import PeriodicForPeople from './compoments/achievement/periodic/periodicForPeople.vue'
import PeriodicPeopleDetail from './compoments/achievement/periodic/peopleDetail.vue'
import WACollect from './compoments/achievement/wagesAchievement/WACollect.vue'
import WARenting from './compoments/achievement/wagesAchievement/WARenting.vue'
import Compare from './compoments/achievement/companyAchievement/compare.vue'                   // 公司业绩收租房对比
import Calc from './compoments/achievement/wagesAchievement/calc.vue'                           // 计算详情
import Dream from './compoments/achievement/salemanSalary/dream.vue'                            // 梦想包
import Drumstick from './compoments/achievement/salemanSalary/drumstick.vue'                    // 鸡腿包
import AFACollect from './compoments/achievement/agencyFeeAplicarion/AFACollect.vue'            // 收房中介费
import AFARenting from './compoments/achievement/agencyFeeAplicarion/AFARenting.vue'            // 租房中介费

import Custom from "./compoments/custom/custom.vue";                                            //客户
import Details from "./compoments/custom/custom_more.vue";                                      //客户详情
import CustomerPool from "./compoments/custom/custom_pool.vue";                                 //客户池
import LeadingOut from "./compoments/leadingOut/cus_leadingOut.vue";                            //客户导出
import OkCollect from "./compoments/housingSupervise/collectHouse.vue";                         //已收房源
import CollectDetail from "./compoments/housingSupervise/collectHouseDetail.vue";               //已收房源更多
import NoCollect from "./compoments/housingSupervise/uncollectHouse.vue";                       //未收房源
import Collect_More from "./compoments/housingSupervise/uncollectHouseDetail.vue";              //未收房源更多
import Blackboard from "./compoments/housingSupervise/blackboard.vue";                          //小黑板
import CollectContract from "./compoments/contract/collectContract.vue";                        //收房合同
import RentingContract from "./compoments/contract/rentingContract.vue";                        //租房合同
import ContractDetail from './compoments/contract/collectDetail.vue'                            //收房合同详情
import RentingDetail from './compoments/contract/rentingDetail.vue'                             //租房合同详情
import  Memorandum from  './compoments/contract/searchMemorandum.vue'                           //查看备忘录

import CollectContractTransfer from "./compoments/contract/collectContractTransfer.vue";        //收房合同
import RentingContractTransfer from "./compoments/contract/rentingContractTransfer.vue";        //租房合同
import ContractNum from "./compoments/contract/contractNumber/contractNum.vue";                 // 编号记录
import ContractNumDetail from "./compoments/contract/contractNumber/contractNumDetail.vue";     // 编号记录详情


import  Comparecontract from  './compoments/contract/Compare.vue'

import Organization from './compoments/finance/organization/organization.vue'                   //组织架构财务
import FlatShare from './compoments/finance/organization/flatShare.vue'                         //合租房
import NoPerformance from './compoments/finance/organization/noPerformance.vue'                 //未生成业绩
import NewLandlord from './compoments/finance/clientManage/newLandlord.vue'                     //财务房东管理
import NewRenter from './compoments/finance/clientManage/newRenter.vue'                         //财务租客管理
import NewRenterDetail from './compoments/finance/clientManage/newRenterDetail.vue'             //财务房东管理详情
import NewLandlordDetail from './compoments/finance/clientManage/newLandlordDetail.vue'         //财务租客管理详情
import NoPriorLease from './compoments/finance/clientManage/noPriorLease.vue'                   //财务未收先租
import NoPriorLeaseDetail from './compoments/finance/clientManage/noPriorLeaseDetail.vue'       //财务未收先租详情
import RentLordAll from './compoments/finance/clientManage/RentLordAll.vue'                     //财务房东/租客管理总汇

import ClientManageDetail from './compoments/finance/clientManage/clientManageDetail.vue'       //财务客户管理
// 账本
import Account from './compoments/finance/account.vue'                                          // 账号管理
import Subject from './compoments/finance/subject/subject.vue'                                  // 科目管理
import Classify from './compoments/finance/subject/classify.vue'                                // 科目管理
import Jurisdiction from './compoments/finance/jurisdiction.vue'                                // 科目管理
import CollectPayment from './compoments/finance/payment/collect.vue'                           // 应收款项
import PayPayment from './compoments/finance/payment/pay.vue'                                   // 应付款项
import PayCllentAll from './compoments/finance/payment/PayCollectAll.vue'                       // 财务应收/应付总汇
import TenancyAlmostCollect from './compoments/finance/tenancyAlmost/tenancyAlmostCollect.vue'  // 租期将近 / 收
import TenancyAlmostRent from './compoments/finance/tenancyAlmost/tenancyAlmostRent.vue'        // 租期将近 / 租
import IncomeFlow from './compoments/finance/incomeFlow.vue'                                    // 收支流水
import PayPaymentDetail from './compoments/finance/payment/payDetail.vue'                       // 收支流水
import CollectPaymentDetail from './compoments/finance/payment/collectDetail.vue'               // 收支流水
import PendingItem from './compoments/finance/pemdingItem/pendingItem.vue'                      // 待处理项
import PendingDetail from './compoments/finance/pemdingItem/pendingDetail.vue'                  // 待处理项详情
import GeneralOperation from './compoments/finance/generalOperation.vue'                        // 总账操作
import Personal from './compoments/salary/personal.vue'                                         // 个人工资
import PersonalDetail from './compoments/salary/personalDetail.vue'                             // 个人工资详情
import AchievementCounter from './compoments/salary/achievementCounter.vue'                     // 业绩计算器
import HistorySettle from './compoments/salary/historySettle.vue'                                // 历史未结清
import PeriodicFor from './compoments/periodicFor/periodicFor.vue'                               // 周期表
import PeriodicDetail from './compoments/periodicFor/periodicDetail.vue'                         // 周期表详情



// import GeneralRecord from './compoments/finance/generalRecord.vue'                           // 总账操作记录
import Chart from './compoments/finance/chart/chart.vue'
import LogRecord from './compoments/logRecord/logRecord.vue'                                    // 日志操作记录
import MessageCenter from  './compoments/messageCenter/messageCenter.vue'                       //消息中心
import Country from './compoments/common/country.vue'                                           //国家

import CheckIn from './compoments/checkIn/checkIn.vue'                                          //定位签到

// import ReportedCollect from './compoments/reported/collect/reportedCollect.vue'                 //收房报备
// import ReopetedCollectDetail from './compoments/reported/collect/collectBulletinDetail.vue'     //收房报备详情

// import ReportedRenting from './compoments/reported/rent/reportedRenting.vue'                    //租房报备
// import ReopetedRentDetail from './compoments/reported/rent/rentDetail.vue'                      // 租房报备详情

// import ReportedOther from './compoments/reported/other/reportedOther.vue'                       //其余款项报备
// import ReportedOtherDetail from './compoments/reported/other/otherDetail.vue'                   //其余款项报备

// import lockScreen from './compoments/lock_screen/lock_screen.vue'                            //锁屏
import UserDetail from './compoments/user/userDetail.vue'                                       //用户详情页
import PunchRecord from './compoments/punchRecord/punchRecord.vue'                              //打卡记录
import HeaderMemorandum from './compoments/HeaderMemorandum/memorandum.vue'                     //备忘录
// import ClientManage from './compoments/finance/clientManage/clientManageList.vue'            //财务客户管理



import OfficeSupplies from './compoments/office/officeManage/officeSupplies.vue'                // 办公用品管理
import OfficeApply from './compoments/office/officeApply/officeApply.vue'                       // 办公用品申领
import BatchApply from './compoments/office/batchApply.vue'                                     // 办公用品批量申领
import OfficeLibrary from './compoments/office/officeLibrary/officeLibrary.vue'                 // 办公用品库管理
import OfficeDetail from './compoments/office/officeManage/officeDetail.vue'                    // 办公用品详情

import Square from './compoments/staffSquare/square/staffSquare.vue'                            // 员工广场
import SquareDetail from './compoments/staffSquare/square/squareDetail.vue'                     // 员工广场详情
import Article from './compoments/staffSquare/article/article.vue'                              // 发布文章
import ArticleDetail from './compoments/staffSquare/article/articleDetail.vue'                  // 文章详情
import PostArticle from './compoments/staffSquare/article/postArticle.vue'                      // 发布
import ModifyArticle from './compoments/staffSquare/article/modifyAriticle.vue'                 // 编辑

import Organize from  './compoments/user/organization.vue'                                      //业绩生成
import PositionManage from './compoments/user/positionManage.vue'

import Question from  './compoments/questionnaire/questionList.vue'             //问卷调查
import Questionnaire from './compoments/questionnaire/questionDetail.vue'
import QuestionResult from './compoments/questionnaire/questionResult.vue'


// 客服中心
import RepairLog from './compoments/customerService/repairLog/repaireLogList.vue'                                // 维修记录
import RepairLogDetail from './compoments/customerService/repairLog/repaireLogDetail.vue'                                // 维修记录
import RenewedRentList from './compoments/customerService/renewedRent/renewedRentList.vue'                                // 续租申请
import RenewedRentDetail from './compoments/customerService/renewedRent/renewedRentDetail.vue'                                // 续租申请详情
import SublettingRentList from './compoments/customerService/sublettingRent/sublettingRentList.vue'                                // 转租申请
import SublettingRentDetail from './compoments/customerService/sublettingRent/sublettingRentDetail.vue'                                // 转租申请详情
import TransferRentList from './compoments/customerService/transferRent/transferRentList.vue'                                // 调房申请
import TransferRentDetail from './compoments/customerService/transferRent/transferRentDetail.vue'                                // 调房申请详情
import OutRentList from './compoments/customerService/outRent/outRentList.vue'                                // 退租申请
import OutRentDetail from './compoments/customerService/outRent/outRentDetail.vue'                                // 退租申请详情
import CusServiceList from './compoments/customerService/cusService/cusServiceList.vue'                                // 客服部维修申请
import CusServiceDetail from './compoments/customerService/cusService/cusServiceDetail.vue'                                // 客服部维修申请详情
import ServiceList from './compoments/customerService/service/serviceList.vue'                                // 维修申请
import ServiceDetail from './compoments/customerService/service/serviceDetail.vue'                                // 维修申请详情
import CusProblemList from './compoments/customerService/cusProblem/cusProblemList.vue'                                // 客服部问题申报
import CusProblemDetail from './compoments/customerService/cusProblem/cusProblemDetail.vue'                                // 客服部问题申报详情
import ProblemList from './compoments/customerService/problem/problemList.vue'                                // 房屋问题申报
import ProblemDetail from './compoments/customerService/problem/problemDetail.vue'                                // 房屋问题申报详情
import HydropowerGasList from './compoments/customerService/hydropowerGas/hydropowerGasList.vue'                                // 水电燃物业、公摊费申报申报
import HydropowerGasDetail from './compoments/customerService/hydropowerGas/hydropowerGasDetail.vue'                                // 水电燃物业、公摊费申报申报详情
import HydroepowerWebList from './compoments/customerService/HydroelectricWeb/HydroepowerWebList.vue'                       //水电燃报销官网
import HydroepowerWebDetail from './compoments/customerService/HydroelectricWeb/HydroepowerWebDetail.vue'                       //水电燃报销官网

import Village from './compoments/villageManage/village.vue'                                    //小区管理列表
import VillageDetail from './compoments/villageManage/villageDetail.vue'                        //小区管理列表
import Statistics from './compoments/statistics/statistics.vue'                                 //统计

import OldContractDetail from './compoments/contract/collecOldDetail.vue'                       //老系统详情
import OldRentDetail from './compoments/contract/rentOldDetail.vue'

import MeetingList from './compoments/meetingManage/meetingList.vue'
import MeetingDetail from './compoments/meetingManage/meetingDetail.vue'
import Meeting from './compoments/meetingManage/meeting.vue'


//重构客户模块
import Client from './compoments/client/clientList.vue'
import ClientDetail from './compoments/client/clientDetail.vue'
import ClientPool from './compoments/client/clientPool.vue'

// 喜报
import CollectBulletin from './compoments/bulletin/collectBulletin.vue'
import CollectBulletinDetail from './compoments/bulletin/collectBulletinDetail.vue'
import RentBulletin from './compoments/bulletin/rentBulletin.vue'
import RentBulletinDetail from './compoments/bulletin/rentBulletinDetail.vue'
import Balance from './compoments/bulletin/balance.vue'
import BalanceDetail from './compoments/bulletin/balanceDetail.vue'
import Special from './compoments/bulletin/special.vue'
import SpecialDetail from './compoments/bulletin/specialDetail.vue'


export default[
    {
        path: '/',                          //重定向主页
        redirect: '/index',
    },

    {
        path: '/statistics',                //数据统计
        name: 'statistics',
        component: Statistics
    },
    {
        path: '/index',                     //主页
        name: 'index',
        component: Index
    },
    {
        path: '/collectBulletin',           //收房喜报
        name: 'collectBulletin',
        component: CollectBulletin
    },
    {
        path: '/collectBulletinDetail',     //收房喜报详情
        name: 'collectBulletinDetail',
        component: CollectBulletinDetail
    },
    {
        path: '/rentBulletin',              //租房喜报
        name: 'rentBulletin',
        component: RentBulletin
    },
    {
        path: '/rentBulletinDetail',       //租房喜报详情
        name: 'rentBulletinDetail',
        component: RentBulletinDetail
    },
    {
        path: '/balance',                   //尾款报备
        name: 'balance',
        component: Balance
    },
    {
        path: '/balanceDetail',                   //尾款报备
        name: 'balanceDetail',
        component: BalanceDetail
    },
    {
        path: '/special',                   //尾款报备
        name: 'special',
        component: Special
    },
    {
        path: '/specialDetail',                   //尾款报备
        name: 'specialDetail',
        component: SpecialDetail
    },
    {
        path: '/organization',              //业绩生成
        name: 'organization',
        component: Organization
    },
    {
        path: '/power',                     //权限管理
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
    {
        path: '/functionLine',              //角色
        name: 'functionLine',
        component: FunctionLine
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
        path: '/periodicForGcompany',
        name: 'periodicForGcompany',
        component: PeriodicForGcompany
    },
    {
        path: '/periodicForPeople',
        name: 'PeriodicForPeople',
        component: PeriodicForPeople
    },
    {
        path: '/periodicPeopleDetail',
        name: 'PeriodicPeopleDetail',
        component: PeriodicPeopleDetail
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
        path: '/custom',                            //客户
        name: 'custom',
        component: Custom
    },
    {
        path: '/customerPool',                      //客户池
        name: 'customerPool',
        component: CustomerPool
    },
    {
        path: '/OkCollect',                         //公司房源
        name: 'OkCollect',
        component: OkCollect
    },
    {
        path: '/noCollect',                         //待收房源
        name: 'noCollect',
        component: NoCollect
    },
    {
        path: '/blackboard',                       //小黑板
        name: 'blackboard',
        component: Blackboard
    },
    {
        path: '/details',                           //客户详情
        name: 'details',
        component: Details
    },
    {
        path: '/collectDetail',                     //公司房源详情
        name: 'collectDetail',
        component: CollectDetail
    },
    {
        path: '/collectMore',                       //客户详情
        name: 'collectMore',
        component: Collect_More
    },
    {
        path: '/leadingOut',                        //客户导出
        name: 'leadingOut',
        component: LeadingOut
    },
    {
        path: '/newLandlord',
        name: 'newLandlord',                       //财务房东管理
        component: NewLandlord
    },
    {
        path: '/flatShare',
        name: 'flatShare',                          //合租房
        component: FlatShare
    },
    {
        path: '/noPerformance',
        name: 'noPerformance',                      //未生成业绩
        component: NoPerformance
    },
    {
        path: '/newLandlordDetail',
        name: 'newLandlordDetail',                 //财务房东管理详情
        component: NewLandlordDetail
    },
    {
        path: '/rentLordAll',
        name: 'rentLordAll',                       //财务房东/租客总汇
        component: RentLordAll
    },
    {
        path: '/noPriorLease',
        name: 'noPriorLease',                      //未收先租
        component: NoPriorLease
    },
    {
        path: '/noPriorLeaseDetail',
        name: 'noPriorLeaseDetail',                //未收先租详情
        component: NoPriorLeaseDetail
    },
    {
        path: '/payCllentAll',
        name: 'payCllentAll',                       //财务应收/应付总汇
        component: PayCllentAll
    },
    {
        path: '/tenancyAlmostCollect',
        name: 'tenancyAlmostCollect',                       // 租期将近/ 收
        component: TenancyAlmostCollect
    },
    {
        path: '/tenancyAlmostRent',
        name: 'tenancyAlmostRent',                       // 租期将近/ 租
        component: TenancyAlmostRent
    },
    {
        path: '/newRenter',
        name: 'newRenter',                          //财务租房管理
        component: NewRenter
    },
    {
        path: '/newRenterDetail',
        name: 'newRenterDetail',                    //财务租房管理
        component: NewRenterDetail
    },
    {
        path: '/personal',
        name: 'personal',                           //个人工资
        component: Personal
    },
    {
        path: '/personalDetail',
        name: 'personalDetail',                     //个人工资详情
        component: PersonalDetail
    },
    {
        path: '/achievementCounter',
        name: 'achievementCounter',               //业绩计算器
        component: AchievementCounter
    },
    {
        path: '/historySettle',
        name: 'historySettle',                     //历史未结清
        component: HistorySettle
    },
    {
        path: '/periodicFor',
        name: 'periodicFor',                        //周期表
        component: PeriodicFor
    },
    {
        path: '/periodicDetail',
        name: 'periodicDetail',                     //周期表详情
        component: PeriodicDetail
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
        path: '/rentingDetail',
        name: 'RentingDetail',
        component: RentingDetail
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
        path: '/collectPayment',
        name: 'CollectPayment',                 //应收
        component: CollectPayment
    },
    {
        path: '/collectPaymentDetail',
        name: 'CollectPaymentDetail',           //应收详情
        component: CollectPaymentDetail
    },
    {
        path: '/payPayment',
        name: 'PayPayment',                     //应付
        component: PayPayment
    },
    {
        path: '/payPaymentDetail',
        name: 'PayPaymentDetail',               //应付详情
        component: PayPaymentDetail
    },
    {
        path: '/incomeFlow',
        name: 'IncomeFlow',
        component: IncomeFlow
    },
    {
        path: '/pendingItem',
        name: 'PendingItem',
        component: PendingItem
    },
    {
        path: '/pendingDetail',
        name: 'PendingDetail',
        component: PendingDetail
    },
    {
        path: '/generalOperation',
        name: 'GeneralOperation',
        component: GeneralOperation
    },
    // {
    //     path: '/generalRecord',
    //     name: 'GeneralRecord',
    //     component: GeneralRecord
    // },
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

    // {
    //     path: '/lockScreen',
    //     name: 'lock_screen',
    //     component: lockScreen
    // },
    {
        path: '/checkIn',
        name: 'CheckIn',
        component: CheckIn
    },
    // {
    //     path: '/reportedCollect',
    //     name: 'ReportedCollect',
    //     component: ReportedCollect
    // },
    // {
    //     path: '/reportedRenting',
    //     name: 'ReportedRenting',
    //     component: ReportedRenting
    // },
    // {
    //     path: '/reportedOther',
    //     name: 'ReportedOther',
    //     component: ReportedOther
    // },
    // {
    //     path: '/reportedOtherDetail',
    //     name: 'ReportedOtherDetail',
    //     component: ReportedOtherDetail
    // },

    // {
    //     path: '/reopetedCollectDetail',
    //     name: 'ReopetedCollectDetail',
    //     component: ReopetedCollectDetail
    // },
    // {
    //     path: '/reopetedRentDetail',
    //     name: 'ReopetedRentDetail',
    //     component: ReopetedRentDetail
    // },
    {
        path: '/country',
        name: 'country',
        component: Country
    },
    {
        path: '/userDetail',                    //用户详情页
        name: 'UserDetail',
        component: UserDetail
    },
    {
        path: '/memorandum',
        name: 'Memorandum',
        component: Memorandum
    },
    {
        path: '/comparecontract',
        name: 'Comparecontract',
        component: Comparecontract
    },
    {
        path: '/punchRecord',
        name: 'punchRecord',                    //打卡记录
        component: PunchRecord
    },
    {
        path: '/HeaderMemorandum',
        name: 'HeaderMemorandum',               //备忘录
        component: HeaderMemorandum
    },
    // {
    //     path: '/clientManage',
    //     name: 'ClientManage',
    //     component: ClientManage
    // },
    {
        path: '/clientManageDetail',
        name: 'ClientManageDetail',
        component: ClientManageDetail
    },
    {
        path: '/rentingContractTransfer',
        name: 'RentingContractTransfer',
        component: RentingContractTransfer
    },
    {
        path: '/collectContractTransfer',
        name: 'CollectContractTransfer',
        component: CollectContractTransfer
    },
    {
        path: '/contractNum',
        name: 'contractNum',
        component: ContractNum
    },
    {
        path: '/contractNumDetail',
        name: 'contractNumDetail',
        component: ContractNumDetail
    },
    {
        path: '/officeSupplies',
        name: 'OfficeSupplies',
        component: OfficeSupplies
    },
    {
        path: '/officeApply',
        name: 'OfficeApply',
        component: OfficeApply
    },
    {
        path: '/batchApply',
        name: 'BatchApply',
        component: BatchApply
    },
    {
        path: '/officeLibrary',
        name: 'OfficeLibrary',
        component: OfficeLibrary
    },
    {
        path: '/officeDetail',
        name: 'OfficeDetail',
        component: OfficeDetail
    },
    {
        path: '/square',
        name: 'Square',
        component: Square
    },
    {
        path: '/article',
        name: 'Article',
        component: Article
    },
    {
        path: '/squareDetail',
        name: 'SquareDetail',
        component: SquareDetail
    },
    {
        path: '/articleDetail',
        name: 'ArticleDetail',
        component: ArticleDetail
    },
    {
        path: '/postArticle',
        name: 'PostArticle',
        component: PostArticle
    },
    {
        path: '/modifyArticle',
        name: 'ModifyArticle',
        component: ModifyArticle
    },
    {       //组织架构
        path: '/organize',
        name: 'Organize',
        component: Organize
    },
    {       //职位管理
        path: '/positionManage',
        name: 'PositionManage',
        component: PositionManage
    },
    {       //问卷调查
        path: '/question',
        name: 'Question',
        component: Question
    },
    {       //问卷调查
        path: '/questionnaire',
        name: 'Questionnaire',
        component: Questionnaire
    },
    {       //问卷调查
        path: '/questionResult',
        name: 'QuestionResult',
        component: QuestionResult
    },
    {       //维修记录
        path: '/repairLog',
        name: 'RepairLog',
        component: RepairLog
    },
    {       //维修记录
        path: '/repairLogDetail',
        name: 'RepairLogDetail',
        component: RepairLogDetail
    },
    {       //续租申请
        path: '/renewedRentList',
        name: 'RenewedRentList',
        component: RenewedRentList
    },
    {       //续租申请
        path: '/renewedRentDetail',
        name: 'RenewedRentDetail',
        component: RenewedRentDetail
    },
    {       //转租申请
        path: '/sublettingRentList',
        name: 'SublettingRentList',
        component: SublettingRentList
    },
    {       //转租申请
        path: '/sublettingRentDetail',
        name: 'SublettingRentDetail',
        component: SublettingRentDetail
    },
    {       //调房申请
        path: '/transferRentList',
        name: 'TransferRentList',
        component: TransferRentList
    },
    {       //调房申请
        path: '/transferRentDetail',
        name: 'TransferRentDetail',
        component: TransferRentDetail
    },
    {       //退租申请
        path: '/outRentList',
        name: 'OutRentList',
        component: OutRentList
    },
    {       //退租申请
        path: '/outRentDetail',
        name: 'OutRentDetail',
        component: OutRentDetail
    },
    {       //客服部维修申请
        path: '/cusServiceList',
        name: 'CusServiceList',
        component: CusServiceList
    },
    {       //客服部维修申请
        path: '/cusServiceDetail',
        name: 'CusServiceDetail',
        component: CusServiceDetail
    },
    {       //维修申请
        path: '/serviceList',
        name: 'ServiceList',
        component: ServiceList
    },
    {       //维修申请
        path: '/serviceDetail',
        name: 'ServiceDetail',
        component: ServiceDetail
    },
    {       //客服部问题申报
        path: '/cusProblemList',
        name: 'CusProblemList',
        component: CusProblemList
    },
    {       //客服部问题申报详情
        path: '/cusProblemDetail',
        name: 'CusProblemDetail',
        component: CusProblemDetail
    },
    {       //房屋问题申报
        path: '/problemList',
        name: 'ProblemList',
        component: ProblemList
    },
    {       //房屋问题申报详情
        path: '/problemDetail',
        name: 'ProblemDetail',
        component: ProblemDetail
    },
    {       //水电燃物业、公摊费申报申报
        path: '/hydropowerGasList',
        name: 'HydropowerGasList',
        component: HydropowerGasList
    },
    {       //水电燃物业、公摊费申报申报
        path: '/hydropowerGasDetail',
        name: 'HydropowerGasDetail',
        component: HydropowerGasDetail
    },
    {       //水电燃物业官网
        path: '/hydroepowerWebList',
        name: 'HydroepowerWebList',
        component: HydroepowerWebList
    },
    {       //水电燃物官网
        path: '/hydroepowerWebDetail',
        name: 'HydroepowerWebDetail',
        component: HydroepowerWebDetail
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
    {   //新版 客户管理
        path:'/client',
        name : 'Client',
        component:Client
    },
    {
        path:'/clientDetail',
        name:'ClientDetail',
        component:ClientDetail
    },
    {
        path:'/clientPool',
        name:'ClientPool',
        component:ClientPool
    },
    {
        path:'/oldContractDetail',
        name:'OldContractDetail',
        component:OldContractDetail
    },
    {
        path:'/oldRentDetail',
        name:'OldRentDetail',
        component:OldRentDetail
    },
    {
        path:'/meetingList',
        name:'MeetingList',
        component:MeetingList
    },
    {
        path:'/meetingDetail',
        name:'MeetingDetail',
        component:MeetingDetail
    },
    {
        path:'/meeting',
        name:'Meeting',
        component:Meeting
    }

]