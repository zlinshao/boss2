<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/CollectPayment">应收款项</router-link>
            </li>
            <li class="active">应收款项详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div v-if="msg!=''">
                    <span>房屋地址</span>
                    <span>{{msg.description.address}}</span>
                    <span :class="{'status':true,'btn':true,'status':true,'yellow':msg.status===1,'red':msg.status===2,'green':msg.status===3}">
                        {{dict.account_should_status[msg.status]}}
                    </span>
                    <div class="pull-right">
                        <button class="btn btn-primary">转为待处理项</button>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#collectFor">应收入账</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;应收详情
                        <!--<a class="pull-right" @click="oper">编辑</a>-->
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12" v-if="msg!=''">
                            <div class="col-md-4">
                                <div><span class="text-primary">客户姓名：</span><span>{{msg.customer.name}}</span></div>
                                <div><span class="text-primary">房屋地址：</span><span>{{msg.description.address}}</span></div>
                                <div><span class="text-primary">收款时间：</span>
                                    <span>
                                        {{msg.pay_date}}
                                        <a data-toggle="modal" data-target="#moreTime">更多</a>
                                    </span>
                                </div>
                                <div><span class="text-primary">收入科目：</span><span>{{dict.account_subject[msg.subject_id]}}</span></div>
                                <div><span class="text-primary">付款方式：</span><span>{{msg.description.pay_type}}</span></div>
                                <div><span class="text-primary">月单价：</span><span>{{msg.description.price}}</span></div>
                                <div><span class="text-primary">应收金额：</span><span>{{msg.amount_receivable}}</span></div>
                                <div><span class="text-primary">实收金额：</span><span>{{msg.amount_received}}</span></div>
                            </div>
                            <div class="col-md-8">
                                <div><span class="text-primary">剩余款项：</span><span>{{msg.balance}}</span></div>
                                <div><span class="text-primary">补齐时间：</span><span>{{msg.complete_date}}</span></div>
                                <div><span class="text-primary">截图凭证：</span><span>
                                    <img :src="item.small" alt="" v-for="(item,index) in msg.album.receipt_pic" @click="showLargePic(index)">
                                </span></div>
                                <div><span class="text-primary">备注：</span><span>{{msg.remark}}</span></div>
                                <!--<div><span class="text-primary">签约人：</span><span>{{msg.description.staff_name}}</span></div>-->
                                <!--待入账的没有-->
                                <!--<div><span class="text-primary">收款人员：</span><span>{{dict.staff_id[msg.staff_id]}}</span></div>-->
                                <div><span class="text-primary">历史收款记录：</span>
                                    <span v-for="(key,value) in msg.running_account_record">
                                        <span>{{value}}</span>&emsp;
                                        <span>{{key}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


        <!--付款时间-->
        <div class="modal fade full-width-modal-right" id="moreTime" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑付款时间</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group" v-for="(item,index) in moreTime">
                                <label class="col-sm-3 control-label">第{{index+1}}次付款时间</label>
                                <div class="col-sm-9" v-if="showOper[index]">
                                    <div class="col-sm-7">
                                        <input @click="remindData" type="text" :class="{'form-control' : true,'form_datetime':index<4,'form_datetime2':index>=4}" v-model="moreTime[index]">
                                    </div>
                                    <div class="col-sm-5">
                                        <button type="button" class="btn btn-sm btn-success" @click="operTime(index)">确定</button>
                                        <button type="button" class="btn btn-sm btn-primary" @click="cancel(index)">取消</button>
                                    </div>
                                </div>
                                <div class="col-sm-8" v-else="showOper[index]">
                                    <div class="col-sm-6">
                                        <span>{{item}}</span>
                                    </div>
                                    <div class="col-sm-5">
                                        <span @click="changeShow(index)"><a>编辑</a></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--编辑-->
        <!--<div class="modal fade full-width-modal-right" id="edit" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">编辑应付款项</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款时间</label>
                                <div class="col-sm-10">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="付款时间"
                                           class="form-control form_datetime">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">房屋地址</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" data-toggle="modal" data-target="#selectHouse" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">客户姓名</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" data-toggle="modal" data-target="#selectClient" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">签约人</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">支出科目</label>
                                <div class="col-sm-10">
                                    <select class="form-control">
                                        <option value="">押金</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">应付金额</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">累计实付</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">付款人员</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">取消</button>
                        <button type="button" class="btn btn-primary">修改</button>
                    </div>
                </div>
            </div>
        </div>-->

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--应收入账-->
        <!--<ShouldCollect :id="id"></ShouldCollect>-->
        <SelectHouse @House="getHouse"></SelectHouse>
        <SelectClient @clientAdd="getClient"></SelectClient>
        <PicModal :largePic="largePic"></PicModal>

    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    import ShouldCollect from './paymentShouldCollect.vue'

    import SelectHouse from '../../common/selectHouse.vue'
    import SelectClient from '../../common/selectClient.vue'
    import PicModal from '../../common/largePic.vue'

    export default{
        components: {Status,ShouldCollect,SelectHouse,SelectClient,PicModal},
        data(){
            return {
                dict : {},

                id : '',
                msg : '',
                currentIndex : -1,

                largePic : [],
                srcs : {},

                showOper: [],

                times : [
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                ],
                moreTime : [
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
                    '2017/09/12',
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
            }
        },
        updated (){
//            this.remindData();
        },
        mounted (){
            this.id = this.$route.query.collectId;

            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        this.getDetails();
                    }
                );
            for (let i = 0 ; i<this.moreTime.length ; i++){
                this.showOper.push(false);
            }
//            this.times = this.moreTime;
//            console.log(this.moreTime)
//            console.log(this.showOper)

        },
        methods : {
            getDetails(){
                this.$http.get('account/receivable/'+this.id)
                    .then((res) =>{
//                        console.log(res.data);
                        this.msg = res.data.data;
                        this.srcs = this.msg.album.receipt_pic;
                        console.log(this.msg)
                    })
            },

            oper(){
                $('#edit').modal('show');
            },

            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
//                    pickerPosition : 'top-left'
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder == '付款时间'){
                        // 编辑中的付款时间
                    } else {
                        this.moreTime.splice(this.currentIndex,1,ev.target.value);
                    }
//                    console.log(ev.target.value);
//                    console.log(ev.target.placeholder);
                }.bind(this));
                $('.form_datetime2').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                    pickerPosition : 'top-left'
                }).on('changeDate', function (ev) {
                    this.moreTime.splice(this.currentIndex,1,ev.target.value);
//                    console.log(ev.target.value);
                }.bind(this));
            },

            getHouse(data){},
            getClient(data){},

            changeShow(index){
//                console.log(this.currentIndex);
                if (this.currentIndex==-1){
                    this.currentIndex = index;
//                this.showOper[index] = true;
                    this.showOper.splice(index,1,true);
//                    console.log(this.showOper)
                }
//                console.log(this.currentIndex);

            },
            operTime(index){
                this.currentIndex = -1;
                this.showOper.splice(index,1,false);
//                console.log(this.moreTime);
                this.times.splice(index,1,this.moreTime[index]);
            },
            cancel(index){
                this.currentIndex = -1;
                this.showOper.splice(index,1,false);
                this.moreTime.splice(index,1,this.times[index]);
//                console.log(this.moreTime);
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
        /*color: white;*/
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

    .form-horizontal .form-group span{
        line-height: 34px;
        font-size: 14px;
    }

    .status.yellow {
        background-color: #FFCC00;
    }

    .status.red {
        background-color: #FF9999;
    }

    .status.green {
        background-color: #78CD51;
    }
    img{
        cursor: pointer;
    }
</style>