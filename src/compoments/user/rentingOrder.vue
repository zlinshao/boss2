<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li>订单管理</li>
            <li class="active">租房</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div>
                    <div class="form-inline"  v-if="distribute.length<1">
                        <div class="form-group">
                            <label for="search" style="font-weight: bold">查 询</label>
                            <input type="text" class="form-control" id="search" placeholder="点击查询"
                                   v-model="selected"   @click='select' readonly>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="房屋地址搜索"
                                   v-model="keywords"  @keydown.enter="keywordSearch">
                        </div>
                        <button class="btn btn-primary" @click="keywordSearch">搜索</button>
                    </div>
                    <!--选中-->
                    <div class="col-lg-12 remind" v-if="distribute.length>0">
                        <ul>
                            <li>
                                <h5><a>已选中&nbsp;{{distribute.length}}&nbsp;项</a></h5>
                            </li>
                            <li>
                                <h5 @click="distribution"><a><i class="fa fa-sitemap"></i>&nbsp;分配</a></h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!--客户列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center" @click="pickedAll($event)">
                                <input id="allCheck" type="checkbox" class="pull-left"
                                      v-model="allCheck" @click="pickedAll($event)">
                                <label for="allCheck"></label>
                            </th>
                            <th class="text-center">合同编号</th>
                            <th class="text-center">上传时间</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">业主姓名</th>
                            <th class="text-center">地址手机号</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">所属部门</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in orderList" :class="{'selected': distribute.indexOf(item.id)>-1}">
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left" :value="item.id"
                                       v-model='checkboxModel' @click="picked(item.id,$event)">
                            </td>
                            <td class="text-center">{{item.contract_num}}</td>
                            <td class="text-center">{{item.create_time}}</td>
                            <td class="text-center">{{item.drawer}}</td>
                            <td class="text-center">{{item.name}}</td>
                            <td class="text-center">{{item.phone}}</td>
                            <td class="text-center">{{item.address}}</td>
                            <td class="text-center">{{item.department}}</td>
                        </tr>
                        <tr v-show="isShow">
                            <td colspan="12" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <!--分页-->
        <Page :pg="pages" @pag="pageSearch"></Page>
        <Organize :configure="configure" @Staff="isSelect"></Organize>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Organize from  '../common/organization/selectStaff.vue'
    import Status from '../common/status.vue'
    export default {
        components: {Page,Organize,Status},
        data (){
            return {
                pages:'',   //总页数
                configure:[],//配置项
                configureType:'',//配置类型
                selected:[],   //选中部门和员工
                departmentId:[], //选中部门的Id
                staffId:[], //选中员工的Id
                orderList:[], //收房列表
                distribute:[],//分配id
                allId:[],
                checkboxModel:[],//多选框状态
                checkbox:[],    //
                page:'',
                keywords:'',
                distributeDpm:'',
                allCheck:'',
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
                isShow:false,
            }
        },
        mounted(){
            this.orderLIstSearch();
        },
        methods: {
            orderLIstSearch(){
                this.$http.post('manager/move_rent_order/rentorderlist',
                    {
                        'department_id' : this.departmentId,
                        'page' : this.page,
                        'keywords' : this.keywords,
                        'staff_id' :this.staffId,
                    }).then((res) => {
                    if(res.data.code==="80010"){
                        this.orderList=res.data.data.list;
                        this.pages=res.data.data.pages;
                        this.allId=[];
                        this.isShow = false;
                        for(let j=0;j<this.orderList.length;j++){
                            this.allId.push(this.orderList[j].id)
                        }
                    }else{
                        this.orderList=[];
                        this.pages=1;
                        this.allId=[];
                        this.isShow = true;
                    }

                })
            },
            pageSearch(val){
                this.page=val;
                this.orderLIstSearch();
            },
            //选中的checkout框
            picked (id,e){
                if(e.target.checked===true){
                    this.distribute.push(id)
                }else {
                    for(let i=0;i<this.distribute.length;i++){
                        if(id===this.distribute[i]){
                            this.distribute.splice(i,1)
                        }
                    }
                }
            },
            pickedAll(e){
                if(e.target.checked===true){
                    this.distribute=[];
                    this.distribute=this.allId;
                    this.isChecked();
                }else {
                    this.distribute=[];
                    this.isChecked();
                }
            },
            //选择部门和成员搜索
            select(){
                this.selected=[];
                this.departmentId=[];
                this.staffId=[];
                this.page=1;
                $('#selectCustom').modal({backdrop: 'static',});
                $('#selectCustom').modal('show');
                this.configureType='select';
                this.configure={type:'all',class:'selectType'};
            },
            isChecked(){    //监听member数组是否发生变化，如果删除则相应的checkbox取消勾选
                this.checkboxModel=this.distribute;
            },
            //选择分配部门
            distribution(){
                $('#selectCustom').modal({backdrop: 'static',});
                $('#selectCustom').modal('show');
                this.configureType='distribution';
                this.configure={length:1,class:'department',id:[9],name:'市场部'};
            },
            //选中后处理事件
            isSelect(val){
                if(this.configureType==='select'){
                    for(let i=0;i<val.department.length;i++){
                        this.selected.push(val.department[i].name);
                        this.departmentId.push(val.department[i].id);
                    }
                    for(let j=0;j<val.staff.length;j++){
                        this.selected.push(val.staff[j].name);
                        this.staffId.push(val.staff[j].id);
                    }
                    this.keywords='';
                    this.orderLIstSearch();
                }else if(this.configureType==='distribution'){
                    if(this.configureType==='select'){
                        this.distributeDpm=val.department[0].id;
                        this.$http.post('manager/move_rent_order/moveorder',
                            {
                                'department_id' : this.distributeDpm,
                                'type' : 'rent',
                                'id' :this.distribute,
                            }
                        ).then((res) => {
                                if(res.data.code==='80020'){
                                    this.checkboxModel=[];
                                    this.distribute=[];
                                    this.allCheck=false;
                                    this.orderLIstSearch();
                                    this.info.success =res.data.msg;
                                    //显示成功弹窗 ***
                                    this.info.state_success = true;
                                    //一秒自动关闭成功信息弹窗 ***
                                    setTimeout(() => {
                                        this.info.state_success = false;
                                    },2000);
                                }else {
                                    this.info.success =res.data.msg;
                                    //显示成功弹窗 ***
                                    this.info.state_success = true;
                                    //一秒自动关闭成功信息弹窗 ***
                                    setTimeout(() => {
                                        this.info.state_success = false;
                                    },2000);
                                }
                            }
                        )
                    }
                }
            },
            keywordSearch(){
                this.selected=[];
                this.departmentId=[];
                this.staffId=[];
                this.page=1;
                this.orderLIstSearch();
            }
        }
    }
</script>


<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    select {
        margin-bottom: 0;
    }
    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }
    input,label,button{
        margin: 0;
    }
    .panel-body {
        padding: 15px;
    }
    .selected{
        background: #fffcd9 !important;
    }
</style>