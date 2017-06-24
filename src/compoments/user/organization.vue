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
                                @mouseover="changeClass(index)" v-if="type==1">
                                <a href="#">
                                    <i @click.stop="getSecond(item.id,item.name)"
                                       class=" fa fa-chevron-right">{{item.name}}</i>

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
                                       class="fa fa-chevron-right">{{item.name}}</i>

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
                                       class="fa fa-chevron-right">{{item.name}}</i>
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
                                       class="fa fa-chevron-right">{{item.name}}</i>

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
                            <div class="col-lg-5 col-md-12">
                                <h4 style="color: #0f0f0f">部门
                                    <span style="color:#fff;font-size:16px;" v-if="isDepartment"> {{department}}</span>
                                </h4>
                            </div>
                            <div class="col-lg-3 col-md-12 clickBt">
                                <button class="btn btn-primary">提醒</button>
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
                                                        <li><a>编辑</a></li>
                                                        <li role="separator" class="divider"></li>
                                                        <li><a>启用账号</a></li>
                                                        <li role="separator" class="divider"></li>
                                                        <li><a>停用账号</a></li>
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
    import Organize from  './organize.vue'
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
                    this.isDepartment=false;
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
                    this.isDepartment=true;
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
                    this.isDepartment=true;
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
                    this.isDepartment=true;
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
                    this.isDepartment=true;
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
            addUser(){
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

</style>