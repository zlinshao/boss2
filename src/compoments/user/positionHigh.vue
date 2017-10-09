<template>
    <div>
        <div class="modal fade" id="positionHighAdd">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @clic="closeModel">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">新建上级岗位</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >所属部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" disabled v-model="departmentName">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >当前岗位</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="positionName" disabled>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >上级岗位</label>
                                    <div class="col-lg-10">
                                        <input type="text"class="form-control" placeholder="上级岗位名称" v-model="position">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @clic="closeModel">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd">确定</button>
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
        props : ['position_name','position_id','department_name','department_id'],
        components :{Status},
        data(){
          return {
              configure : [],
              position : '',
              positionId : '',
              positionName : '',
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
              departmentName :'',
              departmentId :'',
          }
        },
        watch : {
            position_id(val){
                this.positionId = val ;
            },
            position_name(val){
                this.positionName = val;
            },
            department_name(val){
                this.departmentName = val;
            },
            department_id(val){
                this.departmentId =  val;
            },
        },
        methods : {
            confirmAdd(){
                this.$http.post('manager/user/position_parent',{
                    vocation : this.position,
                    department_id : this.department_id,
                    id : this.positionId,
                }).then((res) => {
                    if(res.data.code === '90071'){
                        this.$emit('success');
                        this.info.success = res.data.msg;
                        this.info.state_success = true;
                        this.closeModel();
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            closeModel(){
                $('#positionAdd').modal('hide');
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .panel {
         margin-bottom: 0;
    }
    .modal{
        z-index: 1049;
    }
</style>