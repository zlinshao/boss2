<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>个人工资</li>
        </ol>
        <section class="panel">
            <div class="panel-body clearFix">

                <div v-if="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">
                        <!--<div class="input-group">-->
                        <!--<input type="text" class="form-control" placeholder="点击选择部门"-->
                        <!--v-model="selected" @click='select' readonly>-->
                        <!--<span class="input-group-btn">-->
                        <!--<button class="btn btn-warning" type="button" @click="clearSelect">清空</button>-->
                        <!--</span>-->
                        <!--</div>-->

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group">
                            <select class="form-control" @change="search(1)" v-model="params.cate">
                                <option value="">全部</option>
                                <option value="1">收</option>
                                <option value="2">租</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="姓名/地址" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="input-group">
                            <a :href="address_url + 'export/salary/indexV2?cate='+ this.params.cate + '&range=' + this.params.range + '&search=' +this.params.search"
                               class="btn btn-success">导出工资条</a>
                        </div>
                        <div class="input-group">
                            <a class="btn btn-success" @click="leading_out">导出详情</a>
                        </div>
                        <div class="input-group">
                            <router-link class="btn btn-success" to="/historySettle">历史未结清</router-link>
                        </div>
                        <div class="input-group pull-right">
                            <a class="btn btn-success" @click="freezes">冻结本月工资</a>
                        </div>
                    </form>
                </div>
                <div role="dialog" class="modal fade bs-example-modal-sm" id="leading_out">
                    <div class="modal-dialog">
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
                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="personal_rev">编辑</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel table table-responsive roll has-js" style="padding: 16px;">
            <table class="table table-advance table-hover" v-for="item in salary">
                <tbody class="text-center">
                <tr class="text-center">
                    <td rowspan="2">
                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                        'c_off':pitch.indexOf(item.id)==-1}" @click.prevent="pitchId(item.id, $event)">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.indexOf(item.id) > -1">
                        </label>
                    </td>
                    <td class="width80">{{item.target_month.slice(0, 7)}}</td>
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
                    <td class="width50">详情</td>
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
                    <td>{{dict.package[item.package]}}</td>
                    <td>{{item.amount_due}}</td>
                    <td>{{item.amount_actual}}</td>
                    <td @click="toggle(item.status, item.id)" style="cursor: pointer;">
                        <!--{{dict.salary_status[item.status]}}-->
                        <span v-if="item.status == 1" class="btn btn-success btn-sm">已发放</span>
                        <span v-if="item.status == 2" class="btn btn-warning btn-sm">未发放</span>
                    </td>
                    <td>
                        <i class="fa fa-book" @click="lookRemark(item.remark)" v-if="item.remark != ''"></i>
                    </td>
                    <td>
                        <router-link :to="{path:'/personalDetail',query: {nameId: item.id}}">
                            详情
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="table table-advance table-hover" style="border: 0;" v-if="isShow">
                <tbody class="text-center">
                <tr class="text-center" style="font-size: 24px;">
                    暂无数据......
                </tr>
                </tbody>
            </table>
        </section>

        <!--分页-->
        <Page @pag="search" :pg="paging" :beforePage="params.page"></Page>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--编辑-->
        <personalRevise :salaryBar="salaryBar" :msg="dict" @success="revise_search"></personalRevise>

        <!--查看备注-->
        <salaryRemark :look="lookRem"></salaryRemark>

        <FreezeSalary></FreezeSalary>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import Page from '../common/page.vue'
    import salaryRemark from './salaryRemark.vue'
    import STAFF from '../common/oraganization.vue'     //部门搜索
    import personalRevise from './personalRevise.vue'   //个人工资编辑
    import FreezeSalary from './freezeSalary.vue'   //个人工资编辑
    export default {
        components: {DatePicker, STAFF, personalRevise, salaryRemark, Page, FreezeSalary},
        data() {
            return {
                address_url: globalConfig.server,
                leadingOut: '',
                pitch: [],                  //选中ID
                dict: {},                   //字典
                salaryBar: {},              //编辑详情
                salary: [],                 //公司列表
                isShow: false,              //暂无数据
                dateConfigure: [
                    {
                        range: true,            //日期组件参数
                        needHour: false
                    }
                ],
                configure: {},                  //部门组件参数
                selected: '',                   //部门搜索
                currentDate: [],                //日期组件参数
                params: {
                    cate: '',
//                    department_id: '',
                    range: '',
                    search: '',
                    page: 1,
                },
                paging: '',                     //总页数
                lookRem: '',                    //备注内容
            }
        },
        mounted() {
            this.$http.get('salary/Commission/dict').then((res) => {
                this.dict = res.data;
                this.personalList(1);
            });
        },
        methods: {
            // 冻结本月工资
            freezes() {
                $('#freezeModule').modal({backdrop: 'static'});
            },

//            导出详情
            leading_out() {
                this.$http.get('/salary/salary/export', {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '70010') {
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
//            已发未发
            toggle(val, id) {
                this.$http.post('salary/view/toggle/' + id, {
                    status: 3 - val,
                }).then((res) => {
                    if (res.data.code === '70010') {
                        this.search(this.params.page);
                    }
                })
            },
//            列表
            personalList(val) {
                this.params.page = val;
                this.pitch = [];
                this.$http.get('salary/view', {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '70010') {
                        this.salary = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.paging = '';
                        this.salary = [];
                        this.isShow = true;
                    }
                })
            },

//            搜索
            search(val) {
                this.personalList(val);
            },
//            编辑成功
            revise_search() {
                this.personalList(this.params.page);
            },

//            日期搜索
            getDate(data) {
                this.params.range = data;
                this.search(1);
            },

//            部门搜索
            select() {
                $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                this.configure = {type: 'department', length: 1};
            },

//            部门搜索
            selectDateSend(val) {
                for (let i = 0; i < val.department.length; i++) {
                    this.selected = val.department[i].name;
                    this.params.department_id = val.department[i].id
                }
                this.search(1);
            },

//            重置部门搜索
            clearSelect() {
                this.params.department_id = '';
                this.selected = '';
                this.search(1);
            },

//            选中
            pitchId(rul, ev) {
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
            },
//            编辑
            personal_rev() {
                this.$http.get('salary/view/' + this.pitch).then((res) => {
                    this.salaryBar = res.data.data;
                    $('#personalModel').modal({backdrop: 'static',});
                })
            },

//            查看备注
            lookRemark(val) {
                this.lookRem = val;
                $('#salaryRemark').modal({backdrop: 'static',});
            }
        }
    }
</script>

<style scoped>
    td, table {
        border: 1px solid #DDDDDD;
    }

    .panel > table + table {
        margin-top: 18px;
    }

    .input-group-btn {
        vertical-align: top;
    }

    .form-group, .input-group {
        margin-bottom: 0;
        height: 39px;
    }

    .width80 {
        min-width: 76px;
    }

</style>
