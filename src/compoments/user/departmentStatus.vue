<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalStartDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background: #0be6de">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">启用部门（账号）</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3>确定启用此部门（账号）吗？</h3>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmStartDpm">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--停用部门-->
        <div class="modal fade" id="myModalSuspendDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background: #0be6de">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">停用部门（账号）</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3>确定停用此部门（账号）吗？</h3>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmServiceDpm">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>
<script>

    export default {
        props:['account'],
        data(){
            return {
                myAccount:this.account
            }
        },
        watch:{
            account(val) {
                this.myAccount = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            },
        },
        methods:{
            confirmStartDpm(){
                this.$http.get('/manager/department/disableDpm/id/'+this.myAccount).then((res) => {
                    $('#myModalStartDpm').modal('hide');
                    alert(res.data.msg);
                })
            },
            confirmServiceDpm(){
                alert(1)
                this.$http.get('/manager/department/disableDpm/id/'+this.myAccount).then((res) => {
                    $('#myModalSuspendDpm').modal('hide');
                    alert(res.data.msg);
                })
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>