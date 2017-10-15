<template>
    <div>
        <!--充公选择-->
        <div class="modal fade " id="periodicRevise" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
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

                            <!--房屋地址-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">房屋地址</label>
                                <div class="col-lg-10">
                                    <input type="text" :value="msg.address" class="form-control" placeholder=""
                                           readonly>
                                </div>
                            </div>

                            <!--收房人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">收房人</label>
                                <div class="col-lg-10">
                                    <input type="text" :value="msg.collect_staff_name" class="form-control"
                                           placeholder=""
                                           readonly>
                                </div>
                            </div>

                            <!--租房人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">租房人</label>
                                <div class="col-lg-10">
                                    <input type="text" :value="msg.rent_staff_name" class="form-control" placeholder=""
                                           readonly>
                                </div>
                            </div>

                            <!--充公人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">充公人</label>
                                <div class="col-lg-10">
                                    <select v-model="confiscate" class="form-control" @change="commission">
                                        <option value="">请选择充公人</option>
                                        <option :value="msg.collect_staff_id">{{msg.collect_staff_name}}</option>
                                        <option :value="msg.rent_staff_id">{{msg.rent_staff_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <!--充公原因-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">充公原因</label>
                                <div class="col-lg-10">
                                    <textarea v-model="confiscate_cause" class="form-control"></textarea>
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
                        <button class="btn btn-primary" type="button" @click="periodicRevise()">确定</button>
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
        props: ['msg', 'id'],
        data (){
            return {
                commission_id: '',                  //充公单子
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
        methods: {

//            充公单子
            commission (){
//                if (this.confiscate !== '') {
//                    if (this.msg.collect_staff_id !== this.confiscate) {
//                        this.commission_id = this.msg.collect_commission_id;
//                    } else if (this.msg.rent_staff_id !== this.confiscate) {
//                        this.commission_id = this.msg.rent_commission_id;
//                    }
//                }
                if (this.msg.collect_staff_id === this.confiscate) {
                    this.commission_id = this.msg.collect_commission_id;
                } else if (this.msg.rent_staff_id === this.confiscate) {
                    this.commission_id = this.msg.rent_commission_id;
                }
            },
//            确定编辑
            periodicRevise (){
                this.$http.post('achv/commission/confiscate/' + this.id, {
                    blame_staff_id: this.confiscate,            //充公人
                    commission_id: this.commission_id,          //充公单子
                    remark: this.remarks,                       //备注
                    reason: this.confiscate_cause,              //充公原因
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.close_();
                        this.$emit('confiscate', 1);
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },

//            关闭模态框
            close_ (){
                this.clear_content();
                $('#periodicRevise').modal('hide');          //成功关闭模态框
            },

//            清空内容
            clear_content (){
                this.confiscate = '';                     //充公人
                this.confiscate_cause = '';               //充公原因
                this.remarks = '';                        //备注
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
