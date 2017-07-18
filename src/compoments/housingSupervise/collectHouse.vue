<template>
    <div>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div v-if="houseSeleted===0" class="row">
                    <div class="col-lg-12">
                        <div class="pro-sort">
                            <h5 style="font-weight: bold">房屋属性：</h5>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="house_type" @change="search">
                                    <option value="">房屋类型</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.house_type">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="rooms" @change="search">
                                    <option value="">房型</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.rooms">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="decoration" @change="search">
                                    <option value="">房屋装修</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.decoration">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="reference" @change="search">
                                    <option value="">参考价格</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.reference">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="house_feature" @change="search">
                                    <option value="">房屋特色</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.house_feature">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="area" @change="search">
                                    <option value="">面积</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.area">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="villa_status" @change="search">
                                    <option value="">房屋状态</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.villa_status">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="belong" @change="search">
                                    <option value="">房屋所属</option>
                                    <option :value="key"  v-for="(value,key) in dictionary.belong">{{value}}</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div class="col-lg-12" >
                        <div class="pro-sort">
                            <h5 style="font-weight: bold">部门属性：</h5>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <input type="text" readonly class="form-control" placeholder="点击选择部门"
                                       @click="selectDpm" v-model="departmentName">
                            </label>
                        </div>
                        <div class="pro-sort" style="height: 39px;">
                            <label style="margin-top: 8px;">
                                <input type="checkbox" class="pull-left" v-model="our_group" @click="search">显示本组房屋
                            </label>
                        </div>

                    </div>
                    <div class="col-lg-12" >
                        <div class="pro-sort">
                            <h5 style="font-weight: bold">&nbsp;&nbsp;&nbsp;关键字：</h5>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 10px">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="请输入房屋地址" v-model="keywords" @keydown.enter="search">
                                <span class="input-group-btn">
                                    <button class="btn btn-success" type="button" @click="search">搜索</button>
                                 </span>
                            </div>
                        </div>
                        <div class="pro-sort" style="">
                            <button class="btn btn-success" type="button" @click="reset">重置</button>
                        </div>

                    </div>

                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="houseSeleted>0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a v-if="top == 1" @click="stick(houseSeleted,top)">置顶</a></h5>
                            <h5><a v-if="top == 2" @click="stick(houseSeleted,top)">取消置顶</a></h5>
                        </li>
                    </ul>
                </div>
            </div>


        </section>

        <!--客户列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">地址</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">面积</th>
                            <th class="text-center">装修</th>
                            <th class="text-center">房屋特色</th>
                            <th class="text-center">参考租金</th>
                            <th class="text-center">剩余空置期</th>
                            <th class="text-center">房屋状态</th>
                            <th class="text-center">房屋所属</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">锁定</th>
                            <th class="text-center">置顶</th>
                            <th class="text-center">更多</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in houseList">
                            <td class="text-center">
                                <label ></label>
                                <input type="checkbox" class="pull-left"  :value="item.id"
                                       :checked="houseSeleted===item.id" @click="picked(item.id,$event,item.top)">
                            </td>
                            <td class="text-center">{{item.amap_json.villageName}}</td>
                            <td class="text-center">
                                {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫
                            </td>
                            <td class="text-center">{{item.area}}㎡</td>
                            <td class="text-center">{{dictionary.decoration[item.decoration]}}</td>
                            <td class="text-center">{{dictionary.house_feature[item.house_feature]}}</td>
                            <td class="text-center">{{item.reference}}</td>
                            <td class="text-center"> 0
                            </td>
                            <td class="text-center">{{dictionary.villa_status[item.status]}}</td>
                            <td class="text-center">{{item.belong}}</td>
                            <td class="text-center">{{item.department.name}}</td>
                            <td class="text-center">{{item.staff_id}}</td>
                            <td class="text-center">
                                <!--<i class="fa fa-unlock-alt" ></i>-->
                                <i class="fa fa-unlock" ></i>
                            </td>
                            <td class="text-center">
                                <a v-if="item.top===1" @click="stick(item.id,2)">
                                    <i class="fa fa-paperclip"></i>
                                </a>
                            </td>
                            <td class="text-center">
                                <router-link :to="{path:'/collectDetail',query: {CollectId: item.id}}">
                                    更多
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="15" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <!--分页-->
        <Page :pg="pages" @pag="pageSearch" :beforePage="currentPage"></Page>
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
                house_type:"",//房屋类型
                rooms:'',     //房型
                decoration:'',//装修
                reference:'', //参考价格
                house_feature:'',//房屋特色
                area:'',    //面积
                villa_status:'',//房屋状态
                belong:'',    //房屋所属
                keywords:'',
                our_group:false,
                departmentId:'',
                departmentName:'',
                pages:'',   // 总页数
                page:'',
                currentPage:1,

            }
        },
        watch:{
            'our_group':{
                deep:true,
                handler(val,oldVal){
                    if(val){
                        this.house_type = '';
                        this.rooms = '';
                        this.decoration = '';
                        this.reference = '';
                        this.area='';
                        this.house_feature = '';
                        this.villa_status = '';
                        this.belong = '';
                        this.keywords='';
                        this.departmentName='';
                        this.departmentId='';
                    }
                }
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
                    this.$http.post('core/villa/receivedvillalist').then((res) => {
                        if(res.data.code==='80030'){
                            this.houseList=res.data.data.list;
                            this.isShow=false;
                            this.pages=res.data.data.pages;
                        }else{
                            this.houseList=[];
                            this.pages=1;
                            this.isShow=true;
                        }
                    });
                });
            },
            searchHouseList(){
                this.currentPage=this.page;
                if(this.our_group===true){
                    this.house_type = '';
                    this.rooms = '';
                    this.decoration = '';
                    this.reference = '';
                    this.house_feature = '';
                    this.villa_status = '';
                    this.belong = '';
                    this.area='';
                    this.page=1;
                    this.keywords='',
                    this.departmentName='';
                    this.departmentId='';
                }

                this.$http.post('core/villa/receivedvillalist',
                    {
                        "house_type" : this.house_type,//房屋类型
                        'rooms':this.rooms,     //房型
                        'decoration':this.decoration,//装修
                        'reference':this.reference, //参考价格
                        'house_feature':this.house_feature,//房屋特色
                        'area':this.area,    //面积
                        'status':this.villa_status,//房屋状态
                        'belong':this.belong,    //房屋所属
                        'our_group':this.our_group,
                        'keywords':this.keywords,
                        'department_id':this.departmentId,  //部门id
                        'page':this.page,   //页码
                    }
                ).then((res) => {
                    if(res.data.code==='80030'){
                        this.houseList=res.data.data.list;
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
                    this.departmentId=val.department[0].id;
                }
            },
            //选中的checkout框
            picked (id,e,top){
                if(e.target.checked===true){
                    this.houseSeleted = id;
                    top === 2? this.top = 1:this.top = 2;
                }else {
                    this.houseSeleted = 0;
//                    for(let i=0;i<this.houseSeleted.length;i++){
//                        if(id===this.houseSeleted[i]){
//                            this.houseSeleted.splice(i,1)
//                        }
//                    }
                }
            },
            // 置顶
            stick (val, num){
                this.$http.get('core/villa/stick/id/' + val + '/top/' + num).then((res) => {
                    if(res.data.code==='80090'){
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        if (this.top === 1) {
                            this.top = 2;
                        } else if (this.top === 2) {
                            this.top = 1;
                        }
                        this.$http.post('core/villa/receivedvillalist').then((res) => {
                            this.houseList=res.data.data.list;
                            this.houseSeleted = 0;
                            this.checkboxModel=[];
                        });
                    }else{
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                });
            },
            reset(){
                this.house_type = '';
                this.rooms = '';
                this.decoration = '';
                this.reference = '';
                this.house_feature = '';
                this.villa_status = '';
                this.belong = '';
                this.area='';
                this.page=1;
                this.keywords='',
                this.departmentName='';
                this.departmentId='';
                this.searchHouseList();
            },
            //分页搜索
            pageSearch(val){
                this.page=val;
                this.searchHouseList();
            },
            //搜索
            search(){
                this.page=1;
                this.searchHouseList();
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
    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }
    .nav-tabs>li {
        margin-bottom: 0;
    }


    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
</style>
