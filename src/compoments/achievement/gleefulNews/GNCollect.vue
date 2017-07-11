<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>喜报录入</li>
            <li class="active">收房</li>
        </ol>

        <div class="panel col-lg-12 clearFix">
            <div v-show="operId==0">

                <form class="form-inline clearFix" role="form">
                    <!--<Cascade @change="getCascadeData"></Cascade>-->
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
                        <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" v-model="params.search"  @keydown.enter.prevent="search">
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
                        <a>{{statusName}}</a>
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
                        <th class="text-center">收房开单人</th>
                        <th class="text-center">所属部门</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">门牌号</th>
                        <th class="text-center">房型</th>
                        <th class="text-center">收房价格</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">应付款项</th>
                        <th class="text-center">实付款项</th>
                        <th class="text-center">剩余款项</th>
                        <th class="text-center">补齐时间</th>
                        <th class="text-center">空置期天数</th>
                        <th class="text-center">房屋来源</th>
                        <!--<th class="text-center">收实际业绩</th>
                        <th class="text-center">收溢出业绩</th>-->
                        <th class="text-center">喜报状态</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                        <tr class="text-center" :key="item.id" v-for="(item,index) in cont.myData">
                            <td>
                                <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id,index,item.status)">
                            </td>
                            <td>{{item.create_time}}</td>
                            <td>{{item.real_name}}</td>
                            <td>{{dict.department_id[item.department_id]}}</td>
                            <!--<td>{{item.address}}</td>-->
                            <td>{{item.villa_id}}</td>
                            <td>{{item.villa_id}}</td>
                            <td>{{item.villa_id}}</td>
                            <!--<td>{{item.building}}-{{item.room}}</td>-->
                            <!--<td>{{item.house_type.rooms}}室{{item.house_type.halls}}厅{{item.house_type.toilets}}卫</td>-->
                            <!--<td>{{item.price}}</td>-->
                            <td class="dropdown">
                                <!--<a tabindex="0" class="btn btn-sm btn-primary" role="button" data-toggle="popover" data-trigger="focus" title="每年价格" data-content="aaa<br/>bbb">价格</a>-->
                                <button class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{item.price[0]}}</button>
                                <ul class="dropdown-menu dropdown-menu-center">
                                    <li v-for="price in item.price">{{price}}</li>
                                </ul>
                            </td>
                            <td>{{item.years}}</td>
                            <td>{{dict.pay_type[item.pay_type]}}</td>
                            <td>{{item.price_should}}</td>
                            <td>{{item.price_paid}}</td>
                            <td>{{item.price_remain}}</td>
                            <td>{{item.complete_date}}</td>
                            <td>{{item.vac_sum_days}}</td>
                            <td>{{dict.is_medi[item.is_medi]}}</td>
                            <!--<td>{{item.is_medi==1?"是":"否"}}</td>-->
                            <!--<td>{{item.realAchieve}}</td>
                            <td>{{item.moreAchieve}}</td>-->
                            <td class="dropdown">
                                <!--<button class="btn btn-primary btn-sm" @click="changeStatus(item.status,item.id)">{{dict.status[item.status]}}</button>-->
                                <button type="button" :class="{'btn':true,'dropdown-toggle':true,'yellow':item.status===1,'orange':item.status===2,'green':item.status===3,'gray':item.status===4}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{dict.status[item.status]}}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-right" v-show="item.status!=4">
                                    <li v-show="item.status==1" @click="verify(item.id)" data-toggle="modal" data-target="#confirm">通过一审</li>
                                    <li v-show="item.status==2" @click="reverify(item.id)" data-toggle="modal" data-target="#confirm">二审通过</li>
                                    <li v-show="item.status==2" @click="revert(item.id)" data-toggle="modal" data-target="#confirm">撤销审核</li>
                                    <li v-show="item.status==3" @click="verify(item.id)" data-toggle="modal" data-target="#confirm">返回一审</li>
                                    <li @click="cancel(item.id)" data-toggle="modal" data-target="#confirm">退单</li>
                                </ul>
                            </td>
                        </tr>
                    <tr class="text-center" v-show="cont.myData.length===0">
                        <td colspan="17">暂无数据...</td>
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
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @clcik="clear()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="form">
                            <!--<div class="form-group">
                                <label class="col-sm-3 control-label">发喜报日期:</label>
                                <div class="col-sm-8">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="发喜报日期" v-model="formData.create_time" class="form-control form_datetime">
                                </div>
                            </div>-->
                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">所属部门:</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" class="form-control" readonly v-model="formData.department_id.name" @click="seleDepartment">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">收房开单人:</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" class="form-control" readonly v-model="formData.staff_id.name" @click="seleStaff">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">房屋地址:</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" class="form-control" readonly>
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>

                            <!--<div class="form-group clearFix">
                                <label for="villageName" class="col-sm-3 control-label">房屋地址:</label>
                                <div class="col-sm-8 input-group">
                                    <input title="请点击选择" type="text" class="form-control" id="villageName" v-model="formData.village.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>-->
                            <!--<div class="form-group">
                                <label for="villageAddress" class="col-sm-3 control-label">地址:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="villageAddress" readonly v-model="formData.villageAddress">
                                </div>
                            </div>-->

                            <!--<div class="form-group clearFix">
                                <label class="col-sm-3 control-label">栋:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.building">
                                </div>
                            </div>-->

                            <!--<div class="form-group clearFix">
                                <label class="col-sm-3 control-label">室:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.room">
                                </div>
                            </div>-->


                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">空置期:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.vac_sum_days">
                                </div>
                            </div>
                            <!--<div class="form-group clearFix">
                                <label class="col-sm-3 control-label">房型:</label>
                                <div class="col-sm-8">
                                    <div class="col-sm-4">
                                        <div class="dropdown">
                                            <select name="" class="form-control" v-model="formData.house_type.rooms">
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
                                            <select name="" class="form-control" v-model="formData.house_type.halls">
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
                                            <select name="" class="form-control" v-model="formData.house_type.toilets">
                                                <option value="1">1卫</option>
                                                <option value="2">2卫</option>
                                                <option value="3">3卫</option>
                                                <option value="4">4卫</option>
                                                <option value="5">5卫</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>-->

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">年限:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.years">
                                </div>
                            </div>
                            <FlexBox :flexData="flexData" @sendData="getFlexData"></FlexBox>


                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">付款方式:</label>
                                <div class="col-sm-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.pay_type">
                                            <option value="1">季付</option>
                                            <option value="2">年付</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
