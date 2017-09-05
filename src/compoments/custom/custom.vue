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
                <div v-if="pitch.length === 0">
                    <div v-if="flag">
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_status" @change="search_c">
                                    <option value="" selected="selected">客户状态</option>
                                    <option v-for="(val, index) in select_list.customer_status" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_intention" @change="search_c">
                                    <option value="" selected="selected">客户意向</option>
                                    <option v-for="(val, index) in select_list.customer_will" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_id" @change="search_c">
                                    <option value="" selected="selected">客户身份</option>
                                    <option v-for="(val, index) in select_list.identity" :value="index">{{val}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_source" @change="search_c">
                                    <option value="" selected="selected">客户来源</option>
                                    <option v-for="(val, index) in select_list.source" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_type" @change="search_c">
                                    <option value="" selected="selected">个人/中介</option>
                                    <option v-for="(val,index) in select_list.person_medium" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>

                        <div class="pro-sort" style="height: 39px;">
                            <label style="margin-top: 8px;padding-left: 25px;" :class="{'label_check':true,'c_on':return_sea.Trid,'c_off':!return_sea.Trid}" @click.prevent="trid($event,1)">
                                <input type="checkbox" class="pull-left">三天内未成交
                            </label>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2"
                             style="padding: 0;margin-right: 20px;">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="return_sea.sea_info"
                                       @keyup.enter="sea_cus(1)"
                                       placeholder="客户名/手机号">
                                <span class="input-group-btn">
                                    <button class="btn btn-success" @click="sea_cus(1)" type="button">搜索</button>
                                </span>
                            </div>
                        </div>
                        <div class="pro-sort">
                            <button class="btn btn-success" type="button" @click="collectList(1)">重置</button>
                        </div>
                        <div class="pull-right">
                            <a class="btn btn-success"
                               @click="customers_new('new')">
                                <i class="fa fa-plus-square"></i>&nbsp;增加客户
                            </a>
                        </div>
                    </div>

                    <div class="pull-right" v-if="!flag && flag1 === false">
                        <a class="btn btn-success" @click="showFlag"
                           style="background-color: transparent;color: #797979;border: 0;padding: 0;margin: 0;">
                            <a style="border-bottom: 1px solid #667FA0;">点击显示筛选条件</a>
                        </a>
                    </div>
                    <div v-if="flag && flag1 === false">
                        <a class="btn btn-success col-xs-12" @click="showFlag"
                           style="background-color: transparent;color: #797979;border: 0;padding:8px 0 0 0;margin: 0;">
                            <a class="pull-right" style="border-bottom: 1px solid #667FA0;">点击隐藏筛选条件</a>
                        </a>
                    </div>
                </div>

                <!--被选中一个-->
                <div v-if="pitch.length === 1" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="add_state('daily')"><i
                                    class="fa fa-file-text"></i>&nbsp;增加沟通日志</a></h5>
                        </li>
                        <li>
                            <h5><a @click="add_state('pool')"><i
                                    class="fa fa-users"></i>&nbsp;放入客户池</a></h5>
                        </li>
                        <li>
                            <h5><a @click="distribution_"><i class="fa fa-sitemap"></i>&nbsp;分配</a>
                            </h5>
                        </li>
                        <li>
                            <h5><a @click="customers_rev('rev')"><i class="fa fa-pencil"></i>&nbsp;编辑</a>
                            </h5>
                        </li>
                        <li>
                            <h5><a v-if="top === 1" @click="stick(pitch,top)"><i class="fa fa-arrow-up"></i>&nbsp;置顶</a>
                            </h5>
                            <h5><a v-if="top === 2" @click="stick(pitch,top)"><i class="fa fa-times-circle-o"></i>&nbsp;取消置顶</a>
                            </h5>
                        </li>
                    </ul>
                </div>

                <!--选中两个以上-->
                <div v-if="pitch.length > 1" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="add_state('pool')"><i
                                    class="fa fa-users"></i>&nbsp;放入客户池</a></h5>
                        </li>
                        <li>
                            <h5><a @click="distribution_"><i class="fa fa-sitemap"></i>&nbsp;分配</a>
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
                            <th class="text-center width80">客户名称</th>
                            <th class="text-center width50">尊称</th>
                            <th class="text-center width110">手机号</th>
                            <th class="text-center width80">客户意向</th>
                            <th class="text-center width100">跟进进度</th>
                            <th class="text-center width90">来源</th>
                            <th class="text-center width80">客户状态</th>
                            <th class="text-center width80">客户身份</th>
                            <th class="text-center width80">个人/中介</th>
                            <th class="text-center width80">负责人</th>
                            <th class="text-center width50">置顶</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in custom_list"
                            :class="{'selected': pitch.indexOf(list.id) > -1}">
                            <td class="text-center">
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(list.id) > -1,'c_off':pitch.indexOf(list.id)==-1}"
                                       @click.prevent="rules(list.id, $event, list.name)">
                                    <input type="checkbox" class="pull-left"
                                           :checked="pitch.indexOf(list.id) > -1">
                                </label>
                            </td>
                            <td class="text-center">{{list.name}}</td>
                            <td class="text-center">{{select_list.gender[list.gender]}}</td>
                            <td class="text-center">{{list.mobile}}</td>
                            <td class="text-center">{{select_list.customer_will[list.customer_will]}}</td>
                            <td class="text-center">
                                <a data-v-2f43a2b3="" href="#">
                                    <div data-v-2f43a2b3="" class="progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: list.follow + '%'}">
                                            <span data-v-2f43a2b3="" class="sr-only">{{list.follow}}%</span>
                                        </div>
                                    </div>
                                </a>
                            </td>
                            <td class="text-center">{{select_list.source[list.source]}}</td>
                            <td class="text-center">{{select_list.customer_status[list.customer_status]}}</td>
                            <td class="text-center">{{select_list.identity[list.identity]}}</td>
                            <td class="text-center">{{select_list.person_medium[list.person_medium]}}</td>
                            <td class="text-center">{{list.staff_id}}</td>
                            <td class="text-center">
                                <a v-if="list.top === 1" @click="stick(list.id,2)">
                                    <i class="fa fa-thumb-tack"></i>
                                </a>
                            </td>
                            <td class="text-center">
                                <router-link :to="{path:'/details',query: {nameId: list.id, cus: 1, sear: return_sea}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-show="isShow">
                            <td colspan="14" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--增加日志/增加提醒/放入客户池-->
        <remindDaily @pitches="collectList" :state="bool" :msg="pitch"></remindDaily>

        <!--客户 新增/修改-->
        <new-add @cus_list="succ" :msg="revise_state" :revise="revise_cus" :selects="select_list"></new-add>

        <!--分配-->
        <Distribution @distribution="collectList" :pit="pitch" :msg="cus_name"></Distribution>

        <!--分页-->
        <Page @pag="sea_cus" :pg="return_sea.paging" :beforePage="return_sea.beforePage"></Page>

        <Status :state="info"></Status>

        <!--加载-->
        <Loading v-if="wait === 1"></Loading>

    </div>
