<template>
    <div>

        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>应收款项</li>
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

                        <!--<div class="input-group">
                            <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                        </div>-->
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
                            <input type="text" class="form-control" placeholder="签收人/房屋地址/价格" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#addCollect">
                                <i class="fa fa-plus-square"></i>&nbsp;新增应收款项
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="pitch.length>0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5></li>
                        <!--<li>
                            <h5 data-toggle="modal" data-target="#addPay"><a><i class="fa fa-plus-square"></i>&nbsp;新增应付款项</a></h5>
                        </li>-->
                        <li v-show="statusId!=3&&pitch.length==1">
                            <h5 @click="addCollect"><a><i class="fa fa-pencil"></i>&nbsp;应收入账</a></h5>
                        </li>
                        <li v-show="statusId==1&&pitch.length==1">
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
                <li class="col-md-4">
                    应收金额(元) <br>
                    <span class="green">{{tips.receivable_sum}}</span>
                </li>
                <li class="col-md-4">
                    实收金额(元) <br>
                    <span class="green">{{tips.received_sum}}</span>
                </li>
                <li class="col-md-4">
                    剩余款项(元) <br>
                    <span class="yellow">{{tips.balance_sum}}</span>
                </li>
            </ul>
        </div>

        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">
                                <input type="checkbox" :checked="myData.length!=0&&pitch.length==myData.length"
                                       @click="chooseAll($event)">
                            </th>
                            <th class="text-center width100">收款时间</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width80">收入科目</th>
                            <th class="text-center width100">应收金额</th>
                            <th class="text-center width100">实收金额</th>
                            <th class="text-center width100">剩余款项</th>
                            <th class="text-center width100">补齐时间</th>
                            <th class="text-center phone" style="min-width: 360px;">详细信息</th>
                            <th class="text-center width80">状态</th>
                            <th class="text-center width50">备注</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData" :class="{'reds': item.aproach === 1}">
                            <td>
                                <input type="checkbox" :checked="pitch.indexOf(item.id) > -1"
                                       @click="changeIndex($event,item.id,item.status)">
                            </td>
                            <td>{{item.pay_date}}</td>
                            <td>{{item.customer == undefined ? '' : item.customer.address}}</td>
                            <td>{{dict.account_subject[item.subject_id]}}</td>
                            <td>{{item.amount_receivable}}</td>
                            <td>{{item.amount_received}}</td>
                            <td>{{item.balance}}</td>
                            <td>{{item.complete_date}}</td>
                            <td>
                                {{item.description}}
                            </td>
                            <td>
                                <label :class="{'label':true,'status':true,'yellow':item.status===1,'red':item.status===2,'green':item.status===3}">
                                    {{dict.account_should_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <span v-if="item.tag === ''"></span>
                                <span @click="look_tag(item.tag)" v-if="item.tag !== ''" class="fa fa-book"></span>
                            </td>
                            <td>
                                <router-link
                                        :to="{path:'/collectPaymentDetail',query: {collectId: item.id,page:beforePage,myParams:params,selected:selected}}">
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
        <div class="modal fade full-width-modal-right" id="addCollect" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="clearForm" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">新增应收款项</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">收款时间<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="收款时间"
                                           class="form-control form_datetime" readonly v-model="formData.pay_date">
                                    <!--<DatePicker :dateConfigure="dateConfigure1" @sendDate="getCollectTime"></DatePicker>-->
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" @click="selectClient" readonly
                                           v-model="chooseResult.customer_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">详情<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="formData.description">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收入科目<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <!--<select class="form-control" v-model="formData.subject_id">
                                        <option value="">&#45;&#45;请选择&#45;&#45;</option>
                                        <option :value="value" v-for="(key,value) in dict.account_subject">{{key}}</option>
                                    </select>-->
                                    <SelectSubject @choose="getSubject" :current="formData.subject_id"></SelectSubject>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应收金额<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="formData.amount_receivable">
                                </div>
                            </div>

                            <!--<div class="form-group">
                                <label class="col-sm-2 control-label">累计实收<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款人员<sup class="required">*</sup></label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly v-model="logName">
                                </div>
                            </div>

                            <!-- <div class="form-group">
                                 <label class="col-sm-2 control-label">凭证截图<sup class="required">*</sup></label>
                                 <div class="col-sm-10">
                                     <up-load @photo="certificatePicId" @delete="picDelete" @complete="complete"  placeholder="凭证截图"
                                              :result="'certificatePic'" :idPhotos="certificatePic"></up-load>
                                 </div>
                             </div>-->

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                        <button type="button" class="btn btn-primary" @click="save">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>


        <!--提示信息-->
        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <SelectClient @clientPayAdd="getClient"></SelectClient>
        <!--应收入账-->
        <ShouldCollect :id="shouldCollectId" @success="filter"></ShouldCollect>
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
    import STAFF from  '../../common/organization/selectStaff.vue'
    import DatePicker from '../../common/datePicker.vue'
    import upLoad from '../../common/upload.vue'
    import SelectClient from '../../common/selectPayClient.vue'
    import ShouldCollect from './paymentShouldCollect.vue'
    import SelectSubject from '../../common/selectSubject.vue'
    import Confirm from '../../common/confirm.vue'
    import ModifyTime from './modifyPayTime.vue'

    export default{
        components: {
            Page,
            Status,
            FlexBox,
            DatePicker,
            STAFF,
            upLoad,
            SelectClient,
            ShouldCollect,
            SelectSubject,
            Confirm,
            ModifyTime
        },

        data(){
            return {
                look_remark: '',              //备注内容
                remarks_status: '',          //新增/查看
                addRemark: '',               //新增备注
                pitch: [],                  //选中id
                beforePage: 1,
                certificatePic: {
                    cus_idPhotos: {},    //修改图片ID
                    cus_idPhoto: [],     //证件照片
                },
                complete_ok: 'ok',                        //图片上传完成

                isShow: false,

                operId: 0,
                statusId: 0,
                paging: '',
                page: 1,                  // 当前页数

                shouldCollectId: -1,

                dict: {},
                myData: [],      //列表数据

                dateConfigure: [
                    {
                        range: true,
                        needHour: false
                    }
                ],
                currentDate: [],

                /* dateConfigure1 : [
                 {
                 range : false,
                 needHour : false
                 }
                 ],*/
                configure: {},
                filtrate: {
                    departmentList: [],
                    staffList: []
                },


                selected: [],
                params: {
                    department_id: [],
                    staff_id: [],
                    status: '',
                    range: '',
                    search: ''
                },
                tips: {
                    receivable_sum: 0,  // 应收金额
                    received_sum: 0,    // 实收金额
                    balance_sum: 0,     // 剩余款项
                },

                chooseResult: {
                    customer_name: '',
                },
                logName: '',

                formData: {
                    customer_id: '',         // 客户id
//                    customer : {},
                    pay_date: '',    // 收款时间
                    description: '',         // 详情
                    subject_id: '',           // 科目id
                    amount_receivable: '',  // 应收金额
                    remark: ''        // 备注
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
                    if (page != undefined) {
                        this.page = page;
                        this.beforePage = page;
                        if (params != undefined && typeof params != 'string') {
//                                this.currentDate = [];
                            this.currentDate = params.range.split('to');
                            // this.currentDate = params.range.split('to');
                            // console.log(this.currentDate)
                            this.params = params;
                            console.log(this.params);
//                                alert(this.beforePage)
                        }
//                            alert(selected);
                        if (selected != undefined) {
                            this.selected = selected;
                        }
                        this.filter(this.beforePage);
                    } else {
                        this.payFlowList();
                    }
                }
            );

            // 获取当前登录人的姓名
            this.$http.get('staff/info').then((res) => {
                    this.logName = res.data.name;
                }
            )
        },
        watch: {
            pitch(val){
                if (val.length == 1) {
                    this.operId = val[0];
                } else {
                    this.operId = 0;
                }
//                console.log(this.operId);
            }
        },
        methods: {
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
                this.$http.post('account/receivable/tag/' + this.pitch[0], {
                    content: this.addRemark,
                }).then((res) => {
                    if (res.data.code === '18510') {
                        $('#addRemarks').modal('hide');
                        this.payFlowList();
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
            clearForm(){
                this.chooseResult.customer_name = '';
                this.formData.description = '';
                this.formData.customer_id = '';
                this.formData.pay_date = '';
                this.formData.subject_id = '';
                this.formData.amount_receivable = '';
                this.formData.remark = '';

                $('#addCollect').modal('hide');
            },

            // 全选
            chooseAll(ev){
                this.pitch.splice(0, this.pitch.length);
                if (ev.target.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.pitch.push(this.myData[i].id);
                    }
                }

//                console.log(this.pitch);
            },
            changeIndex(ev, id, status){
//                console.log("一开始"+this.operId);
                if (ev.target.checked) {
                    this.pitch.push(id);
                    this.operId = id;
                    this.statusId = status;
//                    console.log(this.operId);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    this.operId = 0;
                    this.statusId = 0;
                }
            },

            operation(id, index){
                this.title = '修改应付';
                this.isAdd = false;
            },

            payFlowList(){
                this.$http.get('account/receivable').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    console.log(res.data);
                    if (res.data.code == 18500) {
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.setTips(res.data.data, true);
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.setTips({}, false);
                    }
                })
            },
            remindData (){

                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder == '收款时间') {
                        this.formData.pay_date = ev.target.value;
                    }
//                    console.log(ev.target.value);
//                    console.log(ev.target.placeholder);
                }.bind(this));

            },

            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
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
            clearSelect(){
                if (this.selected.length == 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

            search(val){
                console.log(this.params);
                this.filter(val);
            },
            getDate(data){
                // 时间
                console.log(data);
                this.params.range = data;
                this.search(1);

            },

            setTips(val, bool){
                if (bool) {
                    this.tips.receivable_sum = val.receivable_sum;
                    this.tips.received_sum = val.received_sum;
                    this.tips.balance_sum = val.balance_sum;
                } else {
                    this.tips.receivable_sum = 0.00;
                    this.tips.received_sum = 0.00;
                    this.tips.balance_sum = 0.00;
                }

            },

            filter(val){
                this.operId = 0;
                this.beforePage = val;
                this.$http.get('account/receivable?page=' + val, {
                    params: this.params
                }).then(
                    (res) => {
                        if (res.data.code == 18500) {
                            // 成功
                            this.paging = res.data.data.pages;
                            this.myData = res.data.data.data;
                            this.setTips(res.data.data, true);
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.myData = [];
                            this.paging = 0;
                            this.page = 1;
                            this.setTips({}, false);
                        }
                    }
                )
            },

            // 选择客户
            selectClient(){
                $('.selectClient:eq(0)').modal('show');
            },
            getClient(data){
                console.log(data);
                this.formData.customer_id = data.id;
                this.chooseResult.customer_name = data.name;
            },

            save(){
                this.$http.post('account/receivable', this.formData).then(
                    (res) => {
                        if (res.data.code == 18510) {
                            // 成功
                            this.info.success = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.clearForm();
                            this.search(1);
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_error = false;
                            }, 2000);
                        }
                    }
                )
            },


            // 图片上传
            certificatePicId(data){
                // 获取图片
                this.certificatePic.cus_idPhoto = data;
            },
            picDelete(data){
                // 删除图片
                let index = this.certificatePic.cus_idPhoto.indexOf(data);
                if (index > -1) {
                    this.certificatePic.cus_idPhoto.splice(index, 1);
                }
            },
            complete(data){
                this.complete_ok = data;
            },
            cus_confirm(num){
                // 提交时调用
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0 || res.data.data === null) {
                            this.save(num);
                        }
                    });
                }
                else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },


