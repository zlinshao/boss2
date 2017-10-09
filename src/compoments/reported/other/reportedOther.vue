<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li>其余款项报备</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId ==0">
                    <form class="form-inline clearFix" role="form">
                        <!--<div class="dropdown form-group">
                            <select name="" class="form-control">
                                <option value="">全部</option>
                                <option value="1">鸡腿</option>
                                <option value="2">梦想</option>
                            </select>
                        </div>-->
                        <!--<div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>-->
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                        </div>


                        <div class="input-group clearFix">
                            <input type="text" class="form-control" placeholder="搜索房屋地址"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                    </form>
                </div>

                <div v-show="operId !=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li v-show="statusId==1">
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 @click="changeStatus(0)"><a><i class="fa fa-times-circle-o"></i>&nbsp;作废</a></h5>
                        </li>
                        <li v-show="statusId==1">
                            <h5 @click="changeStatus(1)"><a><i class="fa fa-send-o"></i>&nbsp;提交</a></h5>
                        </li>
                        <li v-show="statusId==2">
                            <h5 @click="pass"><a><i class="fa fa-check-square-o"></i>&nbsp;通过审核</a></h5>
                        </li>
                        <li v-show="statusId==2">
                            <h5 @click="changeStatus(3)"><a><i class="fa fa-mail-reply"></i>&nbsp;驳回</a></h5>
                        </li>
                        <li v-show="statusId==3">
                            <h5 @click="changeStatus(4)"><a><i class="fa fa-mail-reply"></i>&nbsp;驳回</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">收支状态</th>
                            <th class="text-center">款项名称</th>
                            <th class="text-center">款项金额</th>
                            <th class="text-center">汇款方式</th>
                            <th class="text-center">收款人姓名</th>
                            <th class="text-center">开户行</th>
                            <th class="text-center">账号</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr  :class="{'lightYellow' : operId===item.id , 'text-center' : true}" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id" @click="check($event,item.id,item.status)">
                            </td>
                            <td>{{item.house.detailed_address}}</td>
                            <td>{{item.money_type==1?'收款':'付款'}}</td>
                            <td>{{item.money_name}}</td>
                            <td>{{item.money_amount}}</td>
                            <td>{{dict.payment[item.account_type]}}</td>
                            <td>{{item.account_owner}}</td>
                            <td>{{dict.bank[item.account_bank]}}</td>
                            <td>{{item.account_num}}</td>
                            <td>{{item.staff==undefined?'':item.staff.real_name}}</td>
                            <td>{{item.department==undefined?'':item.department.name}}</td>
                            <td>{{item.leader==undefined?'':item.leader.real_name}}</td>
                            <td>
                                <label :class="{'label':true,'status':true,'yellow':item.status===1,'orange':item.status===2,'green':item.status===3}">
                                    {{dict.checkin_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <router-link :to="{path:'/reportedOtherDetail',query: {otherId: item.id,page:beforePage,myParams:params}}">详情</router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="14" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--人资-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--生成款项-->
        <CteatePayment :from="3" :addPayment_id="addPayment_id" @success="filter"></CteatePayment>

        <!--编辑-->
        <EditModal :id="curOperId" @success="search(1)"></EditModal>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import Confirm from '../../common/confirm.vue'
    import CteatePayment from '../createPayment.vue'
    import EditModal from './otherEdit.vue'
    export default{
        components: {DatePicker, STAFF, Page, Status,Confirm,CteatePayment,EditModal},
        data(){
            return {
                operId: 0,
                statusId: 0,
                beforePage: 1,

                dict: {},
                paging: '',
                myData: [],
                isShow : false,

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

                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                        position: 'top-right',
                    }
                ],
                currentDate :[],

                params: {
//                    department_id: [],
//                    staff_id: [],
                    range: '',
                    search: ''
                },

                configure: {},
                filtrate: {
                    departmentList: [],
                    staffList: []
                },
                selected: [],

                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },

                // 生成款项
                addPayment_id: 0,
                // 编辑
                curOperId : 0,
            }
        },
        mounted(){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            let selected = this.$route.query.selected;
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        if (page!=undefined){
                            this.page = page;
                            this.beforePage = page;
                            if (params!=undefined&&typeof params!='string'){
//                                this.currentDate = [];
                                this.currentDate = params.range.split('to');
                                // this.currentDate = params.range.split('to');
                                // console.log(this.currentDate)
                                this.params = params;
                                console.log(this.params);
//                                alert(this.beforePage)
                            }
//                            alert(selected);
                            /*if (selected!=undefined){
                                this.selected = selected;
                            }*/
                            this.filter(this.beforePage);
                        } else {
                            this.getList();
                        }
//                        console.log(this.dict);

                    }
                )


        },
        methods: {
            getList(){
                this.$http.get('checkin/extra').then((res)=>{
                        console.log(res.data);
                    if (res.data.code == 18000) {
                        // 成功
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                    }
                })
            },

//            选中
            check (ev, id, status){
                if (ev.currentTarget.checked) {
                    this.operId = id;
                    this.statusId = status;
                } else {
                    this.operId = 0;
                    this.statusId = 0;
                }

            },

            changeStatus(num){
                // 修改状态


                this.confirmMsg.id = this.operId;
                this.confirmMsg.status = num;
//                console.log(this.confirmMsg.status);
                if (num == 0) {
                    this.confirmMsg.msg = '确定作废此报备信息吗？';
                } else if (num == 1) {
                    this.confirmMsg.msg = '确定提交报备信息吗？';
                }
                /*else if (num==2){
                 this.confirmMsg.msg = '确定通过审核吗？';
                 }*/
                else if (num == 3) {
                    this.confirmMsg.msg = '确定驳回吗？';
                } else if (num == 4) {
                    this.confirmMsg.msg = '确定驳回吗？';
                }
                $('#confirm').modal('show');

            },
            getConfirm(){
                // 提示信息
                let num = this.confirmMsg.status;
                console.log(num);
                let url;
                if (num == 0) {
                    url = 'checkin/extra/discard/' + this.operId;
                } else if (num == 1) {
//                    this.confirmMsg.msg = '确定提交报备信息吗？';
                    url = 'checkin/extra/pending/' + this.operId;
                }
                /*else if (num == 2) {
//                    this.confirmMsg.msg = '确定通过审核吗？';
                    url = 'checkin/extra/pass/' + this.operId;
                }*/
                else if (num == 3) {
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/extra/stash/' + this.operId;
                } else if (num == 4) {
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/extra/pending/' + this.operId;
                }
                this.$http.get(url)
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code == 18010) {
                                this.info.success = res.data.msg;
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);

                                this.filter(this.beforePage);
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
                    );

            },

//            搜索
            search(val){
                this.filter(val);
            },
//            日期搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },

            filter(val){
                if (val != undefined) {
                    this.beforePage = val;
                }
                this.operId = 0;

                // 筛选
                this.$http.get('checkin/extra?page=' + this.beforePage, {
                    params: this.params
                }).then(
                    (res) => {
                        console.log(res.data)
                        if (res.data.code == 18000) {
                            // 成功
                            this.myData = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.myData = [];
                            this.paging = 0;
                            this.page = 1;
                        }
                    }
                )
            },
//            人资
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
//            人资
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
            clearSelect(){
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

            pass(){
                console.log(this.operId);
                this.addPayment_id = this.operId;
                $('#cteatePayment').modal('show');
            },

            oper(){
                // 编辑
                this.curOperId = this.operId;
                $('#otherEdit').modal('show');
            },
        }
    }
</script>
<style scoped>
    input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    .label {
        font-weight: normal;
    }
    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }
</style>