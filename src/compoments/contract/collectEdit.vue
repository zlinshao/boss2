<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractEdit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click = closeEdit>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑收房合同</h4>
                    </div>
                    <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <div v-if="simulate.indexOf('Collect/updateContract_surrender_order_pic_refund_form_pic')==-1||simulate.indexOf('Collect/updateContract')>-1||isSuper">
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
                                            <div class="col-sm-9 col-lg-10 has-js">
                                                <div class="col-sm-6" style="padding-left : 0">
                                                    <input type="text" class="form-control" @blur="test" :class="{'error': !contract_num_right}"
                                                           v-model="contractEdit.contract_num" placeholder="合同编号">
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
                                                <input type="text" class="form-control" @click="changeisClick" v-model="contractEdit.months">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="col-sm-3 control-label col-lg-2" >空置期开始日期<sup>*</sup></label>
                                            <div class="col-lg-4 col-sm-9" @click="changeisClick">
                                                <DatePicker :dateConfigure="dateConfigure" :idName="'startVac'" :placeholder="'点击选择时间'"
                                                            :currentDate="[contractEdit.vac_start_date]"  @sendDate="getVacStart"></DatePicker>
                                            </div>
                                            <label class="col-sm-3 control-label col-lg-2" >空置期结束日期</label>
                                            <div class="col-lg-4 col-sm-9" @click="changeisClick">
                                                <DatePicker :dateConfigure="dateConfigure" :idName="'endVac'" :placeholder="'点击选择时间'"
                                                            :currentDate="[contractEdit.vac_end_date]"  @sendDate="getVacEnd"></DatePicker>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-3 control-label col-lg-2" >合同开始日期</label>
                                            <div class="col-lg-4 col-sm-9">
                                                <input type="text" class="form-control" v-model="contractEdit.start_date"
                                                       disabled placeholder="合同开始时间">
                                            </div>
                                            <label class="col-sm-3 control-label col-lg-2" >合同结束日期</label>
                                            <div class="col-lg-4 col-sm-9">
                                                <input type="text" class="form-control" v-model="contractEdit.end_date"
                                                       disabled placeholder="合同结束时间">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label">空置期<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" disabled v-model="contractEdit.vacancy">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >打房租日期<sup>*</sup></label>
                                            <div class="col-lg-4 col-sm-8">
                                                <select class="form-control" v-model="contractEdit.pay_date">
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
                                        <FlexBox :flexData="Math.ceil(contractEdit.months/12)" :datas="contractEdit.price" :change="money_change"
                                                 :title="'收房月单价'" @sendData="getFlexData"></FlexBox>
                                        <div class="row">
                                            <label class="col-sm-2 control-label">押金<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractEdit.cost_deposit">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >开单人</label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" v-model="staff" disabled placeholder="开单人">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-3 control-label col-lg-2" >资料补齐时间<sup>*</sup></label>
                                            <div class="col-lg-4 col-sm-9">
                                                <!--<input @click="selectDate" readonly placeholder="资料补齐时间"
                                                       v-model="contractEdit.complete_date" class="form-control form_date">-->
                                                <DatePicker :dateConfigure="dateConfigure" :idName="'complete'" :currentDate="[contractEdit.complete_date]" :placeholder="'资料补齐时间'" @sendDate="getDate1"></DatePicker>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                            <div class="col-md-10">
                                            <textarea class="form-control" placeholder="请输入备注信息"
                                                      rows="3" v-model="contractEdit.remarks">
                                            </textarea>
                                            </div>
                                        </div>
                                        <hr>
                                        <!--客户部分-->
                                        <h4>客户信息</h4>
                                        <div>
                                            <div class="row">
                                                <label class="col-sm-2 control-label">汇款方式</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" v-model="contractEdit.payment" @change="changeCustomerPayment">
                                                        <option value="">请选择</option>
                                                        <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row" v-show="contractEdit.payment==1||contractEdit.payment==4">
                                                <label class="col-sm-2 control-label">收款人姓名</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="contractEdit.account_owner">
                                                </div>
                                            </div>
                                            <div class="row" v-show="contractEdit.payment==1||contractEdit.payment==4">
                                                <label class="col-sm-2 control-label">开户行</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" v-model="contractEdit.bank">
                                                        <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row" v-show="contractEdit.payment==1||contractEdit.payment==4">
                                                <label class="col-sm-2 control-label">支行</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="contractEdit.account_subbank">
                                                </div>
                                            </div>
                                            <div class="row" v-show="contractEdit.payment==2">
                                                <label class="col-sm-2 control-label">支付宝姓名</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="contractEdit.account_owner">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <label v-show="contractEdit.payment==1" class="col-sm-2 control-label">账号</label>
                                                <label v-show="contractEdit.payment==2" class="col-sm-2 control-label">支付宝账号</label>
                                                <label v-show="contractEdit.payment==3" class="col-sm-2 control-label">微信账号</label>
                                                <label v-show="contractEdit.payment==4" class="col-sm-2 control-label">存折账号</label>
                                                <div class="col-sm-10" v-show="contractEdit.payment !=='' && contractEdit.payment !==undefined">
                                                    <input type="text" class="form-control" v-model="contractEdit.account">
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
                                                    <input type="text" class="form-control" v-model="contractEdit.cost_medi" >
                                                </div>
                                            </div>

                                            <div class="row">
                                                <label class="col-sm-2 control-label">中介汇款方式</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" v-model="contractEdit.medi_account_type" @change="changeMediPayment">
                                                        <option value="">请选择</option>
                                                        <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row" v-show="contractEdit.medi_account_type==1||contractEdit.medi_account_type==4">
                                                <label class="col-sm-2 control-label">中介收款人姓名</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="contractEdit.medi_account_owner">
                                                </div>
                                            </div>
                                            <div class="row" v-show="contractEdit.medi_account_type==1||contractEdit.medi_account_type==4">
                                                <label class="col-sm-2 control-label">开户行</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" v-model="contractEdit.medi_account_bank">
                                                        <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row" v-show="contractEdit.medi_account_type==1||contractEdit.medi_account_type==4">
                                                <label class="col-sm-2 control-label">支行</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="contractEdit.medi_account_subbank">
                                                </div>
                                            </div>
                                            <div class="row"v-show="contractEdit.medi_account_type==2">
                                                <label class="col-sm-2 control-label">支付宝姓名</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="contractEdit.medi_account_owner">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <label v-show="contractEdit.medi_account_type==1" class="col-sm-2 control-label">账号</label>
                                                <label v-show="contractEdit.medi_account_type==2" class="col-sm-2 control-label">支付宝账号</label>
                                                <label v-show="contractEdit.medi_account_type==3" class="col-sm-2 control-label">微信账号</label>
                                                <label v-show="contractEdit.medi_account_type==4" class="col-sm-2 control-label">存折账号</label>
                                                <div class="col-sm-10"
                                                     v-show="contractEdit.medi_account_type !=='' && contractEdit.medi_account_type !==undefined">
                                                    <input type="text" class="form-control" v-model="contractEdit.medi_account_num " >
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <h4>合同附件</h4>
                                        <div class="row">
                                            <label class="col-lg-2 control-label">银行卡照片</label>
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
                                    </div>
                                    <div v-if="simulate.indexOf('Collect/updateContract_surrender_order_pic_refund_form_pic') > -1||isSuper">
                                        <div class="row">
                                            <label class="col-lg-2 control-label">退租交接单</label>
                                            <div class="col-lg-10">
                                                <up-load @photo="retreatHandoverPicId" @delete="picDelete" @complete="complete"
                                                         :result="'retreatHandoverPic'" :idPhotos="retreatHandoverPic"></up-load>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-lg-2 control-label">退组结算单</label>
                                            <div class="col-lg-10">
                                                <up-load @photo="retreatBalancePicId" @delete="picDelete" @complete="complete"
                                                         :result="'retreatBalancePic'" :idPhotos="retreatBalancePic"></up-load>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click = closeEdit>关闭</button>
                        <button type="button" class="btn btn-primary" @click="editContract">确认</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!--选择客户-->
        <SelectClient :collectRent="collectRent" @clientAdd="receiveClient"> </SelectClient>
        <Status :state='info'></Status>

        <SelectHouse @House="getHouse" :isNewAddHouse="isNewAddHouse"></SelectHouse>
    </div>
