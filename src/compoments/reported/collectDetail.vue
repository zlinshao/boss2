<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li><router-link to="/reportedCollect">收房报备</router-link></li>
            <li>收房报备详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div v-if="msg!=''">
                    <span>录入时间</span>
                    <span>2017/07/23</span>
                    <span :class="{'status':true,'btn':true,'yellow':msg.status===1,'orange':msg.status===2,'green':msg.status===3}">{{dict.checkin_status[msg.status]}}</span>
                    <div class="pull-right">
                        <button class="btn btn-primary" v-show="msg.status==1" @click="changeStatus(1)">提交</button>
                        <button class="btn btn-primary" v-show="msg.status==2" @click="changeStatus(2)">通过</button>
                        <button class="btn btn-primary" v-show="msg.status==2" @click="changeStatus(3)">驳回</button>
                        <button class="btn btn-primary" v-show="msg.status==3" @click="changeStatus(4)">驳回</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;收房报备信息
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
                                <div><span class="text-primary">空置期：</span><span>{{msg.vacancy}}</span></div>
                                <div><span class="text-primary">年限：</span><span>{{msg.years}}</span></div>
                                <div><span class="text-primary">付款方式：</span><span>{{dict.pay_type[msg.pay_type[0]]}}</span></div>
                                <div><span class="text-primary">月单价：</span><span>{{msg.price[0]}}</span></div>
                                <div><span class="text-primary">押金：</span><span>{{msg.cost_deposit}}</span></div>
                                <div><span class="text-primary">中介费：</span><span>{{msg.cost_medi}}</span></div>
                            </div>
                            <div class="col-md-8">
                                <div><span class="text-primary">汇款方式：</span><span>{{dict.pay_type[msg.pay_type]}}</span></div>
                                <div><span class="text-primary">开户行：</span><span>{{dict.bank[msg.bank]}}</span></div>
                                <div><span class="text-primary">汇款账户：</span><span>{{msg.account}}</span></div>
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

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--提示信息-->
        <Status :state='info'></Status>


        <!--编辑-->
        <EditModal :id="id" @save="getDetails(id)"></EditModal>
    </div>
</template>
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

    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    h4 > a {
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

    .yellow {
        background-color: #F9E175;
    }

    .orange {
        background-color: #FCB322;
    }

    .green {
        background-color: #83E96D;
    }
</style>
<script>
    import Confirm from '../common/confirm.vue'
    import Status from '../common/status.vue'
    import EditModal from './collectEdit.vue'
    export default{
        components: {Confirm,Status,EditModal},
        data(){
            return {
                msg: '',
                dict : {},
                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },
                id : 0,
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
            }
        },
        mounted (){
            let id = this.$route.query.collectId;
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
                this.$http.get('checkin/collect/'+id)
                    .then(
                        (res) => {
//                        console.log(res.data.data);
                            this.msg = res.data.data
//                            console.log(this.msg)
                        }
                    );
            },
            changeStatus(num){
                // 修改状态
                this.confirmMsg.id = this.operId;
                this.confirmMsg.status= num;
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
                let url;
                if (num==1){
//                    this.confirmMsg.msg = '确定提交报备信息吗？';
                    url = 'checkin/collect/pending/'+this.id;
                } else if (num==2){
//                    this.confirmMsg.msg = '确定通过审核吗？';
                    url = 'checkin/collect/pass/'+this.id;
                } else if (num==3){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/collect/stash/'+this.id;
                } else if (num==4){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/collect/pending/'+this.id;
                }

                this.$http.get(url)
                    .then(
                        (res) => {
                            console.log(res);
                            if (res.data.code==18210){
                                this.info.success = '操作成功';
                                //显示失败弹窗 ***
                                this.info.state_success = true;
                                //一秒自动关闭失败信息弹窗 ***
                                setTimeout(() => {
                                    this.info.state_success = false;
                                }, 2000);
                                /*if (res.data.msg=='报备转为已通过状态'){
                                    this.msg.status = 3;
                                } else if (res.data.msg=='报备转为待审核状态'){
                                    this.msg.status = 2;
                                } else if (res.data.msg=='报备转为待提交状态'){
                                    this.msg.status = 1;
                                }*/
                                this.getDetails(this.id);
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


            },
        }
    }
</script>