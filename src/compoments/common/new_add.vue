<template>
    <div>
        <!--客户 新增/编辑-->
        <div class="modal fade full-width-modal-right" id="customModel" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <!--新增客户-->
                        <div v-if="btn_state" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增客户</h4>
                        </div>

                        <!--修改客户-->
                        <div v-if="!btn_state" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">修改客户</h4>
                        </div>

                        <!--新增/编辑-->
                        <div v-if="!inter_state" class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                    <div class="col-lg-10 status">
                                        <label><input type="radio" name="status" class="pull-left">业主</label>
                                        <label><input type="radio" name="status" class="pull-left">租客</label>
                                        <label><input type="checkbox" @click="intermediary" class="pull-left">中介</label>
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">基本信息</h3>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="起输入客户姓名">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">手机号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入手机号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">进度</label>
                                    <div class="col-lg-10">
                                        <a data-v-2f43a2b3="" href="#">
                                            <div data-v-2f43a2b3="" class="task-info">
                                                <input v-model="progress" class="percent">{{progress}}%
                                            </div>
                                            <div data-v-2f43a2b3="" class="progress progress-striped active">
                                                <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                                     aria-valuenow="45" role="progressbar" class="progress-bar"
                                                     :style="{ width: progress + '%'}"><span data-v-2f43a2b3=""
                                                                                             class="sr-only">45% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尊称</label>
                                    <div class="col-lg-10 status">
                                        <label>
                                            <input type="radio" name="gender" class="pull-left">先生
                                        </label>
                                        <label>
                                            <input type="radio" name="gender" class="pull-left">女士
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户优先级</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">地址</label>
                                    <div class="col-lg-10">
                                        <div class="form-group street">
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control" placeholder="街道信息">
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">附加信息</h3>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份证号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入身份证号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份照片</label>
                                    <div class="col-lg-10">
                                        <switch-btn :result="'idNum'"></switch-btn>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">婚姻状况</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">QQ</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">邮箱</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">性格</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!--新增中介-->
                        <div v-if="inter_state" class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                    <div class="col-lg-10 status">
                                        <label><input type="radio" name="status" class="pull-left">业主</label>
                                        <label><input type="radio" name="status" class="pull-left">租客</label>
                                        <label><input type="checkbox" @click="intermediary" class="pull-left">中介</label>
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">基本信息</h3>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">中介名称</label>
                                    <div class="col-lgb -10">
                                        <input type="text" class="form-control" placeholder="中介名称">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">联系方式</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="联系方式">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">进度</label>
                                    <div class="col-lg-10">
                                        <a data-v-2f43a2b3="" href="#">
                                            <div data-v-2f43a2b3="" class="task-info">
                                                <input v-model="progress" class="percent">{{progress}}%
                                            </div>
                                            <div data-v-2f43a2b3="" class="progress progress-striped active">
                                                <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                                     aria-valuenow="45" role="progressbar" class="progress-bar"
                                                     :style="{ width: progress + '%'}"><span data-v-2f43a2b3=""
                                                                                             class="sr-only">45% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户优先级</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">地址</label>
                                    <div class="col-lg-10">
                                        <div class="form-group street">
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control" placeholder="街道信息">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button class="btn btn-success" type="button"> 确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import switchBtn from '../role/2.vue'
    export default {
        components: {switchBtn},
        data (){
            return {
                progress: '90',                 //进度
                inter_state: false,             //中介
                btn_state: true,                //新增
            }
        },
        methods: {
            intermediary (){
                this.inter_state = !this.inter_state;
            }
        }

    }
</script>


<style scoped>
    input[type=checkbox], input[type=radio] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    .status {
        padding-top: 7px;
    }

    .status label {
        margin-right: 20px;
    }

    .modal-content {
        overflow: auto;
    }

    .street select {
        margin-bottom: 10px;
    }
</style>
