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
                        <li>
                            <h5><a @click="personal_rev">编辑</a></h5>
                        </li>
                        <li>
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
                        <li @click="personal(personal_id, 1)" :class="{'active': tabs == 1}">
                            <a data-toggle="tab" href="#salary_bill" aria-expanded="true">
                                <i class="fa fa-pencil-square-o"></i>&nbsp;工资条</a>
                        </li>
                        <li @click="personal(personal_id, 2)" :class="{'active': tabs == 2}">
                            <a data-toggle="tab" href="#Insightful" aria-expanded="false">
                                过往未发工资明细
                            </a>
                        </li>
                        <li @click="personal(personal_id, 3)" :class="{'active': tabs == 3}">
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
                            <table class="table table-advance table-hover" style="margin-bottom: 20px;">
                                <tbody class="text-center">
                                <tr class="text-center">
                                    <td class="width100">月工资</td>
                                    <td class="width100">底薪</td>
                                    <td class="width80">业绩提成</td>
                                    <td class="width100">收房奖励</td>
                                    <td class="width80">租房奖励</td>
                                    <td class="width80">扣款</td>
                                    <td class="width80">过往未发工资</td>
                                    <td class="width80">套餐类型</td>
                                    <td class="width80">应发工资</td>
                                    <td class="width80">实发工资</td>
                                    <td class="width80">工资状态</td>
                                    <td class="width50">备注</td>
                                </tr>
                                <tr class="text-center" v-for="item in salaryBar">
                                    <td>
                                        <div>{{item.staff_name}}</div>
                                    </td>
                                    <td>{{item.base}}</td>
                                    <td>{{item.commission}}</td>
                                    <td>{{item.bonus_collect}}</td>
                                    <td>{{item.bonus_rent}}</td>
                                    <td>{{item.deduction}}</td>
                                    <td>{{item.history_rc}}</td>
                                    <td>{{dict.package[item.package]}}</td>
                                    <td>{{item.amount_due}}</td>
                                    <td>{{item.amount_actual}}</td>
                                    <td>{{dict.salary_status[item.status]}}</td>
                                    <td rowspan="2"><i class="fa fa-book" @click="lookRemark"></i></td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-xs-12" style="padding: 0">
                                <header class="col-xs-12">
                                    <h4>扣款明细</h4>
                                </header>
                                <div>
                                    <span class="text-primary">具体明细：</span>
                                    <span v-for="item in salaryDetail">{{item.deduction_remark}}</span>
                                </div>
                            </div>
                        </div>
                        <div id="Insightful" class="tab-pane table has-js table-responsive roll"
                             :class="{'active': tabs == 2}">
                            <header class="col-xs-12">
                                <h4>过往未发工资明细</h4>
                            </header>
                            <!--过往未发工资明细-->
                            <table class="table table-advance table-hover">
                                <tbody class="text-center">
                                <tr class="vertical">
                                    <th></th>
                                    <th class="text-center width80">收租状态</th>
                                    <th class="text-center width50">月份</th>
                                    <th class="text-center width150">房屋地址</th>
                                    <th class="text-center width80" v-if="portion_show == 2">空置期奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">价格差奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">收房付款方式奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">收房年限奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">业绩提成</th>
                                    <th class="text-center width80">未发比例</th>
                                    <th class="text-center width50" v-if="portion_show == 2">合同</th>
                                    <th class="text-center width50" v-if="portion_show == 2">资料</th>
                                    <th class="text-center width50" v-if="portion_show == 2">交接</th>
                                    <th class="text-center width50" v-if="portion_show == 2">客诉</th>
                                    <th class="text-center width50" v-if="portion_show == 2">尾款</th>
                                    <th class="text-center width80">中介费</th>
                                    <th class="text-center width50">共计</th>
                                    <th class="text-center width50">备注</th>
                                    <th class="text-center width50">编辑</th>
                                </tr>
                                <tr class="text-center" v-for="item in salaryDetail">
                                    <td>
                                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                    'c_off':pitch.indexOf(item.id)==-1}" @click.prevent="pitchId(item.id, $event, item.simple_cells)">
                                            <input type="checkbox" class="pull-left"
                                                   :checked="pitch.indexOf(item.id) > -1">
                                        </label>
                                    </td>
                                    <td>{{dict.typical[item.typical]}}</td>
                                    <td>{{item.generate_date}}</td>
                                    <td>{{item.address}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_vacancy}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_price}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_pay_type}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_year}}</td>
                                    <td v-if="portion_show == 2">{{item.achv}}</td>
                                    <td>{{item.percentage_remain}}</td>

                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 1">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 2">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 3">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 4">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="item.simple_cells.length == 5">
                                         <span v-if="portion_show == 2" v-for="key in item.simple_cells"
                                               :class="{'deduct_marks': key.status == 1}"
                                               v-show="key.category == 5">{{key.amount_actual}}</span>
                                    </td>
                                    <td v-else>
                                        <span>/</span>
                                    </td>
                                    <td>{{item.medi_cost}}</td>
                                    <td>{{item.total_price}}</td>
                                    <td><i class="fa fa-book" @click="lookRemark"></i></td>
                                    <td><i class="fa fa-pencil" @click="detailRevise"></i></td>
                                </tr>
                                <tr v-show="isShow2">
                                    <td colspan="19" class="text-center text-muted">
                                        <h4 style="border: 0;">暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="sto_sent" class="tab-pane table table-responsive roll" :class="{'active': tabs == 3}">
                            <header class="col-xs-12">
                                <h4>本月工资明细</h4>
                            </header>
                            <!--本月工资明细-->
                            <table class="table table-advance table-hover has-js">
                                <tbody class="text-center">
                                <tr class="vertical">
                                    <th></th>
                                    <th class="text-center width80">收租状态</th>
                                    <th class="text-center width50">月份</th>
                                    <th class="text-center width150">房屋地址</th>
                                    <th class="text-center width80" v-if="portion_show == 2">空置期奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">价格差奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">收房付款方式奖励</th>
                                    <th class="text-center width50" v-if="portion_show == 2">收房年限奖励</th>
                                    <th class="text-center width80" v-if="portion_show == 2">业绩提成</th>
                                    <th class="text-center width80">未发比例</th>
                                    <th class="text-center width50" v-if="portion_show == 2">合同</th>
                                    <th class="text-center width50" v-if="portion_show == 2">资料</th>
                                    <th class="text-center width50" v-if="portion_show == 2">交接</th>
                                    <th class="text-center width50" v-if="portion_show == 2">客诉</th>
                                    <th class="text-center width50" v-if="portion_show == 2">尾款</th>
                                    <th class="text-center width80">中介费</th>
                                    <th class="text-center width50">共计</th>
                                    <th class="text-center width50">备注</th>
                                    <th class="text-center width50">编辑</th>
                                </tr>
                                <tr class="text-center" v-for="item in salaryDetail">
                                    <td>
                                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                    'c_off':pitch.indexOf(item.id)==-1}" @click.prevent="pitchId(item.id, $event, item.simple_cells)">
                                            <input type="checkbox" class="pull-left"
                                                   :checked="pitch.indexOf(item.id) > -1">
                                        </label>
                                    </td>
                                    <td>{{dict.typical[item.typical]}}</td>
                                    <td>{{item.generate_date}}</td>
                                    <td>{{item.address}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_vacancy}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_price}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_pay_type}}</td>
                                    <td v-if="portion_show == 2">{{item.bonus_year}}</td>
                                    <td v-if="portion_show == 2">{{item.achv}}</td>
                                    <td>{{item.percentage_remain}}</td>

                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 1">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 2">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 3">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="portion_show == 2" v-for="key in item.simple_cells"
                                        :class="{'deduct_marks': key.status == 1}"
                                        v-show="key.category == 4">
                                        <span>{{key.amount_actual}}</span>
                                    </td>
                                    <td v-if="item.simple_cells.length == 5">
                                         <span v-if="portion_show == 2" v-for="key in item.simple_cells"
                                               :class="{'deduct_marks': key.status == 1}"
                                               v-show="key.category == 5">{{key.amount_actual}}</span>
                                    </td>
                                    <td v-else>
                                        <span>/</span>
                                    </td>
                                    <td>{{item.medi_cost}}</td>
                                    <td>{{item.total_price}}</td>
                                    <td><i class="fa fa-book" @click="lookRemark"></i></td>
                                    <td><i class="fa fa-pencil" @click="detailRevise"></i></td>
                                </tr>
                                <tr v-show="isShow3">
                                    <td colspan="19" class="text-center text-muted">
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
                        <div v-for="item in simple_cells" v-if="item.status == 2" class="pull-left" style="margin-right: 15px;">
                            <label :class="{'label_check':true,'c_on':cell_pitch.indexOf(item.id) > -1,
                                    'c_off':cell_pitch.indexOf(item.id)==-1}" @click.prevent="cell_pitchId(item.id, $event)">
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

        <!--编辑-->
        <personalRevise></personalRevise>

        <!--查看备注-->
        <lookRemark :msg="1" :personal="personalRem" :look="lookRem"></lookRemark>

        <!--合同工资编辑-->
        <DetailRevise></DetailRevise>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import lookRemark from './lookRemark.vue'
    import personalRevise from  './personalRevise.vue'      //备注编辑
    import DetailRevise from  './detailRevise.vue'          //合同工资编辑
    import Status from '../common/status.vue';              //提示信息
    export default {
        components: {lookRemark, personalRevise, DetailRevise, Status},
        data (){
            return {
                tabs: 1,
                pitch: [],
                cell_pitch: [],
                dict: {},
                simple_cells: [],
                isShow2: false,
                isShow3: false,
                portion_show: 2,
                salaryDetail: [],       //工资明细
                salaryBar: [],          //工资条
                salary_time: '',         //工资条
                personal_id: '',        //ID
                personalRem: '',        //备注对象
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
            this.personal_id = this.$route.query.nameId;
            this.personal(this.$route.query.nameId, 1);
        },
        methods: {
//            详情
            personal (val, tab){
                this.$http.get('salary/Commission/dict').then((res) => {
                    this.dict = res.data;
                    this.salaryDetail = [];
                    this.salaryBar = [];
                    this.pitch = [];
                    this.tabs = tab;
                    if (tab === 1) {
                        this.$http.get('salary/view/' + val).then((res) => {
                            this.salaryBar.push(res.data.data);
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
                        this.$http.get('salary/view/detail/' + val).then((res) => {
                            if (res.data.code === '70000') {
                                this.salaryDetail = res.data.data;
                                this.isShow3 = false;
                            } else {
                                this.isShow3 = true;
                            }
                        })
                    }
                });

            },
//            已发工资
            already_salary (){
                this.cell_pitch = [];
                $('#already_salary').modal({backdrop: 'static',});
            },
//            编辑
            personal_rev (){
                $('#personalModel').modal({backdrop: 'static',});
            },

//            查看备注
            lookRemark (){
                $('#lookRemark').modal({backdrop: 'static',});
            },

//            编辑个人工资
            detailRevise (){
                $('#detailRevise').modal({backdrop: 'static',});
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
                    this.cell_pitch.push(rul);
                } else {
                    let index = this.cell_pitch.indexOf(rul);
                    if (index > -1) {
                        this.cell_pitch.splice(index, 1);
                    }
                }
            },
//            确定已发
            cell_ok (){
                this.$http.post('achv/cell/settle/' + this.pitch,{
                    ids: this.cell_pitch
                }).then((res) => {
                    if(res.data.code === '70000'){
                        $('#already_salary').modal('hide');
                        this.personal(this.personal_id, this.tabs);
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
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
        background-color: #DDDDDD;
    }
</style>
