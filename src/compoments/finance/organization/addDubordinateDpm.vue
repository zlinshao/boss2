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
                                <div v-if="parent_id !== 0">
                                    <label class="col-sm-2 control-label col-lg-2"
                                           style="padding-top: 8px;">上级部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" readonly v-model="highDpm">
                                    </div>
                                </div>
                                <div>
                                    <label class="col-sm-2 control-label col-lg-2"
                                           style="padding-top: 8px;">部门名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="department">
                                    </div>
                                </div>
                                <div>
                                    <label class="col-sm-2 control-label col-lg-2" style="padding-top: 8px;">负责人</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="点击选择负责人"
                                               v-model="staff_name" @click='select' readonly>
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

        <!--人资选择负责人-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>
    </div>
</template>
<script>
    import Status from '../../common/status.vue';
    import Department from '../../common/oraganization.vue'
    export default {
        props: ['department_name', 'parentDpartmentId', 'msg'],
        components: {Status, Department},
        data(){
            return {
                leader_id: '',          //负责人ID
                staff_name: '',         //负责人
                department: '',         //部门名称
                parent_id: '',          //父部门ID
                highDpm: '',
                configure: {},
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
                this.staff_name = '';
                this.leader_id = '';
                this.department = '';
            },

        },
        methods: {
            responsible(){
                this.$http.post('achv/department', {
                    name: this.department,
                    leader_id: this.leader_id,
                    rank: this.msg.period,
                    month: this.msg.time,
                    parent_id: this.parent_id,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.department = '';
                        $('#myModalAddDpm').modal('hide');
                        this.$emit('success');
                       this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            选择负责人
            select(){
                $('.selectCustom:eq(4)').modal({backdrop: 'static',});
                this.configure = {type: 'staff', length: 1};
            },
            selectDateSend (val){
                if (val.staff.length > 0) {
                    this.staff_name = val.staff[0].name;
                    this.leader_id = val.staff[0].id;

                }
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
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