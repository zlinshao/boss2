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
                            <button type="button" class="close" @click="close_remark" aria-hidden="true">×</button>
                            <h4 class="modal-title">编辑</h4>
                        </div>

                        <!--/编辑-->
                        <div class="modal-body has-js">
                            <form class="form-horizontal" role="form">

                                <!--合同编号-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">合同编号</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="contract_num" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--客户姓名-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="customer_name" class="form-control" placeholder=""
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
                                        <input type="text" v-model="vacant_period" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--价格差奖励-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">价格差奖励</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="price_gap" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--业绩提成-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">业绩提成</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="achievement_up" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                                <!--合同-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">合同</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="contract" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--资料-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">资料</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="datum" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--交接-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">交接</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="connect" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--客诉-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客诉</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="complaints" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--尾款-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尾款</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="final_payment" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--中介费-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">中介费</label>
                                    <div class="col-lg-10 iconic-input right">
                                        <input type="text" v-model="brokerage_fee" class="form-control" placeholder="">
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
                                        <input type="text" v-model="remarks" class="form-control" placeholder="">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" type="button" @click="close_remark">取消</button>
                            <button class="btn btn-primary" type="button" @click="remark_ok">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [''],
        data (){
            return {
                contract_num: '',                   //合同编号
                customer_name: '',                  //客户姓名
                house_address: '',                  //房屋地址
                staff_name: '',                     //开单人
                vacant_period: '',                  //空置期奖励
                price_gap: '',                      //价格差奖励
                achievement_up: '',                 //业绩提成
                contract: '',                       //合同
                datum: '',                          //资料
                connect: '',                        //交接
                complaints: '',                     //客诉
                final_payment: '',                  //尾款
                brokerage_fee: '',                  //中介费
                in_all: '',                         //共计
                remarks: '',                        //备注
            }
        },
        methods: {
//            确认编辑
            remark_ok (){
                this.$http.post('http://httpbin.org', {
                    a: this.contract_num,           //合同编号
                    a: this.customer_name,          //客户姓名
                    a: this.house_address,          //房屋地址
                    a: this.staff_name,             //开单人
                    a: this.vacant_period,          //空置期奖励
                    a: this.price_gap,              //价格差奖励
                    a: this.achievement_up,         //业绩提成
                    a: this.contract,               //合同
                    a: this.datum,                  //资料
                    a: this.connect,                //交接
                    a: this.complaints,             //客诉
                    a: this.final_payment,          //尾款
                    a: this.brokerage_fee,          //中介费
                    a: this.in_all,                 //共计
                    a: this.remarks,                //备注
                }).then((res) => {

                })
            },

//            关闭模态框
            close_remark (){
                this.clear_remark();
                $('#detailRevise').modal('hide');        //成功关闭模态框
            },

//            清空
            clear_remark (){
                this.contract_num = '';                   //合同编号
                this.customer_name = '';                  //客户姓名
                this.house_address = '';                  //房屋地址
                this.staff_name = '';                     //开单人
                this.vacant_period = '';                  //空置期奖励
                this.price_gap = '';                      //价格差奖励
                this.achievement_up = '';                 //业绩提成
                this.contract = '';                       //合同
                this.datum = '';                          //资料
                this.connect = '';                        //交接
                this.complaints = '';                     //客诉
                this.final_payment = '';                  //尾款
                this.brokerage_fee = '';                  //中介费
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
