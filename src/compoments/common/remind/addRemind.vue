<template>
    <div>
        <div class="modal fade" id="addRemind">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title">添加提醒</h5>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label col-sm-2">内容</label>
                                        <div class="col-sm-10 ">
                                            <textarea class="form-control" name="editor1" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-sm-2">内容</label>
                                        <div class="col-sm-4 ">
                                            <select class="form-control">
                                                <option value="">请选择</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4 ">
                                            <a class="btn btn-white" style="border: none" @click="Advanced">高级选项+</a>
                                        </div>
                                    </div>
                                    <div class="row" v-if="isAdvanced">
                                        <label class="col-sm-2 control-label col-sm-2"></label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text"
                                                   class="form-control form_datetime" placeholder="日期">
                                        </div>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text"
                                                   class="form-control form_datetime" placeholder="时间">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary">添加</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>
<script>
    export default{
        data(){
          return{
              isAdvanced:false,
              remindTime:''
          }
        },
        updated(){
            this.remindData();
        },
        methods:{
            Advanced(){
                this.isAdvanced=!this.isAdvanced;
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    this.remindTime = ev.target.value;
                }.bind(this));
            },
        }
    }
</script>