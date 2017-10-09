<template>
    <div>
        <div class="modal fade full-width-modal-right otherEdit" id="otherEdit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" @click="closeModal">
                                <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">编辑其余款项报备</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="disabledMsg.staff">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="disabledMsg.department">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">负责人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="disabledMsg.leader">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="disabledMsg.customer">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="disabledMsg.house">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="formData.money_name">
                                    </div>
                                    <label class="col-sm-2 control-label">款项金额</label>
                                    <div class="col-sm-4">
                                        <input type="number" min="0" class="form-control" v-model="formData.money_amount">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">类型</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.money_type" @change="changeMoneyType">
                                            <option value="1">收款</option>
                                            <option value="2">付款</option>
                                        </select>
                                    </div>
                                </div>



                                <div v-show="formData.money_type==2">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">汇款方式</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" @change="changeCustomerPayment" v-model="formData.account_type">
                                                <option :value="value" v-for="(key,value) in dict.payment">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.account_type==1||formData.account_type==4">
                                        <label class="col-sm-2 control-label">收款人姓名<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_owner">
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.account_type==1||formData.account_type==4">
                                        <label class="col-sm-2 control-label">开户行<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="formData.account_bank">
                                                <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="formData.account_type==1||formData.account_type==4">
                                        <label class="col-sm-2 control-label">支行<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_subbank">
                                        </div>
                                    </div>

                                    <div class="form-group" v-show="formData.account_type==2">
                                        <label class="col-sm-2 control-label">支付宝姓名<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_owner">
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <label v-if="formData.account_type==2" class="col-sm-2 control-label">支付宝账号<sup class="required">*</sup></label>
                                        <label v-else-if="formData.account_type==3" class="col-sm-2 control-label">微信账号<sup class="required">*</sup></label>
                                        <label v-else-if="formData.account_type==4" class="col-sm-2 control-label">存折账号<sup class="required">*</sup></label>
                                        <label v-else="" class="col-sm-2 control-label">账号<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.account_num">
                                        </div>
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
                            <div>
                                <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                                <button type="button" class="btn btn-primary" @click="modify">修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>

</style>
<script>
    import Status from '../../common/status.vue';

    export default{
        props:['id'],
        components: {Status},
        data(){
            return {
                dict : {},

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

                disabledMsg : {
                    staff : '',
                    department : '',
                    leader : '',
                    customer : '',
                    house : ''
                },

                formData : {
                    money_name : '',
                    money_amount : '',
                    money_type : 1,

                    staff_id : '',
                    department_id : '',
                    leader_id : '',
                    customer_id : '',
                    house_id : '',

                    account_type : 1,
                    account_owner : '',     // 收款人姓名
                    account_subbank : '',   // 支行
                    account_bank : 1,
                    account_num : '',           // 账户
                    remark : ''
                },


            }
        },
        watch:{
            id(val){
//                console.log(val);
//                console.log($('#edit').css('display'))
                if (val!=0){
                    this.getOtherDetails();
                }

            }
        },
        mounted(){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                    }
                )
        },
        methods: {
            getOtherDetails(){
                this.$http.get('checkin/extra/'+this.id)
                    .then(
                        (res) => {
                            console.log(res.data.data);
                            let val = res.data.data;

                            if (val.staff!=null){
                                this.disabledMsg.staff = val.staff.real_name;
                            }
                            if (val.department!=null){
                                this.disabledMsg.department = val.department.name;
                            }
                            if (val.leader!=null){
                                this.disabledMsg.leader = val.leader.real_name;
                            }
                            if (val.customer!=null){
                                this.disabledMsg.customer = val.customer.name;
                            }
                            if (val.house!=null){
                                this.disabledMsg.house = val.house.detailed_address;
                            }

                            this.formData.staff_id = val.staff_id;
                            this.formData.department_id = val.department_id;
                            this.formData.leader_id = val.leader_id;
                            this.formData.customer_id = val.customer_id;
                            this.formData.house_id = val.house_id;

                            this.formData.money_name = val.money_name;
                            this.formData.money_amount = val.money_amount;
                            this.formData.money_type = val.money_type;

                            this.formData.account_type = val.account_type;
                            this.formData.account_owner = val.account_owner;
                            this.formData.account_subbank = val.account_subbank;
                            this.formData.account_bank = val.account_bank;
                            this.formData.account_num = val.account_num;
                            this.formData.remark = val.remark;


                        }
                    );
            },

            closeModal(){
                this.msg = '';
                this.formData.money_name = '';
                this.formData.money_amount = '';
                this.formData.money_type = 1;
                this.formData.staff_id = '';
                this.formData.department_id = '';
                this.formData.leader_id = '';
                this.formData.customer_id = '';
                this.formData.house_id = '';
                this.formData.account_type = 1;
                this.formData.account_owner = '';
                this.formData.account_subbank = '';
                this.formData.account_bank = 1;
                this.formData.account_num = '';
                this.formData.remark = '';

                $('#otherEdit').modal('hide');
                this.getOtherDetails();
            },

            // 修改客户收款方式
            changeCustomerPayment(){
                this.formData.account_owner = '';
                this.formData.account_subbank = '';
                this.formData.account_bank = 1;
                this.formData.account_num = '';
            },

            modify(){
                console.log(this.formData);
                /*if (num==1){
                 // 保存为草稿

                 } else {
                 // 保存并提交
                 }*/
                this.$http.put('checkin/extra/'+this.id,this.formData)
                    .then((res)=>{
                    console.log(res)
                        if (res.data.code==18010){
                            // 成功
                            this.info.success = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.closeModal();
                            this.$emit('success');
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
                    })
            },

            changeMoneyType(){
                if (this.formData.money_type==1){
                    // 收
                    this.formData.account_type = 1;
                    this.changeCustomerPayment();
                }
            }

            /*setOldAccount(){
             this.formData.payment = this.msg.payment;
             this.formData.account_owner = this.msg.account_owner;
             this.formData.account_subbank = this.msg.account_subbank;
             this.formData.bank = this.msg.bank;
             this.formData.account = this.msg.account;
             },
             setNewAccount(){
             this.formData.payment = 1;
             this.formData.account_owner = '';
             this.formData.account_subbank = '';
             this.formData.bank = 1;
             this.formData.account = '';
             }*/
        }
    }
</script>