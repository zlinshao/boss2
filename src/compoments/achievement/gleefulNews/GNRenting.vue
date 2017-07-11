<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>喜报录入</li>
            <li class="active">租房</li>
        </ol>

        <div class="panel col-lg-12">
            <div v-show="operId==0">
                <form class="form-inline clearFix" role="form">
                    <div class="input-group bootstrap-timepicker">
                        <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                    </div>
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
                        <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" @keydown.enter.prevent="search">
                        <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                    </div>
                    <div class="form-group pull-right">
                        <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addGleefulNews">
                            <i class="fa fa-plus-square"></i>&nbsp;新增租房喜报
                        </a>
                    </div>
                </form>
                <div class="tagsinput " v-show="filtrate.departmentList.length!=0">
                    <h4>部门</h4>
                    <span class="tag" v-for="item in filtrate.departmentList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteDepartment(item)"></a>
                    </span>
                </div>
                <div class="tagsinput " v-show="filtrate.staffList.length!=0">
                    <h4>员工</h4>
                    <span class="tag" v-for="item in filtrate.staffList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteStaff(item)"></a>
                    </span>
                </div>
            </div>

            <div class="choosed" v-show="operId!=0">
                <ul class="clearFix">
                    <li><a>已选中&nbsp;1&nbsp;项</a></li>
                    <li>
                        <a @click="oper">编辑</a>
                    </li>
                    <li>
                        <a data-toggle="modal" data-target="#delete">删除</a>
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
                        <th class="text-center">租房类型</th>
                        <th class="text-center">租房片区</th>
                        <th class="text-center">租房签约人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">门牌号</th>
                        <th class="text-center">房型</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">租房价格</th>
                        <th class="text-center">应收款项</th>
                        <th class="text-center">已收科目</th>
                        <th class="text-center">已收款项</th>
                        <th class="text-center">剩余款项</th>
                        <th class="text-center">补齐时间</th>
                        <th class="text-center">租客来源</th>
                        <th class="text-center">特殊款</th>
                        <th class="text-center">组长备注</th>
                        <th class="text-center">财务备注</th>
                        <th class="text-center">喜报状态</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr v-show="cont.myData.length!==0" class="text-center" :key="item.id" v-for="(item,index) in cont.myData">
                        <td>
                            <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id)">
                        </td>
                        <td>{{item.date}}</td>
                        <td>{{item.situation.name}}</td>
                        <td>{{item.region.name}}</td>
                        <td>{{item.people}}</td>
                        <td>
                            {{item.address}}
                        </td>
                        <td>{{item.type.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.alreadyType.name}}</td>
                        <td>{{item.alreadyMoney}}</td>
                        <td>
                            <button class="btn btn-primary btn-sm">{{item.status.name}}</button>
                            <!--<span :class="{'yellow':item.status===1,'green':item.status===2,'gray':item.status===3,}">{{dict.status[item.status]}}</span>-->

                        </td>
                    </tr>
                    <tr class="text-center" v-show="cont.myData.length===0">
                        <td colspan="20">暂无数据...</td>
                    </tr>

                    </tbody>
                </table>
            </section>

        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right bs-example-modal-lg" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="renting col-lg-6 clearFix">

                            <div class="form-group clearFix">
                                <label for="villageName" class="col-sm-3 control-label">小区名称:</label>
                                <div class="col-lg-8 input-group">
                                    <input title="请点击选择" type="text" class="form-control" id="villageName" v-model="formData.village.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">栋:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control" v-model="formData.building" @blur="searchCollectInfo">
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">室:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control" v-model="formData.room" @blur="searchCollectInfo">
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">房型:</label>
                                <div class="col-sm-8">
                                    <div class="col-sm-4">
                                        <div class="dropdown">
                                            <select name="" class="form-control">
                                                <option value="1">1室</option>
                                                <option value="2">2室</option>
                                                <option value="3">3室</option>
                                                <option value="4">4室</option>
                                                <option value="5">5室</option>
                                                <option value="6">6室</option>
                                                <option value="7">7室</option>
                                                <option value="8">8室</option>
                                                <option value="9">9室</option>
                                                <option value="10">10室</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="dropdown">
                                            <select name="" class="form-control">
                                                <option value="1">1厅</option>
                                                <option value="2">2厅</option>
                                                <option value="3">3厅</option>
                                                <option value="4">4厅</option>
                                                <option value="5">5厅</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="dropdown">
                                            <select name="" class="form-control">
                                                <option value="1">1卫</option>
                                                <option value="2">2卫</option>
                                                <option value="3">3卫</option>
                                                <option value="4">4卫</option>
                                                <option value="5">5卫</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">租房开单人:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control" v-model="formData.people">
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">租房价格:</label>
                                <div class="col-lg-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.price">
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">付款方式:</label>
                                <div class="col-lg-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.payWay">
                                            <option value="1">季付</option>
                                            <option value="2">月付</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">租房情况:</label>
                                <div class="col-lg-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.situation">
                                            <option value="1">转租</option>
                                            <option value="2">调租</option>
                                            <option value="3">续租</option>
                                            <option value="4">新租</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!--<div class="form-group clearFix">
                                <label class="col-lg-3 control-label">应收款项:</label>
                                <div class="col-lg-8">
                                    <input type="number" min="0" class="form-control">
                                </div>
                            </div>-->

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">已收科目:</label>
                                <div class="col-lg-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control">
                                            <option value="1">啊啊</option>
                                            <option value="2">查查</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">已收款项:</label>
                                <div class="col-lg-8">
                                    <input type="number" min="0" class="form-control">
                                </div>
                            </div>

                           <!-- <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">剩余款项:</label>
                                <div class="col-lg-8">
                                    <input type="number" min="0" class="form-control">
                                </div>
                            </div>-->


                            <div class="form-group">
                                <label class="col-sm-3 control-label">补齐时间:</label>
                                <div class="col-sm-8">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间" class="form-control modal_form_datetime">
                                </div>
                            </div>


                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">租客来源:</label>
                                <div class="col-lg-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.isAgency">
                                            <option value="1">是</option>
                                            <option value="2">否</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">特殊款:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">组长备注:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">财务备注:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                        </div>




                        <div class="collect col-lg-6 clearFix">
                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">房屋地址:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">房型:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">收房开单人:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">所属部门:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">收房价格:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">付款方式:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">年限:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">空置期:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                    <!--<input type="text" class="form-control" readonly>-->
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">应付款项:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">实付款项:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">剩余款项:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">补齐时间:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">收房价格:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">房屋来源:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">特殊款:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">组长备注:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">财务备注:</label>
                                <div class="col-lg-8">
                                    <span class="collectInfo">电视电话刷卡机的</span>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="modal-footer">
                        <div v-if="add">
                            <button type="button" class="btn btn-primary">完成</button>
                        </div>
                        <div v-else="add">
                            <button type="button" class="btn btn-primary">修改</button>
                            <!--<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete">删除</button>-->
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
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
<script>
    import Page from '../../common/page.vue'
    import Delete from '../../common/delete.vue'
    import ChooseAddress from '../../common/chooseAddress.vue'
    import Status from '../../common/status.vue';
    import STAFF from  '../../common/organization/selectStaff.vue'
    export default{
        components: {Page,Delete,ChooseAddress,Status,STAFF},
        data(){

            return {
                operId : 0,
//                rentingtList : [],
                paging : '',
                page : 1,
                dict : {},

                title : '',
                add : true,      // 是否新增
                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },
                formData : {
//                    villageAddress : '',
                    building : '',      // 栋
                    room : '',          // 室
                    people : '',
                    situation : 1,
                    region : 1,
                    payWay : 1,
                    price : '',
                    alreadyType : 1,
                    alreadyMoney : '',
                    isAgency : 1,

                    collectPeople : '',
                    type : '',
                    collectPrice : '',
                    village : {
                        villageName : ''       // 小区名称
                    }
                },

                params : {
                    department_id : [],
                    staff_id : [],
                    from : '',
                    to : '',
                    search : ''
                },
                filtrate : {
                    departmentList:[],
                    staffList:[]
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
                configure:[],
                selectConfigure : ''

            }
        },
        created (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
                    (res) => {
                        this.dict = res.data;
//                        console.log(this.dict);
//                        alert(1);
                        this.gnRentingList();

                    }
                );

        },
        updated (){
//            时间选择
            this.remindData();
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
            gnRentingList (){
                this.$http.get('json/GNRenting.json').then((res) => {
                    this.cont.myData = res.data.data.gleeFulRenting;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
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
                    endDate : new Date(),

                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder === '开始时间'){
                        this.params.from = ev.target.value;
                    } else if (ev.target.placeholder === '结束时间') {
                        this.params.to = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
                $('.modal_form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                    pickerPosition: "top-left"
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
//                    this.formData.complete_date = ev.target.value;
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            addGleefulNews(){
                this.title = '新增租房喜报';
                this.add = true;
            },
            operGleefulNews(id,index){
                this.title = '编辑租房喜报';
                this.add = false;
                this.cont.nowIndex = index;
            },
            search(){
                console.log(this.params);
            },
            dele(){
                alert(2);
            },
            getData(data){
                // 页数
                console.log(data);
            },
            getCascadeData(data){
                console.log(data);
                for(var attr in data){
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
            searchCollectInfo(){
                // 根据房屋地址获取收房信息
                var that = this;

                if (that.formData.village.villageName.length!=0 && that.formData.building.length!=0 && that.formData.room.length!=0){
                    let houseInfo =  that.formData.village.villageName+that.formData.building+this.formData.room;

                    // 回调
                    /*that.formData.collectPeople = res.people;
                    that.formData.type = res.type.name;
                    that.formData.collectPrice = res.price;*/
                }
            },
            oper(){
                console.log(this.operId);

                //                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/
            },
            select(){

                this.selectConfigure = 'all';
                $('#selectCustom').modal({backdrop: 'static',});
                this.configure={type:'all',class:'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            seleDepartment(){
                this.selectConfigure = 'department';
                this.configure={length : 1,class:'onlyOneDpm'};
                $('#selectCustom').modal('show');
            },
            seleStaff(){
                this.selectConfigure = 'staff';
                this.configure={length :1,class : 'amount'};
                $('#selectCustom').modal('show');
            },
            selectDateSend(val){
//                console.log(this.configure);
//                console.log(this.selectConfigure)
                console.log(val);
                if (this.selectConfigure=='all'){
                    // all
//                    alert('all');
                    this.receive(val);
                    this.filtrate.departmentList = val.department;
                    this.filtrate.staffList = val.staff;
                } else if (this.selectConfigure=='department'){
                    // 选择的是部门
//                    alert('部门');
                    this.formData.department_id = val.department[0];
//                    console.log(this.formData.department_id)
                } else {
                    // 选择员工
//                    alert('员工');
                    this.formData.staff_id = val.staff[0];
//                    console.log(this.formData.staff_id)
                }

            },
            receive(val){
                for(let j=0;j<val.department.length;j++){
                    if($.inArray(val.department[j].id,this.params.department_id)===-1){
                        this.filtrate.departmentList.push(val.department[j]);
                        this.params.department_id.push(val.department[j].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
                for(let i=0;i<val.staff.length;i++){
                    if($.inArray(val.staff[i].id,this.params.staff_id)===-1){
                        console.log()
                        this.filtrate.staffList.push(val.staff[i]);
                        this.params.staff_id.push(val.staff[i].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
            },
            deleteStaff(item){
                this.filtrate.staffList=this.filtrate.staffList.filter((x)=>x!==item);
                this.params.staff_id=this.params.staff_id.filter((x)=>x!=item.id)
            },
            deleteDepartment(item){
                this.filtrate.departmentList=this.filtrate.departmentList.filter((x)=>x!==item);
                this.params.department_id=this.params.staff_id.filter((x)=>x!=item.id)
            }
        }
    }
</script>
<style scoped>
    .tagsinput{
        border:none;
    }
    h4{
        display: inline-block;
        margin: 0;
    }
    .pull-right{
        padding-top: 5px;
    }
    label{
        line-height: 34px;
        /*vertical-align: middle;*/
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
    div.input-group{
        padding: 0 15px;
    }
    .collect,.renting{
        padding: 15px 0;
    }
    .collect{
        /*border-top: 1px dashed #ddd;*/
        /*padding-top: 20px;*/
        background-color: #F2F2F2;
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    td span{
        display: inline-block;
        padding: 8px 12px;
        color: white;
        border-radius: 30px;
        user-select: none;
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
    span.collectInfo{
        width: 100%;
        display: inline-block;
        border-bottom: 1px solid #ddd;
        line-height: 34px;
        padding-left: 12px;
        margin-bottom: 10px;
    }
    .modal .modal_form_datetime{
        margin-bottom: 32px;
    }
</style>