<template>
    <div>
        <div class="modal fade full-width-modal-right" id="contractNumAdd" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true" @click="close_">&times;</span>
                            </button>
                            <h4 class="modal-title">新建任务</h4>
                        </div>
                        <div class="modal-body has-js">
                            <div class="panel-body">
                                <form class="form-horizontal clearFix">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">任务类型</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="new_status" @change="close_empty">
                                                <option value="1">领取</option>
                                                <!--<option value="2">作废</option>-->
                                                <option value="3">上缴</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="new_status == 1">
                                        <label class="col-sm-2 control-label">地区</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="area" @change="getStatic">
                                                <option :value="value" v-for="(key,value) in dict.area">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="new_status == 1">领用日期</label>
                                        <label class="col-sm-2 control-label" v-if="new_status == 2">报备日期</label>
                                        <label class="col-sm-2 control-label" v-if="new_status == 3">上缴日期</label>
                                        <div class="col-sm-10">
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                        :idName="'receiveDate'"
                                                        @sendDate="getDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="new_status == 2">
                                        <label class="col-sm-2 control-label">实到日期</label>
                                        <div class="col-sm-10">
                                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                        :idName="'receiveDate2'"
                                                        @sendDate="getDate2"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="new_status == 1">领用人</label>
                                        <label class="col-sm-2 control-label" v-if="new_status == 2">报备人</label>
                                        <label class="col-sm-2 control-label" v-if="new_status == 3">上缴人</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" placeholder="点击选择员工"
                                                   v-model="receiver_name" @click='select' readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="department" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" v-if="new_status == 1">领用合同数(收)</label>
                                        <label class="col-sm-2 control-label" v-if="new_status == 2">作废合同数(收)</label>
                                        <label class="col-sm-2 control-label" v-if="new_status == 3">上缴合同数(收)</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="collect_num" class="form-control"
                                                   @blur="turn_in_collect">
                                        </div>
                                    </div>
                                    <!--领取-->
                                    <div v-if="new_status == 1">
                                        <div class="form-group">
                                            <label class="col-xs-12 col-sm-2 control-label">本次领取合同编号记录(收)</label>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="collect_num_start" @blur="getCollectEnd">
                                            </div>
                                            <div class="col-xs-2 text-center" style="line-height: 30px;">
                                                到
                                            </div>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="collect_num_end" readonly>
                                            </div>
                                        </div>
                                        <!--<div class="form-group">
                                            <label class="col-sm-2 control-label">剩余合同数(收)</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="collect_surplus">
                                            </div>
                                        </div>-->
                                        <div class="form-group">
                                            <label class="col-xs-12 col-sm-2 control-label">领取合同数(租)</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="rent_num" @blur="turn_in_rent">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">本次领取合同编号记录(租)</label>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="rent_num_start" @blur="getRentEnd">
                                            </div>
                                            <div class="col-xs-2 text-center" style="line-height: 30px;">
                                                到
                                            </div>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="rent_num_end" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <!--作废-->
                                    <div v-if="new_status == 2">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">合同编号记录</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="record_num_rent">
                                            </div>
                                        </div>
                                        <!--<div class="form-group">
                                            <label class="col-sm-2 control-label">剩余合同数(收)</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="collect_surplus">
                                            </div>
                                        </div>-->
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">作废合同</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="rent_num">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">合同编号录入(租)</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="record_num_collect">
                                            </div>
                                        </div>
                                    </div>
                                    <!--上缴-->
                                    <div v-if="new_status == 3">
                                        <div class="form-group" v-for="(item, index) in collect_turn_num">
                                            <label class="col-xs-12 col-sm-2 control-label">合同编号</label>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="collect_turn_num[index].contract_number">
                                            </div>
                                            <div class="col-xs-2 text-center" style="line-height: 30px; padding: 0;">
                                                地址
                                            </div>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="collect_turn_num[index].address">
                                            </div>
                                            <div class="col-xs-12 text-right">
                                                <label :class="{'label_check':true,'c_on':collect_turn_num[index].other.indexOf(1) > -1,
                                                'c_off':collect_turn_num[index].other.indexOf(1) == -1}"
                                                       @click.prevent="collect_id(1, $event,index)">
                                                    <input type="checkbox" class="pull-left"
                                                           :checked="collect_turn_num[index].other.indexOf(1) > -1">交接单
                                                </label>
                                                <label :class="{'label_check':true,'c_on':collect_turn_num[index].other.indexOf(2) > -1,
                                                'c_off':collect_turn_num[index].other.indexOf(2) == -1}"
                                                       @click.prevent="collect_id(2, $event,index)">
                                                    <input type="checkbox" class="pull-left"
                                                           :checked="collect_turn_num[index].other.indexOf(2) > -1">收条
                                                </label>
                                                <label :class="{'label_check':true,'c_on':collect_turn_num[index].other.indexOf(3) > -1,
                                                'c_off':collect_turn_num[index].other.indexOf(3) == -1}"
                                                       @click.prevent="collect_id(3, $event,index)">
                                                    <input type="checkbox" class="pull-left"
                                                           :checked="collect_turn_num[index].other.indexOf(3) > -1">身份证
                                                </label>
                                                <label :class="{'label_check':true,'c_on':collect_turn_num[index].other.indexOf(4) > -1,
                                                'c_off':collect_turn_num[index].other.indexOf(4) == -1}"
                                                       @click.prevent="collect_id(4, $event,index)">
                                                    <input type="checkbox" class="pull-left"
                                                           :checked="collect_turn_num[index].other.indexOf(4) > -1">房产证复印件
                                                </label>
                                            </div>
                                        </div>
                                        <!--<div class="form-group">
                                            <label class="col-sm-2 control-label">剩余合同数(收)</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="collect_surplus">
                                            </div>
                                        </div>-->
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">上缴合同数(租)</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" v-model="rent_num"
                                                       @blur="turn_in_rent">
                                            </div>
                                        </div>

                                        <div class="form-group" v-for="(item,index) in rent_turn_num">
                                            <label class="col-xs-12 col-sm-2 control-label">上缴合同数</label>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="rent_turn_num[index].contract_number">
                                            </div>
                                            <div class="col-xs-2 text-center" style="line-height: 30px; padding: 0;">
                                                地址
                                            </div>
                                            <div class="col-xs-5 col-sm-4">
                                                <input type="text" class="form-control" v-model="rent_turn_num[index].address">
                                            </div>
                                            <div class="col-xs-12 text-right">
                                                <label :class="{'label_check':true,'c_on':rent_turn_num[index].other.indexOf(1) > -1,
                                                'c_off':rent_turn_num[index].other.indexOf(1) == -1}"
                                                       @click.prevent="rent_id(1, $event,index)">
                                                    <input type="checkbox" class="pull-left"
                                                           :checked="rent_turn_num[index].other.indexOf(1) > -1">交接单
                                                </label>
                                                <label :class="{'label_check':true,'c_on':rent_turn_num[index].other.indexOf(2) > -1,
                                                'c_off':rent_turn_num[index].other.indexOf(2) == -1}"
                                                       @click.prevent="rent_id(2, $event,index)">
                                                    <input type="checkbox" class="pull-left"
                                                           :checked="rent_turn_num[index].other.indexOf(2) > -1">收条
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!--<div class="form-group">
                                        <label class="col-sm-2 control-label">剩余合同数(租)</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="rent_surplus" readonly>
                                        </div>
                                    </div>-->
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">截图凭证</label>
                                        <div class="col-sm-10">
                                            <up-load @photo="idNumber" @delete="idNumber_delete"
                                                     @complete="complete"
                                                     :result="'id_number'" :idPhotos="photos"></up-load>
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
                            <button type="button" class="btn btn-primary" @click="personal_add">确认</button>
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
    export default{
        props: ['msg'],
        components: {DatePicker, STAFF, upLoad,Status},
        data(){
            return {
                dict : {},

                collect_turn_num: [],
                rent_turn_num: [],
                new_status: 1,
                area  : '01',
                collect_pitch: [],
                rent_pitch: [],
                receiver_time: '',              //领取日期
                reality_time: '',               //实际日期
                receiver_name: '',              //领取人
                receiver_id: '',                //领取人ID
                department: '',                 //所属部门
                department_id: '',              //所属部门ID
                collect_num: '',                //领取合同数(收)
//                领取
                collect_num_start: '',          //从X
                collect_num_end: '',            //到X
                collect_surplus: '',            //剩余合同数(收)
                rent_num: '',                   //领取合同数(租)
                rent_num_start: '',             //从X
                rent_num_end: '',               //到X
//                作废
                record_num_rent: '',            //合同编号记录 收
                record_num_collect: '',         //合同编号记录 租

                rent_surplus: '',               //剩余合同数(租)

                operate_man: '',                //操作人
//                operate_man_id: '',             //操作人ID

//                sf_collect : [],
//                zf_collect : [],


                currentDate: [],                //时间组件
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
        watch: {
            msg (val){
                this.new_status = val;
            },
            collect_turn_num (val) {
//                console.log(val);
            },
            rent_turn_num (val) {
//                console.log(val);
            }
        },
        mounted(){
            this.photos.cus_idPhotos = {};
            this.$http.get('staff/info').then((res) => {
                this.operate_man = res.data.name;
//                this.operate_man_id = res.data.id;
            });
            this.$http.get('code/Contract_Number_Record/dict').then((res)=>{
//                console.log(res.data.area);
                this.dict = res.data;
            });
            this.getStatic();
        },
        methods: {
//            上缴合同数 收
            turn_in_collect (){
                this.collect_turn_num = [];
                if (this.collect_num !== '') {
                    for (let i = 0; i < this.collect_num; i++) {
                        this.collect_turn_num.push({
                            contract_number : '',
                            address : '',
                            other : []
                        });
                    }
                }

                this.getCollectEnd();
            },
//            上缴合同数 租
            turn_in_rent (){
                this.rent_turn_num = [];
                if (this.rent_num !== '') {
                    for (let i = 0; i < this.rent_num; i++) {
                        this.rent_turn_num.push({
                            contract_number : '',
                            address : '',
                            other : []
                        });
                    }
                }
                this.getRentEnd();
            },
//            领用/报备/上缴 日期
            getDate(val){
                this.receiver_time = val;
            },
//            实际日期
            getDate2(val){
                this.reality_time = val;
            },

            // 获取默认起始编号
            getStatic(){
                this.$http.post('code/Contract_Number_Record/getMaxContractNumber',{
//                    contract_type : 1,
                    area : this.area
                }).then((res)=>{
//                    console.log(res.data);
                    this.collect_num_start = res.data.sf;
                    this.rent_num_start = res.data.zf;
                })
            },

//            组织架构
            select(){
                this.configure = {type: 'staff', length: 1};
                $('.selectCustom:eq(1)').modal('show');
            },
//            领取人
            selectDateSend(val){
                this.receiver_name = val.staff[0].name;
                this.receiver_id = val.staff[0].id;
                this.$http.get('finance/staff_info/' + val.staff[0].id).then((res) => {
                    this.department = res.data.data.departmnet_name;
                    this.department_id = res.data.data.department_id;
                })
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
//            清空
            close_empty (){
                this.collect_turn_num = [];
                this.rent_turn_num = [];
                this.area = '01';
                this.collect_pitch = [];
                this.rent_pitch = [];
                this.receiver_time = '';              //领取时间
                this.currentDate = [];                //领取时间显示
                this.receiver_name = '';              //领取人
                this.receiver_id = '';                //领取人ID
                this.department = '';                 //所属部门
                this.department_id = '';              //所属部门ID
                this.collect_num = '';                //领取合同数(收)
                this.collect_num_start = '';          //从X
                this.collect_num_end = '';            //到X
                this.collect_surplus = '';            //剩余合同数(收)
                this.rent_num = '';                   //领取合同数(租)
                this.rent_num_start = '';             //从X
                this.rent_num_end = '';               //到X
                this.record_num_rent = '';            //合同编号记录 收
                this.record_num_collect = '';         //合同编号记录 租

                this.rent_surplus = '';               //剩余合同数(租)
//                this.operate_man = '';                //操作人
//                this.operate_man_id = '';             //操作人
                $('.rem_div').remove();
                this.photos.cus_idPhoto = [];
                this.getStatic();
            },
//            取消
            close_ (){
                this.close_empty();
                $('#contractNumAdd').modal('hide');
            },
//            上缴选中 收
            collect_id (rul, ev,index){
                console.log(index)
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.collect_turn_num[index].other.push(rul);
                } else {
                    let i = this.collect_turn_num[index].other.indexOf(rul);
                    if (i > -1) {
                        this.collect_turn_num[index].other.splice(i, 1);
                    }
                }
            },
//            上缴选中 租
            rent_id (rul, ev,index){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.rent_turn_num[index].other.push(rul);
                } else {
                    let i = this.rent_turn_num[index].other.indexOf(rul);
                    if (i > -1) {
                        this.rent_turn_num[index].other.splice(i, 1);
                    }
                }
            },

            // 获取收房合同结束编号
            getCollectEnd(){
                if (this.collect_num!=''&&this.collect_num_start!=''){
                    this.collect_num_end = parseInt(this.collect_num_start)+parseInt(this.collect_num)+'';
//                    console.log(this.collect_num_end.length);
                    if (this.collect_num_end.length<this.collect_num_start.length){
                        let length = this.collect_num_start.length-this.collect_num_end.length;
                        let add = '';
                        for (let i = 0 ; i<length ; i++){
                            add+='0';
                        }
                        this.collect_num_end = add+this.collect_num_end;
                    }
                }
            },
            // 获取租房合同结束编号
            getRentEnd(){
                if (this.rent_num!=''&&this.rent_num_start!=''){
                    this.rent_num_end = parseInt(this.rent_num_start)+parseInt(this.rent_num)+'';
//                    console.log(this.rent_num_end.length);
                    if (this.rent_num_end.length<this.rent_num_start.length){
                        let length = this.rent_num_start.length-this.rent_num_end.length;
                        let add = '';
                        for (let i = 0 ; i<length ; i++){
                            add+='0';
                        }
                        this.rent_num_end = add+this.rent_num_end;
                    }
                }
            },

//            上缴新增
            personal_add (){
//                console.log(this.photos.cus_idPhoto)
                let data = {
                    type: this.new_status,
                    area: this.area,
                    receiver_time: this.receiver_time,
                    paid_time: this.receiver_time,
                    receiver_id: this.receiver_id,
                    paid_id: this.receiver_id,
                    department_id: this.department_id,
                    ljsf: this.collect_num,
                    ljsf_record_start: this.collect_num_start,
                    ljsf_record_end: this.collect_num_end,
                    ljzf: this.rent_num,
                    ljzf_record_start: this.rent_num_start,
                    ljzf_record_end: this.rent_num_end,
                    extra_ljzf: [],
                    extra_ljsf: [],
                    pz_pic: this.photos.cus_idPhoto,
                    paid_ljsf : this.collect_turn_num,
                    paid_ljzf : this.rent_turn_num
                };
//                console.log(data)
//                console.log(this.collect_turn_num)
//                console.log(this.rent_turn_num)

                this.$http.post('code/Contract_Number_Record/add', data).then((res) => {
                    console.log(res.data);
                    if (res.data.code==30012){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        $('#contractNumAdd').modal('hide');
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
    .has-js .label_check, .has-js .label_radio {
        padding-left: 19px;
        margin-left: 6px;
    }
</style>