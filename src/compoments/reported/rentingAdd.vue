<template>
    <div>
        <div class="modal fade full-width-modal-right" id="add" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" @click="closeModal">×</button>
                            <h4 class="modal-title">新增租房报备</h4>
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
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" data-toggle="modal" data-target="#selectClient" readonly v-model="chooseResult.customer_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" data-toggle="modal" data-target="#selectHouse" readonly v-model="chooseResult.house_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">租房状态</label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option :value="value" v-for="(key,value) in dict.rent_type">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">付款类型</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-6">
                                            <label class="col-sm-2 control-label">押</label>
                                            <div class="col-sm-10">
                                                <select class="form-control">
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-2 control-label">付</label>
                                            <div class="col-sm-10">
                                                <select class="form-control">
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">月单价</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">已收科目</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-8">
                                            <label class="col-sm-4 control-label">已收金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label class="col-sm-2 control-label">付款方式</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2 icon">
                                            <i class="fa fa-plus-circle"></i>
                                            <i class="fa fa-minus-circle"></i>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="col-sm-4 control-label">金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                        </div>
                                    </div>
                                </div>-->

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">尾款补齐时间</label>
                                    <div class="col-sm-10">
                                        <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间"
                                               class="form-control form_datetime">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">凭证截图</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">中介费</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">收款方式</label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">sass</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">收款账户</label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">sass</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">待签约日期</label>
                                    <div class="col-sm-10">
                                        <input @click="remindData" type="text" name="addtime" value="" placeholder="待签约日期"
                                               class="form-control form_datetime">
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
                                <button type="button" class="btn btn-warning">保存并提交</button>
                            </div>
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
    import Status from '../common/status.vue';
    // 选择客户
    import SelectClient from '../common/selectClient.vue'
    export default{
        components: {STAFF,SelectHouse,Status,SelectClient},
        data(){
            return {
                dict : {},
                configure: [],

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
        methods: {
            closeModal(){
                // 清空
                this.pay_typeChange = false;
                this.one_type = '1';
                this.more_type = [];

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

                this.formData.remark = '';


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
                    endDate: new Date(),
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder === '补齐时间') {
//                        this.params.from = ev.target.value;
                    } else if (ev.target.placeholder === '签约日期') {
//                        this.params.to = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
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

    }
</style>