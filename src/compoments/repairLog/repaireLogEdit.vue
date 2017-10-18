<template>
    <div>
        <div class="modal fade full-width-modal-right" id="repairLogEdit" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">编辑维修</h4>
                        </div>
                        <div class="modal-body has-js">
                            <div class="panel-body">
                                <form class="form-horizontal clearFix">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">合同编号</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">客户姓名</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">联系电话</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">约定维修时间</label>
                                        <div class="col-sm-10">
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                        :idName="'appointTime'"
                                                        @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修内容</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修师傅</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修结果</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修金额</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修状态</label>
                                        <div class="col-sm-10">
                                            <select class="form-control">
                                                <option value="1">电话未联系</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">认责人</label>
                                        <div class="col-sm-10">
                                            <select class="form-control">
                                                <option value="1">房东</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">备注</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">操作人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">签约人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">负责人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="close">取消</button>
                            <button type="button" class="btn btn-primary">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import DatePicker from '../common/datePicker.vue'
    export default {
        components: {DatePicker},
        data() {
            return {
                dateConfigure: [                    //时间控件
                    {
                        range: false,
                        needHour: true
                    }
                ],
                currentDate: [],                    //时间控件
            }
        },
        methods: {
            getDate(val){

            },
            close(){
                $('#repairLogEdit').modal('hide');
            }
        }
    }
</script>
<style scoped>

</style>