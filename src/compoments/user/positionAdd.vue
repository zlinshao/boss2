<template>
    <div>
        <div class="modal fade" id="positionAdd">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">新增职位</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="department_name"
                                              readonly placeholder="点击选择职位" @click="selectDpm">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >职位名称</label>
                                    <div class="col-lg-10">
                                        <input type="text"class="form-control" v-model="position" placeholder="职位名称">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
        <Department :configure='configure' @Staff="getDepartment"></Department>
    </div>
</template>
<script>
    import Status from '../common/status.vue';
    import Department from '../common/organization/selectStaff.vue'
    export default {
        components: { Status ,Department},
        data(){
          return {
              configure : [],
              department_name : '',
              department_id : '',
              position : '',
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
          }
        },
        methods : {
            selectDpm(){
                this.configure = {length :1,class : 'department',id : []}
                $('.selectCustom:eq(0)').modal('show');
            },
            getDepartment(val){
                this.department_name = val.department[0].name;
                this.department_id = val.department[0].id;
            },
            confirmAdd(){
                this.$http.post('manager/user/position_insert',{
                    vocation : this.position,
                    department_id : this.department_id
                }).then((res) => {
                    if(res.data.code === '90045'){
                        this.$emit('success')
                        this.info.success = res.data.msg;
                        this.info.state_success = true;
                        $('#positionAdd').modal('hide');
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
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
    .modal{
        z-index: 1049;
    }
</style>