<!--
                            <div class="form-group">
                                <label class="col-sm-3 control-label">应付款项:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.price_should">
                                </div>
                            </div>-->

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">实付款项:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.price_paid">
                                </div>
                            </div>
<!--
                            <div class="form-group">
                                <label class="col-sm-3 control-label">剩余款项:</label>
                                <div class="col-sm-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.price_remain">
                                </div>
                            </div>-->

                            <!--<div class="form-group clearFix">
                                <label class="col-sm-3 control-label">房屋来源:</label>
                                <div class="col-sm-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.is_medi">
                                            <option value="1">是</option>
                                            <option value="2">否</option>
                                        </select>
                                    </div>
                                </div>
                            </div>-->

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">补齐时间:</label>
                                <div class="col-sm-8">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间" class="form-control modal_form_datetime" v-model="formData.complete_date">
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">特殊款:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.special_sum">
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">组长备注:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.group_leader_remark">
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">财务备注:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="formData.finance_remark">
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="modal-footer">
                        <div v-if="add">
                            <button type="button" class="btn btn-primary" @click="addGNCollect">完成</button>
                        </div>
                        <div v-else="add">
                            <button type="button" class="btn btn-primary" @click="modifyGNCollect">修改</button>

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
        <!--<ChooseAddress @getChildData="getAddress"></ChooseAddress>-->

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--确认信息-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>


        <!--<Select :configure="configure" @Staff="receive"></Select>-->
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Delete from '../../common/delete.vue'
    import Status from '../../common/status.vue';
    import FlexBox from '../../common/flexBox.vue'
