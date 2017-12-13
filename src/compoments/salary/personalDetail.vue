<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>
                <router-link :to="{path:'/personal'}">个人业绩</router-link>
            </li>
            <li>个人业绩详情</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li v-if="tabs == 1">
                            <h5><a @click="personal_rev">编辑</a></h5>
                        </li>
                        <li v-if="tabs != 1">
                            <h5><a @click="detailRevise">编辑</a></h5>
                        </li>
                        <li v-if="tabs != 1">
                            <h5><a @click="already_salary">已发款项</a></h5>
                        </li>
                    </ul>
                </div>
                <header>
                    <div class="revise">
                        <span v-if="pitch.length == 0">{{salary_time}}&nbsp;工资详情</span>
                    </div>
                </header>
            </div>
        </section>
        <div class="col-xs-12" style="padding: 0;">
            <section class="panel">
                <header class="panel-heading tab-bg-dark-navy-blue ">
                    <ul class="nav nav-tabs">
                        <li @click="tab_personal(personal_id, 1)" :class="{'active': tabs == 1}">
                            <a data-toggle="tab" href="#salary_bill" aria-expanded="true">
                                <i class="fa fa-pencil-square-o"></i>&nbsp;工资条</a>
                        </li>
                        <!--<li @click="tab_personal(personal_id, 2)" :class="{'active': tabs == 2}">-->
                        <!--<a data-toggle="tab" href="#Insightful" aria-expanded="false">-->
                        <!--过往未发工资明细-->
                        <!--</a>-->
                        <!--</li>-->
                        <li @click="tab_personal(personal_id, 3)" :class="{'active': tabs == 3}">
                            <a data-toggle="tab" href="#sto_sent" aria-expanded="false">
                                本月工资明细
                            </a>
                        </li>
                    </ul>
                </header>
                <div class="panel-body">
                    <div class="tab-content">
                        <div id="salary_bill" class="tab-pane table table-responsive roll"
                             :class="{'active': tabs == 1}">
                            <header class="col-xs-12">
                                <h4>工资条</h4>
                            </header>
                            <!--工资条-->
                            <table class="table table-advance table-hover has-js" style="margin-bottom: 20px;"
                                   v-for="item in salaryBar">
                                <tbody class="text-center">
                                <tr class="text-center">
                                    <td rowspan="2">
                                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                        'c_off':pitch.indexOf(item.id)==-1}" @click.prevent="pitchId(item.id, $event)">
                                            <input type="checkbox" class="pull-left"
                                                   :checked="pitch.indexOf(item.id) > -1">
                                        </label>
                                    </td>
                                    <td class="width80">{{item.target_month.slice(0,7)}}</td>
                                    <td class="width80">底薪</td>
                                    <td class="width80">业绩提成</td>
                                    <td class="width80">收房奖励</td>
                                    <td class="width80">租房奖励</td>
                                    <td class="width80">本月未发金额</td>
                                    <td class="width80">认责</td>
                                    <td class="width80">中介费</td>
                                    <td class="width80">行政扣款</td>
                                    <td class="width80">社保扣款</td>
                                    <td class="width80">财务扣款</td>
                                    <td class="width80">住宿扣款</td>
                                    <td class="width80">购车扣款</td>
                                    <td class="width80">其他扣款</td>
                                    <!--<td class="width100">过往未发工资</td>-->
                                    <td class="width80">套餐类型</td>
                                    <td class="width80">应发工资</td>
                                    <td class="width80">实发工资</td>
                                    <td class="width80">工资状态</td>
                                    <td class="width50">备注</td>
                                </tr>
                                <tr class="text-center">
                                    <td>{{item.staff_name}}<br>{{item.commission_count}}单</td>
                                    <td>{{item.base}}</td>
                                    <td>{{item.commission}}</td>
                                    <td>{{item.bonus_collect}}</td>
                                    <td>{{item.bonus_rent}}</td>
                                    <td>{{item.amount_remain}}</td>
                                    <td>{{item.punish}}</td>
                                    <td>{{item.medi_cost}}</td>
                                    <td>{{item.amount_admin_deduction}}</td>
                                    <td>{{item.amount_soc_secu_deduction}}</td>
                                    <td>{{item.amount_finance_deduction}}</td>
                                    <td>{{item.amount_accomm_deduction}}</td>
                                    <td>{{item.amount_car_deduction}}</td>
                                    <td>{{item.amount_other_deduction}}</td>
                                    <!--<td>{{item.history_rc}}</td>-->
                                    <td>{{dict.package[item.package] }}</td>
                                    <td>{{item.amount_due}}</td>
                                    <td>{{item.amount_actual}}</td>
                                    <td>
                                        {{dict.salary_status[item.status]}}
                                    </td>
                                    <td>
                                        <i class="fa fa-book" @click="lookRemark(item.remark)"
                                           v-if="item.remark != ''"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-xs-12" style="padding: 0" v-for="item in salaryBar">
                                <header class="col-xs-12">
                                    <h4>扣款明细</h4>
                                </header>
                                <div>
                                    <span class="text-primary">行政扣款：</span>
                                    <span>{{item.amount_admin_deduction}}元
                                        <span v-show="item.remark_admin_deduction != ''">&nbsp;->&nbsp;</span>
                                        {{item.remark_admin_deduction}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">社保扣款：</span>
                                    <span>{{item.amount_soc_secu_deduction}}元
                                        <span v-show="item.remark_soc_secu_deduction != ''">&nbsp;->&nbsp;</span>
                                        {{item.remark_soc_secu_deduction}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">财务扣款：</span>
                                    <span>{{item.amount_finance_deduction}}元
                                        <span v-show="item.remark_finance_deduction != ''">&nbsp;->&nbsp;</span>
                                        {{item.remark_finance_deduction}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">住宿扣款：</span>
                                    <span>{{item.amount_accomm_deduction}}元
                                        <span v-show="item.remark_accomm_deduction != ''">&nbsp;->&nbsp;</span>
                                        {{item.remark_accomm_deduction}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">购车扣款：</span>
                                    <span>{{item.amount_car_deduction}}元
                                        <span v-show="item.remark_car_deduction != ''">&nbsp;->&nbsp;</span>
                                        {{item.remark_car_deduction}}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-primary">其他扣款：</span>
                                    <span>{{item.amount_other_deduction}}元
                                        <span v-show="item.remark_other_deduction != ''">&nbsp;->&nbsp;
                                        </span>{{item.remark_other_deduction}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="Insightful" class="tab-pane table has-js table-responsive roll"
                             :class="{'active': tabs == 2}" v-if="false">
                            <form class="form-inline clearFix" role="form">
                                <header class="pull-left">
                                    <h4>过往未发工资明细</h4>
                                </header>
                                <!--<div class="input-group pull-right" style="margin-bottom: 18px; margin-left: 18px">-->
                                <!--<input type="text" class="form-control" placeholder="房屋地址">-->
                                <!--<span class="input-group-btn">-->
                                <!--<button class="btn btn-success" type="button">搜索</button>-->
                                <!--</span>-->
                                <!--</div>-->
                                <!--<div class="form-group pull-right">-->
                                <!--<select class="form-control">-->
                                <!--<option value="candidate">收租状态</option>-->
                                <!--<option value="unrelated">收房</option>-->
                                <!--<option value="unrelated">租房</option>-->
                                <!--</select>-->
                                <!--</div>-->
                            </form>

                            <!--过往未发工资明细-->
                            <table class="table table-advance table-hover">
                                <thead class="text-center">
                                <tr class="vertical">
                                    <th></th>
                                    <th class="text-center width80">收租状态</th>
                                    <th class="text-center width50">月份</th>
                                    <th class="text-center width150">房屋地址</th>
                                    <th class="text-center width80">空置期奖励</th>
                                    <th class="text-center width80">价格差奖励</th>
                                    <th class="text-center width80">收房付款方式奖励</th>
                                    <th class="text-center width80">收房年限奖励</th>
                                    <th class="text-center width80">业绩提成</th>
                                    <th class="text-center width50">合同</th>
                                    <th class="text-center width50">资料</th>
                                    <th class="text-center width50">交接</th>
                                    <th class="text-center width50">客诉</th>
                                    <th class="text-center width50">尾款</th>
                                    <th class="text-center width80">未发比例</th>
                                    <th class="text-center width80">年限(涨价)扣款</th>
                                    <th class="text-center width80">空置期扣款</th>
                                    <th class="text-center width80">中介费</th>
                                    <th class="text-center width50">共计</th>
                                    <th class="text-center width50">备注</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="item in salaryDetail">
                                    <td>
                                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                    'c_off':pitch.indexOf(item.id)==-1}"
                                               @click.prevent="pitchId(item.id, $event, item.simple_cells)">
                                            <input type="checkbox" class="pull-left"
                                                   :checked="pitch.indexOf(item.id) > -1">
                                        </label>
                                    </td>
                                    <td>{{dict.typical[item.typical]}}</td>
                                    <td>{{item.generate_date}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.bonus_vacancy}}</td>
                                    <td>{{item.bonus_price}}</td>
                                    <td>{{item.bonus_pay_type}}</td>
                                    <td>{{item.bonus_year}}</td>
                                    <td>{{item.achv}}</td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 1">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 2">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 3">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 4">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="item.simple_cells.length == 0">
                                        /
                                    </td>
                                    <td v-if="item.simple_cells.length == 0">
                                        /
                                    </td>
                                    <td v-if="item.simple_cells.length == 0">
                                        /
                                    </td>
                                    <td v-if="item.simple_cells.length == 0">
                                        /
                                    </td>
                                    <td v-if="item.simple_cells.length == 5"
                                        :class="{'deduct_marks':item.simple_cells.length == 5 && item.simple_cells[4].status == 1}">
                                         <span v-for="key in item.simple_cells"
                                               v-show="key.category == 5">{{key.amount_actual}}</span>
                                    </td>
                                    <td v-else>
                                        <span>/</span>
                                    </td>
                                    <td>{{item.percentage_remain}}</td>
                                    <td>{{item.punish_year}}</td>
                                    <td>{{item.punish_vacancy}}</td>
                                    <td>
                                        <span @click="cost_show(item.id, item.medi_cost)" v-if="isActive != item.id"
                                              style="cursor: pointer;">
                                            {{item.medi_cost}}
                                        </span>
                                        <span v-if="isActive == item.id"
                                              style="display: inline-block;min-width: 100px;">
                                            <input type="text" class="form-control" v-model="costStatus"
                                                   style="margin-bottom: 5px;">
                                            <a class="btn btn-default btn-sm" @click.stop="cost_show('','')">取消</a>
                                            <a class="btn btn-success btn-sm" @click="cost_save(item.id)">保存</a>
                                        </span>
                                    </td>
                                    <td>{{item.total_price}}</td>
                                    <td>
                                        <i class="fa fa-book" @click="lookRemark(item.remark)"
                                           v-if="item.remark != ''"></i>
                                    </td>
                                </tr>
                                <tr v-show="isShow2">
                                    <td colspan="21" class="text-center text-muted">
                                        <h4 style="border: 0;">暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="sto_sent" class="tab-pane table table-responsive roll" :class="{'active': tabs == 3}">

                            <form class="form-inline clearFix" role="form">
                                <header class="pull-left">
                                    <h4>本月工资明细</h4>
                                </header>
                                <div class="input-group pull-right" style="margin-bottom: 18px; margin-left: 18px">
                                    <input type="text" class="form-control" placeholder="房屋地址" v-model="params.search"
                                           @keydown.enter.prevent="personal(personal_id, 3)">
                                    <span class="input-group-btn">
                                <button class="btn btn-success" type="button"
                                        @click="personal(personal_id, 3)">搜索</button>
                                </span>
                                </div>
                                <div class="form-group pull-right" style="margin-left: 18px">
                                    <select class="form-control" v-model="params.cate"
                                            @change="personal(personal_id, 3)">
                                        <option value="">收租状态</option>
                                        <option v-for="(key,index) in dict.typical" :value="index">{{key}}</option>
                                    </select>
                                </div>
                                <div class="pull-right" style="line-height: 36px;">
                                    本月提点为：{{commission_factor}}
                                </div>
                            </form>

                            <!--本月工资明细-->
                            <table class="table table-advance table-hover has-js">
                                <thead class="text-center">
                                <tr class="vertical">
                                    <th></th>
                                    <th class="text-center width80">收租状态</th>
                                    <th class="text-center width50">月份</th>
                                    <th class="text-center width150">房屋地址</th>
                                    <th class="text-center width80">空置期奖励</th>
                                    <th class="text-center width80">价格差奖励</th>
                                    <th class="text-center width80">收房付款方式奖励</th>
                                    <th class="text-center width80">收房年限奖励</th>
                                    <th class="text-center width80">业绩提成</th>
                                    <th class="text-center width50">合同</th>
                                    <th class="text-center width50">资料</th>
                                    <th class="text-center width50">交接</th>
                                    <th class="text-center width50">客诉</th>
                                    <th class="text-center width50">尾款</th>
                                    <th class="text-center width80">未发比例</th>
                                    <th class="text-center width80">年限(涨价)扣款</th>
                                    <th class="text-center width80">空置期扣款</th>
                                    <th class="text-center width80">中介费</th>
                                    <th class="text-center width50">共计</th>
                                    <th class="text-center width50">备注</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="item in salaryDetail">
                                    <td>
                                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                    'c_off':pitch.indexOf(item.id)==-1}"
                                               @click.prevent="pitchId(item.id, $event, item.simple_cells)">
                                            <input type="checkbox" class="pull-left"
                                                   :checked="pitch.indexOf(item.id) > -1">
                                        </label>
                                    </td>
                                    <td>{{dict.typical[item.typical]}}</td>
                                    <td>{{item.generate_date}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.bonus_vacancy}}</td>
                                    <td>{{item.bonus_price}}</td>
                                    <td>{{item.bonus_pay_type}}</td>
                                    <td>{{item.bonus_year}}</td>
                                    <td>{{item.achv}}</td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 2}"
                                        v-show="key.category == 1">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 2}"
                                        v-show="key.category == 2">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 2}"
                                        v-show="key.category == 3">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 2}"
                                        v-show="key.category == 4">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="item.simple_cells.length == 5"
                                        :class="{'deduct_marks':item.simple_cells.length == 5 && item.simple_cells[4].status == 2}">
                                         <span v-for="key in item.simple_cells"
                                               v-show="key.category == 5">{{key.amount_actual}}</span>
                                    </td>
                                    <td v-else>
                                        <span>/</span>
                                    </td>
                                    <td>{{item.percentage_remain}}</td>
                                    <td>{{item.punish_year}}</td>
                                    <td>{{item.punish_vacancy}}</td>
                                    <td>
                                        <span @click="cost_show(item.id)" v-if="isActive != item.id"
                                              style="cursor: pointer;">
                                            {{item.medi_cost}}
                                        </span>
                                        <span v-if="isActive == item.id"
                                              style="display: inline-block;min-width: 160px;position: relative;">
                                            <input type="number" class="form-control" v-model="costStatus"
                                                   @keyup="fruit"
                                                   style="margin-bottom: 5px;">&nbsp;<span
                                                style="position: absolute;top: 8px;right: 5px;">×&nbsp;0.7&nbsp;=&nbsp;{{cost_fruit}}</span>
                                            <a class="btn btn-default btn-sm" @click.stop="cost_show('')">取消</a>
                                            <a class="btn btn-success btn-sm" @click="cost_save(item.id)">保存</a>
                                        </span>
                                    </td>
                                    <td>{{item.total_price}}</td>
                                    <td>
                                        <i class="fa fa-book" @click="lookRemark(item.remark)"
                                           v-if="item.remark != ''"></i>
                                    </td>
                                </tr>
                                <tr v-show="isShow3">
                                    <td colspan="21" class="text-center text-muted">
                                        <h4 style="border: 0;">暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!--已发工资-->
        <div role="dialog" class="modal fade bs-example-modal-sm" id="already_salary">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title" style="border: 0;">提示信息</h4>
                    </div>
                    <div class="modal-body has-js clearfix">
                        <div v-for="item in simple_cells" class="pull-left"
                             style="margin-right: 15px;">
                            <label :class="{'label_check':true,'c_on':cell_pitch.indexOf(item.id) > -1,
                                    'c_off':cell_pitch.indexOf(item.id)==-1}"
                                   @click.prevent="cell_pitchId(item.id, $event)">
                                <input type="checkbox" class="pull-left"
                                       :checked="cell_pitch.indexOf(item.id) > -1">{{dict.cell_category[item.category]}}
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                        <button class="btn btn-primary btn-md" @click="cell_ok">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!--个人工资编辑-->
        <personalRevise :salaryBar="salaryBar_object" :msg="dict" @success="search"></personalRevise>

        <!--查看备注-->
        <salaryRemark :look="lookRem"></salaryRemark>

        <!--工资明细编辑-->
        <DetailRevise :msg="salary_detail" :dicts="dict" @success_cells="search"></DetailRevise>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import salaryRemark from './salaryRemark.vue'
    import personalRevise from  './personalRevise.vue'      //备注编辑
    import DetailRevise from  './detailRevise.vue'          //合同工资编辑
    import Status from '../common/status.vue';              //提示信息
    export default {
        components: {salaryRemark, personalRevise, DetailRevise, Status},
        data (){
            return {
                params: {
                    cate: '',
                    search: '',
                },
                commission_factor: '',  //提点
                typical: [],
                costStatus: '',         //中介费
                cost_fruit: '',
                isActive: '',
                tabs: 1,
                pitch: [],
                cell_pitch: [],
                cell_pitch_off: [],
                dict: {},
                simple_cells: [],
                isShow2: false,
                isShow3: false,
                salaryDetail: [],       //工资明细
                salary_detail: {},      //工资明细详情
                salaryBar: [],          //工资条
                salaryBar_object: {},   //工资条
                salary_time: '',        //工资条时间
                personal_id: '',        //ID
                lookRem: '',            //备注内容
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
        mounted (){
            this.$http.get('salary/Commission/dict').then((res) => {
                this.typical = [];
                this.dict = res.data;
                this.typical.push(res.data.typical);
                this.personal_id = this.$route.query.nameId;
                this.personal(this.$route.query.nameId, 1);
            });
        },
        methods: {
            fruit (){
                this.cost_fruit = Math.floor(this.costStatus * 0.7 * 100) / 100;
            },
//            中介费修改
            cost_show (id){
                this.isActive = id;
                this.costStatus = 0.00;

            },
            cost_save (){
                this.$http.post('achv/commission/medicost/' + this.isActive, {
                    amount: this.costStatus,
                }).then((res) => {
                    if (res.data.code === '70010') {
                        this.cost_show('');
                        this.successMsg(res.data.msg);
                        this.personal(this.personal_id, this.tabs);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                });
            },
            search (){
                this.pitch = [];
                this.personal(this.personal_id, this.tabs);
            },
//            标签页切换
            tab_personal (val, tab){
                this.pitch = [];
                this.personal(val, tab);
            },
//            详情
            personal (val, tab){
                this.salaryBar = [];
                this.salaryDetail = [];
                this.tabs = tab;
                if (tab === 1) {
                    this.$http.get('salary/view/' + val).then((res) => {
                        this.salaryBar.push(res.data.data);
                        this.salaryBar_object = res.data.data;
                        this.salary_time = res.data.data.target_month.substring(0, 7);
                    })
                }
                if (tab === 2) {
                    this.$http.get('salary/view/history/' + val).then((res) => {
                        if (res.data.code === '70000') {
                            this.salaryDetail = res.data.data;
                            this.isShow2 = false;
                        } else {
                            this.isShow2 = true;
                        }
                    })
                }
                if (tab === 3) {
                    this.$http.get('salary/view/detail/' + val, {
                        params: this.params,
                    }).then((res) => {
                        if (res.data.code === '70000' && res.data.data.length !== 0) {
                            this.salaryDetail = res.data.data;
                            this.commission_factor = res.data.data[0].commission_factor;
                            this.isShow3 = false;
                        } else {
                            this.isShow3 = true;
                        }
                    })
                }


            },
//            已发工资
            already_salary (){
                this.cell_pitch = [];
                this.cell_pitch = [];
                this.cell_pitch_off = [];
                for (let i = 0; i < this.simple_cells.length; i++) {
                    if (this.simple_cells[i].status === 1) {
                        this.cell_pitch.push(this.simple_cells[i].id);
                    } else if (this.simple_cells[i].status === 2) {
                        this.cell_pitch_off.push(this.simple_cells[i].id);
                    }
                }
                $('#already_salary').modal({backdrop: 'static',});
            },
//            编辑工资条
            personal_rev (){
                this.personal(this.personal_id, 1);
                $('#personalModel').modal({backdrop: 'static',});
            },

//            查看备注
            lookRemark (val){
                this.lookRem = val;
                $('#salaryRemark').modal({backdrop: 'static',});
            },

//            编辑工资明细
            detailRevise (){
                this.$http.get('/achv/commission/salarified/' + this.pitch).then((res) => {
                    if (res.data.code === '70010') {
                        this.salary_detail = res.data.data;
                        $('#detailRevise').modal({backdrop: 'static',});
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                });
            },
//            选中
            pitchId (rul, ev, cell){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch = [];
                if (evInput.checked) {
                    this.pitch.push(rul);
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
                this.simple_cells = cell;
            },
//            已发选中
            cell_pitchId (rul, ev){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    let index = this.cell_pitch_off.indexOf(rul);
                    if (index > -1) {
                        this.cell_pitch_off.splice(index, 1);
                    }
                    this.cell_pitch.push(rul);
                } else {
                    let index = this.cell_pitch.indexOf(rul);
                    if (index > -1) {
                        this.cell_pitch.splice(index, 1);
                    }
                    this.cell_pitch_off.push(rul);
                }
            },
//            确定已发
            cell_ok (){
                this.$http.post('achv/cell/change/' + this.pitch, {
                    on: this.cell_pitch,
                    off: this.cell_pitch_off,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        $('#already_salary').modal('hide');
                        this.personal(this.personal_id, this.tabs);
                        this.pitch = [];
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
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

        },
    }
</script>


<style scoped>
    .col-xs-12 > div + div {
        margin: 20px 0;
    }

    .col-xs-12 > div span.text-primary:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    td, table {
        border: 1px solid #DDDDDD;
    }

    h4 {
        padding: 0 10px;
        border-left: 3px solid red;
    }

    .panel > table + table {
        margin-top: 18px;
    }

    .panel-body.table-responsive {
        padding: 0 15px;
    }

    .revise {
        font-size: 20px;
        padding: 0 20px;
    }

    .vertical > th {
        vertical-align: middle;
    }

    label {
        margin-bottom: 0;
    }

    .deduct_marks {
        background-color: #c3c3c3;
    }

    div.table.table-responsive table tr td:first-child {
        width: 0;
    }

    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }

</style>
