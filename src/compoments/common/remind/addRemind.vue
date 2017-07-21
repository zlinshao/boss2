<template>
    <div>
        <div class="modal fade" id="addRemind">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="revise">&times;</span>
                        </button>
                        <h5 class="modal-title">添加提醒</h5>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label col-sm-2">提醒内容</label>
                                        <div class="col-sm-10 ">
                                            <textarea class="form-control" v-model="remind_info" name="editor1"
                                                      rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-sm-2">提醒时间</label>
                                        <div class="col-sm-4 ">
                                            <select class="form-control">
                                                <option value="">请选择时间</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4 ">
                                            <a class="btn btn-white" style="border: none" @click="Advanced">高级选项+</a>
                                        </div>
                                    </div>
                                    <div class="row" v-if="isAdvanced">
                                        <label class="col-sm-2 control-label col-sm-2"></label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="revise">取消</button>
                        <button type="button" class="btn btn-primary" @click="add_notice">添加</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import DatePicker from '../datePicker.vue'
    import Status from '../status.vue';
    export default{
        components: {
            DatePicker, Status
        },
        data(){
            return {
                isAdvanced: false,
                remindTime: '',         //提醒时间
                remind_info: '',        //提醒内容
                dateConfigure: [
                    {
                        range: false,               // 是否选择范围
                        needHour: true,             // 是否需要选择小时
                        position: 'bottom-left'     // 在上面显示
                    }
                ],
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },

        methods: {
            revise (){
                this.remindTime = '';         //提醒时间
                this.remind_info = '';        //提醒内容
            },
            Advanced(){
                this.isAdvanced = !this.isAdvanced;
            },

            getDate (val){
                this.remindTime = val;
            },
            add_notice (){
                this.$http.post('message/remind/write', {
                    content: this.remind_info,
                    remind_time: this.remindTime
                }).then((res) => {
                    if (res.data.code === '100018') {
                        $('#addRemind').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;

                        this.remindTime = '';         //提醒时间
                        this.remind_info = '';        //提醒内容
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            }
        }
    }
</script>