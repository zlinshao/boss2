<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalStart">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">启用账号</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h5>确定启用此账号吗？</h5>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmStart">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--停用部门-->
        <div class="modal fade" id="myModalSuspend">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">停用账号</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h5>确定停用此账号吗？</h5>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmService">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="deleteAcount">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">删除账号</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h5>确定删除此账号吗？</h5>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmDelete">确定</button>
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
        props:['account'],
        components: { Status },
        data(){
          return {
              myAccount:this.account,
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
            account(val) {
                this.myAccount = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            },
        },
        methods:{
            confirmStart(){
                this.$http.get('manager/user/dismiss/id/'+this.myAccount.id).then((res) => {
                    if(res.data.code==90030){
                        $('#myModalStart').modal('hide');
                        this.$emit('Account',this.myAccount);
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
            confirmService(){
                this.$http.get('manager/user/dismiss/id/'+this.myAccount.id).then((res) => {
                    if(res.data.code==90030){
                        $('#myModalSuspend').modal('hide');
                        this.$emit('Account',this.myAccount);
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
            confirmDelete(){
                this.$http.get('manager/user/softDelete/id/'+this.myAccount.id).then((res) => {
                    if(res.data.code==90090){
                        $('#deleteAcount').modal('hide');
                        this.$emit('Account',this.myAccount);
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