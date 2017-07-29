<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li><router-link to="/reportedRenting">租房报备</router-link></li>
            <li>租房报备详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div v-if="msg!=''">
                    <span>录入时间</span>
                    <span>{{msg.create_time}}</span>
                    <span :class="{'status':true,'btn':true,'yellow':msg.status===1,'orange':msg.status===2,'green':msg.status===3}">{{dict.checkin_status[msg.status]}}</span>
                    <div class="pull-right">
                        <button class="btn btn-primary" @click="addCollectReported">收房报备</button>
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
                        <a class="pull-right" data-toggle="modal" data-target="#edit" v-show="msg.status==1">编辑</a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12" v-if="msg!=''">
                            <div class="col-md-4">
                                <div><span class="text-primary">客户姓名：</span><span>{{msg.customer==undefined?'':msg.customer.name}}</span></div>
                                <div><span class="text-primary">房屋地址：</span><span>{{msg.house.detailed_address}}</span></div>
                                <div><span class="text-primary">房型：</span><span>{{msg.house.rooms.rooms}}室{{msg.house.rooms.hall}}厅{{msg.house.rooms.toilet}}</span></div>
                                <div><span class="text-primary">租房类型：</span><span>{{dict.rent_type[msg.rent_type]}}</span></div>
                                <div><span class="text-primary">年限(月)：</span><span>{{msg.months}}</span></div>
                                <div><span class="text-primary">付款类型：</span><span>押{{msg.bet}}付{{msg.pay}}</span></div>
                                <div><span class="text-primary">出租月单价：</span><span>{{msg.price}}</span></div>
                                <div><span class="text-primary">应收金额：</span><span>xcxx</span></div>
                                <div><span class="text-primary">已收科目：</span><span>{{dict.subject[msg.received_type]}}</span></div>
                                <div><span class="text-primary">付款方式：</span>
                                    <span>
                                        <!--支付宝-->
                                        {{dict.rent_payment[msg.payment[0].payment_id]}}
                                        &nbsp;
                                        {{msg.payment[0].money}}
                                        <a v-show="msg.payment.length>1" data-toggle="modal" data-target="#change">变化</a>
                                    </span>
                                </div>
                                <div><span class="text-primary">已收金额：</span><span>{{msg.received_amount}}</span></div>
                                <div><span class="text-primary">未收金额：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">尾款补齐时间：</span><span>{{msg.complete_date}}</span></div>
                            </div>
                            <div class="col-md-8">
                                
                                <div><span class="text-primary">凭证截图：</span>
                                    <span>
                                        <img :src="item.small" alt="" v-for="(item,index) in msg.album.receipt_pic" @click="showLargePic(index)">
                                        <!--<img src="http://img1.imgtn.bdimg.com/it/u=1902468542,2120439953&fm=200&gp=0.jpg" alt="">
                                        <img src="http://img1.imgtn.bdimg.com/it/u=1902468542,2120439953&fm=200&gp=0.jpg" alt="">-->
                                    </span>
                                </div>
                                <div><span class="text-primary">中介费：</span><span>{{msg.cost_medi}}</span></div>
                                <!--<div><span class="text-primary">收款方式：</span><span>颠三倒</span></div>-->
                                <div><span class="text-primary">收款账户：</span><span>颠三倒</span></div>
                                <div><span class="text-primary">待签约日期：</span><span>{{msg.deal_time}}</span></div>
                                <div><span class="text-primary">备注：</span><span>{{msg.remark==''?'无':msg.remark}}</span></div>
                                <div><span class="text-primary">签约人：</span><span>{{msg.staff==undefined?'':msg.staff.real_name}}</span></div>
                                <div><span class="text-primary">负责人：</span><span>{{msg.leader==undefined?'':msg.leader.real_name}}</span></div>
                                <div><span class="text-primary">所属部门：</span><span>{{msg.department==undefined?'':msg.department.name}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--提示信息-->
        <Status :state='info'></Status>

        <!--新增收房报备-->
        <AddModal :rentMsg="rentMsg"></AddModal>

        <!--编辑-->
        <EditModal :id="id" @save="getDetails(id)"></EditModal>


        <PicModal :largePic="largePic"></PicModal>

        <div class="modal fade bs-example-modal-sm" id="change" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">付款方式</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <!--dict.rent_payment[msg.payment[0].payment_id]-->
                        <div class="col-sm-12 clearFix" v-for="item in msg.payment">
                            <span class="col-sm-5">{{dict.rent_payment[item.payment_id]}}</span>
                            <span class="col-sm-7">{{item.money}}元</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Confirm from '../common/confirm.vue'
    import Status from '../common/status.vue'
    import AddModal from './collectAdd.vue'
    import EditModal from './rentingEdit.vue'
    import PicModal from '../common/largePic.vue'
    export default{
        components: {Confirm,Status,EditModal,PicModal,AddModal},
        data(){
            return {
                msg: '',
                dict : {},
                id : 0,

                largePic : [],
                srcs : {},

                rentMsg : [
                    {
                        id : '',
                        house_id : '',
                        house : {}
                    }
                ],

                confirmMsg: {
                    id: '',
                    msg: '',
                    status: ''
                },
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
            let id = this.$route.query.rentId;
            console.log(id);
//            this.id = id;
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
                            this.msg = res.data.data;
                            this.srcs = this.msg.album.receipt_pic;
                            if (res.data.data.status==1){
                                this.id = id;
                            }
//                            console.log(this.msg)
                        }
                    );
            },

            changeStatus(num){
                // 修改状态


                this.confirmMsg.id = this.$route.query.rentId;
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
                let id = this.$route.query.rentId;
                if (num==1){
//                    this.confirmMsg.msg = '确定提交报备信息吗？';
                    url = 'checkin/rent/pending/'+id;
                } else if (num==2){
//                    this.confirmMsg.msg = '确定通过审核吗？';
                    url = 'checkin/rent/pass/'+id;
                } else if (num==3){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/rent/stash/'+id;
                } else if (num==4){
//                    this.confirmMsg.msg = '确定驳回吗？';
                    url = 'checkin/rent/pending/'+id;
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

                                this.getDetails(id);
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
            // 查看大图
            showLargePic(num){
                this.largePic = [{
                    src : this.srcs,
                    i : num
                }];
                console.log(this.largePic)
                $('#largePic').modal('show');
            },
            addCollectReported(){
                this.rentMsg = [
                    {
                        id : this.id,
                        house_id : this.msg.house_id,
                        house : this.msg.house
                    }
                ];
                $('#add').modal('show');
            }
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
    .client_info > div > div > div span img{
        cursor: pointer;
        width: 120px;
        height: 120px;
    }
    .client_info > div > div > div span img+img{
        margin-left: 10px;
    }

    .client_info > div > div > div span a{
        margin-left: 12px;
        font-size: 8px;
    }

    #change .modal-body>div span:nth-child(1){
        /*text-align: right;*/
        color: #59ace2;
    }
    #change .modal-body>div{
        line-height: 30px;
    }
    #add{
        z-index: 1044;
    }
</style>