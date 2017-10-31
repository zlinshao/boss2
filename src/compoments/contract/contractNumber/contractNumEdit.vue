<template>
    <div>
        <div class="modal fade full-width-modal-right" id="contractNumEdit" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true" @click="close_">&times;</span>
                            </button>
                            <h4 class="modal-title">编辑任务</h4>
                        </div>
                        <div class="modal-body has-js">
                            <div class="panel-body">
                                <form class="form-horizontal clearFix">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">任务类型</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="type" disabled>
                                                <option value="1">领取</option>
                                                <option value="2">作废</option>
                                                <option value="3">上缴</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="type == 1">领用日期<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 2">报备日期<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 3">上缴日期<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                        :idName="'receiveDate'"
                                                        @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="type == 2">
                                        <label class="col-sm-2 control-label">实到日期<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate1"
                                                        :idName="'receiveDate2'"
                                                        @sendDate="getDate2"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="type == 1">领用人<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 2">报备人<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 3">上缴人<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control"
                                                   v-model="receiver_name"
                                                   readonly>
                                            <!--placeholder="点击选择员工"
                                                @click='select' -->
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="department" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="type == 1">领取合同数(收)<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 2">作废合同数(收)<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 3">上缴合同数(收)<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="sf_num">
                                        </div>
                                    </div>
                                    <!--领取/作废 合同编号（收）-->
                                    <div v-if="type==1||type==2">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" v-if="type == 1">本次领取合同编号记录(收)<sup class="required">*</sup></label>
                                            <label class="col-sm-2 control-label" v-if="type == 2">本次作废合同同编号记录(收)<sup class="required">*</sup></label>
                                            <div class="col-sm-8 icon">
                                                <div v-for="(item,index) in sf_contract">
                                                    <div class="col-sm-10 padd0">
                                                        <input type="text" class="form-control" v-model="sf_contract[index]" readonly>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <i class="fa fa-minus-circle" @click="minusOld(1,index)"></i>
                                                    </div>
                                                </div>
                                                <div v-for="(item,index) in sf_contract_add">
                                                    <div class="col-sm-10 padd0">
                                                        <input type="text" class="form-control" v-model="sf_contract_add[index]" minlength="13" maxlength="13">
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <i class="fa fa-minus-circle" @click="minusNew(1,index)"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-2 icon" style="text-align: right">
                                                <i class="fa fa-plus-circle" @click="plus(1)"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <!--上缴 收-->
                                    <div v-if="type==3">
                                        <div class="col-sm-11 padd0">
                                            <div class="form-group" v-for="(item, index) in pay_sf_contract">
                                                <label class="col-xs-12 col-sm-2 control-label">合同编号<sup class="required">*</sup></label>
                                                <div class="col-sm-9 padd0 icon">
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_sf_contract[index].contract_number" readonly>
                                                    </div>
                                                    <div class="col-xs-1 text-center padd0" style="line-height: 30px;">
                                                        地址
                                                    </div>
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_sf_contract[index].address">
                                                    </div>
                                                    <div class="col-xs-5 col-sm-1">
                                                        <i class="fa fa-minus-circle" @click="minusPay(1,'o',index)"></i>
                                                    </div>
                                                    <div class="col-xs-12 text-right">
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract[index].other.indexOf(1) > -1,
                                                'c_off':pay_sf_contract[index].other.indexOf(1) == -1}"
                                                               @click.prevent="pitchOld(1, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract[index].other.indexOf(1) > -1">交接单
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract[index].other.indexOf(2) > -1,
                                                'c_off':pay_sf_contract[index].other.indexOf(2) == -1}"
                                                               @click.prevent="pitchOld(2, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract[index].other.indexOf(2) > -1">收条
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract[index].other.indexOf(3) > -1,
                                                'c_off':pay_sf_contract[index].other.indexOf(3) == -1}"
                                                               @click.prevent="pitchOld(3, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract[index].other.indexOf(3) > -1">身份证
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract[index].other.indexOf(4) > -1,
                                                'c_off':pay_sf_contract[index].other.indexOf(4) == -1}"
                                                               @click.prevent="pitchOld(4, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract[index].other.indexOf(4) > -1">房产证复印件
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group" v-for="(item, index) in pay_sf_contract_add">
                                                <label class="col-xs-12 col-sm-2 control-label">合同编号<sup class="required">*</sup></label>
                                                <div class="col-sm-9 padd0 icon">
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_sf_contract_add[index].contract_number" minlength="13" maxlength="13">
                                                    </div>
                                                    <div class="col-xs-1 text-center padd0" style="line-height: 30px;">
                                                        地址
                                                    </div>
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_sf_contract_add[index].address">
                                                    </div>
                                                    <div class="col-xs-5 col-sm-1">
                                                        <i class="fa fa-minus-circle" @click="minusPay(1,'n',index)"></i>
                                                    </div>
                                                    <div class="col-xs-12 text-right">
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract_add[index].other.indexOf(1) > -1,
                                                'c_off':pay_sf_contract_add[index].other.indexOf(1) == -1}"
                                                               @click.prevent="pitchNew(1, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract_add[index].other.indexOf(1) > -1">交接单
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract_add[index].other.indexOf(2) > -1,
                                                'c_off':pay_sf_contract_add[index].other.indexOf(2) == -1}"
                                                               @click.prevent="pitchNew(2, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract_add[index].other.indexOf(2) > -1">收条
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract_add[index].other.indexOf(3) > -1,
                                                'c_off':pay_sf_contract_add[index].other.indexOf(3) == -1}"
                                                               @click.prevent="pitchNew(3, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract_add[index].other.indexOf(3) > -1">身份证
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_sf_contract_add[index].other.indexOf(4) > -1,
                                                'c_off':pay_sf_contract_add[index].other.indexOf(4) == -1}"
                                                               @click.prevent="pitchNew(4, $event,index,1)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_sf_contract_add[index].other.indexOf(4) > -1">房产证复印件
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 icon" style="text-align: right">
                                            <i class="fa fa-plus-circle" @click="plusPay(1)"></i>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">剩余合同数(收)</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="sf_remian_num">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="type == 1">领取合同数(租)<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 2">作废合同数(租)<sup class="required">*</sup></label>
                                        <label class="col-sm-2 control-label" v-if="type == 3">上缴合同数(租)<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="zf_num">
                                        </div>
                                    </div>
                                    <!--领取/作废 合同编号（租）-->
                                    <div v-if="type==1||type==2">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" v-if="type == 1">本次领取合同同编号记录(租)<sup class="required">*</sup></label>
                                            <label class="col-sm-2 control-label" v-if="type == 2">本次作废合同同编号记录(租)<sup class="required">*</sup></label>
                                            <div class="col-sm-8 icon">
                                                <div v-for="(item,index) in zf_contract">
                                                    <div class="col-sm-10 padd0">
                                                        <input type="text" class="form-control" v-model="zf_contract[index]" readonly>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <i class="fa fa-minus-circle" @click="minusOld(2,index)"></i>
                                                    </div>
                                                </div>
                                                <div v-for="(item,index) in zf_contract_add">
                                                    <div class="col-sm-10 padd0">
                                                        <input type="text" class="form-control" v-model="zf_contract_add[index]" minlength="13" maxlength="13">
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <i class="fa fa-minus-circle" @click="minusNew(2,index)"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-2 icon" style="text-align: right">
                                                <i class="fa fa-plus-circle" @click="plus(2)"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <!--上缴 租-->
                                    <div v-if="type==3">
                                        <div class="col-sm-11 padd0">
                                            <div class="form-group" v-for="(item, index) in pay_zf_contract">
                                                <label class="col-xs-12 col-sm-2 control-label">合同编号<sup class="required">*</sup></label>
                                                <div class="col-sm-9 padd0 icon">
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_zf_contract[index].contract_number" readonly>
                                                    </div>
                                                    <div class="col-xs-1 text-center padd0" style="line-height: 30px;">
                                                        地址
                                                    </div>
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_zf_contract[index].address">
                                                    </div>
                                                    <div class="col-xs-5 col-sm-1">
                                                        <i class="fa fa-minus-circle" @click="minusPay(2,'o',index)"></i>
                                                    </div>
                                                    <div class="col-xs-12 text-right">
                                                        <label :class="{'label_check':true,'c_on':pay_zf_contract[index].other.indexOf(1) > -1,
                                                'c_off':pay_zf_contract[index].other.indexOf(1) == -1}"
                                                               @click.prevent="pitchOld(1, $event,index,2)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_zf_contract[index].other.indexOf(1) > -1">交接单
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_zf_contract[index].other.indexOf(2) > -1,
                                                'c_off':pay_zf_contract[index].other.indexOf(2) == -1}"
                                                               @click.prevent="pitchOld(2, $event,index,2)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_zf_contract[index].other.indexOf(2) > -1">收条
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group" v-for="(item, index) in pay_zf_contract_add">
                                                <label class="col-xs-12 col-sm-2 control-label">合同编号<sup class="required">*</sup></label>
                                                <div class="col-sm-9 padd0 icon">
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_zf_contract_add[index].contract_number" minlength="13" maxlength="13">
                                                    </div>
                                                    <div class="col-xs-1 text-center padd0" style="line-height: 30px;">
                                                        地址
                                                    </div>
                                                    <div class="col-xs-5 col-sm-5">
                                                        <input type="text" class="form-control" v-model="pay_zf_contract_add[index].address">
                                                    </div>
                                                    <div class="col-xs-5 col-sm-1">
                                                        <i class="fa fa-minus-circle" @click="minusPay(2,'n',index)"></i>
                                                    </div>
                                                    <div class="col-xs-12 text-right">
                                                        <label :class="{'label_check':true,'c_on':pay_zf_contract_add[index].other.indexOf(1) > -1,
                                                'c_off':pay_zf_contract_add[index].other.indexOf(1) == -1}"
                                                               @click.prevent="pitchNew(1, $event,index,2)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_zf_contract_add[index].other.indexOf(1) > -1">交接单
                                                        </label>
                                                        <label :class="{'label_check':true,'c_on':pay_zf_contract_add[index].other.indexOf(2) > -1,
                                                'c_off':pay_zf_contract_add[index].other.indexOf(2) == -1}"
                                                               @click.prevent="pitchNew(2, $event,index,2)">
                                                            <input type="checkbox" class="pull-left"
                                                                   :checked="pay_zf_contract_add[index].other.indexOf(2) > -1">收条
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 icon" style="text-align: right">
                                            <i class="fa fa-plus-circle" @click="plusPay(2)"></i>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">剩余合同数(租)</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly v-model="zf_remian_num" >
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">截图凭证</label>
                                        <div class="col-sm-10">
                                            <up-load @photo="idNumber" @delete="idNumber_delete"
                                                     @complete="complete"
                                                     :result="'id_number'" :idPhotos="photos"></up-load>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">备注</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" v-model="remark"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">操作人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="operate_man" disabled>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="close_">取消</button>
                            <button type="button" class="btn btn-primary" @click="edit">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>
