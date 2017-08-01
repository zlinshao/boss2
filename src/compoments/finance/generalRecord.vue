<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">转账操作记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline" role="form">
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group clearFix">
                            <select class="form-control" v-model="params.type" @change="search(1)">
                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                            </select>
                        </div>

                        <div class="input-group clearFix">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="搜索账户名称" v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)"><i
                                        class="fa fa-search"></i></button>
                            </span>
                        </div>

                        <div class="form-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#myModal">
                                <i class="fa fa-plus-square"></i>&nbsp;新增转账记录
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </section>


        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">转账日期</th>
                            <th class="text-center">转出账户</th>
                            <th class="text-center">账户余额</th>
                            <th class="text-center">转入账户</th>
                            <th class="text-center">账户余额</th>
                            <th class="text-center">转账金额</th>
                            <th class="text-center">转账人员</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>{{item.transfer_date}}</td>
                            <td>{{item.out_name}}</td>
                            <td>{{item.amount_final_out}}</td>
                            <td>{{item.in_name}}</td>
                            <td>{{item.amount_final_in}}</td>
                            <td>{{item.amount_transfer}}</td>
                            <td>{{dict.staff_id[item.operator_id]}}</td>
                            <td>{{item.remark}}</td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="9">暂无数据...</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" @click="clearForm"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">新增转账记录</h4>
                        </div>

                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转账日期<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime" v-model="formData.transfer_date">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转出账户<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.account_id_out" @change="getOutRemain">
                                            <option value="">--请选择--</option>
                                            <option :value="value" v-for="(key,value) in dict.account">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转入账户<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.account_id_in" @change="getInRemain">
                                            <option value="">--请选择--</option>
                                            <option :value="value" v-for="(key,value) in dict.account">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转账人员</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly v-model="logName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转出账户余额</label>
                                    <div class="col-sm-10">
                                        <input type="number" min="0" class="form-control" readonly v-model="account_out_remain">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转入账户余额</label>
                                    <div class="col-sm-10">
                                        <input type="number" min="0" class="form-control" readonly v-model="account_in_remain">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转账金额<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="number" min="0" class="form-control" v-model="formData.amount_transfer">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remark"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                            <button type="button" class="btn btn-primary" @click="add">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>
        <!--提示信息-->
        <Status :state='info'></Status>

    </div>
</template>
<style scoped>
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    textarea{
        max-width: 100%;
    }
</style>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'

    export default{
        components: {Page,Status,DatePicker},
        data(){
            return {
                beforePage : 1,
                dict : {},
                isShow : false,

                operId : 0,
                paging : '',
                page : 1,                  // 当前页数

                myData : [],

                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                params : {
                    type : 1,
                    range : '',
                    search : ''
                },
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

                logName : '',
                account_in_remain : '',
                account_out_remain : '',

                formData : {
                    transfer_date : '',
                    account_id_out : '',
                    account_id_in : '',
                    amount_transfer : '',
                    remark : ''
                }
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
                    (res) => {
                        this.dict = res.data;
                        this.generalRecordList();
                    }
                );
            // 获取当前登录人的姓名
            this.$http.get('staff/info')
                .then(
                    (res) =>{
//                        console.log(res.data);
                        this.logName = res.data.name;
                    }
                )
        },
        methods : {
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            generalRecordList(){
                this.$http.get('account/transfer').then((res) => {
//                    console.log(res.data.code);

                    if (res.data.code==18600){
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                    }
                })
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    this.formData.transfer_date = ev.target.value;
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getPage(data){
                this.page = data;
                this.filter();
            },
            clearForm(){
//                this.logName = "";
                this.account_in_remain = "";
                this.account_out_remain = "";

                this.formData.transfer_date = "";
                this.formData.account_id_out = 1;
                this.formData.account_id_in = 1;
                this.formData.amount_transfer = "";
                this.formData.remark = "";

                $('#myModal').modal('hide');
            },

            search(val){
//                this.operId = 0;
                this.filter(val);
            },
            getDate(data){
                this.params.range = data;
                this.search(1);
            },

            filter(){
                this.beforePage = val;
                this.$http.get('account/transfer?page='+val,{
                    params : this.params
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==18600){
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.myData = [];
                        this.paging = 1;
                        this.isShow = true;
                    }
                })
            },

            // 新增
            add(){
                console.log(this.formData);
                this.$http.post('account/transfer',this.formData)
                    .then(
                        (res) =>{
                            console.log(res.data);
                            if (res.data.code==18610){
                                // 成功
                                this.info.success = '转账成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.clearForm();
                                this.search(1);
                            } else {
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
            },

            // 获取转出账户余额
            getOutRemain(){
                this.$http.get('account/manage/'+this.formData.account_id_out)
                    .then(
                        (res) =>{
                            console.log(res.data.data);
                           this.account_out_remain = res.data.data.amount_remain
                        }
                    )
            },
//            获取转入账户余额
            getInRemain(){
                this.$http.get('account/manage/'+this.formData.account_id_in)
                    .then(
                        (res) =>{
                            console.log(res.data.data);
                            this.account_in_remain = res.data.data.amount_remain
                        }
                    )
            }
        }
    }
</script>