<template>
    <div>
        <!--查看 备注-->
        <div class="modal fade " id="salaryRemark" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">查看备注</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">备注内容</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" :value="look" readonly></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-primary" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['look'],
        data (){
            return {}
        },
        methods: {}
    }
</script>


<style scoped>

</style>
