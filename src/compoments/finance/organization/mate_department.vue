<template>
    <div>
        <div role="dialog" class="modal fade bs-example-modal-sm" id="mate_department">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">选择</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group" style="margin-bottom: 16px;">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="department_name" @click='select(1)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect(1)">清空</button>
                            </span>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择负责人"
                                   v-model="staff_name" @click='select(2)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect(2)">清空</button>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                        <button class="btn btn-primary btn-md" @click="branch_tab">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!--人资选择部门-->
        <Organization :configure="configure" @Staff="selectDateSend" :msg="msg"></Organization>

        <!--人资选择负责人-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>

        <!--状态提醒-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Organization from './organization_choose.vue'
    import Department from '../../common/oraganization.vue'
    export default {
        props: ['msg'],
        components: {Organization, Department, Status},
        data (){
            return {
                tabs: '',
                configure: {},
                department_name: '',
                department_id: '',
                staff_name: '',
                staff_id: '',
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

        methods: {
            select (val){
                this.tabs = val;
                if (val === 1) {
                    $('.OrganizationChoose:eq(1)').modal({backdrop: 'static',});
                    this.configure = {type: 'department', length: 1};
                } else if (val === 2) {
                    $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                    this.configure = {type: 'staff', length: 1};
                }
            },
//            部门匹配
            selectDateSend (val){
                if (this.tabs === 1) {
                    this.department_name = val.department[0].name;
                    this.department_id = val.department[0].id;
                    this.$http.get('achv/department/' + val.department[0].id).then((res) => {
                        if (res.data.data.leader !== null) {
                            this.staff_name = res.data.data.leader.real_name;
                            this.staff_id = res.data.data.leader.id;
                        }
                    });
                } else if (this.tabs === 2) {
                    this.staff_name = val.staff[0].name;
                    this.staff_id = val.staff[0].id;
                }
            },
//            确定
            branch_tab (){
//                this.$http.post('finance/customer/mark', {
//                    department_id: this.department_id,
//                    leader_id: this.staff,
//                    collect: this.col_pitch,
//                    rent: this.ren_pitch
//                }).then((res) => {
//                    if (res.data.code === '90000') {
//                        this.$emit('mate', this.msg.page);
//                        $('#mate_department').modal('hide');
//                        this.close_();
//                        this.successMsg(res.data.msg);
//                    } else {
//                        this.errorMsg(res.data.msg);
//                        this.close_();
//                    }
//                });
                this.$emit('mate', this.msg.page);
                $('#mate_department').modal('hide');
                this.close_();
            },
//            清空
            clearSelect (val){
                if (val === 1) {
                    this.department_name = '';
                    this.department_id = '';
                } else if (val === 2) {
                    this.staff_name = '';
                    this.staff_id = '';
                }
            },

//            清空部门标记ID
            close_ (){
                this.department_id = '';
                this.department_name = '';
                this.staff_name = '';
                this.staff_id = '';
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


<style scoped>

</style>
