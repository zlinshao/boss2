<template>
    <div>
        <div class="modal fade full-width-modal-right" id="newClientAdd" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" @click="closeModal">
                                <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">新增收房报备</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">

                                <h4>基本信息</h4>
                                <div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">签约人<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input title="请点击选择" type="text" class="form-control" readonly
                                                   v-model="staff" @click="selectStaff">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled v-model="branch">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">负责人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled v-model="person">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">客户姓名</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="cus_name"
                                                   @click="selectClient" readonly>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">客户手机号</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="cus_phone" maxlength="11">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="house_name"
                                                   @click="selectHouse" readonly>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">收房月数</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="months">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款方式</label>
                                        <div class="col-sm-10 padding_0">
                                            <div class="col-sm-8">
                                                <select class="form-control" v-model="one_type"
                                                        :disabled="pay_typeChange">
                                                    <option :value="value" v-for="(key,value) in dict.pay_type">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="control-label">
                                                    <input type="checkbox" :checked="pay_typeChange"
                                                           @click="changePayType($event)">付款方式不固定</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group" v-show="pay_typeChange">
                                        <div class="col-sm-6" v-for="(item,index) in more_type">
                                            <label class="col-sm-5 control-label">第{{index + 1}}年</label>
                                            <div class="col-sm-7">
                                                <select class="form-control" v-model="more_type[index]">
                                                    <option :value="value" v-for="(key,value) in dict.pay_type">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <FlexBox :flexData="months" :datas="price" :change="false"
                                             :title="'收房月单价'" @sendData="getFlexData"></FlexBox>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">押金</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="deposit">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">待签约日期</label>
                                        <div class="col-sm-10">
                                            <input @click="remindData" type="text" v-model="pendingContract"
                                                   placeholder="待签约日期"
                                                   class="form-control form_datetime" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">空置期</label>
                                        <div class="col-sm-10">
                                            <input type="text" disabled class="form-control" v-model="vacancyPeriod">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">第一次房租日期</label>
                                        <div class="col-sm-10">
                                            <input @click="remindData" type="text" v-model="firstRemittance"
                                                   placeholder="第一次房租日期"
                                                   class="form-control form_datetime" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">备注</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" cols="5" v-model="remarks"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <h4>客户信息</h4>
                                <div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">客户汇款方式</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="payment"
                                                    @change="changeCustomerPayment">
                                                <option :value="value" v-for="(key,value) in dict.payment">{{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="payment == 1 || payment == 4">
                                        <label class="col-sm-2 control-label">客户收款人姓名</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="account_owner">
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="payment == 1 || payment == 4">
                                        <label class="col-sm-2 control-label">开户行</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="bank">
                                                <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="payment == 1 || payment == 4">
                                        <label class="col-sm-2 control-label">支行</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="account_subbank">
                                        </div>
                                    </div>

                                    <!--todo
                                        以后改
                                    -->
                                    <div class="form-group" v-show="payment == 2">
                                        <label class="col-sm-2 control-label">支付宝姓名</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="account_owner">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label v-if="payment == 1" class="col-sm-2 control-label">账号</label>
                                        <label v-if="payment == 2" class="col-sm-2 control-label">支付宝账号</label>
                                        <label v-if="payment == 3" class="col-sm-2 control-label">微信账号</label>
                                        <label v-if="payment == 4" class="col-sm-2 control-label">存折账号</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="account">
                                        </div>
                                    </div>
                                </div>

                                <h4>科目</h4>
                                <div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-xs-12 control-label">房租科目</label>
                                        <div class="col-sm-9 col-xs-10">
                                            <SelectSubject @choose="houseSubject"
                                                           :current="subject_id.rental"></SelectSubject>
                                        </div>
                                        <div class="col-sm-1 col-xs-2">
                                            <span class="fa fa-times-circle"></span>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 col-xs-12 control-label">押金科目</label>
                                        <div class="col-sm-9 col-xs-10">
                                            <SelectSubject @choose="depositSubject"
                                                           :current="subject_id.deposit"></SelectSubject>
                                        </div>
                                        <div class="col-sm-1 col-xs-2">
                                            <span class="fa fa-times-circle"></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div>
                                <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                                <button type="button" class="btn btn-primary" @click="save(1)">保存为草稿</button>
                                <button type="button" class="btn btn-warning" @click="save(2)">不生成后续款项</button>
                                <button type="button" class="btn btn-warning" @click="save(3)">生成后续款项</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--签约人-->
        <STAFF :configure="configure" @Staff="selectDateSendAdd"></STAFF>

        <!--房屋选择-->
        <SelectHouse @House="getHouse" :msg="staffId"></SelectHouse>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--选择客户-->
        <SelectClient @clientAdd="getClient" :collectRent="coll" :staffId="staffId"></SelectClient>
    </div>
</template>

<script>
    import SelectSubject from '../../common/selectSubject.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import SelectHouse from '../../common/selectHouse.vue'
    import FlexBox from '../../common/flexBox.vue'
    import Status from '../../common/status.vue';
    import SelectClient from '../../common/selectClient.vue'        // 选择客户

    export default{
        components: {STAFF, SelectHouse, FlexBox, Status, SelectClient, SelectSubject},
        data(){
            return {
                staff: '',                          //签约人
                staffId: '',                        //签约人ID
                branch_id: '',                      //所属部门ID
                branch: '',                         //所属部门
                person_id: '',                      //负责人ID
                person: '',                         //负责人

                cus_id: '',                         //客户ID
                cus_name: '',                       //客户
                cus_phone: '',                      //客户联系方式

                house_id: '',                       //房屋ID
                house_name: '',                     //房屋地址

                months: '',                         //年限
                price: [],                          //价格
                one_type: '1',                      //付款方式
                deposit: '',                        //押金
                pay_typeChange: false,              //付款方式不固定
                pay_type: [],                       //付款方式不固定显示选择
                more_type: [],                      //付款年份个数
                dict: {},                           //字典
                coll: 1,                            //租客/业主/代理

                pendingContract: '',                //待签约日期
                vacancyPeriod: '',                  //空置期
                firstRemittance: '',                //第一次房租日期
                remarks: '',                        //备注

                //客户
                payment: 1,                         //客户付款方式
                account_owner: '',                  //收款人姓名
                account_subbank: '',                //支行
                alipay_owner: '',                   //支付宝姓名
                bank: 1,                            //开户行
                account: '',                        // 账户
                subject_id: {rental: '', deposit: ''},  //科目款项


                configure: [],                      //人资
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
                oneAsk: '',             //时间请求
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                this.remindData();
                this.dict = res.data
            });
            this.pay_type.push(this.one_type);
        },
        watch: {
            one_type(curVal, oldVal){
                if (curVal !== oldVal) {
                    if (!this.pay_typeChange) {
                        this.pay_type = [];
                        this.pay_type.push(curVal);
                    }
                }
            },
            pay_typeChange(curVal, oldVal){
                this.pay_type = [];
                if (curVal) {
                    this.pay_type = this.more_type;
                } else {
                    this.pay_type.push(this.one_type);
                }
            },
        },
//        updated (){
//            this.remindData();
//        },
        methods: {
//            房款科目
            houseSubject(val){
                this.subject_id.rental = val;
            },
//            押金科目
            depositSubject(val){
                this.subject_id.deposit = val;
            },
//            付款方式不固定
            changePayType(ev){
                this.pay_type = [];
                this.more_type = [];
                if (ev.target.checked) {
                    if (this.months !== '') {
                        this.pay_typeChange = true;
                        if (this.months % 12 === 0) {
                            let month = parseInt(this.months / 12);
                            for (let i = 0; i < month; i++) {
                                this.more_type.push('1');
                            }
                        } else {
                            let month = parseInt(this.months / 12 + 1);
                            for (let i = 0; i < month; i++) {
                                this.more_type.push('1');
                            }
                        }
                    }
                } else {
                    this.pay_typeChange = false;
                }
            },
//            收房月单价
            getFlexData(data){
                this.price = data;
            },
//            清空
            closeModal(){
                $('#newClientAdd').modal('hide');
                this.price.splice(0, this.price.length);    //月单价
                this.staff = '';                            //签约人
                this.staffId = '';                          //签约人ID
                this.branch_id = '';                        //所属部门ID
                this.branch = '';                           //所属部门
                this.person_id = '';                        //负责人ID
                this.person = '';                           //负责人
                this.cus_id = '';                           //客户ID
                this.cus_name = '';                         //客户
                this.house_id = '';                         //房屋ID
                this.house_name = '';                       //房屋地址
                this.months = '';                            //年限
                this.one_type = '1';                        //付款方式
                this.deposit = '';                          //押金
                this.pay_typeChange = false;                //付款方式不固定
                this.pay_type = [];                         //不固定显示选择
                this.more_type = [];                        //付款年份个数
                this.pendingContract = '';                  //待签约日期
                this.vacancyPeriod = '';                    //空置期
                this.firstRemittance = '';                  //第一次打款日期
                this.remarks = '';                          //备注

//                收款方式
                this.payment = 1;                           //客户付款方式
                this.account_owner = '';
                this.account_subbank = '';
                this.alipay_owner = '';
                this.bank = 1;
                this.account = '';
            },
//            日期
            remindData (){
                this.oneAsk = true;
                $('.form_datetime').datetimepicker({
                    minView: 'month',                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: 'top-right',
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '待签约日期' && this.oneAsk === true) {
                        this.pendingContract = ev.target.value;
                        if (this.firstRemittance < this.pendingContract && this.firstRemittance !== '') {
                            this.firstRemittance = '';
                            //失败信息 ***
                            this.info.error = '第一次房租日期不能小于待签约日期';
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        } else {
                            this.$http.post('finance/date_diff', {
                                start: ev.target.value,
                                end: this.firstRemittance
                            }).then((res) => {
                                if (res.data.code === '90000') {
                                    this.vacancyPeriod = res.data.data;
                                }
                            });
                            this.oneAsk = false;
                        }
                    }
                    if (ev.target.placeholder === '第一次房租日期' && this.oneAsk === true) {
                        this.firstRemittance = ev.target.value;
                        if (this.firstRemittance < this.pendingContract) {
                            this.firstRemittance = '';
                            //失败信息 ***
                            this.info.error = '第一次房租日期不能小于待签约日期';
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        } else {
                            this.$http.post('finance/date_diff', {
                                start: this.pendingContract,
                                end: ev.target.value
                            }).then((res) => {
                                if (res.data.code === '90000') {
                                    this.vacancyPeriod = res.data.data;
                                }
                            });
                            this.oneAsk = false;
                        }
                    }
                }.bind(this));
            },
//              修改客户收款方式
            changeCustomerPayment(){
                this.account_owner = '';
                this.account_subbank = '';
                this.alipay_owner = '';
                this.bank = 1;
                this.account = '';
            },
//               选择签约人
            selectStaff(){
                this.configure = {length: 1, class: 'amount'};
                $('.selectCustom:eq(0)').modal('show');
            },
//               签约人信息
            selectDateSendAdd(data){
                this.staff = data.staff[0].name;
                this.staffId = data.staff[0].id;
                this.$http.get('finance/staff_info/' + data.staff[0].id).then((res) => {
                    if (res.data.code === '90000') {
                        this.branch_id = res.data.data.department_id;           //所属部门ID
                        this.branch = res.data.data.departmnet_name;            //所属部门
                        this.person = res.data.data.leader_name;                //负责人
                        this.person_id = res.data.data.department_id;           //负责人ID
                    }
                });
            },
//              选择房屋
            selectHouse(){
                $('.selectHouse:eq(0)').modal('show');
            },
//              房屋信息
            getHouse(data){
                this.house_id = data.id;
                this.house_name = data.address;
            },
//              选择客户
            selectClient(){
                $('.selectClient:eq(0)').modal('show');
            },
//              选择客户
            getClient(data){
                this.cus_id = data.id;
                this.cus_name = data.name;
            },
//              新增
            save(num){
//                保存为草稿
                if (num === 1) {
                    this.$http.post('finance/customer/collect', {
                        staff_id: this.staffId,                     //签约人
                        department_id: this.branch_id,              //所属部门
                        leader_id: this.person_id,                  //负责人
                        customer_name: this.cus_id,                 //客户
                        contact: this.cus_phone,                    //客户联系方式
                        address: this.house_id,                     //房屋
                        months: this.months,                        //收房月数
                        prices: this.price,                         //收房月单价
                        pay_types: this.pay_type,
                        deposit: this.deposit,                      //押金
                        deal_date: this.pendingContract,            //待签约日期
                        first_pay_date: this.firstRemittance,       //第一次打房租日期
                        remark: this.remarks,                       //备注
                        account_type: this.payment,                 //客户付款方式
                        account_owner: this.account_owner,          //收款人姓名
                        account_subbank: this.account_subbank,      //支行
                        account_bank: this.bank,                    //开户行
                        account_num: this.account,                  //账户
                        subject_id: this.subject_id,
                    }).then((res) => {

                    });
                    console.log('保存草稿')
                }
                if (num === 2) {
                    console.log('不生成后续款项')
                }
                if (num === 3) {
                    console.log('生成后续款项')
                }
            }
        }
    }
</script>

<style scoped>
    textarea {
        max-width: 100%;
    }

    input[type=checkbox] {
        width: 17px;
        height: 17px;
        margin-right: 8px;
        vertical-align: bottom;
    }

    #add {
        z-index: 1044;
    }

    .modal-body .form-horizontal h4 {
        border-left: 5px solid #FCB322;
        padding-left: 20px;
        line-height: 30px;
        cursor: pointer;
    }

</style>