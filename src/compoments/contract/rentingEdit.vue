<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="rentingEdit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click="closeEdit">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑租房合同</h4>
                    </div>
                    <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3 style="margin-top: -15px">基本信息</h3>
                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">客户姓名<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control"
                                                   @click="selectMainClient" readonly v-model="customer_name">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[0]"
                                                   readonly placeholder="租客姓名" @click="selectClient(0)">
                                        </div>
                                        <div class="col-sm-2 flexbox">
                                            <i class="fa fa-plus-circle" @click="addMore"></i>
                                            <i class="fa fa-minus-circle" @click="reduceMore"></i>
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=2">
                                        <label class="col-sm-3 control-label col-lg-2" >附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[1]"
                                                   readonly placeholder="租客姓名" @click="selectClient(1)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=3">
                                        <label class="col-sm-3 control-label col-lg-2" >附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[2]"
                                                   readonly placeholder="租客姓名" @click="selectClient(2)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=4">
                                        <label class="col-sm-3 control-label col-lg-2" >附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[3]"
                                                   readonly placeholder="租客姓名" @click="selectClient(3)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=5">
                                        <label class="col-sm-3 control-label col-lg-2" >附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[4]"
                                                   readonly placeholder="租客姓名" @click="selectClient(4)">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">房屋地址<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control"
                                                   @click="selectHouse" readonly v-model="house_name">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >合同编号<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control" v-model="contractEdit.contract_num" placeholder="合同编号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >合同开始日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input readonly class="form-control formDatetime" v-model="contractEdit.start_date"
                                                   @click="selectDate"  placeholder="合同开始时间">
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >合同结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input readonly class="form-control formDatetime" v-model="contractEdit.end_date"
                                                   @click="selectDate"  placeholder="合同结束时间">
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">租房类型<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <select class="form-control" v-model="contractEdit.is_shared"
                                                    @change="changeIsSgared">
                                                <option :value="value" v-for="(key,value) in myDictionary.shared_house">{{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row" v-show="contractEdit.is_shared==1">
                                        <label class="col-sm-3 col-lg-2 control-label">房间类型<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <select class="form-control" v-model="contractEdit.shared_part">
                                                <option :value="value" v-for="(key,value) in myDictionary.shared_part">{{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">租房状态<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <select class="form-control" v-model="contractEdit.rent_type">
                                                <option :value="value" v-for="(key,value) in myDictionary.rent_type">{{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">租房月数<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control" v-model="contractEdit.months">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款类型<sup>*</sup></label>
                                        <div class="col-sm-7" style="padding-right: 0">
                                            <div class="col-sm-6 padding_0">
                                                <label class="col-sm-2 control-label padding_0">押</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" v-model="contractEdit.bet">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 padding_0">
                                                <label class="col-sm-2 control-label padding_0">付</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="one_type"
                                                           :disabled="change_payType">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 padding_0">
                                            <label class="control-label">
                                                <input type="checkbox" disabled :checked="change_payType"
                                                       @click="changePayType($event)">付款方式变化
                                            </label>
                                        </div>
                                    </div>

                                    <!--付款方式变化-->
                                    <div class="form-group" v-for="(item,index) in more_type">
                                        <label class="col-sm-2 control-label">第{{index + 1}}年<sup
                                               >*</sup></label>
                                        <div class="col-sm-7" style="padding-right: 0">
                                            <div class="col-sm-6 padding_0">
                                                <label class="col-sm-2 control-label padding_0">押</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" readonly :value="contractEdit.bet">
                                                </div>
                                            </div>
                                            <div class="col-sm-6 padding_0">
                                                <label class="col-sm-2 control-label padding_0">付</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" v-model="more_type[index]">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <FlexBox :flexData="Math.ceil(contractEdit.months/12)" :datas="contractEdit.price"
                                             :change="money_change" :title="'出租月单价'" @sendData="getFlexData"></FlexBox>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">已收类型<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="contractEdit.received_type">
                                                    <option :value="value" v-for="(key,value) in myDictionary.subject">{{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-8">
                                                <label class="col-sm-3 control-label">已收金额<sup>*</sup></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" v-model="contractEdit.received_amount">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款方式<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[0].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[0].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2 icon">
                                                <i @click="addMorePayWay" class="fa fa-plus-circle"></i>
                                                <i @click="minusMorePayWay" class="fa fa-minus-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-show="more_pay_way>=2" class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[1].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[1].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2"></div>
                                        </div>
                                    </div>
                                    <div v-show="more_pay_way>=3" class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[2].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[2].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2"></div>
                                        </div>
                                    </div>
                                    <div v-show="more_pay_way>=4" class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[3].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[3].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2"></div>
                                        </div>
                                    </div>
                                    <div v-show="more_pay_way>=5" class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[4].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[4].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2"></div>
                                        </div>
                                    </div>
                                    <div v-show="more_pay_way>=6" class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[5].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[5].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2"></div>
                                        </div>
                                    </div>
                                    <div v-show="more_pay_way>=7" class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[6].payment_id">
                                                    <option :value="value" v-for="(key,value) in myDictionary.rent_payment">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-6">
                                                <label class="col-sm-4 control-label">金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" v-model="payments[6].money">
                                                </div>
                                            </div>
                                            <div class="col-sm-2"></div>
                                        </div>
                                    </div>

                                    <!--中介信息-->
                                    <div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">中介费<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractEdit.cost_medi">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">中介汇款方式</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractEdit.medi_account_type"
                                                        @change="changeMediPayment">
                                                    <option :value="value" v-for="(key,value) in myDictionary.money_type">{{key}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group"
                                             v-show="contractEdit.medi_account_type==1||contractEdit.medi_account_type==4">
                                            <label class="col-sm-2 control-label">中介收款人姓名<sup
                                                   >*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractEdit.medi_account_owner">
                                            </div>
                                        </div>
                                        <div class="form-group"
                                             v-show="contractEdit.medi_account_type==1||contractEdit.medi_account_type==4">
                                            <label class="col-sm-2 control-label">开户行<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractEdit.medi_account_bank">
                                                    <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group"
                                             v-show="contractEdit.medi_account_type==1||contractEdit.medi_account_type==4">
                                            <label class="col-sm-2 control-label">支行</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractEdit.medi_account_subbank">
                                            </div>
                                        </div>
                                        <div class="form-group" v-show="contractEdit.medi_account_type==2">
                                            <label class="col-sm-2 control-label">支付宝姓名<sup>*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractEdit.medi_account_owner">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label v-show="contractEdit.medi_account_type==1"
                                                   class="col-sm-2 control-label">账号<sup>*</sup></label>
                                            <label v-show="contractEdit.medi_account_type==2" class="col-sm-2 control-label">支付宝账号<sup
                                                   >*</sup></label>
                                            <label v-show="contractEdit.medi_account_type==3" class="col-sm-2 control-label">微信账号<sup
                                                   >*</sup></label>
                                            <label v-show="contractEdit.medi_account_type==4" class="col-sm-2 control-label">存折账号<sup
                                                   >*</sup></label>
                                            <div class="col-sm-10"
                                                 v-show="contractEdit.medi_account_type !=='' && contractEdit.medi_account_type !==undefined">
                                                <input type="text" class="form-control" v-model="contractEdit.medi_account_num ">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">管理费</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="contractEdit.manage_fee">
                                        </div>
                                        <div class="col-sm-2 padding_0 line_height34">
                                            元/月
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">物业费</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="contractEdit.property_fee">
                                        </div>
                                        <div class="col-sm-2 padding_0 line_height34">
                                            元/月
                                        </div>
                                    </div>

                                    <!--合租费用-->
                                    <div v-show="contractEdit.is_shared==1">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">电费</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="contractEdit.elec_fee">
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                度
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">网络费</label>
                                            <div class="col-sm-8">
                                                <select class="form-control" v-model="contractEdit.net_fee">
                                                    <option value="50">50</option>
                                                    <option value="70">70</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                元/月
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">水费</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="contractEdit.water_fee">
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                人
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">燃气费</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="contractEdit.gas_fee">
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                度
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >资料补齐时间<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input @click="selectDate" readonly placeholder="资料补齐时间"
                                                   v-model="contractEdit.complete_date" class="form-control formDatetime">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >开单人</label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control" v-model="staff" disabled placeholder="开单人">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >备注</label>
                                        <div class="col-md-9 col-lg-10">
                                            <textarea class="form-control" placeholder="请输入备注信息"
                                                    rows="3"  v-model="contractEdit.remarks">
                                            </textarea>
                                        </div>
                                    </div>
                                    <hr>
                                    <h3>合同附件</h3>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">合同照片<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <up-load @photo="contractPicId" @delete="picDelete" @complete="complete"
                                                     :result="'contractPic'" :idPhotos="contractPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">凭证截图</label>
                                        <div class="col-sm-10">
                                            <up-load @photo="certificatePicId" @delete="picDelete" @complete="complete"
                                                     :result="'paymentPic'" :idPhotos="paymentPic"></up-load>
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
                                        <label class="col-lg-2 control-label">押金收条</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="receiptPicId" @delete="picDelete" @complete="complete"
                                                     :result="'receiptPic'" :idPhotos="receiptPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">交接单</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="handoverPicId" @delete="picDelete" @complete="complete"
                                                     :result="'handoverPic'" :idPhotos="handoverPic"></up-load>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeEdit">关闭</button>
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
    import FlexBox from '../common/flexBox.vue'
    import SelectClient from '../common/selectClient.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    import SelectHouse from  '../common/selectHouse.vue'
    export default{
        props:['contractEitId','dictionary','isEditRent'],
        components:{
            SelectClient,
            upLoad,
            Status,
            SelectHouse,
            FlexBox
        },
        data(){
            return {
                isNewAddHouse : '',
                collectRent : '',
                complete_ok:'ok',
                paymentPic : {
                    cus_idPhotos : {},    //合同图片ID
                    cus_idPhoto : [],     //合同照片
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
                receiptPic : {
                    cus_idPhotos : {},    //交接单图片ID
                    cus_idPhoto : [],     //交接单照片
                },
                handoverPic : {
                    cus_idPhotos : {},    //j交接单
                    cus_idPhoto : [],     //押金收条照片
                },
                relative_customer : [],
                contractEdit : {
                    id:'',
                    relative_customer_id:[],//客户id
                    contract_num:'',        //合同编号
                    start_date:'',          //合同开始日期
                    end_date:'',            //合同结束日期
                    complete_date:'',       //资料补齐时间
                    remarks:'',             //备注信息
                    contract_pic:[],        //合同照片
                    water_card_pic:[],      //水卡照片
                    elec_card_pic:[],       //电卡照片
                    gas_card_pic:[],        //燃气卡卡照片
                    receipt_pic:[],         //押金收条
                    handover_pic:[],        //交接单照片

                    payment_pic :[],        //转账凭证

                    villa_id: '',
                    customer_id: '',

                    is_shared: 1,
                    shared_part: 1,
                    rent_type: 1,
                    months: '',
                    pay: [],
                    bet: 0,
                    price: [],
                    staff_id :'',
//                    中介
                    cost_medi: '',
                    medi_account_type: 1,
                    medi_account_owner: '',     // 收款人姓名
                    medi_account_bank: 1,   // 开户行
                    medi_account_subbank: '',   // 支行
                    medi_alipay_owner: '',      // 支付宝姓名
                    medi_account_num: '',

                    // 合租费用
                    elec_fee: '',      // 电费
                    manage_fee: '',    // 管理费
                    property_fee: '',  // 物业费
                    net_fee: 50,       // 网络费
                    water_fee: '',     // 水费
                    gas_fee: '',       // 燃气费

                    received_amount: '',
                    cost_deposit: '',
                    payments: [
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        },
                        {
                            payment_id: 1,
                            money: ''
                        }
                    ],
                    deal_time: '',
                    received_type: 1,

                },
                staff:'',
                dateConfigureVac: [{range:false,needHour:false, }],
                dateConfigureComplete: [{range:false,needHour:false, }],
                dateType:'',
                myDictionary:[],
                myContractEitId:'',
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
                myIsEditRent : false,

                house_name: '',
                customer_name: '',
                rentClientType : '',

                one_type: '',
                more_type: [],
                change_payType: false,
                money_change : false,

                payments: [
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    },
                    {
                        payment_id: 1,
                        money: ''
                    }
                ],
                more_pay_way: 1,       // 付款方式
            }
        },
        mounted(){

        },
        updated(){
            this.selectDate ();
        },
        watch : {
            dictionary(val){
                this.myDictionary = val;
            },
            contractEitId(val){
                this.myContractEitId = val;
            },
            isEditRent(val){
                this.myIsEditRent = val;
                if(this.myIsEditRent) this.gitContractInfo();
            }
        },
        methods : {
            gitContractInfo(){
                if(this.myContractEitId !== ''){
                    this.$http.get('core/rent/readcontract/id/' +this.myContractEitId).then((res)=>{
                        this.relative_customer = [];
                        this.contractEdit.relative_customer_id = [];
                        this.contractPic.cus_idPhoto = [];
                        this.contractEdit.contract_pic =[];
                        this.handoverPic.cus_idPhoto = [];
                        this.contractEdit.handover_pic =[];
                        this.receiptPic.cus_idPhoto = [];
                        this.contractEdit.receipt_pic = [];
                        this.waterPic.cus_idPhoto = [];
                        this.contractEdit.water_card_pic = [];
                        this.elePic.cus_idPhoto = [];
                        this.contractEdit.elec_card_pic = [];
                        this.gasPic.cus_idPhoto = [];
                        this.contractEdit.gas_card_pic = [];
                        this.paymentPic.cus_idPhoto = [];
                        this.contractEdit.payment_pic = [];

                        let contractList =res.data.data;
                        this.contractEdit.id = contractList.id; //合同id
                        if(contractList.relative_customer !== undefined && contractList.relative_customer !== null){
                                this.more = contractList.relative_customer.length;
                                for(let i=0;i<contractList.relative_customer.length;i++){
                                    this.relative_customer.push(contractList.relative_customer[i].name);
                                    this.contractEdit.relative_customer_id.push(contractList.relative_customer[i].id);
                                }
                        }
                        this.contractEdit.contract_num = contractList.contract_num; //合同编号
                        this.contractEdit.start_date = contractList.start_date;     //合同开始时间
                        this.contractEdit.end_date = contractList.end_date;         //合同结束时间
                        this.contractEdit.complete_date = contractList.complete_date[0];    //

                        this.contractEdit.remarks = contractList.remarks;

                        if(!Array.isArray(contractList.ablum)){
                            this.contractPic.cus_idPhotos = contractList.album.contract_pic;                    //修改图片ID
                            for (let i in this.contractPic.cus_idPhotos) {
                                this.contractPic.cus_idPhoto.push(i);
                                this.contractEdit.contract_pic.push(i);
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

                            this.paymentPic.cus_idPhotos = contractList.album.payment_pic;
                            for (let i in this.paymentPic.cus_idPhotos) {
                                this.contractEdit.payment_pic.push(i);
                            }
                        }
                        this.staff = contractList.staff;


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
                        if(contractList.checkin_rent_id !== null && contractList.checkin_rent_id !==undefined){
                            this.contractEdit.staff_id = contractList.checkin_rent_id.staff_id;

                            this.more_pay_way = contractList.checkin_rent_id.payment.length;
                            for (let i = 0; i < this.more_pay_way; i++) {
                                this.payments[i].payment_id = contractList.checkin_rent_id.payment[i].payment_id;
                                this.payments[i].money = contractList.checkin_rent_id.payment[i].money;
                            }

                            this.contractEdit.is_shared = contractList.checkin_rent_id.is_shared;
                            this.contractEdit.shared_part = contractList.checkin_rent_id.shared_part;

                            this.money_change = contractList.checkin_rent_id.price.length>1;

                            this.contractEdit.months = contractList.checkin_rent_id.months;
                            this.contractEdit.pay = contractList.checkin_rent_id.pay;
                            this.contractEdit.bet = contractList.checkin_rent_id.bet;
                            this.contractEdit.price = contractList.checkin_rent_id.price;
                            this.contractEdit.cost_medi = contractList.checkin_rent_id.cost_medi;
                            this.contractEdit.medi_account_type = contractList.checkin_rent_id.medi_account_type;
                            this.contractEdit.medi_account_owner = contractList.checkin_rent_id.medi_account_owner;
                            this.contractEdit.medi_account_bank = contractList.checkin_rent_id.medi_account_bank;
                            this.contractEdit.medi_account_subbank = contractList.checkin_rent_id.medi_account_subbank;
                            this.contractEdit.medi_account_num = contractList.checkin_rent_id.medi_account_num;
                            this.contractEdit.cost_deposit = contractList.checkin_rent_id.cost_deposit;

                            this.contractEdit.deal_time = contractList.checkin_rent_id.deal_time;
                            this.contractEdit.receipt_pic = contractList.checkin_rent_id.receipt_pic;
                            this.contractEdit.received_type = contractList.checkin_rent_id.received_type;
                            this.contractEdit.received_amount = contractList.checkin_rent_id.received_amount;
                            
                            if (contractList.checkin_rent_id.customer != null) {
                                this.is_medi = contractList.checkin_rent_id.customer.person_medium;
                            }

                            this.contractEdit.elec_fee = contractList.checkin_rent_id.elec_fee;
                            this.contractEdit.manage_fee = contractList.checkin_rent_id.manage_fee;
                            this.contractEdit.property_fee = contractList.checkin_rent_id.property_fee;
                            this.contractEdit.net_fee = contractList.checkin_rent_id.net_fee;
                            this.contractEdit.water_fee = contractList.checkin_rent_id.water_fee;
                            this.contractEdit.gas_fee = contractList.checkin_rent_id.gas_fee;

                            if (contractList.checkin_rent_id.pay.length > 1) {
                                this.change_payType = true;
                                this.more_type = contractList.checkin_rent_id.pay;
                            } else {
                                this.one_type = contractList.checkin_rent_id.pay[0];
                            }
                            if (contractList.checkin_rent_id.price.length > 1) {
                                this.price_change = true;
                            }
                        }
                    })
                }

            },
            selectMainClient(){
                this.rentClientType = 'main';
                this.collectRent = 2;
                $('.selectClient:eq(1)').modal('show');
            },
            selectClient(val){         //选择租客姓名
                this.flag = val;
                this.rentClientType = 'relative';
                this.collectRent = 2;
                $('.selectClient:eq(1)').modal('show');
            },
            selectHouse(){
                this.isNewAddHouse = 1;
                $('.selectHouse:eq(1)').modal('show');
            },
            getHouse(data){
                this.isNewAddHouse = '';
                this.contractEdit.villa_id = data.id;
                this.house_name = data.address;
            },
            receiveClient(val){     //接收附属租客id
                this.collectRent = '';
                if(this.rentClientType === 'relative'){
                    if(this.more > this.relative_customer.length && this.contractEdit.relative_customer_id.indexOf(val.id) === -1){
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
            selectDate (){
                $('.formDatetime').datetimepicker({
                    minView: "month",   //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                }).on('changeDate', ev => {
                    if (ev.target.placeholder === '合同开始时间'){
                        this.contractEdit.start_date = ev.target.value;
                    }else if(ev.target.placeholder === '合同结束时间'){
                        this.contractEdit.end_date = ev.target.value;
                    }else {
                        this.contractEdit.complete_date = ev.target.value;
                    }

                });
            },
            //获取图片id
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
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractEdit.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传转账凭证 id 数组
                this.contractEdit.receipt_pic = val;
            },
            certificatePicId(val){
                this.contractEdit.payment_pic = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                console.log(val)
                let contract = this.contractEdit.contract_pic.indexOf(val);
                if (contract > -1) {
//                    this.contractPic.cus_idPhoto.splice(contract, 1);
                    this.contractEdit.contract_pic.splice(contract, 1);
                }
                let water = this.contractEdit.water_card_pic.indexOf(val);
                if (water > -1) {
//                    this.waterPic.cus_idPhoto.splice(water, 1);
                    this.contractEdit.water_card_pic.splice(water, 1);
                }
                let ele = this.contractEdit.elec_card_pic.indexOf(val);
                if (ele > -1) {
//                    this.elePic.cus_idPhoto.splice(ele, 1);
                    this.contractEdit.elec_card_pic.splice(ele, 1);
                }
                let gas = this.contractEdit.gas_card_pic.indexOf(val);
                if (gas > -1) {
//                    this.gasPic.cus_idPhoto.splice(gas, 1);
                    this.contractEdit.gas_card_pic.splice(gas, 1);
                }
                let handover = this.contractEdit.handover_pic.indexOf(val);
                if (handover > -1) {
//                    this.handoverPic.cus_idPhoto.splice(handover, 1);
                    this.contractEdit.handover_pic.splice(handover, 1);
                }
                let receipt = this.contractEdit.receipt_pic.indexOf(val);
                if (receipt > -1) {
//                    this.receiptPic.cus_idPhoto.splice(receipt, 1);
                    this.contractEdit.receipt_pic.splice(receipt, 1);
                }

                let payment = this.contractEdit.payment_pic.indexOf(val);
                if (payment > -1) {
                    this.contractEdit.payment_pic.splice(payment, 1);
                }
            },
            editContract(){
                
                this.contractEdit.payment = this.payments.slice(0, this.more_pay_way);

                this.contractEdit.pay = [];
                if (this.change_payType) {
                    // 付款方式变化
                    this.contractEdit.pay = this.more_type;
                } else {
                    // 不变
                    this.contractEdit.pay.push(this.one_type);
                }
                
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        this.$http.post('core/rent/updatecontract',this.contractEdit).then((res) => {
                            if(res.data.code === "80010"){
                                this.$emit('EditStatus','success');
                                $('#rentingEdit').modal('hide');
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
                if(this.more>1){
                    if(this.more === this.relative_customer.length ){
                        this.relative_customer.length--;
                        this.contractEdit.relative_customer_id.length--;
                    }
                    this.more--;
                }

            },
            closeEdit(){
                this.$emit('EditStatus','error');
            },

            //            修改租房状态
            changeIsSgared(){
                if (this.contractEdit.is_shared == 2) {
                    this.contractEdit.shared_part = 1;
                    this.contractEdit.elec_fee = '';
                    this.contractEdit.net_fee = 50;
                    this.contractEdit.water_fee = '';
                    this.contractEdit.gas_fee = '';
                }
            },

            // 付款方式变化
            changePayType(ev){
                this.more_type = [];
                if (ev.currentTarget.checked) {
                    this.one_type = '';
                    if (this.contractEdit.months == '' || this.contractEdit.months == 0 || Math.ceil(this.contractEdit.months / 12) == 1) {
                        this.change_payType = false;
                        return;
                    }
                    this.change_payType = true;
                    let years = Math.ceil(this.contractEdit.months / 12);
                    for (let i = 0; i < years; i++) {
                        this.more_type.push('');
                    }
                } else {
                    this.change_payType = false;
                }
            },
            getFlexData(data){
                this.contractEdit.price = data;
            },
            // 付款方式
            addMorePayWay(){
                // 增加付款方式
                if (this.more_pay_way == 7) {
                    return;
                } else {
                    this.more_pay_way++;
                }
            },
            minusMorePayWay(){
                // 减少付款方式
                if (this.more_pay_way == 1) {
                    return;
                } else {
                    this.payments.splice(this.more_pay_way - 1, 1, {
                        payment_id: 1,
                        money: ''
                    });
                    this.more_pay_way--;
                }
            },
            // 修改中介收款方式
            changeMediPayment(){
                this.contractEdit.medi_account_owner = '';
                this.contractEdit.medi_account_subbank = '';
                this.contractEdit.medi_alipay_owner = '';
                this.contractEdit.medi_account_bank = 1;
                this.contractEdit.medi_account_num = '';
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
    /*@media (max-width: 767px) {*/
        /*div.modal-dialog{*/
            /*width: 100%;*/
        /*}*/
    /*}*/
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

    .form-horizontal.tasi-form .form-group {
        border-bottom: none;
        padding-bottom: 0px;
        margin-bottom: 0px;
    }

    .col-sm-2.icon {
        user-select: none;
    }

    .col-sm-2.icon i {
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /* text-align: left; */
        cursor: pointer;
    }

    .col-sm-2.icon i + i {
        margin-left: 2px;
    }

    .col-sm-2.icon i:hover {
        color: #999;
    }
</style>