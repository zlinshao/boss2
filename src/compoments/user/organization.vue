<template>
    <div>
        <section class="wrapper" style="margin-top:0;">
            <!--mail inbox start-->
            <div class="mail-box">
                <aside class="sm-side">
                    <div class="user-head">
                        <div class="user-name" style="font-size: 16px;line-height: 60px;">
                            南京乐伽商业管理有限公司
                        </div>
                    </div>

                    <div class="inbox-body">
                        <div>
                            <a @click="getBranch('')">组织架构</a>
                            <a v-if='isFirst' @click="getSecond(reFirstId,reFirstName)"> &gt;&nbsp;{{reFirstName}}</a>
                            <a v-if='isSecond' @click="getThird(reSecondId,reSecondName)">&gt;&nbsp;{{reSecondName}}</a>
                            <a v-if='isThird' @click="getFour(reThirdId,reThirdName)">&gt;&nbsp;{{reThirdName}}</a>
                            <a v-if='isFour' @click="getFive(reFourId,reFourName)">&nbsp;&gt;&nbsp;{{reFourName}}</a>
                        </div>
                    </div>
                    <div class="nav-collapse">
                        <ul class="inbox-nav inbox-divider">
                            <!--部门-->
                            <li v-for="(item,index) in branchList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==1" >
                                <a href="#">
                                    <button @click.stop="getSecond(item.id,item.name)"
                                       class="fa fa-chevron-right btn btn-default btn-lg department"
                                       :disabled="item.status=='停用'">{{item.name}}</button>
                                    <div class="pull-right dropdown ">
                                        <i class="fa fa-gear pull-rightdropdown-toggle"
                                           style="margin-top: 12px" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false"></i>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li @click="editDepartment(item.id)">
                                                <a class="btn btn-default">编辑部门</a>
                                            </li>
                                            <li @click="addDeparment(item.id)">
                                                <a class="btn btn-default">新建下级部门</a>
                                            </li>
                                        </ul>
                                    </div>
                                </a>
                            </li>
                            <!--二级部门-->
                            <li v-for="(item,index) in secondList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==2">
                                <a href="#">
                                    <button @click.stop="getThird(item.id,item.name)"
                                       class="fa fa-chevron-right btn btn-default btn-lg department"
                                            :disabled="item.status=='停用'">{{item.name}}</button>

                                    <div class="pull-right dropdown ">
                                        <i class="fa fa-gear pull-rightdropdown-toggle"
                                           style="margin-top: 12px" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false"></i>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li @click="editDepartment(item.id)">
                                                <a class="btn btn-default">编辑部门</a>
                                            </li>
                                            <li @click="addDeparment(item.id)">
                                                <a class="btn btn-default">新建下级部门</a>
                                            </li>
                                            <li @click="startDepartment(item.id)">
                                                <a class="btn btn-default" :disabled="item.status=='正常'">启用部门</a>
                                            </li>
                                            <li @click="stopDepartment(item.id)">
                                                <a class="btn btn-default" :disabled="item.status=='停用'">停用部门</a></li>
                                        </ul>
                                    </div>
                                </a>
                            </li>
                            <!--三级部门-->
                            <li v-for="(item,index) in ThirdList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==3">
                                <a href="#">
                                    <button @click.stop="getFour(item.id,item.name)"
                                       class="fa fa-chevron-right btn btn-default btn-lg department"
                                       :disabled="item.status=='停用'">{{item.name}}</button>

                                    <div class="pull-right dropdown ">
                                        <i class="fa fa-gear pull-rightdropdown-toggle"
                                           style="margin-top: 12px" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false"></i>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li @click="editDepartment(item.id)">
                                                <a class="btn btn-default">编辑部门</a>
                                            </li>
                                            <li @click="addDeparment(item.id)">
                                                <a class="btn btn-default">新建下级部门</a>
                                            </li>
                                            <li @click="startDepartment(item.id)">
                                                <a class="btn btn-default" :disabled="item.status=='正常'">启用部门</a>
                                            </li>
                                            <li @click="stopDepartment(item.id)">
                                                <a class="btn btn-default" :disabled="item.status=='停用'">停用部门</a></li>
                                        </ul>
                                    </div>
                                </a>
                            </li>
                            <!--四级部门-->
                            <li v-for="(item,index) in FourList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==4">
                                <a href="#">
                                    <button @click.stop="getFive(item.id,item.name)"
                                       class="fa fa-chevron-right btn btn-default btn-lg department"
                                       :disabled="item.status=='停用'">{{item.name}}</button>

                                    <div class="pull-right dropdown ">
                                        <i class="fa fa-gear pull-rightdropdown-toggle"
                                           style="margin-top: 12px" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false"></i>
                                        <ul class="dropdown-menu dropdown-menu-left">
                                            <li @click="editDepartment(item.id)">
                                                <a class="btn btn-default">编辑部门</a>
                                            </li>
                                            <li @click="addDeparment(item.id)">
                                                <a class="btn btn-default">新建下级部门</a>
                                            </li>
                                            <li @click="startDepartment(item.id)">
                                                <a class="btn btn-default" :disabled="item.status=='正常'">启用部门</a>
                                            </li>
                                            <li @click="stopDepartment(item.id)">
                                                <a class="btn btn-default" :disabled="item.status=='停用'">停用部门</a></li>
                                        </ul>
                                    </div>
                                </a>
                            </li>
                            <!--五级部门-->
                            <li v-for="(item,index) in FiveList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==5">
                                <a href="#">
                                    <i @click.stop="getFive(item.id,item.name)"
                                       class="fa fa-chevron-right">{{item.name}}</i>

                                    <i data-toggle="modal" href="#myModal"
                                       class="fa fa-gear pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <!--选中与搜索-->
                <aside class="lg-side">
                    <div class="leftHead" style="padding-bottom: 0px">
                        <div class="row">
                            <div class="col-lg-6 col-md-12">
                                <h4 style="color: #0f0f0f">部门
                                    <span style="color:#fff;font-size:16px;" v-if="isDepartment"> {{department}}</span>
                                </h4>
                            </div>
                            <div class="col-lg-2 col-md-12 clickBt">
                                <!--<button class="btn btn-primary">提醒</button>-->
                                <button class="btn btn-primary" @click="addUser">添加员工</button>
                            </div>
                            <div class="col-lg-4 col-md-12 pull-right">
                                <form  action="#">
                                        <input placeholder="搜索企业联系人" class="sr-input"
                                               style="margin-bottom: 0px"     @keyup="search" v-model="keywords">
                                        <button type="button" class="btn sr-btn"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div class="inbox-body box">
                        <div class="heading-inbox row">
                            <div class="col-md-8">

                            </div>
                        </div>
                        <div class="view-mail">
                            <div class="row">
                                <div class="col-lg-12">
                                    <section class="panel table table-responsive">
                                        <table class="table table-striped table-advance table-hover">
                                            <thead>
                                            <tr>
                                                <th>员工</th>
                                                <th>部门</th>
                                                <th>职务</th>
                                                <th>用户组</th>
                                                <th>人员状态</th>
                                                <th>手机号</th>
                                                <th>入职时间</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody id="collectId">
                                            <tr v-for="item in userList">
                                                <td >{{item.real_name}}</td>


                                                <td><span v-for="item1 in item.department">{{item1.name}}</span></td>

                                                <td><span v-for="item1 in item.position_id">{{item1.vocation}}</span></td>

                                                <td ><span v-for="item1 in item.role">{{item1.title}}&nbsp;</span></td>
                                                <td v-if="item.status==1">
                                                    <span class="label label-success ">在职</span>
                                                </td>
                                                <td v-if="item.status==3">
                                                    <span class="label label-warning ">离职</span>
                                                </td>
                                                <td>{{item.mobile}}</td>
                                                <td>{{item.enroll_time}}</td>
                                                <td class="dropdown">
                                                    <a href="#"
                                                       class="dropdown-toggle btn btn-default text-white"
                                                       data-toggle="dropdown" role="button" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        更多
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-menu-right" style="padding: 0;margin:0">
                                                        <li @click="edit(item.id)">
                                                            <button type="button"
                                                                    class="btn btn-default btn-lg btn-block">编辑</button>
                                                        </li>
                                                        <li role="separator" class="divider" style="margin: 0"></li>
                                                        <li @click="startAccount(item.id)">
                                                            <button type="button" class="btn btn-default btn-lg btn-block"
                                                                    :disabled="item.status==1">启用账号</button>
                                                        </li>
                                                        <li role="separator" class="divider" style="margin: 0"></li>
                                                        <li @click="suspendAccount(item.id)">
                                                            <button type="button" class="btn btn-default btn-lg btn-block"
                                                                    :disabled="item.status==3">禁用账号</button>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr v-show="userList.length==0">
                                                <td colspan="10" class="text-center text-muted">
                                                    <h4>暂无数据....</h4>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
        <UserAdd></UserAdd>
        <Organize></Organize>
        <AddDpm :addDpm="addDpm"></AddDpm>
        <editDpm :editDpm="editDpm" @editDdp="changeDpm"></editDpm>
        <Status :account="account" @Account="AccountStatus"></Status>
        <UserRevise :editDate="editData"></UserRevise>
        <depStatus :account="depAccount" @DdpStatus='dpmStatus'></depStatus>
        <Page :pg="page" @pag="getBranch" v-if="type==1"></Page>
        <!--<Page :pg="page" @pag="getSecond(id,name)" v-if="type==2"></Page>-->
        <!--<Page :pg="page" @pag="getThird(id,name)" v-if="type==3"></Page>-->
        <!--<Page :pg="page" @pag="getFour(id,name)" v-if="type==4"></Page>-->
        <!--<Page :pg="page" @pag="getFive(id,name,a)" v-if="type==5"></Page>-->
        <Page :pg="page" @pag="search" v-if="type==6"></Page>
    </div>
