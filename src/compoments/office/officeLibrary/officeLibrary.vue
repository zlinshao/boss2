<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品类型管理</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" v-model="params.parent_id" @change="search(1)">
                                <option value="0">办公用品库</option>
                                <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="类型名称" v-model="params.name" @keydown.enter.prevent="search(1)">
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

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 @click="dele"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">所属库</th>
                            <th class="text-center">名称</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <label :class="{'label_check':true,'c_on':operId===item.id,'c_off':operId!==item.id}"
                                       @click.prevent="changeIndex($event,item.id)">
                                    <input type="checkbox" class="pull-left"
                                           :checked="operId===item.id">
                                </label>
                                <!--<input type="checkbox" :checked="operId===item.id"
                                       @click="changeIndex($event,item.id)">-->
                            </td>
                            <td>{{item.parent_name}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.remarks}}</td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="4" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
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
                            <button type="button" class="close" aria-hidden="true" @click="clearForm">×</button>
                            <h4 class="modal-title">{{modal.title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属库</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" style="margin-bottom: 8px" v-model="formData.parent_id">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                                        </select>
                                        <span class="tip">新增/编辑库时只填写名称即可</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">名称<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remarks"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                            <button type="button" class="btn btn-primary" v-show="modal.isAdd" @click="save">保存</button>
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
        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import Confirm from '../../common/confirm.vue'
    export default{
        components: {Page,Status,Confirm},
        data(){
            return {
                modal : {
                    title : '',
                    isAdd : true,
                },
                operId : 0,

                paging : '',
                beforePage : '',

                myData : [],
                isShow : false,

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

                params:{
                    parent_id : 0,
                    name : '',
                },
                types : [],
                confirmMsg: {
                    msg: '',
                },

                allLibrary : [],
                formData : {
                    parent_id :'',
                    name : '',
                    remarks : ''
                }
            }
        },
        mounted () {
            this.getLibrarys();
            this.getList();
        },
        methods: {
            getList(){
                this.$http.post('manager/management/category_index').then((res)=>{
                    console.log(res.data.data);
                    if (res.data.code==10000){
                        // 成功
                        this.paging = res.data.data.pages;
                        this.myData = res.data.data.data;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.myData = [];
                        this.isShow = true;
                    }
                })
            },
            changeIndex(ev, id){
//                console.log("一开始"+this.operId);
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.operId = id;
//                    console.log(this.operId);
                } else {
                    this.operId = 0;
                }
            },

            /*selectLibrary(){
                this.params.type = '';
                this.$http.post('manager/management/type_all?parent_id='+this.params.parent_id).then((res)=>{
//                    console.log(res.data.data.data);
                    if (res.data.code==10010){
                        // 成功
                        this.types = res.data.data.data;
                    } else {
                        // 失败
                        this.types = [];
                    }
                })
            },*/
            search(val){
                this.filter(val);
            },
            filter(val){
                this.beforePage = val;
                this.operId = 0;
                this.$http.post('manager/management/category_index?pages='+this.beforePage,this.params).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10000){
                        // 成功
                        this.paging = res.data.data.pages;
                        this.myData = res.data.data.data;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.myData = [];
                        this.isShow = true;
                        this.paging = 0;
                        this.page = 1;
                    }
                })
            },

            // 获取所有库
            getLibrarys(){
                this.$http.post('manager/management/library_all').then((res)=>{
//                    console.log(res);
                    if (res.data.code==10010){
                        // 成功
                        this.allLibrary = res.data.data.data;
                    } else {
                        // 失败
                        this.allLibrary = [];
                    }
                })
            },
            addNew(){
                this.modal.title = '新增库/类型';
                this.modal.isAdd = true;
                this.getLibrarys();
                $('#myModal').modal('show');
            },
            oper(){
                this.modal.title = '编辑库/类型';
                this.modal.isAdd = false;
                this.getLibrarys();
                this.$http.post('manager/management/category_details?id='+this.operId).then((res)=>{
                    console.log(res.data.data.data);
                    if (res.data.code==10010){
                        // 成功
                        if (res.data.data.data.parent_id==0){
                        this.formData.parent_id = '';
                        } else {
                            this.formData.parent_id = res.data.data.data.parent_id;
                        }
                        this.formData.name = res.data.data.data.name;
                        this.formData.remarks = res.data.data.data.remarks;
                        $('#myModal').modal('show');
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
//                console.log(this.operId);

            },
            dele(){
                this.confirmMsg.msg = '确定删除该条信息吗？';
                $('#confirm').modal('show');
            },
            clearForm(){
                this.formData.parent_id = '';
                this.formData.name = '';
                this.formData.remarks = '';
                $('#myModal').modal('hide');
            },
            save(){
                this.$http.post('manager/management/category_insert',this.formData).then((res)=>{
                    console.log(res);
                    if (res.data.code==10011){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.clearForm();
                        this.filter(this.beforePage);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            modify(){
                this.$http.post('manager/management/category_update?id='+this.operId,this.formData).then((res)=>{
                    console.log(res);
                    if (res.data.code==10021){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.clearForm();
                        this.getList();
                        this.operId = 0;
//                        this.pitch.splice(0,this.pitch.length);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            getConfirm(){
                this.$http.post('manager/management/category_delete?id='+this.operId).then((res)=>{
//                    console.log(res);
                    if (res.data.code==10031){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.clearForm();
                        this.filter(this.beforePage);
//                        this.pitch.splice(0,this.pitch.length);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
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