<template>
<div>
        <div class="modal fade VillageModal" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" style="z-index: 1081;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" @click="clearInfo">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择小区</h4>
                    </div>
                    <div class="modal-body">
                        <div class="chooseContainer">
                            <div class="chooseBody">
                                <div class="headFrom col-lg-12 clearFix">
                                    <form class="form-inline clearFix" role="form" method="get">
                                        <div class="input-group">
                                            <select name="" class="form-control" v-model="chooseCity" @change="search">
                                                <!--<option value="" selected>所有城市</option>-->
                                                <option value="南京市">南京市</option>
                                                <option value="苏州市">苏州市</option>
                                                <option value="杭州市">杭州市</option>
                                                <option value="重庆市">重庆市</option>
                                                <option value="成都市">成都市</option>
                                                <option value="西安市">西安市</option>
                                                <option value="合肥市">合肥市</option>
                                                <option value="苏州市">昆山市</option>
                                            </select>
                                        </div>
                                        <div class="input-group">
                                            <label class="sr-only">搜索</label>
                                            <input type="text" class="form-control" placeholder="" @keyup="searchVillage" @keydown.enter.prevent="" v-model="searchInfo">
                                            <span class="input-group-btn">
                                                <button class="btn btn-success" type="button" @click="search">立即搜索</button>
                                            </span>
                                        </div>
                                        <div class="input-group">
                                            <a class="noData" @click="addNew">
                                                没有找到相应小区?点击新增
                                            </a>
                                        </div>
                                    </form>
                                </div>

                                <!--表格-->
                                <div class="col-lg-12">
                                    <section class="panel table table-responsive roll">
                                        <table class="table table-advance table-hover">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>小区名称</th>
                                                <th>地区</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in villages" @click="chooseItem($event)">
                                                <td>
                                                    <input type="radio" :value="item.id" name="address">
                                                </td>
                                                <td>{{item.name}}</td>
                                                <td>{{item.district}}</td>
                                            </tr>
                                            <tr class="text-center" v-show="villages.length==0">
                                                <td colspan="3">暂无数据...</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal" @click="clearInfo">取消</button>
                                <button type="button" class="btn btn-primary" @click="save">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addAddress" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static"
             style="z-index: 1082;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close"@click="cancelAdd"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">新增小区</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">小区名称：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="searchInfo" style="margin-bottom: 0">
                                    <a style="margin-top: 5px;display: inline-block;">
                                        小区名称规范：<br>
                                        1.有小区名——仙居雅苑，禁填xx路xx号<br>
                                        2.无小区名——水西门大街87号
                                    </a>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">小区地址：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="village_address" style="margin-bottom: 0">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">小区坐标：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="location" @click="selectLocation" readonly>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="cancelAdd">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveAdd">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!--坐标选取-->
    <div class="modal fade" id="location" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" data-backdrop="static" style="z-index: 1083;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">选取坐标</h4>
                </div>
                <div class="modal-body">
                    <div id="mapContainer1"  style="width: 570px;height: 400px;"></div>
                    <div id="panel"></div>
                    <div id="myPageTop">
                        <table>
                            <tr>
                                <td>
                                    <label>按关键字搜索：</label>
                                </td>
                                <td class="column2">
                                    <label>左击获取经纬度：</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="keywords" placeholder="请输入关键字进行搜索"  @keyup.enter="enterSearch">
                                </td>
                                <td class="column2">
                                    <input type="text" readonly id="lnglat" v-model="coordinate">
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                    <button type="button" class="btn btn-primary" @click="confirmLocation">保存</button>
                </div>
            </div>
        </div>
    </div>


        <!--提示信息-->
        <Status :state='info'></Status>
    </div>

</template>

