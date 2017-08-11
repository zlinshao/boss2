<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/clientManage">客户管理</router-link>
            </li>
            <li>客户管理详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-user"></i> &nbsp;客户信息
                        <!--<a data-toggle="modal" class="pull-right fa fa-gear" ></a>-->
                        <div class="btn-group pull-right">
                            <a class="fa fa-gear dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                            </a>
                            <ul class="dropdown-menu dropdown-menu-left">
                                <li>
                                    <button class="btn btn-white btn-block" @click="editClient">
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
                    <div class="row" v-for="item in clientDetail">
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>基本信息</h5>
                            <div>
                                <div>
                                    <span class="text-primary">客户姓名：</span>
                                    <span>{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">房屋地址：</span>
                                    <span>{{item.address}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">房型：</span>
                                    <span>{{item.rooms}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">备注：</span>
                                    <span>{{item.note}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">签约人：</span>
                                    <span>{{item.real_name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">负责人：</span>
                                    <span>{{item.head_name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">所属部门：</span>
                                    <span>{{item.department_name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>客户收款人信息</h5>
                            <div>
                                <div>
                                    <span class="text-primary">汇款方式：</span>
                                    <span v-if="item.financial_account.length > 0">
                                        {{dictionary.payment[item.financial_account[0].pay_method]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">收款人姓名：</span>
                                    <span v-if="item.financial_account.length > 0">
                                        {{item.financial_account[0].payee}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">开户行：</span>
                                    <span v-if="item.financial_account.length > 0">
                                        {{dictionary.bank[item.financial_account[0].bank]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">账号：</span>
                                    <span v-if="item.financial_account.length > 0">
                                        {{item.financial_account[0].account}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>历史账户信息</h5>
                            <div v-for="(account,index) in historyAccount">
                                <h5 v-if="historyAccount.length >1">{{index + 1}}</h5>
                                <div>
                                    <span class="text-primary">汇款方式：</span>
                                    <span v-if="historyAccount.length > 0">{{dictionary.payment[account.pay_method]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">收款人姓名：</span>
                                    <span v-if="historyAccount.length > 0">{{account.payee}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">开户行：</span>
                                    <span v-if="historyAccount.length > 0">{{dictionary.bank[account.bank]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">账号：</span>
                                    <span v-if="historyAccount.length > 0">{{account.account}}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <ClientEdit :editClientDetail = 'editClientDetail' @EditSuccess ='EditSuccess'></ClientEdit>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Confirm from '../../common/confirm.vue'
    import ClientEdit from  './clientEdit.vue'
    export default{
        components : {Confirm,ClientEdit,Status},
        data(){
            return{
                confirmMsg : '',
                myClientId : '',
                clientDetail : [],
                historyAccount : [],
                editClientDetail : [],
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
            }
        },
        mounted(){
            this.myClientId = this.$route.query.clientId;
            this.getDictionary();
        },
        methods:{
            getDictionary(){
                this.$http.get('revenue/customer/dict').then((res) =>{
                    this.dictionary = res.data;
                    this.getClientDetail();
                })
            },
            getClientDetail(){
                this.$http.post('revenue/customer/select',{id : this.myClientId}).then((res) =>{
                    if(res.data.code === '20010'){
                        this.clientDetail = [];
                        this.clientDetail.push(res.data.data.data);
                        this.editClientDetail = res.data.data.data;

                        var financial = [];
                        for(let i=0 ; i<res.data.data.data.financial_account.length; i++){
                            financial[i] = res.data.data.data.financial_account[i];
                        }
                        if(financial.length > 0){
                            financial.splice(0,1);
                        }
                        this.historyAccount = financial;
                    }else {
                        this.clientDetail = [];
                    }
                })
            },
            deleteClient(){
                this.confirmMsg = {msg:'您确定删除吗'};
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('revenue/customer/delete/id/' + this.myClientId).then((res) =>{
                    if(this.data.code === '20013'){
                        this.getClientDetail();
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            editClient(){
                $('#clientEdit').modal('show');
            },
            EditSuccess(val){
                if(val === 'yes'){
                    this.getClientDetail();
                }
            }
        },
    }
</script>


<style scoped>
    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    h4 > a {
        margin-left: 10px;
    }
    h5{
        font-size: 20px;
    }
    /*.panel-body:not(:last-child) {*/
        /*border-bottom: 1px solid #aaaaaa;*/
    /*}*/
    .client_info > div > div > div > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
    .client_info > div > div > div > div {
        margin-bottom: 20px;
    }
    @media (min-width: 768px) {
        .subregion:not(:first-child){
            border-left:1px dashed #aaaaaa;
        }
        .subregion{
            min-height: 400px;
        }
    }
    .btn-white {
        background-color: #fff;
        border-color: #fff;
        color: #666;
    }
    .btn-white:hover{
        border-radius: 0;
        background-color: #dedede;
        border-color: #dedede;
        color: #fff;
    }
    .dropdown-menu{
        padding: 0;
        border-radius: 0px;
        min-width: 112px;
    }
    dropdown-menu li:hover{
        background-color: #dedede;
    }
</style>
