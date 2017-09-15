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
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(3)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 3"></i>
                                        <input type="text" v-model="achievement_up" class="form-control"
                                               placeholder="">
                                        <div>{{achievement_up_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 3">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="achievement_up_b">
                                    </div>
                                </div>
                                <hr>

                                <!--空置期奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">空置期奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(4)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 4"></i>
                                        <input type="text" v-model="vacant_period" class="form-control"
                                               placeholder="">
                                        <div>{{vacant_period_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 4">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder=""
                                               v-model="vacant_period_b">
                                    </div>
                                </div>
                                <hr>

                                <!--价格差奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">价格差奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(5)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 5"></i>
                                        <input type="text" v-model="price_gap" class="form-control" placeholder="">
                                        <div>{{price_gap_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 5">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="price_gap_b">
                                    </div>
                                </div>
                                <hr>

                                <!--年限奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">年限奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <i class="fa fa-square-o" @click="remark_s(6)"></i>
                                        <i class="fa fa-check-square" @click="remark_s(0)"
                                           v-if="remark_status == 6"></i>
                                        <input type="text" v-model="year_reward" class="form-control" placeholder="">
                                        <div>{{year_reward_b}}</div>
                                    </div>
                                </div>

                                <!--备注-->
                                <div class="form-group" v-if="remark_status == 6">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="" v-model="year_reward_b">
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
                                        <input type="text" v-model="set_meal" class="form-control" placeholder="">
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

                                <!--共计-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">共计</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="in_all" class="form-control" placeholder="">
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
                achievement_up_b: '',               //业绩提成备注
                vacant_period: '',                  //空置期奖励
                vacant_period_b: '',                //空置期奖励备注
                price_gap: '',                      //价格差奖励
                price_gap_b: '',                    //价格差奖励备注
                year_reward: '',                    //年限奖励
                year_reward_b: '',                  //年限奖励备注
                set_meal: '',                       //套餐类型
                set_meal_b: '',                     //套餐类型备注
                in_all: '',                         //共计
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
                    a: this.achievement_up_b,           //业绩提成备注
                    a: this.achievement_up,             //业绩提成
                    a: this.vacant_period_b,            //空置期奖励备注
                    a: this.vacant_period,              //空置期奖励
                    a: this.price_gap_b,                //价格差奖励备注
                    a: this.price_gap,                  //价格差奖励
                    a: this.year_reward_b,              //年限奖励备注
                    a: this.year_reward,                //年限奖励
                    a: this.set_meal_b,                 //套餐类型备注
                    a: this.set_meal,                   //套餐类型
                    a: this.in_all,                     //共计
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
                this.staff_name = '';                     //姓名
                this.department_id = '';                  //部门ID
                this.department_name = '';                //部门名称
                this.position = '';                       //职位
                this.base_pay = '';                       //底薪
                this.base_pay_b = '';                     //底薪备注
                this.subsidy = '';                        //补助
                this.subsidy_b = '';                      //补助备注
                this.achievement_up = '';                 //业绩提成
                this.achievement_up_b = '';               //业绩提成备注
                this.vacant_period = '';                  //空置期奖励
                this.vacant_period_b = '';                //空置期奖励备注
                this.price_gap = '';                      //价格差奖励
                this.price_gap_b = '';                    //价格差奖励备注
                this.year_reward = '';                    //年限奖励
                this.year_reward_b = '';                  //年限奖励备注
                this.set_meal = '';                       //套餐类型
                this.set_meal_b = '';                     //套餐类型备注
                this.in_all = '';                         //共计
                this.remarks = '';                        //备注
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
        right: 24px;
        color: #000;
        font-size: 20px
    }

    hr {
        border-top-color: #CECECE;
    }
</style>
