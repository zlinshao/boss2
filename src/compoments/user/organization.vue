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
                            <a @click="getBranch">南京乐嘉商业管理有限公司</a>
                            <a v-if='isBranch' @click="getUser(reuserId,role)">&nbsp;&gt;&nbsp;{{role}}</a>
                            <a v-if='isArea' @click="getGroup(reareaId,area)">&nbsp;&gt;&nbsp;{{area}}</a>
                            <a v-if='isGroup' @click="getGroupMember(groupId,group)">&nbsp;&gt;&nbsp;{{group}}</a>
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
                            <li v-for="(item,index) in branchList" v-if="type==1" :class="{'active':active1==index}"
                                @mouseover="changeClass(index)">
                                <a href="#">
                                    <i @click.stop="getUser(item.id,item.name)"
                                       class="glyphicon glyphicon glyphicon-user"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="glyphicon glyphicon glyphicon-cog pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--市场部-->
                            <li v-for="(item,index) in userList" v-if="type==2">
                                <a href="#">
                                    <i class="glyphicon glyphicon glyphicon-user"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="glyphicon glyphicon glyphicon-cog pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--区域-->
                            <li v-for="(item,index) in areaList" v-if="type==3">
                                <a href="#">
                                    <i @click="getGroup(item.id,item.area_name)"
                                       class="glyphicon glyphicon glyphicon-user"></i>
                                    {{item.area_name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="glyphicon glyphicon glyphicon-cog pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--小组-->
                            <li v-for="(item,index) in groupList" v-if="type==4">
                                <a href="#">
                                    <i @click="getGroupMember(item.id,item.groups)"
                                       class="glyphicon glyphicon glyphicon-user"></i>
                                    {{item.groups}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="glyphicon glyphicon glyphicon-cog pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                            <!--小组成员-->
                            <li v-for="(item,index) in groupMemberList" v-if="type==5">
                                <a href="#">
                                    <i class="glyphicon glyphicon glyphicon-user"></i>
                                    {{item.name}}
                                    <i data-toggle="modal" href="#myModal"
                                       class="glyphicon glyphicon glyphicon-cog pull-right"
                                       style="margin-top: 12px"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <!--选中与搜索-->
                <aside class="lg-side">
                    <div class="inbox-head">
                        <h3 style="color: #0f0f0f">部门</h3>
                        <h3>&nbsp;{{role}}</h3>
                        <form class="pull-right position" action="#">
                            <div class="input-append">
                                <input placeholder="搜索企业联系人" class="sr-input"
                                       @keyup="search" v-model="keywords">
                                <button type="button" class="btn sr-btn"><i class="fa fa-search"></i></button>
                            </div>
                        </form>
                        <div class="pull-right" style="margin: 5px">
                            <button class="btn btn-primary">设置</button>
                        </div>
                        <div class="pull-right" style="margin: 5px">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModalAdd">添加员工</button>
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
                                    <section class="panel">
                                        <table class="table table-striped table-advance table-hover">
                                            <thead>
                                            <tr>
                                                <th>员工</th>
                                                <th>部门</th>
                                                <th>职位</th>
                                                <th>用户组</th>
                                                <th>手机号</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in searchName">
                                                <td>{{item.real_name}}</td>
                                                <td>{{item.department}}</td>
                                                <td>{{item.vocation}}</td>
                                                <td>{{item.role}}</td>
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
                                            <tr v-show="searchName.length==0">
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
    </div>
</template>
<script>
    const addr = 'http://test.v2.api.boss.lejias.cn/manager/user/';
    import UserAdd from './userAdd.vue';
    export default{
        components: {
            UserAdd,
        },
        data(){
            return {
                branchList: [],//部门列表
                userList: [],  //成员列表
                name: '',      //
                type: '',      //列表类型 1为部门 2为成员 3为区域
                reuserId: '',  //返回获取成员列表id
                reareaId: '',
                member: [],    //x选中成员
                isBranch: '',  //是否有子分类
                role: "",      //返回获取成员列表人员
                showMember: [],//显示成员
                keywords: '',   //搜索关键字
                searchName: [],  //搜索成员数组
                areaList: [],   //区域列表
                groupMemberList: [],
                active1: '-1',
                t1: '',
                groupList: [],
                isArea: false,
                area: '',
                group: '',
                groupId: '',
                isGroup: false,
            }
        },
        mounted(){
            this.getBranch();
            this.initialize();
        },
        methods: {
            getBranch(){
                this.$http.get(addr + 'searchBranch').then((res) => {
                    this.branchList = res.data.data;
                    this.type = 1;
                    this.member = [];
                    this.isBranch = false;
                    this.isArea = false;
                    this.isGroup = false;
                    this.role = "";
                })
            },
            //请求成员列表
            getUser(userId, name){
                if (userId !== 1) {//如果不是请求市场部门成员
                    this.$http.get(addr + 'userListBr/id/' + userId).then((res) => {
                        delete(res.data.data.pages);
                        this.userList = res.data.data;
                        this.type = 2;
                        this.isBranch = true;
                        this.role = name;
                        this.reuserId = userId;
                        this.isArea = false;
                        this.isGroup = false;
                    })
                } else {//请求市场部区域
                    this.$http.get(addr + 'userListBr/id/' + userId).then((res) => {
                        this.areaList = res.data.data;
                        this.type = 3;
                        this.role = name;
                        this.reuserId = userId;
                        this.isBranch = true;
                        this.isArea = false;
                        this.isGroup = false;
                    })
                }
            },
            getGroup(areaId, name){
                this.$http.get(addr + 'searchGroups/id/' + areaId).then((res) => {
                    this.groupList = res.data.data;
                    this.type = 4;
                    this.area = name;
                    this.reareaId = areaId;
                    this.isArea = true;
                    this.isGroup = false;
                })
            },
            getGroupMember(groupId, name){
                this.$http.get(addr + 'userList/id/' + groupId).then((res) => {
                    delete(res.data.data.pages);
                    this.groupMemberList = res.data.data;
                    this.type = 5;
                    this.group = name;
                    this.groupId = groupId;
                    this.isGroup = true;
                })
            },
            //鼠标hover事件
            changeClass(index, name){
                this.active1 = index;
            },
            //查询成员
            search(){
                if (this.keywords != '') {
                    this.$http.get(addr + 'searchUser/user_mobile/' + decodeURI(this.keywords) + '/page/' + 1).then((res) => {
                        if (res.data.code == 90020) {
                            this.searchName = res.data.data.list;
                        } else {
                            this.searchName = [];
                        }
                    })
                }
            },
            initialize(){
                this.$http.get(addr + 'searchUser/user_mobile/' + 1 + '/page/' + 1).then((res) => {
                    if (res.data.code == 90020) {
                        this.searchName = res.data.data.list;
                    } else {
                        this.searchName = [];
                    }
                })
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
</style>