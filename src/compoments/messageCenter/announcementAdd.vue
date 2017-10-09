<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="announcementAdd" style="z-index: 1049;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="empty_info">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" style="text-align: center">添加公告</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">标题</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="titles" placeholder="标题">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">选择部门</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="选择部门"
                                                   v-model="departmentName" readonly @click="selectDep">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label col-sm-2">内容</label>
                                        <div class="col-sm-10 ">
                                              <textarea class="form-control" name="editor1" v-model="contents" rows="6"></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="empty_info">关闭</button>
                        <button type="button" class="btn btn-primary" @click="add_info">添加</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <Status :state='info'></Status>

        <DepartmentSelect :configure="configure" @Staff="selectedDpm"></DepartmentSelect>
    </div>
</template>

<script>
    import DepartmentSelect from '../common/oraganization.vue';
    import Status from '../common/status.vue';
    export default {
        components: {DepartmentSelect, Status},
        data(){
            return {
                configure: [],
                titles: '',             //标题
                contents: '',           //公告内容
                departmentName: [],     //部门名称
                departmentId: [],       //部门ID
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
            selectDep(){
                $('.selectCustom:eq(1)').modal('show');
                this.configure = {type: 'department'};
            },
            selectedDpm(val){
                for (let i = 0; i < val.department.length; i++) {
                    if(this.departmentId.indexOf(val.department[i].id) === -1){
                        this.departmentName.push(val.department[i].name);
                        this.departmentId.push(val.department[i].id);
                    }
                }
            },
            add_info (){
                this.$http.post('message/system/write', {
                    department_id: this.departmentId,
                    title: this.titles,
                    content: this.contents
                }).then((res) => {
                    if (res.data.code === '100004') {
                        $('#announcementAdd').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.$emit('success_system');
                        this.titles = '';             //标题
                        this.contents = '';           //公告内容
                        this.departmentName = [];     //部门名称
                        this.departmentId = [];       //部门ID
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
//            清空信息
            empty_info (){
                this.titles = '';             //标题
                this.contents = '';           //公告内容
                this.departmentName = [];     //部门名称
                this.departmentId = [];       //部门ID
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>