<template>
    <div>
        <ol class="breadcrumb">
            <li>房屋管理</li>
            <li>待收房源</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-if="seletedId===0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.house_type" @change="search">
                                <option value="">房屋类型</option>
                                <option :value="key"  v-for="(value,key) in dictionary.house_type">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.rooms" @change="search">
                                <option value="">房型</option>
                                <option :value="key"  v-for="(value,key) in dictionary.rooms">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.decoration" @change="search">
                                <option value="">房屋装修</option>
                                <option :value="key"  v-for="(value,key) in dictionary.decoration">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.floor_type" @change="search">
                                <option value="">建筑楼层</option>
                                <option :value="key"  v-for="(value,key) in dictionary.floor_type">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.house_feature" @change="search">
                                <option value="">房屋特色</option>
                                <option :value="key"  v-for="(value,key) in dictionary.house_feature">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.area" @change="search">
                                <option value="">面积</option>
                                <option :value="key"  v-for="(value,key) in dictionary.area">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.person_medium" @change="search">
                                <option value="">个人/中介</option>
                                <option :value="key"  v-for="(value,key) in dictionary.person_medium">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 " style="margin-left: -15px;margin-right: 15px">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="请输入房屋地址" v-model="params.keywords" @keydown.enter="search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search">搜索</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort" style=" height: 39px;">
                        <a class="btn btn-success" @click="reset">&nbsp;重置
                        </a>
                    </div>
                    <div class="pull-right" style="margin-left: 10px;height: 39px;">
                        <a class="btn btn-success" @click="collectAdd"><i
                                class="fa fa-plus-square"></i>&nbsp;增加房屋
                        </a>
                    </div>
                </div>
                <!--选中-->
                <div class="col-lg-12 remind" v-if="seletedId>0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#delete"><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--客户列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">地址</th>
                            <th class="text-center">房屋类型</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">面积</th>
                            <th class="text-center">装修</th>
                            <th class="text-center">建筑楼层</th>
                            <th class="text-center">房屋特色</th>
                            <th class="text-center">个人/中介</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in villalist">
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left" :value="item.id"
                                       :checked="seletedId===item.id" @click="changeIndex($event,item.id)">
                            </td>
                            <td class="text-center">{{item.detailed_address}}</td>
                            <td class="text-center">{{dictionary.house_type[item.house_type]}}</td>
                            <td class="text-center">
                                <span v-if="item.rooms !==null && item.rooms !== undefined">
                                    {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫
                                </span>
                            </td>
                            <td class="text-center">{{item.area}}㎡</td>
                            <td class="text-center">{{dictionary.decoration[item.decoration]}}</td>
                            <td class="text-center">{{dictionary.floor_type[item.floor_type]}}</td>
                            <td class="text-center">{{dictionary.house_feature[item.house_feature]}}</td>
                            <td class="text-center">{{dictionary.person_medium[item.person_medium]}}</td>
                            <td class="text-center">{{item.staff_id}}</td>
                            <td class="text-center">
                                <router-link :to="{path:'/collectMore',query: {unCollectId: item.id,params:params}}">
                                    详情
                                </router-link>
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
        </div>
        <!--房屋 新增-->
        <Collect-add :dictionary="dictionary" @addHouse="alreadyAdd"></Collect-add>

        <!--分页-->
        <Page :pg="pages" @pag="pageSearch" :beforePage="params.page"></Page>

        <Delete @IsSure="deleteHouse"></Delete>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import CollectAdd from './houseAdd.vue'
    import Page from '../common/page.vue'
    import Delete from './deleteHouse.vue'
    import Status from  '../common/status.vue'
    export default {
        components: {Page, CollectAdd,Delete,Status}, //, New_add
        data (){
            return {
                custom_list: [],            //列表
                paging: '',                 //总页数
                pitch: [],                  //选中id
                cus_name: [],
                noColl: {
                   newState: true,              //新增房屋
                   sss: true
                },
                /***MR'D***/
                dictionary:[],      //字典列表
                villalist:[],       //未收房屋列表
                isShow:false,
                checkboxModel:[],
                deleteHouseId:[],
                params :{
                    house_type:"",//房屋类型
                    rooms:'',     //房型
                    decoration:'',//装修
                    house_feature:'',//房屋特色
                    floor_type:"",
                    area:'',    //面积
                    keywords:'',
                    person_medium:'',
                    page:'',
                },
                seletedId:0,
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
                pages:'',   // 总页数
                keepStatus : false,
            }
        },
        created (){
            this.getDictionary();
        },
        methods: {
           //字典列表
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;
                    if(this.$route.query.params !== undefined && this.$route.query.params.keywords !== undefined){
                        this.params = this.$route.query.params;
                        this.keepStatus = true;
                    }else {
                        this.keepStatus = false;
                    }
                    this.searchUncollect();
                });
            },
            searchUncollect(){
                this.$http.post('core/villa/villalist',this.params).then((res) => {
                    if(res.data.code==='80030'){
                        this.villalist=res.data.data.list;
                        this.isShow=false;
                        this.pages=res.data.data.pages;;
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else{
                        this.villalist = [];
                        this.pages = 1;
                        this.isShow=true;
                    }

                });
            },
            //重置
            reset(){
                this.params.house_type = '';
                this.params.rooms = '';
                this.params.decoration = '';
                this.params.house_feature = '';
                this.params.person_medium = '';
                this.params.area='';
                this.params.page=1;
                this.params.keywords='',
                this.params.floor_type='',
                this.searchUncollect();
            },
            changeIndex(e,id){
                if (e.target.checked){
                    this.seletedId = id;
                }else {
                    this.seletedId = 0;
                }


            },
            add_state (val){
                this.bool = val;
            },
            stick(index){
                alert(index)
                index=0;
            },
            collectAdd(){
                $('.rem_div').remove();
                $('#collectAdd').modal({backdrop: 'static',});
                $('#collectAdd').modal('show');
            },
            alreadyAdd(){
                this.searchUncollect();
            },
            //删除房屋
            deleteHouse(val){
                if(val==='yes'){
                    this.$http.get('core/villa/deletevilla/id/' + this.seletedId).then((res) => {
                        if(res.data.code==='80040'){
                            this.info.success =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭成功信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            },2000);
                            this.search();
                            this.seletedId=0;
                        }else {
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }

                    });
                }
            },
            //分页
            pageSearch(val){
                this.params.page=val;
                this.searchUncollect();
            },
            search(){
                this.params.page=1;
                this.searchUncollect();
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

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
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

</style>
