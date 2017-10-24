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
import CollectContract from "./compoments/contract/collectContract.vue";                        //收房合同
import RentingContract from "./compoments/contract/rentingContract.vue";                        //租房合同
import ContractDetail from './compoments/contract/collectDetail.vue'                            //收房合同详情
import RentingDetail from './compoments/contract/rentingDetail.vue'                             //租房合同详情
import  Memorandum from  './compoments/contract/searchMemorandum.vue'                           //查看备忘录

import CollectContractTransfer from "./compoments/contract/collectContractTransfer.vue";        //收房合同
import RentingContractTransfer from "./compoments/contract/rentingContractTransfer.vue";        //租房合同
import ContractNum from "./compoments/contract/contractNumber/contractNum.vue";        // 编号记录
import ContractNumDetail from "./compoments/contract/contractNumber/contractNumDetail.vue";        // 编号记录详情


import  Comparecontract from  './compoments/contract/Compare.vue'

import Organization from './compoments/finance/organization/organization.vue'                   //组织架构财务
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
import IncomeFlow from './compoments/finance/incomeFlow.vue'                                    // 收支流水
import PayPaymentDetail from './compoments/finance/payment/payDetail.vue'                       // 收支流水
import CollectPaymentDetail from './compoments/finance/payment/collectDetail.vue'               // 收支流水
import PendingItem from './compoments/finance/pemdingItem/pendingItem.vue'                      // 待处理项
import PendingDetail from './compoments/finance/pemdingItem/pendingDetail.vue'                  // 待处理项详情
import GeneralOperation from './compoments/finance/generalOperation.vue'                        // 总账操作
import Personal from './compoments/salary/personal.vue'                                             // 个人工资
import PersonalDetail from './compoments/salary/personalDetail.vue'                                 // 个人工资详情
import PeriodicFor from './compoments/periodicFor/periodicFor.vue'                                 // 周期表
import PeriodicDetail from './compoments/periodicFor/periodicDetail.vue'                                 // 周期表详情



// import GeneralRecord from './compoments/finance/generalRecord.vue'                           // 总账操作记录
import Chart from './compoments/finance/chart/chart.vue'
import LogRecord from './compoments/logRecord/logRecord.vue'                                    // 日志操作记录
import MessageCenter from  './compoments/messageCenter/messageCenter.vue'                       //消息中心
import Country from './compoments/common/country.vue'                                           //国家

import CheckIn from './compoments/checkIn/checkIn.vue'                                          //定位签到

// import ReportedCollect from './compoments/reported/collect/reportedCollect.vue'                 //收房报备
// import ReopetedCollectDetail from './compoments/reported/collect/collectDetail.vue'             //收房报备详情

// import ReportedRenting from './compoments/reported/rent/reportedRenting.vue'                    //租房报备
// import ReopetedRentDetail from './compoments/reported/rent/rentDetail.vue'                      // 租房报备详情

// import ReportedOther from './compoments/reported/other/reportedOther.vue'                       //其余款项报备
// import ReportedOtherDetail from './compoments/reported/other/otherDetail.vue'                   //其余款项报备

import lockScreen from './compoments/lock_screen/lock_screen.vue'                               //锁屏
import UserDetail from './compoments/user/userDetail.vue'                                       //用户详情页
import PunchRecord from './compoments/punchRecord/punchRecord.vue'                              //打卡记录
import HeaderMemorandum from './compoments/HeaderMemorandum/memorandum.vue'                     //备忘录
// import ClientManage from './compoments/finance/clientManage/clientManageList.vue'               //财务客户管理



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

import RepairLog from './compoments/repairLog/repaireLogList.vue'                                // 维修记录
import RepairLogDetail from './compoments/repairLog/repaireLogDetail.vue'                                // 维修记录

export default[
    {
        path: '/',                  //重定向主页
        redirect: '/index',
    },
    {
        path: '/index',             //主页
        name: 'index',
        component: Index
    }, {
        path: '/organization',             //业绩生成
        name: 'organization',
        component: Organization
    },
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
        name: 'newLandlord',                        //财务房东管理
        component: NewLandlord
    },
    {
        path: '/newLandlordDetail',
        name: 'newLandlordDetail',                  //财务房东管理详情
        component: NewLandlordDetail
    },
    {
        path: '/rentLordAll',
        name: 'rentLordAll',                        //财务房东/租客总汇
        component: RentLordAll
    },
    {
        path: '/noPriorLease',
        name: 'noPriorLease',                        //未收先租
        component: NoPriorLease
    },
    {
        path: '/noPriorLeaseDetail',
        name: 'noPriorLeaseDetail',                        //未收先租详情
        component: NoPriorLeaseDetail
    },
    {
        path: '/payCllentAll',
        name: 'payCllentAll',                       //财务应收/应付总汇
        component: PayCllentAll
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
]