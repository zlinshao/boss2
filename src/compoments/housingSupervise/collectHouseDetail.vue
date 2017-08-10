<template>
    <div>
        <ol class="breadcrumb">
            <li>房源管理</li>
            <router-link to="/okCollect" tag="li" style="cursor: pointer" class="bread">公司房源</router-link>
            <li>公司房源详情</li>
        </ol>
        <!--头部-->
        <section class="panel">7
            <div class="panel-body"  v-for="item in houseDetail">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;{{item.address}}
                        <a data-toggle="modal" class="pull-right fa fa-pencil-square-o" @click="editcollect" ></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <div><span class="text-primary">详细地址：</span><span>{{item.detailed_address}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">房型：</span>
                                    <span> {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫</span>
                                </div>
                                <div><span class="text-primary">面积：</span><span>{{item.area}}㎡</span></div>
                                <div><span class="text-primary">装修：</span><span>{{dictionary.decoration[item.decoration]}}</span>
                                </div>
                                <div><span class="text-primary">负责人：</span><span>{{item.staff_id}}</span></div>
                            </div>
                            <div class="col-md-8">
                                <!--<div><span class="text-primary">业主姓名：</span><span>乐伽</span></div>-->
                                <div><span class="text-primary">联系电话：</span><span>400-123-123</span></div>
                                <div><span class="text-primary">参考租金：</span><span>{{item.reference}} 元</span></div>
                                <div><span class="text-primary">房屋状态：</span><span>{{item.status_villa}}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="open_on" class="col-md-12">
                            <div class="col-md-4">
                                <div>
                                    <span class="text-primary">配套设备：</span>
                                    <span v-for="list in item.facility">{{dictionary.facility[list]}}&nbsp; &nbsp;</span>
                                </div>
                                <div><span
                                        class="text-primary">楼层：</span><span>{{item.floor}}/{{item.total_floor}}</span>
                                </div>
                                <div><span
                                        class="text-primary">建筑楼层：</span><span>{{dictionary.floor_type[item.floor_type]}}</span>
                                </div>
                                <div><span
                                        class="text-primary">房屋特色：</span><span>{{dictionary.house_feature[item.house_feature]}}</span>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div><span
                                        class="text-primary">房屋类型：</span><span>{{dictionary.house_type[item.house_type]}}</span>
                                </div>
                                <div><span class="text-primary">水费卡号：</span><span>{{item.water_card_num}}</span></div>
                                <div><span class="text-primary">电费卡号：</span><span>{{item.elec_card_num}}</span></div>
                                <div><span class="text-primary">燃气卡号：</span><span>{{item.gas_card_num}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <a class="text-primary" v-if="!open_on" @click="open_close">展示&nbsp;&nbsp;<i
                                class="fa fa-sort-amount-asc"></i></a>
                        <a class="text-primary" v-if="open_on" @click="open_close">收起&nbsp;&nbsp;<i
                                class="fa fa-sort-amount-desc"></i></a></div>
                </div>

            </div>
        </section>

        <!--内容区-->
        <div class="row">
            <div>
            <!--合同信息-->
            <!--<div class="col-md-3">-->
                <!--<section class="panel roll box">-->
                    <!--<header class="panel-heading tab-bg-dark-navy-blue ">-->
                        <!--<ul class="nav nav-tabs">-->
                            <!--<li class="active">-->
                                <!--<a data-toggle="tab" href="#home" aria-expanded="true"><i class="fa fa-file-text"></i>&nbsp;收房合同</a>-->
                            <!--</li>-->
                            <!--<li class="">-->
                                <!--<a data-toggle="tab" href="#about" aria-expanded="false"><i class="fa fa-file-text"></i>&nbsp;租房合同</a>-->
                            <!--</li>-->

                        <!--</ul>-->
                    <!--</header>-->
                    <!--<div class="panel-body">-->
                        <!--<div class="tab-content">-->

                            <!--&lt;!&ndash;收房合同&ndash;&gt;-->
                            <!--<div id="home" class="tab-pane active">-->
                                <!--<div class="panel-body table-responsive">-->
                                    <!--<table class="table contract_info">-->
                                        <!--<tbody>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark"></i></a></td>-->
                                            <!--<td>2017-07-20</td>-->
                                            <!--<td>14:00</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark-o"></i></a></td>-->
                                            <!--<td>合同编号</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>房屋地址</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>负责人</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>合同时间</td>-->
                                            <!--<td class="paddingTop">-->
                                                <!--<a data-v-2f43a2b3="" href="#">-->
                                                    <!--<div data-v-2f43a2b3="" class="progress progress-striped active">-->
                                                        <!--<div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"-->
                                                             <!--aria-valuenow="45" role="progressbar" class="progress-bar"-->
                                                             <!--:style="{ width: progress + '%'}">-->
                                                            <!--<span data-v-2f43a2b3="" class="sr-only">45% Complete</span>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</a>-->
                                            <!--</td>-->
                                        <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                <!--</div>-->
                                <!--<div class="panel-body table-responsive">-->
                                    <!--<table class="table contract_info">-->
                                        <!--<tbody>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark"></i></a></td>-->
                                            <!--<td>2017-07-20</td>-->
                                            <!--<td>14:00</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark-o"></i></a></td>-->
                                            <!--<td>合同编号</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>房屋地址</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>负责人</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>合同时间</td>-->
                                            <!--<td class="paddingTop">-->
                                                <!--<a data-v-2f43a2b3="" href="#">-->
                                                    <!--<div data-v-2f43a2b3="" class="progress progress-striped active">-->
                                                        <!--<div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"-->
                                                             <!--aria-valuenow="45" role="progressbar" class="progress-bar"-->
                                                             <!--:style="{ width: progress + '%'}">-->
                                                            <!--<span data-v-2f43a2b3="" class="sr-only">45% Complete</span>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</a>-->
                                            <!--</td>-->
                                        <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                <!--</div>-->
                            <!--</div>-->

                            <!--&lt;!&ndash;租房信息&ndash;&gt;-->
                            <!--<div id="about" class="tab-pane">-->
                                <!--<div class="panel-body table-responsive">-->
                                    <!--<table class="table contract_info">-->
                                        <!--<tbody>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark"></i></a></td>-->
                                            <!--<td>2016-06-20</td>-->
                                            <!--<td>14:00</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark-o"></i></a></td>-->
                                            <!--<td>合同编号</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>房屋地址</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>负责人</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>合同时间</td>-->
                                            <!--<td class="paddingTop">-->
                                                <!--<a data-v-2f43a2b3="" href="#">-->
                                                    <!--<div data-v-2f43a2b3="" class="progress progress-striped active">-->
                                                        <!--<div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"-->
                                                             <!--aria-valuenow="45" role="progressbar" class="progress-bar"-->
                                                             <!--:style="{ width: progress + '%'}">-->
                                                            <!--<span data-v-2f43a2b3="" class="sr-only">45% Complete</span>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</a>-->
                                            <!--</td>-->
                                        <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                <!--</div>-->
                                <!--<div class="panel-body table-responsive roll">-->
                                    <!--<table class="table contract_info">-->
                                        <!--<tbody>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark"></i></a></td>-->
                                            <!--<td>2017-07-20</td>-->
                                            <!--<td>14:00</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td><a><i class="fa fa-bookmark-o"></i></a></td>-->
                                            <!--<td>合同编号</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>房屋地址</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>负责人</td>-->
                                            <!--<td>合同编号</td>-->
                                        <!--</tr>-->
                                        <!--<tr>-->
                                            <!--<td></td>-->
                                            <!--<td>合同时间</td>-->
                                            <!--<td class="paddingTop">-->
                                                <!--<a data-v-2f43a2b3="" href="#">-->
                                                    <!--<div data-v-2f43a2b3="" class="progress progress-striped active">-->
                                                        <!--<div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"-->
                                                             <!--aria-valuenow="45" role="progressbar" class="progress-bar"-->
                                                             <!--:style="{ width: progress + '%'}">-->
                                                            <!--<span data-v-2f43a2b3="" class="sr-only">45% Complete</span>-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                <!--</a>-->
                                            <!--</td>-->
                                        <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->


                <!--</section>-->
            <!--</div>-->
            </div>

            <!--沟通日志/房屋信息-->
            <div class="col-md-12 box">
                <section class="panel roll box">
                    <div class="panel-body client_info">
                        <header>
                            <h4><i class="fa fa-home"></i>&nbsp;房屋信息</h4>
                        </header>
                        <div class="row" v-for="item in houseDetail">
                            <div class="col-md-12">
                                <div id="pirture">
                                    <div>
                                        <span class="text-primary">房屋照片：</span>
                                        <a v-for="(img,index) in item.album.house_pic"
                                           style="margin: 10px 10px 0 0;display: inline-block;">
                                            <img :src="img.small" @click="showLargePic('house_pic',index)">
                                        </a>
                                    </div>
                                    <div>
                                        <span class="text-primary">产权证照片：</span>
                                        <a v-for="(img,index) in item.album.property_pic"
                                           style="margin: 10px 10px 0 0;display: inline-block;">
                                            <img :src="img.small" @click="showLargePic('property_pic',index)">
                                        </a>
                                    </div>
                                    <div>
                                        <span class="text-primary">水卡照片：</span>
                                        <a v-for="(img,index) in item.album.water_card_pic"
                                           style="margin: 10px 10px 0 0;display: inline-block;">
                                            <img :src="img.small" @click="showLargePic('water_card_pic',index)">
                                        </a>
                                    </div>
                                    <div>
                                        <span class="text-primary">电卡照片：</span>
                                        <a v-for="(img,index) in item.album.elec_card_pic"
                                           style="margin: 10px 10px 0 0;display: inline-block;">
                                            <img :src="img.small" @click="showLargePic('elec_card_pic',index)">
                                        </a>
                                    </div>
                                    <div>
                                        <span class="text-primary">燃气卡照片：</span>
                                        <a v-for="(img,index) in item.album.gas_card_pic"
                                           style="margin: 10px 10px 0 0;display: inline-block;">
                                            <img :src="img.small" @click="showLargePic('gas_card_pic',index)">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <PicModal :largePic="largePic"></PicModal>
        <!--分配-->
        <Distribution></Distribution>

        <!--房屋 新增/编辑-->
        <HouseEdit :dictionary="dictionary" :HouseRevise="houseRevise" @reviseHouse="alreadyRevise"></HouseEdit>
    </div>
</template>

<script>
    import Distribution from '../common/distribution.vue'          //分配
    import HouseEdit from './houseEdit.vue'
    import PicModal from '../common/largePic.vue'
    export default {
        components: {
            Distribution,
            HouseEdit,
            PicModal
        },
        data (){
            return {
                progress: 30,                       //进度
                open_on: false,                     //展示/收起
                noColl: {
                    newState: false,                //新增房屋
                    sss: false
                },
                houseId: '',
                houseDetail: [],
                houseRevise: [],
                dictionary: [],
                largePic: [],
                srcs: {}
            }
        },
        mounted (){
            this.houseId = this.$route.query.CollectId;
            this.getDictionary();
        },
        methods: {
            //字典列表
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary = res.data;
                    this.$http.get('core/villa/readvilla/id/' + this.houseId).then((res) => {
                        this.houseDetail.push(res.data.data);
                        console.log(this.houseDetail)
                        this.houseRevise = res.data.data;
                    });

                });
            },
//            展示/收起
            open_close (){
                this.open_on = !this.open_on
            },
            alreadyRevise(val){
                this.houseDetail = [];
                this.houseRevise = [];
                this.$http.get('core/villa/readvilla/id/' + val).then((res) => {
                    this.houseDetail.push(res.data.data);
                    this.houseRevise = res.data.data;
                });
            },
            showLargePic(name, index){
                this.srcs = this.houseDetail[0].album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            editcollect(){
                $('.rem_div').remove();
                $('#houseEdit').modal({backdrop: 'static',});
                $('#houseEdit').modal('show');
            }
        },

    }
</script>


<style scoped>

    .width100 {
        width: 100px;
        text-align: right;
    }

    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    h4 > a {
        margin-left: 10px;
    }

    .contract_info td {
        border-top: 0;
    }

    .panel-body:not(:last-child) {
        border-bottom: 1px solid #aaaaaa;
    }

    .contract_info {
        text-align: center;
    }

    label {
        margin-top: 8px;
    }

    .cheek > div {
        margin-bottom: 10px;
    }

    .client_info > div > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    #pirture > div {
        padding: 10px;
    }

    .roll {
        height: 500px;
        overflow: auto;
    }

    .progress.progress-striped.active {
        margin-bottom: 0;
        height: 10px;
    }

    .box::-webkit-scrollbar {
        width: 8px;
        height: 300px;
    }

    .box::-webkit-scrollbar-button {
        background-color: #f0f0f8;
    }

    .box::-webkit-scrollbar-track {
        background: #f0f0f8;
    }

    .box::-webkit-scrollbar-thumb {
        background: rgba(121, 121, 121, .2);
        border-radius: 4px;
    }

    .paddingTop {
        padding-top: 15px;
    }

    @media (max-width: 768px) {
        .roll {
            overflow: visible;
            height: 100%;
        }
    }
    .bread:hover{
        color: #59ace2;
    }
</style>
