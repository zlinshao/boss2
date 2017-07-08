<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="announceDetail">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" style="text-align: center">添加公告</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                    <div class="row">
                                        <b  class="col-sm-2" >标题：</b>
                                        <div class="col-sm-4">
                                            年会
                                        </div>
                                        <b  class="col-sm-2" >选择部门：</b>
                                        <div class="col-sm-4">
                                            行政部
                                        </div>
                                    </div>
                                    <div class="row">
                                        <b  class="col-sm-2" >发布时间：</b>
                                        <div class="col-sm-4">
                                            2017-07-07
                                        </div>
                                        <b  class="col-sm-2" >发布人：</b>
                                        <div class="col-sm-4">
                                            王梦媛
                                        </div>
                                    </div>
                                    <hr>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor error id labore minima repellendus vitae. Aliquam amet autem corporis dignissimos facere iste, nulla placeat quaerat sapiente veniam vero voluptate.
                                    </p>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">收到</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    export default {
        components: {},
        data(){
            return{
            }
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
    padding-bottom: 10px;
}
</style>