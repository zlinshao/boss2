<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li class="active">用户管理</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div>
                    <div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2">
                            <div class="input-group">
                                <input type="text" readonly class="form-control" placeholder="点击选择部门"
                                       v-model="department_name" @click="selectDpm">
                                <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clear">清空</button>
                            </span>
                            </div>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="请输入员工姓名"
                                       @keyup="search" v-model="params.keywords">
                                <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search">搜索</button>
                            </span>
                            </div>
                        </div>
                        <div class="pro-sort col-xs-2 col-sm-2 col-md-2 col-lg-1">
                            <div class="input-group">
                                <i class="fa fa-filter" @click="advancedSearch"></i>
                            </div>
                        </div>
                        <div class="pro-sort col-xs-2 col-sm-2 col-md-2 col-lg-1">
                            <button class="btn btn-warning" @click="reset">
                                重置
                            </button>
                        </div>
                        <div class="pull-right" style="margin: 8px">
                            <button class="btn btn-primary" @click="addUser">
                                <i class="fa fa-plus-square"></i>&nbsp;新增员工
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--表格-->
        <div>
            <section class="panel table table-responsive roll has-js">
                <table class="table table-striped table-advance table-hover">
                    <thead class="text-center">
                    <tr>
                        <th>
                            <label for="allCheck" @click.prevent="pickedAll($event)"
                                   :class="{'label_check':true,'c_on':allCheck,'c_off':!allCheck}">
                                <input id="allCheck" type="checkbox" v-model="allCheck">
                            </label>
                        </th>
                        <th>员工</th>
                        <th>部门</th>
                        <th>职务</th>
                        <th class="text-center">人员状态</th>
                        <th class="text-center">等级</th>
                        <th class="text-center">手机号</th>
                        <th class="text-center">入职时间</th>
                        <th class="text-center">第一次合同</th>
                        <th class="text-center">第二次合同</th>
                        <th class="text-center">详情</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in userList">
                        <td>
                            <label :class="{'label_check':true,'c_on':checkboxModel.indexOf(item.id) > -1,
                                'c_off':checkboxModel.indexOf(item.id)==-1}" @click.prevent="picked(item,$event)">
                                <input type="checkbox" :value="item.id" v-model="checkboxModel">
                            </label>
                        </td>
                        <td>
                            <img :src="item.avatar" class="head" alt="" v-if="item.avatar !== '' ">
                            <img src="../../assets/img/head.png" class="head" v-if="item.avatar === '' ">
                            {{item.real_name}}
                        </td>


                        <td><span>{{item.department_name}}</span></td>

                        <td><span>{{item.vocation}}</span></td>
                        <td v-if="item.status==1" class="text-center">
                            <span class="label label-success ">{{dictionary.status[item.status] }}</span>
                        </td>
                        <td v-if="item.status==2" class="text-center">
                            <span class="label label-warning ">{{dictionary.status[item.status]}}</span>
                        </td>
                        <td v-if="item.status==3" class="text-center">
                            <span class="label label-default ">{{dictionary.status[item.status]}}</span>
                        </td>
                        <td class="text-center">{{dictionary.level[item.level]}}</td>
                        <td class="text-center">{{item.mobile}}</td>
                        <td class="text-center">{{item.enroll_time}}</td>
                        <td class="text-center">{{item.agreement_first_time}}</td>
                        <td class="text-center">{{item.agreement_second_time}}</td>
                        <td class="text-center">
                            <router-link :to="{path:'/userDetail',query: {UserId: item.id,params : params,departmentName:department_name}}">详情
                            </router-link>
                        </td>
                        <td class="dropdown text-center">
                            <a href="#"
                               class="dropdown-toggle fa fa-gear"
                               data-toggle="dropdown" role="button" aria-haspopup="true"
                               aria-expanded="false">
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right" style="padding: 0;margin:0">
                                <li @click="edit(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block">编辑
                                    </button>
                                </li>
                                <li role="separator" class="divider" style="margin: 0"></li>
                                <li @click="leaveAccount(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block"
                                            :disabled="item.status==3">离职
                                    </button>
                                </li>
                                <li role="separator" class="divider" style="margin: 0"></li>
                                <li @click="startAccount(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block"
                                            :disabled="item.status==1">启用账号
                                    </button>
                                </li>
                                <li role="separator" class="divider" style="margin: 0"></li>
                                <li @click="suspendAccount(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block"
                                            :disabled="item.status==3 || item.status==2">禁用账号
                                    </button>
                                </li>
                                <li role="separator" class="divider" style="margin: 0"></li>
                                <li @click="deleteAccount(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block">
                                        删除账号
                                    </button>
                                </li>
                                <li role="separator" class="divider" style="margin: 0"></li>
                                <li v-if="simulate.indexOf('staff/logins') > -1"
                                    @click="simulates(item.id, 'staff/logins')">
                                    <button type="button" class="btn btn-default btn-lg btn-block">
                                        模拟登陆
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-if="isShow">
                        <td colspan="12" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <!--//组件-->
        <Page :pg="pages" @pag="getPage" :beforePage="params.pages"></Page>
        <Status :state='info'></Status>
        <Department :configure='configure' @Staff="getDepartment"></Department>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <Loading v-if='Waiting'></Loading>

        <AdvancedSearch @Confirm="getAdvanced"></AdvancedSearch>
        <UserAdd></UserAdd>
        <UserRevise :editDate="editData" @reviseAccount="reviseExamine"></UserRevise>
    </div>
