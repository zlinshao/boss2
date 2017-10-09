<template>
    <div>
        <!--查看 备注-->
        <div class="modal fade " id="lookRemark" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                                @click="close_remark">×
                        </button>
                        <h4 class="modal-title" v-if="msg.addRemark !== 'add'">查看备注</h4>
                        <h4 class="modal-title" v-if="msg.addRemark === 'add'">新增备注</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">备注对象</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" v-model="msg.remark_obj" placeholder=""
                                           readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">备注内容</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" v-if="msg.addRemark !== 'add'"
                                              v-model="msg.remark_con" readonly></textarea>
                                    <textarea class="form-control" v-if="msg.addRemark === 'add'"
                                              v-model="lookRemark"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">

                        <button data-dismiss="modal" v-if="msg.addRemark !== 'add'"
                                class="btn btn-primary" type="button">确定
                        </button>

                        <button data-dismiss="modal" v-if="msg.addRemark === 'add'"
                                class="btn btn-default" type="button" @click="close_remark">取消
                        </button>
                        <button v-if="msg.addRemark === 'add'"
                                class="btn btn-primary" type="button" @click="add_remarks">确定
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state="info"></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue'
    export default {
        components: {Status},
        props: ['msg'],
        data (){
            return {
                lookRemark: '',             //备注内容
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
        watch: {},
        methods: {
//            新增备注
            add_remarks (){
                this.$http.post('salary/periodic_remark/save', {
                    scope: this.msg.tabs,
                    range: this.msg.range,
                    target_id: this.msg.remark_targetId,
                    content: this.lookRemark,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.$emit('Remark', this.msg.tabs);
                        $('#lookRemark').modal('hide');
                        this.close_remark();
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
                });
            },
            close_remark (){
                this.lookRemark = '';             //备注内容
            }
        }
    }
</script>


<style scoped>

</style>
