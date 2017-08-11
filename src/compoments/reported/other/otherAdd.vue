<template>
    <div>
        <div class="modal fade full-width-modal-right otherAdd" id="otherAdd" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" @click="closeModal">
                                <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">新增其余款项报备</h4>
                        </div>
                        <div class="modal-body clearFix"  v-if="msg!=''">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.staff==undefined?'':msg.staff.real_name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.department==undefined?'':msg.department.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">负责人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.leader==undefined?'':msg.leader.real_name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.customer==undefined?'':msg.customer.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.house==undefined?'':msg.house.detailed_address">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="formData.money_name">
                                    </div>
                                    <label class="col-sm-2 control-label">款项金额</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="formData.money_amount">
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
                                <button type="button" class="btn btn-primary" @click="save(1)">保存为草稿</button>
                                <button type="button" class="btn btn-warning" @click="save(2)">保存并提交</button>
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
        props:['from','addOther_id'],
        components: {Status},
        data(){
            return {
                dict : {},
                msg : '',

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
                }
            }
        },
        watch:{
            addOther_id(val){
                this.getDetails();
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

                $('#otherAdd').modal('hide');
                this.getDetails();
            },
            getDetails(){
                this.msg = {};
                let url;
                if (this.from==1){
                    // 收
                    url = 'checkin/collect/'+this.addOther_id;
                } else if (this.from==2){
                    // 租
                    url = 'checkin/rent/'+this.addOther_id;
                } else {
                    // 其他
                }
                this.$http.get(url)
                    .then(
                        (res) => {
                            this.msg = res.data.data;
                            this.formData.staff_id = this.msg.staff_id;
                            this.formData.department_id = this.msg.department_id;
                            this.formData.leader_id = this.msg.leader_id;
                            this.formData.customer_id = this.msg.customer_id;
                            this.formData.house_id = this.msg.house_id;
//                            this.setOldAccount();
                            console.log(this.msg);
                        }
                    );
            },

            // 修改客户收款方式
            changeCustomerPayment(){
                this.formData.account_owner = '';
                this.formData.account_subbank = '';
                this.formData.account_bank = 1;
                this.formData.account_num = '';
            },

            changeReserve(){
                if (this.formData.reserve==1){
                    // 原
                    this.setOldAccount();
                } else {
                    // 新
                    this.setNewAccount();
                }
            },

            save(num){
                console.log(this.addOther_id);
                console.log(this.formData);
                let url = 'checkin/extra?status='+num;
                /*if (num==1){
                    // 保存为草稿

                } else {
                    // 保存并提交
                }*/
                this.$http.post(url,this.formData)
                    .then((res)=>{
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