//    import ChooseAddress from '../../common/chooseAddress.vue'
    import Confirm from '../../common/confirm.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'

    //    import Select from '../../common/organization/selectStaff.vue'

    export default{
        components: {Page,Delete,Status,FlexBox,Confirm,STAFF},
        data(){
            return {
                operId : 0,
                statusName : '',
                statusId : '',

                paging: '',                 //总页数
                page : 1,                  // 当前页数

                confirmMsg : {
                    id : '',
                    msg : '',
                    status : ''         // 1:通过审核，2:撤销审核，3:退单
                },
                title : '新增收房喜报',         // 新增/修改
                formData : {
//                    create_time : '',
                    department_id : {
                        id : '',
                        name : ''
                    },
                    staff_id : {
                        id : '',
                        name : ''
                    },
                    /*village : {
                        villageName : ''       // 小区名称
                    },*/
//                    building : '',
//                    room : '',
                    vac_sum_days : '',   // 空置期
                    /*house_type : {
                        rooms : 1,
                        halls : 1,
                        toilets : 1
                    },*/
                    years : '',         // 年限
                    price : [],
                    pay_type : 1,        // 付款方式
//                    price_should : '',        // 应付款项
                    price_paid : '',            // 实付款项
//                    price_remain : '',     // 剩余款项
                    complete_date : '',    // 补齐时间
//                    is_medi : 1,       // 是否中介（房屋来源）
                    special_sum : '',   // 特殊款
                    group_leader_remark : '',   // 组长备注
                    finance_remark : ''         // 财务备注
                },
                add : true,          // 是否新增
                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },
                dict : {},          // 字典

                params : {
                    department_id : [],
                    staff_id : [],
                    from : '',
                    to : '',
                    search : ''
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
                flexData : {
                    name : '收房价格',
                    maxLength : 10
                },
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
                configure:[],
                selectConfigure : ''
//                idArray:{departmentId:[],staffId:[]},
            }
        },
        created (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
                    (res) => {
                        this.dict = res.data;
//                        console.log(this.dict);
//                        alert(1);
                        this.gnCollectList();

                    }
                );

        },
        updated (){
            this.remindData();
//            时间选择
        },

        methods : {
            changeIndex(ev,id,index,statusId){
//                console.log("一开始"+this.operId);
//                alert(id);
                if (ev.currentTarget.checked){
                    this.operId = id;
                    this.cont.nowIndex = index;
//                    console.log()
                    this.statusName = this.dict.status[statusId];
//                    console.log(this.statusName);
                    this.statusId = statusId;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            gnCollectList (){
                this.$http.get('glee/collect').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res.data);
//                    alert(2);
                    this.cont.myData = res.data.data.data;
                    this.paging = res.data.data.page;
//                    console.log(this.paging)
                })
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    pickerPosition: "bottom-left"
                    endDate : new Date(),
//                    todayHighlight : true
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
                    clearBtn: true,                     //清除按钮
                    pickerPosition: "top-left"
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
                        this.formData.complete_date = ev.target.value;
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
                /*let res = {
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
                that.news.isAgency = res.isAgency;*/


            },
            addGNCollect (){
                /*this.$http.post('glee/collect',{
                    params : this.formData
                }).then(
//                    (res)=>
                )*/
                console.log(this.formData);
                this.$http.post('glee/collect',this.formData)
                    .then(
                        (res) => {
                            console.log(res);
                            if (res.data.code !=18200){
                                this.info.state_error = true;
                                this.info.error = res.data.msg;
                                return;
                            } else {
                                $('#myModal').modal('hide');
                                this.info.success = res.data.msg;
                                //关闭失败弹窗 ***
                                this.info.state_error = false;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            }
//                            this.clear();
                            this.gnCollectList();

                        }
                    )
            },
            clear(){    // 清空input
                /*$('#myModal').find('input').val('');
                $('#myModal').find('select').val('');
*/
                this.formData.create_time = '';
                this.formData.department_id = '';
                this.formData.staff_id = '';
                this.formData.village = {
                    villageName : ''
                };
                this.formData.building = '';
                this.formData.room = '';
                this.formData.vac_sum_days = '';
                this.formData.house_type = {
                    rooms : 1,
                    halls : 1,
                    toilets : 1
                };
                this.formData.years = '';
                this.formData.price = [];
                this.formData.pay_type = 1;
                this.formData.is_medi = 1;
                $('#myModal').modal('hide');
            },
            search(){
                console.log(this.params);
                this.$http.get('glee/collect?page='+this.page,{
                    params : this.params
                })
                    .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                        console.log(res)
                        if (res.data.code==18204){
                            this.cont.myData = [];
                            return;
                        }else {
                            if (res.data.data.page !==this.paging){
                                this.paging = res.data.data.page;
                                this.page = 1;
                            }
                            console.log(res.data);
                            this.cont.myData = res.data.data.data;
                            this.paging = res.data.data.page;
                        }
                    });
            },
            dele(){
                // 删除
//                alert(this.operId);
                this.$http.get('glee/collect/delete/'+this.operId)
                    .then(
                        (res) => {
                            /*if (res.data.data.page !==this.paging){
                                this.paging = res.data.data.page;
                                this.page = 1;
                            }*/
                            this.search();
                            this.operId = 0;
//                            console.log(res.data)
                        }
                    )
            },
            getData(data){
                // 页数
//                console.log(data);
                this.page = data;
                this.search();
            },
            getCascadeData(data){
//                console.log(data);
                for(let attr in data){
                    this.params[attr]=data[attr];
                }
            },
            /*getAddress(data){
                console.log(data);
                this.formData.village = data;
//                console.log(this.formData.village);
//                this.formData.villageAddress = data.district+data.address;
            },*/
            oper(){
                console.log(this.operId);
                this.title = '编辑收房喜报';
                this.add = false;

//                alert(this.statusId);
                if (this.statusId!==1){
                    //                请求成功打开模态框

//                失败弹出错误信息
//                失败弹出错误信息
                    this.info.state_error = true;
                    this.info.error = '该条数据不可编辑';
                    return;
                }


                /*let res = {
                    region : 0,             // 收房片区
                    people : '阿加',          // 收房签约人
                    address : '啊时间卡',       // 房屋地址
                    vacancyTime : 20,       // 空置期
                    type : 1,               // 房屋类型
                    years : 30,             // 年限
                    price : 3500,           // 收房价格
                    payWay : 1,             // 付款方式
                    isAgency : 1            // 是否中介
                };*/

                /*// 获取信息后修改
                that.formData.region = res.region;
                that.formData.people = res.people;
                that.formData.address = res.address;
                that.formData.vacancyTime = res.vacancyTime;
                that.formData.type = res.type;
                that.formData.years = res.years;
                that.formData.price = res.price;
                that.formData.payWay = res.payWay;
                that.formData.isAgency = res.isAgency;*/
                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                this.info.error = '您没有编辑权限';*/

            },
            changeStatus(ev){
//                alert(this.operId);
//                console.log(ev.target.innerText);
                let url = '';
                if (ev.target.innerText === '审核通过'){
//                    url = 'glee/collect/verify/';
                    verify(this.operId);
                } else {
//                    url = 'glee/collect/revert/';
                    revert(this.operId);
                }
                /*this.$http.get(url+this.operId)
                    .then(
//                        (res) => alert(res)
                    )*/
            },
            verify(id){
                // 审核通过
//                alert(id);
//                let that = this;
                this.confirmMsg.id = id;
                this.confirmMsg.msg = '确定通过一审吗？';
                this.confirmMsg.status = '1-2';

            },
            reverify(id){
                this.confirmMsg.id = id;
                this.confirmMsg.msg = '确定通过二审吗？';
                this.confirmMsg.status = '2-3';
            },
            revert(id){
//                驳回
                this.confirmMsg.id = id;
                this.confirmMsg.msg = '确定撤销审核吗？';
                this.confirmMsg.status = '3-1';

            },
            cancel(id){
                // 退单
                this.confirmMsg.id = id;
                this.confirmMsg.msg = '确定退单吗？';
                this.confirmMsg.status = '4';

            },
            modifyGNCollect(){
                // 修改收房喜报
            },
            getFlexData(data){
                console.log(data);
                this.formData.price = data;
            },
            getConfirm(){
                let url = '';
                if (this.confirmMsg.status === '1-2'){
                    // 通过一审
                    url = 'glee/collect/verify/';

                } else if(this.confirmMsg.status === '2-3'){
                   // 通过二审
                    url = 'glee/collect/reverify/';

                } else if (this.confirmMsg.status === '3-1') {
                    // 撤销审核
                    url = 'glee/collect/revert/';

                } else {
                    // 退单
                    url = 'glee/collect/cancel/';
                }
                this.$http.get(url+this.confirmMsg.id)
                    .then(
                        (res) => {
                            /*this.cont.myData = res.data.data;
                             this.paging = res.data.page;*/
                            console.log(res.data.code);
                            if (res.data.code==18200){
                                // 成功
                                console.log(res.data);
//                                that.gnCollectList();
                                /*this.cont.myData = res.data.data.data;
                                 this.paging = res.data.data.page;*/
                                this.search();
                            }
                        }
                    )
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
                console.log(this.configure);
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
    #myModal{
        z-index: 1042;
    }
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
        /*padding-bottom: 1px;*/
    }
    .choosed ul li{
        float: left;
    }
    /*.choosed ul li span{
        display: inline-block;
        vertical-align: middle;
        !*font-size: 16px;*!
        color: green;
        font-weight: bold;
    }*/
    ul.dropdown-menu{
        text-align: center;
        font-size: 16px;
    }
    ul.dropdown-menu li{
        padding: 6px 0;
    }
    ul.dropdown-menu li:hover{
        cursor: pointer;
        background-color: #f2f2f2;
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
    td button{
        /*display: inline-block;*/
        /*padding: 8px 12px;*/
        /*color: white;*/
        border-radius: 30px;
        user-select: none;
        /*position: relative;*/
    }
    .table-responsive{
        overflow: inherit;
    }

    .yellow{
        background-color: #F9E175;
    }
    .orange{
        background-color: #FCB322;
    }

    .green{
        background-color: #83E96D;
    }
    .gray{
        background-color: #CCCCCC;
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