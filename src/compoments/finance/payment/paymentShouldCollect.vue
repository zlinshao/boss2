<template>
    <div>
        <div class="modal fade full-width-modal-right" id="collectFor" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">应收入账</h4>
                    </div>
                    <div class="modal-body clearFix" v-if="msg!=''">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款时间</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="msg.pay_date">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="msg.customer.name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情</label>
                                <div class="col-sm-10">
                                    <textarea type="text" class="form-control" readonly rows="6">{{msg.description}}</textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款方式</label>
                                <div class="col-sm-10">
                                    <select class="form-control" @change="getAccount" v-model="cate">
                                        <option value="">--请选择--</option>
                                        <option :value="value" v-for="(key,value) in dict.account_cate">{{key}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款账户</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.account_id">
                                        <option value="">--请选择--</option>
                                        <option :value="value" v-for="(key,value) in accounts">{{key}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应收金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="msg.amount_receivable">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">实收金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="formData.amount_received">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">剩余款项</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="msg.balance">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">补齐日期</label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐日期"
                                           class="form-control form_datetime" v-model="formData.complete_date">
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">累计实收</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款人员</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly :value="dict.staff_id[msg.staff_id]">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">截图凭证</label>
                                <div class="col-sm-10">
                                    <span>
                                        <img :src="item.small" alt="" v-for="(item,index) in msg.album.receipt_pic" @click="showLargePic(index)">
                                    </span>
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
                        <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                        <button type="button" class="btn btn-primary" @click="save">确认入账</button>
                    </div>
                </div>
            </div>
        </div>

        <PicModal :largePic="largePic"></PicModal>

    </div>
</template>
<style scoped>
    textarea{
        max-width: 100%;
        resize: none;
    }
</style>
<script>
    import PicModal from '../../common/largePic.vue'
    export default{
        props : ['id'],
        components: {PicModal},
        data(){
            return {
                msg : '',
                currentId : '',
                largePic : [],
                srcs : {},

                cate : '',
                formData:{
                    account_id:'',            // 账户id
                    amount_received:'',      // 收款金额
                    complete_date : '',     // 补齐时间
                    remark:''             // 备注
                },

                accounts:{}

            }
        },
        updated (){
            this.remindData();
        },
        watch : {
            id(val){
                console.log(val);
                this.currentId = val;
                this.largePic = [];
                this.srcs = {};
                this.getDetails();
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                    }
                );
        },
        methods: {
            clearForm(){

            },

            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder == '补齐时间'){

                    }
//                    console.log(ev.target.value);
//                    console.log(ev.target.placeholder);
                }.bind(this));
            },

            getDetails(){
                this.$http.get('account/receivable/'+this.currentId)
                    .then((res) =>{
//                        console.log(res.data);
                        this.msg = res.data.data;
                        console.log(this.msg)
                        this.srcs = this.msg.album.receipt_pic;
                    })
            },

            // 查看大图
            showLargePic(num){
                this.largePic = [{
                    src : this.srcs,
                    i : num
                }];
//                console.log(this.largePic)
                $('#largePic').modal('show');
            },

//            根据收款方式获取收款账户
            getAccount(){
                this.$http.get('account/manage/readbycate/'+this.cate).then((res) =>{
                    console.log(res.data);
                    this.accounts = res.data;
                })
            },

//            应收入账
            save(){
                this.$http.post('account/receivable/receive',this.formData)
                    .then(console.log)
            }
        }
    }
</script>