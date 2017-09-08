<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/payPayment">应付款项</router-link>
            </li>
            <li class="active">应付款项详情</li>
            <li class="pull-right" v-show="typeof params!='string'">
                <router-link :to="{path:'/payPayment',query:{myParam:params,page:page,selected:selected}}"><i
                        class="fa fa-angle-double-left"></i> 返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div class="pull-right">
                    <button class="btn btn-primary" @click="pendingItem" v-show="pendable==1">转为待处理项</button>
                    <button class="btn btn-primary" v-if="detailsStatus" data-toggle="modal" data-target="#payFor">
                        应付入账
                    </button>
                    <button class="btn btn-primary" v-show="status === 1" @click="dele">删除</button>
                </div>
                <div class="pro-sort">
                    <button class="status btn btn-success">房屋地址</button>
                </div>
                <div class="pro-sort">
                    <button class="status btn btn-success">{{address}}</button>
                </div>
                <div class="pro-sort status1">
                    <button class="btn btn-warning" v-if="status === 1">待入帐</button>
                    <button class="btn" v-if="status === 2" style="background-color: #FF9999;">待结清</button>
                    <button class="btn btn-success" v-if="status === 3">已结清</button>
                    <button class="btn" v-if="status === 4" style="background-color: #e4393c;">已超出</button>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;应付详情
                        <!--<a class="pull-right fa fa-pencil-square-o" @click="oper"></a>-->
                    </h4>
                </header>
                <div class="panel-body client_info">
                    <div>
                        <div class="col-md-12" v-for="list in details_info">
                            <div class="col-md-6">
                                <div>
                                    <span class="text-primary">客户姓名：</span>
                                    <span>{{list.customer == null ? '客户已删除' : list.customer.name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">详情：</span>
                                    <span>{{list.description}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">付款时间：</span>
                                    <span>
                                        {{list.current_pay_date}}
                                        <a data-toggle="modal" data-target="#moreTime">更多</a>
                                    </span>
                                </div>

                                <div>
                                    <span class="text-primary">账户类型：</span>
                                    <span>{{select_info.payment[list.customer_account_type]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">账户账号：</span>
                                    <span>{{list.customer_account_num}}</span>
                                </div>
                                <!--<div><span class="text-primary">账户余额：</span><span>{{details_info.description}}</span></div>-->
                                <!--<div><span class="text-primary">付款方式：</span><span>{{details_info.description}}</span></div>-->
                                <!--<div><span class="text-primary">月单价：</span><span>dfsdf</span></div>-->

                                <!--<div>-->
                                    <!--<span class="text-primary">汇款方式：</span>-->
                                    <!--<span>-->
                                        <!--{{select_info.payment[list.customer.account_type]}}-->
                                    <!--</span>-->
                                <!--</div>-->
                                <div>
                                    <span class="text-primary">收款人姓名：</span>
                                    <span>
                                        {{list.customer.account_owner}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">开户行：</span>
                                    <span>
                                          {{select_info.bank[list.customer.account_bank]}}
                                    </span>
                                </div>
                                <!--<div>-->
                                    <!--<span class="text-primary">账号：</span>-->
                                    <!--<span>-->
                                        <!--{{list.customer.account_num}}-->
                                    <!--</span>-->
                                <!--</div>-->
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <span class="text-primary">支出科目：</span>
                                    <span>{{select_info.account_subject[list.subject_id]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">应付金额：</span>
                                    <span>{{list.amount_payable}}</span>
                                </div>
                                <!--<div><span class="text-primary">应付金额：</span><span>{{details_info.amount_paid}}</span></div>-->
                                <div>
                                    <span class="text-primary">实付金额：</span>
                                    <span>{{list.amount_paid}}</span>
                                </div>
                                <!--<div><span class="text-primary">累计实付：</span><span>sdfdsf</span></div>-->
                                <div>
                                    <span class="text-primary">剩余款项：</span>
                                    <span>{{list.balance}}</span></div>
                                <div>
                                    <span class="text-primary">补齐时间：</span>
                                    <span v-if="changeCompleteDate">{{list.complete_date}}</span>

                                    <span v-if="!changeCompleteDate">
                                        <span>
                                            <input type="text" @click="remindData1" v-model="complete_date" readonly
                                                   class="form-control form_datetime1"
                                                   style="max-width: 200px;display: inline-block;">
                                        </span>
                                        <button type="button" class="btn btn-sm btn-success"
                                                @click="change_com">确定</button>
                                        <button type="button" class="btn btn-sm btn-primary"
                                                @click="changeComplete">取消</button>
                                    </span>
                                    <a v-if="changeCompleteDate && status === 2" @click="changeComplete">编辑</a>
                                </div>
                                <div>
                                    <span class="text-primary">备注：</span>
                                    <span>{{list.remark}}</span>
                                </div>
                                <!--<div><span class="text-primary">签约人：</span><span>sdfdsf</span></div>-->
                                <!--待入账的没有-->
                                <!--<div><span class="text-primary">付款人员：</span><span>sdfdsf</span></div>-->
                                <!--<div><span class="text-primary">历史打款记录：</span><span>sdfdsf</span></div>-->
                            </div>
                            <div class="col-xs-12">
                                <span class="text-primary">历史收款记录：</span>
                                <div class="table table-responsive roll" style="border: 0;">
                                    <table>
                                        <tbody>
                                        <tr v-for="info in list.running_account_record">
                                            <td style="min-width: 240px;">{{info}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


        <!--付款时间-->
        <div class="modal fade full-width-modal-right" id="moreTime" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="details(should_id)"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑付款时间</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group" v-for="(item, index) in moreTime">
                                <label class="col-sm-3 control-label">第{{index + 1}}次付款时间</label>
                                <div class="col-sm-9" v-if="showOper[index]">
                                    <div class="col-sm-7">
                                        <input @click="remindData" type="text" readonly
                                               :class="{'form-control' : true,'form_datetime':index < 4,'form_datetime2':index >= 4}"
                                               v-model="moreTime[index].pay_date">
                                    </div>
                                    <div class="col-sm-5">
                                        <button type="button" class="btn btn-sm btn-success"
                                                @click="operTime(index,item.id)">
                                            确定
                                        </button>
                                        <button type="button" class="btn btn-sm btn-primary" @click="cancel(index)">取消
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-8" v-else="showOper[index]">
                                    <div class="col-sm-6">
                                        <span>{{item.pay_date}}</span>
                                    </div>
                                    <div class="col-sm-5">
                                        <span @click="changeShow(index)" v-if="status === 1"><a>编辑</a></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <!--提示信息-->
        <Status :state='info'></Status>

        <!--应付入账-->
        <ShouldPay @pay_succ="pay_success" :details="details_info"></ShouldPay>

        <!--<SelectHouse @House="getHouse"></SelectHouse>-->

        <!--<SelectClient @clientAdd="getClient"></SelectClient>-->
        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    import ShouldPay from './paymentShouldPay.vue'
    import Confirm from '../../common/confirm.vue'
    import SelectHouse from '../../common/selectHouse.vue'
    import SelectClient from '../../common/selectClient.vue'

    export default{
        components: {Status, ShouldPay, SelectHouse, SelectClient, Confirm},
        data(){
            return {
                changeCompleteDate: true,       //修改补齐时间
                complete_date: '',              //资料补齐时间
                address: '',
                status: '',
                detailsStatus: true,
                descriptions: [],
                select_info: [],
//                should_id: '',                //应付ID
                currentIndex: -1,
                details_info: [],               //应付详情
                showOper: [],

                times: [],
                moreTime: [],
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

                pendable: '',

                confirmMsg: {
                    id: '',
                    msg: ''
                },
                params: {},
                page: '',
                selected: [],
            }
        },
        updated (){
            this.remindData();
            this.remindData1();
        },
        mounted (){
            this.should_id = this.$route.query.payId;
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.selected = this.$route.query.selected;
            this.details(this.$route.query.payId);
            for (let i = 0; i < this.moreTime.length; i++) {
                this.showOper.push(false);
            }
//            this.times = this.moreTime;
        },
        methods: {
//            资料补齐时间
            remindData1 (){
                $('.form_datetime1').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: 'top-left'
                }).on('changeDate', function (ev) {
                    this.complete_date = ev.target.value;
                }.bind(this));
            },
//            编辑资料补齐时间
            changeComplete (){
                this.changeCompleteDate = !this.changeCompleteDate;
            },
//            修改资料补齐时间
            change_com (){
                this.$http.put('account/payable/' + this.should_id, {
                    complete_date: this.complete_date
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.pay_success();
                        this.changeCompleteDate = true;
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            pay_success (){
                this.details(this.should_id);
            },
//            详情
            details (val){
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.select_info = res.data;

                    this.$http.get('account/payable/' + val).then((res) => {
                        this.details_info = [];
                        this.moreTime = [];
                        this.details_info.push(res.data.data);
                        console.log(status);
                        this.status = res.data.data.status;
                        if (res.data.data.customer !== null && res.data.data.customer !== undefined) {
                            this.address = res.data.data.customer.address;
                        }
                        this.complete_date = res.data.data.complete_date;
                        this.pendable = res.data.data.pendable;
                        if (res.data.data.balance === '0.00') {
                            this.detailsStatus = false;
                        } else {
                            this.detailsStatus = true;
                        }
                        this.descriptions = res.data.data.description.split('/');

                        for (let i = 0; i < res.data.data.pay_date.length; i++) {
                            this.moreTime.push(res.data.data.pay_date[i]);
                        }
                        for (let i = 0; i < res.data.data.pay_date.length; i++) {
                            this.times.push(res.data.data.pay_date[i]);
                        }
                        for (let i = 0; i < this.moreTime.length; i++) {
                            this.showOper.push(false);
                        }

                    });
                });
            },
            oper(){
                $('#edit').modal('show');
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
//                    pickerPosition : 'top-left'
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '付款时间') {
                        // 编辑中的付款时间
                    } else {
                        this.moreTime.splice(this.currentIndex, 1, {
                            id: this.moreTime[this.currentIndex].id,
                            pay_date: ev.target.value
                        });
                    }
//                    console.log(ev.target.value);
//                    console.log(ev.target.placeholder);
                }.bind(this));
                $('.form_datetime2').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                    pickerPosition: 'top-left'
                }).on('changeDate', function (ev) {
                    this.moreTime.splice(this.currentIndex, 1, {
                        id: this.moreTime[this.currentIndex].id,
                        pay_date: ev.target.value
                    });
                }.bind(this));
            },

            changeShow(index){
                if (this.currentIndex === -1) {
                    this.currentIndex = index;
//                this.showOper[index] = true;
                    this.showOper.splice(index, 1, true);
                }
            },
            operTime(index, id){
                this.$http.post('account/payable/scheduler/' + this.moreTime[index].id, {pay_date: this.moreTime[index].pay_date}).then((res) => {
                    if (res.data.code === '18410') {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.currentIndex = -1;
                        this.showOper.splice(index, 1, false);
                        this.times.splice(index, 1, this.moreTime[index]);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_error = false;
                    }
                })
            },
            cancel(index){
                this.currentIndex = -1;
                this.showOper.splice(index, 1, false);
                this.moreTime.splice(index, 1, this.times[index]);
            },

            pendingItem(){
                this.$http.post('account/pending/payable/' + this.should_id).then((res) => {
                    if (res.data.code === '18810') {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
//                        this.details(this.should_id);
                        this.$router.replace({path: '/payPayment'});
                    } else {
                    }
                    // 失败
                    this.info.error = res.data.msg;
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                    //一秒自动关闭失败信息弹窗 ***
                    this.info.state_error = false;
                })
            },

            // 删除
            dele(){
                this.confirmMsg.id = this.operId;
                this.confirmMsg.msg = '确定删除该条应付款项吗？';
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('account/payable/delete/' + this.should_id).then((res) => {
                    if (res.data.code === '18410') {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.$router.push({path: '/payPayment'});
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_error = false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .head .panel-body > div span {
        font-weight: bold;
    }

    .head .panel-body > div span + span {
        margin-left: 12px;
    }

    .pro-sort .status {
        background-color: transparent;
        color: #868886;
        font-weight: bold;
        border: 0;
        cursor: auto;
    }

    .status1 button {
        color: #FFFFFF;
        border: 0;
        cursor: auto;
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
        width: 120px;
    }

    .client_info > div > div > div span a {
        margin-left: 12px;
        font-size: 8px;
    }

    .form-horizontal .form-group span {
        line-height: 34px;
        font-size: 14px;
    }

    textarea {
        max-width: 100%;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>