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
                            <button type="button" class="close" @click="close_remark" aria-hidden="true">×</button>
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

                                <!--职位-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">职位</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="position" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--底薪-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">底薪</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(1)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 1"></i>
                                        <input type="text" v-model="base_pay" class="form-control" placeholder="">
                                        <div>{{base_pay_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 1">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="base_pay_b">
                                    </div>
                                </div>
                                <hr>

                                <!--补助-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">补助</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(2)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 2"></i>
                                        <input type="text" v-model="subsidy" class="form-control" placeholder="">
                                        <div>{{subsidy_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 2">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="subsidy_b">
                                    </div>
                                </div>
                                <hr>

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
                                    <label class="col-lg-2 col-sm-2 control-label">未发比例</label>
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
                                    <label class="col-lg-2 col-sm-2 control-label">未发比例</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="insightful_r" class="form-control"
                                               placeholder="" readonly>
                                    </div>
                                </div>
                                <hr>

                                <!--迟到扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">迟到扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(4)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 4"></i>
                                        <input type="text" v-model="come_late" class="form-control"
                                               placeholder="">
                                        <div>{{come_late_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 4">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="come_late_b">
                                    </div>
                                </div>
                                <hr>

                                <!--事假扣款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">事假扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(5)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 5"></i>
                                        <input type="text" v-model="com_leave" class="form-control" placeholder="">
                                        <div>{{com_leave_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 5">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="com_leave_b">
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
                                        <input type="text" v-model="other_withhold" class="form-control" placeholder="">
                                        <div>{{other_withhold_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 6">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="other_withhold_b">
                                    </div>
                                </div>
                                <hr>

                                <!--套餐类型-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">套餐类型</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(7)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 7"></i>
                                        <select v-model="set_meal" class="form-control">
                                            <option value="1">鸡腿包</option>
                                            <option value="2">梦想包</option>
                                        </select>
                                        <div>{{set_meal_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 7">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="set_meal_b">
                                    </div>
                                </div>
                                <hr>

                                <!--应发工资-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">应发工资</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="should_money" class="form-control" placeholder="" readonly>
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
                            <button class="btn btn-default" type="button" @click="close_remark">取消</button>
                            <button class="btn btn-primary" type="button" @click="remark_ok()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                remark_status: '',
                staff_name: '',                     //姓名
                department_id: '',                  //部门ID
                department_name: '',                //部门名称
                position: '',                       //职位
                base_pay: '',                       //底薪
                base_pay_b: '',                     //底薪备注
                subsidy: '',                        //补助
                subsidy_b: '',                      //补助备注
                achievement_up: '',                 //业绩提成
                collect_reward: '',                 //收房奖励
                insightful_c: '',                   //未发比例
                rent_reward: '',                    //租房奖励
                insightful_r: '',                   //未发比例
                come_late: '',                      //迟到扣款
                come_late_b: '',                    //迟到扣款备注
                com_leave: '',                      //事假扣款
                com_leave_b: '',                    //事假扣款备注
                other_withhold: '',                 //其他扣款
                other_withhold_b: '',               //其他扣款备注
                set_meal: 1,                        //套餐类型
                set_meal_b: '',                     //套餐类型备注
                should_money: '',                   //应发工资
                reality_money: '',                  //实发工资
                remarks: '',                        //备注
            }
        },
        methods: {
//            确定编辑
            remark_ok (){
                this.$http.post('http://httpbin.org', {
                    a: this.staff_name,                 //姓名
                    a: this.department_name,            //部门ID
                    a: this.department_id,              //部门名称
                    a: this.position,                   //职位
                    a: this.base_pay_b,                 //底薪备注
                    a: this.base_pay,                   //底薪
                    a: this.subsidy_b,                  //补助备注
                    a: this.subsidy,                    //补助
                    a: this.achievement_up,             //业绩提成
                    a: this.collect_reward,             //收房奖励
                    a: this.insightful_c,               //未发比例
                    a: this.rent_reward,                //租房奖励
                    a: this.insightful_r,               //未发比例
                    a: this.come_late_b,                //迟到扣款备注
                    a: this.come_late,                  //迟到扣款
                    a: this.com_leave_b,                //事假扣款备注
                    a: this.com_leave,                  //事假扣款
                    a: this.other_withhold_b,           //其他扣款备注
                    a: this.other_withhold,             //其他扣款
                    a: this.set_meal_b,                 //套餐类型备注
                    a: this.set_meal,                   //套餐类型
                    a: this.should_money,               //应发工资
                    a: this.reality_money,              //实发工资
                    a: this.remarks,                    //备注
                }).then((res) => {

                })
            },

//            备注按钮
            remark_s (val){
                this.remark_status = val;
            },

//            关闭模态框
            close_remark (){
                this.clear_remark();
                $('#personalModel').modal('hide');          //成功关闭模态框
            },

//            清空备注
            clear_remark (){
                this.remark_status = '';
                this.staff_name = '';                       //姓名
                this.department_id = '';                    //部门ID
                this.department_name = '';                  //部门名称
                this.position = '';                         //职位
                this.base_pay = '';                         //底薪
                this.base_pay_b = '';                       //底薪备注
                this.subsidy = '';                          //补助
                this.subsidy_b = '';                        //补助备注
                this.achievement_up = '';                   //业绩提成
                this.collect_reward = '';                   //收房奖励
                this.insightful_c = '';                     //未发比例
                this.rent_reward = '';                      //租房奖励
                this.insightful_r = '';                     //未发比例
                this.come_late = '';                        //迟到扣款
                this.come_late_b = '';                      //迟到扣款备注
                this.com_leave = '';                        //事假扣款
                this.com_leave_b = '';                      //事假扣款备注
                this.other_withhold = '';                   //其他扣款
                this.other_withhold_b = '';                 //其他扣款备注
                this.set_meal = 1;                          //套餐类型
                this.set_meal_b = '';                       //套餐类型备注
                this.should_money = '';                     //应发工资
                this.reality_money = '';                    //实发工资
                this.remarks = '';                          //备注
            }
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
