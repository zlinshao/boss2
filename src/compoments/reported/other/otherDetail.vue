<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li><router-link to="/reportedOther">其余款项报备</router-link></li>
            <li>其余款项报备详情</li>
            <li class="pull-right" v-show="typeof params!='string'">
                <router-link :to="{path:'/reportedOther',query:{myParam:params,page:page}}"><i class="fa fa-angle-double-left"></i> 返回上一步</router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div v-if="msg!=''">
                    <span>录入时间</span>
                    <span>{{msg.create_time}}</span>
                    <span :class="{'status':true,'btn':true,'yellow':msg.status===1,'orange':msg.status===2,'green':msg.status===3}">{{dict.checkin_status[msg.status]}}</span>
                    <div class="pull-right">
                        <button class="btn btn-primary" v-show="msg.status==1" @click="changeStatus(1)">提交</button>
                        <button class="btn btn-primary" v-show="msg.status==2" @click="changeStatus(3)">驳回</button>
                        <button class="btn btn-primary" v-show="msg.status==3" @click="changeStatus(4)">驳回</button>
                        <button class="btn btn-primary" v-show="msg.status==2" @click="pass">通过</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;报备详情
                        <a class="pull-right fa fa-pencil-square-o" data-toggle="modal" data-target="#otherEdit" v-show="msg.status==1"></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="col-md-12" v-if="msg!=''">
                        <div class="col-md-8 details">
                            <h5>报备信息</h5>
                            <div class="col-md-6">
                                <div><span class="text-primary">客户姓名：</span><span>{{msg.customer==undefined?'':msg.customer.name}}</span></div>
                                <div><span class="text-primary">房屋地址：</span><span>{{msg.house.detailed_address}}</span></div>
                                <div><span class="text-primary">款项名称：</span><span>{{msg.money_name}}</span></div>
                                <div><span class="text-primary">款项金额：</span><span>{{msg.money_amount}}</span></div>
                            </div>
                            <div class="col-md-6">
                                <div><span class="text-primary">备注：</span><span>{{msg.remark}}</span></div>
                                <div><span class="text-primary">签约人：</span><span>{{msg.staff==undefined?'':msg.staff.real_name}}</span></div>
                                <div><span class="text-primary">负责人：</span><span>{{msg.leader==undefined?'':msg.leader.real_name}}</span></div>
                                <div><span class="text-primary">所属部门：</span><span>{{msg.department==undefined?'':msg.department.name}}</span></div>
                            </div>
                        </div>
                        <div class="col-md-4 reported" v-if="msg.money_type==2">
                            <h5>收款人信息</h5>
                            <div><span class="text-primary">汇款方式：</span><span>{{dict.payment[msg.account_type]}}</span></div>
                            <div v-show="msg.account_type==1||msg.account_type==4"><span class="text-primary">收款人姓名：</span><span>{{msg.account_owner}}</span></div>
                            <div v-show="msg.account_type==1||msg.account_type==4"><span class="text-primary">开户行：</span><span>{{dict.bank[msg.account_bank]}}</span></div>
                            <div v-show="msg.account_type==1||msg.account_type==4"><span class="text-primary">支行：</span><span>{{msg.account_subbank}}</span></div>
                            <div v-show="msg.account_type==2"><span class="text-primary">支付宝姓名：</span><span>{{msg.account_owner}}</span></div>
                            <div>
                                <span class="text-primary" v-if="msg.account_type==2">支付宝账号：</span>
                                <span class="text-primary" v-else-if="msg.account_type==3">微信账号：</span>
                                <span class="text-primary" v-else-if="msg.account_type==4">存折账号：</span>
                                <span class="text-primary" v-else>账号：</span>
                                <span>{{msg.account_num}}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <div class="modal fade bs-example-modal-sm" id="change" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{changeModal.title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="col-sm-12 clearFix">
                            <span class="col-sm-5">第1年</span>
                            <span class="col-sm-7">发地方</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--提示信息-->
        <Status :state='info'></Status>

        <!--生成款项-->
        <CreatePayment :from="3" :addPayment_id="addPayment_id" @success="getDetails"></CreatePayment>

        <!--编辑-->
        <EditModal :id="id" @success="getDetails"></EditModal>
    </div>
</template>

<script>
    import Confirm from '../../common/confirm.vue'
    import Status from '../../common/status.vue'
    import CreatePayment from '../createPayment.vue'
    import EditModal from './otherEdit.vue'
    export default{
        components: {CreatePayment,Confirm,Status,EditModal},
        data(){
            return {
                msg : '',
                dict : {},
                id : 0,
                changeModal : {
                    title : '',
                    data : []
                },
                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },

                addPayment_id : 0,
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
                params : {},
                page : '',
            }
        },
        mounted (){
            let id = this.$route.query.otherId;
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            console.log(id);
//            this.collectMsg.id = id;
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        this.getDetails();
                    }
                );


        },
        methods: {
            showChange(num){
                if (num == 1){
                    // 付款方式
                    this.changeModal.title = '付款方式';
                    this.changeModal.data = [];
                    /*for (let i = 0;i<this.msg.pay_type.length;i++){
                        this.changeModal.data.push(this.dict.pay_type[this.msg.pay_type[i]]);
                    }*/
//                    console.log(this.msg.pay_type)
//                    console.log(this.changeModal.data)
//                    this.changeModal.data = this.msg.pay_type;

                } else {
                    // 价格
                    this.changeModal.title = '月单价';
//                    this.changeModal.data = this.msg.price;
                }
                $('#change').modal('show');
            },

            getDetails(){
                this.$http.get('checkin/extra/'+this.$route.query.otherId)
                    .then(
                        (res) => {
                            console.log(res.data.data);
                            this.msg = res.data.data;
                            if (res.data.data.status==1){
                                this.id = this.$route.query.otherId;
                            }
                            /*if (res.data.data.status==1){
                                this.id = this.$route.query.collectId;
                            }*/
//                            this.collectMsg.house_id = res.data.data.house_id;
//                            this.collectMsg.house = res.data.data.house;
//                            console.log(this.msg)
                        }
                    );
            },

            changeStatus(num){
                // 修改状态
                this.confirmMsg.id = this.$route.query.otherId;
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
                let id = this.$route.query.otherId;
                if (num==1){
//                    this.confirmMsg.msg = '确定提交报备信息吗？';
                    url = 'checkin/extra/pending/'+id;
                } else if (num==2){
//                    this.confirmMsg.msg = '确定通过审核吗？';
                    url = 'checkin/extra/pass/'+id;
                } else if (num==3){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/extra/stash/'+id;
                } else if (num==4){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/extra/pending/'+id;
                }

                this.$http.get(url)
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code==18010){
                                this.info.success = res.data.msg;
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
                                this.getDetails();
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

            pass(){
                this.addPayment_id = this.msg.id;
                $('#cteatePayment').modal('show');
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

    .client_info >div > div > div > div,.reported>div {
        margin-bottom: 20px;
    }
    .client_info h5{
        font-size: 16px;
        /*font-weight: 400;*/
        margin-bottom: 20px;
    }
    .reported{
        border-left: 1px dashed #ddd;
    }

    .client_info div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    .client_info > div > div > div span a{
        margin-left: 12px;
        font-size: 8px;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>