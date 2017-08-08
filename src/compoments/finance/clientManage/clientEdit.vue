<template>
    <div>
        <!-- Modal -->
        <div class="modal fade full-width-modal-right" id="clientEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">编辑客户</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >签约人</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" disabled placeholder="签约人" v-model="staff">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >所属部门</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" disabled placeholder="所属部门" v-model="department">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >负责人</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" disabled placeholder="负责人" v-model="inCharge">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >客户姓名</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" disabled placeholder="客户姓名" v-model="client">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" disabled placeholder="房屋地址" v-model="houseAddress">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2">汇款方式</label>
                            <div class="col-lg-10">
                                <select class="form-control" v-model="clientEdit.pay_method" @change="changePayment">
                                    <option :value="key" v-for="(value,key) in myDictionary.payment">
                                        {{value}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-if="clientEdit.pay_method ==1 || clientEdit.pay_method == 4">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >收款人姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="收款人姓名"  v-model="clientEdit.payee">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >开户行</label>
                                <div class="col-lg-10">
                                    <select class="form-control" v-model="clientEdit.bank" >
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(value,key) in myDictionary.bank">{{value}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支行</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支行"  v-model="clientEdit.branch_bank">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >存折账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="存折账号"  v-model="clientEdit.account">
                                </div>
                            </div>
                        </div>
                        <div v-if="clientEdit.pay_method == 2">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支付宝姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支付宝姓名"  v-model="clientEdit.payee">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支付宝账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支付宝账号"  v-model="clientEdit.account">
                                </div>
                            </div>
                        </div>
                        <div v-if="clientEdit.pay_method == 3">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >微信账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="微信账号" v-model="clientEdit.account">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" v-model="clientEdit.note"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="editClient">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    export default{
        props : ['editClientDetail'],
        components : {Status},
        data(){
            return{
                myDictionary : [],
                clientEdit:{
                    note : '',
                    pay_method : '1',
                    payee : '',
                    bank : '',
                    branch_bank : '',
                    account : '',
                },
                staff : '',
                department : '',
                inCharge : '',
                client : '',
                houseAddress : '',
                clientId : '',
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
        watch : {
            editClientDetail(val){
                console.log(val);
                this.staff = val.real_name;
                this.department = val.department_name;
                this.houseAddress = val.address;
                this.inCharge = val.head_name;
                this.client = val.name;
                this.clientId =val.id;
                this.clientEdit.note = val.note;
                console.log(val.financial_account[0].bank)
                this.clientEdit.pay_method = val.financial_account[0].pay_method;
                this.clientEdit.payee = val.financial_account[0].payee;
                this.clientEdit.bank = val.financial_account[0].bank;
                this.clientEdit.branch_bank = val.financial_account[0].branch_bank;
                this.clientEdit.account = val.financial_account[0].account;
            }
        },
        mounted(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('revenue/glee_collect/dict').then((res) =>{
                    this.myDictionary = res.data;
                })
            },
            changePayment(){
                this.clientEdit.pay_method = '';
                this.clientEdit.payee = '';
                this.clientEdit.bank = '';
                this.clientEdit.branch_bank = '';
                this.clientEdit.account = '';
            },
            editClient(){
                this.$http.post('revenue/customer/update/id/' + this.clientId , this.clientEdit).then((res) =>{
                    if(res.data.code === '20005'){
                        this.$emit('EditSuccess','yes');
                        $('#clientEdit').modal('hide');
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
        }
    }
</script>

<style scoped>
label{
    margin-top: 5px;
}
</style>
