<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalTransferDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">调迁部门</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >上级部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" readonly  @click="choose"
                                              placeholder="请选择上级部门" v-model="department_name">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="selectDepartment">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
        <SelectDpm :configure="configure" @Staff="dpmSeleted"></SelectDpm>
    </div>
</template>
<script>
    import Status from '../common/status.vue';
    import SelectDpm from '../common/oraganization.vue'
    export default {
        components: { Status , SelectDpm},
        data(){
            return {
                department_name : '',
                department_id : '',
                configure:[],       //配置项
                info:{
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
        methods:{
            choose(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {type:'department',length: 1};
            },
            dpmSeleted(val){
                this.department_name = val.department[0].name;
                this.department_id = val.department[0].id;
            },
            selectDepartment(){
                if(this.department_id !== ''){
                    this.$emit('TransferDepartment',this.department_id);
                    this.department_name = '';
                    this.department_id = '';
                    $('#myModalTransferDpm').modal('hide');
                }
            }
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