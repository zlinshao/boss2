<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li class="active">收房合同详情</li>
        </ol>

        <div class="title clearFix">
            <div class="contractNum">
                <router-link to="/CollectContract" tag="button" class="btn btn-white" style="border: none">返回</router-link>
                <h4>
                    合同编号&emsp;
                    {{contract_num}}
                </h4>
                <span class="label label-warning">{{passDictionary[contract_pass]}}</span>
            </div>
            <div class="pull-right dropdown" v-for="item in contractList">
                <span @click="changeLock">
                    <i class="fa fa-lock" v-if="isLock"></i>
                    <i class="fa fa-unlock" v-else="isLock"></i>
                </span>
                <button class="btn btn-primary" @click="compareContract">对比</button>
                <!--<router-link :to="{path:'/compareContract',query: {ContractId: contractList[0].villa_id.id}}" tag="button" class="btn btn-primary">对比</router-link>-->
                <button class="btn btn-primary" @click="inform">通知</button>
                <button class="btn btn-primary" @click="returnVisit" v-if="item.reviewed ===2">
                    {{dictionary.reviewed[item.reviewed]}}
                </button>
                <button class="btn btn-warning" disabled v-if="item.reviewed ===1">
                    {{dictionary.reviewed[item.reviewed]}}
                </button>
                <button class="btn btn-primary" v-if="isPass">通过</button>
                <button class="btn btn-primary" v-else="isPass">驳回</button>
                <button class="btn btn-default more" @click="showUl" v-if="isCollect">
                    更多
                    <ul v-show="show">
                        <li @click="editContract">编辑</li>
                        <li @click="renewContract">续约</li>
                    </ul>
                </button>
            </div>
        </div>

        <!--内容区-->
        <div class="row">

            <!--应付款/打款/合同信息-->
            <div class="col-md-3">
                <!--应付款-->
                <section class="panel roll">
                    <header class="panel-heading">
                        应付款
                    </header>
                    <div class="panel-body table-responsive">
                        <table class="table">
                            <thead>
                            <tr class="text-center">
                                <td>当月应付</td>
                                <td>付款进度</td>
                                <td>本次打款时间</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center">
                                <td>2000</td>
                                <td>
                                    <div class="progress progress-striped active">
                                        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="45" role="progressbar" class="progress-bar" style="width: 50%;">
                                        </div>
                                    </div>
                                </td>
                                <td>2017-07-05</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <!--打款-->
                <section class="panel roll pay">
                    <header class="panel-heading">
                        打款
                        <a class="pull-right" @click="transferDetail">更多</a>
                    </header>
                    <div class="panel-body table-responsive">
                        <div class="total">
                            合计:123456
                            未打款:123456
                            <br>
                            打款账号:12345678913246587
                        </div>
                        <table class="table">
                            <thead>
                                <tr class="lightGray text-center">
                                    <td>打款时间</td>
                                    <td>打款金额</td>
                                    <td>打款人</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center">
                                    <td>2017-06-23</td>
                                    <td>2000</td>
                                    <td>哈哈</td>
                                </tr>
                                <tr class="text-center">
                                    <td>2017-06-23</td>
                                    <td>2000</td>
                                    <td>哈哈</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <!--合同信息-->
                <section class="panel roll contract">
                    <header class="panel-heading">
                        合同信息
                        <a class="pull-right" @click="contractInfo">更多</a>
                    </header>
                    <div class="panel-body table-responsive">
                        <table class="table contract_info">
                            <tbody>
                                <tr>
                                    <td><a><i class="fa fa-bookmark"></i></a></td>
                                    <td colspan="2">2017-07-20&nbsp;至&nbsp;2017-05-16</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>合同编号</td>
                                    <td>合同编号</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>房屋地址</td>
                                    <td>合同编号合同编号</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>负责人</td>
                                    <td>合同编号</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>结束原因</td>
                                    <td>合约到期</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
            <!--基本信息/房屋信息/合同附件-->
            <div class="col-md-9">
                <section class="panel roll">
                    <header class="panel-heading tab-bg-dark-navy-blue ">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#base" aria-expanded="true">基本信息</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#house" aria-expanded="false">房屋信息</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#contract" aria-expanded="false">合同附件</a>
                            </li>

                        </ul>
                    </header>
                    <div class="panel-body" >
                        <div class="tab-content" v-for="item in contractList">
                            <!--基本信息-->
                            <div id="base" class="tab-pane active">
                                <div class="baseInfo">
                                    <header>基本信息</header>
                                    <div class="infoContainer clearFix">
                                        <div class="col-lg-4">
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
                                        </div>
                                        <div class="col-lg-4">
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
                                                <span v-for="(price,index) in item.checkin_collect_id.price">
                                                    第{{index+1}}年{{price}}元&nbsp;&nbsp;
                                                </span>
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
                                        </div>
                                        <div class="col-lg-4">
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
                                        </div>
                                    </div>
                                </div>
                                <div class="ownerInfo">
                                    <header>业主信息</header>
                                    <div class="infoContainer clearFix">
                                        <div class="col-lg-4">
                                            <div class="infoList">
                                                <span>业主姓名：<sup>*</sup></span>
                                                <span>{{item.customer_id.name}}</span>
                                            </div>
                                            <div class="infoList">
                                                <span>尊称：<sup>*</sup></span>
                                                <span>{{dictionary.gender[item.customer_id.gender]}}</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
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
                                        </div>
                                        <div class="col-lg-4">
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
                                        </div>
                                    </div>
                                </div>
                                <div class="ownerInfo" v-if="item.relative_customer_id.length > 0"
                                     v-for="relative in item.relative_customer">
                                    <header>附属房东信息</header>
                                    <div class="infoContainer clearFix">
                                        <div class="col-lg-4">
                                            <div class="infoList">
                                                <span>业主姓名：<sup>*</sup></span>
                                                <span>{{relative.name}}</span>
                                            </div>
                                            <div class="infoList">
                                                <span>尊称：<sup>*</sup></span>
                                                <span>{{dictionary.gender[relative.gender]}}</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="infoList">
                                                <span>国籍：<sup>*</sup></span>
                                                <span>
                                                    {{dictionary.nationality[relative.nationality]}}
                                                </span>
                                            </div>
                                            <div class="infoList">
                                                <span>手机号码：<sup>*</sup></span>
                                                <span>{{relative.mobile}}</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="infoList">
                                                <span>证件类型：<sup>*</sup></span>.
                                                <span>
                                                    {{dictionary.credentials[relative.id_type]}}
                                                </span>
                                            </div>
                                            <div class="infoList">
                                                <span>身份证号：<sup>*</sup></span>
                                                <span>{{relative.id_num}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--房屋信息-->
                            <div id="house" class="tab-pane">
                                <div class="houseInfo clearFix">
                                    <div class="infoContainer">
                                        <div class="col-lg-6">
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">房屋地址：</span>
                                                <span class="col-lg-8">{{item.villa_id.address}}</span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">房型：</span>
                                                <span class="col-lg-8">
                                                    {{item.villa_id.rooms.rooms}}室{{item.villa_id.rooms.hall}}厅{{item.villa_id.rooms.toilet}}卫
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">面积：</span>
                                                <span class="col-lg-8">
                                                    {{item.villa_id.area}}㎡
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">房屋类型：</span>
                                                <span class="col-lg-8">
                                                    {{dictionary.house_type[item.villa_id.house_type]}}
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">楼层：</span>
                                                <span class="col-lg-8">
                                                    {{item.villa_id.floor}}/{{item.villa_id.total_floor}}
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">楼层建筑：</span>
                                                <span class="col-lg-8">
                                                    {{dictionary.floor_type[item.villa_id.floor_type]}}
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">所属小区：</span>
                                                <span class="col-lg-8">{{item.villa_id.village_name}}</span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">房屋特色：</span>
                                                <span class="col-lg-8">
                                                    {{dictionary.house_feature[item.villa_id.house_feature]}}
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">水费卡号：</span>
                                                <span class="col-lg-8">
                                                    {{item.villa_id.water_card_num}}
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">电费卡号：</span>
                                                <span class="col-lg-8">{{item.villa_id.elec_card_num}}</span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-4">燃气卡号：</span>
                                                <span class="col-lg-8">{{item.villa_id.gas_card_num}}</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="infoList clearFix">
                                                <span class="col-lg-2">房屋照片</span>
                                                <span class="col-lg-10">
                                                    <img :src="img.small" @click="showLargeVillaPic('house_pic',index)"
                                                         v-for="(img,index) in item.villa_id.album.house_pic">
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-2">水卡照片</span>
                                                <span class="col-lg-10" >
                                                    <img :src="img.small" @click="showLargeVillaPic('water_card_pic',index)"
                                                         v-for="(img,index) in item.villa_id.album.water_card_pic">
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-2">电卡卡照片</span>
                                                <span class="col-lg-10" >
                                                    <img :src="img.small" @click="showLargeVillaPic('elec_card_pic',index)"
                                                         v-for="(img,index) in item.villa_id.album.elec_card_pic">
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-2">燃气卡照片</span>
                                                <span class="col-lg-10" >
                                                    <img :src="img.small" @click="showLargeVillaPic('gas_card_pic',index)"
                                                         v-for="(img,index) in item.villa_id.album.gas_card_pic">
                                                </span>
                                            </div>
                                            <div class="infoList clearFix">
                                                <span class="col-lg-2">产权证照片</span>
                                                <span class="col-lg-10" >
                                                    <img :src="img.small" @click="showLargeVillaPic('property_pic',index)"
                                                         v-for="(img,index) in item.villa_id.album.property_pic">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--合同附件-->
                            <div id="contract" class="tab-pane">
                                <div class="infoContainer">
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">证件照片<sup>*</sup></span>
                                        <span class="col-lg-10">
                                             <img :src="img.small" @click="showLargeIdPic('id_pic',index)"
                                                  v-for="(img,index) in item.customer_id.album.id_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">银行卡<sup>*</sup></span>
                                        <span class="col-lg-10">
                                             <img :src="img.small" @click="showLargePic('bank_pic',index)"
                                                  v-for="(img,index) in item.album.bank_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">合同照片<sup>*</sup></span>
                                        <span class="col-lg-10">
                                             <img :src="img.small" @click="showLargePic('contract_pic',index)"
                                                  v-for="(img,index) in item.album.contract_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">水费照片</span>
                                        <span class="col-lg-10" >
                                            <img :src="img.small" @click="showLargePic('water_card_pic',index)"
                                                 v-for="(img,index) in item.album.water_card_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">电费照片</span>
                                        <span class="col-lg-10">
                                            <img :src="img.small" @click="showLargePic('elec_card_pic',index)"
                                                 v-for="(img,index) in item.album.elec_card_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">燃气费照片</span>
                                        <span class="col-lg-10">
                                            <img :src="img.small" @click="showLargePic('gas_card_pic',index)"
                                                 v-for="(img,index) in item.album.gas_card_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">交接单照片</span>
                                        <span class="col-lg-10">
                                            <img :src="img.small" @click="showLargePic('handover_pic',index)"
                                                 v-for="(img,index) in item.album.handover_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">委托书</span>
                                        <span class="col-lg-10">
                                            <img :src="img.small" @click="showLargePic('proxy_pic',index)"
                                                 v-for="(img,index) in item.album.proxy_pic">
                                        </span>
                                    </div>
                                    <div class="infoList clearFix">
                                        <span class="col-lg-2">押金收条</span>
                                        <span class="col-lg-10" >
                                            <img :src="img.small" @click="showLargePic('receipt_pic',index)"
                                                 v-for="(img,index) in item.album.receipt_pic">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!--components-->
        <Transfer></Transfer>
        <Contract></Contract>
        <ContractEit :contractEitId="contractEitId" :dictionary="dictionary" @EditStatus="editSuccess"></ContractEit>
        <ContractRenew></ContractRenew>
        <PicModal :largePic="largePic"></PicModal>
        <Status :state='info'></Status>
        <Comparison :villaId="villaId" :dictionary="dictionary" :isCompared="isCompared" @Compared="haveCompared"></Comparison>
    </div>
</template>
<script>
    import Status from  '../common/status.vue'
    import Transfer from './transferDetail.vue'
    import Contract from  './contractInfo.vue'
    import ContractEit from './collectEdit.vue'
    import ContractRenew from './contractRenew.vue'
    import PicModal from  '../common/largePic.vue'
    import Comparison from  './contractCompare.vue'
    export default{
        components: {
            Transfer,
            Contract,
            ContractEit,
            ContractRenew,
            PicModal,
            Status,
            Comparison
        },
        data(){
            return {
                isLock : true, // 是否锁定
                show : false,        // 是否显示更多
                isPass : true,      // 是否通过
                isCollect : true,   // 租房或收房
                contractList:[],
                dictionary:[],
                largePic: [],
                srcs: {},
                contractEitId:'',
                contract_num:'',
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
                isCompared:false,
                villaId : '',
                contract_pass:'',
                passDictionary:[],
            }
        },
        mounted(){
            this.contractEitId = this.$route.query.ContractId;
            this.getDictionary();
        },

        methods : {
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;
                    this.passDictionary = res.data.passed;
                    console.log(this.dictionary)
                    this.contractDetail();
                });
            },
            contractDetail(){
                this.$http.get('core/collect/readcontract/id/'+this.contractEitId).then((res)=>{
                    this.contractList = [];
                    this.contractList.push(res.data.data);
                    console.log(this.contractList)
                    this.contract_num = res.data.data.contract_num
                    this.contract_pass = res.data.data.passed
                })
            },
            showUl(){           // 点击更多
                this.show = !this.show;
            },
            changeLock(){       // 点击锁定
                this.isLock = !this.isLock;
            },
            transferDetail(){
                $('#transferDetail').modal('show');
            },
            contractInfo(){
                $('#contractInfo').modal('show');
            },
            editContract(){
                $('#contractEdit').modal('show');
            },
            renewContract(){
                $('#contractRenew').modal('show');
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
            editSuccess(val){
                if(val === 'success') this.contractDetail();
            },
            returnVisit(){  // 回访状态
                this.$http.get('core/collect/review/id/' + this.contractEitId).then((res) => {
                    if(res.data.code === '70030'){
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.contractDetail();
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                });
            },
            compareContract(){
                this.isCompared = true;
                this.villaId = this.contractList[0].villa_id.id;
                $('#collectVsRenting').modal('show');
            },
            haveCompared(){
                this.isCompared = false;
            },
            inform(){   //通知
                this.$http.get('core/collect/inform/id/' + this.contractEitId).then((res) => {
                    if(res.data.code === '70040'){
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.contractDetail();
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                });
            }

        }
    }
</script>
<style scoped>
    .progress{
        height: 14px;
    }
    .title{
        background-color: white;
        border-radius: 5px;
        padding: 15px 12px;
    }
    .title>div{
        display: inline-block;
    }
    .contractNum{
    }
    .contractNum h4{
        display: inline-block;
        font-weight: 600;
        vertical-align: middle;
        /*padding-left: 12px;*/
        /*line-height: 60px;*/
    }

    button.more{
        position: relative;
        z-index: 1000;
    }
    .pull-right{
        user-select: none;
    }
    .pull-right button ul{
        /*display: none;*/
        position: absolute;
        color: black;
        border: 1px solid #ddd;
        /*padding: 12px 20px;*/
        border-radius: 5px;
        background-color: white;
        top: 33px;
        left: -8px;
    }
    .pull-right button ul li{
        padding: 6px 20px;
    }
    .pull-right button ul li:hover{
        background-color: #f2f2f2;
    }
    .pull-right button ul li+li{
        border-top: 1px solid #ddd;
    }
    .pull-right span{
        margin-right: 8px;
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
    }
    .cStatus{
        display: inline-block;
        width: 60px;
        padding: 8px 0;
        color: white;
        border-radius: 5px;
        text-align: center;
        margin-left: 10px;
    }
    .yellow{
        background-color: #F9E175;
    }
    .gray{
        background-color: #CCCCCC;
    }
    .green{
        background-color: #83E96D;
    }

    .row{
        margin-top: 20px;
    }
    .pay table{
        margin-top: 12px;
    }
    .pay header a, .contract header a{
        font-size: 14px;
    }
    .lightGray{
        background-color: #F2F2F2;
    }

    #base header{
        font-size: 16px;
        font-weight: bold;
        border-left: 3px solid #169BD5;
        padding-left: 20px;
        margin-top: 20px;
    }
    .infoContainer{
        margin: auto;
    }
    .infoContainer .infoList{
        padding: 12px;
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
    .nav-tabs>li {
         margin-bottom: 0;
    }
</style>