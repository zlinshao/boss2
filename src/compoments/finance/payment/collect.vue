<template>
    <div>

        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>应收款项</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <!--<label style="font-weight: bold;display: inline-block">查 询</label>-->
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <!--<div class="input-group">
                            <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                        </div>-->
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"  @keydown.enter.prevent="search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addNew">
                                <i class="fa fa-plus-square"></i>&nbsp;新增应收款项
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <div class="panel tips">
            <ul class="clearFix">
                <li class="col-md-4">
                    应付金额(元) <br>
                    <span class="green">1212</span>
                </li>
                <li class="col-md-4">
                    实付金额(元) <br>
                    <span class="green">313</span>
                </li>
                <li class="col-md-4">
                    剩余款项(元) <br>
                    <span class="yellow">343</span>
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
                            <th class="text-center">付款时间</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">月单价</th>
                            <th class="text-center">支出科目</th>
                            <th class="text-center">应付金额</th>
                            <th class="text-center">实付金额</th>
                            <th class="text-center">剩余款项</th>
                            <th class="text-center">补齐时间</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td><router-link :to="{path:'/CollectPaymentDetail',query: {collectId: 1}}">详情</router-link></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>


        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="addModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">取消</button>
                        <button type="button" class="btn btn-primary" v-if="isAdd">保存</button>
                        <button type="button" class="btn btn-primary" v-else="isAdd">修改</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :pg="paging" @pag="getPage"></Page>


        <!--提示信息-->
        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import FlexBox from '../../common/flexBox.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page,Status,FlexBox,DatePicker,STAFF},

        data(){
            return {
                operId : 0,
                statusId:0,
                paging : '',
                page : 1,                  // 当前页数

                dict : {},
                myData: [],      //列表数据

                dateConfigure : [
                    {
                        range : true,
                        needHour : true
                    }
                ],

                configure : {},
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },

                title : '',
                isAdd : true,

                selected : [],
                params : {
                    department_id : [],
                    staff_id : [],
                    status : '',
                    range : '',
                    search : ''
                },
                tips : {},
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
        updated (){
            this.remindData();
            //            时间选择
        },
        mounted (){
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
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            addNew(){
                this.title = '新增应付款项';
                this.isAdd = true;
            },
            operation(id,index){
                this.title = '修改应付';
                this.isAdd = false;
            },

            payFlowList(){
                /*this.$http.get('account/payable').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res.data);
                    if (res.data.code==18400){
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                    }
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
                });
                $('.form-inline .form_datetime').on('changeDate', function (ev) {
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
            getPage(data){
                this.page = data;
            },

            oper(){
                console.log(this.operId);
                this.title = '编辑应付款项';
                this.isAdd = false;
                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/

            },

            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for(let i=0;i<val.department.length;i++){
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for(let j=0;j<val.staff.length;j++){
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
//                this.search();
            },
            clearSelect(){
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search();
            },

            search(){
                console.log(this.params);
                this.page = 1;
                this.filter();
            },
            getDate(data){
                // 时间
                console.log(data);

            },

            filter(){
                this.operId = 0;
                /*this.$http.get('account/payable?page='+this.page,{
                    params : this.params
                }).then(
                    (res) =>{
                        if (res.data.code == 18400){
                            // 成功
                            this.paging = res.data.data.pages;
                            this.myData = res.data.data.data;
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                            this.myData = [];
                            this.paging = 0;
                            this.page = 1;
                        }
                    }
                )*/
            },
        }
    }
</script>

<style scoped>
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
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
        padding-left: 8px;
        /*font-weight: bold;*/
    }
    .tips ul li span.green{
        color: #78CD51;
    }
    .tips ul li span.yellow{
        color: #FF9A02;
    }
    div.input-group{
        padding: 0 15px;
    }
    label{
        line-height: 34px;
    }

    tbody tr{
        cursor: pointer;
    }

    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }

</style>