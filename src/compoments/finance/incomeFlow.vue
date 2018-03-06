<template>
    <div>

        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>收支流水</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">

                        <div class="form-group">
                            <select class="form-control" v-model="params.cate" @change="search(1)">
                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <select class="form-control" v-model="params.account_id" @change="search(1)">
                                <option value="">请选择银行</option>
                                <option :value="value" v-for="(key,value) in dict.account">{{key}}</option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <SelectSubject @choose="houseSubject" :current="params.subject_id"
                                           :msg="'科目搜索'"></SelectSubject>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" id="Subject" type="button"
                                        @click="search_empty(1)">清空</button>
                            </span>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="搜索房屋地址" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="leading_out('1')">流水导出</a>
                        </div>

                        <div class="form-group pull-right">
                            <a class="btn btn-success" type="button" @click="leading_out('2')">日报表导出</a>
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

                                        <h5 v-if="tabs == '1'">生成 成功！</h5>

                                        <div class="padd" v-if="tabs == '2'">
                                            <DatePicker :dateConfigure="dateConfigure1" :idName="'completeDate'"
                                                        :currentDate="[complete_date]" :placeholder="'选择时间'"
                                                        @sendDate="getDate1"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="modal-footer text-right">
                                        <a data-dismiss="modal" class="btn btn-default btn-md">取消</a>
                                        <a :href="leadingOut" class="btn btn-success btn-md"
                                           @click="leading_down">下载</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <div class="panel tips">
            <ul class="clearFix">
                <li class="col-md-4">
                    收入金额(元) <br>
                    <span class="green">{{tips.receive_sum}}</span>
                </li>
                <li class="col-md-4">
                    支出金额(元) <br>
                    <span class="red">{{tips.expend_sum}}</span>
                </li>
                <li class="col-md-4">
                    收入支出差(元) <br>
                    <span class="yellow">{{tips.diff_sum}}</span>
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
                            <th></th>
                            <th class="text-center">ID</th>
                            <th class="text-center width100">交易时间</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width80">科目名称</th>
                            <th class="text-center width50">类型</th>
                            <th class="text-center width100">账户名称</th>
                            <th class="text-center width150">卡号</th>
                            <th class="text-center width130">实收金额</th>
                            <th class="text-center width110">实付金额</th>
                            <th class="text-center width150">账户余额</th>
                            <th class="text-center phone" style="min-width: 360px;">详细信息</th>
                            <th class="text-center width110">收/付款人员</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td :class="{'red':item.cate==2,'green':item.cate==1}">
                                <i class="fa fa-circle"></i>
                            </td>
                            <td>{{item.id}}</td>
                            <td>{{item.create_time}}</td>
                            <td>
                                {{item.customer == undefined ? '' : item.customer.address}}<br>
                                <span v-if="item.customer != null">
                                     <span style="line-height: 9px;"
                                           v-if="item.identity == 2 && item.customer.is_shared == 1">
                                         (&nbsp;{{dict.shared_part[item.customer.shared_part]}}&nbsp;)
                                     </span>
                                </span>
                            </td>
                            <td>{{item.subject}}</td>
                            <td>{{dict.er_type[item.cate]}}</td>
                            <td>{{item.account_name}}</td>
                            <td>{{item.account_num}}</td>
                            <td @mouseenter="enter_payable(item.id)" @mouseleave="enter_payable('')"
                                style="cursor: pointer;">
                                {{item.amount_received}}<br>
                                <span v-if="item.id === isActive" style="color: #aaaaaa;">
                                    应收:&nbsp;{{item.amount_receivable}}
                                </span>
                            </td>
                            <td @mouseenter="enter_payable(item.id)" @mouseleave="enter_payable('')"
                                style="cursor: pointer;">
                                {{item.amount_paid}}<br>
                                <span v-if="item.id === isActive" style="color: #aaaaaa;">
                                    应付:&nbsp;{{item.amount_payable}}
                                </span>
                            </td>

                            <td>{{item.amount_remain}}</td>
                            <td>{{item.info}}</td>
                            <td>{{item.operator_name}}</td>
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

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

    </div>
</template>

<script>
    import SelectSubject from '../common/selectSubject.vue'
    import Page from '../common/page.vue'
    import DatePicker from '../common/datePicker.vue'

    export default {
        components: {Page, DatePicker, SelectSubject},
        data() {
            return {
                isActive: '',
                beforePage: 1,
                dict: {},
                isShow: false,

                paging: '',
                page: 1,                  // 当前页数

                dateConfigure: [
                    {
                        range: true,
                        needHour: true
                    }
                ],

                dateConfigure1: [
                    {
                        range: false,
                        needHour: false
                    }
                ],
                complete_date: '',
                tabs: '',

                leadingOut: '',     //导出
                leads: globalConfig.server,
                myData: [],         //列表数据

                params: {
                    account_id: '',             //银行
                    subject_id: '',             //科目款项
                    department_id: [],
                    staff_id: [],
                    range: '',
                    search: '',
                    cate: 3
                },
                tips: {
                    expend_sum: 0,                      // 总支出
                    receive_sum: 0,                     // 总收入
                    diff_sum: 0,                        // 收支差额
                },
            }
        },
        mounted() {
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.dict = res.data;
                    this.filter(1);
                }
            );
        },
        methods: {
            // :href="leads + '/revenue/statistic/daily'"
            //            导出
            leading_out(val) {
                this.tabs = val;
                this.leadingOut = '';
                if (val === '1') {
                    this.$http.get('account/running/export', {
                        params: this.params
                    }).then((res) => {
                        if (res.data.code === '18710') {
                            this.leadingOut = res.data.data;
                            $('#leading_out').modal({
                                backdrop: 'static',         //空白处模态框不消失
                            });
                        }
                    })
                } else {
                    $('#leading_out').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
            },
            leading_down() {
                $('#leading_out').modal('hide');
            },
            enter_payable(val) {
                this.isActive = val;
            },
//            房款科目
            houseSubject(val) {
                this.params.subject_id = val;
                this.search(1);
            },
            payFlowList() {
                this.$http.get('account/running').then((res) => {
                    if (res.data.code === '18700') {
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
//            清空
            search_empty(val) {
                this.params.subject_id = '';
                this.filter(val);
            },
            search(val) {
                this.filter(val);
            },
            getDate(data) {
                // 时间
                this.params.range = data;
                this.search(1);
            },
            getDate1(data) {
                this.complete_date = data;
                this.leadingOut = this.leads + '/revenue/statistic/daily?date=' + data;
            },
            filter(val) {
                this.beforePage = val;
                this.$http.get('account/running?page=' + val, {
                    params: this.params
                }).then((res) => {
                        if (res.data.code === '18700') {
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
            setTips(val, bool) {
                if (bool) {
                    this.tips.receive_sum = val.receive_sum;
                    this.tips.expend_sum = val.expend_sum;
                    this.tips.diff_sum = val.diff_sum;
                } else {
                    this.tips.receive_sum = 0.00;
                    this.tips.expend_sum = 0.00;
                    this.tips.diff_sum = 0.00;
                }

            },
        }
    }
</script>

<style scoped>

    div.padd {
        display: inline-block;
    }

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

    .tips ul li span.green, td.green {
        color: #66CC33;
    }

    .tips ul li span.red, td.red {
        color: #FF6666;
    }

    .tips ul li span.yellow {
        color: #FF9A02;
    }

    .form-control {
        margin-bottom: 0;
    }

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }

        .panel-body .form-inline .form-group {
            margin-bottom: 5px;
        }
    }
</style>