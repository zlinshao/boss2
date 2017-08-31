<template>
    <div>
        <ol class="breadcrumb">
            <li>客户管理</li>
            <li>客户池</li>
        </ol>
        <!--客户池-->
        <section class="panel">
            <div class="panel-body">

                <!--没有选中-->
                <div v-if="pitch.length === 0">
                    <div v-if="flag">
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_status" @change="search_c">
                                    <option value="" selected="selected">客户状态</option>
                                    <option v-for="(val,index) in select_list.customer_status" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>

                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_intention" @change="search_c">
                                    <option value="" selected="selected">客户意向</option>
                                    <option v-for="(val,index) in select_list.customer_will" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_id" @change="search_c">
                                    <option value="" selected="selected">客户身份</option>
                                    <option v-for="(val,index) in select_list.identity" :value="index">{{val}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_source" @change="search_c">
                                    <option value="" selected="selected">客户来源</option>
                                    <option v-for="(val,index) in select_list.source" :value="index">{{val}}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="return_sea.sea_belong" @change="search_c">
                                    <option value="" selected="selected">客户所属</option>
                                    <option v-for="(val,index) in select_list.belong" :value="index">{{val}}
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
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2"
                             style="padding: 0;margin-right: 20px;">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="sea_info" @keyup.enter="search_pool(1)"
                                       placeholder="客户名/手机号">
                                <span class="input-group-btn">
                            <button class="btn btn-success" type="button" @click="search_pool(1)">搜索</button>
                        </span>
                            </div>
                        </div>
                        <div class="pro-sort">
                            <button class="btn btn-success" type="button" @click="collectList(1)">重置</button>
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
                <!--选中两个以上-->
                <div v-if="pitch.length > 0" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#distribution"><i class="fa fa-sitemap"></i>&nbsp;分配</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--客户池列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center width80">客户名称</th>
                            <th class="text-center width50">尊称</th>
                            <th class="text-center width80">手机号</th>
                            <th class="text-center width100">客户意向</th>
                            <th class="text-center width80">跟进进度</th>
                            <th class="text-center width90">来源</th>
                            <th class="text-center width80">客户状态</th>
                            <th class="text-center width80">客户身份</th>
                            <th class="text-center width80">个人/中介</th>
                            <th class="text-center width80">客户所属</th>
                            <th class="text-center width80">负责人</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in custom_list"
                            :class="{'selected': pitch.indexOf(list.id) > -1}">
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left"
                                       :checked="pitch.indexOf(list.id) > -1"
                                       @click="rules(list.id, $event, list.name)">
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
                            <td class="text-center">{{list.belong}}</td>
                            <td class="text-center">{{list.staff_id}}</td>
                            <td class="text-center">
                                <router-link :to="{path:'/details',query: {nameId: list.id, cus: 2, sear: return_sea}}">
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

        <!--分配-->
        <Distribution @distribution="collectList" :pit="pitch" :msg="cus_name"></Distribution>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--分页-->
        <Page @pag="search_pool" :pg="return_sea.paging" :beforePage="return_sea.beforePage"></Page>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import New_add from './new_add.vue'
    import Status from '../common/status.vue';                  //提示信息
    import remindDaily from './remindDaily.vue'
    import Distribution from '../common/distribution.vue'       //分配
    export default {
        components: {Status, Page, Distribution, New_add, remindDaily},
        data (){
            return {
                flag: true,
                flag1: false,
                sea_info: '',               //客户名/手机号搜索
                select_list: {},            //select字典
                custom_list: [],            //列表
                pitch: [],                  //选中id
                bool: '',                   //remindDaily状态
                cus_name: [],               //分派名称
//                搜索字典
                return_sea: {
                    paging: '',                 //总页数
                    beforePage: 1,              //当前页数
                    sea_status: '',             //客户状态
                    sea_intention: '',          //客户意向
                    sea_id: '',                 //客户身份
                    sea_source: '',             //客户来源
                    sea_belong: '',             //客户所属
                    sea_type: '',               //个人/中介
                },
                info: {
                    //失败状态 ***
                    state_error: false,
                    //失败信息 ***
                    error: ''
                },
                isShow: false,
                sea_status: ''
            }
        },
        created (){
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
                this.search_pool(1);
            },

//            客户列表
            collectList (val){
                if (this.sea_status !== 1) {
                    this.return_sea.sea_status = '';             //客户状态
                    this.return_sea.sea_intention = '';          //客户意向
                    this.return_sea.sea_id = '';                 //客户身份
                    this.return_sea.sea_source = '';             //客户来源
                    this.return_sea.sea_belong = '';             //客户所属
                    this.return_sea.sea_type = '';               //个人/中介
                }
                this.return_sea.beforePage = val;
//                字典
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;
                    if (this.sea_status === 1) {
                        this.sea_status = 2;
                        this.return_sea = this.$route.query.sear;
                        this.search_pool(val);
                        this.wait = 2;
                    } else {
//                    列表
                        this.$http.post('core/customer_pool/customerpool/page/' + val).then((res) => {
                            if (res.data.code === '70040') {
                                this.custom_list = res.data.data.list;
                                this.return_sea.paging = res.data.data.pages;
                                this.isShow = false;
                                this.pitch = [];
                                this.cus_name = [];
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
                });
            },
//            搜索
            search_pool (val){
                this.return_sea.beforePage = val;
                this.$http.post('core/customer_pool/customerpool/page/' + val, {
                    customer_status: this.return_sea.sea_status,
                    customer_will: this.return_sea.sea_intention,
                    identity: this.return_sea.sea_id,
                    source: this.return_sea.sea_source,
                    person_medium: this.return_sea.sea_type,
                    keywords: this.sea_info,
                    belong: this.return_sea.sea_belong,
                }).then((res) => {
                    if (res.data.code === '70040') {
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
//            分配
            rules (rul, eve, cus){
                if (eve.target.checked === true) {
                    this.pitch.push(rul);
                    this.cus_name.push(cus)
                }
                if (eve.target.checked === false) {
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
//            remindDaily状态
            add_state (val){
                this.bool = val;
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

    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    .pro-sort {
        padding-right: 6px;
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
