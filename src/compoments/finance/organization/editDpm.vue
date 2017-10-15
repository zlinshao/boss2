<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalEditDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="close_()">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑部门</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body" style="padding-top: 0;">
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2"
                                           style="padding-top: 6px;">部门名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" style="margin: 0;"
                                               v-model="departmentName">
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 18px;">
                                    <label class="col-sm-2 control-label col-lg-2"
                                           style="padding-top: 6px;">负责人</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="点击选择部门"
                                               v-model="leader_name" @click='select' readonly>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="close_()">取消</button>
                        <button type="button" class="btn btn-primary" @click="responsible">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>

        <!--人资-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>
    </div>
</template>
<script>
    import Status from '../../common/status.vue';
    import Department from '../../common/oraganization.vue'
    export default {
        props: ['department_name', 'department_id'],
        components: {Status, Department},
        data(){
            return {
//                depart:{
//                    department:'',
//                    id:'',
//                    flag:'',
//                    reId:'',
//                    reName:'',
//                },
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
                configure: {},
                leader_id: '',              //负责人ID
                leader_name: '',            //负责人
                departmentName: '',
                departmentId: '',

//                myAccount:this.editDpm
            }
        },
        watch: {
//            editDpm(val) {
//                this.myAccount = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
//                this.depart.department=this.myAccount.name;
//                this.depart.id=this.myAccount.id;
//                this.depart.flag=this.myAccount.flag;
//                this.depart.reId=this.myAccount.reId;
//                this.depart.reName=this.myAccount.reName;
//            },
            department_name(val){
                this.departmentName = val;
            },
            department_id(val){
                this.departmentId = val;
            }
        },
//        computed : {
//            departmentId(){
//                return this.editDpm.id;
//            },
//        },
        methods: {
            responsible(){
                this.$http.put('achv/department/rename/' + this.departmentId, {
                    name: this.departmentName,
                    leader_id: this.leader_id,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        $('#myModalEditDpm').modal('hide');
                        this.$emit('editDdp', this.depart);
                        this.successMsg(res.data.msg);
                        this.close_();
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            close_ (){
                this.leader_name = '';
                this.leader_id = '';
            },
//            负责人
            select(){
                $('.selectCustom:eq(3)').modal({backdrop: 'static',});
                this.configure = {type: 'staff', length: 1};
            },
            selectDateSend(val){
                if (val.staff.length > 0) {
                    this.leader_name = val.staff[0].name;
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
        position: relative;
        padding-top: 30px;
        padding-bottom: 0;
    }
</style>