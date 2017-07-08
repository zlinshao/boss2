<template>
    <!--分配-->
    <div>
        <div class="modal fade " id="distribution" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!--客户派发-->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">客户派发</h4>
                    </div>

                    <!--客户派发-->
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled v-model="msg">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">派发对象</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="请输入姓名">
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button class="btn btn-success" type="button"> 确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        props: ['msg']
    }
</script>


<style scoped>

</style>
