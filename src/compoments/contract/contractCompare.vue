<template>
    <div>
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
        id="collectVsRenting"  data-backdrop="static">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">合同对比</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-6"v-if="collectContractList !==[]">
                                    <div class="contract_detail"  v-for="item in collectContractList">
                                        <h3>收房合同信息</h3>
                                        <h4>基本信息</h4>
                                        <div class="infoList">
                                            <span>合同编号：<sup>*</sup></span>
                                            <span>{{item.contract_num}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>空置期(天)：<sup>*</sup></span>
                                            <span>{{item.checkin_collect_id.vacancy}} 天</span>
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
                                            <span>年限：<sup>*</sup></span>
                                            <span>{{item.checkin_collect_id.years}}年</span>
                                        </div>
                                        <div class="infoList">
                                            <span>付款方式：</span>
                                            <span>{{dictionary.pay_type[item.checkin_collect_id.pay_type[0]]}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>月单价：<sup>*</sup></span>
                                            <span>{{item.checkin_collect_id.price}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>开户行：</span>
                                            <span>{{item.checkin_collect_id.bank}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>银行卡号：</span>
                                            <span>{{item.checkin_collect_id.account}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>中介费用：</span>
                                            <span>{{item.checkin_collect_id.cost_medi}}</span>
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
                                            <span>业主姓名：<sup>*</sup></span>
                                            <span>{{item.customer_id.name}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>尊称：<sup>*</sup></span>
                                            <span>{{dictionary.gender[item.customer_id.gender]}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>国籍：<sup>*</sup></span>
                                            <span>
                                                {{dictionary.nationality[item.customer_id.nationality]}}
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>手机号码：<sup>*</sup></span>
                                            <span>{{item.customer_id.mobile}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>证件类型：<sup>*</sup></span>.
                                            <span>
                                                {{dictionary.credentials[item.customer_id.id_type]}}
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>身份证号：<sup>*</sup></span>
                                            <span>{{item.customer_id.id_num}}</span>
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
                                                    {{dictionary.house_type[item.villa_id.house_type]}}
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
                                                    {{dictionary.floor_type[item.villa_id.floor_type]}}
                                                </span>
                                        </div>
                                        <div class="infoList ">
                                            <span >所属小区：</span>
                                            <span>{{item.villa_id.village_name}}</span>
                                        </div>
                                        <div class="infoList ">
                                            <span >房屋特色：</span>
                                            <span>
                                                    {{dictionary.house_feature[item.villa_id.house_feature]}}
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
                                        <h4>房屋照片</h4>
                                        <div class="infoList">
                                            <span>房屋照片</span>
                                            <span>
                                                <img :src="img.small"
                                                         v-for="(img,index) in item.villa_id.album.house_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>水卡照片</span>
                                            <span >
                                                <img :src="img.small"
                                                         v-for="(img,index) in item.villa_id.album.water_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>电卡卡照片</span>
                                            <span >
                                                <img :src="img.small"
                                                         v-for="(img,index) in item.villa_id.album.elec_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>燃气卡照片</span>
                                            <span >
                                                <img :src="img.small"
                                                         v-for="(img,index) in item.villa_id.album.gas_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>产权证照片</span>
                                            <span >
                                                <img :src="img.small"
                                                         v-for="(img,index) in item.villa_id.album.property_pic">
                                            </span>
                                        </div>
                                        <h4>附件照片</h4>
                                        <div class="infoList">
                                            <span>证件照片<sup>*</sup></span>
                                            <span>
                                             <img :src="img.small"
                                                  v-for="(img,index) in item.album.id_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>银行卡<sup>*</sup></span>
                                            <span>
                                             <img :src="img.small"
                                                  v-for="(img,index) in item.album.bank_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>合同照片<sup>*</sup></span>
                                            <span>
                                             <img :src="img.small"
                                                  v-for="(img,index) in item.album.contract_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>水费照片</span>
                                            <span >
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.water_card_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>电费照片</span>
                                            <span>
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.elec_card_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>燃气费照片</span>
                                            <span>
                                            <img :src="img.small" v-for="(img,index) in item.album.gas_card_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>交接单照片</span>
                                            <span>
                                            <img :src="img.small" v-for="(img,index) in item.album.handover_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>委托书</span>
                                            <span>
                                            <img :src="img.small" v-for="(img,index) in item.album.proxy_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>押金收条</span>
                                            <span >
                                            <img :src="img.small" v-for="(img,index) in item.album.receipt_pic">
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6" v-if="rentContractList !== []">
                                    <div class="contract_detail"  v-for="item in rentContractList">
                                        <h3>租房合同信息</h3>
                                        <h4>基本信息</h4>
                                        <div class="infoList">
                                            <span>合同编号：<sup>*</sup></span>
                                            <span>{{item.contract_num}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>年限(月)：<sup>*</sup></span>
                                            <span>{{item.checkin_rent_id.months}} 月</span>
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
                                            <span>押 {{item.checkin_rent_id.bet}} 付 {{item.checkin_rent_id.pay}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>月单价：</span>
                                            <span>{{item.checkin_rent_id.price}} 元</span>
                                        </div>
                                        <div class="infoList">
                                            <span>应收：</span>
                                            <span>{{item.checkin_rent_id.price*(item.checkin_rent_id.bet+item.checkin_rent_id.pay)}} 元</span>
                                        </div>
                                        <div class="infoList">
                                            <span>已收 （定金）：<sup>*</sup></span>
                                            <span>{{item.checkin_rent_id.received_amount}} 元</span>
                                        </div>
                                        <div class="infoList">
                                            <span>付款方式 （银行卡）：</span>
                                            <span>{{item.checkin_rent_id.payment[1].money}} 元</span>
                                        </div>
                                        <div class="infoList">
                                            <span>付款方式 （现金）：</span>
                                        </div>
                                        <div class="infoList">
                                            <span>付款方式 （支付宝）：<sup>*</sup></span>
                                            <span></span>
                                        </div>
                                        <div class="infoList">
                                            <span>未收：</span>
                                            <span>{{item.checkin_rent_id.amount_remaining}} 元</span>
                                        </div>
                                        <div class="infoList">
                                            <span>租房状态：</span>
                                            <span>{{dictionary.rent_type[item.checkin_rent_id.rent_type]}}</span>
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
                                            <span>业主姓名：<sup>*</sup></span>
                                            <span>{{item.customer_id.name}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>尊称：<sup>*</sup></span>
                                            <span>{{dictionary.gender[item.customer_id.gender]}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>国籍：<sup>*</sup></span>
                                            <span>
                                                    {{dictionary.nationality[item.customer_id.nationality]}}
                                                </span>
                                        </div>
                                        <div class="infoList">
                                            <span>手机号码：<sup>*</sup></span>
                                            <span>{{item.customer_id.mobile}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>证件类型：<sup>*</sup></span>.
                                            <span>
                                                    {{dictionary.credentials[item.customer_id.id_type]}}
                                                </span>
                                        </div>
                                        <div class="infoList">
                                            <span>身份证号：<sup>*</sup></span>
                                            <span>{{item.customer_id.id_num}}</span>
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
                                            <span>
                                                    {{item.villa_id.area}}㎡
                                                </span>
                                        </div>
                                        <div class="infoList">
                                            <span>房屋类型：</span>
                                            <span>
                                                    {{dictionary.house_type[item.villa_id.house_type]}}
                                                </span>
                                        </div>
                                        <div class="infoList">
                                            <span>配套设施：</span>
                                            <span>
                                                <span  v-for="list in item.villa_id.facility">
                                                    {{dictionary.facility[list]}}&nbsp;&nbsp;
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
                                                {{dictionary.floor_type[item.villa_id.floor_type]}}
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>所属小区：</span>
                                            <span>{{item.villa_id.village_name}}</span>
                                        </div>
                                        <div class="infoList">
                                            <span>房屋特色：</span>
                                            <span>
                                                {{dictionary.house_feature[item.villa_id.house_feature]}}
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
                                            <span>
                                                <img :src="img.small" v-for="(img,index) in item.villa_id.album.house_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>水卡照片</span>
                                            <span >
                                                <img :src="img.small" v-for="(img,index) in item.villa_id.album.water_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>电卡卡照片</span>
                                            <span >
                                                <img :src="img.small" v-for="(img,index) in item.villa_id.album.elec_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>燃气卡照片</span>
                                            <span >
                                                <img :src="img.small" v-for="(img,index) in item.villa_id.album.gas_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>产权证照片</span>
                                            <span >
                                                <img :src="img.small" v-for="(img,index) in item.villa_id.album.property_pic">
                                            </span>
                                        </div>
                                        <h4>合同附件</h4>
                                        <div class="infoList">
                                            <span>合同照片<sup>*</sup></span>
                                            <span>
                                                <img :src="img.small" v-for="(img,index) in item.album.contract_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>水费照片</span>
                                            <span >
                                                <img :src="img.small" v-for="(img,index) in item.album.water_card_pic">
                                            </span>
                                        </div>
                                        <div class="infoList">
                                            <span>电费照片</span>
                                            <span>
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.elec_card_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>燃气费照片</span>
                                            <span>
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.gas_card_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>押金收条</span>
                                            <span >
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.receipt_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>转账凭证</span>
                                            <span >
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.payment_pic">
                                        </span>
                                        </div>
                                        <div class="infoList">
                                            <span>交接单照片</span>
                                            <span>
                                            <img :src="img.small"
                                                 v-for="(img,index) in item.album.handover_pic">
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="close">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <PicModal :largePic="largePic"></PicModal>
    </div>
</template>
<script>
    import Status from '../common/status.vue'
    import PicModal from  '../common/largePic.vue'
    export default{
        props:['villaId','dictionary','isCompared',],
        components:{Status,PicModal},
        data(){
            return{
                myVillaId:'',
                myDictionary:'',
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
                myIsCompared:false,
                largePic: [],   //查看大图
                srcs: {},
            }
        },
        watch:{
            villaId(val){
                this.myVillaId = val;
            },
            dictionary(val){
                this.myDictionary = val;
            },
            isCompared(val){
                this.myIsCompared = val;
                if(this.myIsCompared) this.compare();
            },
        },
        methods:{
            compare(){
                this.$http.get('core/collect/compare/villa_id/' + this.myVillaId).then((res) => {
                    if(res.data.code === '70020'){
                        this.rentContractList = [];
                        this.rentContractList.push(res.data.data);
                        console.log(this.rentContractList)
                    }else {
                        this.rentContractList = [];
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
                this.$http.get('core/rent/compare/villa_id/' + this.myVillaId).then((res) => {
                    if(res.data.code === '80020'){
                        this.collectContractList = [];
                        this.collectContractList.push(res.data.data);
                    }else {
                        this.collectContractList = [];
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            close(){
                this.$emit('Compared','yes')
            },

        }
    }
</script>
<style scoped>

    @media (min-width: 768px) {
        .contract_detail{
            border: 1px solid #CCCCCC;
            border-radius: 5px;
            padding: 0 10px;
        }
    }
    .infoList{
        margin: 15px;
        border-bottom: 1px solid #eeeeee;
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
</style>

