<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li class="active">收房合同</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div v-if="pitch.length === 0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="">房屋类型</option>
                                <option>{{}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="">房屋类型</option>
                                <option>{{}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="">房屋类型</option>
                                <option>{{}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </label>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 " style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="请输入房屋地址" >
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" >搜索</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort" style="margin-left: 10px;margin-top: 15px">
                        <label>
                            <input type="checkbox">
                            快到期合同
                        </label>
                    </div>
                    <div class="pro-sort"  style="margin-left: 10px;margin-top: 15px">
                        <span>排序方式：</span>
                        <label>
                            <input type="radio" name="sort">默认排序
                        </label>
                        <label>
                            <input type="radio" name="sort">最新发布
                        </label>
                    </div>
                    <div class="pull-right pro-sort">
                        <a @click="addContract" class="btn btn-success"><i
                                class="fa fa-plus-square"></i>&nbsp;新增合同
                        </a>
                    </div>
                </div>
                <!--选中-->
                <div class="panel-body" v-if="pitch.length>0" style="padding: 0;">
                    <ul>
                        <li>已选中&nbsp;{{pitch.length}}&nbsp;项</li>
                        <li>
                            <a href="">标记</a>
                        </li>
                        <li>
                            <a href="">删除</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--表格-->
        <div>
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">
                            <!--<input type="checkbox">-->
                        </th>
                        <th class="text-center">合同编号</th>
                        <th class="text-center">上传时间</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">业主姓名</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">手机号码</th>
                        <th class="text-center">合同到期时间</th>
                        <th class="text-center">资料补齐时间</th>
                        <th class="text-center">过期情况</th>
                        <th class="text-center">回访情况</th>
                        <th class="text-center">资料状态</th>
                        <th class="text-center">更多</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td><input type="checkbox" @change="rules(1 , $event)"></td>
                        <td>LJS081740</td>
                        <td>2017-05-18<br>10:22:48</td>
                        <td>李彬彬</td>
                        <td>戴辉</td>
                        <td>金马郦城4-328</td>
                        <td>18865652235</td>
                        <td>2018-06-05</td>
                        <td>2017-06-05</td>
                        <td>充公</td>
                        <td>未回访</td>
                        <td>
                            <span :class="contractStatus">待审核</span>
                        </td>
                        <td>
                            <router-link to="/rentingDetail">更多</router-link>
                        </td>
                        <td class="icon">
                            <i class="fa fa-lock" v-if="isLock"></i>
                            <i class="fa fa-unlock" v-else="isLock"></i>
                            <i class="fa fa-thumb-tack"></i>
                        </td>

                    </tr>
                    <tr class="text-center">
                        <td><input type="checkbox" @change="rules(2 , $event)"></td>
                        <td>LJS081740</td>
                        <td>2017-05-18<br>10:22:48</td>
                        <td>李彬彬</td>
                        <td>戴辉</td>
                        <td>金马郦城4-328</td>
                        <td>18865652235</td>
                        <td>2018-06-05</td>
                        <td>2017-06-05</td>
                        <td>充公</td>
                        <td>未回访</td>
                        <td>
                            <span :class="contractStatus">待审核</span>
                        </td>
                        <td>
                            <a href="">更多</a>
                        </td>
                        <td class="icon">
                            <i class="fa fa-lock" v-if="isLock"></i>
                            <i class="fa fa-unlock" v-else="isLock"></i>
                            <i class="fa fa-thumb-tack"></i>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </section>
        </div>
        <!--//组件-->
        <contractAdd></contractAdd>
    </div>
</template>
<script>
    import contractAdd from  './contractAdd.vue'
    import DatePicker from '../common/datePicker.vue'
    export default{
        components: { contractAdd , DatePicker},
        data(){
            return {
                pitch : [],      // 选中id
                contractStatus : {
                    'cStatus' : true ,
                    'yellow' : false,
                    'gray' : true,
                    'green' : false
                },           // 合同状态样式
                isLock : true,      // 是否锁定
                start_time:"",
                end_time:'',
                dateConfigure : [{
                    range : true, // 是否选择范围
                    needHour : false // 是否需要选择小时
                }],
            }
        },
        updated (){
////            时间选择
//            this.remindData();
        },
        mounted(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;
                    console.log(this.dictionary)
                });
            },
            search(){

            },
            getDate(val){
                console.log(val)
            },
//            remindData (){
//                $('.form_datetime').datetimepicker({
//                    minView: "month",   //选择日期后，不会再跳转去选择时分秒
//                    language: 'zh-CN',
//                    format: 'yyyy-mm-dd',
//                    todayBtn: 1,
//                    autoclose: 1,
//                }).on('changeDate', ev => {
//                    if (ev.target.placeholder === '开始时间'){
//                        this.start_time = ev.target.value;
//                    } else {
//                        this.end_time = ev.target.value;
//                    }
//                });
//            },
            rules(id , ev){   //多选框选中
                if (ev.target.checked){
                    this.pitch.push(id);
                }else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
            addContract(){  //新增合同订单
                $('.rem_div').remove();
                $('#contractAdd').modal({backdrop: 'static',});
                $('#contractAdd').modal('show')
            },
        }
    }
</script>

<style scoped>
    .panel-body{
        padding: 8px;
        padding-bottom: 0;
    }

    input[type=checkbox],input[type=radio]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
    }
    input[type=radio]{
        margin-left: 5px;
    }
    .pro-sort{
        margin-top: 10px;
    }
    .panel-body ul{
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
    }
    .panel-body ul li{
        float: left;
    }
    .panel-body ul li+li:before{
        content: '|';
        margin: 0 10px;
    }
    div.pull-right{
        margin-top: 5px;
    }
    .icon i{
        font-size: 16px;
        cursor: pointer;
    }
    .icon i:nth-of-type(1){
        color: #ccc;
    }
    .icon i+i{
        margin-left: 8px;
    }
    .cStatus{
        display: inline-block;
        width: 60px;
        padding: 8px 0;
        color: white;
        border-radius: 5px;
    }
    .yellow{
        background-color: #F9E175;
    }
    .gray{
        background-color: #CCCCCC;
    }
    .green{
        background-color: #83E96D;
    }
    .form-group {
        margin-bottom: 11px !important;
    }
</style>