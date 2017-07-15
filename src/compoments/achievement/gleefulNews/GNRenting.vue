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
                    <li><span>已选中&nbsp;1&nbsp;项</span></li>
                    <li>
                        <span v-if="statusId!=0" :class="{'status' : true,'yellow':statusId===1,'orange':statusId===2,'green':statusId===3,'gray':statusId===4}">{{statusName}}</span>
                    </li>
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
                        <th class="text-center">租房开单人</th>
                        <th class="text-center">所属部门</th>
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
                    <tr v-show="cont.myData.length!==0" :class="{'lightYellow' : operId===item.id , 'text-center' : true}" :key="item.id" v-for="(item,index) in cont.myData">
                        <td>
                            <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id,index,item.status)">
                        </td>
                        <td>{{item.create_time}}</td>
                        <td>{{dict.rent_type[item.rent_type]}}</td>
                        <td>{{item.real_name}}</td>
                        <td>{{dict.department_id[item.department_id]}}</td>
                        <td>{{item.village_name}}</td>
                        <td>{{item.building}}-{{item.house_number}}</td>
                        <td>{{item.rooms.rooms}}室{{item.rooms.halls}}厅{{item.rooms.toilets}}卫</td>
                        <td>押{{item.bet}}付{{item.pay}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.price_sum}}</td>
                        <td>{{dict.subject[item.received_type]}}</td>
                        <td>{{item.price_received}}</td>
                        <td>{{item.price_remain}}</td>
                        <td>{{item.complete_date}}</td>
                        <td>{{dict.is_medi[item.is_medi]}}</td>
                        <td>{{item.special_price}}</td>
                        <td>{{item.remark_marshal}}</td>
                        <td>{{item.remark_accountant}}</td>
                        <td class="dropdown">
                            <button :class="{'btn':true,'dropdown-toggle':true,'yellow':item.status===1,'orange':item.status===2,'green':item.status===3,'gray':item.status===4}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{dict.status[item.status]}}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right" v-show="item.status!=4">
                                <li v-show="item.status==1" @click="verify(item.id)" data-toggle="modal" data-target="#confirm">通过一审</li>
                                <li v-show="item.status==2" @click="reverify(item.id)" data-toggle="modal" data-target="#confirm">通过二审</li>
                                <li v-show="item.status==2" @click="revert(item.id)" data-toggle="modal" data-target="#confirm">撤销审核</li>
                                <li v-show="item.status==3" @click="verify(item.id)" data-toggle="modal" data-target="#confirm">返回一审</li>
                                <li @click="cancel(item.id)" data-toggle="modal" data-target="#confirm">退单</li>
                            </ul>
                            <!--<span :class="{'yellow':item.status===1,'green':item.status===2,'gray':item.status===3,}">{{dict.status[item.status]}}</span>-->

                        </td>
                    </tr>
                    <tr class="text-center" v-show="isShow">
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
                        <button type="button" class="close" aria-label="Close" @click="clear"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="renting col-lg-6 clearFix">

                            <!--<div class="form-group clearFix">
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
                            </div>-->
                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">所属部门:</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" class="form-control" readonly @click="seleDepartment" v-model="formData.department_id.name">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">收房开单人:</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" class="form-control" readonly @click="seleStaff" v-model="formData.staff_id.name">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-sm-3 control-label">房屋地址:</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" class="form-control" readonly v-model="formData.villa_id.name" data-toggle="modal" data-target="#selectHouse">
                                    <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
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
                                    <label class="col-lg-1 control-label">押</label>
                                    <div class="col-lg-4">
                                        <input type="number" min="0" class="form-control" v-model="formData.bet">
                                    </div>
                                    <label class="col-lg-1 control-label">付</label>
                                    <div class="col-lg-5">
                                        <input type="number" min="0" class="form-control" v-model="formData.pay">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">租房类型:</label>
                                <div class="col-lg-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.rent_type">
                                            <option :value="value" v-for="(key,value) in dict.rent_type">{{key}}</option>
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
                                        <select name="" class="form-control" v-model="formData.received_type">
                                            <option :value="value" v-for="(key,value) in dict.subject">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">已收款项:</label>
                                <div class="col-lg-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.price_received">
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
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间" class="form-control modal_form_datetime" v-model="formData.complete_date">
                                </div>
                            </div>


                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">租客来源:</label>
                                <div class="col-lg-8">
                                    <div class="dropdown">
                                        <select name="" class="form-control" v-model="formData.is_medi">
                                            <option :value="value" v-for="(key,value) in dict.is_medi">{{key}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">特殊款:</label>
                                <div class="col-lg-8">
                                    <input type="number" min="0" class="form-control" v-model="formData.special_price">
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">组长备注:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control" v-model="formData.remark_marshal">
                                </div>
                            </div>
                            <div class="form-group clearFix">
                                <label class="col-lg-3 control-label">财务备注:</label>
                                <div class="col-lg-8">
                                    <input type="text" class="form-control" v-model="formData.remark_accountant">
                                </div>
                            </div>

                        </div>


                        <div class="collect col-lg-6 clearFix">
                            <div v-if="collectMsg.status===3">
                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">房屋地址:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.villa.amap_json.villageName}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">房型:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.villa.rooms.rooms}}室{{collectMsg.villa.rooms.hall}}厅{{collectMsg.villa.rooms.toilet}}卫</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">收房开单人:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{dict.staff_id[collectMsg.staff_id]}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">所属部门:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{dict.department_id[collectMsg.department_id]}}</span>
                                    </div>
                                </div>
                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">收房价格:</label>
                                    <div class="col-lg-8">
                                        <!--<span class="collectInfo">{{collectMsg.price}}</span>-->
                                        <span class="collectInfo">
                                            <span class="price" v-for="item in collectMsg.price">{{item}}</span>
                                        </span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">付款方式:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{dict.pay_type[collectMsg.pay_type]}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">年限:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.years}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">空置期:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.vac_sum_days}}</span>
                                        <!--<input type="text" class="form-control" readonly>-->
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">应付款项:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.price_should}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">实付款项:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.price_paid}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">剩余款项:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.price_remain}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">补齐时间:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.complete_date}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">房屋来源:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{dict.is_medi[collectMsg.is_medi]}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">特殊款:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.special_price}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">组长备注:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.remark_marshal==''?'无':collectMsg.remark_marshal}}</span>
                                    </div>
                                </div>

                                <div class="form-group clearFix">
                                    <label class="col-lg-3 control-label">财务备注:</label>
                                    <div class="col-lg-8">
                                        <span class="collectInfo">{{collectMsg.remark_accountant==''?'无':collectMsg.remark_accountant}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="msg" v-else="collectMsg.status===3">{{collectMsg.msg}}</div>


                        </div>

                    </div>

                    <div class="modal-footer">
                        <div v-if="add">
                            <button type="button" class="btn btn-primary" @click="addRent">完成</button>
                        </div>
                        <div v-else="add">
                            <button type="button" class="btn btn-primary" @click="modifyRent">修改</button>
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


        <SelectHouse @House="getHouse"></SelectHouse>
        <!--提示信息-->
        <Status :state='info'></Status>

        <!--确认信息-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

    </div>
</template>
<script>
    import Page from '../../common/page.vue'
    import Delete from '../../common/delete.vue'
    import Status from '../../common/status.vue';
    import STAFF from  '../../common/organization/selectStaff.vue'
    import Confirm from '../../common/confirm.vue'
    import SelectHouse from '../../common/selectHouse.vue'

    export default{
        components: {Page,Delete,Status,STAFF,Confirm,SelectHouse},
        data(){

            return {
                isShow : false,
                operId : 0,
//                rentingtList : [],
                paging : '',
                statusName : '',
                statusId : '',
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
                    /*building : '',      // 栋
                    room : '',          // 室*/
                    department_id : {
                        id : '',
                        name : ''
                    },
                    staff_id : {
                        id : '',
                        name : ''
                    },
                    villa_id : {
                        id : 1,
                        name : ''
                    },
                    price : '',
                    pay : '',
                    bet : '',
                    rent_type : 1,
                    received_type : 1,
                    price_received : '',
                    complete_date : '',    // 补齐时间
                    special_price: '',   // 特殊款
                    remark_marshal: '',   // 组长备注
                    remark_accountant: '',         // 财务备注
                    is_medi : 1
                },
                collectInfo : {

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
                selectConfigure : '',
                confirmMsg : {
                    id : '',
                    msg : '',
                    status : ''         // 1:通过审核，2:撤销审核，3:退单
                },
                collectMsg : {
                    status : 1,
                    msg : '请选择房屋',
                    // 房屋地址 villa_id
                    // 收房开单人 staff_id
                    // 所属部门 department_id
                    // 付款方式 pay_type
                    // 年限 years
                    // 空置期 vac_sum_days
                    // 应付款项 price_should
                    // 实付款项 price_paid
                    // 剩余款项 price_remain
                    // 补齐时间 complete_date
                    // 收房价格 price
                    // 房屋来源 is_medi
                    // 特殊款 special_price
                    // 组长备注 remark_marshal
                    // 财务备注 remark_accountant
                }
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
        watch : {
            'formData.villa_id.id':{
                handler(val){
//                    console.log(val)
                    this.searchCollectInfo(val);
                }
            }
        },
        methods : {
            changeIndex(ev,id,index,statusId){
//                console.log("一开始"+this.operId);
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
            gnRentingList (){
                this.$http.get('glee/rent').then((res) => {
//                    console.log(res);
                    if (res.data.code == 18110){
                        this.cont.myData = res.data.data.data;
                        this.paging = res.data.data.page;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.paging = '';
                    }

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
                    clearBtn: true,                     //清除按钮
                    pickerPosition: "top-left"
//                    todayHighlight : true
                }).on('changeDate', function (ev) {
                    this.formData.complete_date = ev.target.value;
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            addGleefulNews(){
                this.title = '新增租房喜报';
                this.add = true;
            },
            search(){
//                console.log(this.params);
                this.$http.get('glee/rent?page='+this.page,{
                    params : this.params
                })
                    .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                        console.log(res)
                        if (res.data.code!=18110){
                            this.cont.myData = [];
                            this.isShow = true;
                            this.paging = '';
                        }else {
                            this.isShow = false;
                            if (res.data.data.page !==this.paging){
                                this.paging = res.data.data.page;
                                this.page = 1;
                            }
//                            console.log(res.data);
                            this.cont.myData = res.data.data.data;
                            this.paging = res.data.data.page;
                        }
                    });
            },
            getData(data){
                // 页数
//                console.log(data);
                this.page = data;
            },
            searchCollectInfo(val){
                // 根据房屋地址获取收房信息
//                alert(val);
                let that = this;
                this.$http.get('glee/rent/search?villa_id='+val)
                    .then(
                        (res) => {
//                                console.log(res.data.code);
                            if (res.data.code == 18104){
                                // 未收先祖
                                that.collectMsg = {
                                    status : 2,
                                    msg : '未收先租'
                                }
                            } else {
                                // 成功
                                let val = res.data.data;
                                that.collectMsg = {
                                    status : 3,
                                };
                                for (let i in val){
                                    that.collectMsg[i] = val[i];
                                }
//                                console.log(that.collectMsg)
                            }
                        }
                    )
            },
            addRent(){
//                alert(1);
//                console.log(this.formData);
                this.$http.post('glee/rent',this.formData)
                    .then(
                        (res) => {
//                            console.log(res);
                            /*if (res.data.code !=18200){
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
                             }*/
                            this.clear();
                            this.gnRentingList();

                        }
                    )
            },
            modifyRent(){
                this.$http.put('glee/rent/'+this.operId,this.formData)
                    .then(
                        (res) => {
//                            console.log(res);
                            /*if (res.data.code !=18200){
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
                             }*/
                            this.clear();
                            this.search();
                            this.operId = 0;
                        }
                    )
            },
            oper(){
                this.title = '编辑租房喜报';
                this.add = false;
//                console.log(this.operId);
                if (this.statusId===3||this.statusId===4){
                    //                请求成功打开模态框

//                失败弹出错误信息
//                失败弹出错误信息
                    this.info.state_error = true;
                    this.info.error = '该条数据不可编辑';
                    return;
                }

                this.$http.get('glee/rent/' + this.operId)
                    .then(
                        (res) => {
                            let val = res.data.data;
//                            console.log(val);
                            this.formData.department_id = {
                                id: val.department_id,
                                name: this.dict.department_id[val.department_id]
                            };
                            this.formData.staff_id = {
                                id: val.staff_id,
                                name: this.dict.staff_id[val.staff_id]
                            };
                            this.formData.villa_id = {
                                id: val.villa_id,
                                name: val.villa.detailed_address
                            };
                            this.formData.price = val.price_sum;
//                            this.formData.pay_type =
                            this.formData.pay = val.pay;
                            this.formData.bet = val.bet;
                            this.formData.rent_type = val.rent_type;
                            this.formData.received_type = val.received_type;
                            this.formData.price_received = val.price_received;
                            this.formData.complete_date = val.complete_date;
                            this.formData.is_medi = val.is_medi;
                            this.formData.special_price = val.special_price;
                            this.formData.remark_marshal = val.remark_marshal;
                            this.formData.remark_accountant = val.remark_accountant;

                        }
                    );
                this.searchCollectInfo(this.formData.villa_id.villa_id);

                //                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/
            },
            clear(){
                this.formData.department_id = {
                    id: '',
                    name: ''
                };
                this.formData.staff_id = {
                    id: '',
                    name: ''
                };
                this.formData.villa_id = {
                    id: '',
                    name: ''
                };
                this.formData.price = '';
//                            this.formData.pay_type =
                this.formData.pay = '';
                this.formData.bet = '';
                this.formData.rent_type = 1;
                this.formData.received_type = 1;
                this.formData.price_received = '';
                this.formData.complete_date = '';
                this.formData.is_medi = 1;
                this.formData.special_price = '';
                this.formData.remark_marshal = '';
                this.formData.remark_accountant = '';
                $('#myModal').modal('hide');
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
//                console.log(val);
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
//                        this.filtrate.departmentList.push(val.department[j]);
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
//                        this.filtrate.staffList.push(val.staff[i]);
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
                this.params.department_id=this.params.department_id.filter((x)=>x!=item.id)
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
            dele(){
                // 删除
//                alert(this.operId);
                this.$http.get('glee/rent/delete/'+this.operId)
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
            getConfirm(){
                let url = '';
                if (this.confirmMsg.status === '1-2'){
                    // 通过一审
                    url = 'glee/rent/verify/';

                } else if(this.confirmMsg.status === '2-3'){
                    // 通过二审
                    url = 'glee/rent/reverify/';

                } else if (this.confirmMsg.status === '3-1') {
                    // 撤销审核
                    url = 'glee/rent/revert/';

                } else {
                    // 退单
                    url = 'glee/rent/cancel/';
                }
                this.$http.get(url+this.confirmMsg.id)
                    .then(
                        (res) => {
                            /*this.cont.myData = res.data.data;
                             this.paging = res.data.page;*/
//                            console.log(res.data.code);
                            if (res.data.code==18100){
                                // 成功
//                                console.log(res.data);
//                                that.gnCollectList();
                                /*this.cont.myData = res.data.data.data;
                                 this.paging = res.data.data.page;*/
                                this.search();
                            }
                        }
                    )
            },
            getHouse(data){
//                console.log(data);
                this.formData.villa_id = {
                    id : data.id,
                    name : data.address
                }
            },

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

    .table-responsive{
        /*overflow: inherit;*/
    }
    td button{
        user-select: none;
    }
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
    .status{
        padding: 3px 8px;
        border-radius: 5px;
    }
    .collect .msg{
        font-size: 20px;
        text-align: center;
    }
    .collectInfo .price{
        /*content: '';*/
        display: inline-block;
        margin: 0 0 5px;
    }
    .table-hover>tbody>tr.lightYellow{
        background-color: #fffcd9;
    }
</style>