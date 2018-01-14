<template>
    <div>
        <!--炸单-->
        <div role="dialog" class="modal fade bs-example-modal-sm has-js" id="friedBill">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body roll">
                        <div v-for="(key,index) in data" class="clearfix history">
                            <div class="form-group col-xs-9 padd0">
                                <label class="col-sm-4 control-label">报备时间：</label>
                                <div class="col-lg-8">{{bulletinDate}}2017-01-01</div>
                            </div>

                            <div class="form-group col-xs-3 padd0" v-if="index == 0">
                                <div class="text-primary">历史记录</div>
                            </div>

                            <div class="form-group col-xs-12 padd0" v-if="title == '炸单详情'||title == '充公详情'">
                                <label class="col-lg-2 col-sm-2 control-label" v-if="title == '炸单详情'">备注：</label>
                                <label class="col-lg-2 col-sm-2 control-label" v-if="title == '充公详情'">充公原因：</label>
                                <div class="col-lg-10">
                                    {{remarks}} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequuntur cum
                                </div>
                            </div>

                            <div class="form-group col-sm-6 padd0" v-if="title == '款项详情'">
                                <label class="col-sm-4 control-label">款项类型：</label>
                                <div class="col-lg-8">{{fundType}}</div>
                            </div>

                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label" v-if="title != '调房详情'">退款金额：</label>
                                <label class="col-sm-4 control-label" v-if="title == '调房详情'">原地址：</label>
                                <div class="col-lg-8">{{drawbackPrice}}</div>
                            </div>

                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label" v-if="title != '调房详情'">退款方式：</label>
                                <label class="col-sm-4 control-label width41" v-if="title == '调房详情'">原签约时长：</label>
                                <div class="col-lg-8">{{drawback}}</div>
                            </div>

                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label" v-if="title != '调房详情'">收款银行：</label>
                                <label class="col-sm-4 control-label width41" v-if="title == '调房详情'">原付款方式：</label>
                                <div class="col-lg-8">{{bank}}</div>
                            </div>

                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label" style="width: 41%;"
                                       v-if="title != '调房详情'">收款人户名：</label>
                                <label class="col-sm-4 control-label" style="width: 41%;"
                                       v-if="title == '调房详情'">原月单价：</label>
                                <div class="col-lg-8">{{accountName}}</div>
                            </div>

                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label" v-if="title != '调房详情'">账户：</label>
                                <label class="col-sm-4 control-label width41" v-if="title == '调房详情'">尾款补齐时间：</label>
                                <div class="col-lg-8">{{account}}</div>
                            </div>

                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label" v-if="title != '调房详情'">报备人：</label>
                                <label class="col-sm-4 control-label width41" v-if="title == '调房详情'">原定金/全款：</label>
                                <div class="col-lg-8">{{staff_name}}</div>
                            </div>

                            <!--调房详情-->
                            <div class="form-group col-xs-12 padd0" v-if="title == '调房详情'">
                                <label class="col-sm-2 control-label">备注：</label>
                                <div class="col-lg-10">
                                    {{remarks}} Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Consectetur consequuntur cum
                                </div>
                            </div>
                            <div class="form-group col-sm-6 padd0" v-if="title == '调房详情'">
                                <label class="col-sm-4 control-label">原签约人：</label>
                                <div class="col-lg-8">{{oldContract}}</div>
                            </div>
                            <div class="form-group col-sm-6 padd0" v-if="title == '调房详情'">
                                <label class="col-sm-4 control-label">原报备人：</label>
                                <div class="col-lg-8">{{oldBulletin}}</div>
                            </div>


                            <div class="form-group col-sm-6 padd0">
                                <label class="col-sm-4 control-label">所属部门：</label>
                                <div class="col-lg-8">{{department_name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <!--<button data-dismiss="modal" class="btn btn-default btn-md">取消</button>-->
                        <button data-dismiss="modal" class="btn btn-primary btn-md">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['dict', 'title'],
//        watch: {
//            title (){
//                this.bulletinDate = '';           //报备时间
//                this.fundType = '';               //款项类型
//                this.remarks = '';                //备注/充公原因
//                this.drawbackPrice = '';          //退款金额 / 原地址
//                this.drawback = '';               //退款方式 / 原签约时长
//                this.bank = '';                   //收款银行 / 原付款方式
//                this.accountName = '';            //收款人户名 / 原月单价
//                this.account = '';                //账户 / 尾款补齐时间
//                this.staff_name = '';             //报备人 / 原定金/全款
//                this.department_name = '';        //所属部门
//                this.oldContract = '';            //原签约人
//                this.oldBulletin = '';            //原报备人
//            }
//        },
        data(){
            return {
                data: ['1'],
                bulletinDate: '',           //报备时间
                fundType: '',               //款项类型
                remarks: '',                //备注/充公原因
                drawbackPrice: '',          //退款金额 / 原地址
                drawback: '',               //退款方式 / 原签约时长
                bank: '',                   //收款银行 / 原付款方式
                accountName: '',            //收款人户名 / 原月单价
                account: '',                //账户 / 尾款补齐时间
                staff_name: '',             //报备人 / 原定金/全款
                department_name: '',        //所属部门

                oldContract: '',            //原签约人
                oldBulletin: '',            //原报备人
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .modal-body {
        max-height: 500px;
        overflow: auto;
    }

    .form-group {
        display: flex;
        display: -webkit-flex;
        align-items: center;
    }

    .form-group input, .form-group select, .form-group label {
        margin-bottom: 0;
    }

    .text-primary {
        width: 100%;
        text-align: right;
        cursor: pointer;
    }

    .form-group {
        margin-bottom: 18px;
    }

    .history {
        border-bottom: 1px solid #CCCCCC;
        margin-bottom: 16px;
    }

    .history:last-of-type {
        border: 0;
        margin-bottom: 0;
    }

    .padd0 {
        padding: 0;
    }

    .width41 {
        width: 41%;
    }
</style>
