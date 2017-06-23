<template>
    <div>
        <section class="wrapper" style="margin-top:0;">
            <!--mail inbox start-->
            <div class="mail-box">
                <aside class="sm-side">
                    <div class="user-head">
                        <div class="user-name" style="font-size: 16px;line-height: 60px;">
                            南京乐嘉商业管理有限公司
                        </div>
                    </div>

                    <div class="inbox-body">
                        <div>
                            <a @click="getBranch('')">组织架构</a>
                            <a v-if='isFirst' @click="getSecond(reFirstId,reFirstName)" >&nbsp;&gt;&nbsp;{{reFirstName}}</a>
                            <a v-if='isSecond' @click="getThird(reSecondId,reSecondName)">&nbsp;&gt;&nbsp;{{reSecondName}}</a>
                            <a v-if='isThird' @click="getFour(reThirdId,reThirdName)">&nbsp;&gt;&nbsp;{{reThirdName}}</a>
                            <a v-if='isFour' @click="getFive(reFourId,reFourName)">&nbsp;&gt;&nbsp;{{reFourName}}</a>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h4 class="modal-title">Compose</h4>
                                    </div>
                                    <div class="modal-body">
                                        <form class="form-horizontal" role="form">
                                            <div class="form-group">
                                                <label class="col-lg-2 control-label">To</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" id="inputEmail1"
                                                           placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-2 control-label">Cc / Bcc</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" id="cc" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-2 control-label">Subject</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" id="inputPassword1"
                                                           placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-lg-2 control-label">Message</label>
                                                <div class="col-lg-10">
                                                    <textarea name="" id="" class="form-control" cols="30"
                                                              rows="10"></textarea>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div>
                        <!-- /.modal -->
                    </div>
                    <div class="nav-collapse">
                        <ul class="inbox-nav inbox-divider">
                            <!--部门-->
                            <li v-for="(item,index) in branchList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==1">
                                <a href="#">
                                    <i @click.stop="getSecond(item.id,item.name)"
                                       class=" fa fa-chevron-right"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="fa fa-gear pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--二级部门-->
                            <li v-for="(item,index) in secondList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==2">
                                <a href="#">
                                    <i @click.stop="getThird(item.id,item.name)"
                                       class="fa fa-chevron-right"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="fa fa-gear pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--三级部门-->
                            <li v-for="(item,index) in ThirdList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==3">
                                <a href="#">
                                    <i @click.stop="getFour(item.id,item.name)"
                                       class="fa fa-chevron-right"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="fa fa-gear pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--四级部门-->
                            <li v-for="(item,index) in FourList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==4">
                                <a href="#">
                                    <i @click.stop="getFive(item.id,item.name)"
                                       class="fa fa-chevron-right"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="fa fa-gear pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--五级部门-->
                            <li v-for="(item,index) in FiveList" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)" v-if="type==4">
                                <a href="#">
                                    <i @click.stop="getFive(item.id,item.name)"
                                       class="fa fa-chevron-right"></i>
                                    {{item.name}}
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
                    <div class="inbox-head" style="padding-bottom: 0px">
                        <!--<div class="row">-->
                            <!--<div class="col-lg-6 col-md-12">-->
                                <!--<h3 style="color: #0f0f0f">部门</h3>-->
                                <!--<h3>&nbsp;{{department}}</h3>-->
                            <!--</div>-->
                            <!--<div class="col-lg-3 col-md-12">-->
                                <!--<div class="pull-right" style="margin: 5px">-->
                                    <!--<button class="btn btn-primary">提醒</button>-->
                                <!--</div>-->
                                <!--<div class="pull-right" style="margin: 5px">-->
                                    <!--<button class="btn btn-primary" data-toggle="modal" data-target="#myModalAdd">添加员工</button>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="col-lg-3 col-md-12">-->
                                <!--<form class="pull-right position" action="#">-->
                                    <!--<div class="input-append">-->
                                        <!--<input placeholder="搜索企业联系人" class="sr-input"-->
                                               <!--style="margin-bottom: 0px"     @keyup="search" v-model="keywords">-->
                                        <!--<button type="button" class="btn sr-btn"><i class="fa fa-search"></i></button>-->
                                    <!--</div>-->
                                <!--</form>-->
                            <!--</div>-->

                        <!--</div>-->
                        <div class="row">
                            <div class="col-lg-5 col-md-12">
                                <h4 style="color: #0f0f0f">部门
                                    &nbsp;<span style="color:#fff">{{department}}</span>
                                </h4>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <button class="btn btn-primary">提醒</button>
                                <button class="btn btn-primary" data-toggle="modal" data-target="#myModalAdd">添加员工</button>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <form  action="#">
                                        <input placeholder="搜索企业联系人" class="sr-input"
                                               style="margin-bottom: 0px"     @keyup="search" v-model="keywords">
                                        <button type="button" class="btn sr-btn"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div class="inbox-body">
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
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody id="collectId">
                                            <tr v-for="item in userList">
                                                <td >{{item.real_name}}</td>
                                                <td v-for="value in item.department">{{value}}</td>
                                                <td v-for="value in item.position_id">{{value}}</td>
                                                <td v-if="item.position_id.length==0">无</td>
                                                <td v-for="value in item.role">{{value}}</td>
                                                <td v-if="item.role.length==0">无</td>
                                                <td>{{item.status}}</td>
                                                <td>{{item.mobile}}</td>
                                                <td class="dropdown">
                                                    <a href="#"
                                                       class="dropdown-toggle btn btn-default text-white"
                                                       data-toggle="dropdown" role="button" aria-haspopup="true"
                                                       aria-expanded="false">
                                                        更多
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-menu-left">
                                                        <li @click="edit(item.staff_id)"><a>编辑</a></li>
                                                        <li role="separator" class="divider"></li>
                                                        <li><a>启用账号</a></li>
                                                        <li role="separator" class="divider"></li>
                                                        <li><a>停用账号</a></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr v-show="branchList.length==0">
                                                <td colspan="10" class="text-center text-muted">
                                                    <h4>暂无数据....</h4>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                    <div class="row pull-right" style="padding-right: 15px;">
                                        <nav aria-label="Page navigation">
                                            <ul class="pagination">
                                                <li>
                                                    <input type="button" class="btn btn-white Previous" value="上一页">
                                                </li>
                                                <li>
                                                    <input type="button" class="btn btn-white Next" value="下一页">
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
        <UserAdd></UserAdd>
        <Organize></Organize>
    </div>
