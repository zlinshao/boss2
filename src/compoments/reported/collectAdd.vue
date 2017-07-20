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
                                    <input type="text" class="form-control">
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
                                    <select class="form-control">
                                        <option value="">季付</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                    <label class="control-label"><input type="checkbox" @click="changePayType($event)">变化</label>
                                </div>
                            </div>

                            <div class="form-group" v-show="formData.pay_type.length!=0">
                                <div class="col-sm-6" v-for="(item,index) in formData.pay_type">
                                    <label class="col-sm-5 control-label">第{{index+1}}年</label>
                                    <div class="col-sm-7">
                                        <select class="form-control" v-model="formData.pay_type[index]">
                                            <option :value="value" v-for="(key,value) in dict.pay_type">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <FlexBox :flexData="formData.years" :datas="datas" @sendData="getFlexData"></FlexBox>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">空置期</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">押金</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">是否中介</label>
                                <div class="col-sm-10">
                                    <select class="form-control">
                                        <option value="1">是</option>
                                        <option value="0">否</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">中介费</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control">
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
                                    <select class="form-control">
                                        <option value="">银行卡</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">汇款账户</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" cols="5"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="button" class="btn btn-default">取消</button>
                            <button type="button" class="btn btn-primary">完成</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <SelectHouse @House="getHouse"></SelectHouse>

    </div>
</template>

<script>
    import STAFF from  '../common/organization/selectStaff.vue'
    import SelectHouse from '../common/selectHouse.vue'
    import FlexBox from '../common/flexBox.vue'
    import DatePicker from '../common/datePicker.vue'
    export default{
        components: {STAFF,SelectHouse,FlexBox,DatePicker},
        data(){
            return {
                dict : {},

                configure: [],

                datas: [],

                dateConfigure : [
                    {
                        range : false,
                        needHour : false
                    }
                ],

                chooseResult : {
                    staff_name : '',
                    house_name : '',
                    department_name : '',
                    leader_name : '',
                },
                formData : {
                    staff_id : '',
                    department_id : '',
                    leader_id : '',
                    house_id : '',
                    years : '',
                    pay_type : [],
                    price : [],
                    vacancy : '',
                    cost_medi : '',
                    is_midi : '',
                    cost_deposit : '',
                    deal_time : '',
                    remark : '',
                    account : ''
                }

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
                        console.log(val);
                        this.chooseResult.leader_name = val.leader_name;
                        this.chooseResult.department_name = val.department_name;
                        this.formData.leader_id = val.leader_id;
                        this.formData.department_id = val.department_id;
                    }
                )
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

            changePayType(ev){
                if (ev.currentTarget.checked){
                    console.log(this.formData.years)
                    if (this.formData.years!=''){
                        for (let i = 0;i<this.formData.years;i++){
                            this.formData.pay_type.push('1');
                        }
                    }
                } else {
                    this.formData.pay_type = [];
                }
//                console.log(this.formData.pay_type);
//                console.log(this.formData.pay_type.length);
            },

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