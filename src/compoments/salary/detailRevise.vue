<template>
    <div>
        <!--个人工资编辑-->
        <div class="modal fade full-width-modal-right" id="detailRevise" tabindex="-1" role="dialog"
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

                                <!--收租状态-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">收租状态</label>
                                    <div class="col-lg-10" v-for="key in col_rent_status">
                                        <input type="text" :value="dict.typical[key]"
                                               class="form-control" placeholder="" readonly>
                                    </div>
                                </div>

                                <!--月份-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">月份</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="months" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--房屋地址-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋地址</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="house_address" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--开单人-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">开单人</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="staff_name" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--空置期奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">空置期奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="vacant_period" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>

                                <!--收房付款方式奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">收房付款方式奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="col_pay_reward" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>

                                <!--收房年限奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">收房年限奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="year_period" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>

                                <!--价格差奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">价格差奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="price_gap" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>

                                <!--业绩提成-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">业绩提成</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="achievement_up" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">保修期奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="bonus_warrenty" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">年限(涨价)扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="punish_year" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">空置期扣款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="punish_vacancy" class="form-control" placeholder=""
                                               @blur="allMoney">
                                    </div>
                                </div>

                                <!--未发比例-->
                                <!--<div class="form-group">-->
                                <!--<label class="col-lg-2 col-sm-2 control-label">未发比例</label>-->
                                <!--<div class="col-lg-10 iconic-input right">-->
                                <!--<input type="text" v-model="not_send_scale" class="form-control" placeholder=""-->
                                <!--readonly>-->
                                <!--</div>-->
                                <!--</div>-->

                                <!--<div class="form-group" v-for="key in cells">-->
                                <!--<label class="col-lg-2 col-sm-2 control-label">{{dict.cell_category[key.category]}}</label>-->
                                <!--<div class="col-lg-10 iconic-input right">-->
                                <!--<input type="text" v-model="key.amount_actual" class="form-control"-->
                                <!--:disabled="key.status == 1"-->
                                <!--placeholder="">-->
                                <!--</div>-->
                                <!--</div>-->

                                <!--中介费-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">中介费</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="brokerage_fee" class="form-control" placeholder=""
                                               @blur="allMoney" disabled>
                                    </div>
                                </div>

                                <!--共计-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">共计</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="in_all" class="form-control" placeholder="">
                                    </div>
                                </div>

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
                            <button class="btn btn-default" type="button" data-dismiss="modal">取消</button>
                            <button class="btn btn-primary" type="button" @click="remark_ok(cells)">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';              //提示信息
    export default {
        components: {Status},
        props: ['msg', 'dicts'],
        data (){
            return {
                punish_year: '',                    //年限(涨价)扣款
                punish_vacancy: '',                 //空置期扣款
                dict: {},
                col_rent_status: [],                //收租状态
                months: '',                         //月份
                house_address: '',                  //房屋地址
                staff_name: '',                     //开单人
                vacant_period: '',                  //空置期奖励
                col_pay_reward: '',                 //收房付款方式奖励
                year_period: '',                    //收房年限奖励
                price_gap: '',                      //价格差奖励
                achievement_up: '',                 //业绩提成
                bonus_warrenty: '',                 //保修期奖励
                not_send_scale: '',                 //未发比例
                cells: [],                          //合同、资料、交接、客诉、尾款
                contract: '',                       //合同
                datum: '',                          //资料
                connect: '',                        //交接
                complaints: '',                     //客诉
                final_payment: '',                  //尾款
                brokerage_fee: '',                  //中介费
                in_all: '',                         //共计
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
                this.col_rent_status = [];
                this.col_rent_status.push(val.typical);                //收租状态
                this.months = val.months;                         //月份
                this.house_address = val.address;                  //房屋地址
                this.staff_name = val.staff_name;                     //开单人
                this.vacant_period = val.bonus_vacancy;                  //空置期奖励
                this.col_pay_reward = val.bonus_pay_type;                 //收房付款方式奖励
                this.year_period = val.bonus_year;                          //收房年限奖励
                this.price_gap = val.bonus_price;                           //价格差奖励
                this.achievement_up = val.achv;                             //业绩提成
                this.bonus_warrenty = val.bonus_warrenty;                    //业绩提成
                this.not_send_scale = val.percentage_remain;                 //未发比例
                this.cells = val.simple_cells;
                this.contract = '';                       //合同
                this.datum = '';                          //资料
                this.connect = '';                        //交接
                this.complaints = '';                     //客诉
                this.final_payment = '';                  //尾款
                this.punish_year = val.punish_year;         //年限(涨价)扣款
                this.punish_vacancy = val.punish_vacancy;    //空置期扣款
                this.brokerage_fee = val.medi_cost;                  //中介费
                this.in_all = val.total_price;                     //共计
                this.remarks = val.remark;                        //备注
            },
            dicts (val){
                this.dict = val;
            }
        },
        methods: {
//            共计
            allMoney (){
                this.$http.post('achv/commission/calculate/' + this.msg.id, {
                    bonus_vacancy: this.vacant_period,            //空置期奖励,
                    bonus_pay_type: this.col_pay_reward,          //收房付款方式奖励,
                    bonus_price: this.price_gap,                  //价格差奖励,
                    bonus_year: this.year_period,                 //收房年限奖励,
                    achv: this.achievement_up,                    //业绩提成,
                    medi_cost: this.brokerage_fee,                //中介费,
                    punish_vacancy: this.punish_vacancy,          //空置期扣款,
                    punish_year: this.punish_year,                //年限(涨价)扣款,
                }).then((res) => {
                    if (res.data.code === '70011') {
                        this.errorMsg(res.data.msg);
                    } else {
                        this.in_all = res.data;
                    }
                });

            },
//            确认编辑
            remark_ok (val){
                let cell = {};
                for (let key in val) {
                    cell[val[key].id] = val[key].amount_actual
                }
                this.$http.put('achv/commission/' + this.msg.id, {
                    typical: this.col_rent_status,        //收租状态
                    months: this.months,                 //月份
                    address: this.house_address,          //房屋地址
                    staff_name: this.staff_name,             //开单人
                    bonus_vacancy: this.vacant_period,          //空置期奖励
                    bonus_pay_type: this.col_pay_reward,         //收房付款方式奖励
                    bonus_year: this.year_period,            //收房年限奖励
                    bonus_price: this.price_gap,              //价格差奖励
                    achv: this.achievement_up,                  //业绩提成
                    bonus_warrenty: this.bonus_warrenty,                  //业绩提成
                    punish_year: this.punish_year,                  //年限(涨价)扣款
                    punish_vacancy: this.punish_vacancy,                  //空置期扣款
//                    percentage_remain: this.not_send_scale,         //未发比例
//                    cells: cell,                            //合同、资料、交接、客诉、尾款
                    medi_cost: this.brokerage_fee,          //中介费
                    amount_actual: this.in_all,                 //共计
                    remark: this.remarks,                //备注
                }).then((res) => {
                    if (res.data.code === '70000') {
                        $('#detailRevise').modal('hide');        //成功关闭模态框
                        this.$emit('success_cells');
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

//            清空
//            clear_remark (){
//                this.col_rent_status = '';                //收租状态
//                this.months = '';                         //月份
//                this.house_address = '';                  //房屋地址
//                this.staff_name = '';                     //开单人
//                this.vacant_period = '';                  //空置期奖励
//                this.col_pay_reward = '';                 //收房付款方式奖励
//                this.price_gap = '';                      //价格差奖励
//                this.year_period = '';                    //收房年限奖励
//                this.achievement_up = '';                 //业绩提成
//                this.not_send_scale = '';                 //未发比例
//                this.contract = '';                       //合同
//                this.datum = '';                          //资料
//                this.connect = '';                        //交接
//                this.complaints = '';                     //客诉
//                this.final_payment = '';                  //尾款
//                this.brokerage_fee = '';                  //中介费
//                this.in_all = '';                         //共计
//                this.remarks = '';                        //备注
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
        right: 24px;
        color: #000;
        font-size: 20px
    }

    hr {
        border-top-color: #CECECE;
    }
</style>
