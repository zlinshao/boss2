<template>
    <div>
        <!--修改备注-->
        <div class="modal fade full-width-modal-right" id="personalModel" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content roll">
                        <!--新增客户-->
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">编辑</h4>
                        </div>

                        <!--/编辑-->
                        <div class="modal-body has-js">
                            <form class="form-horizontal" role="form">

                                <!--姓名-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">姓名</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="staff_name" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--部门-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="department_name" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--套餐类型-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">套餐类型</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <select v-model="set_meal" class="form-control" @change="salary_create">
                                            <option v-for="(key,index) in dict.package" :value="index">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <!--底薪-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">底薪</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="base_pay" class="form-control" readonly>
                                    </div>
                                </div>

                                <!--业绩提成-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">业绩提成</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="achievement_up" class="form-control"
                                               placeholder="" readonly>
                                    </div>
                                </div>

                                <!--收房奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">收房奖励</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="collect_reward" class="form-control"
                                               placeholder="" readonly>
                                    </div>
                                </div>

                                <!--未发比例-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">收房未发金额</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="insightful_c" class="form-control"
                                               placeholder="" readonly>
                                    </div>
                                </div>

                                <!--租房奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">租房奖励</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="rent_reward" class="form-control"
                                               placeholder="" readonly>
                                    </div>
                                </div>

                                <!--未发比例-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">租房未发金额</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="insightful_r" class="form-control"
                                               placeholder="" readonly>
                                    </div>
                                </div>
                                <hr>

                                <!--行政扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">行政扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(3)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 3"></i>
                                        <input type="text" v-model="admin_money" class="form-control"
                                               placeholder="">
                                        <div>{{admin_money_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 3">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="admin_money_b">
                                    </div>
                                </div>
                                <hr>

                                <!--社保扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">社保扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(5)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 5"></i>
                                        <input type="text" v-model="social_money" class="form-control" placeholder="">
                                        <div>{{social_money_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 5">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="social_money_b">
                                    </div>
                                </div>
                                <hr>

                                <!--其他扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">其他扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(6)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 6"></i>
                                        <input type="text" v-model="other_money" class="form-control" placeholder="">
                                        <div>{{other_money_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 6">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="other_money_b">
                                    </div>
                                </div>
                                <hr>

                                <!--财务扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">财务扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(7)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 7"></i>
                                        <input type="text" v-model="finance_money" class="form-control" placeholder="">
                                        <div>{{finance_money_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 7">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="finance_money_b">
                                    </div>
                                </div>
                                <hr>

                                <!--住宿扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">住宿扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(8)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 8"></i>
                                        <input type="text" v-model="stay_money" class="form-control" placeholder="">
                                        <div>{{stay_money_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 8">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="stay_money_b">
                                    </div>
                                </div>
                                <hr>

                                <!--购车扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">购车扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(9)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 9"></i>
                                        <input type="text" v-model="car_money" class="form-control" placeholder="">
                                        <div>{{car_money_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 9">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="car_money_b">
                                    </div>
                                </div>
                                <hr>

                                <!--应发工资-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">应发工资</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="should_money" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--实发工资-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">实发工资</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="reality_money" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <hr>

                                <!--备注-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control" v-model="remarks"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" type="button">取消</button>
                            <button class="btn btn-primary" type="button" @click="remark_ok()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Status :state="info"></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default {
            props: ['salaryBar', 'msg'],
        components: {Status},
        data (){
            return {
                salaryBar_id: '',
                dict: {},
                remark_status: '',
                staff_name: '',                     //签约人
                department_name: '',                //部门名称
                set_meal: '',                       //套餐类型
                base_pay: '',                       //底薪
                achievement_up: '',                 //业绩提成
                collect_reward: '',                 //收房奖励
                insightful_c: '',                   //未发比例
                rent_reward: '',                    //租房奖励
                insightful_r: '',                   //未发比例
                admin_money: '',                    //行政扣款
                admin_money_b: '',                  //行政扣款备注
                social_money: '',                   //社保扣款
                social_money_b: '',                 //社保扣款备注
                finance_money: '',                  //财务扣款
                finance_money_b: '',                //财务扣款备注
                stay_money: '',                     //住宿扣款
                stay_money_b: '',                   //住宿扣款备注
                car_money: '',                      //购车扣款
                car_money_b: '',                    //购车扣款备注
                other_money: '',                    //其他扣款
                other_money_b: '',                  //其他扣款备注
                should_money: '',                   //应发工资
                reality_money: '',                  //实发工资
                remarks: '',                        //备注
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
        watch: {
            msg (val){
                this.dict = val;
            },
            salaryBar (val){
                this.salaryBar_id = val.id;
                this.staff_name = val.staff_name;                           //签约人
                if(val.department !== null){
                    this.department_name = val.department.name;                 //部门名称
                }
                this.set_meal = val.package;                                //套餐类型
                this.base_pay = val.base;                                   //底薪
                this.achievement_up = val.commission;                       //业绩提成
                this.collect_reward = val.bonus_collect;                    //收房奖励
                this.insightful_c = val.collect_remain;                     //收房未发金额
                this.rent_reward = val.bonus_rent;                          //租房奖励
                this.insightful_r = val.rent_remain;                        //租房未发金额
                this.admin_money = val.amount_admin_deduction;              //行政扣款
                this.admin_money_b = val.remark_admin_deduction;            //行政扣款备注
                this.social_money = val.amount_soc_secu_deduction;          //社保扣款
                this.social_money_b = val.remark_soc_secu_deduction;        //社保扣款备注
                this.finance_money = val.amount_finance_deduction;          //财务扣款
                this.finance_money_b = val.remark_finance_deduction;        //财务扣款备注
                this.stay_money = val.amount_accomm_deduction;              //住宿扣款
                this.stay_money_b = val.remark_accomm_deduction;            //住宿扣款备注
                this.car_money = val.amount_car_deduction;                  //购车扣款
                this.car_money_b = val.remark_car_deduction;                //购车扣款备注
                this.other_money = val.amount_other_deduction;              //其他扣款
                this.other_money_b = val.remark_other_deduction;            //其他扣款备注
                this.should_money = val.amount_due;                         //应发工资
                this.reality_money = val.amount_actual;                     //实发工资
                this.remarks = val.remark;                                  //备注
                this.salary_create();
            }
        },
        methods: {
//            底薪
            salary_create (){
                this.base_pay = this.dict.package_amount[this.set_meal];
            },
//            确定编辑
            remark_ok (){
                this.$http.put('salary/edit/' + this.salaryBar_id, {
                    package: this.set_meal,                                 //套餐类型
                    base: this.base_pay,                                    //底薪
                    commission: this.achievement_up,                        //业绩提成
                    bonus_collect: this.collect_reward,                     //收房奖励
                    collect_remain: this.insightful_c,                        //收房未发金额
                    bonus_rent: this.rent_reward,                           //租房奖励
                    rent_remain: this.insightful_r,                        //租房未发金额
                    amount_admin_deduction: this.admin_money,               //行政扣款
                    remark_admin_deduction: this.admin_money_b,             //行政扣款备注
                    amount_soc_secu_deduction: this.social_money,           //社保扣款
                    remark_soc_secu_deduction: this.social_money_b,         //社保扣款备注
                    amount_finance_deduction: this.finance_money,           //财务扣款
                    remark_finance_deduction: this.finance_money_b,         //财务扣款备注
                    amount_accomm_deduction: this.stay_money,               //住宿扣款
                    remark_accomm_deduction: this.stay_money_b,             //住宿扣款备注
                    amount_car_deduction: this.car_money,                   //购车扣款
                    remark_car_deduction: this.car_money_b,                 //购车扣款备注
                    amount_other_deduction: this.other_money,               //其他扣款
                    remark_other_deduction: this.other_money_b,             //其他扣款备注
                    amount_due: this.should_money,                          //应发工资
                    amount_actual: this.reality_money,                      //实发工资
                    remark: this.remarks,                                   //备注
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.$emit('success');
                        this.close_remark();
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },

//            备注按钮
            remark_s (val){
                this.remark_status = val;
            },

//            关闭模态框
            close_remark (){
                $('#personalModel').modal('hide');          //成功关闭模态框
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
//            清空备注
//            clear_remark (){
//                this.remark_status = '';
//                this.staff_name = '';                       //姓名
//                this.department_id = '';                    //部门ID
//                this.department_name = '';                  //部门名称
//                this.position = '';                         //职位
//                this.set_meal = '';                         //套餐类型
//                this.base_pay = '';                         //底薪
//                this.achievement_up = '';                   //业绩提成
//                this.collect_reward = '';                   //收房奖励
//                this.insightful_c = '';                     //未发比例
//                this.rent_reward = '';                      //租房奖励
//                this.insightful_r = '';                     //未发比例
//                this.admin_money = '';                      //行政扣款
//                this.admin_money_b = '';                    //行政扣款备注
//                this.social_money = '';                     //社保扣款
//                this.social_money_b = '';                   //社保扣款备注
//                this.finance_money = '';                    //财务扣款
//                this.finance_money_b = '';                  //财务扣款备注
//                this.stay_money = '';                       //住宿扣款
//                this.stay_money_b = '';                     //住宿扣款备注
//                this.car_money = '';                        //购车扣款
//                this.car_money_b = '';                      //购车扣款备注
//                this.other_money = '';                      //其他扣款
//                this.other_money_b = '';                    //其他扣款备注
//                this.should_money = '';                     //应发工资
//                this.reality_money = '';                    //实发工资
//                this.remarks = '';                          //备注
//            }
        }
    }
</script>


<style scoped>
    .col-lg-10.iconic-input.right {
        word-break: break-all;
    }

    .col-lg-10.iconic-input.right div {
        margin-top: 6px;
        color: #AFAFAF;
    }

    .form-group {
        margin-bottom: 22px;
    }

    label.control-label.col-lg-2.col-sm-2, .form-group {
        padding-right: 0;
    }

    .form-control {
        margin-bottom: 0;
    }

    i.fa.fa-check-square, i.fa.fa-square-o {
        right: 28px;
        color: #000;
        font-size: 20px
    }

    hr {
        border-top-color: #CECECE;
    }
</style>
