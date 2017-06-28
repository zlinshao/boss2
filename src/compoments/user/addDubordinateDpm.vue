<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalAddDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background: #0be6de">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">新增下级部门</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >部门名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="department">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="responsible">确定</button>
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
        props:['addDpm'],
        components: { Status },
        data(){
            return {
                department:'',
                id:'',
                myAccount:this.addDpm,
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
            addDpm(val) {
                this.myAccount = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
                this.id=this.myAccount;
            },
        },
        methods:{
            responsible(){
                this.$http.post('/manager/department/saveDpm/',{'parent_id':this.id,'name':this.department}).then((res) => {
                    if(res.data.code==10030){
                        this.department='';
                        $('#myModalAddDpm').modal('hide');
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
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-body {
        position: relative;
        padding-top: 30px;
        padding-bottom: 0px;
    }
</style>