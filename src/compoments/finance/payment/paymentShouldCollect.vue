<template>
    <div>
        <div class="modal fade full-width-modal-right" id="collectFor" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="clearForm" aria-label="Close"><span
                                aria-hidden="true" @click="clearForm">&times;</span></button>
                        <h4 class="modal-title">应收入账</h4>
                    </div>
                    <div class="modal-body clearFix" v-if="msg!=''">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款时间</label>
                                <div class="col-sm-10">
                                    <DatePicker :dateConfigure="datePayConfigure" :idName="'pay_date'"
                                                :currentDate="[formData.pay_date]" :placeholder="'付款时间'"
                                                @sendDate="getPayDate"></DatePicker>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly
                                           :value="msg.customer==null?'客户已被删除':msg.customer.name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情</label>
                                <div class="col-sm-10">
                                    <textarea type="text" class="form-control" readonly rows="4"
                                              style="margin-bottom: 18px">{{msg.description}}</textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款方式<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <select class="form-control" @change="getAccount" v-model="cate">
                                        <option value="">--请选择--</option>
                                        <option :value="value" v-for="(key,value) in dict.account_cate">{{key}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款账户<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.account_id">
                                        <option value="">--请选择--</option>
                                        <option :value="value" v-for="(key,value) in accounts">{{key}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应收金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="msg.amount_receivable">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">实收金额<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="formData.amount_received">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">剩余款项</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="msg.balance">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">补齐时间<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <DatePicker :dateConfigure="dateConfigure" :idName="'completeTime'" :currentDate="[formData.complete_date]" :placeholder="'补齐时间'" @sendDate="getDate"></DatePicker>
                                    <!--<input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间"
                                           class="form-control form_datetime" readonly v-model="formData.complete_date">-->
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">累计实收</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款人员</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="logName">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">截图凭证</label>
                                <div class="col-sm-10">
                                    <span class="form-control" style="border: none"
                                          v-if="msg.album == undefined||msg.album.receipt_pic.length==0">
                                        无
                                    </span>
                                    <span v-else="">
                                        <img :src="item.small" alt="" v-for="(item,index) in msg.album.receipt_pic"
                                             @click="showLargePic(index)">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" v-model="formData.remark"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                        <button type="button" class="btn btn-primary" @click="save">确认入账</button>
                    </div>
                </div>
            </div>
        </div>

        <PicModal :largePic="largePic"></PicModal>
        <!--提示信息-->
        <Status :state='info'></Status>

    </div>
</template>
<style scoped>
    textarea {
        max-width: 100%;
        resize: none;
    }
</style>
<script>
    import PicModal from '../../common/largePic.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'


    export default{
        props: ['id'],
        components: {PicModal, Status,DatePicker},
        data(){
            return {
                dict: {},
                msg: {},
                currentId: '',
                largePic: [],
                srcs: {},

                beforeBalance: '',
                cate: '',
                logName: '',
                formData: {
                    pay_date: '',               //收款时间
                    account_id: '',            // 账户id
                    amount_received: '',      // 收款金额
                    complete_date: '',     // 补齐时间
                    remark: ''             // 备注
                },

                accounts: {},
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
                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                        position : 'top-right'
                    }
                ],
                datePayConfigure: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
                pay_date: '',           //付款时间
            }
        },
        watch: {
            id(val){
                this.currentId = val;
                this.largePic = [];
                this.srcs = {};
                this.getDetails();
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                this.dict = res.data;
            });

            // 获取当前登录人的姓名
            this.$http.get('staff/info').then((res) => {
                this.logName = res.data.name;
            })
        },
        methods: {
            clearForm(){
                this.cate = '';
                this.formData.account_id = '';
                this.formData.amount_received = '';
                this.formData.complete_date = '';
                this.formData.remark = '';
                this.largePic = [];
//                this.srcs = {};

                $('#collectFor').modal('hide');
            },

//            remindData (){
//                $('.form_datetime').datetimepicker({
//                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
//                    language: 'zh-CN',
//                    format: 'yyyy-mm-dd',
//                    todayBtn: 1,
//                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
//                    pickerPosition: 'top-right'
//                }).on('changeDate', function (ev) {
//                    if (ev.target.placeholder === '补齐时间') {
//                        this.formData.complete_date = ev.target.value;
//                    }
//                }.bind(this));
//            },

            getDetails(){
                this.$http.get('account/receivable/' + this.currentId).then((res) => {
                    this.msg = res.data.data;
                    this.pay_date = res.data.data.current_pay_date;
                    if (res.data.data.album !== undefined) {
                        this.srcs = this.msg.album.receipt_pic;
                    }
                    this.beforeBalance = this.msg.balance;

                })
            },

            // 查看大图
            showLargePic(num){
                this.largePic = [{
                    src: this.srcs,
                    i: num
                }];
                $('.largePic:eq(0)').modal('show');
            },

//            根据收款方式获取收款账户
            getAccount(){
                this.$http.get('account/manage/readbycate/' + this.cate).then((res) => {
                    this.accounts = res.data;
                    this.formData.account_id = '';
                })
            },

//            应收入账
            save(){
                this.$http.post('account/receivable/receive/' + this.currentId, this.formData)
                    .then((res) => {
                        if (res.data.code === '18510') {
                            //成功信息 ***
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.operId = 0;
                            this.clearForm();
                            this.$emit('success', 1);
                        } else {
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })
            },

            getDate(val){
                this.formData.complete_date = val;
            },
            getPayDate(val){
                this.formData.pay_date = val;
            }
        }
    }
</script>