</template>
<script>
    const addr = 'http://test.v2.api.boss.lejias.cn/manager/user/';
    import UserAdd from './userAdd.vue';
    import Organize from  './organization.vue'
    export default{
        components: {
            UserAdd,
            Organize
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
                active1:'',
                //多级菜单
                isThird: false,
                isSecond: false,
                isFirst:false,
                isFour:false,
                reFirstId:'',
                reSecondId:'',
                reThirdId:'',
                reFourId:'',
                reFirstName:'',
                reSecondName:'',
                reThirdName:'',
                reFourName:'',
                department:'全公司',//部门展示
            }
        },
        mounted(){
            this.getBranch();
//            this.initialize();
        },
        methods: {
            getBranch(){
                this.$http.get(addr + 'departmentIndex').then((res) => {
                    this.branchList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.type = 1;
                    this.isFirst = false;
                    this.isSecond  = false;
                    this.isThird = false;
                    this.isFour=false;
                })
            },
            getSecond(id,name){
                this.$http.get(addr + 'departmentIndex/id/'+id).then((res) => {
                    this.secondList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.type = 2;
                    this.isFirst = true;
                    this.isSecond  = false;
                    this.isThird = false;
                    this.isFour=false;
                    this.reFirstName=name;
                    this.reFirstId=id;
                    this.department=name;
                })
            },
            getThird(id,name){
                this.$http.get(addr + 'departmentIndex/id/'+id).then((res) => {
                    this.ThirdList = res.data.data.department;
                    this.userList=res.data.data.user;
                    this.type = 3;
                    this.isFirst = true;
                    this.isSecond  = true;
                    this.isThird = false;
                    this.isFour=false;
                    this.reSecondName=name;
                    this.reSecondId=id;
                    this.department=name;
                })
            },
            getFour(id,name){
                this.$http.get(addr + 'departmentIndex/id/'+id).then((res) => {
                    this.FourList = res.data.data.department;
                    this.userList=res.data.data.user;
                    console.log(res.data.data.department)
                    this.type = 4;
                    this.isFirst = true;
                    this.isSecond  = true;
                    this.isThird = true;
                    this.isFour=false;
                    this.reThirdName=name;
                    this.reThirdId=id;
                    this.department=name;
                })
            },
            getFive(id,name){
                this.$http.get(addr + 'departmentIndex/id/'+id).then((res) => {
                    this.FiveList = res.data.data.department;
                    this.userList=res.data.data.user;
                    console.log(res.data.data.department)
                    this.type = 5;
                    this.isFirst = true;
                    this.isSecond  = true;
                    this.isThird = true;
                    this.isFour=true;
                    this.reFourName=name;
                    this.reFourId=id;
                    this.department=name;
                })
            },
            //鼠标hover事件
            changeClass(index, name){
                this.active1 = index;
            },
            //查询成员
            search(){
                if (this.keywords != '') {
                    this.$http.get(addr + 'searchUser/keywords/' + decodeURI(this.keywords)).then((res) => {
                        if (res.data.code == 90020) {
                            console.log(res.data.code)
                            this.userList=res.data.data.list;
                        } else {
                            this.branchList = [];
                            this.userList=[];
                        }
                    })
                }
            },
            edit(id){
                $('#myModalAdd').modal('show');
            },
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
</style>