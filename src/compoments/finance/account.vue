<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>账户管理</li>
        </ol>


        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" v-model="params.cate" @change="search(1)">
                                <option value="">全部</option>
                                <option :value="value" v-for="(key,value) in dict.account_cate">{{key}}</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="账户名称/卡号"
                                   @keydown.enter.prevent="search(1)" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addNew">
                                <i class="fa fa-plus-square"></i>&nbsp;新增账户
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId != 0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5>
                                <a @click="zero_mo">&copy;&nbsp;归零</a>
                            </h5>
                        </li>
                        <li>
                            <h5>
                                <a @click="recharge_open"><i class="fa fa-credit-card"></i>&nbsp;充值</a>
                            </h5>
                        </li>
                        <li>
                            <h5 @click="showRecord"><a><i class="fa fa-book"></i>&nbsp;充值归零记录</a></h5>
                        </li>
                        <li>
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 @click="dele"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->

        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center width150">账户名称</th>
                            <th class="text-center width80">账户类型</th>
                            <th class="text-center width150">账号</th>
                            <th class="text-center width80">开户银行</th>
                            <th class="text-center width100">支行</th>
                            <th class="text-center width100">初始金额</th>
                            <th class="text-center width100">当前余额</th>
                            <th class="text-center width150">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <label :class="{'label_check':true,'c_on':operId===item.id,'c_off':operId!==item.id}"
                                       @click.prevent="changeIndex($event,item.id)">
                                    <input type="checkbox" :value="item.id" :checked="operId===item.id">
                                </label>

                            </td>
                            <td>{{item.name}}</td>
                            <td>{{dict.account_cate[item.cate]}}</td>
                            <td>{{item.account_num}}</td>
                            <td>{{dict.bank[item.bank]}}</td>
                            <td>{{item.sub_bank}}</td>
                            <td>{{item.amount_base}}</td>
                            <td>{{item.amount_remain}}</td>
                            <td>{{item.remark}}</td>
                            <!--<td>{{item.accountName}}</td>
                            <td>{{item.bank}}</td>
                            <td>{{item.account}}</td>
                            <td>{{item.startMoney}}</td>
                            <td>{{item.nowMoney}}</td>
                            <td>{{item.remark}}</td>-->
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="9" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" @click="clearForm" aria-hidden="true">×</button>
                            <h4 class="modal-title">{{title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">账户名称<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">账户类型<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.cate">
                                            <option :value="value" v-for="(key,value) in dict.account_cate">{{key}}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">账号<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.account_num">
                                    </div>
                                </div>

                                <div class="form-group" v-show="formData.cate==1">
                                    <label class="col-sm-2 control-label">开户银行<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="formData.bank">
                                            <option :value="value" v-for="(key,value) in dict.bank">{{key}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group" v-show="formData.cate==1">
                                    <label class="col-sm-2 control-label">支行<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.sub_bank">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">初始金额<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="number" min="0" class="form-control" v-model="formData.amount_base"
                                               :readonly="!isAdd">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">当前余额</label>
                                    <div class="col-sm-10">
                                        <input type="number" min="0" class="form-control"
                                               v-model="formData.account_remain" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remark"></textarea>
                                        <!--<input type="text" class="form-control" v-model="formData.remark">-->
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" @click="clearForm">取消</button>
                            <button type="button" class="btn btn-primary" v-show="isAdd" @click="add">保存</button>
                            <button type="button" class="btn btn-primary" v-show="!isAdd" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="zero">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title">归零</h5>
                    </div>
                    <div class="modal-body" style="font-size: 16px;">
                        确定清零吗
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="zero">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>
        <div class="modal fade" id="recharge">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title">充值金额</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="amount" placeholder="输入充值金额">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="recharge">添加</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>

        <!--记录-->
        <div class="modal fade bs-example-modal-lg" id="record">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title">充值归零记录</h5>
                    </div>
                    <div class="modal-body clearFix" v-for="list in record">
                        <div class="col-md-6">
                            <div>
                                <div class="recordList">
                                    <span class="name">上次充值日期</span>
                                    <span>{{list.last_recharge_date}}</span>
                                </div>
                                <div class="recordList">
                                    <span class="name">上次充值操作人</span>
                                    <span>{{dict.staff_id[list.last_recharge_operator]}}</span>
                                </div>
                            </div>
                            <div class="con">
                                <div class="recordList">
                                    <span class="name">上次归零日期</span>
                                    <span>{{list.last_zero_date}}</span>
                                </div>
                                <div class="recordList">
                                    <span class="name">上次归零操作人</span>
                                    <span>{{dict.staff_id[list.last_zero_operator]}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div>
                                <div class="recordList">
                                    <span class="name">上上次充值日期</span>
                                    <span>{{list.llast_recharge_date}}</span>
                                </div>
                                <div class="recordList">
                                    <span class="name">上上次充值操作人</span>
                                    <span>{{dict.staff_id[list.llast_recharge_operator]}}</span>
                                </div>
                            </div>
                            <div class="con">
                                <div class="recordList">
                                    <span class="name">上上次归零日期</span>
                                    <span>{{list.llast_zero_date}}</span>
                                </div>
                                <div class="recordList">
                                    <span class="name">上上次归零操作人</span>
                                    <span>{{dict.staff_id[list.llast_zero_operator]}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>

    tbody tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    textarea {
        max-width: 100%;
    }

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }

    .recordList {
        line-height: 40px;
    }

    .recordList .name {
        display: inline-block;
        width: 50%;
        color: #59ace2;
    }

    .con {
        border-top: 1px solid #ddd;
    }
</style>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import Confirm from '../common/confirm.vue'

    export default{
        components: {Page, Status, Confirm},
        data(){
            return {
                beforePage: 1,
                isShow: false,
                amount: '',
                dict: {},

                operId: 0,
                paging: 1,
                page: 1,                  // 当前页数

//                modal
                title: '',
                isAdd: true,       // 是否新增

                params: {
                    cate: '',
                    search: ''
                },

                formData: {
                    name: '',
                    cate: 1,
                    account_num: '',
                    bank: '',
                    sub_bank: '',
                    amount_base: '',
                    account_remain: '',
                    remark: ''
                },
                myData: [],      //列表数据
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
                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },

                record: [],
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.dict = res.data;
                    this.accountList();
                }
            );
        },
        watch: {
            'formData.cate': {
                handler(curVal, oldVal){
//                    console.log(curVal)
                    if (curVal != 1) {
                        this.formData.bank = '';
                        this.formData.sub_bank = '';
                    }
                }
            }
        },
        methods: {
            zero_mo (){
                $('#zero').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            归零
            zero (){
                this.$http.post('account/manage/zero/' + this.operId).then((res) => {
                    if (res.data.code === '18610') {
                        this.accountList();
                        this.operId = 0;
                        $('#zero').modal('hide');
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            recharge_open (){
                this.amount = '';
                $('#recharge').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            充值
            recharge (){
                this.$http.post('account/manage/recharge/' + this.operId, {
                    amount: this.amount,
                }).then((res) => {
                    if (res.data.code === '18610') {
                        $('#recharge').modal('hide');
                        this.accountList();
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            changeIndex(ev, id){
//                console.log("一开始"+this.operId);
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.operId = id;
                } else {
                    this.operId = 0;
                }
            },
            accountList(){
                this.paging = '';
                this.$http.get('account/manage').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res);
                    if (res.data.code == 18400) {
                        // 成功
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.myData = [];
                        // 失败
                        this.isShow = true;
                    }
                })
            },
            zero_search (){
                this.filter(this.beforePage);
            },
            search(val){
//                this.params['page'] = 1;
                this.filter(val);
            },
            filter(val){
                this.beforePage = val;
                this.operId = 0;
                this.$http.get('account/manage?page=' + val, {
                    params: this.params
                })
                    .then(
                        (res) => {
                            if (res.data.code == 18400) {
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.isShow = false;
                            } else {
                                this.myData = [];
                                this.paging = 1;
                                this.isShow = true;
                            }
                        }
                    )
            },

            clearForm(){

                this.formData.name = '';
                this.formData.cate = 1;
                this.formData.account_num = '';
                this.formData.bank = '';
                this.formData.sub_bank = '';
                this.formData.amount_base = '';
                this.formData.account_remain = '';
                this.formData.remark = '';

//                this.operId = 0;
                $('#myModal').modal('hide');
            },

            addNew(){
                // 新增
                this.title = '新增账户';
                this.isAdd = true;

                $('#myModal').modal('show');
                // 新增成功后调用
//                that.clearForm();

            },
            oper(){
                console.log(this.operId);
                this.title = '编辑账号';
                this.isAdd = false;
                // 先请求

                this.$http.get('account/manage/' + this.operId)
                    .then(
                        (res) => {
                            if (res.data.code == 18400) {
                                // 成功
                                let val = res.data.data;
                                console.log(val)
                                this.formData.name = val.name;
                                this.formData.cate = val.cate;
                                this.formData.account_num = val.account_num;
                                this.formData.bank = val.bank;
                                this.formData.sub_bank = val.sub_bank;
                                this.formData.amount_base = val.amount_base;
                                this.formData.account_remain = val.amount_remain;
                                this.formData.remark = val.remark;
                                $('#myModal').modal('show');
//                                alert(this.formData.account_remain)
                            }
                        }
                    )
//                请求成功打开模态框

//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/
            },

            add(){
                this.formData.account_remain = this.formData.amount_base;
//                console.log(this.formData);
                this.$http.post('account/manage', this.formData)
                    .then(
                        (res) => {
                            if (res.data.code == 18410) {
                                // 成功
                                this.info.success = '新增账户成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.clearForm();
                                this.search(1);
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
            },
            modify(){
                this.formData.account_remain = this.formData.amount_base;
//                console.log(this.formData);
                this.$http.put('account/manage/' + this.operId, this.formData)
                    .then(
                        (res) => {
//                            console.log(res.data)
                            if (res.data.code == 18410) {
                                // 成功
                                this.info.success = '修改账户成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.clearForm();
                                this.search(1);
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
            },
            dele(){
                this.confirmMsg.id = this.operId;
                this.confirmMsg.msg = '确定删除该条账户信息吗？';
                $('#confirm').modal('show');
            },

            getPage(data){
                // 获取页数
                console.log(data);
                this.page = data;
            },

            getConfirm(){
//                alert(1);
                this.$http.get('account/manage/delete/' + this.operId)
                    .then(
                        (res) => {
                            console.log(res.data.code);
                            if (res.data.code == 18410) {
                                // 成功
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                this.clearForm();
                                this.accountList();
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
            },

            // 充值归零记录
            showRecord(){
                this.$http.get('account/manage/' + this.operId).then((res) => {
                    this.record = [];
//                    console.log(res.data);
                    if (res.data.code == 18400) {
                        // 成功
                        this.record.push(res.data.data);
                        $('#record').modal('show');
                    }
                });

            }

        }
    }
</script>