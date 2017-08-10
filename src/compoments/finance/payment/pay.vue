<template>
    <div>

        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>应付款项</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="input-group">
                            <select class="form-control" v-model="params.status" @change="search(1)">
                                <option value="">全部</option>
                                <option :value="value" v-for="(key,value) in dict.account_should_status">{{key}}
                                </option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addPay">
                                <i class="fa fa-plus-square"></i>&nbsp;新增应付款项
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <!--<li>
                            <h5 data-toggle="modal" data-target="#addPay"><a><i class="fa fa-plus-square"></i>&nbsp;新增应付款项</a></h5>
                        </li>-->
                        <li v-show="statusId != 3">
                            <h5><a data-toggle="modal" data-target="#payFor"><i class="fa fa-pencil"></i>&nbsp;应付入账</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="panel tips">
            <ul class="clearFix">
                <li class="col-md-4">
                    应付金额(元) <br>
                    <span class="red">{{tips.payable_sum}}</span>
                </li>
                <li class="col-md-4">
                    实付金额(元) <br>
                    <span class="red">{{tips.paid_sum}}</span>
                </li>
                <li class="col-md-4">
                    剩余款项(元) <br>
                    <span class="yellow">{{tips.balance_sum}}</span>
                </li>
            </ul>
        </div>

        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">付款时间</th>
                            <th class="text-center">客户姓名</th>
                            <!--<th class="text-center">签约人</th>-->
                            <!--<th class="text-center">房屋地址</th>-->
                            <!--<th class="text-center">付款方式</th>-->
                            <!--<th class="text-center">月单价</th>-->
                            <th class="text-center">支出科目</th>
                            <th class="text-center">应付金额</th>
                            <th class="text-center">实付金额</th>
                            <th class="text-center">剩余款项</th>
                            <th class="text-center">补齐时间</th>
                            <th class="text-center">详细信息</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id"
                                       @click="changeIndex($event,item.id,item.status)">
                            </td>
                            <td>{{item.pay_date}}</td>
                            <td><span v-if="item.customer != null">{{item.customer.address}}</span></td>
                            <!--<td><span v-if="item.customer != null">{{item.customer.name}}</span></td>-->
                            <!--<td>{{item.description.staff_name}}</td>
                            <td>{{item.description.address}}</td>
                            <td>{{dict.pay_type[item.description.pay_type]}}</td>
                            <td>{{item.description.price}}</td>-->
                            <td>{{dict.account_subject[item.subject_id]}}</td>
                            <td>{{item.amount_payable}}</td>
                            <td>{{item.amount_paid}}</td>
                            <td>{{item.balance}}</td>
                            <td>{{item.complete_date}}</td>
                            <td>
                                {{item.description}}
                            </td>
                            <td>
                                <label :class="{'label':true,'status':true,'yellow':item.status===1,'red':item.status===2,'green':item.status===3}">
                                    {{dict.account_should_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <router-link :to="{path:'/payPaymentDetail',query: {payId: item.id}}">详情</router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="13" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--新增-->
        <div class="modal fade full-width-modal-right" id="addPay" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="clearForm" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">新增应付款项</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款时间<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" name="addtime" v-model="pay_time"
                                           placeholder="付款时间"
                                           class="form-control form_datetime" readonly>
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">房屋地址</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" data-toggle="modal" data-target="#selectHouse" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="cus_name" @click="selectClient"
                                           readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情<span class="text-danger">*</span></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="detailed">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">支出科目<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="subject">
                                        <option value="">--请选择--</option>
                                        <option v-for="(sub,index) in select_info.account_subject" :value="index">{{sub}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应付金额<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="payable">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户类型<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="accountType">
                                        <option value="">--请选择--</option>
                                        <option v-for="(list,index) in select_info.payment" :value="index">{{list}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户账号<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="accountNumber" maxlength="25">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款人员<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="pay_man" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" v-model="remarks"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                        <button type="button" class="btn btn-primary" @click="new_addPay">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!--应付入账-->

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <SelectHouse @House="getHouse"></SelectHouse>

        <SelectClient @clientPayAdd="getClient"></SelectClient>

        <!--应付入账-->
        <ShouldPay @pay_succ="search" :details="details_info"></ShouldPay>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import FlexBox from '../../common/flexBox.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import DatePicker from '../../common/datePicker.vue'

    import SelectHouse from '../../common/selectHouse.vue'
    import SelectClient from '../../common/selectPayClient.vue'

    import ShouldPay from './paymentShouldPay.vue'

    export default{
        components: {Page, Status, FlexBox, DatePicker, STAFF, SelectHouse, SelectClient, ShouldPay},

        data(){
            return {
                accountType: '',                    //账户类型
                accountNumber: '',                  //账户账号
                details_info: [],                   //应入
                select_info: {},
                pay_time: '',                       //付款日期
                cus_id: '',                         //客户ID
                cus_name: '',                       //客户姓名
                detailed: '',                       //详情
                subject: '',                        //支付科目
                payable: '',                        //应付金额
                remarks: '',                        //备注
                pay_man: '',                        //付款人员

                beforePage: 1,
                operId: 0,
                statusId: 0,
                paging: '',

                dict: {},
                myData: [],                 //列表数据
                isShow: false,
                dateConfigure: [
                    {
                        range: true,
                        needHour: true
                    }
                ],

                configure: {},
                filtrate: {
                    departmentList: [],
                    staffList: []
                },

                title: '',
                isAdd: true,

                selected: [],
                params: {
                    department_id: [],
                    staff_id: [],
                    status: '',
                    range: '',
                    search: ''
                },
                tips: {
                    payable_sum: 0.00,          // 应付总额
                    paid_sum: 0.00,             // 已付总额
                    balance_sum: 0.00,          // 欠额总额
                },
                formData: {
                    customer: {}
                },
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        updated (){
            this.remindData();
//            时间选择
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
                    (res) => {
                        this.dict = res.data;
                        this.payFlowList();
                    }
                );
        },
        methods: {
//            新增入账模态框
            addPay (){
                $('#addPay').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            确认新增
            new_addPay(){
                this.$http.post('account/payable', {
                    customer_id: this.cus_id,                           //客户ID
                    pay_date: this.pay_time,                            //付款日期
                    subject_id: this.subject,                           //支付科目ID
                    customer_account_type: this.accountType,            //账户类型
                    customer_account_num: this.accountNumber,           //账户账号
                    description: this.detailed,                         //详情
                    amount_payable: this.payable,                       //应付
                    remark: this.remarks                                //备注
                }).then((res) => {
                    if (res.data.code === '18410') {
                        $('#addPay').modal('hide');
                        this.search(1);
                        this.pay_time = '';                       //付款日期
                        this.cus_id = '';                         //客户ID
                        this.cus_name = '';                       //客户姓名
                        this.detailed = '';                       //详情
                        this.subject = '';                        //支付科目
                        this.payable = '';                        //应付金额
                        this.remarks = '';                        //备注
                        //成功信息 ***
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
                })
            },
//            取消
            clearForm(){
                $('#addPay').modal('hide');
                this.accountType = '';                    //账户类型
                this.accountNumber = '';                  //账户账号
                this.pay_time = '';                       //付款日期
                this.cus_id = '';                         //客户ID
                this.cus_name = '';                       //客户姓名
                this.detailed = '';                       //详情
                this.subject = '';                        //支付科目
                this.payable = '';                        //应付金额
                this.remarks = '';                        //备注
            },

            changeIndex(ev, id, status){
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.select_info = res.data;

                    this.$http.get('account/payable/' + id).then((res) => {
                        this.details_info = [];
                        this.details_info.push(res.data.data);
                    });
                });
//                console.log("一开始"+this.operId);
                if (ev.target.checked) {
                    this.operId = id;
                    this.statusId = status;
//                    console.log(this.operId);
                } else {
                    this.operId = 0;
                    this.statusId = 0;
                }
            },

            payFlowList(){
                this.$http.get('staff/info').then((res) => {
                    this.pay_man = res.data.name;
                });
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.select_info = res.data;

                    this.$http.get('account/payable').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res.data.data);
                        if (res.data.code === '18400') {
                            this.myData = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.setTips(res.data.data, true);
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.setTips({}, false);
                        }
                    })
                });
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '付款时间') {
                        this.pay_time = ev.target.value
                    } else {

                    }
//                    console.log(ev.target.value);
//                    console.log(ev.target.placeholder);
                }.bind(this));
            },

            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
            clearSelect(){
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

            search(val){
                this.filter(val);
            },
            filter(val){
                this.operId = 0;
                this.beforePage = val;
                this.$http.get('account/payable?page=' + val, {
                    params: this.params
                }).then(
                    (res) => {
                        if (res.data.code === '18400') {
                            // 成功
                            this.paging = res.data.data.pages;
                            this.myData = res.data.data.data;
                            this.setTips(res.data.data, true);
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.myData = [];
                            this.paging = 0;
                            this.page = 1;
                            this.setTips({}, false);
                        }
                    }
                )
            },
            getDate(data){
                // 时间
                this.params.range = data;
                this.search(1);
            },

            getHouse(data){
            },


            setTips(val, bool){
                if (bool) {
                    this.tips.payable_sum = val.payable_sum;
                    this.tips.paid_sum = val.paid_sum;
                    this.tips.balance_sum = val.balance_sum;
                } else {
                    this.tips.payable_sum = 0.00;
                    this.tips.paid_sum = 0.00;
                    this.tips.balance_sum = 0.00;
                }

            },

            // 选择客户
            selectClient(){
                $('.selectClient:eq(0)').modal('show');
            },
            getClient(data){
                console.log(data);
                this.cus_id = data.id;
                this.cus_name = data.name
//                this.formData.customer = data;
                /*this.$http.post('account/payable',this.formData)
                 .then()*/
            },
        }
    }
</script>

<style scoped>
    .datePickerContainer {
        margin-bottom: 0;
    }

    @media (max-width: 798px) {
        .datePickerContainer {
            margin-top: 3px;
        }
    }

    .tips {
        line-height: 30px;
        /*padding-left: 12px;*/
        padding-bottom: 5px;
        font-size: 15px;
        /*margin-top: 20px;*/
        /*width: 100%;*/
    }

    .tips ul {
        margin: 0;
        padding: 12px 0;
    }

    .tips ul li {
        /*float: left;*/
        padding: 0 50px;
        box-sizing: border-box;
    }

    .tips ul li + li {
        /*margin-left: 30px;*/
        border-left: 1px solid #ddd;

    }

    .tips ul li span {
        font-size: 18px;
    }

    .tips ul li span.red {
        color: #FF6666;
    }

    .tips ul li span.yellow {
        color: #FF9A02;
    }

    tbody tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    textarea {
        max-width: 100%;
    }

    tbody tr td .status {
        color: white;
        /*font-weight: bold;*/
    }

    .status.yellow {
        background-color: #FFCC00;
    }

    .status.red {
        background-color: #FF9999;
    }

    .status.green {
        background-color: #78CD51;
    }
</style>