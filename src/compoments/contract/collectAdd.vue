<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractAdd" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click = closeModal>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">新增收房合同</h4>
                        </div>
                        <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h4 style="margin-top: -15px">基本信息</h4>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">客户姓名<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" @click="selectMainClient"
                                                   v-model="customer_name" readonly>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[0]"
                                                   readonly placeholder="业主姓名" @click="selectClient(0)">
                                        </div>
                                        <div class="col-sm-2 flexbox">
                                            <i class="fa fa-plus-circle" @click="addMore"></i>
                                            <i class="fa fa-minus-circle" @click="reduceMore"></i>
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=2">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[1]"
                                                   readonly placeholder="业主姓名" @click="selectClient(1)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=3">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[2]"
                                                   readonly placeholder="业主姓名" @click="selectClient(2)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=4">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[3]"
                                                   readonly placeholder="业主姓名" @click="selectClient(3)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=5">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[4]"
                                                   readonly placeholder="业主姓名" @click="selectClient(4)">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">房屋地址<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="house_name" readonly @click="selectHouse">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同编号<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="contractAdd.contract_num" placeholder="合同编号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">收房月数<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" @blur="changeisClick" v-model="contractAdd.months">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">空置期<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="contractAdd.vacancy">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >空置期开始日期<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input @click="selectDate" readonly placeholder="空置期开始时间"
                                                   v-model="contractAdd.vac_start_date" class="form-control form_date">
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >空置期结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractAdd.vac_end_date"
                                                   disabled placeholder="空置期结束时间">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >合同开始日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractAdd.start_date"
                                                   disabled placeholder="合同开始时间">
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >合同结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractAdd.end_date"
                                                   disabled placeholder="合同结束时间">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >打房租日期<sup>*</sup></label>
                                        <div class="col-lg-4">
                                            <select class="form-control" v-model="contractAdd.pay_date">
                                                <option value="">每期打房租日期</option>
                                                <option :value="value" v-for="value in 31">{{value}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-1 control-label col-lg-1">号</label>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-2 control-label">付款方式<sup>*</sup></label>

                                        <div class="col-sm-6">
                                            <select class="form-control" v-model="one_type" :disabled="pay_typeChange">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in myDictionary.pay_type">{{value}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4">
                                            <label class="control-label">
                                                <input type="checkbox" :checked="pay_typeChange" @click="changePayType($event)">付款方式不固定
                                            </label>
                                        </div>

                                    </div>
                                    <div class="form-group" v-show="pay_typeChange">
                                        <div class="col-sm-6" v-for="(item,index) in more_type">
                                            <label class="col-sm-5 control-label">第{{index+1}}年</label>
                                            <div class="col-sm-7">
                                                <select class="form-control" v-model="more_type[index]">
                                                    <option :value="key" v-for="(value,key) in myDictionary.pay_type">{{value}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <FlexBox :flexData="Math.ceil(contractAdd.months/12)" :datas="contractAdd.price" :change="false"
                                             :title="'收房月单价'" @sendData="getFlexData"></FlexBox>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">押金<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="contractAdd.cost_deposit">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >开单人</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="staff_name"
                                                  @click="selectDpm" readonly placeholder="开单人">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >资料补齐时间<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input @click="selectDate" readonly placeholder="资料补齐时间"
                                                   v-model="contractAdd.complete_date" class="form-control form_date">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                        <div class="col-md-10">
                                            <textarea class="form-control" placeholder="请输入备注信息"
                                                      rows="3" v-model="contractAdd.remarks">
                                            </textarea>
                                        </div>
                                    </div>
                                    <hr>
                                    <!--客户部分-->
                                    <h4>客户信息</h4>
                                    <div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label">客户汇款方式<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractAdd.payment" @change="changeCustomerPayment">
                                                    <option value="">请选择</option>
                                                    <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractAdd.payment==1||contractAdd.payment==4">
                                            <label class="col-sm-2 control-label">客户收款人姓名<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.account_owner">
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractAdd.payment==1||contractAdd.payment==4">
                                            <label class="col-sm-2 control-label">开户行<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractAdd.bank">
                                                    <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractAdd.payment==1||contractAdd.payment==4">
                                            <label class="col-sm-2 control-label">支行</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.account_subbank">
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractAdd.payment==2">
                                            <label class="col-sm-2 control-label">支付宝姓名<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.account_owner">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label v-show="contractAdd.payment==1" class="col-sm-2 control-label">账号<sup>*</sup></label>
                                            <label v-show="contractAdd.payment==2" class="col-sm-2 control-label">支付宝账号<sup>*</sup></label>
                                            <label v-show="contractAdd.payment==3" class="col-sm-2 control-label">微信账号<sup>*</sup></label>
                                            <label v-show="contractAdd.payment==4" class="col-sm-2 control-label">存折账号<sup>*</sup></label>
                                            <div class="col-sm-10" v-show="contractAdd.payment !=='' && contractAdd.payment !==undefined">
                                                <input type="text" class="form-control" v-model="contractAdd.account">
                                            </div>
                                        </div>
                                    </div>
                                    <!--中介部分-->
                                    <hr>
                                    <h4>中介信息</h4>
                                    <div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label">中介费<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.cost_medi" >
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="col-sm-2 control-label">中介汇款方式</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractAdd.medi_account_type" @change="changeMediPayment">
                                                    <option value="">请选择</option>
                                                    <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row" v-show="contractAdd.medi_account_type==1||contractAdd.medi_account_type==4">
                                            <label class="col-sm-2 control-label">中介收款人姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.medi_account_owner">
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractAdd.medi_account_type==1||contractAdd.medi_account_type==4">
                                            <label class="col-sm-2 control-label">开户行</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractAdd.medi_account_bank">
                                                    <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractAdd.medi_account_type==1||contractAdd.medi_account_type==4">
                                            <label class="col-sm-2 control-label">支行</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.medi_account_subbank">
                                            </div>
                                        </div>
                                        <div class="row"v-show="contractAdd.medi_account_type==2">
                                            <label class="col-sm-2 control-label">支付宝姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.medi_account_owner">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label v-show="contractAdd.medi_account_type==1" class="col-sm-2 control-label">账号</label>
                                            <label v-show="contractAdd.medi_account_type==2" class="col-sm-2 control-label">支付宝账号</label>
                                            <label v-show="contractAdd.medi_account_type==3" class="col-sm-2 control-label">微信账号</label>
                                            <label v-show="contractAdd.medi_account_type==4" class="col-sm-2 control-label">存折账号</label>
                                            <div class="col-sm-10"
                                                 v-show="contractAdd.medi_account_type !=='' && contractAdd.medi_account_type !==undefined">
                                                <input type="text" class="form-control" v-model="contractAdd.medi_account_num " >
                                            </div>
                                        </div>
                                    </div>


                                    <hr>
                                    <h4>合同附件</h4>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">银行卡照片<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <up-load @photo="bankPicId" @delete="picDelete" @complete="complete"
                                                     :result="'bankPic'" :idPhotos="bankPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">合同照片<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <up-load @photo="contractPicId" @delete="picDelete" @complete="complete"
                                                     :result="'contractPic'" :idPhotos="contractPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">水表照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="waterPicId" @delete="picDelete" @complete="complete"
                                                     :result="'waterPic'" :idPhotos="waterPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">电表照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="elePicId" @delete="picDelete" @complete="complete"
                                                     :result="'elePic'" :idPhotos="elePic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">燃气表照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="gasPicId" @delete="picDelete" @complete="complete"
                                                     :result="'gasPic'" :idPhotos="gasPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">交接单照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="handoverPicId" @delete="picDelete" @complete="complete"
                                                     :result="'handoverPic'" :idPhotos="handoverPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">委托书照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="proxyPicId" @delete="picDelete" @complete="complete"
                                                     :result="'proxyPic'" :idPhotos="proxyPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">押金收条</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="receiptPicId" @delete="picDelete" @complete="complete"
                                                     :result="'receiptPic'" :idPhotos="receiptPic"></up-load>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" @click = closeModal>关闭</button>
                            <button type="button" class="btn btn-primary" @click="addContract">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--选择客户-->
        <SelectClient :collectRent="collectRent" @clientAdd="receiveClient"> </SelectClient>
        <Status :state='info'></Status>

        <SelectHouse @House="getHouse"></SelectHouse>

        <Staff :configure='configure' @Staff="dpmSeleted"></Staff>
    </div>
</template>
<script>
    import SelectClient from '../common/selectClient.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    import FlexBox from '../common/flexBox.vue'
    import SelectHouse from  '../common/selectHouse.vue'

    import Staff from '../common/organization/selectStaff.vue'
    export default{
        props:['dictionary'],
        components:{
            SelectClient,
            upLoad,
            Status,
            SelectHouse,
            FlexBox,
            Staff
        },
        data(){
            return {
                collectRent : '',
                complete_ok:'ok',
                bankPic : {
                    cus_idPhotos : {},    //银行卡照片id
                    cus_idPhoto : [],     //银行卡照片
                },
                contractPic : {
                    cus_idPhotos : {},    //合同图片ID
                    cus_idPhoto : [],     //合同照片
                },
                waterPic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                elePic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                gasPic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                proxyPic : {
                    cus_idPhotos : {},    //委托书图片ID
                    cus_idPhoto : [],     //围殴托书照片

                },
                handoverPic : {
                    cus_idPhotos : {},    //交接单图片ID
                    cus_idPhoto : [],     //交接单照片
                },
                receiptPic : {
                    cus_idPhotos : {},    //押金收条ID
                    cus_idPhoto : [],     //押金收条照片
                },
                customer_name:'',
                relative_customer : [],
                contractAdd : {

                    contract_num:'',        //合同编号
                    vac_start_date:'',      //空置期开始日期
                    vac_end_date:'',        //空置期结束日期
                    start_date:'',          //合同开始日期
                    end_date:'',            //合同结束日期
                    pay_date:'',            //打房租日期
                    complete_date:'',       //资料补齐时间
                    remarks:'',             //备注信息
                    bank_pic:[],            //银行卡照片
                    contract_pic:[],        //合同照片
                    water_card_pic:[],      //水卡照片
                    elec_card_pic:[],       //电卡照片
                    gas_card_pic:[],        //燃气卡卡照片
                    proxy_pic:[],           //委托书照片
                    handover_pic:[],        //交接单照片
                    receipt_pic:[],         //押金收条

                    villa_id :'',           //fangwuid
                    months : '',
                    pay_type : [],
                    price : [],
                    cost_deposit : '',
                    vacancy : '',

                    //                    客户
                    customer_id : '',
                    relative_customer_id:[],//附属客户id
                    payment : 1,
                    account_owner : '',     // 收款人姓名
                    account_subbank : '',   // 支行
                    alipay_owner : '',      // 支付宝姓名
                    bank : 1,
                    account : '',           // 账户

                    cost_medi : '',     // 中介费
//                    is_medi : 1,
                    medi_account_type : 1,
                    medi_account_owner : '',     // 收款人姓名
                    medi_account_bank : 1,   // 开户行
                    medi_account_subbank : '',   // 支行
                    medi_alipay_owner : '',      // 支付宝姓名
                    medi_account_num  :'',
                    staff : '',
                },
                staff_name:'',
                dateConfigureVac: [{range:false,needHour:false, }],
                dateConfigureComplete: [{range:false,needHour:false, }],
                dateType:'',
                myDictionary:[],

                checkCollectId : '',
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
                more:1,
                flag:'',
                isClick :false,

                pay_typeChange : false,
                one_type : '',
                more_type : [],
                showCustomer : false,
                clientType : '',
                house_name : '',
                configure : '',
            }
        },
        updated(){
            this.selectDate ();
        },
        watch : {
            dictionary(val){
                this.myDictionary = val;
                this.bankPic.cus_idPhotos = [];
                this.contractAdd.bank_pic = [];
                this.contractPic.cus_idPhotos = [];
                this.contractAdd.contract_pic = [];
                this.proxyPic.cus_idPhotos = [];
                this.contractAdd.proxy_pic = [];
                this.handoverPic.cus_idPhotos = [];
                this.contractAdd.handover_pic = [];
                this.receiptPic.cus_idPhotos = [];
                this.contractAdd.receipt_pic = [];
                this.waterPic.cus_idPhotos = [];
                this.contractAdd.water_card_pic = [];
                this.elePic.cus_idPhotos = [];
                this.contractAdd.elec_card_pic = [];
                this.gasPic.cus_idPhotos = [];
                this.contractAdd.gas_card_pic = [];

            },
            'contractAdd.vac_start_date' : {
                deep:true,
                handler(val,oldVal){
                    if(val !== oldVal && this.isClick){
                        this.completeDate(val);
                    }
                }
            },
            'contractAdd.months' : {
                deep:true,
                handler(val,oldVal){
                    if(val !== oldVal && this.isClick){
                        this.completeDate(val);
                    }
                }
            },
            'contractAdd.vacancy' : {
                deep:true,
                handler(val,oldVal){
                    if(val !== oldVal && this.isClick){
                        this.completeDate(val);
                    }
                }
            },
            one_type(curVal,oldVal){
                if (curVal != oldVal){
                    if (!this.pay_typeChange){
                        this.contractAdd.pay_type = [];
                        this.contractAdd.pay_type.push(curVal);
                    }
                }
            },
            pay_typeChange(curVal,oldVal){
                this.contractAdd.pay_type = [];
                if (curVal){
                    this.contractAdd.pay_type = this.more_type;
                } else {
                    this.contractAdd.pay_type.push(this.one_type);
                }
            },
        },
        methods : {
            selectDpm(){ //选择部门
                $('.selectCustom:eq(1)').modal('show');
                this.configure = {length: 1, class: 'amount'};
            },
            dpmSeleted(val){
                this.staff_name = val.staff[0].name;
                this.contractAdd.staff_id = val.staff[0].id;
            },
            selectClient(val){         //选择业主姓名
                this.clientType = 'relative'
                this.flag = val;
                this.collectRent = 1;
                $('#selectClient').modal('show');
            },
            selectMainClient(){
                this.clientType = 'main'
                this.collectRent = 1;
                $('#selectClient').modal('show');
            },
            receiveClient(val){     //接收业主id
                this.collectRent = '';
                if(this.clientType === 'relative'){
                    if(this.more > this.relative_customer.length && this.contractAdd.relative_customer_id.indexOf(val.id) == -1){
                        this.contractAdd.relative_customer_id .push(val.id);
                        this.relative_customer.push(val.name);
                    }else if(this.more === this.relative_customer.length){
                        this.contractAdd.relative_customer_id.splice(this.flag,1);
                        this.relative_customer.splice(this.flag,1,val.name);
                    }
                }else {
                    this.contractAdd.customer_id = val.id;
                    this.customer_name = val.name;
                }

            },
            completeDate(val){  //计算空置期结束 合同开始以及结束时间
                this.$http.post('core/collect/contractDate',
                    {
                        vac_start_date : this.contractAdd.vac_start_date,
                        vacancy : this.contractAdd.vacancy,
                        months : this.contractAdd.months,
                    }).then(
                    (res) => {
                        this.contractAdd.vac_end_date = res.data.vac_end_date;
                        this.contractAdd.start_date = res.data.start_date;
                        this.contractAdd.end_date = res.data.end_date;
                    }
                )

            },

            changeisClick(){
                this.isClick = true;
            },
            selectDate (){
                $('.form_date').datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,
                    pickerPosition: 'bottom-left',
                }).on('changeDate', ev => {
                    if (ev.target.placeholder === '空置期开始时间'){
                        this.contractAdd.vac_start_date = ev.target.value;
                    } else {
                        this.contractAdd.complete_date = ev.target.value;
                    }
                });
            },
            //获取图片id
            bankPicId(val){         //获取成功上传银行卡 id 数组
                this.contractAdd.bank_pic = val;
            },
            contractPicId(val){     //获取成功上传合同 id 数组
                this.contractAdd.contract_pic = val;
            },
            waterPicId(val){        //获取成功上传水卡 id 数组
                this.contractAdd.water_card_pic = val;
            },
            elePicId(val){          //获取成功上传电卡 id 数组
                this.contractAdd.elec_card_pic = val;
            },
            gasPicId(val){          //获取成功上传燃气卡 id 数组
                this.contractAdd.gas_card_pic = val;
            },
            proxyPicId(val){        //获取成功上传委托书卡 id 数组
                this.contractAdd.proxy_pic = val;
            },
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractAdd.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传押金收条 id 数组
                this.contractAdd.receipt_pic = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let bank = this.contractAdd.bank_pic.indexOf(val);
                if (bank > -1) {
                    this.contractAdd.bank_pic.splice(bank, 1);
                }
                let contract = this.contractAdd.contract_pic.indexOf(val);
                if (contract > -1) {
                    this.contractAdd.contract_pic.splice(contract, 1);
                }
                let water = this.contractAdd.water_card_pic.indexOf(val);
                if (water > -1) {
                    this.contractAdd.water_card_pic.splice(water, 1);
                }
                let ele = this.contractAdd.elec_card_pic.indexOf(val);
                if (ele > -1) {
                    this.contractAdd.elec_card_pic.splice(ele, 1);
                }
                let gas = this.contractAdd.gas_card_pic.indexOf(val);
                if (gas > -1) {
                    this.contractAdd.gas_card_pic.splice(gas, 1);
                }
                let proxy = this.contractAdd.proxy_pic.indexOf(val);
                if (proxy > -1) {
                    this.contractAdd.proxy_pic.splice(proxy, 1);
                }
                let handover = this.contractAdd.handover_pic.indexOf(val);
                if (handover > -1) {
                    this.contractAdd.handover_pic.splice(handover, 1);
                }
                let receipt = this.contractAdd.receipt_pic.indexOf(val);
                if (receipt > -1) {
                    this.contractAdd.receipt_pic.splice(receipt, 1);
                }
            },
            addContract(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        this.$http.post('core/collect/saveContract ',this.contractAdd).then((res) => {
                            if(res.data.code === "70010"){
                               this.closeModal();
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;


                            }else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }

                        })
                    });

                } else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },
            addMore(){
                if(this.more < 5 && this.more === this.relative_customer.length){
                    this.more++;
                }
            },
            reduceMore(){
                if(this.more>0){
                    if(this.more === this.relative_customer.length ){
                        this.relative_customer.length--;
                        this.contractAdd.relative_customer_id.length--;
                    }
                    this.more--;
                }

            },
            closeModal(){
                $('#contractAdd').modal('hide');
                this.contractAdd.contract_num = '' ;       //合同编号
                this.contractAdd.vac_start_date = '';      //空置期开始日期
                this.contractAdd.vac_end_date = '';        //空置期结束日期
                this.contractAdd.start_date = '';         //合同开始日期
                this.contractAdd.end_date = '';            //合同结束日期
                this.contractAdd.pay_date = '';            //打房租日期
                this.contractAdd.complete_date = '';       //资料补齐时间
                this.contractAdd.remarks = '';             //备注信息

                this.pay_typeChange = false;
                this.one_type = '';
                this.more_type = [];

                this.house_name = '';
                this.customer_name = '';

                this.contractAdd.type = '';
                this.contractAdd.staff_id = '';
                this.contractAdd.villa_id = '';
                this.contractAdd.customer_id = '';

                this.contractAdd.months = '';
                this.contractAdd.pay_type = [];
                this.contractAdd.price.splice(0,this.contractAdd.price.length);
                this.contractAdd.vacancy = '';
                this.contractAdd.cost_deposit = '';
                this.contractAdd.deal_time = '';
                this.contractAdd.remark = '';

                this.contractAdd.payment = 1;
                this.contractAdd.bank = 1;
                this.contractAdd.account = '';
                this.contractAdd.account_owner = '';
                this.contractAdd.account_subbank = '';

                this.contractAdd.cost_medi = 0;
                this.contractAdd.medi_account_type = 1;
                this.contractAdd.medi_account_num = '';
                this.contractAdd.medi_account_owner = '';
                this.contractAdd.medi_account_bank = 1;
                this.contractAdd.medi_account_subbank = 1;

                this.more  = 1;
                this.relative_customer = [];
                this.contractAdd.relative_customer_id = [];
            },

            changePayType(ev){
                this.contractAdd.pay_type = [];
                this.more_type = [];
                if (ev.target.checked) {
                    if (this.contractAdd.months !== '') {
                        this.pay_typeChange = true;
                        if (this.contractAdd.months % 12 === 0) {
                            let month = parseInt(this.contractAdd.months / 12);
                            for (let i = 0; i < month; i++) {
                                this.more_type.push('1');
                            }
                        } else {
                            let month = parseInt(this.contractAdd.months / 12 + 1);
                            for (let i = 0; i < month; i++) {
                                this.more_type.push('1');
                            }
                        }
                    }
                } else {
                    this.pay_typeChange = false;
                }
            },

            // 修改客户收款方式
            changeCustomerPayment(){
                this.contractAdd.account_owner = '';
                this.contractAdd.account_subbank = '';
                this.contractAdd.alipay_owner = '';
                this.contractAdd.bank = 1;
                this.contractAdd.account = '';
            },
            // 修改中介收款方式
            changeMediPayment(){
                this.contractAdd.medi_account_owner = '';
                this.contractAdd.medi_account_subbank = '';
                this.contractAdd.medi_alipay_owner = '';
                this.contractAdd.medi_account_bank = 1;
                this.contractAdd.medi_account_num = '';
            },
            getFlexData(data){
                console.log(data)
                this.contractAdd.price = data;
            },
            selectHouse(){
                $('#selectHouse').modal('show');
            },
            getHouse(data){
                this.contractAdd.villa_id = data.id;
                this.house_name = data.address;
            },
        }
    }
</script>
<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 5px;
        width: 17px;
        height: 17px;
    }
    .col-lg-2{
        position: relative;
        min-height: 1px;
        padding-right: 0px;
        padding-left: 15px;
    }
    .flexbox i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /*text-align: left;*/
        cursor: pointer;
    }
    .flexbox i+i{
        margin-left: 5px;
    }
    .flexbox i:hover{
        color: #999;
    }
    sup{
        color: #e8403f;
    }
    #contractAdd{
        z-index: 1044;
    }

</style>