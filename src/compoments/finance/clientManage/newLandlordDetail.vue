<template>
    <div>
        <ol class="breadcrumb" v-show="cus == 1">
            <li>财务账本</li>
            <li>
                <router-link to="/newLandlord">客户管理</router-link>
            </li>
            <li>房东详情</li>

            <li class="pull-right" v-show="cus === 1">
                <router-link :to="{path:'/newLandlord',query: { sea: seaLand, land: 1}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>
        <ol class="breadcrumb" v-if="cus == 2">
            <li>财务账本</li>
            <li>
                <router-link to="/rentLordAll">客户管理</router-link>
            </li>
            <li class="active">房东详情</li>
            <li class="pull-right" v-show="cus === 2">
                <router-link :to="{path:'/rentLordAll',query:{sea:seaLand, land: 1}}"><i
                        class="fa fa-angle-double-left"></i> 返回上一步
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
                                    <button class="btn btn-white btn-block" @click="reviseDate()">
                                        付款时间编辑
                                    </button>
                                </li>
                                <li v-if="freeze !== 1 && freeze !== '1'">
                                    <button class="btn btn-white btn-block" @click="reviseLand('rev')">
                                        编辑
                                    </button>
                                </li>
                                <li v-if="freeze !== 1 && freeze !== '1'">
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
                            <h5>基本信息&nbsp;<span v-if="item.liquidation === 1" class="fa fa-jpy text-warning"></span>
                            </h5>
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
                                    <span class="text-primary">收房月数：</span>
                                    <span>{{item.months}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">付款方式：</span>
                                    <span v-if="item.pay_types.length !== 0">
                                        {{dictionary.pay_type[item.pay_types[0]]}}
                                    </span>
                                    <span class="text-primary" style="cursor: pointer;"
                                          @click="changes(1)" v-if="item.pay_types.length > 1">
                                        变化
                                    </span>
                                    <div role="dialog" class="modal fade bs-example-modal-sm"
                                         v-if="item.pay_types.length > 1"
                                         id="pay_change">
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
                                                        v-for="(money,index) in item.pay_types">
                                                        <span>第&nbsp;{{index + 1}}&nbsp;年--{{dictionary.pay_type[money]}}</span>
                                                    </h4>
                                                </div>
                                                <div class="modal-footer text-right col-xs-12">
                                                    <button data-dismiss="modal" class="btn btn-primary btn-md">确定
                                                    </button>
                                                    <!--<button data-dismiss="modal" class="btn btn-danger btn-md">确认</button>-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span v-if="item.pay_types.length === 0">
                                        —
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">月单价：</span>
                                    <span v-if="item.prices.length !== 0">
                                        {{item.prices[0]}}
                                    </span>
                                    <span @click="changes(2)" class="text-primary" v-if="item.prices.length > 1"
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
                                    <span class="text-primary">押金：</span>
                                    <span>{{item.deposit}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">备注：</span>
                                    <span>
                                        {{item.remark}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                            <h5>&nbsp;</h5>
                            <div>
                                <div>
                                    <span class="text-primary">待签约日期：</span>
                                    <span>{{item.deal_date}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">空置期：</span>
                                    <span>{{item.vacancy}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">第一次打房租日期：</span>
                                    <span>
                                    {{item.first_pay_date}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">第二次打房租日期：</span>
                                    <span>
                                    {{item.second_pay_date}}
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
                                    <span class="text-primary">房租科目：</span>
                                    <span>
                                        {{dictionary.account_subject[item.subject_id.rental]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">押金科目：</span>
                                    <span>
                                        {{dictionary.account_subject[item.subject_id.deposit]}}
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
                                    <span class="text-primary">支行：</span>
                                    <span>
                                          {{item.account_subbank}}
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
                                    <span class="text-primary">账户到期时间：</span>
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
        <!--删除-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--状态-->
        <Status :state='info'></Status>

        <!--详情编辑-->
        <NewClientAdd :list="myLandlord" @success_="getDictionary"></NewClientAdd>

        <!--编辑时间-->
        <EditDate :date="landlordDate" @reviseDate="getDictionary"></EditDate>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Confirm from '../../common/confirm.vue'
    import NewClientAdd from  './newLandlordAdd.vue'
    import EditDate from  './editDate.vue'
    export default{
        components: {Confirm, Status, NewClientAdd, EditDate},
        data(){
            return {
                freeze: '',
                cus: '',
                seaLand: {},                   //返回上一页
                confirmMsg: '',                //删除信息
                myLandlordId: '',              //ID
                dictionary: {},                //字典
                myLandlordList: [],            //详情信息
                myLandlord: {},                //详情修改
                landlordDate: [],              //编辑付款时间
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
            this.getDictionary('info');
        },
        methods: {
//            付款时间编辑
            reviseDate (){
                $('#editDate').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            变化
            changes (val){
                if (val === 1) {
                    $('#pay_change').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
                if (val === 2) {
                    $('#changes').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
            },
//            修改
            reviseLand (val){
                this.$http.get('finance/customer/collect/' + this.myLandlordId).then((res) => {
                    if (res.data.code === '90010' && val === 'rev') {
                        $('#newClientAdd').modal({
                            backdrop: 'static',         //空白处模态框不消失
                        });
                        this.myLandlord = res.data.data;
                    } else if (res.data.code === '90010' && val === 'info') {
                        this.myLandlordList = [];
                        this.myLandlordList.push(res.data.data);
                        this.landlordDate = res.data.data.pay_date;
                        this.freeze = res.data.data.freeze;
                    }
                })
            },
            getDictionary(){
                this.$http.get('revenue/customer/dict').then((res) => {
                    this.dictionary = res.data;
                    this.reviseLand('info');
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
                this.$http.post('finance/customer/collect/delete', {
                    ids: ids
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.$router.replace({path: '/newLandlord'});
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
