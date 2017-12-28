<template>
    <div>
        <ol class="breadcrumb">
            <li>小区管理</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div v-if="selectId == ''">
                    <div class="pro-sort">
                        <select class="form-control" @change="search" v-model="params.house_type">
                            <option value="">房屋类型</option>
                            <option v-for="(value,key) in dictionary.house_type" :value="key">{{value}}</option>
                        </select>
                    </div>
                    <div class="pro-sort">
                        <select class="form-control" @change="search" v-model="params.built_year">
                            <option value="">建造年限</option>
                            <option v-for="item in now" v-if="item>=1949" :value="item">{{item}}</option>
                        </select>
                    </div>

                    <div class="pro-sort">
                        <select class="form-control" v-model="params.province" @change="getCity">
                            <option value="">省</option>
                            <option :value="value.province_id"  v-for="(value,key) in province">
                                {{value.province_name}}
                            </option>
                        </select>
                    </div>
                    <div class="pro-sort" v-if="params.province != ''">
                        <select class="form-control" v-model="params.city" @change="getArea">
                            <option value="">市</option>
                            <option :value="value.city_id" v-for="(value,key) in city">
                                {{value.city_name}}
                            </option>
                        </select>
                    </div>
                    <div class="pro-sort" v-if="params.city != ''">
                        <select class="form-control" v-model="params.area" @change="getRegion">
                            <option value="">区/县</option>
                            <option :value="value.area_id" v-for="(value,key) in area">
                                {{value.area_name}}
                            </option>
                        </select>
                    </div>
                    <div class="pro-sort" v-if="params.area != ''">
                        <select class="form-control" v-model="params.region" @change="getVillageList">
                            <option value="">区域</option>
                            <option :value="value.id" v-for="(value,key) in region">
                                {{value.region_name}}
                            </option>
                        </select>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding-left: 0">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="params.keywords"
                                   placeholder="小区名称/地址/位置" @keyup ="search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search">搜索</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort col-xs-2 col-sm-2 col-md-2 col-lg-1" style="padding-left: 0">
                        <button class="btn btn-warning" @click="reset">
                            重置
                        </button>
                    </div>

                    <div class="pull-right" v-show="simulate.indexOf('House/houseSave')>-1||isSuper">
                        <button class="btn btn-primary" @click="addVillage">
                            <i class="fa fa-plus-square"></i>&nbsp;添加小区
                        </button>
                    </div>
                </div>

                <div class="remind" v-if="selectId >0">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li @click="deleteVillage" v-show="simulate.indexOf('House/houseDelete')>-1||isSuper">
                            <h5>
                                <a><i class="fa fa-times-circle-o"></i> 删除</a>
                            </h5>
                        </li>
                        <li @click="editVillage" v-show="simulate.indexOf('House/houseUpdate')>-1||isSuper">
                            <h5>
                                <a><i class="fa fa-edit"></i> 编辑</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>


        <!--列表显示-->
        <div class="has-js">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">小区名称</th>
                            <th class="text-center">地址</th>
                            <th class="text-center">小区别名</th>
                            <th class="text-center">房屋类型</th>
                            <th class="text-center">建造年限</th>
                            <th class="text-center">房屋栋数</th>
                            <th class="text-center" v-show="simulate.indexOf('House/houseRead')>-1||isSuper">详情</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="item in houseList">
                            <td>
                                <label :class="{'label_check':true,'c_on':selectId == item.id,'c_off':selectId != item.id}"
                                       @click.prevent="picked(item,$event)">
                                    <input type="checkbox" :value="item.id" :checked="selectId === item.id">
                                </label>
                            </td>
                            <td>{{item.village_name}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.village_alias}}</td>
                            <td>{{dictionary.house_type[item.house_type]}}</td>
                            <td>{{item.built_year}}</td>
                            <td>{{item.total_buildings}}</td>
                            <td  v-show="simulate.indexOf('House/houseRead')>-1||isSuper">
                                <router-link :to="{path:'/villageDetail',query: {villageId: item.id , params :params}}">
                                   详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="8" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <Page :pg="pages" @pag="getPage" :beforePage="params.pages"></Page>
        <Status :state='info'></Status>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <VillageEdit :startEdit ='startEdit' :villageId="selectId" @closeModal="reloading" @success="successEdit"></VillageEdit>

        <VillageAdd @success="successAdd"></VillageAdd>
        <Loading v-if='Waiting'></Loading>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import VillageAdd from './villageAdd.vue'
    import Status from '../common/status.vue';
    import Confirm from '../common/confirm.vue'
    import VillageEdit from './villageEdit.vue'
    import Loading from '../loading/Loading.vue'
    export default{
        components : {Page,VillageAdd,Status,Confirm,VillageEdit,Loading},
        props:['simulate', 'isSuper'],
        data(){
            return{
                now : '',
                pages : '',
                villageId: '',
                isShow : false,

                province : [],
                city : [],
                area :[],
                region :[],
                params : {
                    pages : 1,
                    house_type : '',
                    built_year :'',
                    keywords : '',
                    province : '',           //省
                    city : '',               //市
                    area :'',                //区、县
                    region :'',              //热门区域
                },
                dictionary:[],
                houseList : [],
                selectId : '',  //选中id
                allId :[],
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
                confirmMsg:[],
                startEdit : false,
                Waiting:true,
            }
        },
        mounted(){
            this.getProvince();
            this.getHouseType();
        },
        methods:{

            getProvince(){
                this.$http.get('core/villa/province').then((res) => {
                    this.province = res.data.data;
                    this.proposer_id = '';
                    this.params.city = '';
                    this.params.area = '';
                    this.params.region = '';
                })
            },
            getCity(){
                this.$http.get('core/villa/city/city_parent/' + this.params.province).then((res) => {
                    this.city = res.data.data;
                    this.params.city = '';
                    this.params.area = '';
                    this.params.region = '';
                    this.getVillageList();
                })
            },
            getArea(){
                this.getVillageList();
                this.$http.get('core/villa/area/area_parent/' + this.params.city).then((res) => {
                    this.area = res.data.data;
                    this.params.area = '';
                    this.params.region = '';
                    this.getVillageList();
                })
            },
            getRegion(){
                this.$http.get('core/villa/region/region_parent/' + this.params.area).then((res) => {
                    this.region = res.data.data;
                    this.params.region = '';
                    this.getVillageList();
                })
            },


            getHouseType(){
                this.now = new Date().getFullYear();
                this.$http.get('core/house/dict').then((res) => {
                    this.dictionary = res.data;
                    //接收返回上一级参数
                    if (this.$route.query.params !== undefined && this.$route.query.params.keywords !== undefined){
                        this.params = this.$route.query.params;
                    }

                    this.getVillageList();
                })
            },
            getVillageList(){
                this.$http.get('core/house/houseList',
                    {params: this.params}
                ).then((res) => {
                    if(res.data.code === '10000'){
                        this.houseList = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                        this.Waiting = false;

                        this.allId = [];
                        for (let j = 0; j < this.houseList.length; j++) {
                            this.allId.push(this.houseList[j].id)
                        }
                    }else {
                        this.houseList = [];
                        this.isShow = true;
                        this.pages = '';
                        this.Waiting = false;
                    }
                })
            },
            search(){
                this.params.pages = 1;
                this.getVillageList();
            },
            getPage(val){
                this.params.pages = val;
                this.getVillageList();
            },
            addVillage(){
                $('.rem_div').remove();
                $('#villageAdd').modal('show');
            },
            reset(){
                this.params = {
                    pages : 1,
                    house_type : '',
                    built_year :'',
                    keywords : '',
                    province : '',           //省
                    city : '',               //市
                    area :'',                //区、县
                    region :'',              //热门区域
                };
                this.getVillageList();
            },
            successAdd(){
                this.getVillageList();
            },
            picked(item,e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;

                if(evInput.checked){
                    this.selectId = item.id;
                }else {
                    this.selectId = '';
                }
            },

            deleteVillage(){
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.get('core/house/houseDelete/id/'+this.selectId).then((res) => {
                    if(res.data.code === '10040'){
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.selectId = '';
                        this.search();
                    }
                })
            },
            editVillage(){
                this.startEdit = true;
                $('.rem_div').remove();
                $('#villageEdit').modal('show');
            },
            reloading(){
                this.startEdit = false;
            },
            successEdit(){
                this.selectId = '';
                this.getVillageList();
            },
        },
    }
</script>

<style scoped>
    input,select{
        margin-bottom: 0;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
    @media (max-width: 767px) {
        input,select{
            margin-bottom: 6px;
        }
    }
    .remind ul{
        margin-bottom: 0px;
    }
</style>