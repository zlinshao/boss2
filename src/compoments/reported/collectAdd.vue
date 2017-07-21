<template>
    <div>
        <div class="modal fade full-width-modal-right" id="add" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">新增收房报备</h4>
                    </div>
                    <div class="modal-body clearFix">
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
                                    <input type="text" class="form-control" data-toggle="modal" data-target="#selectHouse" readonly v-model="chooseResult.house_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" data-toggle="modal" data-target="#selectClient" readonly v-model="chooseResult.customer_name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">收房年限</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.years">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款方式</label>
                                <div class="col-sm-7">
                                    <select class="form-control" v-model="one_type">
                                        <option :value="value" v-for="(key,value) in dict.pay_type">{{key}}</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label"><input type="checkbox" @click="changePayType($event)">变化</label>
                                </div>
                            </div>

                            <div class="form-group" v-show="pay_typeChange">
                                <div class="col-sm-6" v-for="(item,index) in more_type">
                                    <label class="col-sm-5 control-label">第{{index+1}}年</label>
                                    <div class="col-sm-7">
                                        <select class="form-control" v-model="more_type[index]">
                                            <option :value="value" v-for="(key,value) in dict.pay_type">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <FlexBox :flexData="formData.years" :datas="datas" @sendData="getFlexData"></FlexBox>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">空置期</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.vacancy">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">押金</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.cost_deposit">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">是否中介</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.is_medi" @change="medi">
                                        <option value="1">是</option>
                                        <option value="2">否</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">中介费</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" v-model="formData.cost_medi" :readonly="formData.is_medi==2" >
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">签约日期</label>
                                <div class="col-sm-10" style="padding-left: 30px;">
                                    <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款方式</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model="formData.payment">
                                        <option value="">银行卡</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款账户</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="formData.account">
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
                        <div>
                            <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                            <button type="button" class="btn btn-primary">保存为草稿</button>
                            <button type="button" class="btn btn-warning" @click="save">保存并提交</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <SelectHouse @House="getHouse"></SelectHouse>
        <!--提示信息-->
        <Status :state='info'></Status>

        <SelectClient @clientAdd="getClient"></SelectClient>
    </div>
</template>

<script>
    import STAFF from  '../common/organization/selectStaff.vue'
    import SelectHouse from '../common/selectHouse.vue'
    import FlexBox from '../common/flexBox.vue'
    import DatePicker from '../common/datePicker.vue'
    import Status from '../common/status.vue';
    // 选择客户
    import SelectClient from '../common/selectClient.vue'

    export default{
        components: {STAFF,SelectHouse,FlexBox,DatePicker,Status,SelectClient},
        data(){
            return {
                dict : {},

                configure: [],

                datas: [],

                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                        position : 'top-left'
                    }
                ],

                pay_typeChange : false,
                one_type : '1',
                more_type : [],

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
                    years : '',
                    pay_type : [],
                    price : [],
                    vacancy : '',
                    cost_medi : '0',
                    is_medi : 1,
                    cost_deposit : '',
                    deal_time : '',
                    payment : 1,
                    remark : '',
                    account : ''
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
        mounted (){
            this.$http.get('http://test.v2.api.boss.lejias.cn/revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                    }
                )
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
                )

            this.formData.pay_type.push(this.one_type);
        },
        watch : {
            one_type(curVal,oldVal){
                if (curVal!=oldVal){
                    if (!this.pay_typeChange){
                        this.formData.pay_type = [];
                        this.formData.pay_type.push(curVal);
                    }
                }
            },

            pay_typeChange(curVal,oldVal){
//                console.log(curVal)
//                console.log(oldVal)
                this.formData.pay_type = [];
                if (curVal){
                    // 变化
                    this.formData.pay_type = this.more_type;
                } else {
                    this.formData.pay_type.push(this.one_type);
                }
            }
        },
        methods: {
            closeModal(){
                $('#add').modal('hide');
            },
            selectStaff(){
                // 选择签约人
                this.configure = {length: 1, class: 'amount'};
                $('#selectCustom').modal('show');
            },
            selectDateSend(data){
                // 选择人
//                console.log(data.staff[0].id)
                this.formData.staff_id = data.staff[0].id;
                this.chooseResult.staff_name = data.staff[0].name;
            },
            getHouse(data){
                // 选择房屋
//                console.log(data);
                this.formData.house_id = data.id;
                this.chooseResult.house_name = data.address;
            },

            getFlexData(data){
                console.log(data)
                this.formData.price = data;
            },
            getDate(data){
                // 获取时间
//                console.log(data);
                this.formData.deal_time = data;
            },
            getClient(data){
                // 选择客户
//                console.log(data);
                this.formData.customer_id = data.id;
                this.chooseResult.customer_name = data.name;

            },

            changePayType(ev){
                this.formData.pay_type = [];
                if (ev.currentTarget.checked){
//                    console.log(this.formData.years);
                    this.pay_typeChange = true;
                    this.more_type = [];
                    if (this.formData.years!=''){
                        for (let i = 0;i<this.formData.years;i++){
                            this.more_type.push('1');
                        }
                    }
//                    console.log(this.more_type)
                } else {
                    this.pay_typeChange = false;
//                    this.formData.pay_type.push(one_type);
                }
//                console.log(this.formData.pay_type);
//                console.log(this.formData.pay_type.length);
            },
            save(){
                // 新增
//                console.log(this.formData);
                this.$http.post('checkin/collect',this.formData)
                    .then(
                        (res) => {
                            if (res.data.code == 18210){
                                // 成功
                                this.info.success = '新增报备成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                            } else {
                                // 失败
                                this.info.error = '新增报备失败';
                                //显示失败弹窗 ***
                                this.info.state_error = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_error = false;
                                }, 2000);
                            }
                        }
                    )
                this.closeModal()
            },
            medi(){
                // 是否中介
                if (this.formData.is_medi==2){
                    // 否
                    this.formData.cost_medi = 0;
                }
//                console.log(this.formData.cost_medi)
            }

        }
    }
</script>

<style scoped>
    textarea{
        max-width: 100%;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
        margin-right: 8px;
        vertical-align: bottom;
    }
</style>