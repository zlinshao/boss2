<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>账户管理</li>
        </ol>


        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" v-model="params.cate" @change="search">
                                <option value="">全部</option>
                                <option :value="value" v-for="(key,value) in dict.account_cate">{{key}}</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="账户名称/卡号"  @keydown.enter.prevent="search" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addNew">
                                <i class="fa fa-plus-square"></i>&nbsp;新增账户
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

        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">账户名称</th>
                            <th class="text-center">账户类型</th>
                            <th class="text-center">账号</th>
                            <th class="text-center">开户银行</th>
                            <th class="text-center">支行</th>
                            <th class="text-center">初始金额</th>
                            <th class="text-center">当前余额</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id)">
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{dict.account_cate[item.cate]}}</td>
                            <td>{{item.account_num}}</td>
                            <td>{{dict.bank[item.bank]}}</td>
                            <td>{{item.sub_bank}}</td>
                            <td>{{item.amount_base}}</td>
                            <td>{{item.amount_remain}}</td>
                            <td>{{item.remark}}</td>
                            <!--<td>{{item.accountName}}</td>
                            <td>{{item.bank}}</td>
                            <td>{{item.account}}</td>
                            <td>{{item.startMoney}}</td>
                            <td>{{item.nowMoney}}</td>
                            <td>{{item.remark}}</td>-->
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="9">暂无数据...</td>
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
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" >×</button>
                            <h4 class="modal-title">{{title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">账户名称 <sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">账户类型 <sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.cate">
                                            <option :value="value" v-for="(key,value) in dict.account_cate">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">账号 <sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.account_num">
                                    </div>
                                </div>

                                <div class="form-group" v-show="formData.cate==1">
                                    <label class="col-sm-2 control-label">开户银行 <sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.bank">
                                            <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group" v-show="formData.cate==1">
                                    <label class="col-sm-2 control-label">支行 <sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.sub_bank">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">初始金额 <sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="formData.amount_base" :readonly="!isAdd">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">当前余额</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="formData.amount_base" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remark"></textarea>
                                        <!--<input type="text" class="form-control" v-model="formData.remark">-->
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-show="isAdd" @click="add">保存</button>
                            <button type="button" class="btn btn-primary" v-show="!isAdd" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--分页-->
        <Page :pg="paging" @pag="getPage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>

    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    textarea{
        max-width: 100%;
    }
</style>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import Confirm from '../common/confirm.vue'

    export default{
        components: {Page,Status,Confirm},
        data(){
            return {
                isShow : false,

                dict :{},

                operId : 0,
                paging : 1,
                page : 1,                  // 当前页数

//                modal
                title : '',
                isAdd : true,       // 是否新增

                params : {
                    cate : '',
                    search : ''
                },

                formData : {
                    name : '',
                    cate : 1,
                    account_num : '',
                    bank : '',
                    sub_bank : '',
                    amount_base : '',
                    account_remain : '',
                    remark : ''
                },
                myData: [],      //列表数据
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        this.accountList();
                    }
                );

        },
        watch : {
            'formData.cate' : {
                handler(curVal,oldVal){
//                    console.log(curVal)
                    if (curVal!=1){
                        this.formData.bank = '';
                        this.formData.sub_bank = '';
                    }
                }
            }
        },
        methods : {
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }
            },
            accountList(){
                this.$http.get('account/manage').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res);
                    if (res.data.code==18400){
                        // 成功
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.isShow = true;
                    }
                })
            },

            search(){
//                console.log(this.params);
                this.page = 1;
//                this.params['page'] = 1;
                this.operId = 0;
                this.filter();
            },
            filter(){
                this.$http.get('account/manage?page='+this.page,{
                    params : this.params
                })
                    .then(
                        (res) => {
                            if (res.data.code==18400){
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.isShow = false;
                            } else {
                                this.myData = [];
                                this.paging = 1;
                                this.isShow = true;
                            }
                        }
                    )
            },

            clearForm(){

                this.formData.name = '';
                this.formData.cate = 1;
                this.formData.account_num = '';
                this.formData.bank = '';
                this.formData.sub_bank = '';
                this.formData.amount_base = '';
                this.formData.account_remain = '';
                this.formData.remark = '';

                this.operId = 0;
                $('#myModal').modal('hide');
            },

            addNew(){
                // 新增
                this.title = '新增账户';
                this.isAdd = true;

                $('#myModal').modal('show');
                // 新增成功后调用
//                that.clearForm();

            },
            oper(){
                console.log(this.operId);
                this.title = '编辑账号';
                this.isAdd = false;
                // 先请求

                this.$http.get('account/manage/'+this.operId)
                    .then(
                        (res) => {
                            if (res.data.code==18400){
                                // 成功
                                let val = res.data.data;
                                console.log(val)
                                this.formData.name = val.name;
                                this.formData.cate = val.cate;
                                this.formData.account_num = val.account_num;
                                this.formData.bank = val.bank;
                                this.formData.sub_bank = val.sub_bank;
                                this.formData.amount_base = val.amount_base;
                                this.formData.account_remain = val.account_remain;
                                this.formData.remark = val.remark;
                                $('#myModal').modal('show');
                            } else {

                            }
                        }
                    )
//                请求成功打开模态框

//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/
            },

            add(){
                this.formData.account_remain = this.formData.amount_base;
//                console.log(this.formData);
                this.$http.post('account/manage',this.formData)
                    .then(
                        (res)=> {
                            if (res.data.code==18410){
                                // 成功
                                this.info.success = '新增账户成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.clearForm();
                                this.search();
                            } else {
                                // 失败
                                this.info.error = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_error = false;
                                }, 2000);
                            }
                        }
                    )
            },
            modify(){
                this.formData.account_remain = this.formData.amount_base;
//                console.log(this.formData);
                this.$http.put('account/manage/'+this.operId,this.formData)
                    .then(
                        (res)=> {
//                            console.log(res.data)
                            if (res.data.code==18410){
                                // 成功
                                this.info.success = '修改账户成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
//                                this.clearForm();
                                this.operId = 0;
                                this.accountList();
                            } else {
                                // 失败
                                this.info.error = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_error = false;
                                }, 2000);
                            }
                        }
                    )
            },
            dele(){
                this.confirmMsg.id = this.operId;
                this.confirmMsg.msg = '确定删除该条账户信息吗？';
                $('#confirm').modal('show');
            },

            getPage(data){
                // 获取页数
                console.log(data);
                this.page = data;
            },

            getConfirm(){
//                alert(1);
                this.$http.get('account/manage/delete/'+this.operId)
                    .then(
                        (res) => {
                            console.log(res.data.code);
                            if (res.data.code==18410){
                                // 成功
                                this.info.success = '删除账户成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.clearForm();
                                this.accountList();
                            } else {
                                // 失败
                                this.info.error = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_error = false;
                                }, 2000);
                            }
                        }
                    )
            }

        }
    }
</script>