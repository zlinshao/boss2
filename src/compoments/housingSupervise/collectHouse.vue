<template>
    <div>
        <ol class="breadcrumb">
            <li>房源管理</li>
            <li>公司房源</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div v-if="houseSeleted===0">
                    <div v-if="flag">
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
                                <select class="form-control" v-model="params.reference" @change="search">
                                    <option value="">参考价格</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.reference">{{value}}</option>
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
                                <select class="form-control" v-model="params.status" @change="search">
                                    <option value="">房屋状态</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.villa_status">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="params.belong" @change="search">
                                    <option value="">房屋所属</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.belong">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <input type="text" readonly class="form-control" placeholder="点击选择部门"
                                       @click="selectDpm" v-model="departmentName">
                            </label>
                        </div>
                        <div class="pro-sort" style="height: 39px;">
                            <label style="margin-top: 8px;">
                                <input type="checkbox" class="pull-left" v-model="params.our_group" @click="search">显示本组房屋
                            </label>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="请输入房屋地址"
                                       v-model="params.keywords" @keydown.enter="search">
                                <span class="input-group-btn">
                                    <button class="btn btn-success" type="button" @click="search">搜索</button>
                                 </span>
                            </div>
                        </div>
                        <div class="pro-sort">
                            <button class="btn btn-success" type="button" @click="reset">重置</button>
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

                <!--选中-->
                <div class="col-lg-12 remind" v-if="houseSeleted>0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a v-if="top == 1" @click="stick(houseSeleted,top)"><i class="fa fa-arrow-up"></i>&nbsp;置顶</a></h5>
                            <h5><a v-if="top == 2" @click="stick(houseSeleted,top)"><i class="fa fa-times-circle-o"></i>&nbsp;取消置顶</a></h5>
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
                            <th class="text-center width100">地址</th>
                            <th class="text-center width90">房型</th>
                            <th class="text-center width80">面积</th>
                            <th class="text-center width50">装修</th>
                            <th class="text-center width80">房屋特色</th>
                            <th class="text-center width100">参考租金</th>
                            <th class="text-center width100">剩余空置期（天）</th>
                            <th class="text-center width80">房屋状态</th>
                            <th class="text-center width80">房屋所属</th>
                            <th class="text-center width80">所属部门</th>
                            <th class="text-center width80">负责人</th>
                            <!--<th class="text-center">锁定</th>-->
                            <th class="text-center width50">置顶</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in houseList">
                            <td class="text-center">
                                <label ></label>
                                <input type="checkbox" class="pull-left"  :value="item.id"
                                       :checked="houseSeleted===item.id" @click="picked(item.id,$event,item.top)">
                            </td>
                            <td class="text-center">{{item.detailed_address}}</td>
                            <td class="text-center">
                                <span v-if="item.rooms !==null && item.rooms !== undefined">
                                    {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫
                                </span>
                            </td>
                            <td class="text-center">{{item.area}}㎡</td>
                            <td class="text-center">{{dictionary.decoration[item.decoration]}}</td>
                            <td class="text-center">{{dictionary.house_feature[item.house_feature]}}</td>
                            <td class="text-center">{{item.reference}}</td>
                            <td class="text-center"> {{item.surplus}}</td>
                            <td class="text-center">{{item.status_villa}}</td>
                            <td class="text-center">{{item.belong}}</td>
                            <td class="text-center">
                                <span v-if="item.department !== null && item.department !== undefined">
                                    {{item.department.name}}
                                </span>
                            </td>
                            <td class="text-center">{{item.staff_id}}</td>
                            <!--<td class="text-center">-->
                                <!--&lt;!&ndash;<i class="fa fa-unlock-alt" ></i>&ndash;&gt;-->
                                <!--<i class="fa fa-unlock" ></i>-->
                            <!--</td>-->
                            <td class="text-center">
                                <a v-if="item.top===1" @click="stick(item.id,2)">
                                    <i class="fa fa-thumb-tack"></i>
                                </a>
                            </td>
                            <td class="text-center">
                                <router-link :to="{path:'/collectDetail',
                                    query:{CollectId: item.id,params:params,departmentName,departmentName}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="14" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <!--分页-->
        <Page :pg="pages" @pag="pageSearch" :beforePage="params.page"></Page>
        <SelectDpm :configure="configure" @Staff="dpmSeleted"></SelectDpm>
        <!--提醒-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Page from '.././common/page.vue'
    import SelectDpm from '../common/organization/selectStaff.vue'
    import Status from '../common/status.vue';                          //提示信息
    export default {
        components: {Page,SelectDpm,Status},
        data (){
            return {
                flag: true,
                flag1: false,
                /*********/
                dictionary:[],      //字典列表
                configure:[],       //配置项
                houseList:[],
                isShow:false,
                checkboxModel:[],
                houseSeleted:0,
                top: '',            //置顶/取消置顶
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
                params:{
                    house_type:"",//房屋类型
                    rooms:'',     //房型
                    decoration:'',//装修
                    reference:'', //参考价格
                    house_feature:'',//房屋特色
                    area:'',    //面积
                    status:'',//房屋状态
                    belong:'',    //房屋所属
                    keywords:'',
                    our_group:false,
                    department_id:'',
                    page:'',
                },
                departmentName:'',
                pages:'',   // 总页数
                keepStatus : false,
            }
        },
        watch:{
            'params.our_group':{
                deep:true,
                handler(val,oldVal){
                    if(val){
                        this.params.house_type = '';
                        this.params.rooms = '';
                        this.params.decoration = '';
                        this.params.reference = '';
                        this.params.area='';
                        this.params.house_feature = '';
                        this.params.status = '';
                        this.params.belong = '';
                        this.params.keywords='';
                        this.params.department_id='';
                        this.params.page=1;
                        this.departmentName='';
                    }
                }
            }
        },
        created (){
            this.getDictionary();
        },
        mounted (){
            this.IsPC();
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
            //字典列表
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;

                    if(this.$route.query.params !== undefined && this.$route.query.params.keywords !== undefined){
                        this.params = this.$route.query.params;
                        this.departmentName = this.$route.query.departmentName;
                        this.keepStatus = true;
                    }else {
                        this.keepStatus = false;
                    }

                    this.searchHouseList();
                });
            },
            //搜索
            search(){
                this.params.page=1;
                this.searchHouseList();
            },

            //搜索房屋列表
            searchHouseList(){
                this.$http.post('core/villa/receivedvillalist',this.params).then((res) => {
                    if(res.data.code==='80030'){
                        this.houseList=res.data.data.list;
                        this.isShow=false;
                        this.pages=res.data.data.pages;
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.houseList=[];
                        this.pages=1;
                        this.isShow=true;
                    }


                });
            },
            //选择部门
            selectDpm(){
                $('#selectCustom').modal('show');
                this.configure={length:1,class:'department',id:[9],name:'市场部'};
            },
            dpmSeleted(val){
                if(val.department.length){
                    this.departmentName=val.department[0].name;
                    this.params.department_id=val.department[0].id;
                    this.search();
                }
            },
            //选中的checkout框
            picked (id,e,top){
                if(e.target.checked===true){
                    this.houseSeleted = id;
                    top === 2? this.top = 1:this.top = 2;
                }else {
                    this.houseSeleted = 0;
                }
            },
            // 置顶
            stick (val, num){
                this.$http.get('core/villa/stick/id/' + val + '/top/' + num).then((res) => {
                    if(res.data.code==='80090'){
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.top === 1 ? this.top =2 : this.top = 1;
                        this.houseSeleted = 0;
                        this.search();
                    }else{
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            reset(){
                this.params.house_type = '';
                this.params.rooms = '';
                this.params.decoration = '';
                this.params.reference = '';
                this.params.house_feature = '';
                this.params.status = '';
                this.params.belong = '';
                this.params.area='';
                this.params.page=1;
                this.params.keywords='',
                this.departmentName='';
                this.params.department_id='';
                this.search();
            },
            //分页搜索
            pageSearch(val){
                this.params.page=val;
                this.searchHouseList();
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
    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    input, select {
         margin-bottom: 0px;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
    .nav-tabs>li {
         margin-bottom: 0;
     }
</style>
