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
                                <input type="text" class="form-control" readonly placeholder="签约人" @click="selectStaff">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >所属部门</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="所属部门" @click="selectDpm">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >负责人</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="负责人" @click="selectCharge">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >客户姓名</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="客户姓名" @click="selectPayClient">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="房屋地址" @click="selectHouse">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2">汇款方式</label>
                            <div class="col-lg-10">
                                <select class="form-control" v-model="payment">
                                    <option :value="key" v-for="(value,key) in dictionary.payment">
                                        {{value}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-if="payment === '1' || payment === '4'">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >收款人姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="收款人姓名">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >开户行</label>
                                <div class="col-lg-10">
                                    <select class="form-control" v-model="bank">
                                        <option value="">请选择</option>
                                        <option :value="key" v-for="(value,key) in dictionary.bank">{{value}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支行</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支行">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >存折账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="存折账号">
                                </div>
                            </div>
                        </div>
                        <div v-if="payment ==='2'">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支付宝姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支付宝姓名">
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >支付宝账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="支付宝账号">
                                </div>
                            </div>
                        </div>
                        <div v-if="payment ==='3'">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >微信账号</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="微信账号">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <organize :configure="configure" @Staff=getValue></organize>
        <Client @clientPayAdd = getPayClient></Client>
        <House @House = getHouse></House>
    </div>
</template>

<script>
    import organize from '../../common/organization/selectStaff.vue'
    import Client from  '../../common/selectPayClient.vue'
    import House from '../../common/selectHouse.vue'
    export default{
        components : {organize , House , Client},
        data(){
            return{
                dictionary : [],
                payment : '1',
                bank : '',
                configure : [],
                configureType : '',
            }
        },
        mounted(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('revenue/glee_collect/dict').then((res) =>{
                    this.dictionary = res.data;
                    console.log(this.dictionary);
                })
            },
            selectStaff(){
                $('.selectCustom:eq(1)').modal('show');
                this.configureType = 'selectStaff';
                this.configure={class:'selectType',type:'staff'};
            },
            selectDpm(){
                $('.selectCustom:eq(1)').modal('show');
                this.configureType = 'selectDpm';
                this.configure={class:'selectType',type:'department'};
            },
            selectCharge(){
                $('.selectCustom:eq(1)').modal('show');
                this.configureType = 'selectCharge';
                this.configure={class:'selectType',type:'staff'};
            },
            getValue(val){
                if(this.configureType === 'selectStaff'){

                }else if(this.configureType === 'selectDpm'){

                }else if(this.configureType === 'selectCharge'){

                }
            },

            selectHouse(){          //选择房屋
                $('#selectHouse').modal('show');
            },
            getHouse(val){
                console.log(val)
            },
            selectPayClient(){      //选择客户
                $('#selectPayClient').modal('show');
            },
            getPayClient(val){
                console.log(val)
            },
        }
    }
</script>

<style scoped>
label{
    margin-top: 5px;
}
</style>
