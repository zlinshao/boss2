<template>
    <div>
        <div class="modal fade full-width-modal-right" id="edit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" >×</button>
                            <h4 class="modal-title">编辑租房报备</h4>
                        </div>

                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label for="villageName" class="col-sm-2 control-label">小区名称</label>
                                    <div class="col-sm-10">
                                        <input title="请点击选择" type="text" class="form-control" id="villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {},
        methods: {}
    }
</script>