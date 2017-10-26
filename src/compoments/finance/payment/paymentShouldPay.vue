<template>
    <div>
        <div class="modal fade full-width-modal-right" id="payFor" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="revise()" data-dismiss="modal"
                                aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">应付入账</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form" v-for="list in details">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款时间</label>
                                <div class="col-sm-10">
                                    <DatePicker :dateConfigure="datePayConfigure" :idName="'pay_date'"
                                                :currentDate="[pay_date]" :placeholder="'付款时间'"
                                                @sendDate="getPayDate"></DatePicker>
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">房屋地址</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly
                                           :value="list.customer==null?'客户已被删除':list.customer.name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" readonly rows="4"
                                              style="margin-bottom: 18px">{{list.description}}</textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">支出科目</label>
                                <div class="col-sm-10">
                                    <SelectSubject @choose="subject_revise" :current="subject_id"></SelectSubject>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款方式</label>
                                <div class="col-sm-10">
                                    <select class="form-control" @change="getAccount" v-model="cate">
                                        <option value="">--请选择--</option>
                                        <option v-for="(sub,index) in dict.payment" :value="index">{{sub}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款账户</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="pay_account">
                                        <option value="">--请选择--</option>
                                        <option v-for="(sub,index) in pay_acc" :value="index">{{sub}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户类型</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly
                                           v-model="dict.payment[list.customer_account_type]">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户账号</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="list.customer_account_num"
                                           readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">实付金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="payable">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">剩余款项</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="list.balance" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">补齐日期</label>
                                <div class="col-sm-10">
                                    <DatePicker :dateConfigure="dateConfigure" :idName="'completeTime'"
                                                :currentDate="[complete_time]" :placeholder="'补齐日期'"
                                                @sendDate="getDate"></DatePicker>

                                    <!--<input @click="remindData1" type="text" placeholder="补齐日期"
                                           class="form-control form_datetime1" readonly>-->
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款人员</label>
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
                        <button type="button" class="btn btn-default" @click="revise ()">取消</button>
                        <button type="button" class="btn btn-primary" @click="okPayment">确认入账</button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>
        <!--<SelectClient @clientAdd="getClient"></SelectClient>-->
    </div>
</template>
<style scoped>

</style>
<script>
    import SelectClient from '../../common/selectClient.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import SelectSubject from '../../common/selectSubject.vue'      //科目
    export default{
        props: ['details'],
        components: {SelectClient, Status, DatePicker, SelectSubject},
        data(){
            return {
                dict: {},
                pay_acc: [],            //收款账户
                cate: '',
                account_id: '',         //客户ID
                pay_account: '',        //付款账户
                payable: '',            //实付金额
                complete_time: '',      //补齐时间
                remarks: '',            //备注
                pay_man: '',            //付款人员
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
                dateConfigure: [
                    {
                        range: false,
                        needHour: false,
                        position: 'top-right'
                    }
                ],
                datePayConfigure: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
                pay_date: '',           //付款时间
                subject_id: ''          //科目

            }
        },

        mounted(){
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                this.dict = res.data;

                this.$http.get('staff/info').then((res) => {
                    this.pay_man = res.data.name;
                });
            });
        },
        watch: {
            details(val){
                this.account_id = val[0].id;
                this.subject_id = val[0].subject_id;
                this.pay_date = val[0].current_pay_date;
            }
        },
        methods: {
//            科目
            subject_revise(val){
                this.subject_id = val;
            },
//            根据收款方式获取收款账户
            getAccount(){
                this.$http.get('account/manage/readbycate/' + this.cate).then((res) => {
                    if (res.data.code !== '18402') {
                        this.pay_acc = res.data;
                        this.pay_account = '';
                    } else {
                        this.pay_acc = [];
                    }
                })
            },
//            确认入账
            okPayment (){
                this.$http.post('account/payable/pay/' + this.account_id, {
                    account_id: this.pay_account,
                    pay_date: this.pay_date,
                    amount_paid: this.payable,
                    complete_date: this.complete_time,
                    remark: this.remarks
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.revise();
                        $('#payFor').modal('hide');
                        this.$emit('pay_succ', 1);
//                        this.$emit('pay');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.pay_acc = [];
                        this.pay_account = '';        //付款账户
                        this.payable = '';            //实付金额
                        this.complete_time = '';      //补齐时间
                        this.remarks = '';            //备注
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
//            取消
            revise (){
                $('#payFor').modal('hide');
                this.cate = '';
                this.pay_acc = [];
                this.pay_account = '';        //付款账户
                this.payable = '';            //实付金额
                this.complete_time = '';      //补齐时间
                this.remarks = '';            //备注
            },

//            补齐时间
//            remindData1 (){
//                $('.form_datetime1').datetimepicker({
//                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
//                    language: 'zh-CN',
//                    format: 'yyyy-mm-dd',
//                    todayBtn: 1,
//                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
//                    pickerPosition: 'top-right'
//
//                }).on('changeDate', function (ev) {
//                    this.complete_time = ev.target.value;
//                }.bind(this));
//            },
            getDate(val){
                this.complete_time = val;
            },
            getPayDate(val){
                this.pay_date = val;
            }
        }
    }
</script>