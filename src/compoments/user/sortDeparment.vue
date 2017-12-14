<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalSortDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">部门排序</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >部门名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" readonly v-model="department_name">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label col-lg-2" >部门顺序</label>
                                    <div class="col-lg-10">
                                        <input type="number" class="form-control" placeholder="请输入数字"
                                               v-model="sort" min="1" style="margin-bottom: 0">
                                        <a style="margin-top: 5px;display: inline-block;">
                                            数字越大排序，越靠后，请合理填写数字
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmSort">确定</button>
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
        components: { Status },
        props:['department_name','department_id'],
        data () {
            return {
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
                sort:'',
            }
        },
        methods:{
            confirmSort(){
                this.$http.put('manager/department/department_sort/id/'+this.department_id+'/sort/'+this.sort).then((res) => {
                    if(res.data.code==='10081'){
                        $('#myModalSortDpm').modal('hide');
                        this.sort = '';
                        this.$emit('sortDdp');
                        this.info.success = res.data.msg;
                        this.info.state_success = true;
                    }else{
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

</style>