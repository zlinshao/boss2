<template>
    <div>
        <div role="dialog" class="modal fade bs-example-modal-sm" id="freezeModule">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h5>
                            <input @click="remindData" type="text" placeholder="选择日期"
                                   class="form-control" id="form_datetime" readonly :value="export_date"
                                   style="margin-bottom: 0;">
                        </h5>
                    </div>
                    <div class="modal-footer text-right">
                        <a data-dismiss="modal" class="btn btn-default btn-md">取消</a>
                        <a class="btn btn-success btn-md" @click="freeze">冻结</a>
                    </div>
                </div>
            </div>
        </div>

        <div role="dialog" class="modal fade bs-example-modal-sm" id="prompt">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="close_()">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            确定要冻结<span class="text-danger">{{this.export_date}}</span>的工资吗？
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <a class="btn btn-default btn-md" @click="close_()">取消</a>
                        <a class="btn btn-success btn-md" @click="sure">确定</a>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue'

    export default {
        name: "freeze-salary",
        components: {Status},
        data() {
            return {
                export_date: '',
                info: {                  //提示信息
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
        mounted() {
            this.remindData();
            this.times()
        },
        watch: {
            export_date(val) {
                if (val === '') {
                    this.times();
                }
            }
        },
        methods: {
            times() {
                let now = new Date();                   //当前日期
                let nowYear = now.getFullYear();        //当前年
                let nowMonth = now.getMonth() + 1;      //当前月
                if (nowMonth < 10) {
                    nowMonth = '0' + nowMonth;
                }
                this.export_date = nowYear + '-' + nowMonth;
            },
            // 冻结
            freeze() {
                $('#prompt').modal({backdrop: 'static'});
                $('#freezeModule').modal('hide');
            },
            sure() {
                this.$http.get('salary/salary/seal/' + this.export_date).then((res) => {
                    if (res.data.code === '') {
                        this.successMsg(res.data.msg);
                        $('#prompt').modal('hide');
                        $('#freezeModule').modal('hide');
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            close_() {
                $('#freezeModule').modal({backdrop: 'static'});
                $('#prompt').modal('hide');
            },
//            导出月份
            remindData() {
                $('#form_datetime').datetimepicker({
                    format: 'yyyy-mm',
                    startView: 3,
                    minView: 3,
                    language: 'zh-CN',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: 'bottom-right',
                }).on('changeDate', function (ev) {
                    this.export_date = ev.target.value;
                }.bind(this));
            },
            successMsg(msg) {    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg) {      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        },
    }
</script>

<style scoped>

</style>