</template>
<script>
    import SelectClient from '../common/selectClient.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    import FlexBox from '../common/flexBox.vue'
    import SelectHouse from  '../common/selectHouse.vue'
    import DatePicker from '../common/datePicker.vue'
    export default{
        props:['contractEitId','dictionary','isEditCollect'],
        components:{
            SelectClient,
            upLoad,
            Status,
            SelectHouse,
            FlexBox,
            DatePicker
        },
        data(){
            return {
                isNewAddHouse : '',     //房屋是否可以新增
                simulate: [],
                isSuper: [],
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
                retreatHandoverPic : {
                    cus_idPhotos : {},    //退出交接单
                    cus_idPhoto : [],     //
                },
                retreatBalancePic : {
                    cus_idPhotos : {},    //退出结算单
                    cus_idPhoto : [],     //
                },
                customer_name:'',
                relative_customer : [],
                contractEdit : {
                    id:'',
                    relative_customer_id:[],//客户id
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
                    surrender_order_pic:[],     //退出交接单照片
                    refund_form_pic:[],         //退出结算单照片

                    villa_id :'',           //fangwuid
                    months : '',
                    pay_type : [],
                    price : [],
                    cost_deposit : '',
                    vacancy : '',
                    staff_id : '',
                    //                    客户
                    customer_id : '',
                    payment : 1,
                    account_owner : '',     // 收款人姓名
                    account_subbank : '',   // 支行
                    alipay_owner : '',      // 支付宝姓名
                    bank : 1,
                    account : '',           // 账户

                    cost_medi : 0,     // 中介费
//                    is_medi : 1,
                    medi_account_type : 1,
                    medi_account_owner : '',     // 收款人姓名
                    medi_account_bank : 1,   // 开户行
                    medi_account_subbank : '',   // 支行
                    medi_alipay_owner : '',      // 支付宝姓名
                    medi_account_num  :'',
                },
                staff:'',
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
                money_change : false,
                one_type : '',
                more_type : [],
                showCustomer : false,
                clientType : '',
                house_name : '',
                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                    }
                ],
                contract_num_right:true,
                isMedia : false,
            }
        },
        watch : {
            dictionary(val){
                this.myDictionary = val;
            },
            contractEitId(val){
                this.myContractEitId = val;
            },
            isEditCollect(val){
                this.myIsEditCollect = val;
                if(this.myIsEditCollect) this.gitContractInfo();
            },
            'contractEdit.vac_start_date' : {
                deep:true,
                handler(val,oldVal){
                    if( this.isClick && val!== ''){
                        this.completeDate(val,oldVal,'start');
                    }
                }
            },
            'contractEdit.months' : {
                deep:true,
                handler(val,oldVal){
                    if(this.isClick && val!== ''){
                        this.completeDate(val,oldVal,'months');
                    }
                }
            },
            'contractEdit.vac_end_date' : {
                deep:true,
                handler(val,oldVal){
                    if(this.isClick && val!== ''){
                        this.completeDate(val,oldVal,'end');
                    }
                }
            },
            one_type(curVal,oldVal){
                if (curVal != oldVal){
                    if (!this.pay_typeChange){
                        this.contractEdit.pay_type = [];
                        this.contractEdit.pay_type.push(curVal);
                    }
                }
            },
            pay_typeChange(curVal,oldVal){
                this.contractEdit.pay_type = [];
                if (curVal){
                    this.contractEdit.pay_type = this.more_type;
                } else {
                    this.contractEdit.pay_type.push(this.one_type);
                }
            },
        },
        mounted (){
            this.login_status()
        },
        methods : {


            test(){
//                if(!this.isMedia){
//                    this.contractEdit.contract_num = this.contractEdit.contract_num.toUpperCase();
//                    let reg = /^LJSF0[1|2|3][0-9]{7}$/i;
//                    let reg1 = /^LJS\d{1,7}$/i;
//                    if(this.contractEdit.contract_num!==''){
//                        if(reg.test(this.contractEdit.contract_num)||reg1.test(this.contractEdit.contract_num)){
//                            this.contract_num_right = true;
//                        }else {
//                            this.contract_num_right = false;
//                        }
//                    }else {
//                        this.contract_num_right = true;
//                    }
//                }
            },
            changeisClick(){
                this.isClick = true;
            },
            login_status (){
                this.$http.get('staff/info').then((res) => {
                    for (let i = 0; i < res.data.auth_all.length; i++) {
                        this.simulate.push(res.data.auth_all[i].name);
                    }
                    this.isSuper = res.data.super_auth.indexOf(res.data.id) > -1;
                });
            },
            gitContractInfo(){
                if(this.myContractEitId !== ''){
                    this.$http.get('core/collect/readcontract/id/' +this.myContractEitId).then((res)=>{
                        this.bankPic.cus_idPhotos = [];
                        this.bankPic.cus_idPhoto = [];
                        this.contractEdit.bank_pic = [];
                        this.contractPic.cus_idPhotos = [];
                        this.contractPic.cus_idPhoto = [];
                        this.contractEdit.contract_pic = [];
                        this.proxyPic.cus_idPhotos = [];
                        this.proxyPic.cus_idPhoto = [];
                        this.contractEdit.proxy_pic = [];
                        this.handoverPic.cus_idPhotos = [];
                        this.handoverPic.cus_idPhoto = [];
                        this.contractEdit.handover_pic = [];
                        this.receiptPic.cus_idPhotos = [];
                        this.receiptPic.cus_idPhoto = [];
                        this.contractEdit.receipt_pic = [];
                        this.waterPic.cus_idPhotos = [];
                        this.waterPic.cus_idPhoto = [];
                        this.contractEdit.water_card_pic = [];
                        this.elePic.cus_idPhotos = [];
                        this.elePic.cus_idPhoto = [];
                        this.contractEdit.elec_card_pic = [];
                        this.gasPic.cus_idPhotos = [];
                        this.gasPic.cus_idPhoto = [];
                        this.contractEdit.gas_card_pic = [];

                        this.contractEdit.surrender_order_pic = [];
                        this.retreatHandoverPic.cus_idPhotos = {};
                        this.retreatHandoverPic.cus_idPhoto = [];

                        this.contractEdit.refund_form_pic = [];
                        this.retreatBalancePic.cus_idPhotos = {};
                        this.retreatBalancePic.cus_idPhoto = [];

                        let contractList =res.data.data;
                        this.contractEdit.id = contractList.id;
                        if(contractList.relative_customer !== undefined && contractList.relative_customer !== null){
                                this.more = contractList.relative_customer.length;
                                for(let i=0;i<contractList.relative_customer.length;i++){
                                    this.relative_customer.push(contractList.relative_customer[i].name);
                                    this.contractEdit.relative_customer_id.push(contractList.relative_customer[i].id);
                                }
                        }
                        this.contractEdit.contract_num = contractList.contract_num;
                        this.contractEdit.vac_start_date = contractList.vac_start_date;
                        this.contractEdit.vac_end_date = contractList.vac_end_date;

                        this.contractEdit.start_date = contractList.start_date;
                        this.contractEdit.end_date = contractList.end_date;
                        this.contractEdit.complete_date = contractList.complete_date[0];

                        this.contractEdit.pay_date = contractList.pay_date;
                        this.contractEdit.remarks = contractList.remarks;
                        this.staff = contractList.staff;

                        if(!Array.isArray(contractList.ablum)){
                            this.bankPic.cus_idPhotos = contractList.album.bank_pic;                    //修改图片ID
                            console.log(this.bankPic.cus_idPhotos);
                            for (let i in this.bankPic.cus_idPhotos) {
                                this.bankPic.cus_idPhoto.push(i);
                                this.contractEdit.bank_pic.push(i);
                            }
                            this.contractPic.cus_idPhotos = contractList.album.contract_pic;                    //修改图片ID
                            for (let i in this.contractPic.cus_idPhotos) {
                                this.contractPic.cus_idPhoto.push(i);
                                this.contractEdit.contract_pic.push(i);
                            }
                            this.proxyPic.cus_idPhotos = contractList.album.proxy_pic;                    //修改图片ID
                            for (let i in this.proxyPic.cus_idPhotos) {
                                this.proxyPic.cus_idPhoto.push(i);
                                this.contractEdit.proxy_pic.push(i);
                            }
                            this.handoverPic.cus_idPhotos = contractList.album.handover_pic;                    //修改图片ID
                            for (let i in this.handoverPic.cus_idPhotos) {
                                this.handoverPic.cus_idPhoto.push(i);
                                this.contractEdit.handover_pic.push(i);
                            }
                            this.receiptPic.cus_idPhotos = contractList.album.receipt_pic;                    //修改图片ID
                            for (let i in this.receiptPic.cus_idPhotos) {
                                this.receiptPic.cus_idPhoto.push(i);
                                this.contractEdit.receipt_pic.push(i);
                            }
                            this.waterPic.cus_idPhotos = contractList.album.water_card_pic;                    //修改图片ID
                            for (let i in this.waterPic.cus_idPhotos) {
                                this.waterPic.cus_idPhoto.push(i);
                                this.contractEdit.water_card_pic.push(i);
                            }
                            this.elePic.cus_idPhotos = contractList.album.elec_card_pic;                    //修改图片ID
                            for (let i in this.elePic.cus_idPhotos) {
                                this.elePic.cus_idPhoto.push(i);
                                this.contractEdit.elec_card_pic.push(i);
                            }
                            this.gasPic.cus_idPhotos = contractList.album.gas_card_pic;                    //修改图片ID
                            for (let i in this.gasPic.cus_idPhotos) {
                                this.gasPic.cus_idPhoto.push(i);
                                this.contractEdit.gas_card_pic.push(i);
                            }
                            this.retreatHandoverPic.cus_idPhotos = contractList.album.surrender_order_pic;
                            for (let i in this.retreatHandoverPic.cus_idPhotos) {
                                this.retreatHandoverPic.cus_idPhoto.push(i);
                                this.contractEdit.surrender_order_pic.push(i);
                            }
                            this.retreatBalancePic.cus_idPhotos = contractList.album.refund_form_pic;
                            for (let i in this.retreatBalancePic.cus_idPhotos) {
                                this.retreatBalancePic.cus_idPhoto.push(i);
                                this.contractEdit.refund_form_pic.push(i);
                            }
                            this.contractEdit.staff_id = contractList.staff_id;


                            // 清空
                            this.pay_typeChange = false;
                            this.money_change = false;
                            this.one_type = '';
                            this.more_type = [];
                            if(contractList.customer_id !== undefined && contractList.customer_id !== null){
                                this.customer_name = contractList.customer_id.name;
                                this.contractEdit.customer_id = contractList.customer_id.id;
                            }
                            if(contractList.villa_id !== undefined && contractList.villa_id !== null){
                                this.house_name = contractList.villa_id.detailed_address;
                                this.contractEdit.villa_id = contractList.villa_id.id;

                            }
                            if(contractList.checkin_collect_id !== null && contractList.checkin_collect_id !==undefined){
                                this.checkCollectId = contractList.checkin_collect_id.id;

                                this.contractEdit.months = contractList.checkin_collect_id.months;
                                if(contractList.checkin_collect_id.pay_type !== null && contractList.checkin_collect_id.pay_type !==undefined){
                                    if(contractList.checkin_collect_id.pay_type.length<2){
                                        this.one_type = contractList.checkin_collect_id.pay_type[0];
                                    }else {
                                        this.more_type = contractList.checkin_collect_id.pay_type;
                                        this.pay_typeChange = true;
                                    }
                                }

                                this.contractEdit.price = contractList.checkin_collect_id.price;
                                if(contractList.checkin_collect_id.price.length>1){
                                    this.money_change = true;
                                }
                                this.contractEdit.vacancy = contractList.checkin_collect_id.vacancy;
                                this.contractEdit.cost_deposit = contractList.checkin_collect_id.cost_deposit;
                                this.contractEdit.deal_time = contractList.checkin_collect_id.deal_time;
                                this.contractEdit.remark = contractList.checkin_collect_id.remark;

                                this.contractEdit.payment = contractList.checkin_collect_id.payment;
                                this.contractEdit.bank = contractList.checkin_collect_id.bank;
                                this.contractEdit.account = contractList.checkin_collect_id.account;
                                this.contractEdit.account_owner = contractList.checkin_collect_id.account_owner;
                                this.contractEdit.account_subbank = contractList.checkin_collect_id.account_subbank;

                                this.contractEdit.cost_medi = contractList.checkin_collect_id.cost_medi;
                                this.contractEdit.medi_account_type = contractList.checkin_collect_id.medi_account_type;
                                this.contractEdit.medi_account_num = contractList.checkin_collect_id.medi_account_num;
                                this.contractEdit.medi_account_owner = contractList.checkin_collect_id.medi_account_owner;
                                this.contractEdit.medi_account_bank = contractList.checkin_collect_id.medi_account_bank;
                                this.contractEdit.medi_account_subbank = contractList.checkin_collect_id.medi_account_subbank;
                            }
                        }
                    })
                }

            },
            selectClient(val){         //选择业主姓名
                this.clientType = 'relative'
                this.flag = val;
                this.collectRent = 1;
                $('.selectClient:eq(0)').modal('show');
            },
            selectMainClient(){
                this.clientType = 'main'
                this.collectRent = 1;
                $('.selectClient:eq(0)').modal('show');
            },
            receiveClient(val){     //接收业主id
                this.collectRent = '';
                if(this.clientType === 'relative'){
                    if(this.more > this.relative_customer.length && this.contractEdit.relative_customer_id.indexOf(val.id) == -1){
                        this.contractEdit.relative_customer_id .push(val.id);
                        this.relative_customer.push(val.name);
                    }else if(this.more === this.relative_customer.length){
                        this.contractEdit.relative_customer_id.splice(this.flag,1);
                        this.relative_customer.splice(this.flag,1,val.name);
                    }
                }else {
                    this.contractEdit.customer_id = val.id;
                    this.customer_name = val.name;
                }

            },
            completeDate(val,oldVal,flag){  //计算空置期结束 合同开始以及结束时间
                if(flag === 'start' && val > this.contractEdit.vac_end_date && this.contractEdit.vac_end_date !== ''){
                    this.contractEdit.vac_start_date = oldVal;
                    this.info.error = '开始日期必须小于结束日期';
                    this.info.state_error = true;
                }else if(flag === 'end' && val < this.contractEdit.vac_start_date && this.contractEdit.vac_start_date !== ''){
                    this.contractEdit.vac_end_date = oldVal;
                    this.info.error = '结束日期必须大于开始日期';
                    this.info.state_error = true;
                }
                this.$http.post('core/collect/date',
                    {
                        vac_start_date : this.contractEdit.vac_start_date,
                        vac_end_date : this.contractEdit.vac_end_date,
                        months : this.contractEdit.months,
                    }).then(
                    (res) => {
                        if(res.data.code === '70010'){
                            this.contractEdit.start_date = res.data.data.start_date;
                            this.contractEdit.end_date = res.data.data.end_date;
                            this.contractEdit.vacancy = res.data.data.vacancy;
                        }else {
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    }
                )

            },
            //获取图片id
            bankPicId(val){         //获取成功上传银行卡 id 数组
                this.contractEdit.bank_pic = val;
            },
            contractPicId(val){     //获取成功上传合同 id 数组
                this.contractEdit.contract_pic = val;
            },
            waterPicId(val){        //获取成功上传水卡 id 数组
                this.contractEdit.water_card_pic = val;
            },
            elePicId(val){          //获取成功上传电卡 id 数组
                this.contractEdit.elec_card_pic = val;
            },
            gasPicId(val){          //获取成功上传燃气卡 id 数组
                this.contractEdit.gas_card_pic = val;
            },
            proxyPicId(val){        //获取成功上传委托书卡 id 数组
                this.contractEdit.proxy_pic = val;
            },
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractEdit.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传押金收条 id 数组
                this.contractEdit.receipt_pic = val;
            },
            retreatHandoverPicId (val){    //退租交接单
                this.contractEdit.surrender_order_pic = val;
            },
            retreatBalancePicId (val){     //退租结算单
                this.contractEdit.refund_form_pic = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                console.log( this.proxy)
                let bank = this.contractEdit.bank_pic.indexOf(val);
                if (bank > -1) {
                    this.contractEdit.bank_pic.splice(bank, 1);
                }
                let contract = this.contractEdit.contract_pic.indexOf(val);
                if (contract > -1) {
                    this.contractEdit.contract_pic.splice(contract, 1);
                }
                let water = this.contractEdit.water_card_pic.indexOf(val);
                if (water > -1) {
                    this.contractEdit.water_card_pic.splice(water, 1);
                }
                let ele = this.contractEdit.elec_card_pic.indexOf(val);
                if (ele > -1) {
                    this.contractEdit.elec_card_pic.splice(ele, 1);
                }
                let gas = this.contractEdit.gas_card_pic.indexOf(val);
                if (gas > -1) {
                    this.contractEdit.gas_card_pic.splice(gas, 1);
                }
                let proxy = this.contractEdit.proxy_pic.indexOf(val);
                if (proxy > -1) {
                    this.contractEdit.proxy_pic.splice(proxy, 1);
                }
                let handover = this.contractEdit.handover_pic.indexOf(val);
                if (handover > -1) {
                    this.contractEdit.handover_pic.splice(handover, 1);
                }
                let receipt = this.contractEdit.receipt_pic.indexOf(val);
                if (receipt > -1) {
                    this.contractEdit.receipt_pic.splice(receipt, 1);
                }
                let surrender_order = this.contractEdit.surrender_order_pic.indexOf(val);
                if (surrender_order > -1) {
                    this.contractEdit.surrender_order_pic.splice(surrender_order, 1);
                }
                let refund_form = this.contractEdit.refund_form_pic.indexOf(val);
                if (refund_form > -1) {
                    this.contractEdit.refund_form_pic.splice(refund_form, 1);
                }
            },
            editContract(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    if(this.contract_num_right){
                        this.$http.get('api/picture/poll').then((res) => {
                            this.$http.post('core/collect/updatecontract',this.contractEdit).then((res) => {
                                if(res.data.code === "70010"){
                                    this.$emit('EditStatus','success');
                                    this.closeEdit();
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
                if(this.more > 0){
                    if(this.more === this.relative_customer.length ){
                        this.relative_customer.length--;
                        this.contractEdit.relative_customer_id.length--;
                    }
                    this.more--;
                }

            },
            closeEdit(){
                this.$emit('EditStatus','error');
                this.more  = 1;
                this.relative_customer = [];
                this.contractEdit.relative_customer_id = [];
                $('#contractEdit').modal('hide');
            },

 //            付款方式不固定
            changePayType(ev){
                this.pay_type = [];
                this.more_type = [];
                if (ev.target.checked) {
                    if (this.contractEdit.months !== '') {
                        this.pay_typeChange = true;
                        if (this.contractEdit.months % 12 === 0) {
                            let month = parseInt(this.contractEdit.months / 12);
                            for (let i = 0; i < month; i++) {
                                this.more_type.push('1');
                            }
                        } else {
                            let month = parseInt(this.contractEdit.months / 12 + 1);
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
                this.contractEdit.account_owner = '';
                this.contractEdit.account_subbank = '';
                this.contractEdit.alipay_owner = '';
                this.contractEdit.bank = 1;
                this.contractEdit.account = '';
            },
            // 修改中介收款方式
            changeMediPayment(){
                this.contractEdit.medi_account_owner = '';
                this.contractEdit.medi_account_subbank = '';
                this.contractEdit.medi_alipay_owner = '';
                this.contractEdit.medi_account_bank = 1;
                this.contractEdit.medi_account_num = '';
            },
            getFlexData(data){
                console.log(data)
                this.contractEdit.price = data;
            },
            selectHouse(){
                this.isNewAddHouse = 1;
                $('.selectHouse:eq(0)').modal('show');
            },
            getHouse(data){
                this.isNewAddHouse = '';
                this.contractEdit.villa_id = data.id;
                this.house_name = data.address;
            },
            getVacStart(val){
                this.contractEdit.vac_start_date = val;
            },
            getVacEnd(val){
                this.contractEdit.vac_end_date = val;
            },
            getDate1(val){
                this.contractEdit.complete_date = val;
            },
            isChecked(e){
                this.isMedia = !this.isMedia;
                if(this.isMedia){
                    this.contract_num_right = true;
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
    #contractEdit{
        z-index: 1044;
    }
    .has-js .label_check {
        margin-top: 8px;
    }
    .error {
        border-color: #E4393C;
    }
</style>