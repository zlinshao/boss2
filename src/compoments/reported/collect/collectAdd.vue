<template>
    <div>
        <div class="modal fade full-width-modal-right" id="add" tabindex="-1" role="dialog" data-backdrop="static"
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

                                <!--基本信息-->
                                <h4 @click="showBase=!showBase">基本信息</h4>
                                <div v-show="showBase">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">签约人<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input title="请点击选择" type="text" class="form-control" readonly @click="selectStaff" v-model="chooseResult.staff_name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled v-model="chooseResult.department_name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">负责人<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled v-model="chooseResult.leader_name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">客户姓名<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" v-if="dis_status === 2" class="form-control" @click="selectClient" readonly v-model="chooseResult.customer_name">
                                            <input type="text" v-if="dis_status === 1" class="form-control" @click="selectClient" disabled v-model="chooseResult.customer_name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋地址<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" v-if="dis_status === 2" class="form-control" @click="selectHouse" readonly v-model="chooseResult.house_name">
                                            <input type="text" v-if="dis_status === 1" class="form-control" @click="selectHouse" disabled v-model="chooseResult.house_name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">收房月数<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.years">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">空置期<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.vacancy">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款方式<sup class="required">*</sup></label>
                                        <div class="col-sm-10 padding_0">
                                            <div class="col-sm-8">
                                                <select class="form-control" v-model="one_type" :disabled="pay_typeChange">
                                                    <option :value="value" v-for="(key,value) in dict.pay_type">{{key}}</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="control-label">
                                                    <input type="checkbox" :checked="pay_typeChange" @click="changePayType($event)">
                                                    付款方式不固定
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group" v-show="pay_typeChange">
                                        <div class="col-sm-6" v-for="(item,index) in more_type">
                                            <label class="col-sm-5 control-label">第{{index+1}}年</label>
                                            <div class="col-sm-7">
                                                <select class="form-control" v-model="more_type[index]">
                                                    <option :value="value" v-for="(key,value) in dict.pay_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <FlexBox :flexData="Math.ceil(formData.years/12)" :datas="formData.price" :change="false" :title="'收房月单价'" @sendData="getFlexData"></FlexBox>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">押金<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.cost_deposit">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">待签约日期<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input @click="remindData" type="text" name="addtime" value="" placeholder="待签约日期"
                                                   class="form-control form_datetime" readonly v-model="formData.deal_time">
                                            <!--<DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>-->
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">备注</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" cols="5" v-model="formData.remark"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <!--客户部分-->
                                <h4 @click="showCustomer=!showCustomer">客户信息</h4>
                                <div v-show="showCustomer">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">客户汇款方式<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="formData.payment" @change="changeCustomerPayment">
                                                <option :value="value" v-for="(key,value) in dict.payment">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.payment==1||formData.payment==4">
                                        <label class="col-sm-2 control-label">客户收款人姓名<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_owner">
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.payment==1||formData.payment==4">
                                        <label class="col-sm-2 control-label">开户行<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="formData.bank">
                                                <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.payment==1||formData.payment==4">
                                        <label class="col-sm-2 control-label">支行<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_subbank">
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.payment==2">
                                        <label class="col-sm-2 control-label">支付宝姓名<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_owner">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label v-show="formData.payment==1" class="col-sm-2 control-label">账号<sup class="required">*</sup></label>
                                        <label v-show="formData.payment==2" class="col-sm-2 control-label">支付宝账号<sup class="required">*</sup></label>
                                        <label v-show="formData.payment==3" class="col-sm-2 control-label">微信账号<sup class="required">*</sup></label>
                                        <label v-show="formData.payment==4" class="col-sm-2 control-label">存折账号<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account">
                                        </div>
                                    </div>
                                </div>


                                <!--中介部分-->
                                <div>
                                    <h4 @click="showCost=!showCost">中介信息</h4>
                                    <div v-show="showCost">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">中介费<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="formData.cost_medi" >
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">中介汇款方式<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="formData.medi_account_type" @change="changeMediPayment">
                                                    <option :value="value" v-for="(key,value) in dict.payment">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group" v-show="formData.medi_account_type==1||formData.medi_account_type==4">
                                            <label class="col-sm-2 control-label">中介收款人姓名<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="formData.medi_account_owner">
                                            </div>
                                        </div>
                                        <div class="form-group" v-show="formData.medi_account_type==1||formData.medi_account_type==4">
                                            <label class="col-sm-2 control-label">开户行<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="formData.medi_account_bank">
                                                    <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group" v-show="formData.medi_account_type==1||formData.medi_account_type==4">
                                            <label class="col-sm-2 control-label">支行<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="formData.medi_account_subbank">
                                            </div>
                                        </div>
                                        <div class="form-group"v-show="formData.medi_account_type==2">
                                            <label class="col-sm-2 control-label">支付宝姓名<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="formData.medi_account_owner">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label v-show="formData.medi_account_type==1" class="col-sm-2 control-label">账号<sup class="required">*</sup></label>
                                            <label v-show="formData.medi_account_type==2" class="col-sm-2 control-label">支付宝账号<sup class="required">*</sup></label>
                                            <label v-show="formData.medi_account_type==3" class="col-sm-2 control-label">微信账号<sup class="required">*</sup></label>
                                            <label v-show="formData.medi_account_type==4" class="col-sm-2 control-label">存折账号<sup class="required">*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="formData.medi_account_num " >
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div class="modal-footer">
                            <div>
                                <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                                <button type="button" class="btn btn-primary" @click="save(1)">保存为草稿</button>
                                <button type="button" class="btn btn-warning" @click="save(2)">保存并提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSendAdd"></STAFF>

        <SelectHouse @House="getHouse" :msg="collectRents"></SelectHouse>
        <!--提示信息-->
        <Status :state='info'></Status>

        <SelectClient @clientAdd="getClient" :collectRent="coll" :staffId="staffId"></SelectClient>
    </div>
