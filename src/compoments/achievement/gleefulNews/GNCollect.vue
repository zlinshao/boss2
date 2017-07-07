<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>喜报录入</li>
            <li class="active">收房</li>
        </ol>

        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" v-show="operId==0" role="form">

                <!--<Cascade @change="getCascadeData"></Cascade>-->

                <div class="form-group datetime">
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                    </label>
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                    </label>
                </div>
                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" v-model="params.
searchInfo"  @keydown.enter.prevent="search">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                </div>
                <div class="form-group pull-right">
                    <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addGleefulNews">
                        <i class="fa fa-plus-square"></i>&nbsp;新增收房喜报
                    </a>
                </div>
            </form>
            <div class="choosed" v-show="operId!=0">
                <ul class="clearFix">
                    <li><a>已选中&nbsp;1&nbsp;项</a></li>
                    <li>
                        <a @click="oper">编辑</a>
                    </li>
                </ul>
            </div>
        </div>


        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">喜报日期</th>
                        <th class="text-center">所属部门</th>
                        <th class="text-center">收房签约人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">门牌号</th>
                        <th class="text-center">房屋类型</th>
                        <th class="text-center">收房价格</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">空置期</th>
                        <th class="text-center">是否中介</th>
                        <!--<th class="text-center">收实际业绩</th>
                        <th class="text-center">收溢出业绩</th>-->
                        <th class="text-center">喜报状态</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                        <tr class="text-center" :key="item.id" v-for="item in cont.myData">
                            <td>
                                <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id)">
                            </td>
                            <td>{{item.create_time}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.room_quant}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.years}}</td>
                            <td>{{item.pay_type}}</td>
                            <td>{{item.vac_sum_days}}</td>
                            <td>{{item.is_medi==1?"是":"否"}}</td>
                            <!--<td>{{item.realAchieve}}</td>
                            <td>{{item.moreAchieve}}</td>-->
                            <td>
                                <button class="btn btn-primary btn-sm">{{item.status}}</button>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </section>
        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="form">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">收房片区:</label>
                                <div class="col-sm-8">
                                    <div class="dropdown">
                                        <select name="type" class="form-control" v-model="formData.region">
                                            <option value="1">马群</option>
                                            <option value="2">迈皋桥</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">收房签约人:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.people">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="villageName" class="col-sm-3 control-label">小区名称:</label>
                                <div class="col-sm-8 input-group">
                                    <input title="请点击选择" type="text" class="form-control" id="villageName" v-model="formData.village.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>
                            <!--<div class="form-group">
                                <label for="villageAddress" class="col-sm-3 control-label">地址:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="villageAddress" readonly v-model="formData.villageAddress">
                                </div>
                            </div>-->

                            <div class="form-group">
                                <label class="col-sm-3 control-label">栋:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.building">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">室:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.room">
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-sm-3 control-label">空置期:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.vacancyTime">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">房屋类型:</label>
                                <div class="col-sm-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.type">
                                            <option value="1">住宅</option>
                                            <option value="2">商用</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">年限:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.years">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">收房价格:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.price">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">付款方式:</label>
                                <div class="col-sm-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.payWay">
                                            <option value="1">季付</option>
                                            <option value="2">年付</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">是否中介:</label>
                                <div class="col-sm-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.isAgency">
                                            <option value="1">是</option>
                                            <option value="2">否</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <div v-if="add">
                            <button type="button" class="btn btn-primary" @click="addGNCollect">完成</button>
                        </div>
                        <div v-else="add">
                            <button type="button" class="btn btn-primary">修改</button>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete">删除</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <!--模态框 删除-->
        <Delete :msg="cont" @yes="dele"></Delete>

        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>


        <!--选择小区控件-->
        <ChooseAddress @getChildData="getAddress"></ChooseAddress>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>

    .form-group{
        padding-top: 5px;
    }
    div.input-group{
        padding: 0 15px;
    }
    label{
        line-height: 34px;
    }
    .choosed{
        /*padding-bottom: 10px;*/
    }
    .choosed ul li{
        float: left;
    }
    .choosed ul li+li:before{
        content: '|';
        display: inline-block;
        margin: 0 10px;
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    /*.panel span{
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-left: 5px;
        background-color: #00a6b2;
        border-radius: 50%;
        border: 1px solid #ddd;
    }*/
</style>
<script>
    import Page from '../../common/page.vue'
    import Delete from '../../common/delete.vue'
    import Cascade from '../../common/cascade.vue'
    import Status from '../../common/status.vue';

    import ChooseAddress from '../../common/chooseAddress.vue'


    export default{
        data(){
            return {
                operId : 0,

                paging: '',                 //总页数
                page : 1,                  // 当前页数

                title : '新增收房喜报',         // 新增/修改
                formData : {
                    region : 1,        // 收房片区
                    people : '',        // 收房签约人
//                    villageAddress : '',    //  小区地址
                    building : '',      // 栋
                    room : '',          // 室
                    village : {
                        villageName : ''       // 小区名称
                    },
                    vacancyTime : '',   // 空置期
                    type : 1,          // 房屋类型
                    years : '',         // 年限
                    price : '',         // 收房价格
                    payWay : 1,        // 付款方式
                    isAgency : 1       // 是否中介
                },
                add : true,          // 是否新增
                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },

                params : {
                    city: '',
                    group: "",
                    people: "",
                    region: "",
                    startDataTime : '',
                    finishDataTime : '',
                    searchInfo : ''

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
                }
            }
        },
        created (){
            this.gnCollectList();
        },
        updated (){
            this.remindData();
//            时间选择
        },
        components: {Page,Delete,Cascade,ChooseAddress,Status},
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
            gnCollectList (){
                this.$http.get('glee/collect').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    console.log(res.data);
                    this.cont.myData = res.data;
//                    this.paging = res.data.data.pages;
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
            addGleefulNews(){   // 新增收房喜报
                this.title = '新增收房喜报';
                this.add = true;
            },
            operGleefulNews(id,index){    // 对喜报进行操作
                this.title = '编辑收房喜报';
                this.add = false;
                let that = this;
                this.cont.nowIndex=index;
                let res = {
                    region : 0,             // 收房片区
                    people : '阿加',          // 收房签约人
                    address : '啊时间卡',       // 房屋地址
                    vacancyTime : 20,       // 空置期
                    type : 1,               // 房屋类型
                    years : 30,             // 年限
                    price : 3500,           // 收房价格
                    payWay : 1,             // 付款方式
                    isAgency : 1            // 是否中介
                };

                // 获取信息后修改
                that.news.region = res.region;
                that.news.people = res.people;
                that.news.address = res.address;
                that.news.vacancyTime = res.vacancyTime;
                that.news.type = res.type;
                that.news.years = res.years;
                that.news.price = res.price;
                that.news.payWay = res.payWay;
                that.news.isAgency = res.isAgency;


            },
            addGNCollect (){

            },
            clear(){    // 清空input
                $('#myModal').find('input').val('');
                $('#myModal').find('select').val('');

                $('#myModal').modal('hide');
            },
            search(){
                console.log(this.params);
                this.$http.get('dict/subdpmt',{
                    params : this.params
                })
                    .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                        console.log(res.data);
                        this.regions = res.data;
                    });
            },
            dele(){
                alert(1);
            },
            getData(data){
                // 页数
                console.log(data);
                this.page = data;
            },
            getCascadeData(data){
//                console.log(data);
                for(let attr in data){
                    this.params[attr]=data[attr];
                }
            },
            clearForm(){
                $('#myModal').find('input').val('');
                $('#myModal').find('select').val('');

                $('#myModal').modal('hide');
            },
            getAddress(data){
                console.log(data);
                this.formData.village = data;
//                console.log(this.formData.village);
//                this.formData.villageAddress = data.district+data.address;
            },
            oper(){
                console.log(this.operId);

                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                this.info.error = '您没有编辑权限';*/

            }

        }
    }
</script>