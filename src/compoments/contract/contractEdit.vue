<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractEdit">
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
                                        <label class="col-sm-2 control-label col-lg-2" >业主姓名</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="customer_name"
                                                   readonly placeholder="业主姓名" @click="selectClient">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="villa_name"
                                                   readonly placeholder="房屋地址" @click="selectHouse">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同编号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="contractAdd.contract_num" placeholder="合同编号">
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
                                            <input @click="remindData" type="text" v-model="contractAdd.vac_start_date"
                                                   class="form-control form_datetime" value="" placeholder="空置期起始日期">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >空置期结束日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" v-model="contractAdd.vac_end_date"
                                                   class="form-control form_datetime" value="" placeholder="空置期结束日期">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同起始日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   v-model="contractAdd.start_date"  value="" placeholder="合同起始日期">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >合同结束日期</label>
                                        <div class="col-md-4">
                                            <input @click="remindData" type="text" class="form-control form_datetime"
                                                   v-model="contractAdd.end_date" placeholder="合同结束日期">
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
                                            <label class="checkbox-inline check"  @click="payMethods">
                                                <input type="checkbox" class="pull-left"
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
                                            <label class="checkbox-inline check"  @click="priceIncreases">
                                                <input type="checkbox" class="pull-left"
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
                                        <label class="col-lg-2 control-label">银行卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="bankPicId" @delete="picDelete" @complete="complete"
                                                     :result="'bankPic'" :idPhotos="bankPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">合同</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="contractPicId" @delete="picDelete" @complete="complete"
                                                     :result="'contractPic'" :idPhotos="contractPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">水卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="waterPicId" @delete="picDelete" @complete="complete"
                                                     :result="'waterPic'" :idPhotos="waterPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">电卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="elePicId" @delete="picDelete" @complete="complete"
                                                     :result="'elePic'" :idPhotos="elePic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">燃气卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="gasPicId" @delete="picDelete" @complete="complete"
                                                     :result="'gasPic'" :idPhotos="gasPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">交接单照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="handoverPicId" @delete="picDelete" @complete="complete"
                                                     :result="'handoverPic'" :idPhotos="handoverPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">委托书照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="proxyPicId" @delete="picDelete" @complete="complete"
                                                     :result="'proxyPic'" :idPhotos="proxyPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">押金收条</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="receiptPicId" @delete="picDelete" @complete="complete"
                                                     :result="'receiptPic'" :idPhotos="receiptPic"></up-load>
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
        <SelectClient @clientAdd="receiveClient"> </SelectClient>
        <SelectHouse @House="receiveHouse"> </SelectHouse>
    </div>
</template>
<script>
    import SelectClient from '../common/selectClient.vue'
    import SelectHouse from  '../common/selectHouse.vue'
    import upLoad from '../common/upload.vue'
    export default{
        components:{
            SelectClient,
            SelectHouse,
            upLoad
        },
        data(){
            return {
                complete_ok:'ok',
                bankPic : {
                    cus_idPhotos : {},    //银行卡照片id
                    cus_idPhoto : [],     //银行卡照片
                },
                contractPic : {
                    cus_idPhotos : {},    //合同图片ID
                    cus_idPhoto : [],     //合同照片
                },
                waterPic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                elePic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                gasPic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                proxyPic : {
                    cus_idPhotos : {},    //委托书图片ID
                    cus_idPhoto : [],     //围殴托书照片
                },
                handoverPic : {
                    cus_idPhotos : {},    //交接单图片ID
                    cus_idPhoto : [],     //交接单照片
                },
                receiptPic : {
                    cus_idPhotos : {},    //押金收条ID
                    cus_idPhoto : [],     //押金收条照片
                },
                payMethod:false,
                priceIncrease:false,
                customer_name:'',
                villa_name:'',
                contractAdd : {
                    customer_id:'',         //客户id
                    villa_id:'',            //房屋id
                    contract_num:'',        //合同编号
                    vac_start_date:'',      //空置期开始日期
                    vac_end_date:'',        //空置期结束日期
                    start_date:'',          //合同开始日期
                    end_date:'',            //合同结束日期
                    pay_date:'',            //打房租日期
                    complete_date:'',       //资料补齐时间
                    bank_pic:[],            //银行卡照片
                    contract_pic:[],        //合同照片
                    water_card_pic:[],      //水卡照片
                    elec_card_pic:[],       //电卡照片
                    gas_card_pic:[],        //燃气卡卡照片
                    proxy_pic:[],           //委托书照片
                    handover_pic:[],        //交接单照片
                    receipt_pic:[],         //押金收条
                }

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
                })
            },
            payMethods(){
                this.payMethod=!this.payMethod;
            },
            priceIncreases(){
                this.priceIncrease=!this.priceIncrease;
            },
            selectClient(){         //选择业主姓名
                $('#selectClient').modal('show');
            },
            receiveClient(val){     //接收业主id
                this.contractAdd.customer_id = val.id;
                this.customer_name = val.name;
            },
            selectHouse(){          //选择房屋地址
                $('#selectHouse').modal('show');
            },
            receiveHouse(val){     //接收房屋地址id
                this.contractAdd.villa_id = val.id;
                this.villa_name = val.address;
            },

            //获取图片id
            bankPicId(val){         //获取成功上传银行卡 id 数组
                this.contractAdd.bank_pic = val;
            },
            contractPicId(val){     //获取成功上传合同 id 数组
                this.contractAdd.contract_pic = val;
            },
            waterPicId(val){        //获取成功上传水卡 id 数组
                this.contractAdd.water_card_pic = val;
            },
            elePicId(val){          //获取成功上传电卡 id 数组
                this.contractAdd.elec_card_pic = val;
            },
            gasPicId(val){          //获取成功上传燃气卡 id 数组
                this.contractAdd.gas_card_pic = val;
            },
            proxyPicId(val){        //获取成功上传委托书卡 id 数组
                this.contractAdd.proxy_pic = val;
            },
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractAdd.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传押金收条 id 数组
                this.contractAdd.receipt_pic = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let bank = this.bankPic.cus_idPhoto.indexOf(val);
                if (bank > -1) {
                    this.bankPic.cus_idPhoto.splice(bank, 1);
                }
                let contract = this.contractPic.cus_idPhoto.indexOf(val);
                if (contract > -1) {
                    this.contractPic.cus_idPhoto.splice(contract, 1);
                }
                let water = this.waterPic.cus_idPhoto.indexOf(val);
                if (water > -1) {
                    this.waterPic.cus_idPhoto.splice(water, 1);
                }
                let ele = this.elePic.cus_idPhoto.indexOf(val);
                if (ele > -1) {
                    this.elePic.cus_idPhoto.splice(ele, 1);
                }
                let gas = this.gasPic.cus_idPhoto.indexOf(val);
                if (gas > -1) {
                    this.gasPic.cus_idPhoto.splice(gas, 1);
                }
                let proxy = this.proxyPic.cus_idPhoto.indexOf(val);
                if (proxy > -1) {
                    this.proxy.cus_idPhoto.splice(proxy, 1);
                }
                let handover = this.handoverPic.cus_idPhoto.indexOf(val);
                if (handover > -1) {
                    this.handoverPic.cus_idPhoto.splice(handover, 1);
                }
                let receipt = this.receiptPic.cus_idPhoto.indexOf(val);
                if (receipt > -1) {
                    this.receiptPic.cus_idPhoto.splice(receipt, 1);
                }
            },
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