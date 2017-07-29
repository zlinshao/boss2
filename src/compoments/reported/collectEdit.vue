<template>
    <div>
        <div class="modal fade full-width-modal-right" id="edit" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">编辑收房报备</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">

                            <div class="form-group">
                                <label class="col-sm-2 control-label">签约人</label>
                                <div class="col-sm-10">
                                    <input title="请点击选择" type="text" class="form-control" readonly @click="selectStaff" v-model="chooseResult.staff_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">所属部门</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" disabled v-model="chooseResult.department_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">负责人</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" disabled v-model="chooseResult.leader_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">房屋地址</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" @click="selectHouse" readonly v-model="chooseResult.house_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" @click="selectClient" readonly v-model="chooseResult.customer_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收房年限</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.years">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款方式</label>
                                <div class="col-sm-7">
                                    <select class="form-control" v-model="one_type">
                                        <option :value="value" v-for="(key,value) in dict.pay_type">{{key}}</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label"><input type="checkbox" @click="changePayType($event)">变化</label>
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

                            <FlexBox :flexData="formData.years" :datas="formData.price" @sendData="getFlexData"></FlexBox>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">空置期</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.vacancy">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">押金</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.cost_deposit">
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">是否中介</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.is_medi" @change="medi">
                                        <option value="1">是</option>
                                        <option value="2">否</option>
                                    </select>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">中介费</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.cost_medi">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">签约日期</label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="待签约日期"
                                           class="form-control form_datetime" v-model="formData.deal_time">
                                    <!--<DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>-->
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款方式</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.payment">
                                        <option :value="value" v-for="(key,value) in dict.payment">{{key}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group" v-show="formData.payment==1">
                                <label class="col-sm-2 control-label">开户行</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.bank">
                                        <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款账户</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="formData.account">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" cols="5" v-model="formData.remark"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <SelectHouse @House="getHouse"></SelectHouse>
        <!--提示信息-->
        <Status :state='info'></Status>

        <SelectClient @clientAdd="getClient"></SelectClient>
    </div>
</template>
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
    #edit{
        z-index: 1042;
    }
