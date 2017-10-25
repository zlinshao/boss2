<template>
    <div>
        <ol class="breadcrumb" v-if="cus == 1">
            <li>财务账本</li>
            <li>
                <router-link to="/CollectPayment">应收款项</router-link>
            </li>
            <li class="active">应收款项详情</li>
            <li class="pull-right" v-show="typeof params!='string'">
                <router-link :to="{path:'/CollectPayment',query:{myParam:params,page:page,selected:selected}}"><i
                        class="fa fa-angle-double-left"></i> 返回上一步
                </router-link>
            </li>
        </ol>

        <ol class="breadcrumb" v-if="cus == 2">
            <li>财务账本</li>
            <li>
                <router-link to="/payCllentAll">应收款项</router-link>
            </li>
            <li class="active">应收款项详情</li>
            <li class="pull-right" v-show="cus === 2">
                <router-link :to="{path:'/payCllentAll',query:{myParam:params, selected:selected, sear: 1}}"><i
                        class="fa fa-angle-double-left"></i> 返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div v-if="msg!=''">
                    <span>房屋地址</span>
                    <span>{{msg.customer == undefined ? '' : msg.customer.address}}</span>
                    <span :class="{'status':true,'btn':true,'yellow':msg.status===1,'red':msg.status===2,'green':msg.status===3,'jingdong':msg.status===4}">
                        {{dict.account_should_status[msg.status]}}
                    </span>
                    <div class="pull-right">
                        <button v-show="msg.pendable==1" class="btn btn-primary" @click="pendingItem">转为待处理项</button>
                        <button v-show="msg.status != 3" class="btn btn-primary" @click="addCollect">应收入账</button>
                        <button v-show="msg.status == 1" class="btn btn-primary" @click="dele">删除</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;应收详情
                        <!--<a class="pull-right" @click="oper">编辑</a>-->
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12" v-if="msg!=''">
                            <div class="col-md-6">
                                <div>
                                    <span class="text-primary">客户姓名：</span>
                                    <span>{{msg.customer == null ? '客户已删除' : msg.customer.name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">详情：</span>
                                    <span>{{msg.description}}</span>
                                </div>
                                <!--<div>-->
                                <!--<span class="text-primary">收款方式：</span>-->
                                <!--<span v-if="msg.customer !== null && msg.customer !== undefined">-->
                                <!--押&nbsp;{{msg.customer.bet}}&nbsp;付-->
                                <!--<span v-if="msg.customer.pay.length !== 0">{{msg.customer.pay[0]}}</span>-->
                                <!--<span class="text-primary" v-if="msg.customer.pay.length > 1"-->
                                <!--@click="changes('bet')" style="cursor: pointer;">-->
                                <!--变化-->
                                <!--</span>-->
                                <!--<span v-if="msg.customer.pay.length === 0">-->
                                <!--—-->
                                <!--</span>-->
                                <!--</span>-->
                                <!--</div>-->
                                <!--<div v-if="msg.customer !== null && msg.customer !== undefined">-->
                                <!--<div role="dialog" class="modal fade bs-example-modal-sm"-->
                                <!--v-if="msg.customer.pay.length > 1"-->
                                <!--id="bet_change">-->
                                <!--<div class="modal-dialog ">-->
                                <!--<div class="modal-content roll">-->
                                <!--<div class="modal-header">-->
                                <!--<button type="button" class="close" data-dismiss="modal">-->
                                <!--<span>&times;</span>-->
                                <!--</button>-->
                                <!--<h4 class="modal-title" style="padding: 0;">付款方式</h4>-->
                                <!--</div>-->
                                <!--<div class="modal-body">-->
                                <!--<h4 class="modal-title col-xs-6" style="padding: 10px 0;"-->
                                <!--v-for="(money,index) in msg.customer.pay">-->
                                <!--<span>第&nbsp;{{index + 1}}&nbsp;年&nbsp;押{{msg.customer.bet}}付{{money}}</span>-->
                                <!--</h4>-->
                                <!--</div>-->
                                <!--<div class="modal-footer text-right col-xs-12">-->
                                <!--<button data-dismiss="modal" class="btn btn-primary btn-md">确定-->
                                <!--</button>-->
                                <!--&lt;!&ndash;<button data-dismiss="modal" class="btn btn-danger btn-md">确认</button>&ndash;&gt;-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->

                                <!--<div>-->
                                <!--<span class="text-primary">月单价：</span>-->
                                <!--<span v-if="msg.customer !== null && msg.customer !== undefined">-->
                                <!--<span v-if="msg.customer.prices.length !== 0">-->
                                <!--{{msg.customer.prices[0]}}-->
                                <!--</span>-->
                                <!--<span class="text-primary" v-if="msg.customer.prices.length > 1"-->
                                <!--@click="changes('price')" style="cursor: pointer;">-->
                                <!--变化-->
                                <!--</span>-->
                                <!--<span v-if="msg.customer.prices.length === 0">-->
                                <!--—-->
                                <!--</span>-->
                                <!--</span>-->
                                <!--</div>-->
                                <!--<div v-if="msg.customer !== null && msg.customer !== undefined">-->
                                <!--<div role="dialog" class="modal fade bs-example-modal-sm"-->
                                <!--v-if="msg.customer.prices.length > 1"-->
                                <!--id="changes">-->
                                <!--<div class="modal-dialog ">-->
                                <!--<div class="modal-content roll">-->
                                <!--<div class="modal-header">-->
                                <!--<button type="button" class="close" data-dismiss="modal">-->
                                <!--<span>&times;</span>-->
                                <!--</button>-->
                                <!--<h4 class="modal-title" style="padding: 0;">月单价</h4>-->
                                <!--</div>-->
                                <!--<div class="modal-body">-->
                                <!--<h4 class="modal-title col-xs-6" style="padding: 10px 0;"-->
                                <!--v-for="(money,index) in msg.customer.prices">-->
                                <!--<span>第&nbsp;{{index + 1}}&nbsp;年&#45;&#45;{{money}}</span>-->
                                <!--</h4>-->
                                <!--</div>-->
                                <!--<div class="modal-footer text-right col-xs-12">-->
                                <!--<button data-dismiss="modal" class="btn btn-primary btn-md">确定-->
                                <!--</button>-->
                                <!--&lt;!&ndash;<button data-dismiss="modal" class="btn btn-danger btn-md">确认</button>&ndash;&gt;-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->

                                <div>
                                    <span class="text-primary">汇款方式：</span>
                                    <span v-if="msg.customer !== null && msg.customer !== undefined">
                                        {{dict.payment[msg.customer.account_type]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">收款人姓名：</span>
                                    <span v-if="msg.customer !== null && msg.customer !== undefined">
                                        {{msg.customer.account_owner}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">开户行：</span>
                                    <span v-if="msg.customer !== null && msg.customer !== undefined">
                                          {{dict.bank[msg.customer.account_bank]}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">账号：</span>
                                    <span v-if="msg.customer !== null && msg.customer !== undefined">
                                        {{msg.customer.account_num}}
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <span class="text-primary">应收金额：</span>
                                    <span>{{msg.amount_receivable}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">实收金额：</span>
                                    <span>{{msg.amount_received}}</span>
                                </div>

                                <div>
                                    <span class="text-primary">剩余款项：</span>
                                    <span>{{msg.balance}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">收款时间：</span>
                                    <span>
                                        {{msg.current_pay_date}}
                                        <a data-toggle="modal" data-target="#moreTime">更多</a>
                                    </span>
                                </div>
                                <div><span class="text-primary">补齐时间：</span>
                                    <span>
                                        <span v-if="!changeCompleteDate">{{msg.complete_date}}</span>
                                        <span v-else="!changeCompleteDate">
                                            <input @click="remindData" placeholder="补齐时间" readonly type="text"
                                                   class="form-control form_datetime" style="max-width: 200px;
    display: inline-block;"
                                                   v-show="changeCompleteDate" v-model="changeComplete">
                                        </span>
                                        <a @click="operCompleteDate" v-show="!changeCompleteDate&&msg.status==2">编辑</a>
                                        <button v-show="changeCompleteDate" type="button" class="btn btn-sm btn-success"
                                                @click="modifyComplete">确定</button>
                                        <button v-show="changeCompleteDate" type="button" class="btn btn-sm btn-primary"
                                                @click="cancelModify">取消</button>
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">收入科目：</span>
                                    <span>{{dict.account_subject[msg.subject_id]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">备注：</span>
                                    <span>{{msg.remark}}</span>
                                </div>
                                <!--<div><span class="text-primary">截图凭证：</span>
                                    <span v-if="msg.album==undefined">
                                        无
                                    </span>
                                    <span v-else="msg.album==undefined">
                                        <img :src="item.small" alt="" v-for="(item,index) in msg.album.receipt_pic"
                                             @click="showLargePic(index)">
                                    </span>
                                </div>-->
                            </div>
                            <div class="col-xs-12">
                                <span class="text-primary">历史收款记录：</span>
                                <div class="table table-responsive roll" style="border: 0;">
                                    <table>
                                        <tbody>
                                        <tr v-for="info in msg.running_account_record">
                                            <td style="min-width: 240px;">{{info}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


        <!--收款时间-->
        <div class="modal fade full-width-modal-right" id="moreTime" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="getDetails">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑收款时间</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group" v-for="(item,index) in moreTime">
                                <label class="col-sm-3 control-label">第{{index + 1}}次收款时间</label>
                                <div class="col-sm-9" v-if="showOper[index]">
                                    <div class="col-sm-7">
                                        <input @click="remindData" placeholder="收款时间" readonly type="text"
                                               :class="{'form-control' : true,'form_datetime':index<4,'form_datetime2':index>=4}"
                                               v-model="moreTime[index].pay_date">
                                    </div>
                                    <div class="col-sm-5">
                                        <button type="button" class="btn btn-sm btn-success"
                                                @click="operTime(index,item.id)">确定
                                        </button>
                                        <button type="button" class="btn btn-sm btn-primary" @click="cancel(index)">取消
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-8" v-else="showOper[index]">
                                    <div class="col-sm-6">
                                        <span>{{item.pay_date}}</span>
                                    </div>
                                    <div class="col-sm-5" v-show="msg.status==1">
                                        <span @click="changeShow(index)"><a>编辑</a></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>

        <SelectHouse @House="getHouse"></SelectHouse>
        <SelectClient @clientAdd="getClient"></SelectClient>

        <!--应收入账-->
        <ShouldCollect :id="currentId" @success="getDetails"></ShouldCollect>

        <PicModal :largePic="largePic"></PicModal>
        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    import ShouldCollect from './paymentShouldCollect.vue'
    import Confirm from '../../common/confirm.vue'
    import SelectHouse from '../../common/selectHouse.vue'
    import SelectClient from '../../common/selectClient.vue'
    import PicModal from '../../common/largePic.vue'

    export default{
        components: {Status, ShouldCollect, SelectHouse, SelectClient, PicModal, Confirm},
        data(){
            return {
                cus: '',
                dict: {},

                id: '',
                currentId: '',
                msg: '',
                currentIndex: -1,

                largePic: [],
                srcs: {},

                showOper: [],

                times: [],
                moreTime: [],
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

//                待结清状态编辑补齐时间
                changeCompleteDate: false,
                beforeComplete: '',      // 初始补齐时间
                changeComplete: '',

                confirmMsg: {
                    id: '',
                    msg: ''
                },

                params: {},
                page: '',
                selected: [],
            }
        },
        updated (){
            this.remindData();
        },
        mounted (){
            this.id = this.$route.query.collectId;
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.selected = this.$route.query.selected;
            this.cus = this.$route.query.cus;

            this.$http.get('revenue/glee_collect/dict').then((res) => {
                this.dict = res.data;
                this.getDetails();
            });
//            this.times = this.moreTime;
        },
        methods: {
//            变化
            changes (val){
                if (val === 'price') {
                    $('#changes').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                } else if (val === 'bet') {
                    $('#bet_change').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
            },
            getDetails(){
                this.$http.get('account/receivable/' + this.id).then((res) => {
                    this.moreTime = [];
                    this.msg = res.data.data;
                    if (this.msg.album !== undefined) {
                        this.srcs = this.msg.album.receipt_pic;
                    }
                    for (let i = 0; i < res.data.data.pay_date.length; i++) {
                        this.moreTime.push(res.data.data.pay_date[i]);
                    }
                    for (let i = 0; i < res.data.data.pay_date.length; i++) {
                        this.times.push(res.data.data.pay_date[i]);
                    }
//                        this.moreTime = res.data.data.pay_date;
//                        this.times = res.data.data.pay_date;
                    for (let i = 0; i < this.moreTime.length; i++) {
                        this.showOper.push(false);
                    }
                    this.beforeComplete = this.msg.complete_date;
                });

                if (this.currentIndex !== -1) {
                    this.cancel(this.currentIndex);
                }
            },

            oper(){
                $('#edit').modal('show');
            },

            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    pickerPosition : 'top-left'
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '收款时间') {
                        // 编辑中的付款时间
                        this.moreTime.splice(this.currentIndex, 1, {
                            id: this.moreTime[this.currentIndex].id,
                            pay_date: ev.target.value
                        });
//                        console.log(this.moreTime[this.currentIndex])
//                        console.log(this.times[this.currentIndex])
                    } else if (ev.target.placeholder === '补齐时间') {
                        this.changeComplete = ev.target.value;
                    }
                }.bind(this));
                $('.form_datetime2').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: 'top-left'
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '收款时间') {
                        // 编辑中的收款时间
                        this.moreTime.splice(this.currentIndex, 1, {
                            id: this.moreTime[this.currentIndex].id,
                            pay_date: ev.target.value
                        });
                    }
                }.bind(this));
            },

            getHouse(data){
            },
            getClient(data){
            },

            changeShow(index){
                if (this.currentIndex === -1) {
                    this.currentIndex = index;
//                this.showOper[index] = true;
                    this.showOper.splice(index, 1, true);
                }
            },
            operTime(index, id){
                this.$http.post('account/receivable/scheduler/' + this.moreTime[index].id, {pay_date: this.moreTime[index].pay_date}).then((res) => {
                    if (res.data.code === '18510') {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.currentIndex = -1;
                        this.showOper.splice(index, 1, false);
                        this.times.splice(index, 1, this.moreTime[index]);``
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_error = false;
                    }
                })
            },
            cancel(index){
                this.currentIndex = -1;
                this.showOper.splice(index, 1, false);
                this.moreTime.splice(index, 1, this.times[index]);
            },

            // 查看大图
            showLargePic(num){
                this.largePic = [{
                    src: this.srcs,
                    i: num
                }];
                $('.largePic:eq(1)').modal('show');
            },
//            应收入账
            addCollect(){
                this.currentId = this.id;
//                data-toggle="modal" data-target="#collectFor"
                $('#collectFor').modal('show');
            },

//            带结清状态编辑补齐时间
            operCompleteDate(){
                this.changeCompleteDate = true;
                this.changeComplete = this.beforeComplete;
                console.log(this.beforeComplete)
            },
            modifyComplete(){
                this.$http.put('account/receivable/' + this.id, {
                    complete_date: this.changeComplete
                }).then((res) => {
                    if (res.data.code === '18510') {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.changeCompleteDate = false;
                        this.getDetails();
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_error = false;
                    }
                })
            },
            cancelModify(){
                this.changeCompleteDate = false;
            },


            // 转为待处理项
            pendingItem(){
                this.$http.post('account/pending/receivable/' + this.id).then((res) => {
                    console.log(res);
                    if (res.data.code === '18810') {
                        // 成功
                        this.info.success = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.$router.replace({path: '/collectPayment'});
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_error = false;
                    }
                })
            },

            // 删除
            dele(){
                this.confirmMsg.id = this.operId;
                this.confirmMsg.msg = '确定删除该条应收款项吗？';
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('account/receivable/delete/' + this.id)
                    .then((res) => {
                        if (res.data.code === '18510') {
                            // 成功
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.$router.push({path: '/collectPayment'});
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
            }
        }
    }
</script>

<style scoped>
    .head .panel-body > div span {
        /*display: inline-block;*/
        font-weight: bold;
    }

    .head .panel-body > div span + span {
        margin-left: 12px;
    }

    .head .panel-body > div span.status {
        /*color: white;*/
        font-weight: normal;
        font-size: 12px;
        color: white;
    }

    header h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    header h4 > a {
        margin-left: 10px;
    }

    .client_info > div > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 120px;
    }

    .client_info > div > div > div span a {
        margin-left: 12px;
        font-size: 8px;
    }

    .form-horizontal .form-group span {
        line-height: 34px;
        font-size: 14px;
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

    img {
        cursor: pointer;
    }

    .panel-body button {
        vertical-align: inherit;
    }

    .status.jingdong {
        background-color: #e4393c;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>