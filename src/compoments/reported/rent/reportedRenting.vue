<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li>租房报备</li>
        </ol>

        <section class="panel">
            <div class="panel-body">

                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
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

                        <div class="input-group pull-right">
                            <a class="btn btn-success" @click="disStatus"><i class="fa fa-plus-square"></i>&nbsp;新增未收先租房报备
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <!--<li>
                            <a v-if="statusId!=0">{{statusName}}</a>
                        </li>-->
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
                        <li>
                            <h5 @click="addOther"><a><i class="fa fa-plus-square"></i> 新增其余款项报备</a></h5>
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
                            <th class="text-center">租房类型</th>
                            <th class="text-center">月单价</th>
                            <th class="text-center">租房年限(月)</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">中介费</th>
                            <th class="text-center">已收款项</th>
                            <th class="text-center">已收金额</th>
                            <th class="text-center">待签约日期</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="{'lightYellow' : operId===item.id , 'text-center' : true}" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id" @click.stop="changeCurrentIndex($event,item.id,item.status)">
                            </td>
                            <td>{{item.house.detailed_address}}</td>
                            <td>{{dict.rent_type[item.rent_type]}}</td>
                            <td>{{item.price[0]}}<a v-show="item.price.length>1">变化</a></td>
                            <td>{{item.months}}</td>
                            <td>
                                押{{item.bet}}付{{item.pay[0]}}
                                <!--<a v-show="item.pay.length>1">变化</a>-->
                            </td>
                            <td>{{item.cost_medi}}</td>
                            <td>{{dict.subject[item.received_type]}}</td>
                            <td>{{item.received_amount}}</td>
                            <td>{{item.deal_time}}</td>
                            <td>{{item.staff==undefined?'':item.staff.real_name}}</td>
                            <td>{{item.department==undefined?'':item.department.name}}</td>
                            <td>{{item.leader==undefined?'':item.leader.real_name}}</td>
                            <td>
                                <label  :class="{'label':true,'label-warning ':true,'yellow':item.status===1,'orange':item.status===2,'green':item.status===3}">
                                    {{dict.checkin_status[item.status]}}
                                </label>
                            </td>
                            <td><router-link :to="{path:'/reopetedRentDetail',query: {rentId: item.id,page:beforePage,myParams:params}}">详情</router-link></td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="16" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--新增-->
        <AddModal @save="search(1)" :msg="dis_status"></AddModal>

        <!--编辑-->
        <EditModal :id="curOperId" @save="search(1)"></EditModal>

        <!--生成款项-->
        <CteatePayment :from="2" :addPayment_id="addPayment_id" @success="filter"></CteatePayment>
        <!--新增其余款项-->
        <AddOther :from="2" :addOther_id="addOther_id" @success="clearOperId"></AddOther>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import Confirm from '../../common/confirm.vue'
    import AddOther from '../other/otherAdd.vue'

    import AddModal from './rentingAdd.vue'
    import EditModal from './rentingEdit.vue'
    import CteatePayment from '../createPayment.vue'

    export default{
        components: {DatePicker,Page,Confirm,Status,AddModal,EditModal,CteatePayment,AddOther},
        data(){
            return {
                dis_status: '',
                beforePage : 1,
                operId : 0,
                statusId : 0,

                isShow : false,

                curOperId : 0,

                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                currentDate : [],

                params : {
                    range : '',
                    search : ''
                },

                dict : {},
                paging : '',
                myData : [],
                page : 1,
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

//                生成款项
                addPayment_id : 0,

//                新增其余款项
                addOther_id : 0
            }
        },
        mounted (){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
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
                            this.filter(this.beforePage);
                        } else {
                            this.getRentingList();
                        }
//                        console.log(this.dict);
                    }
                )

        },
        methods: {
            disStatus (){
                $('#add').modal('show');
                this.dis_status = 2;
            },
            getRentingList(){
                this.$http.get('checkin/rent')
                    .then(
                        (res) => {
//                            console.log(res.data.code);
//                            console.log(res.data.data.data);
                            if (res.data.code == 18100){
                                // 成功
                                this.paging = res.data.data.pages;
                                this.myData = res.data.data.data;
                                this.isShow = false;
                            } else {
                                this.isShow = true;
                            }
//                            console.log(this.myData)
                        }
                    )
            },
            changeCurrentIndex(ev,id,status){
                if (ev.currentTarget.checked) {
                    this.operId = id;
                    this.statusId = status;
                } else {
                    this.operId = 0;
                    this.statusId = 0;
                }
            },
            search(val){
//                console.log(this.params);
//                this.operId = 0;

                this.filter(val);
            },
            getDate(data){
//                console.log(data);
                this.params.range = data;
                this.search(1);
            },
            oper(){
                // 编辑
                this.curOperId = this.operId;
                $('#edit').modal('show');
            },
            filter(val){
                if (val!=undefined){
                    this.beforePage = val;
                }
                this.operId = 0;
                // 筛选
//                this.myData = [];
                this.$http.get('checkin/rent?page='+this.beforePage,{
                    params : this.params
                }).then(
                    (res) => {
//                        console.log(res.data)
                        if (res.data.code == 18100){
                            // 成功
                            this.paging = res.data.data.pages;
                            this.myData = res.data.data.data;
                            this.isShow = false;
//                            console.log(this.myData)
                        } else {
                            this.isShow = true;
                            this.myData = [];
                            this.paging = 0;
                            this.page = 1;
                        }
                    }
                )
            },
            changeStatus(num){
                // 修改状态


                this.confirmMsg.id = this.operId;
                this.confirmMsg.status= num;
//                console.log(this.confirmMsg.status);

                if (num==0){
                    this.confirmMsg.msg = '确定作废此报备信息吗？';
                }else if (num==1){
                    this.confirmMsg.msg = '确定提交报备信息吗？';
                }
                /*else if (num==2){
                    this.confirmMsg.msg = '确定通过审核吗？';
                }*/
                else if (num==3){
                    this.confirmMsg.msg = '确定驳回吗？';
                } else if (num==4){
                    this.confirmMsg.msg = '确定驳回吗？';
                }
                $('#confirm').modal('show');

            },
            getConfirm(){
                // 提示信息
                let num = this.confirmMsg.status;
//                console.log(num)
                let url;
                if(num==0){
                    url = 'checkin/rent/discard/'+this.operId;
                } else if (num==1){
//                    this.confirmMsg.msg = '确定提交报备信息吗？';
                    url = 'checkin/rent/pending/'+this.operId;
                } else if (num==2){
//                    this.confirmMsg.msg = '确定通过审核吗？';
                    url = 'checkin/rent/pass/'+this.operId;
                } else if (num==3){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/rent/stash/'+this.operId;
                } else if (num==4){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/rent/pending/'+this.operId;
                }
                this.$http.get(url)
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code==18110){
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
                /*this.filter();*/
            },

            pass(){
                console.log(this.operId)
                this.addPayment_id = this.operId;
                $('#cteatePayment').modal('show');
            },

            //            新增其余款项报备
            addOther(){
                this.addOther_id = this.operId;
                $('#otherAdd').modal('show');
            },
            clearOperId(){
                this.operId = 0;
            }

        }
    }
</script>

<style scoped>
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }

    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }

    tbody tr td button{
        color: white;
        /*font-weight: bold;*/
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }
</style>