<script>
    import Status from './status.vue';

    var addr="//restapi.amap.com/v3/assistant/inputtips?key=2cafb0027aa13d1c6b13542462b3c94f&datatype=poi&types=120300";
    var cityAddr = '//restapi.amap.com/v3/ip?key=2cafb0027aa13d1c6b13542462b3c94f&ip=';
    export default{

        data(){
            return {
                isShow : false,
                showContact : false,
                village_address : '',
                searchInfo : '',
                coordinate : '',
                location:'',
                keywords : '',
                chooseCity : '南京市',
                villages : [],
                villageId : '',
                village : {
                    villageAddress : '',
                    villageName : '',
                    district : '',
                    address : '',
                    id : '',
                    location : ''
                },
                ip : '',
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        components: {Status},
        created : function () {
//            let that = this;
            this.$http.get('ip')
                .then(
                    (res) => {
//                        console.log(res.data);
                        this.ip = res.data;
                        this.getCurrentCity();
                    }
                );

        },
//        updated (){
//            this.getCurrentCity();
//        },
        methods : {
            search(){
                this.villageId='';
                let a = $('input[type=radio]');
                for(let i = 0;i<a.length;i++){
                    a[i].checked = false
                }
                this.$http.defaults.withCredentials = false;
                this.$http.defaults.headers = {};
                this.$http.get(addr+'&keywords='+this.searchInfo+'&city='+this.chooseCity)
                    .then(
                        (res) => {
//                            console.log(res)
                            if (res.data.infocode==10000){
                                if (res.data.tips.length!=0){
                                    this.villages = res.data.tips;
                                    this.isShow = false;
                                } else {
                                    this.villages = [];
                                    this.isShow = true;
                                }
                            } else {
                                this.search();
                            }


                        }
                    );
                this.$http.defaults.withCredentials = true;
//                this.$http.defaults.headers.common['Env'] = globalConfig.env;
            },
            searchVillage(){// 搜索小区
                if (this.searchInfo.length == 0){
                    this.villages.splice(0,this.villages.length);
                    return;
                }
                    this.search();
            },
            clearInfo(){
                this.searchInfo = '';
                this.villages = [];
                this.isShow = false;
            },
            save(){
                if (this.villages.length==0){
                    this.info.error = '您尚未选择地址';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                    //一秒自动关闭成功信息弹窗 ***
                    setTimeout(() => {
                        this.info.state_error = false;
                    },2000);
                    return;
                }
                if (this.villageId==''){
                    this.info.error = '地址选择异常';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                    //一秒自动关闭成功信息弹窗 ***
                    setTimeout(() => {
                        this.info.state_error = false;
                    },2000);
//                    return;
                }else {
                    for ( var i in this.villages){
//                        console.log(this.villages[i]);
                        if (this.villages[i].id === this.villageId){
                            this.village.villageAddress = this.villages[i].district+this.villages[i].address;
                            this.village.villageName = this.villages[i].name;
                            this.village.id = this.villages[i].id;
                            this.village.location = this.villages[i].location;
                            this.village.district = this.villages[i].district;
                            this.village.address = this.villages[i].address;
                        }
                    }
                    console.log(this.village)
                    this.$emit('getChildData' , this.village);
                    this.clearInfo();
                    $('.VillageModal').modal('hide');
                }

            },
            chooseItem(ev){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.villageId = $(ev.currentTarget).find('input').val();


                console.log(this.villageId);
//                console.log(this.villageId);
            },
            getCurrentCity(){
                this.$http.defaults.withCredentials = false;
                this.$http.defaults.headers = {};
//                this.index = Math.floor(Math.random()*this.keyArr.length);
//                let cityAddr = '//restapi.amap.com/v3/ip?key='+this.keyArr[this.index]+'&ip=';
                this.$http.get(cityAddr+this.ip)
                    .then(
                        (res) => {
                            if (res.data.city == '南京市' || res.data.city == '苏州市'){
                                this.chooseCity = res.data.city
                            } else {
                                this.chooseCity = '南京市'
                            }
                        }
                    );
                this.$http.defaults.withCredentials = true;
            },


            // 新增
            addNew(){
                $('.VillageModal').modal('hide');
                $('#addAddress').modal('show');
            },
            cancelAdd(){
                this.village_address = '';
                this.searchInfo = '';
                this.location = '';
                $('#addAddress').modal('hide');
                $('.VillageModal').modal('show');
            },
            saveAdd(){
                this.$emit('getChildData',{
                    villageName : this.searchInfo,
                    address : this.village_address,
                    location :this.location
                });
                $('#addAddress').modal('hide');
            },


            selectLocation(){
                $('#location').modal('show');
                this.initMap();
            },
            enterSearch(){
                this.initMap();
            },
            initMap(){
                let _this =this;
                let map = new AMap.Map("mapContainer1", {
                    resizeEnable: true
                });
                //为地图注册click事件获取鼠标点击出的经纬度坐标
                let clickEventListener = map.on('click', function(e) {
                    document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
                    _this.coordinate = e.lnglat.getLng() + ',' + e.lnglat.getLat();
                });

                AMap.service(["AMap.PlaceSearch"], function() {
                    let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 5,
                        pageIndex: 1,
                        city: "", //城市
                        map: map//,
                        //panel: "panel"
                    });
                    //关键字查询
                    placeSearch.search(_this.keywords, function(status, result) {
                    });
                });
            },

            closeModal(){
                this.keywords = '';
                this.coordinate = '';
                $('#location').modal('hide');
            },
            confirmLocation(){
                this.location = this.coordinate;
                this.closeModal();
            },
        }
    }
</script>

<style scoped>
    .input-group{
        margin-bottom: 5px;
    }
    .title{
        color: white;
        padding: 12px 24px;
        background-color: #2A3542;
    }
    .title h3{
        margin: 0;
    }
    .title i{
        font-size: 16px;
        float: right;
    }
    .chooseBody{
        overflow-y: auto;
        padding: 12px 20px;
        height: 350px;
    }
    .table tbody tr{
        cursor: pointer;
    }
    .chooseBtn{
        text-align: right;
        padding: 12px 24px;
        background-color: #F5F5F5;
        border-top: 1px solid #ddd;
    }
    .text{
        width: 10%;
    }
    .noData{
        /*position: relative;*/
        display: inline-block;
        margin: 8px 0;
    }
    .noData .contact{
        color: black;
        position: absolute;
        top: 25px;
        left: 0;
        z-index: 10;
        background: white;
        padding: 3px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        line-height: 25px;
        width: 150%;
    }

    .contact:before {
        position: absolute;
        top: -7px;
        left: 9px;
        display: inline-block;
        border-right: 7px solid transparent;
        border-bottom: 7px solid rgba(0, 0, 0, 0.2);
        border-left: 7px solid transparent;
        /*border-bottom-color: rgba(0, 0, 0, 0.2);*/
        content: '';
    }

    .contact:after {
        position: absolute;
        top: -6px;
        left: 10px;
        display: inline-block;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
        border-left: 6px solid transparent;
        content: '';
    }
    #myModal1{
        z-index: 1200;
    }

    #myPageTop{
        margin-right: 5px;
    }

</style>