<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>客户管理</li>
            <li>房东管理</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div v-if="pitch.length === 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="params.selecteds" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" v-model="params.search" placeholder="房屋地址/客户名"
                                   @keyup.enter="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group" v-if="simulate.indexOf('CustomerCollect/export') > -1 || isSuper">
                            <a class="btn btn-success" type="button" @click="leading_out">导出</a>
                        </div>

                        <div class="input-group">
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 6px" class="fa fa-circle text-danger"></i>手机
                            </span>
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 6px" class="fa fa-circle text-warning"></i>客户姓名
                            </span>
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 6px" class="fa fa-circle text-primary"></i>地址
                            </span>
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 6px" class="fa fa-eye-slash"></i>忽略重复
                            </span>
                        </div>

                        <div class="pro-sort pull-right">
                            <button class="btn btn-success" type="button" @click="newAddClient">
                                <i class="fa fa-plus-square"></i>
                                新增客户
                            </button>
                        </div>
                    </form>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li v-if="pitch.length === 1">
                            <h5><a @click="reviseLand">编辑</a></h5>
                        </li>
                        <li>
                            <h5><a @click="deleteClient">删除</a></h5>
                        </li>
                        <li>
                            <h5><a @click="cancel_rename">取消重名标记</a></h5>
                        </li>
                        <li>
                            <h5><a @click="dialogPend">转为待处理项</a></h5>
                        </li>
                        <li><h5 style="border-left: 1px solid #aaaaaa">
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 3px" class="fa fa-circle text-danger"></i>手机
                            </span>
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 3px" class="fa fa-circle text-warning"></i>客户姓名
                            </span>
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 3px" class="fa fa-circle text-primary"></i>地址
                            </span>
                            <span style="padding: 0 6px;">
                                <i style="padding-right: 3px" class="fa fa-eye-slash"></i>忽略重复
                            </span>
                        </h5></li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="panel table table-responsive roll has-js">
            <table class="table table-advance">
                <thead class="text-center">
                <tr>
                    <th></th>
                    <th class="width80"
                        v-show="rent_phone.length > 0 || rent_name.length > 0 || rent_address.length > 0 || suppress_dup.length > 0"></th>
                    <th class="text-center width100">生成时间</th>
                    <th class="text-center width100">房屋地址</th>
                    <th class="text-center width80">客户姓名</th>
                    <th class="text-center width100">手机号</th>
                    <th class="text-center width80">收房月数</th>
                    <th class="text-center width100">付款方式</th>
                    <th class="text-center width100">月单价</th>
                    <th class="text-center width100">待签约日期</th>
                    <th class="text-center" style="min-width: 130px;">第一次打房租日期</th>
                    <th class="text-center width100">客户付款方式</th>
                    <th class="text-center width150">账号</th>
                    <th class="text-center width80">签约人</th>
                    <th class="text-center width80">状态</th>
                    <th class="text-center width50">详情</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="item in LandlordList"
                    :class="{'selected': pitch.indexOf(item.id) > -1,'freeze': item.freeze === 1}">
                    <td>
                        <label v-if="item.freeze !== 1"
                               :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,'c_off':pitch.indexOf(item.id)==-1}"
                               @click.prevent="pitchId(item.id, $event)">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.indexOf(item.id) > -1">
                        </label>
                        <!--<input type="checkbox" :checked="pitch.indexOf(item.id) > -1"
                               v-if="item.freeze !== 1" @click="pitchId(item.id, $event)">-->
                        <span v-if="item.freeze === 1" @click="recover(item.id)"
                              class="fa fa-rotate-left" style="cursor:pointer;margin-right: 8px;"></span>
                    </td>
                    <td v-show="rent_phone.length > 0 || rent_name.length > 0 || rent_address.length > 0 || suppress_dup.length > 0">
                        <i v-show="rent_phone.indexOf(item.id) > -1" class="fa fa-circle text-danger"></i>
                        <i v-show="rent_name.indexOf(item.id) > -1" class="fa fa-circle text-warning"></i>
                        <i v-show="rent_address.indexOf(item.id) > -1" class="fa fa-circle text-primary"></i>
                        <i v-show="item.suppress_dup == 1" @click="reply_rename(item.id)" class="fa fa-eye-slash"></i>
                    </td>
                    <td>{{item.create_time}}</td>
                    <td>
                        {{item.address}}&nbsp;
                        <span v-if="item.liquidation === 1" class="fa fa-jpy text-warning"></span>
                    </td>
                    <td>{{item.customer_name}}</td>
                    <td>{{item.contact}}</td>
                    <td>{{item.months}}</td>
                    <td>
                        <span v-if="item.pay_types.length !== 0">
                            {{LandlordDict.pay_type[item.pay_types[0]]}}
                        </span>
                        <span class="text-primary" v-if="item.pay_types.length > 1">
                            变化
                        </span>
                        <span v-if="item.pay_types.length === 0">
                            —
                        </span>
                    </td>
                    <td>
                        <span v-if="item.prices.length !== 0">
                            {{item.prices[0]}}
                        </span>
                        <span class="text-primary" v-if="item.prices.length > 1">
                            变化
                        </span>
                        <span v-if="item.prices.length === 0">
                            —
                        </span>
                    </td>
                    <td>{{item.deal_date}}</td>
                    <td>{{item.first_pay_date}}</td>
                    <td>{{LandlordDict.payment[item.account_type]}}</td>
                    <td>
                        <span v-if="item.account_num !== ''">{{item.account_num}}</span>
                        <span v-if="item.account_num === ''">—</span>
                    </td>
                    <td class="text-center">
                        <span v-if="item.staff != null">{{item.staff.real_name}}</span>
                        <span v-if="item.staff == null">—</span>
                    </td>
                    <td>
                        <label class="label label-default" v-if="item.status === 1">
                            {{LandlordDict.customer_status[item.status]}}
                        </label>
                        <label class="label label-success" v-if="item.status === 2">
                            {{LandlordDict.customer_status[item.status]}}
                        </label>
                        <label class="label label-warning" v-if="item.status === 3">
                            {{LandlordDict.customer_status[item.status]}}
                        </label>
                    </td>
                    <td>
                        <router-link
                                :to="{path:'/newLandlordDetail',query: {nameId: item.id, sea: params, cus: 1,freeze: item.freeze}}">
                            详情
                        </router-link>
                    </td>
                </tr>
                <tr v-if="isShow">
                    <td colspan="14" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--转为待处理项-->
        <div role="dialog" class="modal fade bs-example-modal-sm" id="dialogPend">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h5>确定要转为待处理项吗？</h5>
                    </div>
                    <div class="modal-footer text-right">
                        <a data-dismiss="modal" class="btn btn-default btn-md">取消</a>
                        <a class="btn btn-success btn-md" @click="pendOwner">确定</a>
                    </div>
                </div>
            </div>
        </div>

        <!--导出-->
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
        <!--NEW新增客户-->
        <NewClientAdd :list="myLandlordList" @success_="search"></NewClientAdd>

        <!--删除-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--人资-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>

        <Page :pg="paging" @pag="search" :beforePage="params.beforePage"></Page>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Department from '../../common/oraganization.vue'
    import NewClientAdd from './newLandlordAdd.vue'
    import Page from '../../common/page.vue'
    import Confirm from '../../common/confirm.vue'
    import DatePicker from '../../common/datePicker.vue'

    export default {
        props: ['simulate', 'isSuper', 'urlId'],
        components: {Department, Page, Status, NewClientAdd, Confirm, DatePicker},
        data() {
            return {
                leadingOut: '',
                rent_address: [],                   //标记地址
                rent_name: [],                      //标记客户姓名
                rent_phone: [],                     //标记手机
                suppress_dup: [],                     //恢复标记
                tab_status: [],                     //所有ID
                confirmMsg: '',                     //删除信息
                pitch: [],
                LandlordDict: {},                   //字典
                LandlordList: [],                   //列表
                myLandlordList: {},                 //房东详情
                params: {
                    beforePage: 1,
                    department_id: [],              //部门ID
                    range: '',                      //时间搜索
                    search: '',                     //关键字
                    selecteds: [],                  //部门名称
                },
                configure: [],
                currentDate: [],
                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                        position: 'top-right',
                    }
                ],
                isShow: false,
                paging: '',
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
            }
        },
        mounted() {
            if (this.$route.query.land === 1) {
                this.params = this.$route.query.sea;
                this.getLandlordList(1);
            } else {
                this.getLandlordList(1);
            }
        },
        methods: {
            // 转为待处理项
            pendOwner() {
                this.$http.defaults.baseURL = globalConfig.server_v3;
                this.$http.post('financial/pending/lord/' + this.pitch + '?uid=' + this.urlId).then((res) => {
                    this.$http.defaults.baseURL = globalConfig.server;
                    if (res.data.code === '18810') {
                        this.search(this.params.beforePage);
                        this.successMsg(res.data.msg);
                        $('#dialogPend').modal('hide');
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                }).catch((error) => {
                    this.$http.defaults.baseURL = globalConfig.server;
                })
            },
            dialogPend() {
                $('#dialogPend').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            导出
            leading_out() {
                this.$http.get('/finance/customer/collect/export', {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.leadingOut = res.data.data;
                        $('#leading_out').modal({
                            backdrop: 'static',         //空白处模态框不消失
                        });
                    }
                })
            },
            close_() {
                $('#leading_out').modal('hide');
            },
//            取消重名标记
            cancel_rename() {
                this.$http.post('finance/customer/collect/duplication/suppress', {
                    ids: this.pitch,
                }).then((res) => {
                    if (res.data.code === '90000') {
                        this.pitch = [];
                        this.search(this.params.beforePage);
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            恢复重名标记
            reply_rename(val) {
                this.$http.put('finance/customer/collect/duplication/' + val).then((res) => {
                    if (res.data.code === '90000') {
                        this.search(this.params.beforePage);
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                });
            },
//            恢复
            recover(val) {
                this.$http.defaults.baseURL = globalConfig.server_v3;
                this.$http.post('financial/pending/recover' + '?uid=' + this.urlId, {
                    customer_id: val,
                    identity: 1,
                }).then((res) => {
                    this.$http.defaults.baseURL = globalConfig.server;
                    if (res.data.code === '18810') {
                        this.search(this.params.beforePage);
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                }).catch((error) => {
                    this.$http.defaults.baseURL = globalConfig.server;
                })
            },
//            选中
            pitchId(rul, ev) {
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(rul);

                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
//            编辑
            reviseLand() {
                $('#newClientAdd').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
                this.$http.get('finance/customer/collect/' + this.pitch).then((res) => {
                    if (res.data.code === '90010') {
                        this.myLandlordList = res.data.data;
                    }
                })
            },
//            搜索
            search(val) {
                this.pitch = [];
                this.getLandlordList(val);
            },
//              时间搜索
            getDate(data) {
                this.params.range = data;
                this.search(1);
            },
            getLandlordList(val) {
                this.params.beforePage = val;
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.LandlordDict = res.data;
                    this.tab_status = [];
                    this.$http.get('finance/customer/collect?page=' + val, {
                        params: this.params
                    }).then((res) => {
                        if (res.data.code === '90010') {
                            this.LandlordList = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.isShow = false;
                            for (let i = 0; i < res.data.data.data.length; i++) {
                                this.tab_status.push(res.data.data.data[i].id);
                                if (res.data.data.data[i].suppress_dup === 1) {
                                    this.suppress_dup.push(res.data.data.data[i].suppress_dup);
                                }
                            }
                            this.$http.post('finance/customer/collect/duplication', {
                                ids: this.tab_status,
                            }).then((res) => {
                                if (res.data.code === '90010') {
                                    this.rent_address = res.data.data.address;
                                    this.rent_name = res.data.data.name;
                                    this.rent_phone = res.data.data.phone;
                                }
                            });
                        } else {
                            this.paging = '';
                            this.LandlordList = [];
                            this.isShow = true;
                        }
                    })
                })
            },
//            人资管理
            select() {
                $('.selectCustom:eq(1)').modal({backdrop: 'static',});
                this.configure = {type: 'department'};
            },
//            人资管理
            selectDateSend(val) {
                for (let i = 0; i < val.department.length; i++) {
                    this.params.selecteds.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                this.search(1);
            },
            clearSelect() {
                if (this.params.selecteds.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.selecteds = [];
                this.search(1);
            },

//            new新增客户
            newAddClient() {
                this.myLandlordList = {};
                $('#newClientAdd').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },

//            删除模态框
            deleteClient() {
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            删除回调
            getConfirm() {
                this.$http.defaults.baseURL = globalConfig.server_v3;
                this.$http.post('finance/customer/collect/delete', {
                    ids: this.pitch
                }).then((res) => {
                    this.$http.defaults.baseURL = globalConfig.server;
                    if (res.data.code === '90010') {
                        this.pitch = [];
                        this.search(this.params.beforePage);
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                }).catch((error) => {
                    this.$http.defaults.baseURL = globalConfig.server;
                })
            },
            successMsg(msg) {    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg) {      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>

<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    input, select {
        margin-bottom: 0;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }

    .label {
        display: inline-block;
        width: 80px;
    }

    .selected {
        background: #FFFF6F !important;
    }

    .freeze {
        background-color: #D6D6D6;
        color: #E4393C;
    }
</style>
