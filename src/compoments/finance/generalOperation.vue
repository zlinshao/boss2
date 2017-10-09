<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">总账操作</li>
        </ol>

        <div class="clearFix">
            <div class="panel col-lg-12">
                <form class="form-inline" role="form">
                    <div class="form-group datetime">
                        <label>
                            <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                        </label>
                        <label>
                            <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                        </label>
                    </div>
                    <div class="input-group" style="margin-bottom: 18px;" @click="search">
                        <button type="button" class="btn btn-success">搜索</button>
                    </div>
                </form>
            </div>
        </div>


        <div class="general panel clearFix">
            <div class="col-lg-6">
                <p>
                    收入账户初始金额: <span>{{cont.receive.start}}</span>
                </p>
                <p>
                    收入账户收入金额: <span>{{cont.receive.receive}}</span>
                </p>
                <p>
                    收入账户当前金额: <span>{{cont.receive.now}}</span>
                </p>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="clear(1)">清空账户</button>
            </div>
            <div class="col-lg-6">
                <p>
                    支出账户初始金额: <span>{{cont.pay.start}}</span>
                </p>
                <p>
                    支出账户支出金额: <span>{{cont.pay.pay}}</span>
                </p>
                <p>
                    支出账户剩余金额: <span>{{cont.pay.now}}</span>
                </p>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="clear(2)">清空充值</button>
            </div>
        </div>

        <!--modal-->
        <div role="dialog" class="modal fade bs-example-modal-sm" id="myModal">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h4 class="modal-title">{{msg}}</h4>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-primary btn-md">取消</button>
                        <button class="btn btn-danger btn-md" v-if="clearAcount">清空账户</button>
                        <button class="btn btn-danger btn-md" v-else="clearAcount">清空并充值</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .general{
        padding: 20px;
    }
    .general>div{
        text-align: center;
        padding: 20px 0 200px;
    }

    .general p{
        margin-top: 40px;
        font-size: 16px;
    }
    .general p span{
        display: inline-block;
        width: 120px;
        margin-left: 10px;
        border-bottom: 1px solid #ddd;
    }
    @media (min-width: 1200px){
        .general div:nth-of-type(2){
            border-left: 2px dashed #ddd;
        }
    }
    @media (max-width: 1199px){
        .general div:nth-of-type(2){
            border-top: 2px dashed #ddd;
        }
    }
    .general button{
        margin-top: 50px;
    }
    label{
        line-height: 34px;
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: '',        // 提示信息
                clearAcount : true,       // 是否清空账户
                params : {
                    startDataTime : '',
                    finishDataTime : ''
                },
                cont : {
                    receive : {},
                    pay : {}
                }
            }
        },
        updated (){
            this.remindData();
            //            时间选择
        },
        created () {
            this.generalOperation();
        },
        components: {},
        methods : {
            generalOperation(){
                this.$http.get('json/generalOperation.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.cont.receive = res.data.data.receive;
                    this.cont.pay = res.data.data.pay;
//                    console.log(res.data);
                })
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder === '开始时间'){
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            clear(num){
                console.log(num);
                if (num === 1){
                    // 清空账号
                    this.msg = '你确认清空账户吗？';
                    this.clearAcount = true;
                } else {
                    // 清空充值
                    this.msg = '你确认清空并充值账户吗？';
                    this.clearAcount = false;
                }
            },
            search(){

            }
        }
    }
</script>