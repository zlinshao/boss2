<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>
                <router-link to="/officeSupplies">办公用品管理</router-link>
            </li>
            <li>办公用品详情</li>
            <li class="pull-right" v-show="typeof params!='string'">
                <router-link :to="{path:'/officeSupplies',query:{myParam:params,page:page}}"><i class="fa fa-angle-double-left"></i> 返回上一步</router-link>
            </li>
        </ol>


        <section class="panel head">
            <div class="panel-body">
                <div class="clearFix" v-if="msg!=''">
                    <span>办公用品名称</span>
                    <span>{{msg.name}}</span>
                    <div class="pull-right">
                        <button class="btn btn-primary" @click="dele">删除</button>
                        <!--<button class="btn btn-primary" data-toggle="modal" data-target="#applySupply">申领</button>-->
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;办公用品信息
                        <a class="pull-right fa fa-pencil-square-o" @click="oper"></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info" v-if="msg!=''">
                    <div class="col-md-12 clearFix">
                        <div class="col-md-4">
                            <div class="list"><span class="text-primary">规格型号：</span><span>{{msg.type_num}}</span></div>
                            <div class="list"><span class="text-primary">所属库：</span><span>{{msg.library_name}}</span></div>
                            <div class="list"><span class="text-primary">类别：</span><span>{{msg.category_name}}</span></div>
                            <div class="list"><span class="text-primary">登记类型：</span><span>{{dict.register_type[msg.register_type]}}</span></div>
                            <div class="list"><span class="text-primary">计量单位：</span><span>{{dict.measurement_unit[msg.measurement_unit]}}</span></div>
                            <div class="list"><span class="text-primary">单价：</span><span>{{msg.price}}</span></div>
                            <div class="list"><span class="text-primary">编码：</span><span>{{msg.code}}</span></div>
                        </div>
                        <div class="col-md-8">
                            <div class="list"><span class="text-primary">供应商：</span><span>{{msg.supplier}}</span></div>
                            <div class="list"><span class="text-primary">总库存：</span><span>{{msg.inventory}}</span></div>
                            <div class="list"><span class="text-primary">现有库存：</span><span>{{msg.existing_inventory}}</span></div>
                            <div class="list"><span class="text-primary">警戒库存：</span><span>{{msg.alert_inventory}}</span></div>
                            <div class="list"><span class="text-primary">最高库存：</span><span>{{msg.highest_inventory}}</span></div>
                            <div class="list"><span class="text-primary">添加人：</span><span>{{msg.staff_name}}</span></div>
                            <div class="list"><span class="text-primary">备注：</span><span>{{msg.remarks}}</span></div>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <!--modal-->
        <div class="modal fade full-width-modal-right" id="edit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" @click="clearForm">×</button>
                            <h4 class="modal-title">编辑办公用品</h4>
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
                                    <label class="col-sm-2 control-label">登记类型</label>
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
                                        <select class="form-control" v-model="form.parent_id">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">计量单位<sup class="required">*</sup></label>
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
                                    <label class="col-sm-2 control-label">总库存<sup class="required">*</sup></label>
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
                            <button type="button" class="btn btn-primary" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <ApplySupply :officeId="id"></ApplySupply>
    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    import Confirm from '../../common/confirm.vue'
    import ApplySupply from '../applySupply.vue'
    export default{
        components: {Status,Confirm,ApplySupply},
        data(){
            return {
                id : '',
                params : {},
                page : '',
                dict : {},
                msg : '',
                resData : '',
                confirmMsg: {
                    msg: '',
                },
                allLibrary :[],
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
                },
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
        mounted(){
            this.id = this.$route.query.officeId;
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.getLibrarys();
            this.getStaff();
            console.log(this.params)
            // 获取字典
            this.$http.get('manager/management/dict').then((res)=>{
                this.dict = res.data.management;
                this.getDetails();
            })
        },
        watch:{
            /*'form.parent_id':{
                handler(val){
                    this.selectLibrary();
                }
            }*/
        },
        methods: {
            getDetails(){
                this.$http.post('manager/management/inventory_details?id='+this.id).then((res)=>{
//                    console.log(res.data);
//                    if (res.data.code==10020){
                        // 成功
                    this.msg = res.data.data.data;
                    this.resData = res.data.data;
//                    }
                })
            },

            // 获取登录人
            getStaff(){
                this.$http.get('staff/info').then((res)=>{
                    this.form.staff = res.data.name
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
            oper(){
//                        console.log(val);
                this.form.parent_id = this.msg.library_id;

                this.allLibrary = this.resData.library;
                this.form.types = this.resData.type;
                this.formData.name = this.msg.name;
                this.formData.type_num = this.msg.type_num;
                this.formData.register_type = this.msg.register_type;
                this.formData.measurement_unit = this.msg.measurement_unit;
                this.formData.category_id = this.msg.category_id;
                this.formData.price = this.msg.price;
                this.formData.code = this.msg.code;
                this.formData.supplier = this.msg.supplier;
                this.formData.inventory = this.msg.inventory;
                this.formData.alert_inventory = this.msg.alert_inventory;
                this.formData.highest_inventory = this.msg.highest_inventory;
//                        this.formData.scrap_number = val.scrap_number;
                this.formData.remarks = this.msg.remarks;
                $('#edit').modal('show');
            },
            clearForm(){
                this.formData.name = '';
                this.formData.type_num = '';
                this.formData.register_type = '';
                this.formData.measurement_unit = '';
                this.formData.category_id = '';
                this.formData.price = '';
                this.formData.code = '';
                this.formData.supplier = '';
                this.formData.inventory = '';
                this.formData.alert_inventory = '';
                this.formData.highest_inventory = '';
//                this.formData.scrap_number = '';
                this.formData.remarks = '';

                this.form.parent_id = '';
                $('#edit').modal('hide');
            },
            modify(){
                this.$http.post('manager/management/inventory_update?id='+this.id,this.formData).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10041){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.clearForm();
                        this.getDetails();
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
            // 删除
            getConfirm(){
                this.$http.post('manager/management/inventory_delete?id='+this.id).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10041){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.$router.replace({ path: '/officeSupplies'});
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
    .head .panel-body>div span{
        display: inline-block;
        font-weight: bold;
        line-height: 34px;
        /*vertical-align: middle;*/
    }
    .head .panel-body>div span+span{
        margin-left: 12px;
    }
    .head .panel-body>div span.status{
        color: white;
        font-weight: normal;
        font-size: 12px;
    }

    header h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    header h4 > a {
        margin-left: 10px;
    }

    .client_info div.list{
        margin-bottom: 20px;
    }

    .client_info div.list span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
    .client_info div.list span img{
        cursor: pointer;
        width: 120px;
        height: 120px;
    }
    .client_info div.list span img+img{
        margin-left: 10px;
    }

    .client_info div.list span a{
        margin-left: 12px;
        font-size: 8px;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>