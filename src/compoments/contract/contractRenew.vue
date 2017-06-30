<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractRenew">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑合同</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3 style="margin-top: -15px">基本信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >原合同编号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" disabled placeholder="原合同编号">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >业主姓名</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="业主姓名" >
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="房屋地址">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同编号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="合同编号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >年限</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="年限">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >空置期（天）</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="空置期">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >空置期起始日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   value="" placeholder="空置期起始日期">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >空置期结束日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   value="" placeholder="空置期结束日期">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同起始日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   value="" placeholder="合同起始日期">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >合同结束日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   value="" placeholder="合同结束日期">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >付款方式</label>
                                        <div class="col-lg-8">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-2">
                                            <label class="checkbox-inline check"  @click="payMethod">
                                                <input type="checkbox" class="pull-left" v-model="payMethod"
                                                       value="1"> 变化
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row" v-if="payMethod">
                                        <label class="col-sm-2 control-label col-lg-2" >第一年</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >第二年</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >第三年</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >第四年</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >月单价</label>
                                        <div class="col-lg-8">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                                <option>支付宝</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-2">
                                            <label class="checkbox-inline check"  @click="priceIncrease">
                                                <input type="checkbox" class="pull-left" v-model="priceIncrease"
                                                       value="1"> 递增
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row" v-if="priceIncrease">
                                        <label class="col-sm-2 control-label col-lg-2" >第一年</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="第一年">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >第二年</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="第二年">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >第三年</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="第三年">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >第四年</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="第四年">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >打房租日期</label>
                                        <label class="col-sm-1 control-label col-lg-1" >每</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="">
                                        </div>
                                        <label class="col-sm-1 control-label col-lg-1" >号</label>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >打款类型</label>
                                        <div class="col-lg-10">
                                            <select  class="form-control">
                                                <option value="">请选择</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >银行卡号</label>
                                            <div class="col-lg-4">
                                                <select  class="form-control">
                                                    <option value="">请选择</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-2 control-label col-lg-2" >支行</label>
                                            <div class="col-lg-4">
                                                <input type="text" class="form-control" placeholder="支行">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >银行卡号</label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder="银行卡号">
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="false">
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >支付宝姓名</label>
                                            <div class="col-lg-4">
                                                <input type="text" class="form-control" placeholder="支付宝姓名">

                                            </div>
                                            <label class="col-sm-2 control-label col-lg-2" >支付宝号</label>
                                            <div class="col-lg-4">
                                                <input type="text" class="form-control" placeholder="支付宝账号">
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="false">
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >微信账号</label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder="微信账号">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >
                                            收条编号<span class="require">*</span>
                                        </label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="收条编号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >中介名称</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="中介名称">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >中介费用</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder="中介费用">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >打房租日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   value="" placeholder="打房租日期">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" placeholder="备注">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >开单人</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" disabled placeholder="开单人">
                                        </div>
                                    </div>
                                    <hr>
                                    <h3>合同附件</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同照片</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control"  placeholder="合同照片">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">新增</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                payMethod:false,
                priceIncrease:false,
            }
        },
        updated (){
//            时间选择
            this.remindData();
        },
        watch : {

        },
        methods : {
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                })
            },
            payMethod(){
                this.payMethod=!this.payMethod;
            },
            priceIncrease(){
                this.priceIncrease=this.priceIncrease;
            }
        }
    }
</script>
<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 5px;
        width: 17px;
        height: 17px;
    }
    .check {
        display: inline-block;
        padding: 5px 0;
        font-size: 14px;
        margin-top: 2px;
    }
</style>