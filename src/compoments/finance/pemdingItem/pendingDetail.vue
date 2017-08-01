<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/pendingItem">应付款项</router-link>
            </li>
            <li>结算详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div>
                    <span>合同编号</span>
                    <span>LJS081740</span>
                    <span :class="{'status':true,'btn':true}">带结清</span>
                </div>
                <div class="pull-right">
                    <button class="btn btn-primary">生成应收款项</button>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;结算详情
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div>
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <div><span class="text-primary">客户姓名：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">房屋地址：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">合同编号：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">事项类型：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">入住周期：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">付款方式：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">月单价：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">往来记录：</span><span>dfsdf</span></div>
                                <div><span class="text-primary">差额：</span><span>dfsdf</span></div>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">水费：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">电费：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">燃气费：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">物业费：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">网络费：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">转租费用：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">管理费：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">物业校验：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">违约金：</span><span>sdfdsf</span></div>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">应退：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">实际扣款：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">实际退款：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">结算方式：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">结算账户：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">签约人：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">所属部门：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">收款人：</span><span>sdfdsf</span></div>
                                <div><span class="text-primary">结算日期：</span><span>sdfdsf</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>


        <!--提示信息-->
        <Status :state='info'></Status>

    </div>
</template>

<script>
    import Status from '../../common/status.vue';

    export default{
        components: {Status},
        data(){
            return {
                id : '',
                currentIndex : -1,

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
        mounted (){
            this.id = this.$route.query.payId;
            for (let i = 0 ; i<this.moreTime.length ; i++){
                this.showOper.push(false);
            }
//            this.times = this.moreTime;
//            console.log(this.moreTime)
//            console.log(this.showOper)
        },
        methods : {
            oper(){
                $('#edit').modal('show');
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
</style>