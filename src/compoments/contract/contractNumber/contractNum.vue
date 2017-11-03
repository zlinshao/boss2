<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li>编号记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length === 0">
                    <form class="form-inline clearFix" role="form">
                        <a v-if="params.type == 3">
                            <div class="input-group">
                                <select class="form-control" v-model="params.style" @change="search(1)">
                                    <option value="">收租房</option>
                                    <option value="2">收房</option>
                                    <option value="1">租房</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <select class="form-control" v-model="params.condition" @change="search(1)">
                                    <option value="4">缺少资料</option>
                                    <option value="1">钥匙</option>
                                    <option value="2">交接单</option>
                                    <option value="3">收条</option>
                                </select>
                            </div>
                        </a>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="合同编号/领取人/房屋地址"
                                   @keydown.enter.prevent="search(1)" v-model="params.keywords">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="input-group" v-if="params.type == 3">
                            <button class="btn btn-success" type="button" @click="exportTable">导出</button>
                        </div>

                        <div class="form-group pull-right"
                             data-toggle="modal" data-target="#contractNumAdd">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;新建任务
                            </a>
                        </div>

                    </form>
                </div>

                <div class="col-lg-12 remind" v-show="pitch.length === 1">
                    <ul class="clearFix">
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <!--<li>
                            <h5><a @click="delete_num"><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>-->
                        <li style="display: none">
                            <h5>
                                <a><i class="fa fa-star"></i>&nbsp;标记</a>
                                <!--<a><i class="fa fa-star"></i>&nbsp;取消标记</a>-->
                            </h5>
                        </li>
                        <li>
                            <h5 data-toggle="modal" data-target="#addRemark">
                                <a><i class="fa fa-book"></i> 添加备注</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel has-js">
            <header class="panel-heading tab-bg-dark-navy-blue">
                <ul class="nav nav-tabs ">
                    <li :class="{'active': params.type === 1}" @click="tabs(1)">
                        <a data-toggle="tab" href="#receive">
                            领取
                        </a>
                    </li>
                    <li :class="{'active': params.type === 2}" @click="tabs(2)">
                        <a data-toggle="tab" href="#void">
                            作废
                        </a>
                    </li>
                    <li :class="{'active': params.type === 3}" @click="tabs(3)">
                        <a data-toggle="tab" href="#turnOver">
                            上缴
                        </a>
                    </li>
                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content tasi-tab has-js">

                    <!--领取-->
                    <div class="tab-pane" id="receive" :class="{'active': params.type === 1}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">领取时间</th>
                                <th class="text-center">领取合同数(收)</th>
                                <th class="text-center">领取合同数(租)</th>
                                <th class="text-center">剩余合同数(收)</th>
                                <th class="text-center">剩余合同数(租)</th>
                                <th class="text-center">领取人</th>
                                <th class="text-center">所属部门</th>
                                <th class="text-center">备注</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="item in myData">
                                <td>
                                    <label :class="{'label_check':true,'c_on':pitch.indexOf(item.request_time) > -1,
                                            'c_off':pitch.indexOf(item.request_time)==-1}"
                                           @click.prevent="checked_id(item.request_time, $event,item.id)">
                                        <input type="checkbox" class="pull-left"
                                               :checked="pitch.indexOf(item.request_time) > -1">
                                    </label>
                                </td>
                                <td>{{item.receiver_time}}</td>
                                <td>{{item.sf_numbers}}</td>
                                <td>{{item.zf_numbers}}</td>
                                <td>{{item.rest_sf_number}}</td>
                                <td>{{item.rest_zf_number}}</td>
                                <td>{{item.receiver_name}}</td>
                                <td><span v-if="item.department_id!=null">{{item.department_id.name}}</span></td>
                                <td>
                                    <a v-show="item.other_remark!=null&&item.other_remark!=''" @click="showRemark(item.other_remark)">
                                        <i class="fa fa-book"></i>
                                    </a>
                                </td>
                                <td>
                                    <router-link :to="{path : '/contractNumDetail',
                                    query:{request_time:item.request_time,type:item.type,page:beforePage,myParams:params,select:selected}}"
                                    >详情</router-link>
                                </td>
                            </tr>
                            <tr class="text-center" v-show="isShow">
                                <td colspan="10" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--作废-->
                    <div class="tab-pane" id="void" :class="{'active': params.type === 2}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">实到时间</th>
                                <th class="text-center">作废合同数(收)</th>
                                <th class="text-center">作废合同数(租)</th>
                                <th class="text-center">剩余合同数(收)</th>
                                <th class="text-center">剩余合同数(租)</th>
                                <th class="text-center">报备人</th>
                                <th class="text-center">所属部门</th>
                                <th class="text-center">备注</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="item in myData">
                                <td>
                                    <label :class="{'label_check':true,'c_on':pitch.indexOf(item.scrap_request_time) > -1,
                                            'c_off':pitch.indexOf(item.scrap_request_time)==-1}"
                                           @click.prevent="checked_id(item.scrap_request_time, $event,item.id)">
                                        <input type="checkbox" class="pull-left"
                                               :checked="pitch.indexOf(item.scrap_request_time) > -1">
                                    </label>
                                </td>
                                <td>{{item.actual_time}}</td>
                                <td>{{item.sf_numbers}}</td>
                                <td>{{item.zf_numbers}}</td>
                                <td>{{item.rest_sf_number}}</td>
                                <td>{{item.rest_zf_number}}</td>
                                <td>{{item.reporter_name}}</td>
                                <td><span v-if="item.department_id!=null">{{item.department_id.name}}</span></td>
                                <td>
                                    <a v-show="item.other_remark!=null&&item.other_remark!=''" @click="showRemark(item.other_remark)">
                                        <i class="fa fa-book"></i>
                                    </a>
                                </td>
                                <td>
                                    <router-link  :to="{path : '/contractNumDetail',
                                    query:{request_time:item.scrap_request_time,type:item.type,page:beforePage,myParams:params,select:selected}}">详情</router-link>
                                </td>
                            </tr>
                            <tr class="text-center" v-show="isShow">
                                <td colspan="10" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--上缴-->
                    <div class="tab-pane" id="turnOver" :class="{'active': params.type === 3}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">上缴时间</th>
                                <th class="text-center">上缴合同数(收)</th>
                                <th class="text-center">上缴合同数(租)</th>
                                <th class="text-center">剩余合同数(收)</th>
                                <th class="text-center">剩余合同数(租)</th>
                                <th class="text-center">上缴人</th>
                                <th class="text-center">所属部门</th>
                                <th class="text-center">备注</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="item in myData">
                                <td>
                                    <label :class="{'label_check':true,'c_on':pitch.indexOf(item.paid_request_time) > -1,
                                            'c_off':pitch.indexOf(item.paid_request_time)==-1}"
                                           @click.prevent="checked_id(item.paid_request_time, $event,item.id)">
                                        <input type="checkbox" class="pull-left"
                                               :checked="pitch.indexOf(item.paid_request_time) > -1">
                                    </label>
                                </td>
                                <td>{{item.paid_time}}</td>
                                <td>{{item.sf_numbers}}</td>
                                <td>{{item.zf_numbers}}</td>
                                <td>{{item.rest_sf_number}}</td>
                                <td>{{item.rest_zf_number}}</td>
                                <td>{{item.paid_name}}</td>
                                <td><span v-if="item.department_id!=null">{{item.department_id.name}}</span></td>
                                <td>
                                    <a v-show="item.other_remark!=null&&item.other_remark!=''" @click="showRemark(item.other_remark)">
                                        <i class="fa fa-book"></i>
                                    </a>
                                </td>
                                <td>
                                    <router-link :to="{path : '/contractNumDetail',
                                    query:{request_time:item.paid_request_time,type:item.type,page:beforePage,myParams:params,select:selected}}">详情</router-link>
                                </td>
                            </tr>
                            <tr class="text-center" v-show="isShow">
                                <td colspan="10" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <AddModal :msg="params.type" @success="successAdd"></AddModal>

        <!--备注-->
        <div class="modal fade bs-example-modal-md" tabindex="-1" role="dialog" id="addRemark"
             aria-labelledby="mySmallModalLabel" data-backdrop="static">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closeAddRemark">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">添加备注</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <form class="form-horizontal tasi-form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="addRemark"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeAddRemark">取消</button>
                        <button type="button" class="btn btn-primary" @click="remarkAdd">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!--显示备注-->
        <div class="modal fade bs-example-modal-md" tabindex="-1" role="dialog" id="showRemark"
             aria-labelledby="mySmallModalLabel" data-backdrop="static">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">备注</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <div v-for="(item,index) in remark" style="padding: 5px;border-bottom: 1px solid #ddd">
                                {{index+1}}.&emsp;{{item.remark_time}}&emsp;&emsp;{{item.other_remark}}@{{item.remark_name}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div role="dialog" class="modal fade bs-example-modal-sm" id="leading_out" data-backdrop="static">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h5>生成 成功！</h5>
                    </div>
                    <div class="modal-footer text-right">
                        <a data-dismiss="modal" class="btn btn-default btn-md">取消</a>
                        <a :href="leadingOut" class="btn btn-success btn-md" @click="downLoadTable">下载</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue'
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/oraganization.vue'
    import Confirm from '../../common/confirm.vue'
    import AddModal from './contractNumAdd.vue'

    export default{
        components: {Page, Status, DatePicker, STAFF, Confirm, AddModal},
        data(){
            return {
                dict : {},

                operId : '',
                pitch: [],
                beforePage: 1,                      //当前页
                paging: 1,                        //总页数

                myData : [],
                isShow : false,

                confirmMsg: {                       //删除
                    id: '',
                    msg: ''
                },
                dateConfigure: [                    //时间控件
                    {
                        range: true,
                        needHour: false
                    }
                ],
                currentDate: [],                    //时间控件
                configure: {},                      //组织架构
                selected: [],                       //部门名称
                params: {
                    style : '',                  // 收租房
                    condition : 4,              // 缺少字段
                    type: 1,
                    department_id: '',             //筛选
                    start : '',
                    end : '',
                    keywords : ''
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

                addRemark : '',             // 添加备注
                remark : '',                // 显示备注
                leadingOut : ''             // 导出
            }
        },
        mounted (){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            let select = this.$route.query.select;

//            this.$http.get('code/Staff_Square/dict').then((res)=>{
                if (page!=undefined){
                    this.page = page;
                    this.beforePage = page;
                    if (params!=undefined&&typeof params!='string'){
                        this.params = params;
                        if (params.start!=''&&params.end!=''){
                            this.currentDate = [params.start,params.end];
                        }
                    }
                    this.selected = select;
                    this.search(this.beforePage);
                } else {
                    this.search(1);
                }
//            })

//            this.contract_list(1);
        },
        methods: {
//            搜索
            search(val){
                this.contract_list(val);
            },
//            列表
            contract_list (page){
                this.beforePage = page;
                this.params.page = page;
                this.$http.post('code/Contract_Number_Record/index', this.params).then((res) => {
//                    console.log(res.data);
                    if (res.data.code==30010){
                        // 成功
                        this.paging = res.data.data.pages;
//                        console.log(this.paging)

                        this.myData = res.data.data.list;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.paging = 1;
                        this.myData = [];
                        this.isShow = true;
                    }
                })
            },
//            标签页切换
            tabs (val){
                this.pitch = [];
                this.params.department_id = '';
                this.params.start = '';
                this.params.end = '';
                this.params.type = val;
                this.params.style = '';
                this.params.condition = 4;
                this.selected = [];
                this.contract_num = '';
                this.currentDate = [];
                this.contract_list(1);
            },
//            部门搜索模态框
            select(){
                this.configure = {type: 'department', length: 1};
                $('.selectCustom:eq(0)').modal('show');
            },
//            部门搜索
            selectDateSend(val){
                this.selected = val.department[0].name;
                this.params.department_id = val.department[0].id;
                /*for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }*/
                /*for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }*/
                this.search(1);
            },
//            清空部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

//            删除提醒
            delete_num(){
                this.confirmMsg.request_time = this.pitch[0];
//                console.log(this.pitch)
                this.confirmMsg.msg = '确定删除吗？';
                $('#confirm').modal('show');
            },

//            确认删除
            getConfirm (){
                this.$http.post('code/Contract_Number_Record/delete',{
                    type : this.params.type,
                    request_time : this.confirmMsg.request_time
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==30031){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.confirmMsg.request_time = '';
                        this.pitch = [];
                        this.contract_list(1);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },

//            时间搜索
            getDate(val){
//                console.log(val)
                if (val!=''){
                    this.params.start = val.split('to')[0];
                    this.params.end = val.split('to')[1];
                } else {
                    this.params.start = '';
                    this.params.end = '';
                }

                this.search(1);
            },

//            选中
            checked_id (rul, ev,id){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch = [];
                if (evInput.checked) {
                    this.pitch.push(rul);
                    this.operId = id;
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    this.operId = '';
                }
            },

            // 新增成功
            successAdd(){
                this.contract_list(1);
            },

//            关闭新增备注
            closeAddRemark(){
                this.addRemark = '';
                $('#addRemark').modal('hide');
            },
//            新增备注
            remarkAdd(){
//                console.log(this.pitch[0])
                if (this.addRemark.length==''){
                    this.info.error = '请填写备注信息';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                    return;
                }
                this.$http.post('/code/Contract_Number_Record/addRemark',{
                    id : this.operId,
                    remark : this.addRemark
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==30099){
                        // success
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.closeAddRemark();
                        this.contract_list(this.beforePage);
                        this.operId = '';
                        this.pitch = []
                    } else {
                        // fail
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
//            显示备注
            showRemark(remark){
//                console.log(remark);
//                console.log(JSON.parse(remark));

                this.remark = JSON.parse(remark).reverse();
                $('#showRemark').modal('show')
            },
//            导出
            exportTable(){
                this.$http.post('code/Contract_Number_Record/outDataByCondition', this.params).then((res) => {
                    if (res.data.code === '30010') {
                        this.leadingOut = res.data.data;
                        $('#leading_out').modal('show');
                    }
//                    console.log(res.data)
                })
            },
            downLoadTable(){
                $('#leading_out').modal('hide');
            }
        }
    }
</script>
<style scoped>
    section.panel.has-js{
        /*background-color: transparent;*/
    }
    section.panel.has-js table{
        /*background-color: white;*/
    }
    .remind ul{
        margin-bottom: 0;
    }
    .table {
        margin-bottom: 0;
    }
    textarea{
        max-width: 100%;
    }
</style>