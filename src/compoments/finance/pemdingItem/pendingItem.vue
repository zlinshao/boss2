<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">待处理项</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline" v-show="operId==0" role="form">
                        <div class="pro-sort">
                            <select name="" class="form-control" @change="searchList"  v-model="params.event_type" >
                                <option value="">事件类型</option>
                                <option :value="key" v-for="(value,key) in dictionary.item_type">{{value}}</option>
                            </select>
                        </div>
                        <div class="pro-sort">
                            <select name="" class="form-control" @change="searchList" v-model="params.collect_rent">
                                <option value="">收租类型</option>
                                <option :value="key" v-for="(value,key) in dictionary.collect_rent">{{value}}</option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate" :currentDate="currentDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <!--<label class="sr-only" for="search_info">搜索</label>-->
                            <input type="text" class="form-control" @keyup="searchList" placeholder="房屋地址/租房人" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="" v-model="params.search">
                                    搜索
                                </button>
                            </span>
                        </div>
                        <!--<div class="form-group pull-right">-->
                            <!--<a class="btn btn-success" data-toggle="modal" data-target="#add">-->
                                <!--<i class="fa fa-plus-square"></i>&nbsp;新增待处理项-->
                            <!--</a>-->
                        <!--</div>-->
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li @click="deletePending">
                            <h5><a><i class="fa fa-times-circle-o"></i>删除</a></h5>
                        </li>
                        <li  @click="settleAccount" v-if="account_pending_status !== 2">
                            <h5><a><i class="fa fa-calculator"></i>结算</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center width100">事项类型</th>
                            <th class="text-center width80">开单人</th>
                            <th class="text-center width110">房屋地址</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width100">合同开始时间</th>
                            <th class="text-center width100">合同结束时间</th>
                            <th class="text-center width100">应退</th>
                            <th class="text-center width100">实际扣款</th>
                            <th class="text-center width100">实际退款</th>
                            <th class="text-center width150">结算账户</th>
                            <th class="text-center width80">结算人</th>
                            <th class="text-center width80">状态</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in pendingList">
                            <td>
                                <!--<input type="checkbox":value="item.id" :checked="operId===item.id"
                                       @click="picked(item,$event)">-->
                                <label :class="{'label_check':true,'c_on':operId===item.id,'c_off':operId!==item.id}"
                                       @click.prevent="picked(item,$event)">
                                    <input type="checkbox" :value="item.id" :checked="operId===item.id">
                                </label>
                            </td>
                            <td>{{dictionary.item_type[item.item_type]}}</td>
                            <td>{{item.staff_name}}</td>
                            <td>{{item.detailed_address}}</td>
                            <td>{{item.customer_name}}</td>
                            <td>{{item.start_date}}</td>
                            <td>{{item.end_date}}</td>
                            <td>{{item.refund_should}}</td>
                            <td>{{item.refund_diff}}</td>
                            <td>{{item.refund_real}}</td>
                            <td>{{item.account_num}}</td>
                            <td>{{item.operator_name}}</td>
                            <td>
                                <label class="label label-warning">{{dictionary.account_pending_status[item.status]}}</label>
                            </td>
                            <td>
                                <router-link :to="{path:'/pendingDetail',query: {RentingId: item.id , myParams : params}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="14" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--新增模态框-->
        <!--<addModal></addModal>-->

        <Page :pg="paging" @pag="getPage" :beforePage = 'params.page'></Page>

        <!--提示信息-->
        <Status :state='info'></Status>

        <settleModal :settleId = 'pendingId' :dictionary = 'dictionary'
                     :collect_rent = 'collectRent' @Settle="hasSettle"></settleModal>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

//    import addModal from './pendingAdd.vue'
    import settleModal from './pendingSettle.vue'
    import Confirm from '../../common/confirm.vue'

    export default{
        components: {Page,Status,DatePicker,settleModal ,Confirm},
        data(){
            return {
                operId : 0,
                collectRent :'',
                paging : '',
                dictionary : [],
                pendingList : [],
                isShow:false,
                params : {
                    page : 1,
                    event_type : '',
                    range : '',
                    search : '',
                    collect_rent : '',
                },
                keywords : '',
                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                currentDate : [],
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
                confirmMsg:[],
                pendingId : '',
                account_pending_status : '',
                Params : '',
                keepStatus : false,
            }
        },
        created () {

            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('revenue/glee_collect/dict').then((res) =>{
                    this.dictionary = res.data;
                    if(this.$route.query.Params !== undefined && this.$route.query.Params.page !== undefined){
                        this.params = this.$route.query.Params;
                        this.currentDate = [];
                        if (this.params.range !== '') {
                            this.currentDate.push(this.params.range.split( 'to')[0]);
                            this.currentDate.push(this.params.range.split( 'to')[1]);
                        }
                        this.keepStatus = true;
                    }else {
                        this.keepStatus = false;
                    }
                    this.getPendingList();
                })
            },
            searchList(){
                this.params.page = 1;
                this.getPendingList();
            },
            getPendingList(){
                this.$http.get('account/pending',{ params : this.params}).then((res) =>{
                    if(res.data.code === '18800'){
                        this.paging = '';
                        this.pendingList = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    }else {
                        this.pendingList = [];
                        this.paging = '';
                        this.isShow = true;
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
            picked(item,e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if(evInput.checked){
                    this.operId = item.id;
                    this.account_pending_status = item.status;
                    this.collectRent = item.collect_rent;
                }else {
                    this.operId = 0;
                    this.account_pending_status = '';
                }
            },
            getPage(val){
                this.params.page = val;
                this.getPendingList();
            },
            edit(){
                $('#operModal').modal('show');
            },
            getDate(val){
                this.params.range = val;
                this.searchList();
            },
            settleAccount(){
                this.pendingId = this.operId;
                $('#pendingSettle').modal('show');
            },
            deletePending(){
                this.confirmMsg = {msg:'您确定删除吗'};
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('account/pending/delete/' +  this.operId).then((res) =>{
                    if(res.data.code === '18810'){
                        this.operId = 0;
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.searchList();
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
            hasSettle(){
                this.operId = 0;
                this.searchList();
            }
        }
    }
</script>
<style scoped>
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    select{
        margin-bottom: 5px;
    }
</style>