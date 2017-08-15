<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="rentSimpleConvenient" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">合同信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="table table-responsive">
                            <section class="panel infoContainer" v-for="item in contractList">
                                <h4>合同基本信息</h4>
                                <div class="infoList">
                                    <span>合同编号：</span>
                                    <span>{{item.contract_num}}</span>
                                </div>
                                <div class="infoList">
                                    <span>年限(月)：</span>
                                    <span v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        {{item.checkin_rent_id.months}} 月
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>合同起始日期：</span>
                                    <span>{{item.start_date}}</span>
                                </div>
                                <div class="infoList">
                                    <span>合同结束日期：</span>
                                    <span>{{item.end_date}}</span>
                                </div>
                                <div class="infoList">
                                    <span>付款类型：</span>
                                    <span  v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        押 {{item.checkin_rent_id.bet}}&nbsp;&nbsp;
                                        <span v-for="(pay,index) in item.checkin_rent_id.pay">
                                            第{{index+1}}年{{pay}}月付&nbsp;&nbsp;
                                        </span>
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>月单价：</span>
                                    <span  v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        <span v-for="(price,index) in item.checkin_rent_id.price">
                                            第{{index+1}}期{{price}}元&nbsp;&nbsp;
                                        </span>
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>已收 （定金）：</span>
                                    <span  v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        {{item.checkin_rent_id.received_amount}} 元
                                    </span>
                                </div>
                                <div class="infoList" v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                    <div v-for="pay in item.checkin_rent_id.payment">
                                        <span>付款方式 （{{dictionary.money_type[pay.payment_id]}}）：</span>
                                        <span>
                                            {{pay.money}} 元
                                        </span>
                                    </div>
                                </div>
                                <div class="infoList">
                                    <span>未收：</span>
                                    <span  v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        {{item.checkin_rent_id.remain_amount}} 元
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>租房状态：</span>
                                    <span  v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        {{dictionary.rent_type[item.checkin_rent_id.rent_type]}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>资料补齐日期：</span>
                                    <span>
                                        {{item.complete_date[0]}}&nbsp;&nbsp;
                                    </span>
                                    <span style="color: #e8403f">
                                        {{item.complete_date[2]}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>中介名：</span>
                                    <span>{{dictionary.person_medium[item.customer_id.person_medium]}}</span>
                                </div>
                                <div class="infoList">
                                    <span>中介费用：</span>
                                    <span  v-if="item.checkin_rent_id !==null && item.checkin_rent_id !==undefined">
                                        {{item.checkin_rent_id.cost_medi}}
                                    </span>
                                </div>
                                <h4>附件照片</h4>
                                <div class="infoList">
                                    <span>证件照片</span>
                                    <span>
                                        <img :src="img.small" @click="showLargeIdPic('id_pic',index)"
                                             v-for="(img,index) in item.customer_id.album.id_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>合同照片</span>
                                    <span>
                                        <img :src="img.small" @click="showLargePic('contract_pic',index)"
                                             v-for="(img,index) in item.album.contract_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>水费照片</span>
                                    <span >
                                        <img :src="img.small" @click="showLargePic('water_card_pic',index)"
                                             v-for="(img,index) in item.album.water_card_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>电费照片</span>
                                    <span>
                                        <img :src="img.small" @click="showLargePic('elec_card_pic',index)"
                                             v-for="(img,index) in item.album.elec_card_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>燃气费照片</span>
                                    <span>
                                        <img :src="img.small" @click="showLargePic('gas_card_pic',index)"
                                             v-for="(img,index) in item.album.gas_card_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>押金收条</span>
                                    <span >
                                        <img :src="img.small" @click="showLargePic('receipt_pic',index)"
                                             v-for="(img,index) in item.album.receipt_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>交接单照片</span>
                                    <span>
                                        <img :src="img.small" @click="showLargePic('handover_pic',index)"
                                             v-for="(img,index) in item.album.handover_pic">
                                    </span>
                                </div>
                                <h4>租客信息</h4>
                                <div class="infoList">
                                    <span>租客姓名：</span>
                                    <span>{{item.customer_id.name}}</span>
                                </div>
                                <div class="infoList">
                                    <span>尊称：</span>
                                    <span>{{dictionary.gender[item.customer_id.gender]}}</span>
                                </div>
                                <div class="infoList">
                                    <span>国籍：</span>
                                    <span>
                                        {{dictionary.nationality[item.customer_id.nationality]}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>手机号码：</span>
                                    <span>{{item.customer_id.mobile}}</span>
                                </div>
                                <div class="infoList">
                                    <span>身份证号：</span>
                                    <span>{{item.customer_id.id_num}}</span>
                                </div>
                                <h4>房屋信息</h4>
                                <div class="infoList">
                                    <span>房屋地址：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.detailed_address}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>房型：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <span v-if="item.villa_id.rooms !== null && undefined">
                                            {{item.villa_id.rooms.rooms}}室{{item.villa_id.rooms.hall}}厅{{item.villa_id.rooms.toilet}}卫
                                        </span>
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>面积：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.area}}㎡
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>房屋类型：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{dictionary.house_type[item.villa_id.house_type]}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>配套设施：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <span  v-for="list in item.villa_id.facility">
                                            {{dictionary.facility[list]}}&nbsp;&nbsp;
                                        </span>
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>楼层：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.floor}}/{{item.villa_id.total_floor}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>楼层建筑：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{dictionary.floor_type[item.villa_id.floor_type]}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>所属小区：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.detailed_address}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>房屋特色：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{dictionary.house_feature[item.villa_id.house_feature]}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>水费卡号：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.water_card_num}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>电费卡号：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.elec_card_num}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>燃气卡号：</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        {{item.villa_id.gas_card_num}}
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>房屋照片</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <img :src="img.small" @click="showLargeVillaPic('house_pic',index)"
                                             v-for="(img,index) in item.villa_id.album.house_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>水卡照片</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <img :src="img.small" @click="showLargeVillaPic('water_card_pic',index)"
                                             v-for="(img,index) in item.villa_id.album.water_card_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>电卡卡照片</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <img :src="img.small" @click="showLargeVillaPic('elec_card_pic',index)"
                                             v-for="(img,index) in item.villa_id.album.elec_card_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>燃气卡照片</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <img :src="img.small" @click="showLargeVillaPic('gas_card_pic',index)"
                                             v-for="(img,index) in item.villa_id.album.gas_card_pic">
                                    </span>
                                </div>
                                <div class="infoList">
                                    <span>产权证照片</span>
                                    <span v-if="item.villa_id !==null && item.villa_id !==undefined">
                                        <img :src="img.small" @click="showLargeVillaPic('property_pic',index)"
                                             v-for="(img,index) in item.villa_id.album.property_pic">
                                    </span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!--选择客户-->
        <PicModal :largePic="largePic"></PicModal>
    </div>