//            应收入账
            addCollect(){
                this.shouldCollectId = this.operId;
//                data-toggle="modal" data-target="#collectFor"
                $('#collectFor').modal('show');
            },

            getSubject(val){
                this.formData.subject_id = val;
            },

            // 删除
            dele(){
                this.confirmMsg.id = this.operId;
                this.confirmMsg.msg = '确定删除该条应收款项吗？';
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('account/receivable/delete/' + this.operId)
                    .then((res) => {
//                    console.log(res.data)
                        if (res.data.code == 18510) {
                            this.pitch = [];
                            // 成功
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.operId = 0;
                            this.filter(this.beforePage);
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_error = false;
                            }, 2000);
                        }
                    })
            },


//            编辑付款时间
            modifyTime(val){
                console.log(val);
                this.$http.post('account/receivable/batch', {
                    ids: this.pitch,
                    pay_date: val
                }).then((res) => {
                    console.log(res);
                    if (res.data.code == 18510) {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        }, 2000);
                        this.pitch.splice(0, this.pitch.length);
                        this.filter(this.beforePage);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }
                })
            },
            /*getCollectTime(val){
             this.formData.pay_date = val;
             }*/
        }
    }
</script>

<style scoped>
    .tips {
        line-height: 30px;
        /*padding-left: 12px;*/
        padding-bottom: 5px;
        font-size: 15px;
        /*margin-top: 20px;*/
        /*width: 100%;*/
    }

    .tips ul {
        margin: 0;
        padding: 12px 0;
    }

    .tips ul li {
        /*float: left;*/
        padding: 0 50px;
        box-sizing: border-box;
    }

    .tips ul li + li {
        /*margin-left: 30px;*/
        border-left: 1px solid #ddd;

    }

    .tips ul li span {
        font-size: 18px;
        /*padding-left: 8px;*/
        /*font-weight: bold;*/
    }

    .tips ul li span.green {
        color: #78CD51;
    }

    .tips ul li span.yellow {
        color: #FF9A02;
    }

    thead tr input[type=checkbox] {
        vertical-align: inherit;
    }

    table tr input[type=checkbox] {
        width: 17px;
        height: 17px;
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

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }

    .table-striped > tbody > tr.reds {
        background-color: #FFCECE;
    }
</style>