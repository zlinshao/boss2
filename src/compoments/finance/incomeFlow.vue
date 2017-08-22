<template>
    <div>

        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>收支流水</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" v-model="params.cate" @change="search(1)">
                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="搜索房屋地址" v-model="params.search"  @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <div class="panel tips">
            <ul class="clearFix">
                <li class="col-md-4">
                    收入金额(元) <br>
                    <span class="green">{{tips.receive_sum}}</span>
                </li>
                <li class="col-md-4">
                    支出金额(元) <br>
                    <span class="red">{{tips.expend_sum}}</span>
                </li>
                <li class="col-md-4">
                    收入支出差(元) <br>
                    <span class="yellow">{{tips.diff_sum}}</span>
                </li>
            </ul>
        </div>

        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">ID</th>
                            <th class="text-center width100">交易时间</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width80">科目名称</th>
                            <th class="text-center width50">类型</th>
                            <th class="text-center width100">收/汇款方式</th>
                            <th class="text-center width150">收/汇款账户</th>
                            <th class="text-center width110">实收金额</th>
                            <th class="text-center width110">实付金额</th>
                            <th class="text-center width150">账户余额</th>
                            <th class="text-center phone" style="min-width: 360px;">详细信息</th>
                            <th class="text-center width110">收/付款人员</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td :class="{'red':item.cate==2,'green':item.cate==1}">
                                <i class="fa fa-circle"></i>
                            </td>
                            <td>{{item.id}}</td>
                            <td>{{item.update_time}}</td>
                            <td>{{item.customer==undefined?'':item.customer.address}}</td>
                            <td>{{item.subject}}</td>
                            <td>{{dict.er_type[item.cate]}}</td>
                            <td>{{dict.account_cate[item.account_cate]}}</td>
                            <td>{{item.account_num}}</td>
                            <td>{{item.amount_received}}</td>
                            <td>{{item.amount_paid}}</td>
                            <!--<td>{{item.cate==1?item.amount_receivable:item.amount_payable}}</td>-->
                            <!--<td>{{item.cate==1?item.amount_received:item.amount_paid}}</td>-->
                            <td>{{item.amount_remain}}</td>
                            <td>{{item.info}}</td>
                            <td>{{item.operator_name}}</td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="11" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>


    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import DatePicker from '../common/datePicker.vue'

    export default{
        components: {Page,DatePicker},

        data(){
            return {
                beforePage:1,
                dict : {},
                isShow :false,

                paging : '',
                page : 1,                  // 当前页数

                dateConfigure : [
                    {
                        range : true,
                        needHour : true
                    }
                ],

                myData: [],      //列表数据

                params : {
                    department_id : [],
                    staff_id : [],
                    range : '',
                    search : '',
                    cate : 3
                },
                tips : {
                    expend_sum: 0,                           // 总支出
                    receive_sum: 0,                     // 总收入
                    diff_sum: 0,                       // 收支差额
                },
            }
        },
        mounted () {
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        this.payFlowList();
                    }
                );
        },
        methods : {
            payFlowList(){
                this.$http.get('account/running').then((res) => {
                    if (res.data.code==18700){
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.setTips(res.data.data,true);
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.setTips({},false);
                    }
                 })
            },

            search(val){
//                console.log(this.params);
                this.filter(val);
            },
            getDate(data){
                // 时间
                console.log(data);
                this.params.range = data;
                this.search(1);
            },

            filter(val){
                this.beforePage = val;
                this.$http.get('account/running?page='+val,{
                    params : this.params
                }).then(
                    (res) =>{
                        if (res.data.code == 18700){
                            // 成功
                            this.paging = res.data.data.pages;
                            this.myData = res.data.data.data;
                            this.setTips(res.data.data,true);
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.myData = [];
                            this.paging = 0;
                            this.page = 1;
                            this.setTips({},false);
                        }
                    }
                )
            },
            setTips(val,bool){
                if (bool){
                    this.tips.receive_sum = val.receive_sum;
                    this.tips.expend_sum = val.expend_sum;
                    this.tips.diff_sum = val.diff_sum;
                } else {
                    this.tips.receive_sum = 0.00;
                    this.tips.expend_sum = 0.00;
                    this.tips.diff_sum = 0.00;
                }

            },
        }
    }
</script>

<style scoped>

    div.padd {
        display: inline-block;
    }
    .tips{
        line-height: 30px;
        /*padding-left: 12px;*/
        padding-bottom: 5px;
        font-size: 15px;
        /*margin-top: 20px;*/
        /*width: 100%;*/
    }
    .tips ul{
        margin: 0;
        padding: 12px 0;
    }
    .tips ul li{
        /*float: left;*/
        padding: 0 50px;
        box-sizing: border-box;
    }
    .tips ul li+li{
        /*margin-left: 30px;*/
        border-left: 1px solid #ddd;

    }
    .tips ul li span{
        font-size: 18px;
        /*padding-left: 8px;*/
        /*font-weight: bold;*/
    }
    .tips ul li span.green,td.green{
        color: #66CC33;
    }
    .tips ul li span.red,td.red{
        color: #FF6666;
    }
    .tips ul li span.yellow{
        color: #FF9A02;
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }
</style>