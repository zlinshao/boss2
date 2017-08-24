<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/newRenter">
                    客户管理
                </router-link>
            </li>
            <li>租客详情</li>

            <li class="pull-right" v-show="cus === 1">
                <router-link :to="{path:'/newRenter',query: { sea: seaLand, land: 1}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-user"></i> &nbsp;客户信息
                        <div class="btn-group pull-right">
                            <a class="fa fa-gear dropdown-toggle" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                            </a>
                            <ul class="dropdown-menu dropdown-menu-left">
                                <li>
                                    <button class="btn btn-white btn-block" @click="reviseLand">
                                        编辑
                                    </button>
                                </li>
                                <li>
                                    <button class="btn btn-white btn-block" @click="deleteClient">
                                        删除
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="row" v-for="item in myLandlordList">
                        <div class="col-sm-4 col-xs-12">
                            <h5>基本信息</h5>
                            <div>
                                <div>
                                    <span class="text-primary">客户姓名：</span>
                                    <span>{{item.customer_name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">客户联系方式：</span>
                                    <span>{{item.contact}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">房屋地址：</span>
                                    <span>{{item.address}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">收房月数：</span>
                                    <span>{{item.months}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">付款方式：</span>
                                    押&nbsp;{{item.bet}}&nbsp;付
                                    <span v-if="item.pay.length !== 0">{{item.pay[0]}}
                                     </span>
                                    <span @click="changes('bet')" class="text-primary" v-if="item.pay.length > 1"
                                          style="cursor: pointer;">
                                        变化
                                    </span>
                                    <span v-if="item.pay.length === 0">
                                         —
                                    </span>
                                </div>
                                <div role="dialog" class="modal fade bs-example-modal-sm" v-if="item.pay.length > 1"
                                     id="bet_change">
                                    <div class="modal-dialog ">
                                        <div class="modal-content roll">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">
                                                    <span>&times;</span>
                                                </button>
                                                <h4 class="modal-title" style="padding: 0;">付款方式</h4>
                                            </div>
                                            <div class="modal-body">
                                                <h4 class="modal-title col-xs-6" style="padding: 10px 0;"
                                                    v-for="(money,index) in item.pay">
                                                    <span>第&nbsp;{{index + 1}}&nbsp;年&nbsp;押{{item.bet}}付{{money}}</span>
                                                </h4>
                                            </div>
                                            <div class="modal-footer text-right col-xs-12">
                                                <button data-dismiss="modal" class="btn btn-primary btn-md">确定</button>
                                                <!--<button data-dismiss="modal" class="btn btn-danger btn-md">确认</button>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span class="text-primary">月单价：</span>
                                    <span v-if="item.prices.length !== 0">
                                        {{item.prices[0]}}
                                    </span>
                                    <span @click="changes('price')" class="text-primary" v-if="item.prices.length > 1"
                                          style="cursor: pointer;">
                                        变化
                                    </span>
                                    <span v-if="item.prices.length === 0">
                                        —
                                    </span>
                                </div>
                                <div role="dialog" class="modal fade bs-example-modal-sm" v-if="item.prices.length > 1"
                                     id="changes">
                                    <div class="modal-dialog ">
                                        <div class="modal-content roll">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">
                                                    <span>&times;</span>
                                                </button>
                                                <h4 class="modal-title" style="padding: 0;">月单价</h4>
                                            </div>
                                            <div class="modal-body">
                                                <h4 class="modal-title col-xs-6" style="padding: 10px 0;"
                                                    v-for="(money,index) in item.prices">
                                                    <span>第&nbsp;{{index + 1}}&nbsp;年--{{money}}</span>
                                                </h4>
                                            </div>
                                            <div class="modal-footer text-right col-xs-12">
                                                <button data-dismiss="modal" class="btn btn-primary btn-md">确定</button>
                                                <!--<button data-dismiss="modal" class="btn btn-danger btn-md">确认</button>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span class="text-primary">已收：</span>
                                    <span>
                                        {{item.received_amount}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">租房类型：</span>
                                    <span>{{dictionary.shared_house[item.is_shared]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">房型：</span>
                                    <span v-if="item.house !== null && item.house !== undefined">
                                        <span v-if="item.house.rooms !== null && item.house.rooms.rooms !== undefined">
                                            {{item.house.rooms.rooms}}
                                        </span>室/
                                        <span v-if="item.house.rooms.hall !== null && item.house.rooms.hall !== undefined">
                                            {{item.house.rooms.hall}}
                                        </span>
                                        厅/
                                        <span v-if="item.house.rooms.toilet !== null && item.house.rooms.toilet !== undefined">
                                            {{item.house.rooms.toilet}}
                                        </span>
                                        卫
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">房间类型：</span>
                                    <span>{{dictionary.shared_part[item.shared_part]}}</span>
                                    <!--<span v-if="item.shared_part === 0">—</span>-->
                                </div>
                                <div>
                                    <span class="text-primary">租房状态：</span>
                                    <span>{{dictionary.rent_type[item.rent_type]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">待签约日期：</span>
                                    <span>{{item.deal_date}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">补齐尾款时间：</span>
                                    <span>
                                        {{item.complete_date}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                            <h5>&nbsp;</h5>
                            <div>
                                <div>
                                    <span class="text-primary">水费：</span>
                                    <span>
                                        {{item.water_fee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">电费：</span>
                                    <span>
                                        {{item.elec_fee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">燃气费：</span>
                                    <span>
                                        {{item.gas_fee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">物业费：</span>
                                    <span>
                                        {{item.property_fee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">管理费：</span>
                                    <span>
                                        {{item.manage_fee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">网络费：</span>
                                    <span>
                                        {{item.net_fee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">负责人：</span>
                                    <span v-if="item.leader !== null && item.leader !== undefined">
                                        {{item.leader.real_name}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">所属部门：</span>
                                    <span>
                                        {{dictionary.department_id[item.department_id]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">操作人：</span>
                                    <span v-if="item.operator !== null && item.operator !== undefined">
                                        {{item.operator.real_name}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">签约人：</span>
                                    <span v-if="item.staff !== null && item.staff !== undefined">
                                        {{item.staff.real_name}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">科目：</span>
                                    <span>
                                        {{dictionary.account_subject[item.subject_id.rental]}}
                                    </span>
                                </div>
                                <!--<div>-->
                                    <!--<span class="text-primary">押金科目：</span>-->
                                    <!--<span>-->
                                        <!--{{dictionary.account_subject[item.subject_id.deposit]}}-->
                                    <!--</span>-->
                                <!--</div>-->
                                <div>
                                    <span class="text-primary">备注：</span>
                                    <span>
                                        {{item.remark}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>客户账户信息</h5>
                            <div>
                                <div>
                                    <span class="text-primary">汇款方式：</span>
                                    <span>
                                        {{dictionary.payment[item.account_type]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">收款人姓名：</span>
                                    <span>
                                        {{item.account_owner}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">开户行：</span>
                                    <span>
                                          {{dictionary.bank[item.account_bank]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">账号：</span>
                                    <span>
                                        {{item.account_num}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12"
                             v-if="item.account_history !== null && item.account_history !== undefined">
                            <h5>历史账户信息</h5>
                            <div class="col-sm-6 history" v-for="key in item.account_history">
                                <div>
                                    <span class="text-primary">汇款方式：</span>
                                    <span>
                                        {{dictionary.payment[key.account_type]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">收款人姓名：</span>
                                    <span>
                                         {{key.account_owner}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">开户行：</span>
                                    <span>
                                         {{dictionary.bank[key.account_bank]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">账号：</span>
                                    <span>
                                         {{key.account_num}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">日期：</span>
                                    <span>
                                         {{key.date}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <Status :state='info'></Status>

        <NewRenterAdd :list="myLandlord" @success_="getDictionary"></NewRenterAdd>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Confirm from '../../common/confirm.vue'
    import NewRenterAdd from  './newRenterAdd.vue'
    export default{
        components: {Confirm, Status, NewRenterAdd},
        data(){
            return {
                cus: '',
                seaLand: {},                   //返回上一页
                confirmMsg: '',                //删除信息
                myLandlordId: '',              //ID
                dictionary: {},                //字典
                myLandlordList: [],            //详情信息
                myLandlord: {},                //详情修改

                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                myParams: [],
                departmentName: '',
            }
        },
        mounted(){
            this.myLandlordId = this.$route.query.nameId;
            this.seaLand = this.$route.query.sea;
            this.cus = this.$route.query.cus;
            this.getDictionary();
        },
        methods: {
//            变化
            changes (val){
                if (val === 'price') {
                    $('#changes').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                } else if (val === 'bet') {
                    $('#bet_change').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
            },
//            修改
            reviseLand (){
                $('#newRenterAdd').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
                this.$http.get('finance/customer/rent/' + this.myLandlordId).then((res) => {
                    if (res.data.code === '90010') {
                        this.myLandlord = res.data.data;
                    }
                })
            },
            getDictionary(){
                this.$http.get('revenue/customer/dict').then((res) => {
                    this.dictionary = res.data;
                    this.getClientDetail();
                })
            },
//            详情
            getClientDetail(){
                this.$http.get('finance/customer/rent/' + this.myLandlordId).then((res) => {
                    this.myLandlordList = [];
                    if (res.data.code === '90010') {
                        this.myLandlordList.push(res.data.data);

                    }
                })
            },
//            删除
            deleteClient(){
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal('show');
            },
//            删除回调
            getConfirm(){
                let ids = [];
                ids.push(this.myLandlordId);
                this.$http.post('finance/customer/rent/delete', {
                    ids: ids
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.$router.replace({path: '/newRenter'});
                    }
                })
            },
        },
    }
</script>


<style scoped>
    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 10px;
    }

    h4 > a {
        margin-left: 10px;
    }

    h5 {
        font-size: 20px;
    }

    .history {
        border-bottom: 1px dashed #CCCCCC;
        margin-top: 20px;
        padding: 0;
    }

    /*.panel-body:not(:last-child) {*/
    /*border-bottom: 1px solid #aaaaaa;*/
    /*}*/
    .client_info > div > div > div > div span.text-primary:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 137px;
    }

    .client_info > div > div > div > div {
        margin-bottom: 20px;
    }

    @media (min-width: 768px) {
        .subregion:not(:first-child) {
            border-left: 1px dashed #aaaaaa;
        }

        .subregion {
            min-height: 400px;
        }
    }

    .btn-white {
        background-color: #fff;
        border-color: #fff;
        color: #666;
    }

    .btn-white:hover {
        border-radius: 0;
        background-color: #dedede;
        border-color: #dedede;
        color: #fff;
    }

    .dropdown-menu {
        padding: 0;
        border-radius: 0;
        min-width: 112px;
    }

    .dropdown-menu li:hover {
        background-color: #dedede;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }

    .modal-header h4, .modal-body h4 {
        border: 0;
        max-height: 400px;
        overflow: auto;
    }
</style>
