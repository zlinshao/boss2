<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li>收房报备</li>
        </ol>
        <section class="panel">
            <div class="panel-body">

                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
                        <!--<div class="dropdown form-group">
                            <select name="" class="form-control">
                                <option value="">全部</option>
                                <option value="1">鸡腿</option>
                                <option value="2">梦想</option>
                            </select>
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

                        <div class="input-group pull-right">
                            <a class="btn btn-success" @click="disStatus"><i
                                    class="fa fa-plus-square"></i>&nbsp;新增收房报备
                            </a>
                        </div>

                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
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
                        <!--<li>
                            <h5><a><i class="fa fa-plus-square"></i> 新增报备</a></h5>
                        </li>-->
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
                            <th class="text-center">月单价</th>
                            <th class="text-center">收房年限(月)</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">空置期</th>
                            <th class="text-center">押金</th>
                            <th class="text-center">中介费</th>
                            <th class="text-center">待签约日期</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">状态</th>

                            <!--<th class="text-center">房型</th>-->
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="{'lightYellow' : operId===item.id , 'text-center' : true}" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id"
                                       @click.stop="changeCurrentIndex($event,item.id,item.status)">
                            </td>
                            <td>{{item.house.detailed_address}}</td>
                            <td>
                                <span v-if="item.price !== null && item.price !== undefined">
                                    {{item.price[0]}}<a class="change" v-show="item.price.length>1">变化</a>
                                </span>
                            </td>
                            <td>{{item.months}}</td>
                            <td>
                                <span  v-if="item.pay_type !== null && item.pay_type !== undefined">
                                    {{dict.pay_type[item.pay_type[0]]}}<a class="change" v-show="item.pay_type.length>1">变化</a>
                                </span>
                            </td>
                            <td>{{item.vacancy}}</td>
                            <td>{{item.cost_deposit}}</td>
                            <td>{{item.cost_medi}}</td>
                            <td>{{item.deal_time}}</td>
                            <td>{{item.staff == undefined ? '' : item.staff.real_name}}</td>
                            <td>{{item.department == undefined ? '' : item.department.name}}</td>
                            <td>{{item.leader == undefined ? '' : item.leader.real_name}}</td>

                            <!--<td>{{item.house.rooms.rooms}}室{{item.house.rooms.hall}}厅{{item.house.rooms.toilet}}</td>-->
                            <td>
                                <label :class="{'label':true,'status':true,'yellow':item.status===1,'orange':item.status===2,'green':item.status===3}">
                                    {{dict.checkin_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <router-link :to="{path:'/reopetedCollectDetail',query: {collectId: item.id,page:beforePage,myParams:params}}">详情
                                </router-link>
                            </td>
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


        <!--modal-->
        <!--新增-->
        <AddModal @save="search(1)" :msg="dis_status"></AddModal>

        <!--编辑-->
        <EditModal :id="curOperId" @save="search(1)"></EditModal>

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--生成款项-->
        <CteatePayment :from="1" :addPayment_id="addPayment_id" @success="filter"></CteatePayment>

        <!--新增其余款项-->
        <AddOther :from="1" :addOther_id="addOther_id" @success="clearOperId"></AddOther>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue'
    import DatePicker from '../../common/datePicker.vue'
    import Confirm from '../../common/confirm.vue'
    import AddModal from './collectAdd.vue'
    import EditModal from './collectEdit.vue'
    import CteatePayment from '../createPayment.vue'
    import AddOther from '../other/otherAdd.vue'

    export default{
        components: {Page, Status, DatePicker, AddModal, EditModal, Confirm, CteatePayment, AddOther},
        data(){
            return {
                beforePage: 1,
                dis_status: '',
                isShow: false,

                operId: 0,
                statusId: 0,

                curOperId: 0,

                dict: {},
                paging: '',
                myData: [],
                page: 1,
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
                currentDate: [],

                params: {
                    range: '',
                    search: ''
                },

                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },

//                生成款项
//                from : 1,
                addPayment_id: 0,

//                新增其余款项
                addOther_id: 0
            }
        },
        mounted (){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
//            console.log(params);
//            alert(page);
//            console.log(typeof params=='string')



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
                            this.getCollectList();
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
            getCollectList(){
                this.$http.get('checkin/collect')
                    .then(
                        (res) => {
//                            console.log(res.data.code);
//                            console.log(res.data.data.data);
                            if (res.data.code == 18200) {
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
            changeCurrentIndex(ev, id, status){
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
//                this.page = 1;

                this.filter(val);
            },
            getDate(data){
                console.log(data);
                this.params.range = data;
                this.search(1);
            },

            filter(val){
//                alert(val);
                if (val != undefined) {
                    this.beforePage = val;
                }
                this.operId = 0;
                // 筛选
                this.$http.get('checkin/collect?page=' + this.beforePage, {
                    params: this.params
                }).then(
                    (res) => {
//                        console.log(res.data)
                        if (res.data.code == 18200) {
                            // 成功
                            this.paging = res.data.data.pages;
                            this.myData = res.data.data.data;
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
            getConfirm(){
                // 提示信息
                let num = this.confirmMsg.status;
                console.log(num);
                let url;
                if (num == 0) {
                    url = 'checkin/collect/discard/' + this.operId;
                } else if (num == 1) {
//                    this.confirmMsg.msg = '确定提交报备信息吗？';
                    url = 'checkin/collect/pending/' + this.operId;
                } else if (num == 2) {
//                    this.confirmMsg.msg = '确定通过审核吗？';
                    url = 'checkin/collect/pass/' + this.operId;
                } else if (num == 3) {
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/collect/stash/' + this.operId;
                } else if (num == 4) {
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/collect/pending/' + this.operId;
                }
                this.$http.get(url)
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code == 18210) {
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
            oper(){
                // 编辑
                this.curOperId = this.operId;
                $('#edit').modal('show');
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

            pass(){
                console.log(this.operId);
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

    input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    ul.dropdown-menu {
        text-align: center;
        /*font-size: 12px;*/
    }

    ul.dropdown-menu li {
        padding: 6px 0;
    }

    ul.dropdown-menu li:hover {
        cursor: pointer;
        background-color: #f2f2f2;
    }

    tbody tr button {
        /*color: white;*/
    }

    td a.change {
        margin-left: 5px;
        font-size: 8px;
    }

    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }

    tbody tr td button {
        color: white;
        /*font-weight: bold;*/
    }

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }
</style>