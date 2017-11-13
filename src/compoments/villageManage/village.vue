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

                    <div class="pull-right">
                        <button class="btn btn-primary" @click="addVillage">
                            <i class="fa fa-plus-square"></i>&nbsp;添加小区
                        </button>
                    </div>
                </div>

                <div class="remind" v-if="selectId >0">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li @click="deleteVillage">
                            <h5>
                                <a><i class="fa fa-times-circle-o"></i> 删除</a>
                            </h5>
                        </li>
                        <li @click="editVillage">
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
                            <th class="text-center">详情</th>
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
                            <td>
                                <router-link :to="{path:'/villageDetail',query: {villageId: item.id , params :params}}">
                                   详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="7" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <Page :pg="pages" @pag="getPage" :beforePage="params.pages"></Page>
        <VillageAdd @success="successAdd"></VillageAdd>
        <Status :state='info'></Status>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <VillageEdit :startEdit ='startEdit' :villageId="selectId" @closeModal="reloading" @success="successEdit"></VillageEdit>
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
        data(){
            return{
                now : '',
                pages : '',
                villageId: '',
                isShow : false,
                params : {
                    pages : 1,
                    house_type : '',
                    built_year :'',
                    keywords : '',
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
            this.getHouseType();
        },
        methods:{
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