<template>
    <div>
        <div class="modal fade full-width-modal-right" id="applySupply" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="clearForm" aria-hidden="true">×</button>
                            <h4 class="modal-title">新建办公用品申领</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">登记类型<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.register_type">
                                            <option value="">--请选择--</option>
                                            <option :value="value" v-for="(key,value) in dict.register_type">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品库<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="library_id">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品类别<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="category_id">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in allType">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">办公用品<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.inventory_id">
                                            <option value="">--请选择--</option>
                                            <option :value="item.id" v-for="item in allSupply">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单价</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly v-model="price">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">申请数量<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <!--<input type="text" class="form-control" readonly>-->
                                        <button type="button" class="col-sm-2 btn btn-primary minus" @click="minus">-</button>
                                        <div class="col-sm-8" style="padding-left: 0;padding-right: 0">
                                            <input type="text" class="form-control" v-model="formData.num" @blur="isNum">
                                        </div>
                                        <button type="button" class="col-sm-2 btn btn-primary add" @click="add">+</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                            <button type="button" class="btn btn-primary" @click="apply">申领</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default{
        props : ['officeId'],
        components: {Status},
        data(){
            return {
                dict : {},
                price : '',
                allLibrary : [],
                allType : [],
                allSupply : [],
                maxNum : 0,

                library_id : '',
                category_id : '',

                formData :{
                    register_type : '',
                    inventory_id : '',
                    num : 0,
                    remarks : ''
                },
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
        created(){
            this.getLibrarys();
        },
        mounted (){
            this.$http.get('manager/management/dict').then((res)=>{
//                    console.log(res);
                this.dict = res.data.management;
            });

        },
        watch :{
            officeId(val){
                console.log(val);
                this.getOfficeDetail();
            },
            library_id(val){
                this.category_id = '';
                this.formData.inventory_id = '';
                if (val==''){
                    this.allType = [];
                    this.allSupply = [];
                    return;
                }
                this.$http.post('manager/management/type_all?parent_id='+val).then((res)=>{
//                    console.log(res.data.data.data);
                    if (res.data.code==10010){
                        // 成功
                        this.allType = res.data.data.data;
                    } else {
                        // 失败
                        this.allType = [];
                    }
                })
            },
            category_id(val){
                this.formData.inventory_id = '';
                if (val==''){
                    this.allSupply = [];
                    return;
                }
                this.$http.post('manager/management/inventory_all?category_id='+val).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10010){
                        // 成功
                        this.allSupply = res.data.data.data;
                    } else {
                        // 失败
                        this.allSupply = [];
                        /*this.info.error = '该类别下没有用品';
                        //显示失败弹窗 ***
                        this.info.state_error = true;*/
                    }
                })
            },
            'formData.inventory_id':{
                handler(val){
//                    console.log(val);
                    this.formData.num = 0;
                    if (val==''){
                        this.price = '';
                        this.maxNum = 0;
                        return;
                    }
                    let index = -1;
                    for (let i = 0 ; i < this.allSupply.length ; i++){
                        if (val==this.allSupply[i].id){
                            index = i;
                        }
                    }
                    if (index!=-1){
                        this.price = this.allSupply[index].price;
                        this.maxNum = this.allSupply[index].existing_inventory;
//                        console.log(this.maxNum)
                    }
                }
            }
        },
        methods: {
           /* openModal(){
                $('#applySupply').on('show.bs.modal', function (e) {
                    this.getOfficeDetail()
                })
            },*/
            getOfficeDetail(){
//                console.log(this.officeId)
                if (this.officeId==undefined||this.officeId==''){
                    return;
                }
                this.$http.post('manager/management/inventory_details?id='+this.officeId).then((res)=>{
                    console.log(res.data);
                    let val =res.data.data.data;
                    let _this = this;
                    this.formData.register_type = val.register_type;
                    setTimeout(function () {
                        _this.library_id = val.library_id;
                    },300);

                    setTimeout(function () {
                        _this.category_id = val.category_id
                    },800);
                    setTimeout(function () {
                        _this.formData.inventory_id = val.id
                    },1500);
                })
            },

            clearForm(){
                this.price = '';
//                this.allLibrary = [];
                this.allType = [];
                this.allSupply = [];
                this.maxNum = 0;
                this.library_id = '';
                this.category_id = '';

                this.formData.register_type = '';
                this.formData.inventory_id = '';
                this.formData.num = 0;
                this.formData.remarks = '';

                setTimeout(this.getOfficeDetail(),2000);
//                this.getOfficeDetail();
                $('#applySupply').modal('hide');
            },
            // 获取所有库
            getLibrarys(){
                this.$http.post('manager/management/library_all').then((res)=>{
//                    console.log(res);
                    if (res.data.code==10010){
                        // 成功
                        this.allLibrary = res.data.data.data;
                    } else {
                        // 失败
                        this.allLibrary = [];
                    }
//                    this.getOfficeDetail()
                })
            },
            minus(){
//                console.log(parseInt(this.formData.num))
                if (this.formData.num>1){
                    this.formData.num--;
                }
            },
            add(){
                if (this.formData.num>=this.maxNum){
                    return;
                }
                this.formData.num++;
            },
            isNum(){
                if (isNaN(parseInt(this.formData.num))){
                    this.formData.num = 0;
                } else if (this.formData.num>=this.maxNum){
                    if (this.maxNum==0){
                        this.formData.num = 0;
                    } else {
                        this.formData.num = this.maxNum;
                    }
                }
            },
            // 申领
            apply(){
                this.$http.post('manager/management/receive_insert',this.formData).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10061){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.clearForm();
                        this.$emit('success');
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
        }
    }
</script>
<style scoped>
    textarea {
        max-width: 100%;
    }
    .minus{
        /*padding-right: 0;*/
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .add{
        /*padding-left: 0;*/
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
</style>