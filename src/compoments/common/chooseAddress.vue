<template>
    <div>
        <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
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
                                            </select>
                                        </div>
                                        <div class="input-group">
                                            <label class="sr-only">搜索</label>
                                            <input type="text" class="form-control" placeholder="" @keyup="searchVillage" @keydown.enter.prevent="" v-model="searchInfo">
                                            <span class="input-group-btn">
                                                <button class="btn btn-success" type="button" @click="search">立即搜索</button>
                                            </span>
                                        </div>
                                        <div class="input-group" v-show="isShow">
                                            <a class="noData" @mouseenter="showContact = true" @mouseleave="showContact = false">
                                                没有找到相应小区?
                                                <div class="contact" v-show="showContact">
                                                    请联系: <br>
                                                    陆宣羽：15851899908 <br>
                                                    <a href="tel:15851899908">电话</a>
                                                    <a href="sms:15851899908">发短信</a>
                                                    <br>
                                                    蔡云杰:13327823182 <br>
                                                    <a href="tel:15851899908">电话</a>
                                                    <a href="sms:15851899908">发短信</a>
                                                </div>
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

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>

</template>
<style scoped>
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
        position: relative;
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

</style>
<script>
    import Status from './status.vue';

    let addr="//restapi.amap.com/v3/assistant/inputtips?key=181a17662347392d30ce7962d0deb60a&datatype=poi&types=120300";
    let cityAddr = '//restapi.amap.com/v3/ip?key=181a17662347392d30ce7962d0deb60a&ip=';
    export default{

        data(){
            return {
                isShow : false,
                showContact : false,

                searchInfo : '',
                chooseCity : '',
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
                },
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
                this.$http.defaults.withCredentials = false;
                this.$http.defaults.headers = {};
                this.$http.get(addr+'&keywords='+this.searchInfo+'&city='+this.chooseCity)
                    .then(
                        (res) => {
                            if (res.data.tips.length!=0){
                                this.villages = res.data.tips;
                                this.isShow = false;
                            } else {
                                this.villages = [];
                                this.isShow = true;
                            }

                        }
                    );
                this.$http.defaults.withCredentials = true;
//                this.$http.defaults.headers.common['Env'] = globalConfig.env;
            },
            searchVillage(){// 搜索小区
                if (this.searchInfo.length >= 2){
                    this.search();
                }
            },
            clearInfo(){
                this.searchInfo = '';
                this.villages = []
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
                    this.$emit('getChildData' , this.village);
                    this.clearInfo();
                    $('#myModal1').modal('hide');
                }

            },
            chooseItem(ev){// 点击行选中
//                if ($(ev.currentTarget).find('input').val()!=''){
                    $(ev.currentTarget).find('input').prop('checked' , 'true');
                    this.villageId = $(ev.currentTarget).find('input').val();
//                }

                console.log(this.villageId);
//                console.log(this.villageId);
            },
            getCurrentCity(){
                this.$http.defaults.withCredentials = false;
                this.$http.defaults.headers = {};
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
            }
        }
    }
</script>