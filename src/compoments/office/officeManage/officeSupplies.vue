<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品管理</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">

                        <div class="input-group">
                            <select class="form-control" v-model="params.library_id" @change="changeLibrary">
                                <option value="">办公用品库</option>
                                <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="input-group" v-show="params.library_id!=''">
                            <select class="form-control" @change="search(1)" v-model="params.category_id">
                                <option value="">办公用品类型</option>
                                <option :value="item.id" v-for="item in types">{{item.name}}</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="办公用品名称"
                                   @keydown.enter.prevent="search(1)" v-model="params.name">
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

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 @click="apply"><a><i class="fa fa-file-text-o"></i>&nbsp;申领</a></h5>
                        </li>
                        <li>
                            <h5 @click="dele"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
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
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id"
                                       @click="changeIndex($event,item.id)">
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.category_name}}</td>
                            <td>{{item.library_name}}</td>
                            <td>{{item.remarks}}</td>
                            <td>
                                <router-link :to="{path:'/officeDetail',query: {officeId: item.id,page:beforePage,myParams:params}}">详情</router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="6" class="text-center text-muted">
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
                                    <label class="col-sm-2 control-label">办公用品名称<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">规格型号</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.type_num">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">登记类型<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control"  v-model="formData.register_type">
                                            <option value="">--请选择--</option>
                                            <option :value="value" v-for="(key,value) in dict.register_type">{{key}}</option>
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
                                        <select class="form-control" v-model="form.parent_id" @change="selectLibrary">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">计量单位</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.measurement_unit">
                                            <option value="">--请选择--</option>
                                            <option :value="value" v-for="(key,value) in dict.measurement_unit">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品类别<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.category_id">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in form.types">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单价<sup class="required">*</sup></label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="formData.price">
                                    </div>
                                    <label class="col-sm-2 control-label">(元)</label>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品编码</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.code">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">供应商</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.supplier">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">当前库存<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.inventory">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">最低警戒库存</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.alert_inventory">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">最高警戒库存</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.highest_inventory">
                                    </div>
                                </div>
                                <!--<div class="form-group">
                                    <label class="col-sm-2 control-label">报废数量</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.scrap_number">
                                    </div>
                                </div>-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">创建人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly v-model="form.staff">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remarks"></textarea>
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
                            <button type="button" class="btn btn-default" @click="clearForm">取消</button>
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
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <ApplySupply :officeId="applyId"></ApplySupply>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import Confirm from '../../common/confirm.vue'
    import ApplySupply from '../applySupply.vue'
    export default{
        components: {Page,Status,Confirm,ApplySupply},
        data(){
            return {
                applyId : '',

                operId : 0,
                dict : {},
                paging: 1,
                beforePage: 1,

                myData: [],      //列表数据
                isShow: false,

                confirmMsg: {
                    msg: '',
                },
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
                    library_id : '',
                    category_id : '',
                    name : ''
                },

                modal:{
                    title : '',
                    isAdd : true,
                },

                allLibrary : [],
                types : [],
                form : {
                    parent_id : '',
                    types : [],
                    staff : ''
                },
                formData:{
                    name : '',
                    type_num : '',          //规格型号
                    register_type : '',     // 登记类型
                    measurement_unit : '',  // 计量单位
                    category_id : '',       // 类型id
                    price : '',             // 价格
                    code : '',              // 编码
                    supplier : '',          // 供应商
                    inventory : '',         // 总库存
                    alert_inventory : '',   // 警戒库存
                    highest_inventory : '', // 最高库存
//                    scrap_number : '',      // 报废数量
                    remarks : '',           // 备注
                }
            }
        },
        created(){
            this.getLibrarys();
        },
        mounted () {
            this.$http.get('manager/management/dict').then((res)=>{
//                    console.log(res);
                this.dict = res.data.management;
            });
            this.getList();
            this.getStaff();
        },
        watch:{
            /*'form.parent_id':{
                handler(val){
                    this.selectLibrary();
                }
            },*/
            /*'params.library_id':{
                handler(val){
                    this.params.category_id = '';
                    if (val==''){
                        this.types = [];
                        return;
                    }
                    this.changeLibrary();
                    /!*this.$http.post('manager/management/type_all?parent_id='+this.params.library_id).then((res)=>{
//                    console.log(res.data.data.data);
                        if (res.data.code==10010){
                            // 成功
                            this.types = res.data.data.data;
                        } else {
                            // 失败
                            this.types = [];
                        }
                    })*!/
                }
            }*/
        },
        methods: {
            getList(){
                this.$http.post('manager/management/inventory_index').then((res)=>{
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
                if (ev.currentTarget.checked) {
                    this.operId = id;
//                    console.log(this.operId);
                } else {
                    this.operId = 0;
                }
            },
            search(val){
                this.filter(val);
            },
            filter(val){
                this.beforePage = val;
                this.operId = 0;
                this.$http.post('manager/management/inventory_index?pages='+this.beforePage,this.params).then((res)=>{
//                    console.log(res.data);
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

//            获取登录人
            getStaff(){
                this.$http.get('staff/info').then((res)=>{
//                    console.log(res);
                    this.form.staff = res.data.name
                })
            },

            // 获取所有库
            getLibrarys(){
                let params = this.$route.query.myParam;
                let page = this.$route.query.page;
                this.$http.post('manager/management/library_all').then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10010){
                        // 成功
                        this.allLibrary = res.data.data.data;
                    } else {
                        // 失败
                        this.allLibrary = [];
                    }
                    let _this = this;
                    if (page!=undefined){
                        this.beforePage = page;
                        if (params!=undefined&&typeof params!='string'){
//                                this.currentDate = [];
                            this.params.library_id = params.library_id;
                             this.params.name = params.name;
                             setTimeout(function () {
                                 _this.params.category_id = params.category_id;
//                                 alert(params.category_id)
                             },200)
                        }
                        setTimeout(_this.filter(_this.beforePage),300);
                    }
                })
            },
            selectLibrary(){
                this.formData.category_id = '';
                if (this.formData.parent_id==''){
                    this.form.types = [];
                    return;
                }
                this.$http.post('manager/management/type_all?parent_id='+this.form.parent_id).then((res)=>{
                    if (res.data.code==10010){
                        console.log(res.data.data.data);
                        // 成功
                        this.form.types = res.data.data.data;
//                        alert(2)
                    } else {
                        // 失败
                        this.form.types = [];
                    }
                })
            },
            changeLibrary(){
                this.params.category_id = '';
                if (this.params.library_id==''){
                    this.types = [];
                    return;
                }
                this.$http.post('manager/management/type_all?parent_id='+this.params.library_id).then((res)=>{
//                    console.log(res.data.data.data);
                    if (res.data.code==10010){
                        // 成功
                        this.types = res.data.data.data;
                    } else {
                        // 失败
                        this.types = [];
                    }
                });
                this.search(1);
            },
            // 点击新增
            addNew(){
                this.modal.title = '新增办公用品';
                this.modal.isAdd = true;
                this.getLibrarys();
                $('#myModal').modal('show');
            },
            oper(){
                this.modal.title = '编辑办公用品';
                this.modal.isAdd = false;
                this.getLibrarys();
                this.$http.post('manager/management/inventory_details?id='+this.operId).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10020){
                        // 成功
                        let val = res.data.data.data;
//                        console.log(val);
                        this.form.parent_id = val.library_id;
//                        alert(1);
                        this.allLibrary = res.data.data.library;
                        this.form.types = res.data.data.type;
                        this.formData.name = val.name;
                        this.formData.type_num = val.type_num;
                        this.formData.register_type = val.register_type;
                        this.formData.measurement_unit = val.measurement_unit;
                        this.formData.price = val.price;
                        this.formData.code = val.code;
                        this.formData.supplier = val.supplier;
                        this.formData.inventory = val.inventory;
                        this.formData.alert_inventory = val.alert_inventory;
                        this.formData.highest_inventory = val.highest_inventory;
                        this.formData.remarks = val.remarks;
                        this.formData.category_id = val.category_id;


                        $('#myModal').modal('show');
                        console.log(this.formData)


                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })

            },
            dele(){
                this.confirmMsg.msg = '确定删除该用品吗？';
                $('#confirm').modal('show');
            },
            clearForm(){
                this.formData.name = '';
                this.formData.type_num = '';
                this.formData.register_type = '';
                this.formData.measurement_unit = '';
                this.form.parent_id = '';
//                this.formData.category_id = '';
                this.formData.price = '';
                this.formData.code = '';
                this.formData.supplier = '';
                this.formData.inventory = '';
                this.formData.alert_inventory = '';
                this.formData.highest_inventory = '';
//                this.formData.scrap_number = '';
                this.formData.remarks = '';

                $('#myModal').modal('hide');
            },
            saveAdd(){
                console.log(this.formData);
                this.$http.post('manager/management/inventory_insert',this.formData).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10041){
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
                this.$http.post('manager/management/inventory_update?id='+this.operId,this.formData).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10041){
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
            // 删除
            getConfirm(){
                this.$http.post('manager/management/inventory_delete?id='+this.operId).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10041){
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
            apply(){
                this.applyId = this.operId;
                $('#applySupply').modal('show');
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