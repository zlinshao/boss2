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
                        <div class="input-group">
                            <select class="form-control" v-model="params.type" @change="search">
                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="搜索房屋地址" v-model="params.search"  @keydown.enter.prevent="search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                            </span>
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
                    <span class="red">313</span>
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
                            <th class="text-center">付款时间</th>
                            <th class="text-center">客户姓名</th>
                            <th class="text-center">详情</th>
                            <th class="text-center">科目名称</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">收/汇款方式</th>
                            <th class="text-center">收/汇款账户</th>
                            <th class="text-center">应付/收金额</th>
                            <th class="text-center">实付/收金额</th>
                            <th class="text-center">账户余额</th>
                            <th class="text-center">收/付款人员</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">

                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="11">暂无数据...</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="getPage"></Page>



        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import STAFF from  '../common/organization/selectStaff.vue'
    import DatePicker from '../common/datePicker.vue'

    export default{
        components: {Page,DatePicker,STAFF},

        data(){
            return {
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

                configure : {},
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },

                myData: [],      //列表数据

                selected : [],
                params : {
                    department_id : [],
                    staff_id : [],
                    range : '',
                    search : '',
                    type : 1
                },
                tips : {}
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
                /*this.$http.get('json/itemFlow.json').then((res) => {
                 //                    this.collectList = res.data.data.gleeFulCollect;
                 this.cont.myData = res.data.data.payFlowList;
                 this.tips = res.data.data.payTips;
                 //                    console.log(res.data);
                 this.paging = res.data.data.pages;
                 })*/
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
                this.params.range = data;
                this.search();
            },
            getPage(data){
                this.page = data;
                this.filter();
            },
            filter(){

            }
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
        padding-left: 8px;
        /*font-weight: bold;*/
    }
    .tips ul li span.green{
        color: #66CC33;
    }
    .tips ul li span.red{
        color: #FF6666;
    }
    .tips ul li span.yellow{
        color: #FF9A02;
    }
</style>