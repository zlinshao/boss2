<template>
    <div>
        <!-- Modal -->
        <div class="modal fade full-width-modal-right" id="clientAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">新增客户</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >签约人</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="签约人"
                                       v-model="signing_name" @click="selectStaff">
                            </div>
                        </div>
                        <!--<div class="row">-->
                            <!--<label class="col-sm-2 control-label col-lg-2" >所属部门</label>-->
                            <!--<div class="col-lg-10">-->
                                <!--<input type="text" class="form-control" readonly placeholder="所属部门"-->
                                        <!--@click="selectDpm">-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >负责人</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="负责人"
                                      v-model="head_name" @click="selectCharge">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >客户姓名</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="客户姓名"
                                      v-model="clientAdd.name" @click="selectPayClient">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="房屋地址"
                                      v-model="clientAdd.address" @click="selectHouse">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2">汇款方式</label>
                            <div class="col-lg-10">
                                <select class="form-control" v-model="clientAdd.pay_method">
                                    <option :value="key" v-for="(value,key) in myDictionary.payment">
                                        {{value}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-if="clientAdd.pay_method === '1' || clientAdd.pay_method === '4'">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >收款人姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="收款人姓名" v-model="clientAdd.payee">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >开户行</label>
                                <div class="col-lg-10">
                                    <select class="form-control" v-model="clientAdd.bank" @change="changePayment">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(value,key) in myDictionary.bank">{{value}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支行</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支行" v-model="clientAdd.branch_bank">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >存折账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="存折账号" v-model="clientAdd.account">
                                </div>
                            </div>
                        </div>
                        <div v-if="clientAdd.pay_method ==='2'">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支付宝姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支付宝姓名" v-model="clientAdd.payee">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支付宝账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支付宝账号" v-model="clientAdd.account">
                                </div>
                            </div>
                        </div>
                        <div v-if="clientAdd.pay_method ==='3'">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >微信账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="微信账号" v-model="clientAdd.account">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" v-model="clientAdd.note"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="addClient">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <organize :configure="configure" @Staff=getValue></organize>
        <Client @clientPayAdd = getPayClient></Client>
        <House @House = getHouse></House>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import organize from '../../common/organization/selectStaff.vue'
    import Client from  '../../common/selectPayClient.vue'
    import House from '../../common/selectHouse.vue'
    import Status from '../../common/status.vue'
    export default{
        components : {organize , House , Client ,Status},
        data(){
            return{
                myDictionary : [],
                bank : '',
                configure : [],
                configureType : '',
                clientAdd:{
                    address : '',
                    name : '',
                    identity : '',
                    rooms : '',
                    note : '',
                    pay_method : '1',
                    signing_id : '',
                    head_id : '',
                    payee : '',
                    bank : '',
                    branch_bank : '',
                    account : '',
                },
                signing_name :"",
                head_name : '',
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
        mounted(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('revenue/glee_collect/dict').then((res) =>{
                    this.myDictionary = res.data;
                    console.log(this.myDictionary);
                })
            },
            selectStaff(){
                $('.selectCustom:eq(1)').modal('show');
                this.configureType = 'selectStaff';
                this.configure={class:'amount',length:1};
            },
//            selectDpm(){
//                $('.selectCustom:eq(1)').modal('show');
//                this.configureType = 'selectDpm';
//                this.configure={length:1,class:'department'};
//            },
            selectCharge(){
                $('.selectCustom:eq(1)').modal('show');
                this.configureType = 'selectCharge';
                this.configure={class:'amount',length:1};
            },
            getValue(val){
                console.log(val)
                if(this.configureType === 'selectStaff'){
                    this.clientAdd.signing_id = val.staff[0].id;
                    this.signing_name = val.staff[0].name;
                }else if(this.configureType === 'selectCharge'){
                    this.clientAdd.head_id = val.staff[0].id;
                    this.head_name = val.staff[0].name;
                }
            },

            selectHouse(){          //选择房屋
                $('#selectHouse').modal('show');
            },
            getHouse(val){
                this.clientAdd.rooms =val.rooms;
                this.clientAdd.address =val.address;
            },
            selectPayClient(){      //选择客户
                $('#selectPayClient').modal('show');
            },
            getPayClient(val){
                this.clientAdd.name = val.name;
                this.clientAdd.identity = val.identity;
            },
            changePayment(){
                if(this.clientAdd.pay_method ==1 ||this.clientAdd.pay_method ==4){
                    this.clientAdd.account = '';
                    this.clientAdd.payee = '';
                }else {
                    this.clientAdd.payee = '';
                    this.clientAdd.bank = '';
                    this.clientAdd.branch_bank = '';
                    this.clientAdd.account = '';
                }
            },
            addClient(){
                this.$http.post('revenue/customer/insert' , this.clientAdd).then((res) =>{
                    if(res.data.code === '20002'){
                        this.$emit('AddSuccess','yes');
                        $("#clientAdd").modal('hide');
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
        }
    }
</script>

<style scoped>
label{
    margin-top: 5px;
}
</style>
