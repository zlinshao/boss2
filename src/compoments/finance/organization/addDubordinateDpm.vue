<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalAddDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">新建下级部门</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row" v-if="parent_id !== 0">
                                    <label class="col-sm-2 control-label col-lg-2" style="padding-top: 8px;">上级部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" readonly v-model="highDpm">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" style="padding-top: 8px;">部门名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="department">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="responsible">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from '../../common/status.vue';
    export default {
        props: ['department_name', 'parentDpartmentId', 'msg'],
        components: {Status},
        data(){
            return {
                department: '',
                parent_id: '',
                highDpm: '',
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
                parentId: ''
            }
        },
        watch: {
            department_name(val){
                this.highDpm = val
            },
            parentDpartmentId(val){
                this.parent_id = val;
            },

        },
        methods: {
            responsible(){
                this.$http.post('achv/department', {
                    name: this.department,
                    leader_id: this.msg.leader_id,
                    rank: this.msg.period,
                    month: this.msg.time,
                    parent_id: this.parent_id,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.department = '';
                        $('#myModalAddDpm').modal('hide');
                        this.$emit('success');
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        this.info.state_success = false;
                    } else {
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-body {
        padding-top: 15px;
        padding-bottom: 0;
    }
    .modal-body > .panel {
        margin-bottom: 0;
    }
</style>