<template>
    <div>
        <div class="modal fade full-width-modal-right" id="payFor" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">应付入账</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款时间</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">房屋地址</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" @click="selectClient" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">支出科目</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款方式</label>
                                <div class="col-sm-10">
                                    <select class="form-control">
                                        <option value="">银行卡</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款账户</label>
                                <div class="col-sm-10">
                                    <select class="form-control">
                                        <option value="">银行卡</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户余额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应付金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">实付金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">剩余款项</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">补齐日期</label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐日期"
                                           class="form-control form_datetime">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">累计实付</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款人员</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">取消</button>
                        <button type="button" class="btn btn-primary">确认入账</button>
                    </div>
                </div>
            </div>
        </div>

        <SelectClient @clientAdd="getClient"></SelectClient>
    </div>
</template>
<style scoped>

</style>
<script>
    import SelectClient from '../../common/selectClient.vue'
    export default{
        props : ['id'],
        components: {SelectClient},
        data(){
            return {
                msg : {},
            }
        },
        updated (){
            this.remindData();
        },
        watch : {
            id(val){
                console.log(val);
            }
        },
        methods: {
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder == '付款时间'){

                    } else {

                    }
//                    console.log(ev.target.value);
//                    console.log(ev.target.placeholder);
                }.bind(this));
            },
            // 选择客户
            selectClient(){
                $('.selectClient:eq(1)').modal('show');
            },
            //获得客户
            getClient(){

            }
        }
    }
</script>