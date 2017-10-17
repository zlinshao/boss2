<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>应付款项</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="input-group">
                            <select class="form-control" v-model="params.status" @change="search(1)">
                                <option value="">全部</option>
                                <option :value="value" v-for="(key,value) in dict.account_should_status">{{key}}
                                </option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <SelectSubject @choose="houseSubject" :current="params.subject_id"
                                           :msg="'科目搜索'"></SelectSubject>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" id="Subject" type="button"
                                        @click="search_empty()">清空</button>
                            </span>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group" style="height: 39px;">
                            <a class="btn btn-success" type="button" @click="selectHouse">选择地址搜索</a>
                        </div>

                        <div class="form-group" style="height: 39px;">
                            <a class="btn btn-success" type="button" @click="leading_out">导出</a>
                        </div>

                        <div role="dialog" class="modal fade bs-example-modal-sm" id="leading_out">
                            <div class="modal-dialog ">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">
                                            <span>&times;</span>
                                        </button>
                                        <h4 class="modal-title">提示信息</h4>
                                    </div>
                                    <div class="modal-body">
                                        <h5>生成 成功！</h5>
                                    </div>
                                    <div class="modal-footer text-right">
                                        <a data-dismiss="modal" class="btn btn-default btn-md">取消</a>
                                        <a :href="leadingOut" class="btn btn-success btn-md" @click="close_">下载</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addPay">
                                <i class="fa fa-plus-square"></i>&nbsp;新增应付款项
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="pitch.length > 0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5></li>
                        <!--<li>
                            <h5 data-toggle="modal" data-target="#addPay"><a><i class="fa fa-plus-square"></i>&nbsp;新增应付款项</a></h5>
                        </li>-->
                        <li v-show="pitch.length == 1">
                            <h5 @click="payables"><a><i class="fa fa-pencil"></i>&nbsp;应付入账</a>
                            </h5>
                        </li>
                        <li v-show="pitch.length == 1 && rollbacks !== null">
                            <h5 @click="Rollback_show"><a><i class="fa  fa-undo"></i>&nbsp;回滚</a></h5>
                        </li>
                        <li v-show="pitch.length == 1">
                            <h5 @click="dele"><a><i class="fa fa-times-circle-o"></i> 删除</a></h5>
                        </li>
                        <!--<li>-->
                        <!--<h5 data-toggle="modal" data-target="#modifyTime">-->
                        <!--<a><i class="fa fa-pencil"></i> 修改付款时间</a>-->
                        <!--</h5>-->
                        <!--</li>-->
                        <li v-show="pitch.length == 1">
                            <h5 @click="remark_show">
                                <a><i class="fa fa-book"></i>&nbsp;新增备注</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--增加/查看 备注-->
        <div class="modal fade " id="addRemarks" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title" v-if="remarks_status === 1">新增备注</h4>
                        <h4 class="modal-title" v-if="remarks_status === 2">查看备注</h4>
                    </div>

                    <div class="modal-body" v-if="remarks_status === 1">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <textarea class="form-control" v-model="addRemark"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-body" v-if="remarks_status === 2">
                        {{look_remark}}
                    </div>

                    <div class="modal-footer" v-if="remarks_status === 1">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button class="btn btn-success" type="button" @click="addRem"> 确定</button>
                    </div>
                    <div class="modal-footer" v-if="remarks_status === 2">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel tips">
            <ul class="clearFix">
                <li class="col-md-3">
                    应付金额(元) <br>
                    <span class="red">{{tips.payable_sum}}</span>
                </li>
                <li class="col-md-3">
                    实付金额(元) <br>
                    <span class="red">{{tips.paid_sum}}</span>
                </li>
                <li class="col-md-3">
                    剩余款项(元) <br>
                    <span class="yellow">{{tips.balance_sum}}</span>
                </li>
                <li class="col-md-3" @click="playback" style="cursor: pointer;">
                    <span style="float: left; font-size: 60px;" class="text-danger fa fa-trash-o"></span>
                    <span style="float: left; font-size: 30px;margin: 14px 0 0 10px;">回收站</span>
                </li>
            </ul>
        </div>

        <!--表格-->
        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center" v-if="recycle_bin">
                                <!--<input type="checkbox" :checked="myData.length!=0&&pitch.length==myData.length"-->
                                <!--@click="chooseAll($event)">-->
                            </th>
                            <th class="text-center width100" :class="{red: !recycle_bin}">付款时间</th>
                            <th class="text-center width80" :class="{red: !recycle_bin}">客户姓名</th>
                            <th class="text-center width120" :class="{red: !recycle_bin}">支出科目</th>
                            <th class="text-center width120" :class="{red: !recycle_bin}">应付金额</th>
                            <th class="text-center width110" :class="{red: !recycle_bin}">实付金额</th>
                            <th class="text-center width100" :class="{red: !recycle_bin}">剩余款项</th>
                            <th class="text-center width100" :class="{red: !recycle_bin}">补齐时间</th>
                            <th class="text-center phone" :class="{red: !recycle_bin}" style="min-width: 360px;">详细信息
                            </th>
                            <th class="text-center width80" :class="{red: !recycle_bin}">状态</th>
                            <th class="text-center width80" :class="{red: !recycle_bin}">备注</th>
                            <th class="text-center width50" :class="{red: !recycle_bin}" v-if="recycle_bin">详情</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData"
                            :class="{'pendable': item.pendable === 2,'reds': item.aproach === 1}">
                            <td v-if="recycle_bin">
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                        'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex($event,item.id,item.status,item.running_account_record)">
                                    <input type="checkbox" :checked="pitch.indexOf(item.id) > -1">
                                </label>

                            </td>
                            <td>{{item.pay_date}}</td>
                            <td>
                                <span v-if="item.customer != null">{{item.customer.address}}</span>
                                <span style="line-height: 9px;" v-if="item.identity === 1"
                                      class="btn btn-danger btn-xs">F</span>
                                <span style="line-height: 9px;" v-if="item.identity === 2"
                                      class="btn btn-danger btn-xs">Z</span>
                            </td>
                            <td>
                                <span @click="subject_show(1, item.id)" v-if="sub_isActive !== item.id"
                                      style="cursor: pointer;">
                                    {{dict.account_subject[item.subject_id]}}
                                </span>
                                <span v-if="sub_isActive === item.id">
                                    <span style="display: inline-block;margin-bottom: 5px;">
                                        <SelectSubject @choose="subject_revise"
                                                       :current="rev.subject_id"></SelectSubject>
                                    </span>
                                    <a class="btn btn-default btn-sm" @click='subject_show(2)'>取消</a>
                                    <a class="btn btn-success btn-sm" @click="subject_hide(item.id)">保存</a>
                                </span>

                            </td>
                            <td>
                                <span @click="able_show(1,item.amount_payable,item.id)" v-if="isActive !== item.id"
                                      style="cursor: pointer;">
                                    {{item.amount_payable}}
                                </span>
                                <span v-if="isActive === item.id">
                                    <input type="text" class="form-control" v-model="amount"
                                           style="margin-bottom: 5px;">
                                    <a class="btn btn-default btn-sm" @click='able_show(2)'>取消</a>
                                    <a class="btn btn-success btn-sm" @click="able_save(item.id)">保存</a>
                                </span>
                            </td>
                            <td>{{item.amount_paid}}</td>
                            <td>{{item.balance}}</td>
                            <td>{{item.complete_date}}</td>
                            <td>
                                {{item.description}}
                            </td>
                            <td>
                                <label :class="{'label':true,'status':true,'yellow':item.status===1,'red':item.status===2,'green':item.status===3,'jingdong':item.status===4}">
                                    {{dict.account_should_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <span v-if="item.tag === ''"></span>
                                <span @click="look_tag(item.tag)" v-if="item.tag !== ''" class="fa fa-book"></span>
                            </td>
                            <td v-if="recycle_bin">
                                <router-link
                                        :to="{path:'/payPaymentDetail',query: {payId: item.id, page:beforePage, myParams:params, selected:selected, cus: 1}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="13" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--新增-->
        <div class="modal fade full-width-modal-right" id="addPay" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="clearForm" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">新增应付款项</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款时间<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <DatePicker :dateConfigure="dateConfigure1" :idName="'payTime'"
                                                :currentDate="[pay_time]" :placeholder="'付款时间'"
                                                @sendDate="getDate1"></DatePicker>
                                    <!--<input @click="remindData" type="text" name="addtime" v-model="pay_time"
                                           placeholder="付款时间"
                                           class="form-control form_datetime" readonly>-->
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">房屋地址</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" data-toggle="modal" data-target="#selectHouse" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="cus_name" @click="selectClient"
                                           readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情<span class="text-danger">*</span></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="detailed">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">支出科目<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <!--<select class="form-control" v-model="subject">
                                        <option value="">&#45;&#45;请选择&#45;&#45;</option>
                                        <option v-for="(sub,index) in select_info.account_subject" :value="index">{{sub}}</option>
                                    </select>-->
                                    <SelectSubject @choose="getSubject" :current="subject"></SelectSubject>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应付金额<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="payable">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户类型<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="accountType">
                                        <option value="">--请选择--</option>
                                        <option v-for="(list,index) in select_info.payment" :value="index">{{list}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">账户账号<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="accountNumber" maxlength="25">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款人员<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="pay_man" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" v-model="remarks"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                        <button type="button" class="btn btn-primary" @click="new_addPay">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!--回滚-->
        <div role="dialog" class="modal fade bs-example-modal-sm has-js" id="Rollback">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">回滚</h4>
                    </div>
                    <div class="modal-body">
                        <h5 v-for="(key,index) in rollbacks">
                            <label
                                    :class="{'label_check':true,'c_on':rollback_id.indexOf(index) > -1,
                                    'c_off':rollback_id.indexOf(index) == -1}"
                                    @click.prevent="change_index($event,index)">
                                <input type="checkbox" :checked="rollback_id.indexOf(index) > -1"
                                       class="rollbacks"><span>{{key}}</span>
                            </label>
                        </h5>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                        <button class="btn btn-danger btn-md" @click="rollback">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <SelectHouse @House="getHouse" :house_status="'1'"></SelectHouse>

        <SelectClient @clientPayAdd="getClient"></SelectClient>

        <!--应付入账-->
        <ShouldPay @pay_succ="search" :details="details_info"></ShouldPay>

        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--编辑付款时间-->
        <ModifyTime @save="modifyTime"></ModifyTime>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import FlexBox from '../../common/flexBox.vue'
    import STAFF from  '../../common/oraganization.vue'
    import DatePicker from '../../common/datePicker.vue'

    import SelectHouse from '../../common/selectPayHouse.vue'
    import SelectClient from '../../common/selectPayClient.vue'
    import SelectSubject from '../../common/selectSubject.vue'
    import Confirm from '../../common/confirm.vue'
    import ShouldPay from './paymentShouldPay.vue'
    import ModifyTime from './modifyPayTime.vue'

    export default{
        components: {
            Page,
            Status,
            FlexBox,
            DatePicker,
            STAFF,
            SelectHouse,
            SelectClient,
            ShouldPay,
            SelectSubject,
            Confirm,
            ModifyTime
        },

        data(){
            return {
                rev: {subject_id: ''},         //列表编辑科目
                leadingOut: '',             //导出
                rollback_id: [],               //回滚ID
                rollbacks: {},               //回滚
                sub_isActive: '',
                isActive: '',
                amount: '',                     //编辑列表金额
                recycle_bin: true,            //回收站
                pitch: [],                  //选中id
                status: [],                // 选中状态
                look_remark: '',              //备注内容
                remarks_status: '',          //新增/查看
                addRemark: '',               //新增备注
                accountType: '',                    //账户类型
                accountNumber: '',                  //账户账号
                details_info: [],                   //应入
                select_info: {},                    //字典
                pay_time: '',                       //付款日期
                cus_id: '',                         //客户ID
                cus_name: '',                       //客户姓名
                identity: '',                       //客户身份
                detailed: '',                       //详情
                subject: '',                        //支付科目
                payable: '',                        //应付金额
                remarks: '',                        //备注
                pay_man: '',                        //付款人员

                beforePage: 1,
                paging: '',

                dict: {},
                myData: [],                 //列表数据
                isShow: false,
                dateConfigure: [
                    {
                        range: true,
                        needHour: true
                    }
                ],
                currentDate: [],

                configure: {},
                filtrate: {
                    departmentList: [],
                    staffList: []
                },

                title: '',
                isAdd: true,

                selected: [],
                params: {
                    department_id: [],
                    staff_id: [],
                    status: '',
                    range: '',
                    search: '',
                    subject_id: '',                 //科目款项
                },
                tips: {
                    payable_sum: 0.00,          // 应付总额
                    paid_sum: 0.00,             // 已付总额
                    balance_sum: 0.00,          // 欠额总额
                },
                formData: {
                    customer: {}
                },
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

                confirmMsg: {
                    id: '',
                    msg: ''
                },
                dateConfigure1: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
            }
        },
        updated (){
            this.remindData();
//            时间选择
        },

        mounted (){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            let selected = this.$route.query.selected;
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                this.dict = res.data;
                if (page !== undefined) {
                    this.page = page;
                    this.beforePage = page;
                    if (params !== undefined && typeof params !== 'string') {
//                        this.currentDate = [];
                        this.currentDate = params.range.split('to');
//                        this.currentDate = params.range.split('to');
                        this.params = params;
                    }
                    if (selected !== undefined) {
                        this.selected = selected;
                    }
                    this.filter(this.beforePage);
                } else {
                    this.payFlowList();
                }
            });
        },
        methods: {
//            导出
            leading_out (){
                this.$http.get('account/payable/export', {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.leadingOut = res.data.data;
                        $('#leading_out').modal({
                            backdrop: 'static',         //空白处模态框不消失
                        });
                    }
                })
            },
            close_ (){
                $('#leading_out').modal('hide');
            },
//              选择房屋
            selectHouse(){
                $('.selectHouse:eq(0)').modal('show');
            },
//              房屋信息
            getHouse(data){
                this.params.search = data.address;
                this.search(1);
            },
//            清空科目
            search_empty (){
                this.params.subject_id = '';
                this.search(1);
            },
//            科目搜索
            houseSubject(val){
                this.params.subject_id = val;
                this.search(1);
            },
//            编辑列表科目
            subject_show (val, id){
                if (val === 1) {
                    this.sub_isActive = id;
                } else if (val === 2) {
                    this.sub_isActive = '';
                }
            },
//            选择科目
            subject_revise (val){
                this.rev.subject_id = val;
            },
//            确定修改列表科目
            subject_hide (id){
                this.$http.put('account/payable/subject/' + id, {
                    subject_id: this.rev.subject_id,
                }).then((res) => {
                    if(res.data.code === '18410'){
                        this.search(this.beforePage);
                        this.sub_isActive = '';
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            编辑金额
            able_show (val, m, id){
                if (val === 1) {
                    this.amount = m;
                    this.isActive = id;
                } else if (val === 2) {
                    this.amount = '';
                    this.isActive = '';
                }
            },
//            保存金额编辑
            able_save (id){
                this.$http.post('account/payable/edit/' + id, {
                    amount: this.amount
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.search(this.beforePage);
                        this.amount = '';
                        this.isActive = '';
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },

//            清空
            clear_info (){
                this.params.department_id = [];
                this.params.name = [];
                this.params.staff_id = [];
                this.params.name = [];
                this.params.status = '';
                this.params.range = '';
                this.params.search = '';
                this.selected = [];
            },
            search(val){
                if (this.recycle_bin === false) {
                    this.pitch = [];
                    this.status = [];
                    this.playbacks(val);
                } else if (this.recycle_bin === true) {
                    this.pitch = [];
                    this.status = [];
                    this.filter(val);
                }
            },

//            回收站列表/列表
            playback (){
                this.recycle_bin = !this.recycle_bin;
                if (this.recycle_bin === false) {
                    this.clear_info();
                    this.playbacks(this.beforePage);
                } else if (this.recycle_bin === true) {
                    this.clear_info();
                    this.filter(this.beforePage);
                }
            },
            playbacks (val){
                this.paging = '';
                this.beforePage = val;
                this.$http.get('account/payable/trashed?page=' + val, {
                    params: this.params
                }).then((res) => {
                    this.myData = [];
                    if (res.data.code === '18400') {
                        this.isShow = false;
                        this.paging = res.data.data.paging;
                        this.myData = res.data.data.data;
                    } else {
                        this.isShow = true;
                    }
                })
            },
//            应付列表
            filter(val){
                this.paging = '';
                this.beforePage = val;
                this.$http.get('account/payable?page=' + val, {
                    params: this.params
                }).then((res) => {
                    this.myData = [];
                    if (res.data.code === '18400') {
                        // 成功
                        this.paging = res.data.data.pages;
                        this.myData = res.data.data.data;
                        this.setTips(res.data.data, true);
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.page = 1;
                        this.setTips({}, false);
                    }
                })
            },
//            回滚
            Rollback_show(){
                this.rollback_id = [];
                $('#Rollback').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            回滚选择
            change_index (ev, val){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.rollback_id.push(val);
                } else {
                    let index = this.rollback_id.indexOf(val);
                    if (index > -1) {
                        this.rollback_id.splice(index, 1);
                    }
                }
            },
//            回滚
            rollback (){
                this.$http.put('account/payable/revert/' + this.pitch, {
                    ra_id: this.rollback_id
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.search(this.beforePage);
                        $('#Rollback').modal('hide');
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            新增备注
            remark_show (){
                this.remarks_status = 1;
                this.addRemark = '';
                $('#addRemarks').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            新增备注
            addRem (){
                this.$http.post('account/payable/tag/' + this.pitch, {
                    content: this.addRemark,
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.pitch = [];
                        $('#addRemarks').modal('hide');
                        this.search(this.beforePage);
                        this.successMsg(res.data.msg);
                    }else{
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            查看备注
            look_tag (val){
                this.look_remark = val;
                this.remarks_status = 2;
                $('#addRemarks').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            新增入账模态框
            addPay (){
                $('#addPay').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            确认新增入账
            new_addPay(){
                this.$http.post('account/payable', {
                    customer_id: this.cus_id,                           //客户ID
                    identity: this.identity,                            //客户身份
                    pay_date: this.pay_time,                            //付款日期
                    subject_id: this.subject,                           //支付科目ID
                    customer_account_type: this.accountType,            //账户类型
                    customer_account_num: this.accountNumber,           //账户账号
                    description: this.detailed,                         //详情
                    amount_payable: this.payable,                       //应付
                    remark: this.remarks                                //备注
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.clearForm();
                        this.search(1);
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            取消
            clearForm(){
                $('#addPay').modal('hide');
                this.accountType = '';                    //账户类型
                this.accountNumber = '';                  //账户账号
                this.pay_time = '';                       //付款日期
                this.cus_id = '';                         //客户ID
                this.cus_name = '';                       //客户姓名
                this.detailed = '';                       //详情
                this.subject = '';                        //支付科目
                this.payable = '';                        //应付金额
                this.remarks = '';                        //备注
            },

            // 全选
            chooseAll(ev){
                this.pitch.splice(0, this.pitch.length);
                if (ev.target.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.pitch.push(this.myData[i].id);
                    }
                }
            },
//            应付入账
            payables (){
                $('#payFor').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
                this.$http.get('account/payable/' + this.pitch).then((res) => {
                    this.details_info = [];
                    this.details_info.push(res.data.data);
                });
            },
//            列表多选框
            changeIndex(ev, id, status, index){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.rollbacks = index;
                this.pitch = [];
                this.status = [];
                if (evInput.checked) {
                    this.pitch.push(id);
                    this.status.push(status);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    let index1 = this.status.indexOf(status);
                    if (index1 > -1) {
                        this.status.splice(index1, 1);
                    }
                }
            },
//            列表
            payFlowList(){
                this.$http.get('staff/info').then((res) => {
                    this.pay_man = res.data.name;
                });
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.select_info = res.data;

                    this.$http.get('account/payable').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                        if (res.data.code === '18400') {
                            this.myData = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.setTips(res.data.data, true);
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.setTips({}, false);
                        }
                    })
                });
            },
//            时间控件
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '付款时间') {
                        this.pay_time = ev.target.value
                    }
                }.bind(this));
            },
//            人资
            select(){
                $('#selectCustom').modal('show');
            },
//            人资
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
//            清除搜索
            clearSelect(){
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

            getDate(data){
                // 时间
                this.params.range = data;
                this.search(1);
            },

            setTips(val, bool){
                if (bool) {
                    this.tips.payable_sum = val.payable_sum;
                    this.tips.paid_sum = val.paid_sum;
                    this.tips.balance_sum = val.balance_sum;
                } else {
                    this.tips.payable_sum = 0.00;
                    this.tips.paid_sum = 0.00;
                    this.tips.balance_sum = 0.00;
                }

            },

            // 选择客户
            selectClient(){
                $('.selectClient:eq(0)').modal('show');
            },
            getClient(data){
                console.log(data);
                this.cus_id = data.id;
                this.identity = data.identity;
                this.cus_name = data.address

            },
            getSubject(val){
                this.subject = val;
            },

            // 删除
            dele(){
                this.confirmMsg.id = this.pitch;
                this.confirmMsg.msg = '确定删除该条应付款项吗？';
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('account/payable/delete/' + this.pitch).then((res) => {
                    if (res.data.code === '18410') {
                        this.pitch = [];
                        this.successMsg(res.data.msg);
                        this.pitch = 0;
                        this.search(this.beforePage);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            编辑付款时间
            modifyTime(val){
                this.$http.post('account/payable/batch', {
                    ids: this.pitch,
                    pay_date: val
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.successMsg(res.data.msg);
                        this.pitch.splice(0, this.pitch.length);
                        this.search(this.beforePage);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            getDate1(val){
                this.pay_time = val;
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>

<style scoped>
    .btn-xs {
        line-height: 9px;
    }

    .datePickerContainer {
        margin-bottom: 0;
    }

    @media (max-width: 798px) {
        .datePickerContainer {
            margin-top: 3px;
        }
    }

    .input-group-btn {
        vertical-align: top;
    }

    .input-group {
        height: 39px;
    }

    .tips {
        line-height: 30px;
        padding-bottom: 5px;
        font-size: 15px;
    }

    .tips ul {
        margin: 0;
        padding: 12px 0;
    }

    .tips ul li {
        padding: 0 50px;
        box-sizing: border-box;
    }

    .tips ul li + li {
        border-left: 1px solid #ddd;

    }

    .tips ul li span {
        font-size: 18px;
    }

    .tips ul li span.red {
        color: #FF6666;
    }

    .tips ul li span.yellow {
        color: #FF9A02;
    }

    thead tr input[type=checkbox] {
        vertical-align: inherit;
    }

    input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    .rollbacks {
        margin-right: 10px;
        vertical-align: sub;
    }

    textarea {
        max-width: 100%;
    }

    tbody tr td .status {
        color: white;
    }

    .status.yellow {
        background-color: #FFCC00;
    }

    .status.red {
        background-color: #FF9999;
    }

    .status.green {
        background-color: #78CD51;
    }

    tr.pendable {
        background-color: #D6D6D6;
    }

    th.red {
        color: #e4393c;
    }

    .status.jingdong {
        background-color: #e4393c;
    }

    tbody > tr.reds {
        background-color: #FFCECE;
    }
</style>