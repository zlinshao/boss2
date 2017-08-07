<template>
    <div>
        <!-- Modal -->
        <div class="modal fade full-width-modal-right" id="clientEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
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
                                <input type="text" class="form-control" readonly placeholder="签约人">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >所属部门</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="所属部门">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >负责人</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="负责人">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >客户姓名</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="客户姓名">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" readonly placeholder="房屋地址">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2">汇款方式</label>
                            <div class="col-lg-10">
                                <select class="form-control" v-model="payment">
                                    <option :value="key" v-for="(value,key) in myDictionary.payment">
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
                                        <option :value="key" v-for="(value,key) in myDictionary.bank">{{value}}</option>
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
    </div>
</template>

<script>
    export default{
        components : {},
        data(){
            return{
                myDictionary : [],
                payment : '1',
                bank : '',
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
        }
    }
</script>

<style scoped>
label{
    margin-top: 5px;
}
</style>
