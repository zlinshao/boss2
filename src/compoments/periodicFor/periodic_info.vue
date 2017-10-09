<template>
    <div>
        <!--充公选择-->
        <div class="modal fade " id="periodicInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!--新增客户-->
                    <div class="modal-header">
                        <button type="button" class="close" @click="close_" aria-hidden="true">×</button>
                        <h4 class="modal-title">充公选择</h4>
                    </div>

                    <!--充公选择-->
                    <div class="modal-body has-js">
                        <form class="form-horizontal" role="form">

                            <!--充公人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">充公人</label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="confiscate" class="form-control" readonly>
                                </div>
                            </div>

                            <!--充公原因-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">充公原因</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" :value="msg.reason" readonly></textarea>
                                </div>
                            </div>

                            <!--备注-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" v-model="remarks"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" @click="close_">取消</button>
                        <button class="btn btn-primary" type="button" @click="periodicRevise()">修改</button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state="info"></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default {
        components: {Status},
        props: ['msg'],
        data (){
            return {
                confiscate: '',                     //充公人
                confiscate_cause: '',               //充公原因
                remarks: '',                        //备注
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
        watch: {
            msg (val){
                this.confiscate = val.blame_staff.real_name;
                this.remarks = val.remark;
            }
        },
        methods: {
//            确定编辑
            periodicRevise (){
                this.$http.put('achv/confiscation/' + this.msg.id, {
                    remark: this.remarks,                        //备注
                }).then((res) => {
                    if (res.data.code === '70010') {
                        this.close_();
                        this.$emit('confiscate',1);
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },

//            关闭模态框
            close_ (){
                this.clear_content();
                $('#periodicInfo').modal('hide');          //成功关闭模态框
            },

//            清空内容
            clear_content (){
                this.confiscate = '';                     //充公人
                this.confiscate_cause = '';               //充公原因
                this.remarks = '';                        //备注
            }
        }
    }
</script>


<style scoped>
    .col-lg-10.iconic-input.right div {
        margin-top: 6px;
        color: #AFAFAF;
    }

    .form-group {
        margin-bottom: 22px;
    }

    .form-control {
        margin-bottom: 0;
    }

    i.fa.fa-check-square, i.fa.fa-square-o {
        right: 28px;
        color: #000;
        font-size: 20px
    }
</style>