</template>
<script>
    import PicModal from  '../common/largePic.vue'
    export default{
        props:['convenientList','dictionary'],
        components:{
            PicModal
        },
        data(){
            return{
                contractList : [],
                myDictionary : [],
                largePic: [],   //合同放大
                srcs: {},
            }
        },
        watch : {
            convenientList(val){
                this.contractList = val;
                console.log(this.contractList);
            },
            dictionary(val){
                this.myDictionary = val;
            }
        },
        methods : {
            showLargePic(name, index){  //图片放大
                this.srcs = this.contractList[0].album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('.largePic:eq(1)').modal('show');
            },
            showLargeIdPic(name, index){
                this.srcs = this.contractList[0].customer_id.album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('.largePic:eq(1)').modal('show');
            },
            showLargeVillaPic(name, index){
                this.srcs = this.contractList[0].villa_id.album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('.largePic:eq(1)').modal('show');
            },
        }
    }
</script>
<style scoped>
    .infoContainer{
        margin: auto;
    }
    .infoContainer .infoList{
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }
    .infoContainer .infoList sup{
        color: red;
        font-size: 14px;
        font-weight: bold;
    }
    .infoContainer .infoList span{
        display: inline-block;
    }
    .infoContainer .infoList>span:first-child{
        min-width: 100px;
        text-align: right;
        color: #59ace2;;
    }
    .infoContainer img{
        width: 60px;
        margin-top: 5px;
    }
    .infoContainer img{
        margin-left: 5px;
    }
    #contract .infoContainer{
        margin: auto;
    }
    #house .infoContainer .infoList sup{
        color: #797979;
        font-size: 10px;
    }
</style>