</template>
<script>
    import Loading from '../loading/Loading.vue'
    import Confirm from '../common/confirm.vue'
    import Page from '../common/page.vue'
    import Department from '../common/oraganization.vue'
    import Status from '../common/status.vue';                          //提示信息
    import AdvancedSearch from './advancedSearch.vue'
    import UserRevise from './userRevise.vue';
    import UserAdd from './userAdd.vue';

    export default{
        props: ['simulate'],
        components: { Page, Department, Status, Confirm, Loading,AdvancedSearch,UserAdd,UserRevise},
        data(){
            return {
                department_name: '',//部门名称
                dictionary: [], // 字典
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
                configure: [],  //选人配置项
                pages: '',      // 总页数
                isShow: false,  //无数据
                confirmMsg: [], //提示信息
                msgFlag: '',    //提示信息类型
                Waiting: false,  //loading
                page : '',
                userList : [],
                params :{
                    keywords : '',
                    key : '',
                    pages : '',
                    department : '',
                    time : '',
                },
                editData : '',  //编辑数据
                operateId : '', //操作id
                userSelectId : [],  //员工选择数组
                allId : [],
            }
        },
        created(){
            this.getDictionary();
        },
        computed :{
            checkboxModel(){
                return this.userSelectId;
            },
            allCheck(){
                for (let i=0; i<this.allId.length; i++){
                    if (this.userSelectId.indexOf(this.allId[i]) < 0){
                        return false;
                    }
                }
                //return this.allId.length > 0 ? true : false;
                return true;
            }
        },
        methods: {
            getDictionary(){
                this.$http.get('manager/user/dict').then((res) =>{
                    this.dictionary=res.data.user;
                    //接收返回上一级参数
                    if (this.$route.query.params !== undefined && this.$route.query.params.keywords !== undefined){
                        this.params = this.$route.query.params;
                        this.department_name = this.$route.query.departmentName;
                    }
                    this.searchUser();
                })
            },
            search(){
                this.params.pages = 1;
                this.searchUser();
            },
            searchUser(){
                this.$http.post('manager/user/searchUser',this.params).then((res) =>{
                    if(res.data.code === '90020'){
                        this.userList = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                        this.Waiting = false;
                        this.allId = [];
                        for (let j = 0; j < this.userList.length; j++) {
                            this.allId.push(this.userList[j].id)
                        }
                    }else {
                        this.userList = [];
                        this.allId = [];
                        this.pages = '';
                        this.isShow = true;
                        this.Waiting = false;
                    }
                })
            },
            getDate(){},
            getPage(val){
                this.params.pages = val;
                this.searchUser();
            },

            selectDpm(){ //选择部门
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {type:'department',length: 1};
            },
            getDepartment(val){
                this.department_name = val.department[0].name;
                this.params.department = val.department[0].id;
                this.search();
            },
            clear(){
                this.department_name = '';
                this.params.department = '';
                this.search();
            },
            advancedSearch(){   //高级搜索
               $('#advancedSearch').modal('show')
            },
            getAdvanced(val){
                this.initialise();
                this.params.time = val.time;
                this.params.key = val.key;
                if(val.key_next !== ''){
                    this.params[val.key] = val.key_next;
                }
                this.search();
            },
            //增加账号
            addUser(){
                $('.rem_div').remove();
                $('#myModalAdd').modal('show');
            },
            //编辑账号
            edit(id){
                $('.rem_div').remove();
                $('#myModalRevise').modal('show');
                this.$http.post('manager/user/readUser/id/' + id).then((res) => {
                    this.editData = res.data.data.data;
                })
            },
            //启用账号
            startAccount(id){
                this.operateId = id;
                this.confirmMsg = {msg: '您确定启用此账号吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'startAccount';
            },
            //停止账号
            suspendAccount(id){
                this.operateId = id;
                this.confirmMsg = {msg: '您确定停用此账号吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'suspendAccount';
            },
            //离职
            leaveAccount(id){
                this.operateId = id;
                this.confirmMsg = {msg: '您确定离职此员工吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'leaveAccount';
            },
            deleteAccount(id){
                this.operateId = id;
                this.confirmMsg = {msg: '您确定删除此账号吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'deleteAccount';
            },
            getConfirm(){
                switch (this.msgFlag){
                    case 'startAccount' :
                        this.$http.post('manager/user/disable/id/'+this.operateId).then((res) => {
                            if(res.data.code==='90030'){
                                this.searchUser();
                                this.successMsg(res.data.msg);
                            }else{
                                this.errorMsg(res.data.msg);
                            }

                        });
                        break;
                    case 'suspendAccount' :
                        this.$http.post('manager/user/disable/id/'+this.operateId).then((res) => {
                            if(res.data.code==='90030'){
                                this.searchUser();
                                this.successMsg(res.data.msg);
                            }else{
                                this.errorMsg(res.data.msg);
                            }
                        });
                        break;
                    case 'leaveAccount' :
                        this.$http.get('manager/user/dismiss/id/'+this.operateId).then((res) => {
                            if(res.data.code==='90030'){
                                this.searchUser();
                                this.successMsg(res.data.msg);
                            }else{
                                this.errorMsg(res.data.msg);
                            }
                        });
                        break;
                    case 'deleteAccount' :
                        this.$http.get('manager/user/softDelete/id/'+this.operateId).then((res) => {
                            if(res.data.code==='90090'){
                                this.searchUser();
                                this.successMsg(res.data.msg);
                            }else{
                                this.errorMsg(res.data.msg);
                            }
                        })
                }
            },            //模拟登陆
            simulates (val, address){
                this.$http.post(address, {
                    id: val
                }).then((res) => {
                    if (res.data.code === '80000') {
                        window.location.href = 'index'
                    }
                })
            },
            reviseExamine(){    //编辑结束
                this.searchUser();
            },
            reset(){
                this.department_name = '';
                this.initialise();
                this.search();
            },
            initialise(){
                this.params ={
                    keywords : '',
                    key : '',
                    pages : '',
                    department : '',
                    time : '',
                };
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
            picked(item,e){
//                let evInput = e.target.getElementsByTagName('input')[0];
                e.target.checked = !e.target.checked;
                if(e.target.checked){
                    this.userSelectId.push(item.id)
                }else {
                    this.userSelectId=this.userSelectId.filter((x) => x!==item.id);
                }
            },
            pickedAll(e){
//                let evInput = e.target.getElementsByTagName('input')[0];
                e.target.checked = !e.target.checked;
                if (e.target.checked) {
                    this.userSelectId = this.userSelectId.concat(this.allId);
                } else {
                    this.userSelectId =this.difference(this.userSelectId,this.allId)
                }
            },
            difference(a,b) {
                for(let i=0; i < b.length; i++){
                    for(let j=0; j < a.length; j++){
                        if(a[j] === b[i]){
                            a.splice(j,1);
                            j--;
                        }
                    }
                }
                return a;
            }
        }
    }
</script>

<style scoped>
    .panel-body {
        padding: 8px 8px 0 15px;
    }

    input[type=checkbox]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;

    }

    input[type=radio] {
        margin-left: 5px;
    }

    .pro-sort {
        margin-top: 10px;
        margin-bottom: 18px;
        padding: 0;
        margin-right: 5px
    }

    .panel-body ul {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
    }

    .panel-body ul li {
        float: left;
    }

    .panel-body ul li + li:before {
        content: '|';
        margin: 0 10px;
    }

    div.pull-right {
        margin-top: 5px;
    }

    .icon i {
        font-size: 16px;
        cursor: pointer;
    }

    .icon i:nth-of-type(1) {
        color: #ccc;
    }

    .icon i + i {
        margin-left: 8px;
    }

    @media (max-width: 767px) {
        select {
            margin-bottom: 5px;
        }

        .pro-sort {
            margin-top: 0;
            margin-bottom: 5px;
        }
    }
    .cancel>img{
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
    /*高级搜索*/
    .fa-filter{
        display: inline-block;
        width: 34px;
        height: 34px;
        font-size: 26px;
        opacity: .5;
        line-height: 34px;
        text-align: center;
        border-radius: 5px;
        background-color: #efefef;
        cursor: pointer;
    }
    /*头像样式*/
    .head {
        vertical-align: middle;
        display: inline-block;
        width: 33px;
        height: 33px;
        border-radius: 50%;
    }
    /*下拉框样式*/
    .btn-default {
        background-color: #fff;
        border-color: #fff;
        color: #666;
    }

    .btn-default:hover {
        background-color: #dedede;
        border-color: #dedede;
        color: #fff;
    }
    .dropdown-menu {
        padding: 0;
    }

    dropdown-menu li:hover {
        background-color: #dedede;

    }

    .btn-lg {
        border-radius: 0;
        font-size: 12px;
    }
    ul.dropdown-menu li button {
        line-height: 33px;
        width: 100%;
        padding: 0;
        border-radius: 0;
    }
    .table-responsive {
        overflow: visible;
    }
</style>