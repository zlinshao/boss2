<template>
    <div>
        <div class="modal fade full-width-modal-right" id="contractNumAdd" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">新建任务</h4>
                        </div>
                        <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal clearFix">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">任务类型</label>
                                        <div class="col-sm-10">
                                            <!--<input type="text" class="form-control" readonly>-->
                                            <select class="form-control">
                                                <option value="">领取</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">领取时间</label>
                                        <div class="col-sm-10">
                                            <!--<input type="text" class="form-control" readonly>-->
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" :idName="'receiveDate'"
                                                        @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">领取人</label>
                                        <div class="col-sm-10">
                                            <!--<input type="text" class="form-control" readonly>-->
                                            <input type="text" class="form-control" placeholder="点击选择员工"
                                                   v-model="selected" @click='select' readonly>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary">确认入账</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>

<script>
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/oraganization.vue'
    export default{
        components: {DatePicker,STAFF},
        data(){
            return {
                dateConfigure: [
                    {
                        range: false,
                        needHour: false
                    }
                ],
                currentDate: [],
            }
        },
        methods: {
            getDate(val){

            }
        }
    }
</script>
<style scoped>

</style>