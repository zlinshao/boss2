<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalStartDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">启用部门（账号）</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h5>确定启用此部门（账号）吗？</h5>
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
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">停用部门</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h5>确定停用此部门吗？</h5>
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

        <div class="modal fade" id="myModalDeleteDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">停用部门</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h5>确定停用此部门吗？</h5>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmDeleteDpm">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from '../common/status.vue';
    export default {
        props:['Account'],
        components: { Status },
        data(){
            return {

                myAccount:this.Account,
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        watch:{
            Account(val) {
                this.myAccount = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            },
        },
        methods:{
            confirmStartDpm(){
                this.$http.get('manager/department/disableDpm/id/'+this.myAccount.id).then((res) => {
                    if(res.data.code==10010){
                        $('#myModalStartDpm').modal('hide');
                        this.$emit('DdpStatus',this.myAccount);
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }else{
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            confirmServiceDpm(){
                console.log(this.Account)
                this.$http.get('manager/department/disableDpm/id/'+this.myAccount.id).then((res) => {
                    if(res.data.code==10010){
                        $('#myModalSuspendDpm').modal('hide');
                        this.$emit('DdpStatus',this.myAccount);
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }else{
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
            confirmDeleteDpm(){
                this.$http.get('manager/department/softDelete/id/'+this.myAccount.id).then((res) => {
                    if(res.data.code==10090){
                        $('#myModalDeleteDpm').modal('hide');
                        this.$emit('DdpStatus',this.myAccount);
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }else{
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .panel {
        margin-bottom: 0;
    }
</style>