<script>
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/oraganization.vue'
    import upLoad from '../../common/upload.vue'            //图片上传
    import Status from '../../common/status.vue'
    export default {
        props:['type','request_time'],
        components: {DatePicker, STAFF, upLoad,Status},
        data() {
            return {
                dict : {},
//                msg : '',
//                public : {},

                area : '01',

                operate_man : '',               // 操作人

                receiver_time: '',              //领取日期
                reality_time: '',               //实际日期
                receiver_name: '',              //领取人
                receiver_id: '',                //领取人ID
                department: '',                 //所属部门
                department_id: '',              //所属部门ID

//                领取/作废
                sf_num : '',                    // 收房合同数
                zf_num : '',                    // 租房合同数
                sf_contract : [],               // 收房合同编号
                sf_contract_add : [],               // 新增收房合同编号
                zf_contract : [],               // 租房合同编号
                zf_contract_add : [],               // 新增租房合同编号
                sf_remian_num : '',             //收房剩余合同数
                zf_remian_num : '',             //租房剩余合同数

                // 上缴
                pay_sf_contract : [],           // 上缴收房合同
                pay_sf_contract_add : [],       // 新增上缴收房合同
                pay_zf_contract : [],           // 上缴租房合同
                pay_zf_contract_add : [],       // 新增上缴租房合同

                del_contract : [],              // 删除的合同

                remark : '',                    // 备注
                currentDate: [],                //时间组件
                currentDate1: [],                //时间组件
                dateConfigure: [                //时间组件
                    {
                        range: false,
                        needHour: true
                    }
                ],
                configure: {},                  //组织架构

                photos: {
                    cus_idPhotos: {},           //修改图片ID
                    cus_idPhoto: [],            //证件照片
                },
                complete_ok: 'ok',              //图片上传完成

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
        mounted(){
            this.photos.cus_idPhotos = {};
            /*this.$http.get('staff/info').then((res) => {
                this.operate_man = res.data.name;
//                this.operate_man_id = res.data.id;
            });*/
            this.$http.get('code/Contract_Number_Record/dict').then((res)=>{
//                console.log(res.data.area);
                this.dict = res.data;
            });
//            alert(this.type)
//            alert(this.request_time)
//            this.getDetails();
        },
        watch:{
            request_time(val){
                this.getDetails();
            }
        },
        methods: {
            // 获取详情
            getDetails(){
                this.$http.post('code/Contract_Number_Record/showDetail',{
                    request_time : this.request_time,
                    type : this.type
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==30070){
                        let val = res.data.data;
                        let publicVal = {};
                        if (val.sf.length>0){
                            publicVal = val.sf[0];
                        } else {
                            publicVal = val.zf[0];
                        }
                        this.area = publicVal.area;
                        this.operate_man = publicVal.operator.name;
                        this.department = publicVal.department_id.name;
                        this.department_id = publicVal.department_id.id;
                        this.receiver_name = publicVal.receiver_name;
                        this.remark = publicVal.remark;
                        this.currentDate = [publicVal.receiver_time];
                        this.currentDate1 = [publicVal.actual_time];
                        this.sf_remian_num = val.num[0].rest_sf_number ;
                        this.zf_remian_num = val.num[0].rest_zf_number ;

                        this.sf_num = val.num[0].sf_numbers;
                        this.sf_contract = [];
                        if (val.num[0].sf_contract_number!=null){
                            this.sf_contract = val.num[0].sf_contract_number.split(',');
                        }

                        /*for (let i = 0 ; i<val.sf.length ; i++){
                            this.sf_contract.push(val.sf[i].contract_number);
                        }*/

                        this.zf_num = val.num[0].zf_numbers;
                        this.zf_contract = [];
                        if (val.num[0].zf_contract_number!=null){
                            this.zf_contract = val.num[0].zf_contract_number.split(',');
                        }
                        /*for (let i = 0 ; i<val.zf.length ; i++){
                            this.zf_contract.push(val.zf[i].contract_number);
                        }*/
//                        console.log(this.type)
                        switch (parseInt(this.type)){
                            case 1:
                                // 领取
                                this.receiver_time = publicVal.receiver_time;
                                this.receiver_id = publicVal.receiver_id;
                                this.photos.cus_idPhotos = publicVal.album.pz_pic;
                                for (let i in this.photos.cus_idPhotos) {
                                    this.photos.cus_idPhoto.push(i);
                                }
                                break;
                            case 2:
                                // 作废
                                this.receiver_time = publicVal.report_time;
                                this.reality_time = publicVal.actual_time;
                                this.receiver_id = publicVal.reporter_id;
                                this.photos.cus_idPhotos = publicVal.album.scrap_pic;
                                console.log(this.photos.cus_idPhotos);
                                for (let i in this.photos.cus_idPhotos) {
                                    this.photos.cus_idPhoto.push(i);
                                }
                                break;
                            case 3:
                                // 上缴
                                this.receiver_time = publicVal.receiver_time;
                                this.receiver_id = publicVal.receiver_id;
                                this.photos.cus_idPhotos = publicVal.album.paid_pic;
                                for (let i in this.photos.cus_idPhotos) {
                                    this.photos.cus_idPhoto.push(i);
                                }

                                if (val.sf.length>0){
                                    for (let i = 0 ; i<val.sf.length ; i++){
                                        let other = [];
                                        if (val.sf[i].delivery_receitp==1){
                                            other.push(1);
                                        }
                                        if (val.sf[i].receipt==1){
                                            other.push(2);
                                        }
                                        if (val.sf[i].idcard_copy==1){
                                            other.push(3);
                                        }
                                        if (val.sf[i].house_property==1){
                                            other.push(4);
                                        }
                                        this.pay_sf_contract.push({
                                            contract_number : val.sf[i].contract_number,
                                            address : val.sf[i].address,
                                            other : other
                                        })
                                    }
                                }

//                                console.log(this.pay_sf_contract)
//                                console.log(val.zf.length)
                                if (val.zf.length>0){
                                    for (let j = 0 ; j<val.zf.length ; j++){
                                        let other1 = [];
                                        if (val.zf[j].delivery_receitp==1){
                                            other1.push(1);
                                        }
                                        if (val.zf[j].receipt==1){
                                            other1.push(2);
                                        }
                                        this.pay_zf_contract.push({
                                            contract_number : val.zf[j].contract_number,
                                            address : val.zf[j].address,
                                            other : other1
                                        })
                                    }
                                }

//                                console.log(this.pay_zf_contract)

                        }

                    }
                })
            },

            close_(){
                this.area = '01';
                this.operate_man = '';
                this.receiver_time = '';        //领取日期
                this.currentDate = [];        //领取日期
                this.reality_time = '';         //实际日期
                this.currentDate1 = [];        //实际日期

                this.receiver_name = '';        //领取人
                this.receiver_id = '';        //领取人ID
                this.department = '';        //所属部门
                this.department_id = '';        //所属部门ID

                this.sf_num = '';               // 收房合同数
                this.zf_num = '';               // 租房合同数
                this.sf_contract = [];               // 收房合同编号
                this.sf_contract_add = [];               // 新增收房合同编号
                this.zf_contract = [];               // 租房合同编号
                this.zf_contract_add = [];               // 新增租房合同编号
                this.sf_remian_num = '';               // 收房剩余合同数
                this.zf_remian_num = '';               // 租房剩余合同数

                this.pay_sf_contract = [];               // 上缴收房合同
                this.pay_sf_contract_add = [];               // 新增上缴收房合同
                this.pay_zf_contract = [];               // 上缴租房合同
                this.pay_zf_contract_add = [];               // 新增上缴租房合同

                this.del_contract = [];
                this.remark = '';
                this.photos= {
                    cus_idPhotos: {},           //修改图片ID
                    cus_idPhoto: [],            //证件照片
                };

                $('#contractNumEdit').modal('hide');
                this.getDetails();
            },
            //            组织架构
            select(){
                this.configure = {type: 'staff', length: 1};
                $('.selectCustom').modal('show');
            },
            selectDateSend(val){
                this.receiver_name = val.staff[0].name;
                this.receiver_id = val.staff[0].id;
                this.$http.get('finance/staff_info/' + val.staff[0].id).then((res) => {
                    this.department = res.data.data.departmnet_name;
                    this.department_id = res.data.data.department_id;
                })
            },
//            领用/报备/上缴 日期
            getDate(val){
                this.receiver_time = val;
            },
//            实际日期
            getDate2(val){
                this.reality_time = val;
            },
            //            照片ID
            idNumber (val){
                this.photos.cus_idPhoto = val;
            },
//            图片上传完成
            complete(val){
                this.complete_ok = val;
            },
//            删除照片ID
            idNumber_delete (val){
                let index = this.photos.cus_idPhoto.indexOf(val);
                if (index > -1) {
                    this.photos.cus_idPhoto.splice(index, 1);
                }
            },

//            领取、作废 增加合同编号
            plus(num){
                switch (num){
                    case 1:
                        // 收房
                        this.sf_contract_add.push('');
                        break;
                    case 2:
                        // 租房
                        this.zf_contract_add.push('');
                }
                this.changeNum(num);
            },
//            领取、作废 删除合同编号
            minusOld(num,i){
                switch (num){
                    case 1:
                        // 收房
                        switch (parseInt(this.type)){
                            case 1 :
                                // 领取
                                this.$http.post('code/Contract_Number_Record/checkDelete',{
                                    contract_number : this.sf_contract[i]
                                }).then((res)=>{
//                                    console.log(res.data)
                                    if (res.data.code==30028){
                                        // 可删除
                                        this.del_contract.push(this.sf_contract[i]);
                                        this.sf_contract.splice(i,1);
                                    } else {
                                        // 不可删除
                                        this.info.error = res.data.msg;
                                        //显示失败弹窗 ***
                                        this.info.state_error = true;
                                    }
                                });
                                break;
                            case 2 :
                                // 作废
                                this.del_contract.push(this.sf_contract[i]);
                                this.sf_contract.splice(i,1);
                        }
                        /*this.del_contract.push(this.sf_contract[i]);
                        this.sf_contract.splice(i,1);*/
                        break;
                    case 2:
                        // 租房
                        switch (parseInt(this.type)){
                            case 1 :
                                // 领取
                                this.$http.post('code/Contract_Number_Record/checkDelete',{
                                    contract_number : this.zf_contract[i]
                                }).then((res)=>{
//                                    console.log(res.data)
                                    if (res.data.code==30028){
                                        // 可删除
                                        this.del_contract.push(this.zf_contract[i]);
                                        this.zf_contract.splice(i,1);
                                    } else {
                                        // 不可删除
                                        this.info.error = res.data.msg;
                                        //显示失败弹窗 ***
                                        this.info.state_error = true;
                                    }
                                });
                                break;
                            case 2 :
                                // 作废
                                this.del_contract.push(this.zf_contract[i]);
                                this.zf_contract.splice(i,1);
                        }
                        /*this.del_contract.push(this.zf_contract[i]);
                        this.zf_contract.splice(i,1);*/
                }
                this.changeNum(num);
            },
            minusNew(num,i){
                switch (num){
                    case 1 :
                        // 收房
                        this.sf_contract_add.splice(i,1);
                        break;
                    case 2 :
                        // 租房
                        this.zf_contract_add.splice(i,1);
                }
                this.changeNum(num);
            },
            changeNum(num){
                switch (num){
                    case 1:
                        // 收房
//                        if (this.sf_contract.length==0&&this.sf_contract_add.length==0){
//                            this.sf_num = 0;
//                            this.sf_contract_add = [''];
//                        } else {
                            this.sf_num = this.sf_contract.length+this.sf_contract_add.length;
//                        }


                        break;
                    case 2:
                        // 租房
//                        if (this.zf_contract.length==0&&this.zf_contract_add.length==0){
//                            this.zf_num = 0;
//                            this.zf_contract_add = [''];
//                        } else {
                            this.zf_num = this.zf_contract.length+this.zf_contract_add.length;
//                        }

                }
            },

            pitchOld (rul, ev,index,num){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                switch (num){
                    case 1 :
                        // 收房
                        if (evInput.checked) {
                            this.pay_sf_contract[index].other.push(rul);
                        } else {
                            let i = this.pay_sf_contract[index].other.indexOf(rul);
                            if (i > -1) {
                                this.pay_sf_contract[index].other.splice(i, 1);
                            }
                        }
                        break;
                    case 2 :
                        // 租房
                        if (evInput.checked) {
                            this.pay_zf_contract[index].other.push(rul);
                        } else {
                            let i = this.pay_zf_contract[index].other.indexOf(rul);
                            if (i > -1) {
                                this.pay_zf_contract[index].other.splice(i, 1);
                            }
                        }
                }
//                console.log(index)


            },
            pitchNew(rul, ev,index,num){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                switch (num){
                    case 1 :
                        // 收房
                        if (evInput.checked) {
                            this.pay_sf_contract_add[index].other.push(rul);
                        } else {
                            let i = this.pay_sf_contract_add[index].other.indexOf(rul);
                            if (i > -1) {
                                this.pay_sf_contract_add[index].other.splice(i, 1);
                            }
                        }
                        break;
                    case 2 :
                        // 租房
                        if (evInput.checked) {
                            this.pay_zf_contract_add[index].other.push(rul);
                        } else {
                            let i = this.pay_zf_contract_add[index].other.indexOf(rul);
                            if (i > -1) {
                                this.pay_zf_contract_add[index].other.splice(i, 1);
                            }
                        }
                }
            },

            plusPay(num){
                switch (num){
                    case 1 :
                        // 收房
                        this.pay_sf_contract_add.push({
                            contract_number : '',
                            address : '',
                            other : []
                        })
                        this.sf_num = this.pay_sf_contract.length+this.pay_sf_contract_add.length;
                        break;
                    case 2 :
                        // 租房
                        this.pay_zf_contract_add.push({
                            contract_number : '',
                            address : '',
                            other : []
                        })
                        this.zf_num = this.pay_zf_contract.length+this.pay_zf_contract_add.length;
                }
            },
            minusPay(num,type,i){
                switch (num){
                    case 1 :
                        // 收房
                        switch (type){
                            case 'o' :
                                // old
                                this.del_contract.push(this.pay_sf_contract[i]);
                                this.pay_sf_contract.splice(i,1);
                                break;
                            case 'n' :
                                // new
                                this.pay_sf_contract_add.splice(i,1);
                        }
                        this.sf_num = this.pay_sf_contract.length+this.pay_sf_contract_add.length;
                        break;
                    case 2 :
                        // 租房
                        switch (type){
                            case 'o' :
                                // old
                                this.del_contract.push(this.pay_zf_contract[i]);
                                this.pay_zf_contract.splice(i,1);
                                break;
                            case 'n' :
                                // new
                                this.pay_zf_contract_add.splice(i,1);
                        }
                        this.zf_num = this.pay_zf_contract.length+this.pay_zf_contract_add.length;
                }
            },

            edit(){
                let data = {
                    request_time : this.request_time,
                    type: this.type,
                    area : this.area,
                    department_id: this.department_id,
                    ljsf : this.sf_num,
                    ljzf : this.zf_num,
                    remark : this.remark
                };
                switch (parseInt(this.type)){
                    case 1 :
                        // 领取
//                        data.area = this.area;
                        data.receiver_time = this.receiver_time;
                        data.receiver_id = this.receiver_id;
                        data.add_sf = this.sf_contract_add;
                        data.add_zf = this.zf_contract_add;
                        data.pz_pic = this.photos.cus_idPhoto;
                        data.del_contract = this.del_contract;
                        break;
                    case 2 :
                        // 作废
                        data.report_time = this.receiver_time;
                        data.actual_time = this.reality_time;
                        data.reporter_id = this.receiver_id;
                        data.add_sf = this.sf_contract_add;
                        data.add_zf = this.zf_contract_add;
                        data.del_contract = this.del_contract;
                        data.scrap_pic = this.photos.cus_idPhoto;
                        break;
                    case 3 :
                        // 上缴
                        data.paid_time = this.receiver_time;
                        data.paid_id = this.receiver_id;
                        data.add_sf = this.pay_sf_contract.concat(this.pay_sf_contract_add);
                        data.add_zf = this.pay_zf_contract.concat(this.pay_zf_contract_add);
                        data.del_contract = this.del_contract;
                        data.paid_pic = this.photos.cus_idPhoto;
                }
                console.log(data);
                this.$http.post('code/Contract_Number_Record/edit',data).then((res)=>{
//                    console.log(res.data);
                    if(res.data.code==30099){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.close_();
                        $('#contractNumEdit').modal('hide');
                        this.$emit('success');
                    } else {
                        // 失败
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
    div.icon{
        user-select: none;
    }
    div.icon i{
        cursor: pointer;
        font-size: 20px;
        color: #ddd;
        vertical-align: middle;
        margin-left: 3px;
        line-height: 30px;
        display: inline-block;
    }
    div.icon i:hover{
        color: #aaa;
    }

    .padd0{
        padding-left: 0;
        padding-right: 0;
    }
    textarea{
        resize: none;
    }
</style>