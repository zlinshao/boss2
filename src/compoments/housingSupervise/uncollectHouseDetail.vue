<template>
    <div>
        <ol class="breadcrumb">
            <li>房源管理</li>
            <router-link to="/noCollect" tag="li" style="cursor: pointer" class="bread">待收房源</router-link>
            <li>待收房源详情</li>

            <li class="pull-right" v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/noCollect',query: { params:params}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步</router-link>
            </li>
        </ol>
        <section class="panel">
            <div class="panel-body" v-for="item in houseDetail">
                <header>
                    <h4>
                        <i class="fa fa-home"></i>&nbsp;{{item.address}}
                        <a data-toggle="modal" class="pull-right fa fa-pencil-square-o" @click="editUncollect" v-show="simulate.indexOf('Villa/updateVilla')>-1||isSuper"></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info"  >
                    <div>
                        <div class="col-md-4">
                            <div><span class="text-primary">房屋地址：</span><span>{{item.detailed_address}}</span></div>
                            <div>
                                <span class="text-primary">房型：</span>
                                <span v-if="item.rooms!==null && item.rooms!==undefined">
                                    {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫
                                </span>
                            </div>
                            <div><span class="text-primary">面积：</span><span>{{item.area}}㎡</span></div>
                            <div><span class="text-primary">参考价格：</span><span>{{item.reference}} 元</span></div>
                            <div><span class="text-primary">装修：</span><span>{{dictionary.decoration[item.decoration]}}</span></div>
                            <div>
                                <span class="text-primary">个人/中介：</span>
                                <span>{{dictionary.person_medium[item.person_medium]}}</span>
                            </div>
                            <div><span class="text-primary">房屋类型：</span><span>{{dictionary.house_type[item.house_type]}}</span></div>

                        </div>
                        <div class="col-md-8">
                            <div><span class="text-primary">房屋来源：</span><span>{{dictionary.source[item.source]}}</span></div>
                            <div><span class="text-primary">楼层：</span><span>{{item.floor}}/{{item.total_floor}}</span></div>
                            <div><span class="text-primary">建筑楼层：</span><span>{{dictionary.floor_type[item.floor_type]}}</span></div>
                            <div><span class="text-primary">房屋特色：</span><span>{{dictionary.house_feature[item.house_feature]}}</span></div>
                            <div>
                                <span class="text-primary">配套设施：</span>
                                <span v-for="list in item.facility">{{dictionary.facility[list]}}&nbsp; &nbsp;</span>
                            </div>
                            <!--<div><span class="text-primary">来源：</span><span>{{dictionary.source[item.source]}}</span></div>-->
                            <div><span class="text-primary">负责人：</span><span>{{item.staff_id}}</span></div>
                        </div>
                    </div>
                    <div class="client_ col-xs-12">
                        <div>
                            <span class="text-primary">房屋照片：</span>
                            <a v-for="(img,index) in item.album.house_pic"
                               style="margin: 10px 10px 0 0;display: inline-block;">
                                <img :src="img.small" @click="showLargePic('house_pic',index)">
                            </a>
                        </div>
                        <div>
                            <span class="text-primary">产权证：</span>
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
        </section>

        <!--房屋 编辑-->
        <HouseEdit :dictionary="dictionary" :HouseRevise="houseRevise" :simulate="simulate" @reviseHouse="alreadyRevise"></HouseEdit>
        <PicModal :largePic="largePic"></PicModal>
    </div>
</template>

<script>
    import HouseEdit from './houseEdit.vue'
    import PicModal from '../common/largePic.vue'
    export default {
        props:['simulate','isSuper'],
        components: {HouseEdit,PicModal},
        data (){
            return {
                dictionary:[],
                houseId:'',
                houseDetail:[],
                houseRevise:[],
                largePic : [],
                srcs : {},
                params : [],
            }
        },
        mounted (){
            this.houseId = this.$route.query.unCollectId;
            this.params = this.$route.query.params;
            this.getDictionary();
        },
        methods: {
            //字典列表
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;
                    this.$http.get('core/villa/readvilla/id/'+this.houseId).then((res) => {
                        this.houseRevise=res.data.data;
                        this.houseDetail.push(res.data.data);
                    });

                });
            },
            alreadyRevise(val){
                this.houseDetail=[];
                this.houseRevise=[];
                this.$http.get('core/villa/readvilla/id/'+val).then((res) => {
                    this.houseDetail.push(res.data.data);
                    this.houseRevise=res.data.data;
                });
            },
            showLargePic(name,index){
                this.srcs = this.houseDetail[0].album[name];
                this.largePic = [{
                    src : this.srcs,
                    i : index
                }];
                $('#largePic').modal('show');
            },
            editUncollect(){
                $('.rem_div').remove();
                $('#houseEdit').modal({backdrop: 'static',});
                $('#houseEdit').modal('show');
            }
        },

    }
</script>


<style scoped>

    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    .panel-body:not(:last-child) {
        border-bottom: 1px solid #aaaaaa;
    }

    .client_info > div > div > div,.client_ > div  {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary,.client_ > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
    .bread:hover{
        color: #59ace2;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>
