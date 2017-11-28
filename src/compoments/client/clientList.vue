<template>
    <div>
        <ol class="breadcrumb">
            <li>客户管理</li>
            <li>客户</li>
        </ol>

        <!--客户-->
        <section class="panel">
            <div class="panel-body has-js">
                <!--没有选中-->
                <div v-if="pickedId.length===0">
                    <div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="params.customer_status" @change="search">
                                    <option value="" selected="selected">客户状态</option>
                                    <option v-for="(value, key) in dictionary.customer_status" :value="key">
                                        {{value}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="params.customer_will" @change="search">
                                    <option value="" selected="selected">客户意向</option>
                                    <option v-for="(value, key) in dictionary.customer_will" :value="key">
                                        {{value}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="params.identity" @change="search">
                                    <option value="" selected="selected">客户身份</option>
                                    <option v-for="(value, key) in dictionary.identity" :value="key">
                                        {{value}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="params.source" @change="search">
                                    <option value="" selected="selected">客户来源</option>
                                    <option v-for="(value, key) in dictionary.source" :value="key">
                                        {{value}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="params.person_medium" @change="search">
                                    <option value="" selected="selected">个人/中介</option>
                                    <option v-for="(value,key) in dictionary.person_medium" :value="key">
                                        {{value}}
                                    </option>
                                </select>
                            </label>
                        </div>

                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2"
                             style="padding: 0;margin-right: 20px;margin-left: 20px">
                            <div class="input-group">
                                <div class="input-group-btn">
                                    <button type="button" class="btn btn-primary dropdown-toggle" style="background: #fff;color: #666"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{searchType}} <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" @click="selectType($event)">
                                        <!--<li><a>全部</a></li>-->
                                        <li><a>客户名</a></li>
                                        <li><a>负责人</a></li>
                                        <li><a>手机号</a></li>
                                        <li><a>证件号</a></li>
                                    </ul>
                                </div><!-- /btn-group -->
                                <input type="text"  v-model="params.keywords" class="form-control"
                                       @keyup="search" placeholder="请选择搜索类型">
                                <span class="input-group-btn">
                                    <button class="btn btn-success" @click="search">搜索</button>
                                </span>
                            </div>
                        </div>
                        <div class="pro-sort">
                            <label style="margin-top: 8px;" class="label_check"
                                   :class="{'c_on':params.unsettled,'c_off':!params.unsettled}">
                                <input type="checkbox" class="pull-left" @click.prevent="isSettled($event)">三天内未成交
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label style="margin-top: 8px;" class="label_check"
                                   :class="{'c_on':params.all === 2,'c_off':params.all===1}">
                                <input type="checkbox" class="pull-left" @click.prevent="isAll">查看所有
                            </label>
                        </div>
                        <div class="pro-sort">
                            <button class="btn btn-primary" @click="reset">重置</button>
                        </div>
                        <div class="pull-right">
                            <a class="btn btn-primary" @click="addClient">
                                <i class="fa fa-plus-square"></i>&nbsp;增加客户
                            </a>
                        </div>
                    </div>
                </div>

                <!--被选中-->
                <div v-if="pickedId.length>0" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pickedId.length}}&nbsp;项</a></h5>
                        </li>
                        <li v-if="pickedId.length<2">
                            <h5  @click="add_state('daily')">
                                <a ><i class="fa fa-edit"></i>&nbsp;增加沟通日志</a>
                            </h5>
                        </li>
                        <li v-if="pickedId.length<2">
                            <h5 @click="addRemind">
                                <a><i class="fa fa-bell-o"></i> 提醒</a>
                            </h5>
                        </li>
                        <li v-if="simulate.indexOf('Customer/putInPool')>-1||isSuper">
                            <h5 @click="add_state('pool')">
                                <a><i class="fa fa-users"></i>&nbsp;放入客户池</a>
                            </h5>
                        </li>
                        <li v-if="pickedId.length<2 && simulate.indexOf('Customer/updateCustomer')>-1||isSuper">
                            <h5 @click="editClient">
                                <a><i class="fa fa-pencil"></i>&nbsp;编辑</a>
                            </h5>
                        </li>
                        <li v-if="pickedId.length<2">
                            <h5 v-if="top == null"  @click="stick('core/core_common/stick')">
                                <a><i class="fa fa-arrow-up"></i>&nbsp;置顶</a>
                            </h5>
                            <h5 v-if="top != null"  @click="stick('core/core_common/unstick')">
                                <a><i class="fa fa-times-circle-o"></i>&nbsp;取消置顶</a>
                            </h5>
                        </li>
                        <li v-if="pickedId.length<2&&simulate.indexOf('Customer/deleteCustomer')>-1||isSuper">
                            <h5 @click="deleteVillage">
                                <a><i class="fa fa-times-circle"></i>&nbsp;删除</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--客户列表-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">录入时间</th>
                            <th class="text-center">客户名称</th>
                            <th class="text-center">尊称</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">客户意向</th>
                            <th class="text-center">跟进进度</th>
                            <th class="text-center">来源</th>
                            <th class="text-center">客户状态</th>
                            <th class="text-center">客户身份</th>
                            <th class="text-center">身份证</th>
                            <th class="text-center">个人/中介</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">置顶</th>
                            <th class="text-center" v-if="simulate.indexOf('Customer/readCustomer')>-1||isSuper">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in clientList">
                            <!--<td >-->
                            <!--<a href="tel:400-888-6633">拨打电话</a>-->

                            <!--<a href="sms:19956321564">发送短信</a>-->
                            <!--</td>-->
                            <td class="text-center">
                                <label :class="{'c_on':pickedId.indexOf(item.id) > -1,'c_off':pickedId.indexOf(item.id)==-1}"
                                       class="label_check" @click.prevent="pick(item,$event)">
                                    <input type="checkbox" class="pull-left" :checked="pickedId.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td class="text-center">{{item.create_time}}</td>
                            <td class="text-center">{{item.name}}</td>
                            <td class="text-center">{{dictionary.gender[item.gender]}}</td>
                            <td class="text-center">
                                {{item.mobiles}}
                                <span v-if="item.mobiles.indexOf('*')<0">
                                        <a :href="'tel:'+item.mobiles">电话</a>
                                        <a :href="'sms:'+item.mobiles">短信</a>
                                    </span>
                            </td>
                            <td class="text-center">{{dictionary.customer_will[item.customer_will]}}</td>
                            <td class="text-center">
                                <a data-v-2f43a2b3="" href="#">
                                    <div class="progress progress-striped active">
                                        <div aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: item.follow + '%'}">
                                            <span class="sr-only">{{item.follow}}%</span>
                                        </div>
                                    </div>
                                </a>
                            </td>
                            <td class="text-center">{{dictionary.source[item.source]}}</td>
                            <td class="text-center">{{dictionary.customer_status[item.customer_status]}}</td>
                            <td class="text-center">{{item.identity}}</td>
                            <td class="text-center">{{item.id_num}}</td>
                            <td class="text-center">{{dictionary.person_medium[item.person_medium]}}</td>
                            <td class="text-center">{{item.manager_name}}</td>
                            <td class="text-center">
                                    <span v-if="item.top != null">
                                        <i class="fa fa-thumb-tack"></i>
                                    </span>
                            </td>
                            <td class="text-center" v-if="simulate.indexOf('Customer/readCustomer')>-1||isSuper">
                                <router-link :to="{path:'/clientDetail',query:{clientId : item.id,from:'client',searchInfo :params}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="16" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <!--分页-->
        <Page @pag="getPage" :pg="pages" :beforePage="params.page"></Page>
        <Status :state="info"></Status>
        <!--加载-->
        <Loading v-if="isWaiting"></Loading>
        <!--增加日志/增加提醒/放入客户池-->
        <remindDaily @pitches="operateSuccess" :state="bool" :msg="pickedId"></remindDaily>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <AddRemind :remindId="pickedId" @cus_seccess="successRemind"></AddRemind>
        <ClientEdit :editId="pickedId[0]" :startEdit="startEdit" :allCountry="allCountry" @close="closeModal" @success="success"></ClientEdit>
        <ClientAdd @click="successAdd"></ClientAdd>
    </div>
