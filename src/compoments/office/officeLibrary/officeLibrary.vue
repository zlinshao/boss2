<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品类型管理</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select name="" class="form-control">
                                <option value="">所有库</option>
                                <!--<option :value="value" v-for="(key,value) in dict.subject_root">{{key}}</option>-->
                            </select>
                        </div>
                        <div class="input-group">
                            <select name="" class="form-control">
                                <option value="">所有类型</option>
                                <!--<option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>-->
                            </select>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="类型名称"  @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addNew">
                                <i class="fa fa-plus-square"></i>&nbsp;新增库/类型
                            </a>
                        </div>
                    </form>
                </div>

                <div class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">所属库</th>
                            <th class="text-center">类型名称</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">
                            <td>
                                <input type="checkbox">
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" data-dismiss="modal">×</button>
                            <h4 class="modal-title">{{modal.title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属库</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" style="margin-bottom: 8px">
                                            <option value="">--请选择--</option>
                                            <option value="1">ddd</option>
                                        </select>
                                        <span class="tip">新增所属库时只填写名称即可</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">名称<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" v-show="modal.isAdd">保存</button>
                            <button type="button" class="btn btn-primary" v-show="!modal.isAdd">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                modal : {
                    title : '',
                    isAdd : true
                }
            }
        },
        methods: {
            search(val){

            },
            addNew(){
                this.modal.title = '新增库/类型';
                this.modal.isAdd = true;
                $('#myModal').modal('show');
            },
            oper(){
                this.modal.title = '编辑库/类型';
                this.modal.isAdd = false;
                $('#myModal').modal('show');
            }
        }
    }
</script>
<style scoped>
    tbody tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }
    textarea {
        max-width: 100%;
    }
    span.tip{
        color: #667fa0;
        /*display: block;*/
        /*text-align: center;*/
    }
</style>