</template>

<script>
    import Page from '.././common/page.vue'                             //分页
    import newAdd from './new_add.vue'                                  //新增/修改客户
    import Status from '../common/status.vue'                           //提示信息
    import remindDaily from './remindDaily.vue'                         //修改客户
    import Distribution from '../common/distribution.vue'               //分配
    import Loading from '../loading/Loading.vue'                        //Loading

    export default {
        components: {Page, Distribution, newAdd, remindDaily, Status, Loading},
        data (){
            return {
                flag: true,
                flag1: false,
                wait: 1,
                top: '',                    //置顶/取消置顶
                select_list: {},            //select字典
                custom_list: [],            //列表
                pitch: [],                  //选中id
                bool: '',
                cus_name: [],               //派发信息
                temporary_save: {},         //临时储存客户
                revise_cus: {},             //修改客户
                revise_state: '',           //新增/修改客户状态
//                搜索字典
                return_sea: {
                    paging: '',                 //总页数
                    beforePage: 1,              //当前页数
                    Trid: '',                   //三天内未成交
                    sea_info: '',               //客户名/手机号搜索
                    sea_status: '',             //客户状态
                    sea_intention: '',          //客户意向
                    sea_id: '',                 //客户身份
                    sea_source: '',             //客户来源
                    sea_type: '',               //个人/中介
                },
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
                isShow: false,
                sea_status: ''
            }
        },
        mounted (){
            this.IsPC();
            this.sea_status = this.$route.query.cus;
            if (this.sea_status === 1) {
                this.collectList(this.$route.query.sear.beforePage);
            } else {
                this.collectList(1);
            }
        },
        methods: {
            showFlag (){
                this.flag = !this.flag;
            },
            IsPC(){
                let userAgentInfo = navigator.userAgent;
                let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
                let flag = true;
                let flag1 = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        flag1 = false;
                        break;
                    }
                }
                this.flag = flag;
                this.flag1 = flag1;
            },
//            select搜索
            search_c (){
                this.sea_cus(1);
            },