</template>

<script>
    import Page from '.././common/page.vue'                             //分页
    import Status from '../common/status.vue'                           //提示信息
    import Loading from '../loading/Loading.vue'                        //Loading
    import remindDaily from './remindDaily.vue'                         //修改客户
    import ClientAdd from './clientAdd.vue'
    import Confirm from '../common/confirm.vue'
    import AddRemind from './addRemind.vue'
    import ClientEdit from './clientEdit.vue'

    export default{
        components:{Page,Status,Loading,remindDaily,ClientAdd,Confirm,ClientEdit,AddRemind},
        props:['simulate','isSuper'],
        data(){
            return{
                params: {
                    page: 1,              //当前页数
                    unsettled: false,                   //三天内未成交
                    keywords: '',               //客户名/手机号搜索
                    customer_status: '',             //客户状态
                    customer_will: '',          //客户意向
                    identity: '',                 //客户身份
                    source: '',             //客户来源
                    person_medium: '',       //个人/中介
                    all :1,                  //查看所有
                    type :'',                   //搜索类型
                },
                pages:'',                   // 总页数
                clientList:[],
                isWaiting : true,           // loading
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
                dictionary : [],
                bool:'',    //
                pickedId :[],
                isShow : false,
                top:'',
                confirmMsg:[],
                startEdit : false,
                allCountry : [],
                searchType : '请选择',
            }
        },
        created(){
            this.getDictionary();
        },
        methods:{
            getDictionary(){
                this.$http.post('index/country/index').then((res) => {
                    this.allCountry = res.data.data;
                });
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary = res.data;
                    //接收返回上一级参数
                    if (this.$route.query.searchInfo !== undefined && this.$route.query.searchInfo.keywords !== undefined){
                        this.params = this.$route.query.searchInfo;
                    }
                    this.getClientList();
                });
            },
            getClientList(){
                this.$http.get('core/customer/customerList',{
                    params:this.params
                }).then((res) => {
                    this.isWaiting = false;
                    if(res.data.code === '70030'){
                        this.clientList = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                    }else {
                        this.clientList = [];
                        this.pages = '';
                        this.isShow = true;
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },

            //获取当前页码
            getPage(val){
                this.params.page = val;
                this.getClientList();
            },
            search(){
                this.params.page = 1;
                this.getClientList();
            },
            isSettled(e){    //三天内未成交
                this.params.unsettled = !this.params.unsettled;
                this.getClientList();
            },
            isAll(){
                this.params.all = this.params.all === 1? 2:1;
                this.getClientList();
            },
            reset(){    //重置
                this.params = {
                    page: 1,              //当前页数
                    unsettled: false,                   //三天内未成交
                    keywords: '',               //客户名/手机号搜索
                    customer_status: '',             //客户状态
                    customer_will: '',          //客户意向
                    identity: '',                 //客户身份
                    source: '',             //客户来源
                    person_medium: '',       //个人/中介
                    all : 1,
                    type : ''
                };
                this.searchType = '请选择';
                this.getClientList();

            },
            pick(item,e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if(evInput.checked){
                    this.pickedId.push(item.id);
                    this.top = item.top;
                }else {
                    this.pickedId = this.pickedId.filter(function (x) {
                        return x !== item.id
                    })
                }
            },

            //增加日志/放入客户池
            add_state (val){
                this.bool = val;
                $('#remindDaily').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
            operateSuccess(val){
                this.pickedId = [];
                this.getClientList();
            },
            stick (val){
                this.$http.post(val, {
                    table_id: this.pickedId[0],
                    category: 'customer',
                }).then((res) => {
                    //成功信息 ***
                    this.info.success = res.data.msg;
                    //显示成功弹窗 ***
                    this.info.state_success = true;
                    this.pickedId = [];
                    this.getClientList();
                });
            },
            addClient(){
                $('.rem_div').remove();
                $('#clientAdd').modal('show');
            },
            deleteVillage(){
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal('show');
            },
            //确定删除
            getConfirm(){
                this.$http.get('core/customer/deleteCustomer/id/'+this.pickedId[0]).then((res) => {
                    if(res.data.code === '700105'){
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.pickedId = [];
                        this.search();
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            //编辑客户
            editClient(){
                this.startEdit = true;
                $('.rem_div').remove();
                $('#clientEdit').modal('show');
            },
            closeModal(){
                this.startEdit = false;
            },
            success(){
                this.pickedId = [];
                this.getClientList();
            },
            //添加提醒
            addRemind(){
                $('#addRemind1').modal('show');
            },
            successRemind(){
                this.pickedId = [];
                this.getClientList();
            },
            successAdd(){
                this.search();
            },
            selectType(e){
                this.searchType = e.target.text;
                switch (e.target.text){
                    case  '客户名' :
                        this.params.type = 'name';
                        break;
                    case  '负责人' :
                        this.params.type = 'manager_id';
                        break;
                    case  '手机号' :
                        this.params.type = 'mobile';
                        break;
                    case  '证件号' :
                        this.params.type = 'id_num';
                        break;
                }
            },
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

    .panel {
        padding-top: 0;
    }

    .pro-sort {
        padding-right: 6px;
        height: 39px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
    .progress.progress-striped.active {
        margin-bottom: 0;
        height: 10px;
    }

    .dropdown-menu {
        min-width: 84px;
        margin: 0;
    }
</style>
