<template>
    <div>
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
        <!--右侧栏-->
        <div class="modal fade full-width-modal-right" id="myModal2" tabindex="-1" role="dialog"
             aria-labelledby="myModal2" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title text-center">任务详情</h4>
                        </div>
                        <div class="modal-body">
                            <div data-toggle="modal" data-target="#myModal4" class="alert alert-block alert-success fade in" @click="getBranch">
                            <span >click</span>
                            <span v-for="item in showMember" style="padding: 5px">{{item}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal4">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" style="text-align: center;">组织架构</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 box1" style="padding: 0">
                                <div style=" margin-top:10px;">
                                    <div id="tagsinput_tagsinput" class="tagsinput " style="height: 100%; border: none">
                                        <span class="tag" v-for="item in member" v-if="member!=''">
                                            <span >{{item}}&nbsp;&nbsp;</span>
                                            <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                        </span>
                                        <input  @keyup="search()" @keydown.8="backSpace"
                                                @keydown.down="changeDown()" @keydown.up.prevent="changeUp()"
                                                @keydown.13='keydownAdd' v-model="keywords"  placeholder="搜索企业联系人">
                                    </div>
                                    <div class="searchList box">
                                        <ul>
                                            <li :class="{'hov':active1==index}" v-for="(item, index) in searchName"
                                                 @mouseover="changeClass(index)" @click="mouseAdd(item.name)">
                                                {{item.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5 box boxSelf" style="padding: 0">
                                <div class="boxHead">南京乐嘉商业管理有限公司</div>
                                <div>
                                    <a @click="getBranch">南京乐嘉商业管理有限公司</a>
                                    <a v-if='isBranch' @click="getUser(reuserId,role)">&nbsp;&gt;&nbsp;{{role}}</a>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" class="pull-left" style="margin-top: 3px; margin-right: 5px">全选</label>
                                </div>
                                <div style="border-top: 1px solid #aaa;" v-for="item in branchList" v-if="type==1"
                                     @click.stop="getUser(item.id,item.name)">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" class="pull-left" style="margin-top: 3px; margin-right: 5px">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <!--区域列表-->
                                <div style="border-top: 1px solid #aaaaaa; padding: 10px;" v-for="(item,index) in userList" v-if="type==2"
                                     @click="select(item.name)" >
                                    {{item.name}}
                                </div>
                                <!--成员列表-->
                                <div style="border-top: 1px solid #aaaaaa; padding: 10px;" v-for="item in areaList" v-if="type==3"
                                     @click="getUser(item.id,item.area_name)" >
                                    {{item.area_name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="new_add btn btn-success " @click="addNew" data-dismiss="modal"
                                aria-label="Close">新增
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const addr='http://test.v2.api.boss.lejias.cn/manager/user/';
    export default {

        data(){
            return {
                branchList: [],//部门列表
                userList: [],  //成员列表
                name: '',      //
                type: '',      //列表类型 1为部门 2为成员 3为区域
                reuserId: '',  //返回获取成员列表id
                member: [],    //x选中成员
                isBranch: '',  //是否有子分类
                role: "",      //返回获取成员列表人员
                showMember: [],//显示成员
                keywords:'',   //搜索关键字
                searchName:[],  //搜索成员数组
                areaList:[],   //区域列表
                active1: '-1',
                t1:'',
            }
        },
        mounted(){

        },
        methods: {
            //请求部门列表
            getBranch(){
                this.$http.get(addr+'searchBranch').then((res) => {
                    this.branchList = res.data.data;
                    this.type = 1;
                    this.member=[];
                    this.isBranch = false;
                })
            },
            //请求成员列表
            getUser(userId, name){
                if(userId!==1){//如果不是请求市场部门成员
                    this.$http.get(addr+'userListBr/id/' + userId).then((res) => {
                        this.userList = res.data.data;
                        this.type = 2;
                        this.isBranch = true;
                        this.role = name;
                        this.reuserId = userId;
                    })
                }else{//请求市场部区域
                    this.$http.get(addr+'userListBr/id/' + userId).then((res) => {
                        console.log(res.data.data)
                        this.areaList = res.data.data;
                        this.type = 3;
                        this.isBranch = true;
                    })
                }
            },
            //查询成员
            search(){
                this.$http.get(addr+'searchUser/user_mobile/' + decodeURI(this.keywords)).then((res) => {
                    this.searchName = res.data.data;
                })
            },
            //鼠标hover事件
            changeClass(index,name){
                this.active1=index;
            },
            mouseAdd(name){
                if($.inArray(name, this.member)===-1){
                    this.member.push(name);
                }
            },
            //键盘keydown事件
            changeDown(){
                console.log(this.searchName)
                if(this.searchName!==undefined){
                    this.active1++;
                    if(this.active1===this.searchName.length)this.active1=this.searchName.length-1;
                    this.t1=this.searchName[this.active1].name;
                }
            },
            changeUp(){
                if(this.searchName!==undefined){
                    this.active1--;
                    if(this.active1===-2)this.active1=-1;
                    this.t1=this.searchName[this.active1].name;
                }
            },
            keydownAdd(){
                if(this.t1!==''&&$.inArray(this.t1, this.member)===-1){
                    this.member.push(this.t1)
                }
                this.t1='';
            },
            backSpace(){
                if(this.keywords===''){
                    this.member.pop();
                }
            },
            //选择成员
            select(name){
                if($.inArray(name, this.member)===-1){
                    this.member.push(name);
                }
            },
            //删除成员
            deleteName(name){
                this.member=this.member.filter((x)=>x!==name);
            },
            //新增到任务栏
            addNew(){
                this.showMember = this.member
            },
            //清空历史
            empty(){
                this.showMember = [];
                this.member = [];
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box1{
        border: 1px solid #aaa;
        height: 350px;
        margin: 10px;
        border-radius: 5px
    }
    .boxSelf{
        border: 1px solid #aaa;
        overflow: auto;
        height: 350px;
        margin: 10px;
        border-radius: 5px
    }
    .boxHead{
        text-align: center;
        padding:5px;
        font-weight: bold;
    }
    li{
        width: 100%;
        height: 30px;
        display: inline-block;
        line-height: 30px;
        padding-left: 10px;
    }
    .hov{
        background: #bce8f1;
    }
    input{
        color: #333;
    }
    input::placeholder{
        color: #aaa;
    }
    .searchList{
        overflow: auto;
        height: 290px;
        width: 100%;
        border: 1px solid #c0c0c0;
        border-radius: 3px;
        border-bottom: none
    }
    .box::-webkit-scrollbar {
        width:8px;
        height:300px;
    }
    .box::-webkit-scrollbar-button    {
        background-color:#f0f0f8;
    }
    .box::-webkit-scrollbar-track     {
        background:#f0f0f8;
    }
    .box::-webkit-scrollbar-thumb{
        background:#80d3d9;
        border-radius:10px;
    }
</style>
