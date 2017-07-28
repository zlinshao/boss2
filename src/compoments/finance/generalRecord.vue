<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">转账操作记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline" role="form">
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group clearFix">
                            <select class="form-control">
                                <option value="">hdjs</option>
                            </select>
                        </div>

                        <div class="input-group clearFix">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="搜索房屋地址" @keydown.enter.prevent="search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search"><i
                                        class="fa fa-search"></i></button>
                            </span>
                        </div>

                        <div class="form-group pull-right">
                            <a class="btn btn-success" @click="addNew" data-toggle="modal" data-target="#myModal">
                                <i class="fa fa-plus-square"></i>&nbsp;新增转账记录
                            </a>
                        </div>

                    </form>
                </div>

                <div class="choosed" v-show="operId!=0">
                    <ul class="clearFix">
                        <li><a>已选中&nbsp;1&nbsp;项</a></li>
                        <li>
                            <a @click="oper">编辑</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>


        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">转账日期</th>
                            <th class="text-center">转出账户</th>
                            <th class="text-center">账户余额</th>
                            <th class="text-center">转入账户</th>
                            <th class="text-center">账户余额</th>
                            <th class="text-center">转账金额</th>
                            <th class="text-center">转账人员</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">

                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" @click="clearForm"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>

                    <div class="modal-body clearFix">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">转账日期:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime" v-model="modal.date">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-3 control-label">转出账户:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="modal.outAccount">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">转入账户:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="modal.inAccount">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">转账人员:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="modal.people">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">转出账户余额:</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" v-model="modal.outRemain">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">转入账户余额:</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" v-model="modal.inRemain">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">转账金额:</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" v-model="modal.amount">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">备注:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="modal.remark">
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-show="isAdd">保存</button>
                        <button type="button" class="btn btn-primary" v-show="!isAdd">修改</button>
                        <button type="button" class="btn btn-primary" v-show="!isAdd" data-toggle="modal" data-target="#delete">删除</button>
                    </div>
                </div>
            </div>
        </div>


        <Page :pg="paging" @pag="getPage"></Page>
        <!--提示信息-->
        <Status :state='info'></Status>

    </div>
</template>
<style scoped>
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'

    export default{
        components: {Page,Status,DatePicker},
        data(){
            return {
                operId : 0,
                paging : '',
                page : 1,                  // 当前页数

                title : '',
                isAdd : true,

                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                params : {
                    startDataTime : '',
                    finishDataTime : ''
                },
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
                modal : {
                    date : '',
                    outAccount : '',
                    inAccount : '',
                    people : '',
                    outRemain : '',
                    inRemain : '',
                    amount : '',
                    remark : ''
                }
            }
        },
        updated (){
            this.remindData();
            //            时间选择
        },
        created (){
            this.generalRecordList();
        },
        methods : {
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            generalRecordList(){
                /*this.$http.get('json/generalRecord.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.cont.myData = res.data.data.generalRecordList;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })*/
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
                    } else if (ev.target.placeholder === '结束时间'){
                        this.modal.finishDataTime = ev.target.value;
                    } else {
                        this.modal.date = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getPage(data){
                this.page = data;
            },
            clearForm(){
                $('#myModal').modal('hide');
            },
            addNew(){
                this.title = '新增转账记录';
                this.isAdd = true;
            },
            oper(){
                console.log(this.operId);
                this.title = '编辑转账记录';
                this.isAdd = false;
                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/

            },

            search(){},
            getDate(data){

            }
        }
    }
</script>