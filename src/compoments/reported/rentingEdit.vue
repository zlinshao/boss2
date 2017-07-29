<template>
    <div>
        <div class="modal fade full-width-modal-right" id="edit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="remove_s">×</button>
                            <h4 class="modal-title">编辑租房报备</h4>
                        </div>

                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input title="请点击选择" type="text" class="form-control" readonly @click="selectStaff" v-model="chooseResult.staff_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="chooseResult.department_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">负责人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="chooseResult.leader_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" @click="selectHouse" readonly v-model="chooseResult.house_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" @click="selectClient" readonly v-model="chooseResult.customer_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">租房状态</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.rent_type">
                                            <option :value="value" v-for="(key,value) in dict.rent_type">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">租房年限</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="formData.months">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">付款类型</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-6 padding_0">
                                            <label class="col-sm-2 control-label padding_0">押</label>
                                            <div class="col-sm-10">
                                                <select class="form-control" v-model="formData.bet">
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-2 control-label padding_0">付</label>
                                            <div class="col-sm-10">
                                                <input type="number" class="form-control" v-model="formData.pay">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">月单价</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="formData.price">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">已收科目</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="formData.received_type">
                                                <option :value="value" v-for="(key,value) in dict.received_type">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-8">
                                            <label class="col-sm-4 control-label">已收金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="formData.received_amount">
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label class="col-sm-2 control-label">付款方式</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[0].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[0].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2 icon">
                                            <i @click="addMorePayWay" class="fa fa-plus-circle"></i>
                                            <i @click="minusMorePayWay" class="fa fa-minus-circle"></i>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=2" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[1].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[1].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=3" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[2].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[2].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=4" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[3].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[3].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=5" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[4].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[4].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=6" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[5].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[5].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=7" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[6].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[6].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <div v-show="more_pay_way>=8" class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4 padding_0">
                                            <select class="form-control" v-model="payments[7].payment_id">
                                                <option :value="value" v-for="(key,value) in dict.rent_payment">{{key}}</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="number" class="form-control" v-model="payments[7].money">
                                            </div>
                                        </div>
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">尾款补齐时间</label>
                                    <div class="col-sm-10">
                                        <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间"
                                               class="form-control form_datetime" readonly v-model="formData.complete_date">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">凭证截图</label>
                                    <div class="col-sm-10">
                                        <upLoad @photo="certificatePicId" @delete="picDelete" @complete="complete"
                                                 :result="'certificatePics'" :idPhotos="certificatePic"></upLoad>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">中介费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="formData.cost_medi">
                                    </div>
                                </div>

                                <!--<div class="form-group">
                                    <label class="col-sm-2 control-label">收款方式</label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">sass</option>
                                        </select>
                                    </div>
                                </div>-->

                                <!--<div class="form-group">
                                    <label class="col-sm-2 control-label">收款账户</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.account_id">
                                            <option :value="value" v-for="(key,value) in dict.account">{{key}}</option>
                                        </select>
                                    </div>
                                </div>-->

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">待签约日期</label>
                                    <div class="col-sm-10">
                                        <input @click="remindData" type="text" name="addtime" value="" placeholder="待签约日期"
                                               class="form-control form_datetime" readonly v-model="formData.deal_time">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" cols="5" v-model="formData.remark"></textarea>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" @click="remove_s">取消</button>
                            <button type="button" class="btn btn-success" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSendEdit"></STAFF>

        <SelectHouse @House="getHouse"></SelectHouse>
        <!--提示信息-->
        <Status :state='info'></Status>

        <SelectClient @clientAdd="getClient"></SelectClient>
    </div>
</template>