</template>
<script>
    import UserAdd from './userAdd.vue';
    import Organize from  './organize.vue';
    import Page from '../common/page.vue';
    import Status from './accountStatus.vue';
    import depStatus from  './departmentStatus.vue'
    import editDpm from  './editDpm.vue';
    import UserRevise from './userRevise.vue';
    import AddDpm from  './addDubordinateDpm.vue'
    export default{
        components: {
            UserAdd,
            Organize,
            Page,
            Status,
            depStatus,
            editDpm,
            UserRevise,
            AddDpm
        },
        data(){
            return {
                branchList: [],//部门列表
                userList: [],  //成员列表
                secondList:[],
                ThirdList:[],
                FourList:[],
                FiveList:[],
                type: '',      //列表类型 1为部门 2为二级 3为三级
                keywords: '',   //搜索关键字
//                page: {id:'',name:'',a:''},
                active1:'',
                page:'',
                id:'',
                name:'',
                //多级菜单
                isThird: false,
                isSecond: false,
                isFirst:false,
                isFour:false,
                isDepartment:false,
                reFirstId:'',
                reSecondId:'',
                reThirdId:'',
                reFourId:'',
                reFirstName:'',
                reSecondName:'',
                reThirdName:'',
                reFourName:'',
                department:'全公司',//部门展示
                editData:[],
                account:'',
                depAccount:'',
                editDpm:[],
                firstName:'',
                addDpm:'', //新建下级部门
            }
        },
        mounted(){
            this.getBranch();
        },
        methods: {
            getBranch(a){
                this.$http.get('manager/user/departmentIndex/page/'+a).then((res) => {
                    this.branchList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.page=res.data.data.pages;
                    this.type = 1;
                    this.isFirst = false;
                    this.isSecond  = false;
                    this.isThird = false;
                    this.isFour=false;
                    this.isDepartment=false;
                })
            },
            getSecond(id,name,a){
                this.$http.get('manager/user/departmentIndex/id/'+id+'/page/'+a).then((res) => {
                    this.secondList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.page=res.data.data.pages;
                    if(res.data.data.department.length==0){
                        this.type = 1;
                    }else {
                        this.type = 2;
                    }
//                    this.page = Object.assign({},this.page,{id:id});
                    this.id=id;
                    this.name=name;
                    console.log(this.page)
                    this.isFirst = true;
                    this.isSecond  = false;
                    this.isThird = false;
                    this.isFour=false;
                    this.reFirstName=name;
                    this.reFirstId=id;
                    this.department=name;
                    this.isDepartment=true;
                })
            },
            getThird(id,name,a){
                this.$http.get('manager/user/departmentIndex/id/'+id+'/page/'+a).then((res) => {
                    this.ThirdList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.a=res.data.data.pages;
                    if(res.data.data.department.length==0){
                        this.type = 2;
                    }else {
                        this.type = 3;
                    }
                    this.id=id;
                    this.name=name;
                    this.isFirst = true;
                    this.isSecond  = true;
                    this.isThird = false;
                    this.isFour=false;
                    this.reSecondName=name;
                    this.reSecondId=id;
                    this.department=name;
                    this.isDepartment=true;
                })
            },
            getFour(id,name,a){
                this.$http.get('manager/user/departmentIndex/id/'+id+'/page/'+a).then((res) => {
                    this.FourList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.a=res.data.data.pages;
                    if(res.data.data.department.length==0){
                        this.type = 3;
                    }else {
                        this.type = 4;
                    }
                    this.id=id;
                    this.name=name;
                    this.isFirst = true;
                    this.isSecond  = true;
                    this.isThird = true;
                    this.isFour=false;
                    this.reThirdName=name;
                    this.reThirdId=id;
                    this.department=name;
                    this.isDepartment=true;
                })
            },
            getFive(id,name,a){
                this.$http.get('manager/user/departmentIndex/id/'+id+'/page/'+a).then((res) => {
                    this.FiveList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.page=res.data.data.pages;
                    this.type = 4;
                    this.id=id;
                    this.name=name;
                    this.isFirst = true;
                    this.isSecond  = true;
                    this.isThird = true;
                    this.isFour=true;
                    this.reFourName=name;
                    this.reFourId=id;
                    this.department=name;
                    this.isDepartment=true;
                })
            },
            //编辑部门页面更新
            changeDpm(val){
                this.getBranch();
            },
            AccountStatus(val){
                this.getBranch();
            },
            dpmStatus(val){
                this.getBranch();
            },
            //鼠标hover事件
            changeClass(index, name){
                this.active1 = index;
            },
            //查询成员
            search(a){
                if (this.keywords != '') {
                    this.$http.get('manager/user/searchUser/keywords/' + decodeURI(this.keywords)+'/page/'+a).then((res) => {
                        this.type = 6;
                        this.getBranch();
                        if (res.data.code == 90020) {
                            this.userList=res.data.data.list;
                            this.page=res.data.data.pages;

                        } else {
                            this.branchList = [];
                            this.userList=[];
                            this.page=0;
                        }
                    })
                }else{
                    this.$http.get('manager/user/searchUser/page/' +a ).then((res) => {
                        this.type = 6;
                        this.getBranch();
                        if (res.data.code == 90020) {
                            this.userList=res.data.data.list;
                            this.page=res.data.data.pages;

                        } else {
                            this.branchList = [];
                            this.userList=[];
                            this.page=0;
                        }
                    })
                }


            },
            //编辑账号
            edit(id){
                $('#myModalRevise').modal('show');
                this.$http.get('manager/user/readUser/id/'+id).then((res) => {
                    this.editData=res.data.data;
                })
            },
            //增加账号
            addUser(){
                $('#myModalAdd').modal('show');
            },
            //启用账号
            startAccount(id){
                $('#myModalStart').modal('show');
                this.account=id
            },
            //停止账号
            suspendAccount(id){
                $('#myModalSuspend').modal('show');
                this.account=id;
            },
            //新建下级部门

            //启用部门
            startDepartment(id){
                $('#myModalStartDpm').modal('show');
                this.depAccount=id;
            },
            //停用部门
            stopDepartment(id){
                $('#myModalStartDpm').modal('show');
                this.depAccount=id;
            },
            //编辑部门
            editDepartment(id){
                $('#myModalEditDpm').modal('show');
                this.$http.get('manager/department/readDpm/id/'+id).then((res) => {
                    this.editDpm=res.data.data;
                })
            },
            //新建下级部门
            addDeparment(id){
                $('#myModalAddDpm').modal('show');
                this.addDpm=id;
            }
        }
    }
