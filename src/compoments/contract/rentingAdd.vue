<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractAdd" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="closeModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">新增租房合同</h4>
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
                                        <label class="col-sm-3 control-label col-lg-2">附属租客</label>
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
                                        <label class="col-sm-3 control-label col-lg-2">附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[1]"
                                                   readonly placeholder="租客姓名" @click="selectClient(1)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=3">
                                        <label class="col-sm-3 control-label col-lg-2">附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[2]"
                                                   readonly placeholder="租客姓名" @click="selectClient(2)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=4">
                                        <label class="col-sm-3 control-label col-lg-2">附属租客</label>
                                        <div class="col-sm-7 col-lg-8">
                                            <input type="text" class="form-control" v-model="relative_customer[3]"
                                                   readonly placeholder="租客姓名" @click="selectClient(3)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=5">
                                        <label class="col-sm-3 control-label col-lg-2">附属租客</label>
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
                                        <label class="col-sm-3 control-label col-lg-2">合同编号<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10 has-js">
                                            <div class="col-sm-6" style="padding-left : 0">
                                                <input type="text" class="form-control" @blur="test" :class="{'error': !contract_num_right}"
                                                       v-model="contractAdd.contract_num" placeholder="合同编号">
                                            </div>

                                            <label class="label_check col-sm-3" @click.prevent="isChecked($event)"
                                                   :class="{'c_on':isMedia,'c_off':isMedia}">
                                                <input type="checkbox" v-model="isMedia">中介合同
                                            </label>
                                            <label class="label_check col-sm-3" @click.prevent="isPersonal($event)"
                                                   :class="{'c_on':contractAdd.is_personal==1,'c_off':contractAdd.is_personal==2}">
                                                <input type="checkbox" v-model="contractAdd.is_personal">个人合同
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
                                        <label class="col-sm-3 control-label col-lg-2">合同开始日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'start'"
                                                        :currentDate="[contractAdd.start_date]" :placeholder="'合同开始时间'"
                                                        @sendDate="getDate"></DatePicker>
                                            <!--<input readonly class="form-control formDatetime" v-model="contractAdd.start_date"
                                                   @click="selectDate"  placeholder="合同开始时间">-->
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2">合同结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'end'"
                                                        :currentDate="[contractAdd.end_date]" :placeholder="'合同结束时间'"
                                                        @sendDate="getDate1"></DatePicker>
                                            <!--<input readonly class="form-control formDatetime" v-model="contractAdd.end_date"
                                                   @click="selectDate"  placeholder="合同结束时间">-->
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">租房类型<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <select class="form-control" v-model="contractAdd.is_shared"
                                                    @change="changeIsSgared">
                                                <option :value="value" v-for="(key,value) in myDictionary.shared_house">
                                                    {{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row" v-show="contractAdd.is_shared==1">
                                        <label class="col-sm-3 col-lg-2 control-label">房间类型<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <select class="form-control" v-model="contractAdd.shared_part">
                                                <option :value="value" v-for="(key,value) in myDictionary.shared_part">
                                                    {{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">租房状态<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <select class="form-control" v-model="contractAdd.rent_type">
                                                <option :value="value" v-for="(key,value) in myDictionary.rent_type">{{key}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 col-lg-2 control-label">租房月数<sup>*</sup></label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control" v-model="contractAdd.months">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款类型<sup>*</sup></label>
                                        <div class="col-sm-7" style="padding-right: 0">
                                            <div class="col-sm-6 padding_0">
                                                <label class="col-sm-2 control-label padding_0">押</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" v-model="contractAdd.bet">
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
                                                <input type="checkbox" :checked="change_payType"
                                                       @click="changePayType($event)">付款方式变化
                                            </label>
                                        </div>
                                    </div>

                                    <!--付款方式变化-->
                                    <div class="form-group" v-for="(item,index) in more_type">
                                        <label class="col-sm-2 control-label">第{{index + 1}}年<sup>*</sup></label>
                                        <div class="col-sm-7" style="padding-right: 0">
                                            <div class="col-sm-6 padding_0">
                                                <label class="col-sm-2 control-label padding_0">押</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" readonly
                                                           :value="contractAdd.bet">
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

                                    <FlexBox :flexData="Math.ceil(contractAdd.months/12)" :datas="contractAdd.price"
                                             :change="false" :title="'出租月单价'" @sendData="getFlexData"></FlexBox>

                                    <div class="row col-sm-12" style="padding: 0;">
                                        <label class="col-sm-2 control-label">已收类型<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="contractAdd.received_type">
                                                    <option :value="value" v-for="(key,value) in myDictionary.subject">
                                                        {{key}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-8">
                                                <label class="col-sm-3 control-label">已收金额<sup>*</sup></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control"
                                                           v-model="contractAdd.received_amount">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款方式<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <div class="col-sm-4 padding_0">
                                                <select class="form-control" v-model="payments[0].payment_id">
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.rent_payment">
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
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">收据编号</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control"
                                                   @keyup="contractAdd.receipt_number = contractAdd.receipt_number.replace(/[^\d]/g,'');"
                                                   v-model="contractAdd.receipt_number">
                                        </div>
                                    </div>

                                    <!--中介信息-->
                                    <div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">中介费</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="contractAdd.cost_medi">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">中介汇款方式</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractAdd.medi_account_type"
                                                        @change="changeMediPayment">
                                                    <option :value="value"
                                                            v-for="(key,value) in myDictionary.money_type">{{key}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group"
                                             v-show="contractAdd.medi_account_type==1||contractAdd.medi_account_type==4">
                                            <label class="col-sm-2 control-label">中介收款人姓名<sup
                                            >*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractAdd.medi_account_owner">
                                            </div>
                                        </div>
                                        <div class="form-group"
                                             v-show="contractAdd.medi_account_type==1||contractAdd.medi_account_type==4">
                                            <label class="col-sm-2 control-label">开户行</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="contractAdd.medi_account_bank">
                                                    <option :value="value" v-for="(key,value) in myDictionary.bank">{{key}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group"
                                             v-show="contractAdd.medi_account_type==1||contractAdd.medi_account_type==4">
                                            <label class="col-sm-2 control-label">支行</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractAdd.medi_account_subbank">
                                            </div>
                                        </div>
                                        <div class="form-group" v-show="contractAdd.medi_account_type==2">
                                            <label class="col-sm-2 control-label">支付宝姓名</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractAdd.medi_account_owner">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label v-show="contractAdd.medi_account_type==1"
                                                   class="col-sm-2 control-label">账号</label>
                                            <label v-show="contractAdd.medi_account_type==2"
                                                   class="col-sm-2 control-label">支付宝账号<sup
                                            >*</sup></label>
                                            <label v-show="contractAdd.medi_account_type==3"
                                                   class="col-sm-2 control-label">微信账号<sup
                                            >*</sup></label>
                                            <label v-show="contractAdd.medi_account_type==4"
                                                   class="col-sm-2 control-label">存折账号<sup
                                            >*</sup></label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control"
                                                       v-model="contractAdd.medi_account_num ">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">管理费</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="contractAdd.manage_fee">
                                        </div>
                                        <div class="col-sm-2 padding_0 line_height34">
                                            元/月
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">物业费</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="contractAdd.property_fee">
                                        </div>
                                        <div class="col-sm-2 padding_0 line_height34">
                                            元/月
                                        </div>
                                    </div>

                                    <!--合租费用-->
                                    <div v-show="contractAdd.is_shared==1">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">电费</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="contractAdd.elec_fee">
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                度
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">网络费</label>
                                            <div class="col-sm-8">
                                                <select class="form-control" v-model="contractAdd.net_fee">
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
                                                <input type="text" class="form-control" v-model="contractAdd.water_fee">
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                人
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">燃气费</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="contractAdd.gas_fee">
                                            </div>
                                            <div class="col-sm-2 padding_0 line_height34">
                                                度
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2">资料补齐时间<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'complete'"
                                                        :currentDate="[contractAdd.complete_date]"
                                                        :placeholder="'资料补齐时间'" @sendDate="getDate2"></DatePicker>
                                            <!--<input @click="selectDate" readonly placeholder="资料补齐时间"
                                                   v-model="contractAdd.complete_date" class="form-control formDatetime">-->
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2">开单人</label>
                                        <div class="col-sm-9 col-lg-10">
                                            <input type="text" class="form-control" v-model="staff_name"
                                                   @click="selectDpm" readonly placeholder="开单人">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2">备注</label>
                                        <div class="col-md-9 col-lg-10">
                                            <textarea class="form-control" placeholder="请输入备注信息"
                                                      rows="3" v-model="contractAdd.remarks">
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
                                        <label class="col-lg-2 control-label">凭证截图</label>
                                        <div class="col-lg-10">
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
                            <button type="button" class="btn btn-default" @click="closeModal">关闭</button>
                            <button type="button" class="btn btn-primary" @click="editContract">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--选择客户-->
        <SelectClient :collectRent="collectRent" @clientAdd="receiveClient"></SelectClient>
        <Status :state='info'></Status>
        <SelectHouse @House="getHouse" :isNewAddHouse="isNewAddHouse"></SelectHouse>
        <Staff :configure='configure' @Staff="dpmSeleted"></Staff>
    </div>
</template>
<script>
    import FlexBox from '../common/flexBox.vue'
    import SelectClient from '../common/selectClient.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    import SelectHouse from  '../common/selectHouse.vue'
    import Staff from '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    export default{
        props: ['contractEitId', 'dictionary', 'isEditRent'],
        components: {
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
                isNewAddHouse: '',
                collectRent: '',
                complete_ok: 'ok',
                paymentPic: {
                    cus_idPhotos: {},    //合同图片ID
                    cus_idPhoto: [],     //合同照片
                },
                contractPic: {
                    cus_idPhotos: {},    //合同图片ID
                    cus_idPhoto: [],     //合同照片
                },
                waterPic: {
                    cus_idPhotos: {},    //修改图片ID
                    cus_idPhoto: [],     //证件照片
                },
                elePic: {
                    cus_idPhotos: {},    //修改图片ID
                    cus_idPhoto: [],     //证件照片
                },
                gasPic: {
                    cus_idPhotos: {},    //修改图片ID
                    cus_idPhoto: [],     //证件照片
                },
                receiptPic: {
                    cus_idPhotos: {},    //交接单图片ID
                    cus_idPhoto: [],     //交接单照片
                },
                handoverPic: {
                    cus_idPhotos: {},    //j交接单
                    cus_idPhoto: [],     //押金收条照片
                },
                relative_customer: [],
                contractAdd: {
                    id: '',
                    relative_customer_id: [],//客户id
                    contract_num: '',        //合同编号
                    start_date: '',          //合同开始日期
                    end_date: '',            //合同结束日期
                    complete_date: '',       //资料补齐时间
                    remarks: '',             //备注信息
                    contract_pic: [],        //合同照片
                    water_card_pic: [],      //水卡照片
                    elec_card_pic: [],       //电卡照片
                    gas_card_pic: [],        //燃气卡卡照片
                    receipt_pic: [],         //押金收条
                    handover_pic: [],        //交接单照片

                    payment_pic: [],        //转账凭证
                    receipt_number: '',     // 收据编号

                    is_personal:2,

                    villa_id: '',
                    customer_id: '',

                    is_shared: 1,
                    shared_part: 1,
                    rent_type: 1,
                    months: '',
                    pay: [],
                    bet: 0,
                    price: [],

//                    中介
                    cost_medi: 0,
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

                    cost_deposit: '',
                    payment: [],
                    deal_time: '',
                    received_type: 1,
                    received_amount: '',
                    staff_id: '',
                    intermediary : 1,
                },
                dateConfigureVac: [{range: false, needHour: false,}],
                dateConfigureComplete: [{range: false, needHour: false,}],
                dateType: '',
                myDictionary: [],
                myContractEitId: '',
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                more: 1,
                flag: '',
                myIsEditRent: false,

                house_name: '',
                staff_id: '',
                customer_name: '',
                rentClientType: '',
                staff_name: '',
                one_type: '',
                more_type: [],
                change_payType: false,

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
                configure: [],

                dateConfigure: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
                contract_num_right : true,
                isMedia : false,
            }
        },
        watch: {
            dictionary(val){
                this.myDictionary = val;

                this.contractPic.cus_idPhotos = [];

                this.handoverPic.cus_idPhotos = [];

                this.receiptPic.cus_idPhotos = [];

                this.waterPic.cus_idPhotos = [];

                this.elePic.cus_idPhotos = [];

                this.gasPic.cus_idPhotos = [];

                this.paymentPic.cus_idPhotos = [];

            },
            isMedia(val){
                if(val){
                    this.contractAdd.intermediary = 2
                } else {
                    this.contractAdd.intermediary = 1
                }
            }
        },
        methods: {
            test(){
                if(!this.isMedia){
                    this.contractAdd.contract_num = this.contractAdd.contract_num.toUpperCase();
                    let reg = /^LJZF0[1-7][0-9]{7}$/i;
                    let regPer = /^GR[0-9]{6}$/i;
                    if(this.contractAdd.contract_num!==''){
                        this.contract_num_right = reg.test(this.contractAdd.contract_num) || regPer.test(this.contractAdd.contract_num);
                    }else {
                        this.contract_num_right = true;
                    }
                }
            },
            selectDpm(){ //选择部门
                $('.selectCustom:eq(1)').modal('show');
                this.configure = {type: 'staff', length: 1};
            },
            dpmSeleted(val){
                this.staff_name = val.staff[0].name;
                this.contractAdd.staff_id = val.staff[0].id;
            },
            selectMainClient(){
                this.rentClientType = 'main';
                this.collectRent = 2;
                $('#selectClient').modal('show');
            },
            selectClient(val){         //选择租客姓名
                this.flag = val;
                this.rentClientType = 'relative';
                this.collectRent = 2;
                $('#selectClient').modal('show');
            },
            selectHouse(){
                this.isNewAddHouse = 1;
                $('#selectHouse').modal('show');
            },
            getHouse(data){
                this.isNewAddHouse = '';
                this.contractAdd.villa_id = data.id;
                this.house_name = data.address;
            },
            receiveClient(val){     //接收附属租客id
                this.collectRent = '';
                if (this.rentClientType === 'relative') {
                    if (this.more > this.relative_customer.length && this.contractAdd.relative_customer_id.indexOf(val.id) === -1) {
                        this.contractAdd.relative_customer_id.push(val.id);
                        this.relative_customer.push(val.name);
                    } else if (this.more === this.relative_customer.length) {
                        this.contractAdd.relative_customer_id.splice(this.flag, 1);
                        this.relative_customer.splice(this.flag, 1, val.name);
                    }
                } else {
                    this.contractAdd.customer_id = val.id;
                    this.customer_name = val.name;
                }

            },
            //获取图片id
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
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractAdd.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传转账凭证 id 数组
                this.contractAdd.receipt_pic = val;
            },
            certificatePicId(val){
                this.contractAdd.payment_pic = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                console.log(val)
                let contract = this.contractAdd.contract_pic.indexOf(val);
                if (contract > -1) {
//                    this.contractPic.cus_idPhoto.splice(contract, 1);
                    this.contractAdd.contract_pic.splice(contract, 1);
                }
                let water = this.contractAdd.water_card_pic.indexOf(val);
                if (water > -1) {
//                    this.waterPic.cus_idPhoto.splice(water, 1);
                    this.contractAdd.water_card_pic.splice(water, 1);
                }
                let ele = this.contractAdd.elec_card_pic.indexOf(val);
                if (ele > -1) {
//                    this.elePic.cus_idPhoto.splice(ele, 1);
                    this.contractAdd.elec_card_pic.splice(ele, 1);
                }
                let gas = this.contractAdd.gas_card_pic.indexOf(val);
                if (gas > -1) {
//                    this.gasPic.cus_idPhoto.splice(gas, 1);
                    this.contractAdd.gas_card_pic.splice(gas, 1);
                }
                let handover = this.contractAdd.handover_pic.indexOf(val);
                if (handover > -1) {
//                    this.handoverPic.cus_idPhoto.splice(handover, 1);
                    this.contractAdd.handover_pic.splice(handover, 1);
                }
                let receipt = this.contractAdd.receipt_pic.indexOf(val);
                if (receipt > -1) {
//                    this.receiptPic.cus_idPhoto.splice(receipt, 1);
                    this.contractAdd.receipt_pic.splice(receipt, 1);
                }

                let payment = this.contractAdd.payment_pic.indexOf(val);
                if (payment > -1) {
                    this.contractAdd.payment_pic.splice(payment, 1);
                }
            },
            editContract(){

                this.contractAdd.payment = this.payments.slice(0, this.more_pay_way);

                this.contractAdd.pay = [];
                if (this.change_payType) {
                    // 付款方式变化
                    this.contractAdd.pay = this.more_type;
                } else {
                    // 不变
                    this.contractAdd.pay.push(this.one_type);
                }

                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    if(this.contract_num_right){
                        this.$http.get('api/picture/poll').then((res) => {
                            this.$http.post('core/rent/saveContract ', this.contractAdd).then((res) => {
                                if (res.data.code === "80010") {
                                    this.closeModal();
                                    this.info.success = res.data.msg;
                                    //显示成功弹窗 ***
                                    this.info.state_success = true;

                                } else {
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
                if (this.more < 5 && this.more === this.relative_customer.length) {
                    this.more++;
                }
            },
            reduceMore(){
                if (this.more > 0) {
                    if (this.more === this.relative_customer.length) {
                        this.relative_customer.length--;
                        this.contractAdd.relative_customer_id.length--;
                    }
                    this.more--;
                }

            },
            closeModal(){
                // 清空
                $('#contractAdd').modal('hide');
                this.payments = [
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
                ];
                this.more_pay_way = 1;

                this.staff_name = '';
                this.house_name = '';
                this.customer_name = '';

                this.contractAdd.villa_id = '';
                this.contractAdd.customer_id = '';
                this.contractAdd.is_shared = 1;
                this.contractAdd.shared_part = 1;
                this.contractAdd.rent_type = 1;
                this.contractAdd.months = '';
                this.contractAdd.pay = [];
                this.contractAdd.bet = 0;
                this.contractAdd.price = '';
                this.contractAdd.cost_medi = '';
                this.contractAdd.medi_account_type = 1;
                this.contractAdd.medi_account_num = '';
                this.contractAdd.medi_account_owner = '';
                this.contractAdd.medi_account_bank = 1;
                this.contractAdd.medi_account_subbank = '';
                this.contractAdd.cost_deposit = '';
                this.contractAdd.payment = [];
                this.contractAdd.deal_time = '';
                this.contractAdd.receipt_pic = [];
                this.contractAdd.received_type = 1;
                this.contractAdd.received_amount = '';
                this.contractAdd.staff_id = '';

                this.contractAdd.start_date = '';
                this.contractAdd.end_date = '';
                this.contractAdd.complete_date = '';

                this.contractAdd.remarks = '';

                this.contractAdd.elec_fee = '';
                this.contractAdd.manage_fee = '';
                this.contractAdd.property_fee = '';
                this.contractAdd.net_fee = 50;
                this.contractAdd.water_fee = '';
                this.contractAdd.gas_fee = '';
                this.contractAdd.intermediary = 1;

                this.contractAdd.relative_customer_id = [];
                this.contractPic.cus_idPhoto = [];
                this.contractAdd.contract_pic = [];
                this.handoverPic.cus_idPhoto = [];
                this.contractAdd.handover_pic = [];
                this.receiptPic.cus_idPhoto = [];
                this.contractAdd.receipt_pic = [];
                this.waterPic.cus_idPhoto = [];
                this.contractAdd.water_card_pic = [];
                this.elePic.cus_idPhoto = [];
                this.contractAdd.elec_card_pic = [];
                this.gasPic.cus_idPhoto = [];
                this.contractAdd.gas_card_pic = [];
                this.paymentPic.cus_idPhoto = [];
                this.contractAdd.payment_pic = [];


                this.more = 1;
                this.relative_customer = [];
                this.contractAdd.relative_customer_id = [];
            },

            //            修改租房状态
            changeIsSgared(){
                if (this.contractAdd.is_shared == 2) {
                    this.contractAdd.shared_part = 1;
                    this.contractAdd.elec_fee = '';
                    this.contractAdd.net_fee = 50;
                    this.contractAdd.water_fee = '';
                    this.contractAdd.gas_fee = '';
                }
            },

            // 付款方式变化
            changePayType(ev){
                this.more_type = [];
                if (ev.currentTarget.checked) {
                    this.one_type = '';
                    if (this.contractAdd.months == '' || this.contractAdd.months == 0) {
                        this.change_payType = false;
                        return;
                    }
                    this.change_payType = true;
                    let months = Math.ceil(this.contractAdd.months / 12);
                    for (let i = 0; i < months; i++) {
                        this.more_type.push('');
                    }
                } else {
                    this.change_payType = false;
                }
            },
            getFlexData(data){
                this.contractAdd.price = data;
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
                this.contractAdd.medi_account_owner = '';
                this.contractAdd.medi_account_subbank = '';
                this.contractAdd.medi_alipay_owner = '';
                this.contractAdd.medi_account_bank = 1;
                this.contractAdd.medi_account_num = '';
            },
            getDate(val){
                this.contractAdd.start_date = val;
            },
            getDate1(val){
                this.contractAdd.end_date = val;
            },
            getDate2(val){
                this.contractAdd.complete_date = val;
            },
            isChecked(e){
                this.isMedia = !this.isMedia;
                if(this.isMedia){
                    this.contract_num_right = true;
                }else if(!this.isMedia){
                    this.test();
                }
            },
            isPersonal(e){
                if(this.contractAdd.is_personal ===1){
                    this.contractAdd.is_personal = 2;
                    this.test();
                }else {
                    this.contractAdd.is_personal = 1;
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

    /*@media (max-width: 767px) {*/
    /*div.modal-dialog{*/
    /*width: 100%;*/
    /*}*/
    /*}*/
    .col-lg-2 {
        position: relative;
        min-height: 1px;
        padding-right: 0px;
        padding-left: 15px;
    }

    .flexbox i {
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        cursor: pointer;
    }

    .flexbox i + i {
        margin-left: 5px;
    }

    .flexbox i:hover {
        color: #999;
    }

    sup {
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

    .has-js .label_check {
        margin-top: 8px;
    }
    .error {
        border-color: #E4393C;
    }
</style>