</template>

<script>
    import STAFF from  '../../common/organization/selectStaff.vue'
    import SelectHouse from '../../common/selectHouse.vue'
    import FlexBox from '../../common/flexBox.vue'
    import DatePicker from '../../common/datePicker.vue'
    import Status from '../../common/status.vue';
    // 选择客户
    import SelectClient from '../../common/selectClient.vue'

    export default{
        props : ['rentMsg','collectContactId','msg','type'],
        components: {STAFF,SelectHouse,FlexBox,DatePicker,Status,SelectClient},
        data(){
            return {
                dis_status: '',
                collectRents: '',
                coll: 1,
                staffId: '',
                showBase : true,
                showCustomer : true,
                showCost : true,
                dict : {},
                configure: [],
                datas: [],
                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                        position : 'top-left',
                    }
                ],
                currentDate : [],

                pay_typeChange : false,
                money_change : false,
                one_type : '1',
                more_type : [],

                chooseResult : {
                    staff_name : '',
                    house_name : '',
                    department_name : '',
                    leader_name : '',
                    customer_name : ''
                },

                is_medi : 1,        // 是否中介 1否2是
                formData : {
                    type : '',

                    previous_contract_id : '',   // 收房合同id
                    rent_id : '',       // 租房报备id

                    staff_id : '',
                    department_id : '',
                    leader_id : '',
                    house_id : '',
                    customer_id : '',
                    years : '',
                    pay_type : [],
                    price : [],
                    cost_deposit : '',
                    vacancy : '',
                    deal_time : '',
                    remark : '',

//                    客户
                    payment : 1,
                    account_owner : '',     // 收款人姓名
                    account_subbank : '',   // 支行
                    alipay_owner : '',      // 支付宝姓名
                    bank : 1,
                    account : '',           // 账户

//                    中介
                    cost_medi : 0,     // 中介费
//                    is_medi : 1,
                    medi_account_type : 1,
                    medi_account_owner : '',     // 收款人姓名
                    medi_account_bank : 1,   // 开户行
                    medi_account_subbank : '',   // 支行
                    medi_alipay_owner : '',      // 支付宝姓名
                    medi_account_num  :'',
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
                },

            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => this.dict = res.data
                );
            this.$http.get('staff/details')
                .then(
                    (res) => {
                        let val = res.data;
                        console.log(val);
                        this.chooseResult.leader_name = val.leader_name;
                        this.chooseResult.department_name = val.department_name;
                        this.formData.leader_id = val.leader_id;
                        this.formData.department_id = val.department_id;
                    }
                );

            this.formData.pay_type.push(this.one_type);
        },
        watch : {
            msg (val){
                console.log(val);
               this.dis_status = val;
            },
            one_type(curVal,oldVal){
                if (curVal != oldVal){
                    if (!this.pay_typeChange){
                        this.formData.pay_type = [];
                        this.formData.pay_type.push(curVal);
                    }
                }
            },

            pay_typeChange(curVal,oldVal){
//                console.log(curVal)
//                console.log(oldVal)
                this.formData.pay_type = [];
                if (curVal){
                    // 变化
                    this.formData.pay_type = this.more_type;
                } else {
                    this.formData.pay_type.push(this.one_type);
                }
            },

            rentMsg(val){
//                console.log(val[0])
//                if (this.collectMsg!=undefined){
//                    console.log(val[0]);
//                    console.log(val[0].id);
//                    console.log(val[0].house_id);
//                    console.log(val[0].house.detailed_address);
                this.formData.rent_id = val[0].id;
                this.formData.house_id = val[0].house_id;
                this.chooseResult.house_name = val[0].house.detailed_address;
//                }
            },

            // 合同
            collectContactId(val){
//                console.log(val)
                this.formData.previous_contract_id = val;
                this.getContract();
            },
            type(val){
                this.formData.type = val;
            }
        },
        updated (){
//            时间选择
            this.remindData();
        },
        methods: {
            closeModal(){
                // 清空
                this.pay_typeChange = false;
                this.money_change = false;
                this.one_type = '1';
                this.more_type = [];

                this.chooseResult.staff_name = '';
                this.chooseResult.house_name = '';
//                this.chooseResult.department_name = '';
//                this.chooseResult.leader_name = '';
                this.chooseResult.customer_name = '';

                this.formData.type = '';
                this.formData.staff_id = '';
//                this.formData.department_id = '';
//                this.formData.leader_id = '';
                this.formData.house_id = '';
                this.formData.customer_id = '';

                this.formData.years = '';
                this.formData.pay_type = [];
                this.formData.price.splice(0,this.formData.price.length);
                this.formData.vacancy = '';
                this.formData.cost_deposit = '';
                this.formData.deal_time = '';
                this.formData.remark = '';

                this.formData.payment = 1;
                this.formData.bank = 1;
                this.formData.account = '';
                this.formData.account_owner = '';
                this.formData.account_subbank = '';
//                this.formData.alipay_owner = '';

                this.formData.cost_medi = 0;
                this.formData.medi_account_type = 1;
                this.formData.medi_account_num = '';
                this.formData.medi_account_owner = '';
                this.formData.medi_account_bank = 1;
                this.formData.medi_account_subbank = 1;
//                this.formData.medi_alipay_owner = 1;
//                this.formData.is_medi = 1;

                this.showBase = true;
                this.showCustomer = true;
                this.showCost = true;

                $('#add').modal('hide');
                if (this.formData.previous_contract_id!=''){
                    this.getContract();
                }

            },

            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: "top-left",
//                    endDate: new Date(),
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
                  this.formData.deal_time = ev.target.value;
                }.bind(this));
            },

            selectStaff(){
                // 选择签约人
                this.configure = {length: 1, class: 'amount'};
                $('.selectCustom:eq(0)').modal('show');
            },
            selectDateSendAdd(data){
                // 选择人
                if (data.staff.length != 0){
                    this.formData.staff_id = data.staff[0].id;
                    this.staffId = data.staff[0].id;
                    this.collectRents = data.staff[0].id;
                    this.chooseResult.staff_name = data.staff[0].name;
                }

            },

            selectHouse(){
                $('.selectHouse:eq(0)').modal('show');
            },
            getHouse(data){
                // 选择房屋
//                console.log(data);
                this.formData.house_id = data.id;
                this.chooseResult.house_name = data.address;
            },

            getFlexData(data){
//                console.log(data)
                this.formData.price = data;
            },
            getDate(data){
                // 获取时间
//                console.log(data);
                this.formData.deal_time = data;
            },

            selectClient(){
                $('.selectClient:eq(0)').modal('show');
            },
            getClient(data){
                // 选择客户
                console.log(data);
                this.formData.customer_id = data.id;
                this.chooseResult.customer_name = data.name;
                this.is_medi = data.person_medium;
                if (this.is_medi==1){
                    this.formData.cost_medi = 0;
                }

            },

            changePayType(ev){
                this.formData.pay_type = [];
                this.more_type = [];
                if (ev.currentTarget.checked){
                    this.pay_typeChange = true;
                    if (this.formData.years!=''){
                        for (let i = 0;i<this.formData.years;i++){
                            this.more_type.push('1');
                        }
                    }
//                    console.log(this.more_type)
                } else {
                    this.pay_typeChange = false;
//                    this.formData.pay_type.push(one_type);
                }
//                console.log(this.formData.pay_type);
//                console.log(this.formData.pay_type.length);
            },
            save(num){
                // 新增
//                console.log(this.formData);
                this.formData['status'] = num;
                console.log(this.formData);
                this.$http.post('checkin/collect',this.formData)
                    .then(
                        (res) => {
                            if (res.data.code == 18210){
                                // 成功
                                this.info.success = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.closeModal();
                                this.$emit('save');
                            } else {
                                // 失败
                                this.info.error = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_error = false;
                                }, 2000);
                            }
                        }
                    )
            },

            getContract(){
                this.$http.get('core/collect/readcontract/id/'+this.formData.previous_contract_id)
                    .then((res) =>{
                            console.log(res.data.data);
                            let result = res.data.data;
                            this.formData.staff_id = result.staff_id;
                            this.formData.house_id = result.villa_id.id;
                            this.formData.customer_id = result.customer_id.id;
                            this.chooseResult.staff_name = result.staff;
                            this.chooseResult.customer_name = result.customer_id.name;
                            this.chooseResult.house_name = result.villa_id.detailed_address;

                        }
                    )
            },

            // 修改客户收款方式
            changeCustomerPayment(){
                this.formData.account_owner = '';
                this.formData.account_subbank = '';
                this.formData.alipay_owner = '';
                this.formData.bank = 1;
                this.formData.account = '';
            },
            // 修改中介收款方式
            changeMediPayment(){
                this.formData.medi_account_owner = '';
                this.formData.medi_account_subbank = '';
                this.formData.medi_alipay_owner = '';
                this.formData.medi_account_bank = 1;
                this.formData.medi_account_num = '';
            }

        }
    }
</script>

<style scoped>
    textarea{
        max-width: 100%;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
        margin-right: 8px;
        vertical-align: bottom;
    }
    #add{
        z-index: 1044;
    }
    .modal-body .form-horizontal h4{
        border-left: 5px solid #FCB322;
        padding-left: 20px;
        line-height: 30px;
        cursor: pointer;
    }

</style>