</script>
<style>
    .active {
        background-color: #FFF;
    }
    a{
        cursor: pointer;
    }
    .leftHead{
        padding: 20px;
        background: #41cac0;
        color: #fff;
        border-radius: 0 4px 0 0;
        -webkit-border-radius: 0 4px 0 0;
        min-height: 80px;
    }
    .leftHead  .sr-input {
        height: 40px;
        border: none;
        box-shadow: none;
        padding: 0 5px;
        float: left;
        border-radius: 4px 0 0 4px;
        color: #8a8a8a;
    }
    .leftHead  .sr-btn {
        height: 40px;
        border: none;
        background: #00a6b2;
        color: #fff;
        padding: 0 20px;
        border-radius: 0 4px 4px 0;
        -webkit-border-radius: 0 4px 4px 0;
    }
    @media screen and (max-width:1024px) {
        .clickBt {float:right }
    }
    .btn-default {
        background-color: #fff;
        border-color: #fff;
        color: #666;
    }
    .btn-default:hover{
        background-color: #b0b5b9;
        border-color: #b0b5b9;
        color: #fff;
    }
    dropdown-menu li:hover{
        background-color: #b0b5b9;
    }
    .btn-lg {
        border-radius:0;
    }
    .department{
        background: #e5e8ef;
        border:none;
    }
    .department:focus{
        color:#f30a3e;
        background: #e5e8ef;
        font-size: 14px;
    }
    .btn-lg{
        font-size: 12px;
    }
    .panel-body {
         padding: 0;
    }
    .table-responsive {
         overflow: visible;
    }
</style>