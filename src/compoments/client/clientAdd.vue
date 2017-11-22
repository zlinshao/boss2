<template>
    <div>

        <!--客户 新增/编辑-->
        <div class="modal fade full-width-modal-right" id="clientAdd" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content roll">
                        <!--新增客户-->
                        <div v-if="btn_state" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增客户</h4>
                        </div>

                        <!--新增/编辑-->
                        <div class="modal-body has-js">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                    <div class="col-lg-10 status1">
                                        <label :class="{'label_radio':true}">
                                            <input type="radio" name="status" value="1"
                                                   class="pull-left">业主
                                        </label>
                                        <label :class="{'label_radio':true}">
                                            <input type="radio" name="status" value="2"
                                                   class="pull-left">租客
                                        </label>
                                        <label :class="{'label_radio':true}">
                                            <input type="radio" name="status" value="3"
                                                   class="pull-left">业主(代理人)
                                        </label>
                                    </div>
                                </div>
                                <hr>

                                <!--客户姓名-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户姓名&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入客户姓名">
                                    </div>
                                </div>
                                <!--尊称-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尊称&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10 status1">
                                        <label :class="{'label_radio':true}">
                                            <input type="radio" name="gender" value="1"
                                                   class="pull-left" >先生
                                        </label>
                                        <label :class="{'label_radio':true}">
                                            <input type="radio" name="gender" value="2"
                                                   class="pull-left">女士
                                        </label>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default">取消</button>

                            <button class="btn btn-success"> 确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>

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

    .modal-content {
        overflow: auto;
    }

    .street select {
        margin-bottom: 10px;
    }

    .error {
        border-color: #E4393C;
    }
</style>
