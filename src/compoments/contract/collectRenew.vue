<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractRenew" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click = closeModal>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">续约收房合同</h4>
                        </div>
                        <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <div class="row oldContract">
                                        <label class="col-sm-2 control-label col-lg-2" >原合同编号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="oldContract_num" disabled placeholder="原合同编号">
                                        </div>
                                    </div>
                                    <h4>基本信息</h4>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">客户姓名</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="customer_name" disabled>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">房屋地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="house_name" disabled>
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
                                        <label class="col-sm-2 control-label col-lg-2" >合同编号<sup>*</sup></label>

                                        <div class="col-sm-9 col-lg-10 has-js">
                                            <div class="col-sm-6" style="padding-left : 0">
                                                <input type="text" class="form-control" @blur="test" :class="{'error': !contract_num_right}"
                                                       v-model="contractRenew.contract_num" placeholder="合同编号">
                                            </div>

                                            <label class="label_check col-sm-6" @click.prevent="isChecked($event)"
                                                   :class="{'c_on':isMedia,'c_off':isMedia}">
                                                <input type="checkbox" v-model="isMedia">是否中介合同
                                            </label>
                                            <div class="col-xs-12" style="margin-top: -18px;margin-bottom: 18px;padding-left : 0"
                                                 v-if="!contract_num_right">
                                                <span style="color: #E4393C;">
                                                    合同编号格式不正确
                                                </span>&nbsp;
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">收房月数<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" @click="changeisClick" v-model="contractRenew.months">
                                        </div>
                                    </div>

                                    <div class="row" @click="changeisClick">
                                        <label class="col-sm-3 control-label col-lg-2" >空置期开始日期<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'startVacRenew'" :placeholder="'点击选择时间'"
                                                        :currentDate="[contractRenew.vac_start_date]"  @sendDate="getVacStart"></DatePicker>
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >空置期结束日期</label>
                                        <div class="col-lg-4 col-sm-9" @click="changeisClick">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'endVacRenew'" :placeholder="'点击选择时间'"
                                                        :currentDate="[contractRenew.vac_end_date]"  @sendDate="getVacEnd"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >合同开始日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractRenew.start_date"
                                                   disabled placeholder="合同开始时间">
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >合同结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractRenew.end_date"
                                                   disabled placeholder="合同结束时间">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">空置期<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled v-model="contractRenew.vacancy">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >打房租日期<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-8">
                                            <select class="form-control" v-model="contractRenew.pay_date">
                                                <option value="">每期打房租日期</option>
                                                <option :value="value" v-for="value in 31">{{value}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-1">号</label>
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
                                    <FlexBox :flexData="Math.ceil(contractRenew.months/12)" :datas="contractRenew.price" :change="false"
                                             :title="'收房月单价'" @sendData="getFlexData"></FlexBox>
                                    <div class="row">
                                        <label class="col-sm-2 control-label">押金<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="contractRenew.cost_deposit">
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
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'completeR'" :currentDate="[contractRenew.complete_date]" :placeholder="'资料补齐时间'" @sendDate="getDate1"></DatePicker>
                                            <!--<input @click="selectDate" readonly placeholder="资料补齐时间"
                                                   v-model="contractRenew.complete_date" class="form-control form_date">-->
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                        <div class="col-md-10">
                                            <textarea class="form-control" placeholder="请输入备注信息"
                                                      rows="3" v-model="contractRenew.remarks">
                                            </textarea>
                                        </div>
                                    </div>
                                    <hr>
                                    <!--客户部分-->
                                    <h4>客户信息</h4>
                                    <div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label">客户汇款方式</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractRenew.payment" @change="changeCustomerPayment">
                                                    <option value="">请选择</option>
                                                    <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractRenew.payment==1||contractRenew.payment==4">
                                            <label class="col-sm-2 control-label">客户收款人姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.account_owner">
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractRenew.payment==1||contractRenew.payment==4">
                                            <label class="col-sm-2 control-label">开户行</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractRenew.bank">
                                                    <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractRenew.payment==1||contractRenew.payment==4">
                                            <label class="col-sm-2 control-label">支行</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.account_subbank">
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractRenew.payment==2">
                                            <label class="col-sm-2 control-label">支付宝姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.account_owner">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label v-show="contractRenew.payment==1" class="col-sm-2 control-label">账号</label>
                                            <label v-show="contractRenew.payment==2" class="col-sm-2 control-label">支付宝账号</label>
                                            <label v-show="contractRenew.payment==3" class="col-sm-2 control-label">微信账号</label>
                                            <label v-show="contractRenew.payment==4" class="col-sm-2 control-label">存折账号</label>
                                            <div class="col-sm-10" v-show="contractRenew.payment !=='' && contractRenew.payment !==undefined">
                                                <input type="text" class="form-control" v-model="contractRenew.account">
                                            </div>
                                        </div>
                                    </div>
                                    <!--中介部分-->
                                    <hr>
                                    <h4>中介信息</h4>
                                    <div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label">中介费</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.cost_medi" >
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="col-sm-2 control-label">中介汇款方式</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractRenew.medi_account_type" @change="changeMediPayment">
                                                    <option value="">请选择</option>
                                                    <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row" v-show="contractRenew.medi_account_type==1||contractRenew.medi_account_type==4">
                                            <label class="col-sm-2 control-label">中介收款人姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.medi_account_owner">
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractRenew.medi_account_type==1||contractRenew.medi_account_type==4">
                                            <label class="col-sm-2 control-label">开户行</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractRenew.medi_account_bank">
                                                    <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row" v-show="contractRenew.medi_account_type==1||contractRenew.medi_account_type==4">
                                            <label class="col-sm-2 control-label">支行</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.medi_account_subbank">
                                            </div>
                                        </div>
                                        <div class="row"v-show="contractRenew.medi_account_type==2">
                                            <label class="col-sm-2 control-label">支付宝姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractRenew.medi_account_owner">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label v-show="contractRenew.medi_account_type==1" class="col-sm-2 control-label">账号</label>
                                            <label v-show="contractRenew.medi_account_type==2" class="col-sm-2 control-label">支付宝账号</label>
                                            <label v-show="contractRenew.medi_account_type==3" class="col-sm-2 control-label">微信账号</label>
                                            <label v-show="contractRenew.medi_account_type==4" class="col-sm-2 control-label">存折账号</label>
                                            <div class="col-sm-10"
                                                 v-show="contractRenew.medi_account_type !=='' && contractRenew.medi_account_type !==undefined">
                                                <input type="text" class="form-control" v-model="contractRenew.medi_account_num " >
                                            </div>
                                        </div>
                                    </div>


                                    <hr>
                                    <h4>合同附件</h4>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">银行卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="bankPicId" @delete="picDelete" @complete="complete"
                                                     :result="'bank_pic'" :idPhotos="bank_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">合同照片<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <up-load @photo="contractPicId" @delete="picDelete" @complete="complete"
                                                     :result="'contract_pic'" :idPhotos="contract_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">水表照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="waterPicId" @delete="picDelete" @complete="complete"
                                                     :result="'water_pic'" :idPhotos="water_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">电表照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="elePicId" @delete="picDelete" @complete="complete"
                                                     :result="'ele_pic'" :idPhotos="ele_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">燃气表照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="gasPicId" @delete="picDelete" @complete="complete"
                                                     :result="'gas_pic'" :idPhotos="gas_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">交接单照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="handoverPicId" @delete="picDelete" @complete="complete"
                                                     :result="'handover_pic'" :idPhotos="handover_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">委托书照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="proxyPicId" @delete="picDelete" @complete="complete"
                                                     :result="'proxy_pic'" :idPhotos="proxy_pic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">押金收条</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="receiptPicId" @delete="picDelete" @complete="complete"
                                                     :result="'receipt_pic'" :idPhotos="receipt_pic"></up-load>
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

        <Staff :configure='configure' @Staff="dpmSeleted"></Staff>
    </div>
</template>
<script>
    import SelectClient from '../common/selectClient.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    import FlexBox from '../common/flexBox.vue'
    import SelectHouse from  '../common/selectHouse.vue'
    import DatePicker from '../common/datePicker.vue'

    import Staff from '../common/oraganization.vue'
    export default{
        props:['contractEitId','dictionary','contractRenewList','startRenew'],
        components:{
            SelectClient,
            upLoad,
            Status,
            SelectHouse,
            FlexBox,
            Staff,
            DatePicker
        },
        data(){
            return {
                collectRent : '',
                complete_ok:'ok',
                bank_pic : {
                    cus_idPhotos : {},    //银行卡照片id
                    cus_idPhoto : [],     //银行卡照片
                },
                contract_pic : {
                    cus_idPhotos : {},    //合同图片ID
                    cus_idPhoto : [],     //合同照片
                },
                water_pic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                ele_pic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                gas_pic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                proxy_pic : {
                    cus_idPhotos : {},    //委托书图片ID
                    cus_idPhoto : [],     //围殴托书照片

                },
                handover_pic : {
                    cus_idPhotos : {},    //交接单图片ID
                    cus_idPhoto : [],     //交接单照片
                },
                receipt_pic : {
                    cus_idPhotos : {},    //押金收条ID
                    cus_idPhoto : [],     //押金收条照片
                },
                customer_name:'',
                relative_customer : [],
                contractRenew : {

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
                    staff_id : '',
                    intermediary : 1,
                },
                staff_name:'',
                dateConfigureVac: [{range:false,needHour:false, }],
                dateConfigureComplete: [{range:false,needHour:false, }],
                dateType:'',
                myDictionary:[],
                myContractEitId:'',
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
                myIsEditCollect : false,

                pay_typeChange : false,
                one_type : '',
                more_type : [],
                showCustomer : false,
                house_name : '',
                configure : '',
                oldContract_num : '',
                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                    }
                ],
                contract_num_right:true,
                isMedia:false,
            }
        },
        watch : {
            dictionary(val){
                this.myDictionary = val;
            },
            contractEitId(val){
                this.myContractEitId = val;
            },
            startRenew(val){
                if(val){
                   this.getContractRenewList();
                }
            },
            'contractRenew.vac_start_date' : {
                deep:true,
                handler(val,oldVal){
                    if( this.isClick && val!==''){
                        this.completeDate(val,oldVal,'start');
                    }
                }
            },
            'contractRenew.months' : {
                deep:true,
                handler(val,oldVal){
                    if(this.isClick && val!==''){
                        this.completeDate(val,oldVal,'months');
                    }
                }
            },
            'contractRenew.vac_end_date' : {
                deep:true,
                handler(val,oldVal){
                    if(this.isClick && val!==''){
                        this.completeDate(val,oldVal,'end');
                    }
                }
            },
            one_type(curVal,oldVal){
                if (curVal != oldVal){
                    if (!this.pay_typeChange){
                        this.contractRenew.pay_type = [];
                        this.contractRenew.pay_type.push(curVal);
                    }
                }
            },
            pay_typeChange(curVal,oldVal){
                this.contractRenew.pay_type = [];
                if (curVal){
                    this.contractRenew.pay_type = this.more_type;
                } else {
                    this.contractRenew.pay_type.push(this.one_type);
                }
            },
            isMedia(val){
                if(val){
                    this.contractRenew.intermediary = 2
                } else {
                    this.contractRenew.intermediary = 1
                }
            }
        },
        methods : {
            test(){
                if(!this.isMedia){
                    this.contractRenew.contract_num = this.contractRenew.contract_num.toUpperCase();
                    let reg = /^LJSF0[1-7][0-9]{7}$/i;
                    if(this.contractRenew.contract_num!==''){
                        this.contract_num_right = reg.test(this.contractRenew.contract_num);
                    }else {
                        this.contract_num_right = true;
                    }
                }

            },
            getContractRenewList(){
                this.bank_pic.cus_idPhotos = [];
                this.contractRenew.bank_pic = [];
                this.contract_pic.cus_idPhotos = [];
                this.contractRenew.contract_pic = [];
                this.proxy_pic.cus_idPhotos = [];
                this.contractRenew.proxy_pic = [];
                this.handover_pic.cus_idPhotos = [];
                this.contractRenew.handover_pic = [];
                this.receipt_pic.cus_idPhotos = [];
                this.contractRenew.receipt_pic = [];
                this.water_pic.cus_idPhotos = [];
                this.contractRenew.water_card_pic = [];
                this.ele_pic.cus_idPhotos = [];
                this.contractRenew.elec_card_pic = [];
                this.gas_pic.cus_idPhotos = [];
                this.contractRenew.gas_card_pic = [];


                this.oldContract_num = this.contractRenewList.contract_num;
                this.contractRenew.villa_id = this.contractRenewList.villa_id.id;
                this.contractRenew.customer_id = this.contractRenewList.customer_id.id;
                this.house_name = this.contractRenewList.villa_id.detailed_address;
                this.customer_name = this.contractRenewList.customer_id.name;

                if(this.contractRenewList.relative_customer !== undefined && this.contractRenewList.relative_customer !== null){
                    this.more = this.contractRenewList.relative_customer.length;
                    for(let i=0;i<this.contractRenewList.relative_customer.length;i++){
                        this.relative_customer.push(this.contractRenewList.relative_customer[i].name);
                        this.contractRenew.relative_customer_id.push(this.contractRenewList.relative_customer[i].id);
                    }
                }
            },
            selectDpm(){ //选择部门
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {type:'staff',length: 1};
            },
            dpmSeleted(val){
                this.staff_name = val.staff[0].name;
                this.contractRenew.staff_id = val.staff[0].id;
            },
            selectClient(val){         //选择业主姓名
                this.flag = val;
                this.collectRent = 1;
                $('.selectClient:eq(1)').modal('show');
            },
            receiveClient(val){     //接收业主id
                this.collectRent = '';
                if(this.more > this.relative_customer.length && this.contractRenew.relative_customer_id.indexOf(val.id) == -1){
                    this.contractRenew.relative_customer_id .push(val.id);
                    this.relative_customer.push(val.name);
                }else if(this.more === this.relative_customer.length){
                    this.contractRenew.relative_customer_id.splice(this.flag,1);
                    this.relative_customer.splice(this.flag,1,val.name);
                }

            },
            completeDate(val,oldVal,flag){  //计算空置期结束 合同开始以及结束时间
                if(flag === 'start' && val > this.contractRenew.vac_end_date && this.contractRenew.vac_end_date !== ''){
                    this.contractRenew.vac_start_date = oldVal;
                    this.info.error = '开始日期必须小于结束日期';
                    this.info.state_error = true;
                }else if(flag === 'end' && val < this.contractRenew.vac_start_date && this.contractRenew.vac_start_date !== ''){
                    this.contractRenew.vac_end_date = oldVal;
                    this.info.error = '结束日期必须大于开始日期';
                    this.info.state_error = true;
                }
                this.$http.post('core/collect/date',
                    {
                        vac_start_date : this.contractRenew.vac_start_date,
                        vac_end_date : this.contractRenew.vac_end_date,
                        months : this.contractRenew.months,
                    }).then(
                    (res) => {
                        if(res.data.code === '70010'){
                            this.contractRenew.start_date = res.data.data.start_date;
                            this.contractRenew.end_date = res.data.data.end_date;
                            this.contractRenew.vacancy = res.data.data.vacancy;
                        }else {
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    }
                )

            },

            changeisClick(){
                this.isClick = true;
            },
            //获取图片id
            bankPicId(val){         //获取成功上传银行卡 id 数组
                this.contractRenew.bank_pic = val;
            },
            contractPicId(val){     //获取成功上传合同 id 数组
                this.contractRenew.contract_pic = val;
            },
            waterPicId(val){        //获取成功上传水卡 id 数组
                this.contractRenew.water_card_pic = val;
            },
            elePicId(val){          //获取成功上传电卡 id 数组
                this.contractRenew.elec_card_pic = val;
            },
            gasPicId(val){          //获取成功上传燃气卡 id 数组
                this.contractRenew.gas_card_pic = val;
            },
            proxyPicId(val){        //获取成功上传委托书卡 id 数组
                this.contractRenew.proxy_pic = val;
            },
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractRenew.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传押金收条 id 数组
                this.contractRenew.receipt_pic = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let bank = this.contractRenew.bank_pic.indexOf(val);
                if (bank > -1) {
                    this.contractRenew.bank_pic.splice(bank, 1);
                }
                let contract = this.contractRenew.contract_pic.indexOf(val);
                if (contract > -1) {
                    this.contractRenew.contract_pic.splice(contract, 1);
                }
                let water = this.contractRenew.water_card_pic.indexOf(val);
                if (water > -1) {
                    this.contractRenew.water_card_pic.splice(water, 1);
                }
                let ele = this.contractRenew.elec_card_pic.indexOf(val);
                if (ele > -1) {
                    this.contractRenew.elec_card_pic.splice(ele, 1);
                }
                let gas = this.contractRenew.gas_card_pic.indexOf(val);
                if (gas > -1) {
                    this.contractRenew.gas_card_pic.splice(gas, 1);
                }
                let proxy = this.contractRenew.proxy_pic.indexOf(val);
                if (proxy > -1) {
                    this.contractRenew.proxy_pic.splice(proxy, 1);
                }
                let handover = this.contractRenew.handover_pic.indexOf(val);
                if (handover > -1) {
                    this.contractRenew.handover_pic.splice(handover, 1);
                }
                let receipt = this.contractRenew.receipt_pic.indexOf(val);
                if (receipt > -1) {
                    this.contractRenew.receipt_pic.splice(receipt, 1);
                }
            },
            addContract(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    if(this.contract_num_right){
                        this.$http.get('api/picture/poll').then((res) => {
                            this.$http.post('core/collect/saveContract/previous_contract_id/' +
                                this.myContractEitId +'/type/' +2,this.contractRenew).then((res) => {
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

                            });
                        });
                    }else {
                        this.info.error = '合同编号格式不正确';
                        this.info.state_error = true;
                    }

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
                        this.contractRenew.relative_customer_id.length--;
                    }
                    this.more--;
                }

            },
            closeModal(){
                this.$emit('Close');
                $('#contractRenew').modal('hide');
                this.contractRenew.contract_num = '' ;       //合同编号
                this.contractRenew.vac_start_date = '';      //空置期开始日期
                this.contractRenew.vac_end_date = '';        //空置期结束日期
                this.contractRenew.start_date = '';         //合同开始日期
                this.contractRenew.end_date = '';            //合同结束日期
                this.contractRenew.pay_date = '';            //打房租日期
                this.contractRenew.complete_date = '';       //资料补齐时间
                this.contractRenew.remarks = '';             //备注信息

                this.pay_typeChange = false;
                this.one_type = '';
                this.more_type = [];

                this.house_name = '';
                this.customer_name = '';

                this.contractRenew.type = '';
                this.contractRenew.staff_id = '';
                this.contractRenew.villa_id = '';
                this.contractRenew.customer_id = '';

                this.contractRenew.months = '';
                this.contractRenew.pay_type = [];
                this.contractRenew.price.splice(0,this.contractRenew.price.length);
                this.contractRenew.vacancy = '';
                this.contractRenew.cost_deposit = '';
                this.contractRenew.deal_time = '';
                this.contractRenew.remark = '';

                this.contractRenew.payment = 1;
                this.contractRenew.bank = 1;
                this.contractRenew.account = '';
                this.contractRenew.account_owner = '';
                this.contractRenew.account_subbank = '';

                this.contractRenew.cost_medi = 0;
                this.contractRenew.medi_account_type = '';
                this.contractRenew.medi_account_num = '';
                this.contractRenew.medi_account_owner = '';
                this.contractRenew.medi_account_bank = 1;
                this.contractRenew.medi_account_subbank = '';
                this.contractRenew.intermediary = 1;

                this.more  = 1;
                this.relative_customer = [];
                this.contractRenew.relative_customer_id = [];
                this.staff_name = '';

                this.bank_pic.cus_idPhoto = [];
                this.contractRenew.bank_pic = [];
                this.contract_pic.cus_idPhoto = [];
                this.contractRenew.contract_pic = [];
                this.proxy_pic.cus_idPhoto = [];
                this.contractRenew.proxy_pic = [];
                this.handover_pic.cus_idPhoto = [];
                this.contractRenew.handover_pic = [];
                this.receipt_pic.cus_idPhoto = [];
                this.contractRenew.receipt_pic = [];
                this.water_pic.cus_idPhoto = [];
                this.contractRenew.water_card_pic = [];
                this.ele_pic.cus_idPhoto = [];
                this.contractRenew.elec_card_pic = [];
                this.gas_pic.cus_idPhoto = [];
                this.contractRenew.gas_card_pic = [];
            },

            changePayType(ev){
                this.contractRenew.pay_type = [];
                this.more_type = [];
                if (ev.target.checked) {
                    if (this.contractRenew.months !== '') {
                        this.pay_typeChange = true;
                        if (this.contractRenew.months % 12 === 0) {
                            let month = parseInt(this.contractRenew.months / 12);
                            for (let i = 0; i < month; i++) {
                                this.more_type.push('1');
                            }
                        } else {
                            let month = parseInt(this.contractRenew.months / 12 + 1);
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
                this.contractRenew.account_owner = '';
                this.contractRenew.account_subbank = '';
                this.contractRenew.alipay_owner = '';
                this.contractRenew.bank = 1;
                this.contractRenew.account = '';
            },
            // 修改中介收款方式
            changeMediPayment(){
                this.contractRenew.medi_account_owner = '';
                this.contractRenew.medi_account_subbank = '';
                this.contractRenew.medi_alipay_owner = '';
                this.contractRenew.medi_account_bank = 1;
                this.contractRenew.medi_account_num = '';
            },
            getFlexData(data){
                this.contractRenew.price = data;
            },
            getVacStart(val){
                this.contractRenew.vac_start_date = val;
            },
            getVacEnd(val){
                this.contractRenew.vac_end_date = val;
            },
            getDate1(val){
                this.contractRenew.complete_date = val;
            },
            isChecked(e){
                this.isMedia = !this.isMedia;
                if(this.isMedia){
                    this.contract_num_right = true;
                }else if(!this.isMedia){
                    this.test();
                }
            }
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
    #contractRenew{
        z-index: 1044;
    }
    .oldContract{
        border-bottom: 1px dashed #aaaaaa;
    }

    .has-js .label_check {
        margin-top: 8px;
    }
    .error {
        border-color: #E4393C;
    }
</style>