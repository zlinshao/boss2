<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalEditDpm">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background: #0be6de">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑部门</h4>
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
    </div>
</template>
<script>

    export default {
        props:['editDpm'],
        data(){
            return {
                department:'',
                id:'',
                myAccount:this.editDpm
            }
        },
        watch:{
            editDpm(val) {
                this.myAccount = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
                console.log(this.myAccount)
                this.department=this.myAccount.name;
                this.id=this.myAccount.id;
            },
        },
        methods:{
            responsible(){
                this.$http.post('/manager/department/updateDpm/',{'id':this.id,'name':this.department}).then((res) => {
                    alert(res.data.msg)
                    $('#myModalEditDpm').modal('hide');
                })
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>