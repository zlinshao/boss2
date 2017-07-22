<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li><router-link to="/reportedRenting">租房报备</router-link></li>
            <li>收房报备详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div v-if="msg!=''">
                    <span>录入时间</span>
                    <span>{{msg.deal_time}}</span>
                    <span :class="{'status':true,'btn':true,'yellow':msg.status===1,'orange':msg.status===2,'green':msg.status===3}">{{dict.checkin_status[msg.status]}}</span>
                    <div class="pull-right">
                        <button class="btn btn-primary" v-show="msg.status==1" @click="changeStatus(1)">提交</button>
                        <button class="btn btn-primary" v-show="msg.status==2" @click="changeStatus(3)">驳回</button>
                        <button class="btn btn-primary" v-show="msg.status==3" @click="changeStatus(4)">驳回</button>
                        <button class="btn btn-primary" v-show="msg.status==2" @click="changeStatus(2)">通过</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;租房报备信息
                        <a class="pull-right" data-toggle="modal" data-target="#edit">编辑</a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12" v-if="msg!=''">
                            <div class="col-md-4">
                                <div><span class="text-primary">客户姓名：</span><span>{{msg.customer.name}}</span></div>
                                <div><span class="text-primary">房屋地址：</span><span>{{msg.house.detailed_address}}</span></div>
                                <div><span class="text-primary">房型：</span><span>{{msg.house.rooms.rooms}}室{{msg.house.rooms.hall}}厅{{msg.house.rooms.toilet}}</span></div>
                                <div><span class="text-primary">租房类型：</span><span>{{dict.rent_type[msg.rent_type]}}</span></div>
                                <div><span class="text-primary">年限(月)：</span><span>{{msg.months}}</span></div>
                                <div><span class="text-primary">付款类型：</span><span>押{{msg.bet}}付{{msg.pay}}</span></div>
                                <div><span class="text-primary">月单价：</span><span>{{msg.price}}</span></div>
                                <div><span class="text-primary">应收金额：</span><span>xcxx</span></div>
                                <div><span class="text-primary">已收科目：</span><span>{{dict.subject[msg.received_type]}}</span></div>
                                <div><span class="text-primary">付款方式：</span><span>支付宝</span></div>
                                <div><span class="text-primary">已收金额：</span><span>{{msg.received_amount}}</span></div>
                                <div><span class="text-primary">未收金额：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">尾款补齐时间：</span><span>{{msg.complete_date}}</span></div>
                            </div>
                            <div class="col-md-8">
                                
                                <div><span class="text-primary">凭证截图：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">中介费：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">收款方式：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">收款账户：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">待签约日期：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">待签约日期：</span><span>{{msg.deal_time}}</span></div>
                                <div><span class="text-primary">备注：</span><span>{{msg.remark}}</span></div>
                                <div><span class="text-primary">签约人：</span><span>{{msg.staff.real_name}}</span></div>
                                <div><span class="text-primary">负责人：</span><span>{{msg.leader.real_name}}</span></div>
                                <div><span class="text-primary">所属部门：</span><span>{{msg.department.name}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                msg: '',
                dict : {},
                id : 0,
            }
        },
        mounted (){
            let id = this.$route.query.rentId;
            console.log(id);
            this.id = id;
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        this.getDetails(id);
                    }
                );
        },
        methods: {
            getDetails(id){
                this.$http.get('checkin/rent/'+id)
                    .then(
                        (res) => {
//                        console.log(res.data.data);
                            this.msg = res.data.data
//                            console.log(this.msg)
                        }
                    );
            },
        }
    }
</script>

<style scoped>
    .head .panel-body>div span{
        /*display: inline-block;*/
        font-weight: bold;
    }
    .head .panel-body>div span+span{
        margin-left: 12px;
    }
    .head .panel-body>div span.status{
        color: white;
        font-weight: normal;
        font-size: 12px;
    }

    header h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    header h4 > a {
        margin-left: 10px;
    }

    .client_info > div > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    .client_info > div > div > div span a{
        margin-left: 12px;
        font-size: 8px;
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

    #change .modal-body>div span:nth-child(1){
        /*text-align: right;*/
        color: #59ace2;
    }
    #change .modal-body>div{
        line-height: 30px;
    }
</style>