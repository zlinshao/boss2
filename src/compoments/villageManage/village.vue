<template>
    <div>
        <ol class="breadcrumb">
            <li>小区管理</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div>
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
            </div>
        </section>


        <!--列表显示-->
        <div>
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
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
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import VillageAdd from './villageAdd.vue'
    export default{
        components : {Page,VillageAdd},
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
                    }else {
                        this.houseList = [];
                        this.isShow = true;
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
            }
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
</style>