<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>客户管理</li>
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
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>客户收款人信息</h5>
                            <div>
                                <span class="text-primary">汇款方式：</span>
                                <span>{{dictionary.payment[item.financial_account[0].pay_method]}}</span>
                            </div>
                            <div>
                                <span class="text-primary">收款人姓名：</span>
                                <span>{{item.financial_account[0].payee}}</span>
                            </div>
                            <div>
                                <span class="text-primary">开户行：</span>
                                <span>{{dictionary.bank[item.financial_account[0].bank]}}</span>
                            </div>
                            <div>
                                <span class="text-primary">账号：</span>
                                <span>{{item.financial_account[0].account}}</span>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12 subregion" v-for="account in historyAccount">
                            <h5>历史账户信息</h5>
                            <div>
                                <span class="text-primary">汇款方式：</span>
                                <span>{{dictionary.payment[account.pay_method]}}</span>
                            </div>
                            <div>
                                <span class="text-primary">收款人姓名：</span>
                                <span>{{account.payee}}</span>
                            </div>
                            <div>
                                <span class="text-primary">开户行：</span>
                                <span>{{dictionary.bank[account.bank]}}</span>
                            </div>
                            <div>
                                <span class="text-primary">账号：</span>
                                <span>{{account.account}}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <ClientEdit></ClientEdit>
    </div>
</template>

<script>
    import Confirm from '../../common/confirm.vue'
    import ClientEdit from  './clientEdit.vue'
    export default{
        components : {Confirm,ClientEdit},
        data(){
            return{
                confirmMsg : '',
                myClientId : '',
                clientDetail : [],
                historyAccount : [],
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
                this.clientDetail = [];
                this.$http.post('revenue/customer/select',{id : this.myClientId}).then((res) =>{
                    if(res.data.code === '20010'){
                        this.clientDetail .push(res.data.data.data) ;
                        let financial = res.data.data.data.financial_account
                        financial.splice(0,1);
                        this.historyAccount = financial;
                        console.log(this.clientDetail)
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

            },
            editClient(){
                $('#clientEdit').modal('show');
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
    .client_info > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
    @media (min-width: 768px) {
        .subregion:not(:last-child){
            border-right:1px dashed #aaaaaa;
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