</style>
<script>
    import STAFF from  '../common/organization/selectStaff.vue'
    import SelectHouse from '../common/selectHouse.vue'
    import FlexBox from '../common/flexBox.vue'
    import DatePicker from '../common/datePicker.vue'
    import Status from '../common/status.vue';
    // 选择客户
    import SelectClient from '../common/selectClient.vue'
    export default{
        props : ['id'],
        components: {STAFF,SelectHouse,FlexBox,DatePicker,Status,SelectClient},
        data(){
            return {
                dict : {},

                configure: [],

//                datas: [],

                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                        position : 'top-left',
                    }
                ],
                currentDate : [],

                pay_typeChange : false,
                one_type : '1',
                more_type : [],

                chooseResult : {
                    staff_name : '',
                    house_name : '',
                    department_name : '',
                    leader_name : '',
                    customer_name : ''
                },
                formData : {
                    staff_id : '',
                    department_id : '',
                    leader_id : '',
                    house_id : '',
                    customer_id : '',
                    years : '',
                    pay_type : [],
                    price : [],
                    vacancy : '',
                    cost_medi : '',
//                    is_medi : 1,
                    cost_deposit : '',
                    deal_time : '',
                    payment : 1,
                    bank : 1,
                    remark : '',
                    account : ''
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
//                        console.log(val);
                        this.chooseResult.leader_name = val.leader_name;
                        this.chooseResult.department_name = val.department_name;
                        this.formData.leader_id = val.leader_id;
                        this.formData.department_id = val.department_id;
                    }
                );

            this.formData.pay_type.push(this.one_type);
        },
        updated (){
            this.remindData();
        },
        watch : {
            one_type(curVal,oldVal){
                if (curVal!=oldVal){
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

            id(val){
//                console.log(val);
//                console.log($('#edit').css('display'))
                if (val!=0){
                    this.currentDate = [];
                    this.$http.get('checkin/collect/'+val)
                        .then(
                            (res) => {
                                console.log(res.data.data);
                                let val = res.data.data;
//                                console.log(val.staff);
                                if (val.staff!=null){
                                    this.chooseResult.staff_name=val.staff.real_name;
                                }
                                if (val.department!=null){
                                    this.chooseResult.department_name=val.department.name;
                                }
                                if (val.leader!=null){
                                    this.chooseResult.leader_name=val.leader.real_name;
                                }
                                if (val.customer!=null){
                                    this.chooseResult.customer_name=val.customer.name;
                                }
                                if (val.house!=null){
                                    this.chooseResult.house_name=val.house.detailed_address;
                                }
                                this.pay_typeChange = val.pay_type.length>1;
                                this.more_type = val.pay_type;

                                this.formData.staff_id = val.staff_id;
                                this.formData.department_id = val.department_id;
                                this.formData.leader_id = val.leader_id;
                                this.formData.house_id = val.house_id;
                                this.formData.customer_id = val.customer_id;
                                this.formData.years = val.years;
                                this.formData.pay_type = val.pay_type;
                                this.formData.price = val.price;
                                this.formData.vacancy = val.vacancy;
                                this.formData.cost_medi = val.cost_medi;
//                                this.formData.is_medi = val.is_medi;
                                this.formData.cost_deposit = val.cost_deposit;
                                this.formData.deal_time = val.deal_time;
                                this.currentDate.push(val.deal_time);
                                this.formData.payment = val.payment;
                                this.formData.bank = val.bank;
                                this.formData.remark = val.remark;
                                this.formData.account = val.account;

                            }
                        )
//                    console.log(this.dateConfigure)
                }

            }
        },
        methods: {
            closeModal(){
                // 清空
                this.pay_typeChange = false;
                this.one_type = '1';
                this.more_type = [];

                this.chooseResult.staff_name = '';
                this.chooseResult.house_name = '';
//                this.chooseResult.department_name = '';
//                this.chooseResult.leader_name = '';
                this.chooseResult.customer_name = '';

                this.formData.staff_id = '';
//                this.formData.department_id = '';
//                this.formData.leader_id = '';
                this.formData.house_id = '';
                this.formData.customer_id = '';
                this.formData.years = '';
                this.formData.pay_type = [];
                this.formData.price = [];
                this.formData.vacancy = '';
                this.formData.cost_medi = '';
//                this.formData.is_medi = 1;
                this.formData.cost_deposit = '';
                this.formData.deal_time = '';
                this.formData.payment = 1;
                this.formData.bank = 1;
                this.formData.remark = '';
                this.formData.account = '';


                $('#edit').modal('hide');
            },

            selectStaff(){
                // 选择签约人
                this.configure = {length: 1, class: 'amount'};
                $('.selectCustom:eq(1)').modal('show');
//                alert(1)
            },
            selectDateSend(data){
                // 选择人
//                console.log(data.staff[0].id)
//                alert(2)
//                console.log(data);
                if (data.staff.length!=0){
                    this.formData.staff_id = data.staff[0].id;
                    this.chooseResult.staff_name = data.staff[0].name;
                }
            },

            selectHouse(){
                $('.selectHouse:eq(1)').modal('show');
            },
            getHouse(data){
                // 选择房屋
//                console.log(data);
                this.formData.house_id = data.id;
                this.chooseResult.house_name = data.address;
            },

            selectClient(){
                $('.selectClient:eq(1)').modal('show');
            },
            getClient(data){
                // 选择客户
//                console.log(data);
                this.formData.customer_id = data.id;
                this.chooseResult.customer_name = data.name;

            },
            getFlexData(data){
                console.log(data)
                this.formData.price = data;
            },
            getDate(data){
                // 获取时间
//                console.log(data);
                this.formData.deal_time = data;
            },


            changePayType(ev){
                this.formData.pay_type = [];
                if (ev.currentTarget.checked){
//                    console.log(this.formData.years);
                    this.pay_typeChange = true;
                    this.more_type = [];
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
            modify(){
                // 新增
//                console.log(this.formData);
                this.$http.put('checkin/collect/'+this.id,this.formData)
                    .then(
                        (res) => {
                            if (res.data.code == 18210){
                                // 成功
                                this.info.success = '修改报备成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
//                                this.closeModal()
                                $('#edit').modal('hide');
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
                    );
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
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    this.formData.deal_time = ev.target.value;
//                    console.log(this.startDataTime);
                }.bind(this));
            },
        }
    }
</script>