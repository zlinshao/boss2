<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品管理</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" @change="search(1)">
                                <option value="">办公用品库</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select class="form-control" @change="search(1)">
                                <option value="">类别</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="办公用品名称"
                                   @keydown.enter.prevent="search(1)" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addNew">
                                <i class="fa fa-plus-square"></i>&nbsp;新增办公用品
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
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">办公用品名称</th>
                            <th class="text-center">办公用品类别</th>
                            <th class="text-center">办公用品所属库</th>
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
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">{{modal.title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品名称<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">规格型号<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">登记类型<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>

                                <!--<div class="form-group">
                                    <label class="col-sm-2 control-label">附件上传</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品库<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">计量单位</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品类别<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">cdsd</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单价</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control">
                                    </div>
                                    <label class="col-sm-2 control-label">(元)</label>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品编码</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">供应商</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">当前库存</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">最低警戒库存</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">最高警戒库存</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">创建人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly>
                                    </div>
                                </div>
                                <!--<div class="form-group">
                                    <label class="col-sm-2 control-label">登记权限(用户)</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" readonly></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">登记权限(部门)</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" readonly></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">审批权限(用户)</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" readonly></textarea>
                                    </div>
                                </div>-->

                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" v-show="modal.isAdd" @click="saveAdd">保存</button>
                            <button type="button" class="btn btn-primary" v-show="!modal.isAdd" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import STAFF from  '../../common/organization/selectStaff.vue'
    export default{
        components: {Page,Status,STAFF},
        data(){
            return {
                paging: 1,
                beforePage: 1,

                myData: [],      //列表数据
                isShow: false,

                configure : {},
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

                params : {
                    search : '',
                },

                modal:{
                    title : '',
                    isAdd : true,
                }
            }
        },
        methods: {
            search(val){

            },

            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
            },
            selectDateSend(val){
//                console.log(val);
                for(let i=0;i<val.department.length;i++){
//                    this.selected.push(val.department[i].name);
//                    this.params.department_id.push(val.department[i].id)
                }
                for(let j=0;j<val.staff.length;j++){
//                    this.selected.push(val.staff[j].name);
//                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
            // 点击新增
            addNew(){
                this.modal.title = '新增办公用品';
                this.modal.isAdd = true;
                $('#myModal').modal('show');
            },
            oper(){
                this.modal.title = '编辑办公用品';
                this.modal.isAdd = false;
                $('#myModal').modal('show');
            },
            saveAdd(){

            },
            modify(){

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

</style>