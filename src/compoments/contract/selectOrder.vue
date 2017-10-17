<template>
    <div>
        <div role="dialog" class="modal fade bs-example-modal-sm"
             data-backdrop="static"
             aria-hidden="true" id="orderModal">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" @click="close">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">选择通知人</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal clearFix">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">选择通知人</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="点击选择员工"
                                           v-model="select" @click='selectStaff' readonly>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer text-right">
                        <button class="btn btn-primary btn-md" @click="close">取消</button>
                        <button class="btn btn-danger btn-md" @click="sure">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>
<script>
    import Status from  '../common/status.vue'
    import STAFF from  '../common/oraganization.vue'
    export default {
        components: {Status,STAFF},
        data() {
            return {
                configure: {},                  //组织架构
                staff_id : [],
                select : [],
                info:{
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
            //            组织架构
            selectStaff(){
                this.configure = {type: 'staff'};
                $('.selectCustom:eq(1)').modal('show');
            },
//            领取人
            selectDateSend(val){
                if (val.staff.length>0){
                    for (let i = 0 ; i<val.staff.length ; i++){
                        this.staff_id.push(val.staff[i].id)
                        this.select.push(val.staff[i].name)
                    }
                }
//                console.log(val);
//                this.receiver_id = val.staff[0].id;

            },
            sure(){
                if (this.staff_id.length==0){
                    this.info.error = '请选择通知人';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                } else {
                    this.$emit('order',this.staff_id);
                    this.close()
                }

            },
            close(){
                $('#orderModal').modal('hide');
                this.staff_id = [];
                this.select = [];
            }
        }
    }
</script>
<style scoped>

</style>