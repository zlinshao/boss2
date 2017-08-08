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
                                        <input type="text" class="form-control">
                                    </div>
                                    <label class="col-sm-2 control-label">款项金额</label>
                                    <div class="col-sm-4">
                                        <input type="number" min="0" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">类型</label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">收款</option>
                                            <option value="">付款</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">汇款账户</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.reserve" @change="changeReserve">
                                            <option value="1">原账户</option>
                                            <option value="2">新账户</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">汇款方式</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" @change="changeCustomerPayment" v-model="formData.payment" :disabled="formData.reserve==1">
                                            <option :value="value" v-for="(key,value) in dict.payment">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">收款人姓名<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" :disabled="formData.reserve==1">
                                    </div>
                                </div>
                                <div class="form-group" v-show="formData.payment==1||formData.payment==4">
                                    <label class="col-sm-2 control-label">开户行<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.bank" :disabled="formData.reserve==1">
                                            <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" v-show="formData.payment==1||formData.payment==4">
                                    <label class="col-sm-2 control-label">支行<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.account_subbank" :disabled="formData.reserve==1">
                                    </div>
                                </div>

                                <div class="form-group" v-show="formData.payment==2">
                                    <label class="col-sm-2 control-label">支付宝姓名<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.alipay_owner" :disabled="formData.reserve==1">
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label v-show="formData.payment==1" class="col-sm-2 control-label">账号<sup class="required">*</sup></label>
                                    <label v-show="formData.payment==2" class="col-sm-2 control-label">支付宝账号<sup class="required">*</sup></label>
                                    <label v-show="formData.payment==3" class="col-sm-2 control-label">微信账号<sup class="required">*</sup></label>
                                    <label v-show="formData.payment==4" class="col-sm-2 control-label">存折账号<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.account" :disabled="formData.reserve==1">
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
                                <button type="button" class="btn btn-primary">保存为草稿</button>
                                <button type="button" class="btn btn-warning">保存并提交</button>
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
                    reserve : 1,

                    payment : 1,
                    account_owner : '',     // 收款人姓名
                    account_subbank : '',   // 支行
                    alipay_owner : '',      // 支付宝姓名
                    bank : 1,
                    account : '',           // 账户
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
                            this.setOldAccount();
                            console.log(this.msg);
                        }
                    );
            },

            // 修改客户收款方式
            changeCustomerPayment(){
                this.formData.account_subbank = '';
                this.formData.alipay_owner = '';
                this.formData.bank = 1;
                this.formData.account = '';
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


            setOldAccount(){
                this.formData.payment = this.msg.payment;
                this.formData.account_owner = this.msg.account_owner;
                this.formData.account_subbank = this.msg.account_subbank;
                this.formData.alipay_owner = this.msg.alipay_owner;
                this.formData.bank = this.msg.bank;
                this.formData.account = this.msg.account;
            },
            setNewAccount(){
                this.formData.payment = 1;
                this.formData.account_owner = '';
                this.formData.account_subbank = '';
                this.formData.alipay_owner = '';
                this.formData.bank = 1;
                this.formData.account = '';
            }
        }
    }
</script>