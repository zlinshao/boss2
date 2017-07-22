<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractEdit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑合同{{contractEdit.contract_pic}}</h4>
                    </div>
                    <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3 style="margin-top: -15px">基本信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="customer_name"
                                                   readonly placeholder="业主姓名" @click="selectClient">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同编号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="contractEdit.contract_num" placeholder="合同编号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >空置期日期</label>
                                        <div class="col-md-10" style="padding-left: 30px;margin-bottom: 18px">
                                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同日期</label>
                                        <div class="col-md-10" style="padding-left: 30px; margin-bottom: 18px">
                                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate1"></DatePicker>
                                        </div>
                                        <!--<div class="col-md-4">-->
                                            <!--<input @click="remindData" type="text" class="form-control form_datetime"-->
                                                   <!--v-model="contractEdit.start_date"  value="" placeholder="合同起始日期">-->
                                        <!--</div>-->
                                        <!--<label class="col-sm-2 control-label col-lg-2" >合同结束日期</label>-->
                                        <!--<div class="col-md-4">-->
                                            <!--<input @click="remindData" type="text" class="form-control form_datetime"-->
                                                   <!--v-model="contractEdit.end_date" placeholder="合同结束日期">-->
                                        <!--</div>-->
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
                                        <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" placeholder="备注">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >开单人</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="staff" disabled placeholder="开单人">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">编辑</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!--选择客户-->
        <SelectClient @clientAdd="receiveClient"> </SelectClient>
    </div>