<script>
    import STAFF from  '../common/organization/selectStaff.vue'
    import SelectHouse from '../common/selectHouse.vue'
    import Status from '../common/status.vue';
    import upLoad from '../common/upload.vue'
    // 选择客户
    import SelectClient from '../common/selectClient.vue'
    export default{
        props : ['id'],
        components: {STAFF,SelectHouse,Status,SelectClient,upLoad},
        data(){
            return {
                certificatePic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                complete_ok: 'ok',

                dict : {},
                configure: [],

                payments : [
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    }
                ],

                chooseResult : {
                    staff_name : '',
                    house_name : '',
                    department_name : '',
                    leader_name : '',
                    customer_name : ''
                },
                formData : {
                    staff_id : '',
                    department_id : '',
                    leader_id : '',
                    house_id : '',
                    customer_id : '',

                    rent_type : 1,
                    rent_relation_id : '',
                    months : '',
                    pay : '',
                    bet : 0,
                    price : '',
                    cost_medi : '',
//                    is_medi
                    cost_deposit : '',
                    payment : [],
                    deal_time : '',
                    receipt_pic : [],
                    received_type : 1,
                    received_amount : '',
//                    account_id : 1,
                    complete_date : '',
                    remark : '',
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

                more_pay_way : 1,       // 付款方式
            }
        },
        updated (){
            this.remindData();
//            时间选择
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => this.dict = res.data
                );
            this.$http.get('staff/details')
                .then(
                    (res) => {
                        let val = res.data;
//                        console.log(val);
                        this.chooseResult.leader_name = val.leader_name;
                        this.chooseResult.department_name = val.department_name;
                        this.formData.leader_id = val.leader_id;
                        this.formData.department_id = val.department_id;
                    }
                );
        },
        watch : {
            id(val){
//                console.log(val);
//                console.log($('#edit').css('display'))
                if (val!=0){
                    this.$http.get('checkin/rent/'+val)
                        .then(
                            (res) => {
//                                console.log(res.data.data);
                                let val = res.data.data;
                                if (val.staff!=null){
                                    this.chooseResult.staff_name=val.staff.real_name;
                                }
                                if (val.department!=null){
                                    this.chooseResult.department_name=val.department.name;
                                }
                                if (val.leader!=null){
                                    this.chooseResult.leader_name=val.leader.real_name;
                                }
                                if (val.customer!=null){
                                    this.chooseResult.customer_name=val.customer.name;
                                }
                                if (val.house!=null){
                                    this.chooseResult.house_name=val.house.detailed_address;
                                }

//                                console.log(val.payment);
                                this.more_pay_way = val.payment.length;
//                                console.log(this.more_pay_way);
                                for (let i = 0; i<this.more_pay_way ; i++){
//                                    console.log(i);
                                    this.payments[i].payment_id = val.payment[i].payment_id;
                                    this.payments[i].money = val.payment[i].money;
                                }


                                this.formData.staff_id = val.staff_id;
                                this.formData.department_id = val.department_id;
                                this.formData.leader_id = val.leader_id;
                                this.formData.house_id = val.house_id;
                                this.formData.customer_id = val.customer_id;

                                this.formData.months = val.months;
                                this.formData.pay = val.pay;
                                this.formData.bet = val.bet;
                                this.formData.price = val.price;
                                this.formData.cost_medi = val.cost_medi;
                                this.formData.cost_deposit = val.cost_deposit;

                                this.certificatePic.cus_idPhoto = [];
                                this.certificatePic.cus_idPhotos = val.album.receipt_pic;
                                for (let i in this.certificatePic.cus_idPhotos) {
                                    this.certificatePic.cus_idPhoto.push(i);
                                }

                                this.formData.deal_time = val.deal_time;
                                this.formData.receipt_pic = val.receipt_pic;
                                this.formData.received_type = val.received_type;
                                this.formData.received_amount = val.received_amount;
//                                this.formData.account_id = val.account_id;
                                this.formData.complete_date = val.complete_date;

                                this.formData.remark = val.remark;

                                this.complete_ok = 'ok';

                            }
                        )
//                    console.log(this.dateConfigure)
                }

            }
        },
        methods: {
            closeModal(){
                // 清空
                this.payments = [
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    },
                    {
                        payment_id:1,
                        money : ''
                    }
                ];

                this.chooseResult.staff_name = '';
                this.chooseResult.house_name = '';
//                this.chooseResult.department_name = '';
//                this.chooseResult.leader_name = '';
                this.chooseResult.customer_name = '';

                this.formData.staff_id = '';
//                this.formData.department_id = '';
//                this.formData.leader_id = '';
                this.formData.house_id = '';
                this.formData.customer_id = '';
                this.formData.rent_type = 1;
                this.formData.rent_relation_id = '';
                this.formData.months = '';
                this.formData.pay = '';
                this.formData.bet = 0;
                this.formData.price = '';
                this.formData.cost_medi = '';
                this.formData.cost_deposit = '';
                this.formData.payment = [];
                this.formData.deal_time = '';
                this.formData.receipt_pic = [];
                this.formData.received_type = 1;
                this.formData.received_amount = '';
//                this.formData.account_id = 1;
                this.formData.complete_date = '';

                this.formData.remark = '';

                this.remove_s ();

                $('#edit').modal('hide');
            },

            selectStaff(){
                // 选择签约人
                this.configure = {length: 1, class: 'amount'};
                $('.selectCustom:eq(1)').modal('show');
            },
            selectDateSendEdit(data){
                // 选择人
//                alert(2)
//                console.log(data.staff[0].id)
                if (data.staff.length!=0){
                    this.formData.staff_id = data.staff[0].id;
                    this.chooseResult.staff_name = data.staff[0].name;
                }
            },

            selectHouse(){
                $('.selectHouse:eq(1)').modal('show');
            },
            getHouse(data){
                // 选择房屋
//                alert(data)
//                console.log(data);
                this.formData.house_id = data.id;
                this.chooseResult.house_name = data.address;
            },

            selectClient(){
                $('.selectClient:eq(1)').modal('show');
            },
            getClient(data){
                // 选择客户
//                console.log(data);
                this.formData.customer_id = data.id;
                this.chooseResult.customer_name = data.name;

            },

            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: "top-left",
