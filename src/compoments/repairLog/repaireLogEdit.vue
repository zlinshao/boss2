<template>
    <div>
        <div class="modal fade full-width-modal-right" id="repairLogEdit" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title" v-if="isAdd">新建维修</h4>
                            <h4 class="modal-title" v-else="isAdd">编辑维修</h4>
                        </div>
                        <div class="modal-body has-js">
                            <div class="panel-body">
                                <form class="form-horizontal clearFix">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">合同编号</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="showInfo.contract_num">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">报修人姓名</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.customer_name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">联系电话</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.customer_mobile">
                                        </div>
                                    </div>
                                    <div class="form-group has-js">
                                        <label class="col-sm-2 control-label">报修人性别</label>
                                        <div class="col-sm-10 status1">
                                            <!--<label :class="{'label_radio':true,'r_on':formData.sex==1,'r_off':formData.sex!=1}">
                                                <input type="radio" name="gender" value="1" class="pull-left" v-model="formData.sex">先生
                                            </label>
                                            <label :class="{'label_radio':true,'r_on':formData.sex==2,'r_off':formData.sex!=2}">
                                                <input type="radio" name="gender" value="2" class="pull-left" v-model="formData.sex">女士
                                            </label>-->
                                            <label :class="{'label_radio':true,'r_on':formData.sex==value,'r_off':formData.sex!=value}" v-for="(key,value) in dict.sex">
                                                <input type="radio" name="gender" :value="value" class="pull-left" v-model="formData.sex">{{key}}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="showInfo.house_address">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">约定维修时间</label>
                                        <div class="col-sm-10">
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                        :idName="'appointTime'"
                                                        @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修内容</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.content">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修师傅</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.repair_master">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修结果</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.repair_result">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修金额</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" v-model="formData.repair_money">
                                            <!--@keyup="formData.repair_money = formData.repair_money.replace(/[^\d]\.[^\d]/g,'')"-->
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">维修状态</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="formData.status">
                                                <option value="0">--请选择--</option>
                                                <option :value="value" v-for="(key,value) in dict.status">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">认责人</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="formData.person_liable">
                                                <option value="0">--请选择--</option>
                                                <option :value="value" v-for="(key,value) in dict.person_liable">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">备注</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="formData.remark">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">操作人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="operName">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">签约人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="showInfo.signatory">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">负责人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="showInfo.leader_name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="showInfo.department">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="close">取消</button>
                            <button type="button" class="btn btn-primary" v-if="isAdd" @click="addRepair">添加</button>
                            <button type="button" class="btn btn-primary" v-else="" @click="edit">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from '../common/status.vue'
    import DatePicker from '../common/datePicker.vue'
    export default {
        props : ['isAdd','contractId','repairId','isCollect'],
        components: {DatePicker,Status},
        data() {
            return {
                dict : {},

                dateConfigure: [                    //时间控件
                    {
                        range: false,
                        needHour: true
                    }
                ],
                currentDate: [],                    //时间控件
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

                operName : '',
                showInfo : {
                    contract_num : '',
                    house_address : '',
                    signatory : '',     // 签约人,
                    leader_name : '',
                    department : ''
                },
                formData : {
                    contract_id : '',              // 合同id
                    customer_name : '',             // 客户姓名
                    customer_mobile : '',             // 客户电话
                    sex : '',                       // 客户性别
                    content : '',                   // 维修内容
                    repair_time : '',               // 维修时间
                    repair_master : '',             // 维修师傅
                    repair_result : '',             // 维修结果
                    repair_money : '',              // 维修金额
                    status : 0,                    // 维修状态
                    person_liable : 0,             // 认责人
                    operator_id : '',               // 操作人
                    remark : ''                     // 备注
                }
            }
        },
        watch:{
            contractId(val){
                this.formData.contract_id = val;
                if (val==''){
                    return
                }
                if (this.isCollect){
                    // 收房
                    this.$http.get('core/collect/readcontract/id/'+val).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==70020){
                            // 成功
                            this.setInfo(res.data.data)
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }

                    })
                } else {
                    // 租房
                    this.$http.get('core/rent/readcontract/id/'+val).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==80020){
                            // 成功
                            this.setInfo(res.data.data)
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }
            },
            repairId(val){
//                console.log(val);
                this.getRepairDetail()
            }
        },
        created(){
            this.$http.get('maint/record/dict').then((res)=>{
//                console.log(res.data);
                this.dict = res.data.Repair;
            })
            this.$http.get('staff/info').then((res) => {
                this.operName = res.data.name;
                this.formData.operator_id = res.data.id;
            });
        },
        methods: {
            getRepairDetail(){
                this.$http.get('maint/record/readRepair?id='+this.repairId).then((res)=>{
                    if (res.data.code==10020){
                        // success
                        let val = res.data.data;
                        this.showInfo.contract_num = val.contract_num;
                        this.showInfo.house_address = val.detailed_address;
                        this.showInfo.signatory = val.real_name;
                        this.showInfo.leader_name = val.leader_name;
                        this.showInfo.department = val.department_name;

                        this.formData.contract_id = val.contract_id;
                        this.formData.customer_name = val.customer_name;
                        this.formData.customer_mobile = val.customer_mobile;
                        this.formData.sex = val.sex;
                        this.formData.content = val.content;
                        this.formData.repair_time = val.repair_time;
                        this.currentDate = [];
                        this.currentDate.push(val.repair_time);
                        this.formData.repair_master = val.repair_master;
                        this.formData.repair_result = val.repair_result;
                        this.formData.repair_money = val.repair_money;
                        this.formData.status = val.status;
                        this.formData.person_liable = val.person_liable;
//                        this.formData.operator_id = val.operator_id;
                        this.formData.remark = val.remark;


                    } else {
                        // fail
                    }
                })
            },
            setInfo(val){
                this.showInfo.contract_num = val.contract_num;
                this.showInfo.house_address = val.villa_id.detailed_address;
                this.showInfo.signatory = val.staff;
                this.showInfo.leader_name = val.leader_name;
                this.showInfo.department = val.dpm;

                this.formData.customer_name = val.customer_id.name;
                this.formData.customer_mobile = val.customer_id.mobile;
                this.formData.sex = val.customer_id.gender;

            },
            getDate(val){
                this.formData.repair_time = val;
            },
            close(){
//                this.formData.contract_id = '';
                this.formData.customer_name = '';
                this.formData.customer_mobile = '';
                this.formData.sex = '';
                this.formData.content = '';
                this.formData.repair_time = '';
                this.formData.repair_master = '';
                this.formData.repair_result = '';
                this.formData.repair_money = '';
                this.formData.status = 0;
                this.formData.person_liable = 0;
                this.formData.remark = '';
                this.currentDate = [];
                $('#repairLogEdit').modal('hide');
                this.$emit('close');
                if (this.repairId!=undefined&&this.repairId!=''){
                    this.getRepairDetail();
                }
            },
            addRepair(){
                if (this.isCollect){
                    // 收房
                    this.formData.type = 'Collect';
                } else {
                    // 租房
                    this.formData.type = 'Rent';
                }
                this.$http.post('maint/record/saveRepair',this.formData).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10001){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.close();
                    } else {
                        // 失败
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            edit(){
                this.formData.id = this.repairId;
                this.$http.put('maint/record/updateRepair',this.formData).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10030){
                        // success
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.$emit('editSuccess');
                        this.close();
                    } else {
                        // fail
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .status1 {
        padding-top: 7px;
    }

    .status1 label {
        margin-right: 20px;
        margin-bottom: 18px;
    }
</style>