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

                        <div class="input-group">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
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
                        <li  @click="settleAccount">
                            <h5><a><i class="fa fa-calculator"></i>结算</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">事项类型</th>
                            <th class="text-center">合同编号</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">客户姓名</th>
                            <th class="text-center">合同开始时间</th>
                            <th class="text-center">合同结束时间</th>
                            <th class="text-center">应退</th>
                            <th class="text-center">实际扣款</th>
                            <th class="text-center">实际退款</th>
                            <th class="text-center">结算账户</th>
                            <th class="text-center">结算人</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in pendingList">
                            <td><input type="checkbox":value="item.id" :checked="operId===item.id"
                                       @click="picked(item,$event)"></td>
                            <td>{{dictionary.item_type[item.item_type]}}</td>
                            <td>{{}}</td>
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
                                <router-link :to="{path:'/pendingDetail',query: {RentingId: item.id}}">
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

        <settleModal :settleId = 'operId' :dictionary = 'dictionary' :collect_rent = 'collect_rent'></settleModal>
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
                collect_rent :'',
                paging : 1,
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
            }
        },
        created () {
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('revenue/glee_collect/dict').then((res) =>{
                    this.dictionary = res.data;
                    console.log(this.dictionary);
                    this.searchList();
                })
            },
            searchList(){
                this.params.page = 1;
                this.getPendingList();
            },
            getPendingList(){
                this.$http.get('account/pending',{ params : this.params}).then((res) =>{
                    if(res.data.code === '18800'){
                        this.pendingList = res.data.data.data;
                        this.isShow = false;
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        console.log(this.pendingList)
                    }else {
                        this.pendingList = [];
                        this.isShow = true;
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
            picked(item,e){
                if(e.target.checked===true){
                    this.operId = item.id;
                    this.collect_rent = item.collect_rent;
                }else {
                    this.operId = 0;
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
                        this.searchList();
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
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