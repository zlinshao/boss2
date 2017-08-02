<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="contractEdit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click = closeEdit>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑合同</h4>
                    </div>
                    <div class="modal-body">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3 style="margin-top: -15px">基本信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[0]"
                                                   readonly placeholder="业主姓名" @click="selectClient(0)">
                                        </div>
                                        <div class="col-sm-2 flexbox">
                                            <i class="fa fa-plus-circle" @click="addMore"></i>
                                            <i class="fa fa-minus-circle" @click="reduceMore"></i>
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=2">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[1]"
                                                   readonly placeholder="业主姓名" @click="selectClient(1)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=3">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[2]"
                                                   readonly placeholder="业主姓名" @click="selectClient(2)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=4">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[3]"
                                                   readonly placeholder="业主姓名" @click="selectClient(3)">
                                        </div>
                                    </div>
                                    <div class="row" v-show="more>=5">
                                        <label class="col-sm-2 control-label col-lg-2" >附属房东</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="relative_customer[4]"
                                                   readonly placeholder="业主姓名" @click="selectClient(4)">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >合同编号<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="contractEdit.contract_num" placeholder="合同编号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >空置期开始日期<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input @click="selectDate" readonly placeholder="空置期开始时间"
                                                   v-model="contractEdit.vac_start_date" class="form-control form_date">
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >空置期结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractEdit.vac_end_date"
                                                   disabled placeholder="空置期结束时间">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >合同开始日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractEdit.start_date"
                                                   disabled placeholder="合同开始时间">
                                        </div>
                                        <label class="col-sm-3 control-label col-lg-2" >合同结束日期</label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input type="text" class="form-control" v-model="contractEdit.end_date"
                                                   disabled placeholder="合同结束时间">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >打房租日期<sup>*</sup></label>
                                        <div class="col-lg-4">
                                            <input type="number" max="30" min="1" class="form-control" v-model="contractEdit.pay_date"
                                                   placeholder="请输入打房租日期">
                                        </div>
                                        <!--<label class="col-sm-1 control-label col-lg-1" >号</label>-->
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >备注</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" placeholder="请输入备注信息" v-model="contractEdit.remarks">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-3 control-label col-lg-2" >资料补齐时间<sup>*</sup></label>
                                        <div class="col-lg-4 col-sm-9">
                                            <input @click="selectDate" readonly placeholder="资料补齐时间"
                                                   v-model="contractEdit.complete_date" class="form-control form_date">
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
                                        <label class="col-lg-2 control-label">银行卡照片<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <up-load @photo="bankPicId" @delete="picDelete" @complete="complete"
                                                     :result="'bankPic'" :idPhotos="bankPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">合同照片<sup>*</sup></label>
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
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click = closeEdit>关闭</button>
                        <button type="button" class="btn btn-primary" @click="editContract">确认</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!--选择客户-->
        <SelectClient @clientAdd="receiveClient"> </SelectClient>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import SelectClient from '../common/selectClient.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    export default{
        props:['contractEitId','dictionary','isEditCollect'],
        components:{
            SelectClient,
            upLoad,
            Status
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
                relative_customer : [],
                contractEdit : {
                    id:'',
                    relative_customer_id:[],//客户id
                    contract_num:'',        //合同编号
                    vac_start_date:'',      //空置期开始日期
                    vac_end_date:'',        //空置期结束日期
                    start_date:'',          //合同开始日期
                    end_date:'',            //合同结束日期
                    pay_date:'',            //打房租日期
                    complete_date:'',       //资料补齐时间
                    remarks:'',             //备注信息
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
                dateConfigureVac: [{range:false,needHour:false, }],
                dateConfigureComplete: [{range:false,needHour:false, }],
                dateType:'',
                myDictionary:[],
                myContractEitId:'',
                checkCollectId : '',
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                more:1,
                flag:'',
                isClick :false,
                myIsEditCollect : false,
            }
        },
        updated(){
            this.selectDate ();
        },
        watch : {
            dictionary(val){
                this.myDictionary = val;
            },
            contractEitId(val){
                this.myContractEitId = val;
            },
            isEditCollect(val){
                this.myIsEditCollect = val;
                if(this.myIsEditCollect) this.gitContractInfo();
            },
            'contractEdit.vac_start_date' : {
                deep:true,
                handler(val,oldVal){
                    if(val !== oldVal && this.isClick){
                        this.completeDate(val);
                    }
                }
            }
        },
        methods : {
            gitContractInfo(){
                if(this.myContractEitId !== ''){
                    this.$http.get('core/collect/readcontract/id/' +this.myContractEitId).then((res)=>{
                        this.bankPic.cus_idPhoto = [];
                        this.contractEdit.bank_pic = [];
                        this.contractPic.cus_idPhoto = [];
                        this.contractEdit.contract_pic = [];
                        this.proxyPic.cus_idPhoto = [];
                        this.contractEdit.proxy_pic = [];
                        this.handoverPic.cus_idPhoto = [];
                        this.contractEdit.handover_pic = [];
                        this.receiptPic.cus_idPhoto = [];
                        this.contractEdit.receipt_pic = [];
                        this.waterPic.cus_idPhoto = [];
                        this.contractEdit.water_card_pic = [];
                        this.elePic.cus_idPhoto = [];
                        this.contractEdit.elec_card_pic = [];
                        this.gasPic.cus_idPhoto = [];
                        this.contractEdit.gas_card_pic = [];

                        let contractList =res.data.data;
                        this.contractEdit.id = contractList.id;
                        if(contractList.relative_customer !== undefined){
                            if(contractList.relative_customer.name !== undefined){
                                this.more = contractList.relative_customer.length;
                                for(let i=0;i<contractList.relative_customer.length;i++){
                                    this.relative_customer.push(contractList.relative_customer[i].name);
                                    this.contractEdit.relative_customer_id.push(contractList.relative_customer[i].id);
                                }
                            }
                        }
                        this.contractEdit.contract_num = contractList.contract_num;
                        this.contractEdit.vac_start_date = contractList.vac_start_date;
                        this.contractEdit.vac_end_date = contractList.vac_end_date;

                        this.contractEdit.start_date = contractList.start_date;
                        this.contractEdit.end_date = contractList.end_date;
                        this.contractEdit.complete_date = contractList.complete_date[0];
                        if(contractList.checkin_collect_id !==null){
                            this.checkCollectId = contractList.checkin_collect_id.id;
                        }
                        this.contractEdit.pay_date = contractList.pay_date;
                        this.contractEdit.remarks = contractList.remarks;
                        this.staff = contractList.staff;

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
                    })
                }

            },
            selectClient(val){         //选择业主姓名
                this.flag = val;
                $('#selectClient').modal('show');
            },
            receiveClient(val){     //接收业主id
                if(this.more > this.relative_customer.length && this.contractEdit.relative_customer_id.indexOf(val.id) == -1){
                    this.contractEdit.relative_customer_id .push(val.id);
                    this.relative_customer.push(val.name);
                }else if(this.more === this.relative_customer.length){
                    this.contractEdit.relative_customer_id.splice(this.flag,1);
                    this.relative_customer.splice(this.flag,1,val.name);
                }
            },
            completeDate(val){  //计算空置期结束 合同开始以及结束时间
                if(this.checkCollectId !== ''){
                    this.$http.post('core/collect/contractDate',
                        {
                            "vac_start_date":this.contractEdit.vac_start_date,
                            "checkin_collect_id":this.checkCollectId
                        }).then(
                        (res) => {
                            this.contractEdit.vac_end_date = res.data.vac_end_date;
                            this.contractEdit.start_date = res.data.start_date;
                            this.contractEdit.end_date = res.data.end_date;
                        }
                    )
                }else {
                    this.info.error = '您的报备表id不存在，自动生成日期失败';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                }

            },
            selectDate (){
                this.isClick = true;
                $('.form_date').datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,
                    pickerPosition: 'bottom-left',
                }).on('changeDate', ev => {
                    if (ev.target.placeholder === '空置期开始时间'){
                        this.contractEdit.vac_start_date = ev.target.value;
                    } else {
                        this.contractEdit.complete_date = ev.target.value;
                    }
                });
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
                let bank = this.contractEdit.bank_pic.indexOf(val);
                if (bank > -1) {
                    this.bankPic.cus_idPhoto.splice(bank, 1);
                    this.contractEdit.bank_pic.splice(bank, 1);
                }
                let contract = this.contractEdit.contract_pic.indexOf(val);
                if (contract > -1) {
                    this.contractPic.cus_idPhoto.splice(contract, 1);
                    this.contractEdit.contract_pic.splice(contract, 1);
                }
                let water = this.contractEdit.water_card_pic.indexOf(val);
                if (water > -1) {
                    this.waterPic.cus_idPhoto.splice(water, 1);
                    this.contractEdit.water_card_pic.splice(water, 1);
                }
                let ele = this.contractEdit.elec_card_pic.indexOf(val);
                if (ele > -1) {
                    this.elePic.cus_idPhoto.splice(ele, 1);
                    this.contractEdit.elec_card_pic.splice(ele, 1);
                }
                let gas = this.contractEdit.gas_card_pic.indexOf(val);
                if (gas > -1) {
                    this.gasPic.cus_idPhoto.splice(gas, 1);
                    this.contractEdit.gas_card_pic.splice(gas, 1);
                }
                let proxy = this.contractEdit.proxy_pic.indexOf(val);
                if (proxy > -1) {
                    this.proxy.cus_idPhoto.splice(proxy, 1);
                    this.contractEdit.proxy_pic.splice(proxy, 1);
                }
                let handover = this.contractEdit.handover_pic.indexOf(val);
                if (handover > -1) {
                    this.handoverPic.cus_idPhoto.splice(handover, 1);
                    this.contractEdit.handover_pic.splice(handover, 1);
                }
                let receipt = this.contractEdit.receipt_pic.indexOf(val);
                if (receipt > -1) {
                    this.receiptPic.cus_idPhoto.splice(receipt, 1);
                    this.contractEdit.receipt_pic.splice(receipt, 1);
                }
            },
            editContract(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        this.$http.post('core/collect/updatecontract',this.contractEdit).then((res) => {
                            if(res.data.code === "70010"){
                                this.$emit('EditStatus','success');
                                $('#contractEdit').modal('hide');
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            }else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }

                        })
                    });

                } else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },
            addMore(){
                if(this.more < 5 && this.more === this.relative_customer.length){
                    this.more++;
                }
            },
            reduceMore(){
                if(this.more>1){
                    if(this.more === this.relative_customer.length ){
                        this.relative_customer.length--;
                        this.contractEdit.relative_customer_id.length--;
                    }
                    this.more--;
                }

            },
            closeEdit(){
                this.$emit('EditStatus','error');
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
    .col-lg-2{
        position: relative;
        min-height: 1px;
        padding-right: 0px;
        padding-left: 15px;
    }
    .flexbox i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /*text-align: left;*/
        cursor: pointer;
    }
    .flexbox i+i{
        margin-left: 5px;
    }
    .flexbox i:hover{
        color: #999;
    }
    sup{
        color: #e8403f;
    }
</style>