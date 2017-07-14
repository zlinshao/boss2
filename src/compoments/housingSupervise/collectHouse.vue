<template>
    <div>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div v-if="houseSeleted.length===0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="house_type">
                                <option value="">房屋类型</option>
                                <option :value="key"  v-for="(value,key) in dictionary.house_type">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="rooms">
                                <option value="">房型</option>
                                <option :value="key"  v-for="(value,key) in dictionary.rooms">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="decoration">
                                <option value="">房屋装修</option>
                                <option :value="key"  v-for="(value,key) in dictionary.decoration">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="reference">
                                <option value="">参考价格</option>
                                <option :value="key"  v-for="(value,key) in dictionary.reference">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="house_feature">
                                <option value="">房屋特色</option>
                                <option :value="key"  v-for="(value,key) in dictionary.house_feature">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="area">
                                <option value="">面积</option>
                                <option :value="key"  v-for="(value,key) in dictionary.area">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="villa_status">
                                <option value="">房屋状态</option>
                                <option :value="key"  v-for="(value,key) in dictionary.villa_status">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="belong">
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
                            <input type="checkbox" class="pull-left" v-model="our_group">显示本组房屋
                        </label>
                    </div>
                    <div class="pro-sort">
                        <button class="btn btn-success" type="button" @click="reset">重置</button>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 pull-right" style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="搜索" v-model="keywords" @keydown.enter="searchHouseList">
                            <span class="input-group-btn">
                            <button class="btn btn-success" type="button" @click="searchHouseList">搜索</button>
                        </span>
                        </div>
                    </div>
                </div>
                <!--选中-->
                <div class="col-lg-12 remind" v-if="houseSeleted.length>0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{houseSeleted.length}}&nbsp;项</a></h5>
                        </li>
                        <li v-if="houseSeleted.length===1">
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
                                       v-model='checkboxModel' @click="picked(item.id,$event,item.top)">
                            </td>
                            <td class="text-center">{{item.address}}</td>
                            <td class="text-center">
                                {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫
                            </td>
                            <td class="text-center">{{item.area}}㎡</td>
                            <td class="text-center">{{dictionary.decoration[item.decoration]}}</td>
                            <td class="text-center">{{dictionary.house_feature[item.house_feature]}}</td>
                            <td class="text-center">{{item.reference}}</td>
                            <td class="text-center">{{}}</td>
                            <td class="text-center">{{dictionary.villa_status[item.status]}}</td>
                            <td class="text-center">{{item.belong}}</td>
                            <td class="text-center">{{item.department.name}}</td>
                            <td class="text-center">{{item.staff_id}}</td>
                            <td class="text-center">
                                <i class="fa fa-unlock-alt" ></i>
                                <i class="fa fa-unlock" ></i>
                            </td>
                            <td class="text-center">
                                <a v-if="item.top===1"><i class="fa fa-paperclip"></i></a>
                            </td>
                            <td class="text-center">
                                <router-link :to="{path:'/collectDetail',query: {CollectId: item.id}}">
                                    更多
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="houseList.length===0">
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
        <Page></Page>
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
                checkboxModel:[],
                houseSeleted:[],
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
                    console.log(this.dictionary)
                    this.$http.post('core/villa/receivedvillalist').then((res) => {
                        this.houseList=res.data.data.list;
                        console.log(this.houseList)
                    });
                });
            },
            searchHouseList(){
                this.$http.post('core/villa/receivedvillalist',
                    {
                        "house_type" : this.house_type,//房屋类型
                        'rooms':this.rooms,     //房型
                        'decoration':this.decoration,//装修
                        'reference':this.reference, //参考价格
                        'house_feature':this.house_feature,//房屋特色
                        'area':this.area,    //面积
                        'villa_status':this.villa_status,//房屋状态
                        'belong':this.belong,    //房屋所属
                        'our_group':this.our_group,
                        'keywords':this.keywords,
                        'department_id':this.departmentId,

                    }
                ).then((res) => {
                    if(res.data.code==='80030'){
                        this.houseList=res.data.data.list;
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.houseList=[];
                    }


                });
            },
            //选择部门
            selectDpm(){
                $('#selectCustom').modal('show');
                this.configure={length:1,class:'department',id:[9],name:'市场部'};
            },
            dpmSeleted(val){
                this.departmentName=val.department[0].name;
                this.departmentId=val.department[0].id;
            },
            //选中的checkout框
            picked (id,e,top){
                if(e.target.checked===true){
                    this.houseSeleted.push(id)
                    top === 2? this.top = 1:this.top = 2;
                }else {
                    for(let i=0;i<this.houseSeleted.length;i++){
                        if(id===this.houseSeleted[i]){
                            this.houseSeleted.splice(i,1)
                        }
                    }
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
                            this.houseSeleted=[];
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
                this.departmentName='';
                this.departmentId='';
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
