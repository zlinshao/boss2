<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品申领</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group" v-if="simulate.indexOf('manager/approver') > -1">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>
                        <!--<div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="department" @click='selectOne(1)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelectOne(1)">清空</button>
                            </span>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择员工"
                                   v-model="staff" @click='selectOne(2)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelectOne(2)">清空</button>
                            </span>
                        </div>-->
                        <div class="input-group">
                            <select class="form-control" @change="search(1)" v-model="params.library_id">
                                <option value="">办公用品库</option>
                                <option :value="item.id" v-for="item in allLibrary">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="input-group" v-show="params.library_id!=''">
                            <select class="form-control" @change="search(1)" v-model="params.category_id">
                                <option value="">办公用品类型</option>
                                <option :value="item.id" v-for="item in types">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select class="form-control" @change="search(1)" v-model="params.register_type">
                                <option value="">登记类型</option>
                                <option :value="value" v-for="(key,value) in dict.register_type">{{key}}</option>
                            </select>
                        </div>
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="办公用品名称"
                                   @keydown.enter.prevent="search(1)" v-model="params.name">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right" data-toggle="modal" data-target="#applySupply" v-if="simulate.indexOf('manager/management') > -1">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;申领办公用品
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="pitch.length>0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5></li>
                        <li>
                            <h5 v-if="pitch.length==1" v-show="statusId==1||statusId==2" @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li v-if="simulate.indexOf('manager/approver') > -1">
                            <h5 data-toggle="dropdown">
                                <a><i class="fa fa-check-square-o"></i> 审核</a>
                            </h5>
                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                <li v-for="(key,value) in dict.status" @click="review(value)" v-if="value!=1&&value!=5&&value!=6">{{key}}</li>
                            </ul>
                        </li>
                        <li v-if="simulate.indexOf('manager/approver') > -1">
                            <h5 @click="returnBack"><a><i class="fa fa-mail-reply"></i>&nbsp;归还</a></h5>
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
                            <th class="text-center">
                                <input type="checkbox" :checked="myData.length!=0&&pitch.length==myData.length"
                                       @click="chooseAll($event)">
                            </th>
                            <th class="text-center">办公用品名称</th>
                            <th class="text-center">登记类型</th>
                            <th class="text-center">申请数量</th>
                            <th class="text-center">申领人</th>
                            <th class="text-center">申请日期</th>
                            <th class="text-center">审批日期</th>
                            <th class="text-center">审批人</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="pitch.indexOf(item.id) > -1"
                                       @click="changeIndex($event,item.id,item.status)">
                            </td>
                            <td>{{item.inventory_name}}</td>
                            <td>{{dict.register_type[item.register_type]}}</td>
                            <td>{{item.num}}</td>
                            <td>{{item.staff_name}}</td>
                            <td>{{item.create_time}}</td>
                            <td>{{item.approver_time}}</td>
                            <td>{{item.approver_name}}</td>
                            <td>{{item.remarks}}</td>
                            <td>
                                <label :class="{'label':true,'status':true,
                                'yellow':item.status===1||item.status===2,
                                'green':item.status===3||item.status===4||item.status===5,'orange':item.status===6}">
                                    {{dict.status[item.status]}}
                                </label>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="9" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--申领-->
        <ApplySupply @success="filter"></ApplySupply>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
        <EditApply :applyId="applyId" @success="filter"></EditApply>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import ApplySupply from '../applySupply.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import EditApply from './applyEdit.vue'
    import Confirm from '../../common/confirm.vue'
    export default{
        props:['simulate'],
        components: {Page,Status,DatePicker,ApplySupply,STAFF,EditApply,Confirm},
        data(){
            return {
                pitch : [],
                status : [],
                operId : 0,
                statusId : 0,
                dict : {},
                paging: 1,
                beforePage: 1,

                applyId :0,
                myData: [],      //列表数据
                isShow: false,

                configure: {},
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                confirmMsg: {
                    operName : '',
                    msg: '',
                },

                department : '',
                staff : '',

                selected: [],
                allLibrary : [],
                types : [],

                params : {
                    department_id : [],
//                    department_id : '',
                    staff_id : [],
//                    staff_id : '',
                    library_id : '',
                    category_id : '',
                    register_type : '',
                    time : '',
                    name : ''
                },
                dateConfigure : [
                    {
                        range : true,
                    }
                ],
                currentDate :[],
            }
        },
        mounted(){
            this.$http.get('manager/management/dict').then((res)=>{
//                    console.log(res);
                this.dict = res.data.management;
                this.getList();
            });
            this.getLibrarys();
        },
        watch: {
            pitch(val){
                if (val.length == 1) {
                    this.operId = val[0];
                } else {
                    this.operId = 0;
                }
//                console.log(this.operId);
            },
            status(val){
//                console.log(val)
                if (val.length == 1) {
//                    alert(val[0])
                    this.statusId = val[0];
                } else {
                    this.statusId = 0;
                }
//                console.log(this.operId);
            },
            'params.library_id':{
                handler(val){
                    this.selectLibrary();
                }
            },
        },
        methods: {
            getList(){
                this.$http.post('manager/management/receive_index').then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10050){
                        // 成功
                        this.paging = res.data.data.pages;
                        this.myData = res.data.data.data;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.myData = [];
                        this.isShow = true;
                    }
                })
            },

            // 全选
            chooseAll(ev){
                this.pitch.splice(0, this.pitch.length);
                if (ev.target.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.pitch.push(this.myData[i].id);
                    }
                }
                this.status.splice(0, this.status.length);
                if (ev.target.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.status.push(this.myData[i].id);
                    }
                }

