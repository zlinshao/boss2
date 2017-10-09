<template>
    <div>
        <div class="modal fade" id="modifyTime" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close"@click="cancelModify"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑付款时间</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款时间：<sup class="required"></sup></label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" value="" placeholder="付款时间"
                                           class="form-control form_datetime" readonly v-model="pay_time">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="cancelModify">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveModify">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        components: {},
        data(){
            return {
                pay_time: ''
            }
        },
        watch:{
            idArr(val){
//                console.log(val);
            }
        },
        updated (){
            this.remindData();
        },
        methods: {
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    pickerPosition: "top-left",
//                    endDate: new Date(),
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
                    this.pay_time = ev.target.value;
                }.bind(this));
            },
            cancelModify(){
                this.pay_time = '';
                $('#modifyTime').modal('hide');
            },
            saveModify(){
                this.$emit('save',this.pay_time);
                this.cancelModify();
            }
        }
    }
</script>