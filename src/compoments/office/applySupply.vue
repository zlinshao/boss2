<template>
    <div>
        <div class="modal fade full-width-modal-right" id="applySupply" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新建办公用品申领</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">登记类型<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品库<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品类别<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单价</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">申请数量<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <!--<input type="text" class="form-control" readonly>-->
                                        <button type="button" class="col-sm-2 btn btn-default minus" @click="minus">-</button>
                                        <div class="col-sm-8" style="padding-left: 0;padding-right: 0">
                                            <input type="text" class="form-control" v-model="formData.num" @blur="isNum">
                                        </div>
                                        <button type="button" class="col-sm-2 btn btn-default add" @click="add">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary">申领</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default{
        components: {Status},
        data(){
            return {
                formData :{
                    num : 1
                },
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
            minus(){
//                console.log(parseInt(this.formData.num))
                if (this.formData.num>1){
                    this.formData.num--;
                }
            },
            add(){
                this.formData.num++;
            },
            isNum(){
                if (isNaN(parseInt(this.formData.num))){
                    this.formData.num = 1;
                }
            }
        }
    }
</script>
<style scoped>
    textarea {
        max-width: 100%;
    }
    .minus{
        /*padding-right: 0;*/
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .add{
        /*padding-left: 0;*/
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
</style>