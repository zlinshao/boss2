<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本{{params.search}}</li>
            <li class="active">待处理项</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline" v-show="operId==0" role="form">
                        <div class="pro-sort">
                            <select name="" class="form-control"  v-model="params.type" >
                                <option value="">事件类型</option>
                                <option :value="key" v-for="(value,key) in dictionary.item_type">{{value}}</option>
                            </select>
                        </div>
                        <div class="pro-sort">
                            <select name="" class="form-control" v-model="params.collect_rent">
                                <option value="">收租类型</option>
                                <option :value="key" v-for="(value,key) in dictionary.collect_rent">{{value}}</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <!--<label class="sr-only" for="search_info">搜索</label>-->
                            <input type="text" class="form-control" placeholder="房屋地址/租房人" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="" v-model="params.search">
                                    搜索
                                </button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#add">
                                <i class="fa fa-plus-square"></i>&nbsp;新增待处理项
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="edit"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times-circle-o"></i>删除</a></h5>
                        </li>
                        <li>
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
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in pendingList">
                            <td><input type="checkbox" @click="picked(item,$event)"></td>
                            <td>{{dictionary.item_type[item.item_type]}}</td>
                            <td>{{}}</td>
                            <td>{{}}</td>
                            <td>{{}}</td>
                            <td>{{}}</td>
                            <td>{{item.start_date}}</td>
                            <td>{{item.end_date}}</td>
                            <td>{{item.penalty_fee}}</td>
                            <td>{{}}</td>
                            <td>{{}}</td>
                            <td></td>
                            <td>{{}}</td>
                            <td>
                                <label class="label label-warning">{{dictionary.account_pending_status [item.status]}}</label>
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
        <addModal></addModal>

        <Page :pg="paging" @pag="getPage" :beforePage = 'params.page'></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    import addModal from './pendingAdd.vue'

    export default{
        components: {Page,Status,DatePicker,addModal},
        data(){
            return {
                operId : 0,
                paging : 1,
                dictionary : [],
                pendingList : [],
                isShow:false,
                params : {
                    page : 1,
                    type : '',
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
                }
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
                    this.getPendingList();
                })
            },
            getPendingList(){
                this.$http.get('account/pending',{ params : this.params}).then((res) =>{
                    this.pendingList = res.data.data.data;
                    console.log(this.pendingList)
                })
            },
            picked(item,e){
                if(e.target.checked===true){
                    this.operId = item.id;
                }else {
                    this.operId = 0;
                }
            },
            getPage(val){
                this.params.page = val;
            },
            edit(){
                $('#operModal').modal('show');
            },
            getDate(val){
                this.params.range = val
            },
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