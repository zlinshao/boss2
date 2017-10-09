<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="memorandumEdit">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">修改备忘录</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal tasi-form">
                            <div class="row">
                                <label class="col-sm-3 control-label" >创建时间</label>
                                <div class="col-sm-9 ">
                                    <input type="text" class="form-control" v-model="createTime" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-3 control-label" >上次修改时间</label>
                                <div class="col-sm-9 ">
                                    <input type="text" class="form-control" v-model="updateTime" readonly>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-3 control-label">修改备忘录</label>
                                <div class="col-sm-9 ">
                                    <textarea class="form-control" v-model="preContent" cols="50" ROWS="5"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click = "reviseMemo">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from '../common/status.vue';
    export default{
        props:['contractId'],
        components:{Status},
        data(){
            return {
                MemorandumId :'',
                preContent:'',
                createTime:'',
                updateTime:'',
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
        watch:{
            contractId(val){
                this.MemorandumId = val;
                if(val !== 0){
                    this.edtiMemorandum(val);
                }
            }
        },
        methods : {
            edtiMemorandum(id){
                this.$http.get('core/memo/readmemo/id/' + id).then((res) =>{
                    this.preContent = res.data.data.content;
                    this.createTime = res.data.data.create_time;
                    this.updateTime = res.data.data.update_time;
                })
            },
            reviseMemo(){
                this.$http.post('core/memo/updatememo',{
                    id:this.MemorandumId,
                    content:this.preContent,
                }).then((res) =>{
                    if(res.data.code === '30020'){
                        this.$emit('MemoUpdate','yes');
                        $('#memorandumEdit').modal('hide');
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
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
<style scoped>
    .lightGray{
        background-color: #F2F2F2;
    }
    b{
        margin-left: 18px;
    }
</style>