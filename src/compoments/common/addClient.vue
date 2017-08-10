<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade addClient" id="addClient">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">新增客户</h4>
                    </div>
                    <div class="modal-body roll">

                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                <div class="col-lg-10 status1">
                                    <label>
                                        <input type="radio" name="status" value="1"
                                               class="pull-left" v-model="cus_status">业主
                                    </label>
                                    <label>
                                        <input type="radio" name="status" value="2"
                                               class="pull-left" v-model="cus_status">租客
                                    </label>
                                    <label>
                                        <input type="radio" name="status" value="3"
                                               class="pull-left" v-model="cus_status">业主(代理人)
                                    </label>
                                </div>
                            </div>
                            <!--客户姓名-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">客户姓名&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="cus_name" class="form-control"
                                           placeholder="起输入客户姓名">
                                </div>
                            </div>
                            <!--尊称-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">尊称&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10 status1">
                                    <label>
                                        <input type="radio" name="gender" value="1"
                                               class="pull-left" v-model="cus_gender">先生
                                    </label>
                                    <label>
                                        <input type="radio" name="gender" value="2"
                                               class="pull-left" v-model="cus_gender">女士
                                    </label>
                                </div>
                            </div>
                            <!--手机号-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">手机号&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" v-model="cus_phone"
                                           @keyup="cus_phone = cus_phone.replace(/[^\d]/g,'');" maxlength="11"
                                           placeholder="请输入手机号" style="margin-bottom: 0;">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="addNewClient">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from './status.vue'
    export default{
        components:{
            Status
        },
        data(){
            return {
                cus_status:'',
                cus_gender :'',
                cus_name: '',
                cus_phone :'',
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
        mounted(){

        },
        methods : {
            addNewClient (val){
                this.$http.post('core/customer/saveCustomer',{
                    identity: this.cus_status,                  //业主/租客
                    name:  this.cus_name,                        //客户姓名
                    gender: this.cus_gender,                    //性别
                    mobile: this.cus_phone,                     //手机号
                }).then((res) => {
                    if (res.data.code === '70010') {
                        this.cus_status = '';
                        this.cus_gender  = '';
                        this.cus_name = '';
                        this.cus_phone  = '';
                        this.$emit('AddCustom',res.data.data);
                        $('.addClient').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;


                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
        }
    }
</script>
<style scoped>
    input[type=checkbox], input[type=radio] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }
    .status1 {
        padding-top: 7px;
    }

    .status1 label {
        margin-right: 20px;
    }
</style>