//                console.log(this.pitch);
            },
            changeIndex(ev, id, status){
//                console.log("一开始"+this.operId);
                if (ev.target.checked) {
                    this.pitch.push(id);
                    this.status.push(status);
                    this.operId = id;
                    this.statusId = status;
//                    console.log(this.operId);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    let index1 = this.status.indexOf(status);
                    if (index1 > -1) {
                        this.status.splice(index1, 1);
                    }
                    this.operId = 0;
                    this.statusId = 0;
                }
            },

            // 获取所有库
            getLibrarys(){
                let params = this.$route.query.myParam;
                let page = this.$route.query.page;
                this.$http.post('manager/management/library_all').then((res)=>{
//                    console.log(res);
                    if (res.data.code==10010){
                        // 成功
                        this.allLibrary = res.data.data.data;
                    } else {
                        // 失败
                        this.allLibrary = [];
                    }
                })
            },
            selectLibrary(){
                this.params.category_id = '';
                this.$http.post('manager/management/type_all?parent_id='+this.params.library_id).then((res)=>{
//                    console.log(res.data.data.data);
                    if (res.data.code==10010){
                        // 成功
                        this.types = res.data.data.data;
                    } else {
                        // 失败
                        this.types = [];
                    }
                })
            },

            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },

            /*selectOne(num){
                if (num==1){
                    // 部门

                } else {
                    // 员工
                }
            },*/
            clearSelect(){
                if (this.selected.length == 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },
            /*clearSelectOne(num){
                if (num==1){
                    // 部门
                    this.department = '';
                    this.params.department_id = '';
                } else {
                    // 员工
                    this.staff = '';
                    this.params.staff_id = '';
                }
            },*/

            oper(){
                this.applyId = this.operId;
                $('#editApply').modal('show');
            },
            search(val){
                this.filter(val);
            },
            filter(val){
                if (val!=undefined){
                    this.beforePage = val;
                }
                this.operId = 0;
                this.pitch = [];
                this.status = [];
                this.$http.post('manager/management/receive_index?pages='+this.beforePage,this.params).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10050){
                        // 成功
                        this.paging = res.data.data.pages;
                        this.myData = res.data.data.data;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.myData = [];
                        this.isShow = true;
                        this.paging = 0;
                        this.page = 1;
                    }
                })
            },
            getDate(val){
                this.params.time = val;
                this.search(1);
            },

            // 审核
            review(status){
//                console.log(status);
//                console.log(this.pitch);
//                console.log(this.status);
                let flag = false;
                for(let i = 1;i<this.status.length;i++){
                    if (this.status[i]!=this.status[0]){
                        flag = true;
                        break;
                    }
                }
//                alert(flag)
                if (flag){
                    // 不一样
//                    alert(111);
                    this.confirmMsg= {
                        operName : status,
                        msg: '您选择的状态不一致！',
                    }
                    $('#confirm').modal('show');
                } else {
                    this.conReview(status);
                }
            },

            getConfirm(){
//                console.log(this.confirmMsg.operName)
                if (this.confirmMsg.operName=='归还'){
                    this.$http.post('manager/management/receive_return',{
                        id : this.pitch
                    }).then((res)=>{
                        console.log(res.data);
                        if (res.data.code==10081){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.filter(this.beforePage)
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })

                } else {
                    this.conReview(this.confirmMsg.operName)
                }
            },
            conReview(status){
                this.$http.post('manager/management/receive_approver',{
                    id : this.pitch,
                    status : status
                }).then((res)=>{
                    console.log(res);
                    if (res.data.code==100101||res.data.code==100102||res.data.code==100103||res.data.code==100104||res.data.code==100105){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.filter(this.beforePage)
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },

            returnBack(){
                let flag = false;
                for(let i = 0;i<this.status.length;i++){
                    if (this.status[i]!=4){
                        flag = true;
                        break;
                    }
                }
//                alert(flag)
                if (flag){
                    this.info.error = '只有已归还状态才可归还';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                } else {
                    this.confirmMsg= {
                        operName : '归还',
                        msg: '确定归还吗？',
                    };
                    $('#confirm').modal('show');
                }
            }
        }
    }
</script>
<style scoped>
    thead tr input[type=checkbox]{
        vertical-align: bottom;
    }
    table tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }
    .dropdown-menu{
        left: inherit;
        top:inherit;
        min-width: 70px;
        padding: 5px;
    }
    .dropdown-menu li{
        display: inline-block;
        width: 100%;
        clear: both;
        text-align: center;
        cursor: pointer;
        /*line-height: 20px;*/
        font-size: 13px;
        background: #f5f5f5;
        border: 1px solid #f5f5f5;
        color: #08c;
        padding: 3px 12px;
        /*margin-bottom: 8px;*/
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        /*font-size: 12px;*/

    }
    .dropdown-menu li:hover{
        background: #08c;
        border: 1px solid #08c;
        color: #fff;
    }
    .dropdown-menu li+li{
        /*border-top: 1px solid #ddd;*/
        margin-top: 3px;
    }
</style>