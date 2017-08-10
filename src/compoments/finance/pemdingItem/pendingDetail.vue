<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/pendingItem">应付款项</router-link>
            </li>
            <li>结算详情</li>
        </ol>
        <div class="title clearFix">
            <div class="contractNum" style="margin-bottom: 10px">
                <!--<h5 style="margin-right: 15px">-->
                    <!--合同编号&emsp;-->
                <!--</h5>-->
                <span class="label label-primary" v-if="myDictionary.account_pending_status !==undefined">
                    {{myDictionary.account_pending_status[account_pending_status]}}
                </span>
            </div>
            <div class="pull-right dropdown" v-if="account_pending_status !== 2">
                <button class="btn btn-primary pull-right" @click="receivables">生成应收款项</button>
            </div>
        </div>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;结算详情
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12"v-for="item in pendingDetailList">
                            <div class="col-md-4">
                                <div><span class="text-primary">客户姓名：</span><span>{{item.customer_name}}</span></div>
                                <div><span class="text-primary">房屋地址：</span><span>{{item.detailed_address}}</span></div>
                                <div>
                                    <span class="text-primary">事项类型：</span>
                                    <span>{{myDictionary.item_type[item.item_type]}}</span>
                                </div>
                                <div><span class="text-primary">合同开始时间：</span><span>{{item.start_date}}</span></div>
                                <div><span class="text-primary">合同结束时间：</span><span>{{item.end_date}}</span></div>
                                <div>
                                    <span class="text-primary">付款方式：</span>
                                    <span>{{myDictionary.pay_type[item.pay_type]}}</span>
                                </div>
                                <div><span class="text-primary">月单价：</span><span></span></div>
                                <div><span class="text-primary">往来记录：</span><span></span></div>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">水费：</span><span>{{item.water_fee}}</span></div>
                                <div><span class="text-primary">电费：</span><span>{{item.elec_fee}}</span></div>
                                <div><span class="text-primary">燃气费：</span><span>{{item.gas_fee}}</span></div>
                                <div><span class="text-primary">物业费：</span><span>{{item.property_fee}}</span></div>
                                <div><span class="text-primary">网络费：</span><span>{{item.net_fee}}</span></div>
                                <div><span class="text-primary">转租费用：</span><span>{{item.sublet_fee}}</span></div>
                                <div><span class="text-primary">管理费：</span><span>{{item.manage_fee}}</span></div>
                                <div><span class="text-primary">物业校验：</span><span>{{item.check_fee}}</span></div>
                                <div><span class="text-primary">违约金：</span><span>{{item.penalty_fee}}</span></div>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">应退：</span><span>{{item.refund_should}}</span></div>
                                <div><span class="text-primary">实际扣款：</span><span>{{item.refund_diff}}</span></div>
                                <div><span class="text-primary">实际退款：</span><span>{{item.refund_real}}</span></div>
                                <div>
                                    <span class="text-primary">结算方式：</span>
                                    <span>{{myDictionary.payment[item.account_type]}}</span>
                                </div>
                                <div><span class="text-primary">结算账户：</span><span>
                                    {{item.account_num}}
                                </span></div>
                                <div><span class="text-primary">签约人：</span><span>{{item.staff_name}}</span></div>
                                <div><span class="text-primary">所属部门：</span><span>{{item.department_name}}</span></div>
                                <div><span class="text-primary">收款人：</span><span></span></div>
                                <div><span class="text-primary">结算日期：</span><span>{{item.settle_date}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


        <!--提示信息-->
        <Status :state='info'></Status>

        <settleModal :settleId = 'rentingId' :dictionary = 'myDictionary'
                     :collect_rent = 'collect_rent' @Settle="hasSettle"></settleModal>

    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    import settleModal from './pendingSettle.vue'

    export default{
        components: {Status , settleModal},
        data(){
            return {
                myRentingId : '',
                pendingDetailList : [],
                myDictionary :[],
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                account_pending_status : '',
                collect_rent : '',
                rentingId : '',
            }
        },
        mounted(){
            this.myRentingId = this.$route.query.RentingId;  //路由接受合同id
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('revenue/glee_collect/dict').then((res) =>{
                    this.myDictionary = res.data;
                    console.log(this.myDictionary);
                    this.getRentingDetail();
                })
            },
            getRentingDetail(){
                this.$http.get('account/pending/' + this.myRentingId).then((res) =>{
                    if(res.data.code === '18800'){
                        this.account_pending_status = res.data.data.status;
                        this.collect_rent = res.data.data.collect_rent;
                        this.pendingDetailList .push(res.data.data);
                    }else {
                        this.pendingDetailList = [];
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
            receivables(){
                this.rentingId = this.myRentingId;
                $('#pendingSettle').modal('show');
            },
            hasSettle(){this.getRentingDetail();},
        }
    }
</script>

<style scoped>
    .head .panel-body>div span{
        /*display: inline-block;*/
        font-weight: bold;
    }
    .head .panel-body>div span+span{
        margin-left: 12px;
    }
    .head .panel-body>div span.status{
        /*color: white;*/
        font-weight: normal;
        font-size: 12px;
    }

    header h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    header h4 > a {
        margin-left: 10px;
    }
    .client_info > div > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    .client_info > div > div > div span a{
        margin-left: 12px;
        font-size: 8px;
    }
    .form-horizontal .form-group span{
        line-height: 34px;
        font-size: 14px;
    }

    .title{
        background-color: white;
        border-radius: 5px;
        padding: 15px 12px;
        margin-bottom: 15px;
    }
    .title>div{
        display: inline-block;
    }
    .contractNum{
    }
    .contractNum h5{
        display: inline-block;
        font-weight: 600;
        vertical-align: middle;
    }
</style>