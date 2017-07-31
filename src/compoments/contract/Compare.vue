<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li class="active">合同详情</li>
            <li class="active">合同对比</li>
        </ol>
        <div class="row">
            <div class="col-md-2 col-sm-1 col-xs-0"></div>
            <div class="col-md-4 col-sm-5 col-xs-6 content" v-if="noCollect">
                <h3>收房合同信息(暂无)</h3>
            </div>
            <div class="col-md-4 col-sm-5 col-xs-6" v-if="collectContractList !==[]">
                <div class="contract_detail"  v-for="item in collectContractList">
                    <h3>收房合同信息</h3>
                    <h4>基本信息</h4>
                    <div class="infoList">
                        <span>合同编号<sup>*</sup>：</span>
                        <span>{{item.contract_num}}</span>
                    </div>
                    <div class="infoList">
                        <span>空置期(天)<sup>*</sup>：</span>
                        <span v-if="item.checkin_collect_id !== null">
                                                {{item.checkin_collect_id.vacancy}} 天
                                            </span>
                    </div>
                    <div class="infoList">
                        <span>空置期起始日期：</span>
                        <span>{{item.vac_start_date}}</span>
                    </div>
                    <div class="infoList">
                        <span>空置期结束日期：</span>
                        <span>{{item.vac_end_date}}</span>
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
                        <span>年限<sup>*</sup>：</span>
                        <span v-if="item.checkin_collect_id !== null">{{item.checkin_collect_id.years}}年</span>
                    </div>
                    <div class="infoList">
                        <span>付款方式：</span>
                        <span v-if="item.checkin_collect_id !== null">
                            {{myDictionary.pay_type[item.checkin_collect_id.pay_type[0]]}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>月单价<sup>*</sup>：</span>
                        <span v-if="item.checkin_collect_id !== null">
                            <span v-for="(price,index) in item.checkin_collect_id.price">
                                第{{index+1}}年{{price}}元&nbsp;&nbsp;
                            </span>
                        </span>
                    </div>
                    <div class="infoList">
                        <span>开户行：</span>
                        <span v-if="item.checkin_collect_id !== null">{{item.checkin_collect_id.bank}}</span>
                    </div>
                    <div class="infoList">
                        <span>银行卡号：</span>
                        <span v-if="item.checkin_collect_id !== null">{{item.checkin_collect_id.account}}</span>
                    </div>
                    <div class="infoList">
                        <span>中介费用：</span>
                        <span v-if="item.checkin_collect_id !== null">{{item.checkin_collect_id.cost_medi}}</span>
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
                        <span>备注：</span>
                        <span>{{item.remarks}}</span>
                    </div>
                    <div class="infoList">
                        <span>开单人：</span>
                        <span>{{item.staff}}</span>
                    </div>
                    <div class="infoList">
                        <span>审核人：</span>
                        <span>{{item.checker}}</span>
                    </div>
                    <h4>业主信息</h4>
                    <div class="infoList">
                        <span>业主姓名<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{item.customer_id.name}}</span>
                    </div>
                    <div class="infoList">
                        <span>尊称<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{myDictionary.gender[item.customer_id.gender]}}</span>
                    </div>
                    <div class="infoList">
                        <span>国籍<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">
                            {{myDictionary.nationality[item.customer_id.nationality]}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>手机号码<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{item.customer_id.mobile}}</span>
                    </div>
                    <div class="infoList">
                        <span>证件类型<sup>*</sup>：</span>.
                        <span v-if="item.customer_id !== null">
                            {{myDictionary.credentials[item.customer_id.id_type]}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>身份证号<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{item.customer_id.id_num}}</span>
                    </div>
                    <h4>房屋信息</h4>
                    <div class="infoList ">
                        <span >房屋地址：</span>
                        <span>{{item.villa_id.address}}</span>
                    </div>
                    <div class="infoList ">
                        <span >房型：</span>
                        <span>
                            {{item.villa_id.rooms.rooms}}室{{item.villa_id.rooms.hall}}厅{{item.villa_id.rooms.toilet}}卫
                        </span>
                    </div>
                    <div class="infoList ">
                        <span >面积：</span>
                        <span>
                            {{item.villa_id.area}}㎡
                        </span>
                    </div>
                    <div class="infoList ">
                        <span >房屋类型：</span>
                        <span>
                            {{myDictionary.house_type[item.villa_id.house_type]}}
                        </span>
                    </div>
                    <div class="infoList ">
                        <span >楼层：</span>
                        <span>
                            {{item.villa_id.floor}}/{{item.villa_id.total_floor}}
                        </span>
                    </div>
                    <div class="infoList ">
                        <span >楼层建筑：</span>
                        <span>
                            {{myDictionary.floor_type[item.villa_id.floor_type]}}
                        </span>
                    </div>
                    <div class="infoList ">
                        <span >所属小区：</span>
                        <span>{{item.villa_id.village_name}}</span>
                    </div>
                    <div class="infoList ">
                        <span >房屋特色：</span>
                        <span>
                            {{myDictionary.house_feature[item.villa_id.house_feature]}}
                        </span>
                    </div>
                    <div class="infoList ">
                        <span >水费卡号：</span>
                        <span>
                            {{item.villa_id.water_card_num}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span >电费卡号：</span>
                        <span>{{item.villa_id.elec_card_num}}</span>
                    </div>
                    <div class="infoList">
                        <span >燃气卡号：</span>
                        <span>{{item.villa_id.gas_card_num}}</span>
                    </div>
                    <div>

                    </div>
                    <h4>房屋照片</h4>
                    <div class="infoList">
                        <span>房屋照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPicCollect('house_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.house_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>水卡照片</span>
                        <span >
                            <img :src="img.small" @click="showLargeVillaPicCollect('water_card_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.water_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>电卡卡照片</span>
                        <span >
                            <img :src="img.small" @click="showLargeVillaPicCollect('elec_card_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.elec_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>燃气卡照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPicCollect('gas_card_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.gas_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>产权证照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPicCollect('property_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.property_pic">
                        </span>
                    </div>
                    <h4>合同附件</h4>
                    <div class="infoList">
                        <span>证件照片<sup>*</sup></span>
                        <span>
                            <img :src="img.small" @click="showLargeIdPicCollect('id_pic',index)"
                                 v-for="(img,index) in item.customer_id.album.id_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>银行卡<sup>*</sup></span>
                        <span>
                            <img :src="img.small" @click="showLargePicCollect('bank_pic',index)"
                                 v-for="(img,index) in item.album.bank_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>合同照片<sup>*</sup></span>
                        <span>
                            <img :src="img.small" @click="showLargePicCollect('contract_pic',index)"
                                 v-for="(img,index) in item.album.contract_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>水费照片</span>
                        <span >
                            <img :src="img.small" @click="showLargePicCollect('water_card_pic',index)"
                                 v-for="(img,index) in item.album.water_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>电费照片</span>
                        <span>
                            <img :src="img.small" @click="showLargePicCollect('elec_card_pic',index)"
                                 v-for="(img,index) in item.album.elec_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>燃气费照片</span>
                        <span>
                            <img :src="img.small" @click="showLargePicCollect('gas_card_pic',index)"
                                 v-for="(img,index) in item.album.gas_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>交接单照片</span>
                        <span>
                            <img :src="img.small" @click="showLargePicCollect('handover_pic',index)"
                                 v-for="(img,index) in item.album.handover_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>委托书</span>
                        <span>
                            <img :src="img.small" @click="showLargePicCollect('proxy_pic',index)"
                                 v-for="(img,index) in item.album.proxy_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>押金收条</span>
                        <span >
                            <img :src="img.small" @click="showLargePicCollect('receipt_pic',index)"
                                 v-for="(img,index) in item.album.receipt_pic">
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-5 col-xs-6" v-if="rentContractList !== []">
                <div class="contract_detail"  v-for="item in rentContractList">
                    <h3>租房合同信息</h3>
                    <h4>基本信息</h4>
                    <div class="infoList">
                        <span>合同编号<sup>*</sup>：</span>
                        <span>{{item.contract_num}}</span>
                    </div>
                    <div class="infoList">
                        <span>年限(月)<sup>*</sup>：</span>
                        <span v-if="item.checkin_rent_id !==null">{{item.checkin_rent_id.months}} 月</span>
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
                        <span  v-if="item.checkin_rent_id !==null">
                            押 {{item.checkin_rent_id.bet}} 付 {{item.checkin_rent_id.pay}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>月单价：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{item.checkin_rent_id.price}} 元
                        </span>
                    </div>
                    <div class="infoList">
                        <span>应收：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{item.checkin_rent_id.price*(item.checkin_rent_id.bet+item.checkin_rent_id.pay)}} 元
                        </span>
                    </div>
                    <div class="infoList">
                        <span>已收 （定金）<sup>*</sup>：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{item.checkin_rent_id.received_amount}} 元
                        </span>
                    </div>
                    <div class="infoList">
                        <span>付款方式 （银行卡）：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{item.checkin_rent_id.payment[1].money}} 元
                        </span>
                    </div>
                    <div class="infoList">
                        <span>付款方式 （现金）：</span>
                    </div>
                    <div class="infoList">
                        <span>付款方式 （支付宝）<sup>*</sup>：</span>
                        <span></span>
                    </div>
                    <div class="infoList">
                        <span>未收：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{item.checkin_rent_id.amount_remaining}} 元
                        </span>
                    </div>
                    <div class="infoList">
                        <span>租房状态：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{myDictionary.rent_type[item.checkin_rent_id.rent_type]}}
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
                        <span>中介名<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{myDictionary.person_medium[item.customer_id.person_medium]}}</span>
                    </div>
                    <div class="infoList">
                        <span>中介费用：</span>
                        <span  v-if="item.checkin_rent_id !==null">
                            {{item.checkin_rent_id.cost_medi}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>备注：</span>
                        <span>{{item.remarks}}</span>
                    </div>
                    <div class="infoList">
                        <span>开单人：</span>
                        <span>{{item.staff}}</span>
                    </div>
                    <div class="infoList">
                        <span>审核人：</span>
                        <span>{{item.checker}}</span>
                    </div>
                    <h4>业主信息</h4>
                    <div class="infoList">
                        <span>业主姓名<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{item.customer_id.name}}</span>
                    </div>
                    <div class="infoList">
                        <span>尊称<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{myDictionary.gender[item.customer_id.gender]}}</span>
                    </div>
                    <div class="infoList">
                        <span>国籍<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{myDictionary.nationality[item.customer_id.nationality]}}</span>
                    </div>
                    <div class="infoList">
                        <span>手机号码<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{item.customer_id.mobile}}</span>
                    </div>
                    <div class="infoList">
                        <span>证件类型<sup>*</sup>：</span>.
                        <span v-if="item.customer_id !== null">{{myDictionary.credentials[item.customer_id.id_type]}}</span>
                    </div>
                    <div class="infoList">
                        <span>身份证号<sup>*</sup>：</span>
                        <span v-if="item.customer_id !== null">{{item.customer_id.id_num}}</span>
                    </div>
                    <h4>房屋信息</h4>
                    <div class="infoList">
                        <span>房屋地址：</span>
                        <span>{{item.villa_id.address}}</span>
                    </div>
                    <div class="infoList">
                        <span>房型：</span>
                        <span>
                            {{item.villa_id.rooms.rooms}}室{{item.villa_id.rooms.hall}}厅{{item.villa_id.rooms.toilet}}卫
                        </span>
                    </div>
                    <div class="infoList">
                        <span>面积：</span>
                        <span>{{item.villa_id.area}}㎡</span>
                    </div>
                    <div class="infoList">
                        <span>房屋类型：</span>
                        <span>{{myDictionary.house_type[item.villa_id.house_type]}}</span>
                    </div>
                    <div class="infoList">
                        <span>配套设施：</span>
                        <span>
                            <span  v-for="list in item.villa_id.facility">
                                {{myDictionary.facility[list]}}&nbsp;&nbsp;
                            </span>
                        </span>
                    </div>
                    <div class="infoList">
                        <span>楼层：</span>
                        <span>
                            {{item.villa_id.floor}}/{{item.villa_id.total_floor}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>楼层建筑：</span>
                        <span>
                            {{myDictionary.floor_type[item.villa_id.floor_type]}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>所属小区：</span>
                        <span>{{item.villa_id.village_name}}</span>
                    </div>
                    <div class="infoList">
                        <span>房屋特色：</span>
                        <span>
                            {{myDictionary.house_feature[item.villa_id.house_feature]}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>水费卡号：</span>
                        <span>
                            {{item.villa_id.water_card_num}}
                        </span>
                    </div>
                    <div class="infoList">
                        <span>电费卡号：</span>
                        <span>{{item.villa_id.elec_card_num}}</span>
                    </div>
                    <div class="infoList">
                        <span>燃气卡号：</span>
                        <span>{{item.villa_id.gas_card_num}}</span>
                    </div>
                    <h4>房屋照片</h4>
                    <div class="infoList">
                        <span>房屋照片</span>
                        <span class="col-lg-9">
                            <img :src="img.small" @click="showLargeVillaPic('house_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.house_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>水卡照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPic('water_card_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.water_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>电卡卡照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPic('elec_card_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.elec_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>燃气卡照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPic('gas_card_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.gas_card_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>产权证照片</span>
                        <span>
                            <img :src="img.small" @click="showLargeVillaPic('property_pic',index)"
                                 v-for="(img,index) in item.villa_id.album.property_pic">
                        </span>
                    </div>
                    <h4>合同附件</h4>
                    <div class="infoList">
                        <span>合同照片<sup>*</sup></span>
                        <span class="col-lg-10">
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
                        <span>转账凭证</span>
                        <span >
                            <img :src="img.small" @click="showLargePic('payment_pic',index)"
                                 v-for="(img,index) in item.album.payment_pic">
                        </span>
                    </div>
                    <div class="infoList">
                        <span>交接单照片</span>
                        <span>
                            <img :src="img.small" @click="showLargePic('handover_pic',index)"
                                 v-for="(img,index) in item.album.handover_pic">
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-5 col-xs-6" v-if="noRent">
                <h3>租房合同信息(暂无)</h3>
            </div>
            <div class="col-md-2 col-sm-1 col-xs-0"></div>
        </div>
        <Status :state='info'></Status>
        <PicModal :largePic="largePic"></PicModal>
    </div>
</template>
<script>
    import Status from '../common/status.vue'
    import PicModal from  '../common/largePic.vue'
    export default{
        components:{Status,PicModal},
        data(){
            return{
                myVillaId:'',
                myDictionary:[],
                rentContractList:[],
                collectContractList:[],
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                largePic: [],   //查看大图
                srcs: {},
                noCollect:false,
                noRent:false,
            }
        },
        mounted(){
            console.log( this.$route.query.houseId)
            this.myVillaId = this.$route.query.houseId;  //路由接受house_id
            this.getDictionary();
        },
        watch:{

        },
        methods:{
            getDictionary(){    //请求字典 以及 合同详情信息
                this.$http.get('core/customer/dict').then((res) => {
                    this.myDictionary=res.data;
                    this.compare();
                });
            },
            compare(){
                this.$http.get('core/collect/compare/villa_id/' + this.myVillaId).then((res) => {
                    if(res.data.code === '70020'){
                        this.rentContractList = [];
                        this.rentContractList.push(res.data.data);
                        this.noRent = false;
                    }else {
                        this.rentContractList = [];
                        this.noRent = true
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
                this.$http.get('core/rent/compare/villa_id/' + this.myVillaId).then((res) => {
                    if(res.data.code === '80020'){
                        this.collectContractList = [];
                        this.collectContractList.push(res.data.data);
                        this.noCollect =false;
                    }else {
                        this.collectContractList = [];
                        this.noCollect =true;
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            showLargePicCollect(name, index){  //图片放大
                this.srcs = this.collectContractList[0].album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            showLargeIdPicCollect(name, index){
                this.srcs = this.collectContractList[0].customer_id.album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            showLargeVillaPicCollect(name, index){
                this.srcs = this.collectContractList[0].villa_id.album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            showLargePic(name, index){
                this.srcs = this.contractList[0].album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            showLargeIdPic(name, index){
                this.srcs = this.contractList[0].customer_id.album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            showLargeVillaPic(name, index){
                this.srcs = this.contractList[0].villa_id.album[name];
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('#largePic').modal('show');
            },
            close(){
//                this.$emit('Compared','yes')
            },

        }
    }
</script>
<style scoped>

    /*@media (min-width: 768px) {*/
        /*.contract_detail{*/
            /*border: 1px solid #CCCCCC;*/
            /*border-radius: 5px;*/
            /*padding: 0 10px;*/
        /*}*/
    /*}*/
    .row{
        background: #ffffff;
    }
    .infoList{
        margin: 15px;
        border-bottom: 1px solid #fff;
    }
    .infoList>span:first-child{
        color: #59ace2;
    }
    h4{
        margin-left: 10px;
        font-weight: 300;
    }
    .infoList img{
        width: 60px;
        margin: 5px;
    }
    sup{
        color: #e4493f;
    }
</style>

