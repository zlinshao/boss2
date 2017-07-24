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
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="搜索房屋地址"
                                   v-model="params.search" @keydown.enter.prevent="search">
                            <span class="input-group-btn">
                            <button class="btn btn-success" id="search" type="button" @click="search"><i
                                    class="fa fa-search"></i></button>
                        </span>
                        </div>

                        <div class="input-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#add"><i class="fa fa-plus-square"></i>&nbsp;新增租房报备
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
                            <h5><a><i class="fa fa-times-circle-o"></i>&nbsp;作废</a></h5>
                        </li>
                        <li v-show="statusId==1">
                            <h5 @click="changeStatus(1)"><a><i class="fa fa-send-o"></i>&nbsp;提交</a></h5>
                        </li>
                        <li v-show="statusId==2">
                            <h5 @click="changeStatus(2)"><a><i class="fa fa-check-square-o"></i>&nbsp;通过审核</a></h5>
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
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">租房类型</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">月单价</th>
                            <th class="text-center">租房年限(月)</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">中介费</th>
                            <th class="text-center">已收科目</th>
                            <th class="text-center">已收金额</th>
                            <th class="text-center">待签约日期</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="{'lightYellow' : operId===item.id , 'text-center' : true}" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id" @click.stop="changeCurrentIndex($event,item.id,item.status)">
                            </td>
                            <td>{{item.staff.real_name}}</td>
                            <td>{{item.department.name}}</td>
                            <td>{{item.leader.real_name}}</td>
                            <td>{{dict.rent_type[item.rent_type]}}</td>
                            <td>{{item.house.detailed_address}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.months}}</td>
                            <td>押{{item.bet}}付{{item.pay}}</td>
                            <td>{{item.cost_medi}}</td>
                            <td>{{dict.subject[item.received_type]}}</td>
                            <td>{{item.received_amount}}</td>
                            <td>{{item.deal_time}}</td>
                            <td>
                                <button type="button"
                                        :class="{'btn':true,'btn-sm':true,'yellow':item.status===1,'orange':item.status===2,'green':item.status===3}"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{dict.checkin_status[item.status]}}
                                </button>
                            </td>
                            <td><router-link :to="{path:'/reopetedRentDetail',query: {rentId: item.id}}"><i title="查看详情" class=" fa fa-eye"></i></router-link></td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="16">暂无数据...</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--分页-->
        <Page :pg="paging" @pag="getPage"></Page>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--新增-->
        <AddModal @save="search"></AddModal>

        <!--编辑-->
        <EditModal :id="curOperId" @save="search"></EditModal>

    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'
    import Confirm from '../common/confirm.vue'

    import AddModal from './rentingAdd.vue'
    import EditModal from './rentingEdit.vue'

    export default{
        components: {DatePicker,Page,Confirm,Status,AddModal,EditModal},
        data(){
            return {
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
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
//                        console.log(this.dict);
                        this.getRentingList();
                    }
                )

        },
        methods: {
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
            search(){
//                console.log(this.params);
//                this.operId = 0;
                this.page = 1;
                this.filter();
            },
            getPage(data){
                // 页数
//                console.log(data);
                this.page = data;
                this.filter();

            },
            getDate(data){
//                console.log(data);
                this.params.range = data;
                this.search();
            },
            oper(){
                // 编辑
                this.curOperId = this.operId;
                $('#edit').modal('show');
            },
            filter(){
                this.operId = 0;
                // 筛选
//                this.myData = [];
                this.$http.get('checkin/rent?page='+this.page,{
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

                if (num==1){
                    this.confirmMsg.msg = '确定提交报备信息吗？';
                } else if (num==2){
                    this.confirmMsg.msg = '确定通过审核吗？';
                } else if (num==3){
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
                if (num==1){
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
                                this.info.success = '操作成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);


                                this.filter();
                            } else {
                                this.info.error = '操作失败';
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

        }
    }
</script>

<style scoped>
    div.padd {
        display: inline-block;
        padding: 0 15px 0 0;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    .yellow {
        background-color: #F9E175;
    }

    .orange {
        background-color: #FCB322;
    }

    .green {
        background-color: #83E96D;
    }
    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }
    tr td a i{
        font-size: 18px;
    }
</style>