//            三天内未成交
            trid(val, pag) {
//                console.log(val.target.getElementsByTagName('input')[0]);
                let valInput = val.target.getElementsByTagName('input')[0];
                valInput.checked = !valInput.checked;
                this.return_sea.Trid = valInput.checked;
                if (valInput.checked) {
                    this.$http.post('core/customer/customerList', {
                        unsettled: true
                    }).then((res) => {
                        if (res.data.code === '70031') {
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            this.return_sea.paging = '';
                            this.custom_list = [];
                            this.isShow = true;
                        } else {
                            this.custom_list = res.data.data.list;
                            this.return_sea.paging = res.data.data.pages;
                            this.return_sea.beforePage = pag;
                        }
                    });
                }
                if (!valInput.checked) {
                    this.$http.post('core/customer/customerList', {
                        unsettled: false
                    }).then((res) => {
                        if (res.data.code === '70030') {
                            this.custom_list = res.data.data.list;
                            this.return_sea.paging = res.data.data.pages;
                            this.return_sea.beforePage = pag;
                            this.isShow = false;
                        } else {
                            this.custom_list = [];
                            this.isShow = true;
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    });
                }
            },

//            新增客户展示列表
            succ (){
                this.collectList(1);
            },
//            客户列表
            collectList (val){
                this.wait = 1;
                if (this.sea_status !== 1) {
                    this.return_sea.sea_status = '';
                    this.return_sea.sea_intention = '';
                    this.return_sea.sea_id = '';
                    this.return_sea.sea_source = '';
                    this.return_sea.sea_type = '';
                    this.return_sea.sea_info = '';
                }
                this.return_sea.beforePage = val;
//                字典
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;
                    if (this.sea_status === 1) {
                        this.sea_status = 2;
                        this.return_sea = this.$route.query.sear;
                        this.sea_cus(val);
                        this.wait = 2;
                    } else {
//                列表
                        this.$http.post('core/customer/customerList').then((res) => {
                            this.wait = 2;
                            if (res.data.code === '70030') {
                                this.custom_list = res.data.data.list;
                                this.return_sea.paging = res.data.data.pages;
                                this.isShow = false;
                                this.pitch = [];
                                this.cus_name = [];
                            } else {
                                this.wait = 2;
                                this.custom_list = [];
                                this.isShow = true;
                                //失败信息 ***
                                this.info.error = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                    }
                });

            },

//            搜索
            sea_cus (val){
                if (this.return_sea.Trid === true) {
                    this.return_sea.sea_status = '';
                    this.return_sea.sea_intention = '';
                    this.return_sea.sea_id = '';
                    this.return_sea.sea_source = '';
                    this.return_sea.sea_type = '';
                    this.return_sea.sea_info = '';
                }
                this.return_sea.beforePage = val;
                this.$http.post('core/customer/customerList/page/' + val, {
                    customer_status: this.return_sea.sea_status,
                    customer_will: this.return_sea.sea_intention,
                    identity: this.return_sea.sea_id,
                    source: this.return_sea.sea_source,
                    person_medium: this.return_sea.sea_type,
                    keywords: this.return_sea.sea_info,
                    unsettled: this.return_sea.Trid,
                }).then((res) => {
                    if (res.data.code === '70030') {
                        this.custom_list = res.data.data.list;
                        this.return_sea.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.return_sea.paging = '';
                        this.custom_list = [];
                        this.isShow = true;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
//            增删数组
            rules (rul, eve, cus){
//                console.log(eve.target.getElementsByTagName('input')[0])
                let evInput = eve.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(rul);
                    this.cus_name.push(cus);
                    this.$http.get('core/customer/readCustomer/id/' + rul).then((res) => {
                        this.temporary_save = {};
                        this.temporary_save = res.data.data;
                        if (res.data.data.top === 1) {
                            this.top = 2;
                        } else if (res.data.data.top === 2) {
                            this.top = 1;
                        }
                    });
                }
                if (!evInput.checked) {
                    $('.rem_div').remove();
                    let index = this.pitch.indexOf(rul);
                    let cus_name = this.cus_name.indexOf(cus);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    if (cus_name > -1) {
                        this.cus_name.splice(cus_name, 1);
                    }
                }

            },

//            增加日志/放入客户池
            add_state (val){
                this.bool = val;
                $('#remindDaily').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            分配
            distribution_ (){
                $('#distribution').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },

//            新增客户
            customers_new (val){
                this.revise_state = val;
                $('#customModel').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });

            },
//            修改客户
            customers_rev (val){
                this.revise_cus = this.temporary_save;
                this.revise_state = val;
                $('#customModel').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },

//            置顶
            stick (val, num){
                this.$http.get('core/customer/stick/id/' + val + '/top/' + num).then((res) => {
                    //成功信息 ***
                    this.info.success = res.data.msg;
                    //显示成功弹窗 ***
                    this.info.state_success = true;
                    if (this.top === 1) {
                        this.top = 2;
                    } else if (this.top === 2) {
                        this.top = 1;
                    }
                    this.$http.post('core/customer/customerList').then((res) => {
                        this.custom_list = res.data.data.list;
                        this.return_sea.paging = res.data.data.pages;
                        this.pitch = [];
                        this.cus_name = [];
                    });
                });
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

    .selected {
        background: #fffcd9 !important;
    }

</style>
