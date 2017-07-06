<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">账号管理</li>
        </ol>

        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" v-show="operId==0" role="form">
                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="账户名称/卡号"  @keydown.enter.prevent="search">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                </div>
                <div class="form-group pull-right">
                    <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addNew">
                        <i class="fa fa-plus-square"></i>&nbsp;新增账号
                    </a>
                </div>
            </form>

            <div class="choosed" v-show="operId!=0">
                <ul class="clearFix">
                    <li><a>已选中&nbsp;1&nbsp;项</a></li>
                    <li>
                        <a @click="oper">编辑</a>
                    </li>
                </ul>
            </div>
        </div>



        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">账户名称</th>
                        <th class="text-center">开户银行</th>
                        <th class="text-center">账户</th>
                        <th class="text-center">初始金额</th>
                        <th class="text-center">当前余额</th>
                        <th class="text-center">备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="item in cont.myData">
                        <td>
                            <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id)">
                        </td>
                        <td>{{item.accountName}}</td>
                        <td>{{item.bank}}</td>
                        <td>{{item.account}}</td>
                        <td>{{item.startMoney}}</td>
                        <td>{{item.nowMoney}}</td>
                        <td>{{item.remark}}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>



        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clearForm"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>

                    <div class="modal-body clearFix">

                        <div class="form-group">
                            <label class="col-sm-3 control-label">账户名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="pramas.name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">开户行:</label>
                            <div class="col-sm-8">
                                <div class="dropdown">
                                    <select name="" class="form-control" v-model="pramas.bank">
                                        <option value="0">无</option>
                                        <option value="1">中国工商银行</option>
                                        <option value="2">中国农业银行</option>
                                        <option value="3">中国银行</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">账户:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="pramas.account">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">初始金额:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control" v-model="pramas.initialMoney">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">当前余额:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control" v-model="pramas.nowMoney">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">备注:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="pramas.remark">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-show="isAdd">保存</button>
                        <button type="button" class="btn btn-primary" v-show="!isAdd">修改</button>
                        <button type="button" class="btn btn-primary" v-show="!isAdd" data-toggle="modal" data-target="#delete">删除</button>
                    </div>
                </div>
            </div>
        </div>

        <Delete :msg="cont" @yes="getData"></Delete>

        <!--分页-->
        <Page :pg="paging" @pag="getPage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>
    .pull-right{
        /*padding-top: 5px;*/
    }
    label{
        line-height: 34px;
    }
    .choosed{
        /*padding-bottom: 10px;*/
    }
    .choosed ul li{
        float: left;
    }
    .choosed ul li+li:before{
        content: '|';
        display: inline-block;
        margin: 0 10px;
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>
<script>
    import Delete from '../common/delete.vue'
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';


    export default{
        data(){
            return {
                operId : 0,
                paging : '',
                page : 1,                  // 当前页数

//                modal
                title : '',
                isAdd : true,       // 是否新增

                pramas : {
                    name : '',
                    bank : 0,
                    account : '',
                    initialMoney : '',
                    nowMoney : '',
                    remark : ''
                },
                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        created (){
            this.accountList();
        },
        components: {Delete,Page,Status},
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
                this.$http.get('json/account.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.cont.myData = res.data.data.accountList;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })
            },
            search(){

            },
            addNew(){
                // 新增
                this.title = '新增账号';
                this.isAdd = true;
                let that = this;

                // 新增成功后调用
//                that.clearForm();

            },
            operation(id,index){
                // 编辑
                this.title = '编辑账号';
                this.isAdd = false;

                this.cont.nowIndex = index;
                console.log(id);

                let that = this;

                // 编辑成功后调用
//                that.clearForm();
            },
            clearForm(){
                $('#myModal').find('input').val('');
                $('#myModal').find('select').val('');

                $('#myModal').modal('hide');
            },
            getData(data){
                // 确认删除
//                this.cont.myData.splice(this.cont.nowIndex, 1);

            },
            getPage(data){
                console.log(data);
            },
            oper(){
                console.log(this.operId);
                this.title = '编辑账号';
                this.isAdd = false;
                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/
            }
        }
    }
</script>