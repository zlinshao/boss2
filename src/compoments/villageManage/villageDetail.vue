<template>
    <div>
        <ol class="breadcrumb">
            <li><router-link to="/village">小区管理</router-link></li>
            <li class="active">小区详情</li>

            <li class="pull-right" v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/village',query:{params:params}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-home"></i>&nbsp;小区信息

                        <a class="pull-right" @click="editVillage" v-show="simulate.indexOf('House/houseUpdate')>-1||isSuper">
                            <i class="fa fa-edit"></i>
                        </a>
                    </h4>
                </header>

                <div>
                    <div class="panel-body table-responsive client_info">
                        <div class="title">
                            <h4>个人信息</h4>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <div class="item">
                                    <span class="col-md-4">小区名称：</span>
                                    <span class="col-md-8">{{villageDetail.village_name}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">小区地址：</span>
                                    <span class="col-md-8">{{villageDetail.address}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">小区别名：</span>
                                    <span class="col-md-8">{{villageDetail.village_alias}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">建造年限：</span>
                                    <span class="col-md-8">{{villageDetail.built_year}}</span>
                                </div>

                            </div>

                            <div class="col-md-5">
                                <div class="item">
                                    <span class="col-md-4">栋数：</span>
                                    <span class="col-md-8">{{villageDetail.total_buildings}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">小区类型：</span>
                                    <span class="col-md-8">
                                        <span v-if="villageDetail.house_type !== undefined">
                                            {{dictionary.house_type[villageDetail.house_type]}}
                                        </span>
                                    </span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">物业费：</span>
                                    <span class="col-md-8">{{villageDetail.property_fee}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">地铁线路：</span>
                                    <span class="col-md-8">{{villageDetail.subway_road}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">照片：</span>
                                    <span class="col-md-8" v-if="villageDetail.album!==undefined">
                                        <a v-for="(img,index) in villageDetail.album.house_pic">
                                            <img :src="img.small" @click="showLargePic('house_pic',index)">
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="panel-body table-responsive client_info">
                        <div class="title">
                            <h4>小区简介</h4>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <div class="item">
                                    <span class="col-md-4">周边配套：</span>
                                    <span class="col-md-8">{{villageDetail.peripheral_info}}</span>
                                </div>
                            </div>

                            <div class="col-md-5">
                                <div class="item">
                                    <span class="col-md-4">小区简介：</span>
                                    <span class="col-md-8" style="word-break:break-all">{{villageDetail.content}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="panel-body table-responsive client_info">
                        <div class="title">
                            <h4>周边信息</h4>
                        </div>
                        <div class="map">
                            <div id="mapContainer" style="width: 800px;height: 400px;">
                                <h4 v-if="location.length==0||location[0]===''">暂无地图信息...</h4>
                            </div>
                            <div class="ambitusDetail" v-if="location.length>0&&location[0]!==''">
                                <div class="ambitusDetail_top" @click="changeActive($event)">
                                    <a class="active">交通</a>
                                    <a>学校</a>
                                    <a>医疗</a>
                                    <a>购物</a>
                                    <a>生活</a>
                                    <a>娱乐</a>
                                </div>
                            </div>
                            <div id="panel" class="roll"></div>
                        </div>
                    </div>
                </div>


            </div>
        </section>

        <PicModal :largePic="largePic"></PicModal>
        <VillageEdit :startEdit ='startEdit' :villageId="villageId" @closeModal="reloading" @success="successEdit"></VillageEdit>
    </div>
</template>

<script>
    import PicModal from '../common/largePic.vue'
    import VillageEdit from './villageEdit.vue'
    export default{
        components : {PicModal,VillageEdit},
        props:['simulate', 'isSuper'],
        data(){
            return {
                villageId : '',
                villageDetail :[],
                largePic:{},
                params:[],
                ambient : '交通',
//                cityCode :'',
                location:[],
                startEdit : false,
                dictionary : [],
            }
        },
        mounted(){
            this.villageId = this.$route.query.villageId;
            this.params = this.$route.query.params;
            this.getHouseType();

        },
        methods: {
            getHouseType(){
                this.$http.get('core/house/dict').then((res) => {
                    this.dictionary = res.data;

                    this.getVillageDetail();
                })
            },

            getVillageDetail(){
                this.$http.get('core/house/houseRead/id/' + this.villageId).then((res) => {
                    this.villageDetail = res.data.data;
//                    this.cityCode = res.data.data.code;
                    if(res.data.data.longitude!==null && res.data.data.latitude!== null){
                        this.location = [];
                        this.location.push(res.data.data.longitude);
                        this.location.push(res.data.data.latitude);

                        this.initMap();
                    }
                })
            },
            showLargePic(name,index){
                this.srcs = this.villageDetail.album[name];
                this.largePic = [{
                    src : this.srcs,
                    i : index
                }];
                $('#largePic').modal('show');
            },
            changeActive(e){
                if(e.target.nodeName === 'A'){
                    $(e.target).css('background','#fff').siblings().css('background','#ddd');
                    this.ambient = e.target.text;
                    if(this.ambient !== ''  ){
                        this.initMap();
                    }
                }
            },
            initMap(){
                let _this =this;

                let map = new AMap.Map("mapContainer", {
                    resizeEnable: true,
                    zoom: 15,
                    center:_this.location
                });
                let marker = new AMap.Marker({
                    position: _this.location
                });
                marker.setMap(map);
                AMap.service(["AMap.PlaceSearch"], function() {
                    let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 4,
                        type: _this.ambient,
                        pageIndex: 1,
                        city: '', //城市
                        map: map,
                        panel: "panel"
                    });

                    let centerPoint = _this.location; //中心点坐标

                    placeSearch.searchNearBy('', centerPoint, 500, function(status, result) {});

                });
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
                this.getVillageDetail();
            },
        }
    }
</script>

<style scoped>
    header h4 {
        font-weight: bold;
        border-bottom: 1px solid #aaaaaa;
        padding: 0 32px 8px;
    }
    h4 {
        font-weight: bold;
    }
    .item span{
        font-size: 14px;
        /*display: inline-block;*/
        padding: 15px 0 5px 0;
        /*border-bottom: 1px solid #aaaaaa;*/
        min-height: 41px;
    }

    .item span a img{
        display: inline-block;
        width: 41px;
        margin-right: 5px;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
    .map{
        padding: 15px 0 5px 10px;
        position: relative;
    }
    .ambitusDetail{
        width: 300px;
        height: 32px;
        background: #ddd;
        position: absolute;
        top: 25px;
        left: 500px;
        border: 1px solid silver;
    }

    .ambitusDetail_top>a{
        display: inline-block;
        width: 46px;
        text-align: center;
        line-height: 32px;
    }
    .active{
        background: #FFFFFF;
    }
    .item >span:first-child{
        color:#59ace2
    }

    #panel {
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        position: absolute;
        top: 57px;
        left: 500px;
        width: 300px;
        height: 345px;
    }
    .amap_lib_placeSearch{
        border: none;
    }
    .client_info span{
        word-break: break-all;
    }
</style>