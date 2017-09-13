<template>
    <div>
        <div class="modal fade questionAdd" id="questionAdd" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">创建任务</h4>
                    </div>
                    <div class="modal-body inbox-body panel">
                        <div class="row">
                            <label class="col-sm-2 control-label">任务类型</label>
                            <div class="col-sm-10">
                                <select  class="form-control">
                                    <option value="">请选择</option>
                                    <option value="">投票</option>
                                    <option value="">问卷</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">标题</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="请输入标题">
                            </div>
                        </div>
                        <div class="row" v-for="key in 3">
                            <label class="col-sm-2 col-xs-12 control-label">问题{{key}}</label>
                            <div class="col-sm-8 col-xs-8">
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle"></i>
                                <i class="fa fa-minus-circle"></i>
                            </div>
                            <div class="col-sm-10 col-xs-8 text-right">
                                <a @click="setOption">设置选项</a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <SetOption></SetOption>
    </div>
</template>

<script>
    import SetOption from './optionSet.vue'
    export default {
        components : {SetOption},
        methods :{
            setOption(){
                $('.optionSet').modal('show');
            }
        }
    }
</script>


<style scoped>
    .flexBox{
        margin:9px 0;
    }
    .flexBox i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        cursor: pointer;
    }
    .flexBox i+i{
        margin-left: 5px;
    }
    .flexBox i:hover{
        color: #999;
    }

    input, select{
        margin: 9px 0;
    }
    label{
        margin-top: 18px;
    }
    @media (max-width: 767px) {
        .modal{
            width: 100%;
        }
    }
    a{
        color :#1caadc;
    }

</style>
