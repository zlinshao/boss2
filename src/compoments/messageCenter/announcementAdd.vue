<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="announcementAdd">
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
                                <form class="form-horizontal tasi-form">
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >标题</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="标题">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >选择部门</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="选择部门" readonly @click="selectDep">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label col-sm-2">内容</label>
                                        <div class="col-sm-10 ">
                                            <textarea class="form-control" name="editor1" rows="6"></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">添加</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <DepartmentSelect :configure="configure"></DepartmentSelect>
    </div>
</template>

<script>
    import DepartmentSelect from '../common/organization/selectStaff.vue';
    export default {
        components: { DepartmentSelect },
        data(){
            return{
                configure:[],
            }
        },
        methods:{
            selectDep(){
                $('#selectCustom').modal('show');
                this.configure={type:'department',class:'selectType'};
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>