//                    endDate: new Date(),
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder === '补齐时间') {
                        this.formData.complete_date = ev.target.value;
                    } else if (ev.target.placeholder === '待签约日期') {
                        this.formData.deal_time = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },

            // 付款方式
            addMorePayWay(){
                // 增加付款方式
                if (this.more_pay_way==7){
                    return;
                } else {
                    this.more_pay_way++;
                }
            },
            minusMorePayWay(){
                // 减少付款方式
                if (this.more_pay_way==1){
                    return;
                } else {
                    this.formData.payment[this.more_pay_way-1] = {
                        payment_id:1,
                        money : ''
                    };
                    this.more_pay_way--;
                }
            },


            // 删除图片
            remove_s (){
                $('.rem_div').remove();
            },
            // 图片上传
            certificatePicId(data){
                // 获取图片
                this.certificatePic.cus_idPhoto = data;
            },
            picDelete(data){
                // 删除图片
                let index = this.certificatePic.cus_idPhoto.indexOf(data);
                if (index > -1) {
                    this.certificatePic.cus_idPhoto.splice(index, 1);
                }
            },
            complete(data){
                this.complete_ok = data;
            },
            cus_confirm(num){
                // 提交时调用
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0 || res.data.data === null) {
                            this.save(num);
                        }
                    });
                }
                else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },

            modify(){
                this.formData.receipt_pic = this.certificatePic.cus_idPhoto;
                this.formData.payment = this.payments.slice(0,this.more_pay_way);

                this.$http.put('checkin/rent/'+this.id,this.formData)
                    .then(
                        (res) => {
                            if (res.data.code == 18110){
                                // 成功
                                this.info.success = '修改报备成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
//                                this.closeModal()
//                                this.remove_s ();
                                $('#edit').modal('hide');
                                this.$emit('save');
                            } else {
                                // 失败
                                this.info.error = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_error = false;
                                }, 2000);
                            }
                        }
                    )
            }
        }
    }
</script>

<style scoped>
    .col-sm-2.icon{
        user-select: none;
    }
    .col-sm-2.icon i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /* text-align: left; */
        cursor: pointer;
    }
    .col-sm-2.icon i+i{
        margin-left: 5px;
    }
    .col-sm-2.icon i:hover{
        color: #999;
    }
    #edit{
        z-index: 1044;
    }
</style>