</template>
<script>
    import DatePicker from '../common/datePicker.vue'
    import SelectClient from '../common/selectClient.vue'
    import SelectHouse from  '../common/selectHouse.vue'
    import upLoad from '../common/upload.vue'
    export default{
        props:['contractEitId','dictionary'],
        components:{
            SelectClient,
            upLoad,
            DatePicker
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
                customer_name:'',
                contractEdit : {
                    customer_id:'',         //客户id
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
                },
                staff:'',
                dateConfigure: [{range:true,needHour:false,position:'top-left'}],
                dateType:'',
                myDictionary:[],
                myContractEitId:'',

            }
        },
        mounted(){

        },
        watch : {
            dictionary(val){
                this.myDictionary = val;
            },
            contractEitId(val){
                this.myContractEitId = val;
                this.gitContractInfo();
            }
        },
        methods : {
            gitContractInfo(){
                if(this.myContractEitId !== ''){
                    this.$http.get('core/collect/readcontract/id/' +this.myContractEitId).then((res)=>{
                        let contractList =res.data.data;
                        this.contractEdit.contract_num = contractList.contract_num;
                        this.contractEdit.vac_start_date = contractList.vac_start_date;
                        this.contractEdit.vac_end_date = contractList.vac_end_date;
                        this.contractEdit.start_date = contractList.start_date;
                        this.contractEdit.end_date = contractList.end_date;
                        if(!Array.isArray(contractList.ablum)){
                            this.bankPic.cus_idPhotos = contractList.album.bank_pic;                    //修改图片ID
                            for (let i in this.bankPic.cus_idPhotos) {
                                this.bankPic.cus_idPhoto.push(i);
                                this.contractEdit.bank_pic.push(i);
                            }
                            this.contractPic.cus_idPhotos = contractList.album.contract_pic;                    //修改图片ID
                            for (let i in this.contractPic.cus_idPhotos) {
                                this.contractPic.cus_idPhoto.push(i);
                                this.contractEdit.contract_pic.push(i);
                            }
                            this.proxyPic.cus_idPhotos = contractList.album.proxy_pic;                    //修改图片ID
                            for (let i in this.proxyPic.cus_idPhotos) {
                                this.proxyPic.cus_idPhoto.push(i);
                                this.contractEdit.proxy_pic.push(i);
                            }
                            this.handoverPic.cus_idPhotos = contractList.album.handover_pic;                    //修改图片ID
                            for (let i in this.handoverPic.cus_idPhotos) {
                                this.handoverPic.cus_idPhoto.push(i);
                                this.contractEdit.handover_pic.push(i);
                            }
                            this.receiptPic.cus_idPhotos = contractList.album.receipt_pic;                    //修改图片ID
                            for (let i in this.receiptPic.cus_idPhotos) {
                                this.receiptPic.cus_idPhoto.push(i);
                                this.contractEdit.receipt_pic.push(i);
                            }
                        }
                        if(!Array.isArray(contractList.villa_id.ablum)){
                            this.waterPic.cus_idPhotos = contractList.album.water_card_pic;                    //修改图片ID
                            for (let i in this.waterPic.cus_idPhotos) {
                                this.waterPic.cus_idPhoto.push(i);
                                this.contractEdit.water_card_pic.push(i);
                            }
                            this.elePic.cus_idPhotos = contractList.album.elec_card_pic;                    //修改图片ID
                            for (let i in this.elePic.cus_idPhotos) {
                                this.elePic.cus_idPhoto.push(i);
                                this.contractEdit.elec_card_pic.push(i);
                            }
                            this.gasPic.cus_idPhotos = contractList.album.gas_card_pic;                    //修改图片ID
                            for (let i in this.gasPic.cus_idPhotos) {
                                this.gasPic.cus_idPhoto.push(i);
                                this.contractEdit.gas_card_pic.push(i);
                            }
                        }

                        this.staff = contractList.staff;

                    })
                }

            },
            getDate(val){
                console.log(val)
            },
            getDate1(val){
                console.log(val)
            },
            selectClient(){         //选择业主姓名
                $('#selectClient').modal('show');
            },
            receiveClient(val){     //接收业主id
                this.contractEdit.customer_id = val.id;
                this.customer_name = val.name;
            },

            //获取图片id
            bankPicId(val){         //获取成功上传银行卡 id 数组
                this.contractEdit.bank_pic = val;
            },
            contractPicId(val){     //获取成功上传合同 id 数组
                this.contractEdit.contract_pic = val;
            },
            waterPicId(val){        //获取成功上传水卡 id 数组
                this.contractEdit.water_card_pic = val;
            },
            elePicId(val){          //获取成功上传电卡 id 数组
                this.contractEdit.elec_card_pic = val;
            },
            gasPicId(val){          //获取成功上传燃气卡 id 数组
                this.contractEdit.gas_card_pic = val;
            },
            proxyPicId(val){        //获取成功上传委托书卡 id 数组
                this.contractEdit.proxy_pic = val;
            },
            handoverPicId(val){     //获取成功上传交接单 id 数组
                this.contractEdit.handover_pic = val;
            },
            receiptPicId(val){      //获取成功上传押金收条 id 数组
                this.contractEdit.receipt_pic = val;
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
                    this.contractEdit.bank_pic.splice(bank, 1);
                }
                let contract = this.contractPic.cus_idPhoto.indexOf(val);
                if (contract > -1) {
                    this.contractPic.cus_idPhoto.splice(contract, 1);
                    this.contractEdit.contract_pic.splice(contract, 1);
                }
                let water = this.waterPic.cus_idPhoto.indexOf(val);
                if (water > -1) {
                    this.waterPic.cus_idPhoto.splice(water, 1);
                    this.contractEdit.water_card_pic.splice(water, 1);
                }
                let ele = this.elePic.cus_idPhoto.indexOf(val);
                if (ele > -1) {
                    this.elePic.cus_idPhoto.splice(ele, 1);
                    this.contractEdit.elec_card_pic.splice(ele, 1);
                }
                let gas = this.gasPic.cus_idPhoto.indexOf(val);
                if (gas > -1) {
                    this.gasPic.cus_idPhoto.splice(gas, 1);
                    this.contractEdit.gas_card_pic.splice(gas, 1);
                }
                let proxy = this.proxyPic.cus_idPhoto.indexOf(val);
                if (proxy > -1) {
                    this.proxy.cus_idPhoto.splice(proxy, 1);
                    this.contractEdit.proxy_pic.splice(proxy, 1);
                }
                let handover = this.handoverPic.cus_idPhoto.indexOf(val);
                if (handover > -1) {
                    this.handoverPic.cus_idPhoto.splice(handover, 1);
                    this.contractEdit.handover_pic.splice(handover, 1);
                }
                let receipt = this.receiptPic.cus_idPhoto.indexOf(val);
                if (receipt > -1) {
                    this.receiptPic.cus_idPhoto.splice(receipt, 1);
                    this.contractEdit.receipt_pic.splice(receipt, 1);
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
    @media (max-width: 767px) {
        div.modal-dialog{
            width: 100%;
        }
    }
    .col-lg-2{
        position: relative;
        min-height: 1px;
        padding-right: 0px;
        padding-left: 15px;
    }
</style>