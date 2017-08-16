<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li class="active">租房合同{{simulate }}</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div v-if="contractSeleted.length === 0">
                    <div v-if="flag">
                        <div class="pro-sort">
                            <select class="form-control" @change="search" v-model="contractSearchInfo.passed">
                                <option value="">合同状态</option>
                                <option v-for="(value,key) in dictionary.passed" :value="key">{{value}}</option>
                            </select>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"
                                            :currentDate="currentDate"></DatePicker>
                            </label>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 5px">
                            <div class="input-group">
                                <input type="text" readonly class="form-control" placeholder="点击选择部门"
                                       @click="selectDpm" v-model="departmentName">
                                <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="reset">清空</button>
                            </span>
                            </div>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 "
                             style="padding: 0;margin-right: 5px">
                            <div class="input-group">
                                <input type="text" class="form-control" @keyup="search" placeholder="手机号/开单人/业主/地址"
                                       v-model="contractSearchInfo.keywords">
                                <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search">搜索</button>
                            </span>
                            </div>
                        </div>
                        <div class="pro-sort" style="margin-left: 10px;margin-top: 15px">
                            <label>
                                <input type="checkbox" v-model="contractSearchInfo.become_due" @click="search">
                                30天内快到期
                            </label>
                        </div>
                        <!--<div class="pro-sort"  style="margin-left: 10px;margin-top: 15px">-->
                        <!--<span>排序方式：</span>-->
                        <!--<label>-->
                        <!--<input type="radio" name="sort" @click="isNewest(0)">默认排序-->
                        <!--</label>-->
                        <!--<label>-->
                        <!--<input type="radio" name="sort" @click="isNewest(1)">最新发布-->
                        <!--</label>-->
                        <!--</div>-->
                        <div class="pull-right pro-sort" style="margin: 8px">
                            <router-link :to="{path:'/Memorandum',query: {flag: 'rent'}}" class="btn btn-primary">
                                &nbsp;查看备忘录
                            </router-link>
                        </div>
                        <div class="pull-right" style="margin: 8px">
                            <button class="btn btn-primary" @click="collectAdd">
                                <i class="fa fa-plus-square"></i>&nbsp;新增租房合同
                            </button>
                        </div>
                    </div>

                    <div class="pull-right" v-if="!flag && flag1 === false">
                        <a class="btn btn-success" @click="showFlag"
                           style="background-color: transparent;color: #797979;border: 0;padding: 0 6px 12px 0;margin: 0;">
                            <a style="border-bottom: 1px solid #667FA0;">点击显示筛选条件</a>
                        </a>
                    </div>
                    <div v-if="flag && flag1 === false">
                        <a class="btn btn-success col-xs-12" @click="showFlag"
                           style="background-color: transparent;color: #797979;border: 0;padding:8px 0 12px 0;margin: 0;">
                            <a class="pull-right" style="border-bottom: 1px solid #667FA0;">点击隐藏筛选条件</a>
                        </a>
                    </div>
                </div>
                <!--选中-->
                <div class="panel-body" v-if="contractSeleted.length > 0" style="padding: 0;">
                    <ul>
                        <li>已选中&nbsp; {{contractSeleted.length}} &nbsp;项</li>
                        <li class="operate" v-if="contractSeleted.length ===1">
                            <i class="fa fa-star" v-if="mark == 1" @click="marked"> 标记</i>
                            <i class="fa fa-star" v-if="mark == 2" @click="marked"> 取消标记</i>
                        </li>
                        <li class="operate" v-if="contractSeleted.length ===1">
                            <i class="fa fa-times-circle" @click="deleteContract"> 删除</i>
                        </li>
                        <li class="operate" v-if="contractSeleted.length ===1">
                            <i class="fa fa-arrow-up" v-if="top == 1" @click="stick"> 置顶</i>
                            <i class="fa fa-times-circle-o" v-if="top == 2" @click="stick"> 取消置顶</i>
                        </li>
                        <!--<li  class="operate"  v-if="status !== 1 && contractSeleted.length ===1"  >-->
                        <!--<i class="fa fa fa-lock" @click="deblocking"> 解锁</i>&nbsp;-->
                        <!--</li>-->
                        <li class="operate" v-if="contractSeleted.length ===1">
                            <router-link tag="i" class="fa fa-eye" :to="{path:'/rentingDetail',
                                query: {ContractId: contractSeleted,flag:'review'}}">查看回访记录
                            </router-link>
                        </li>
                        <li class="operate" @click="distribution">
                            <i class="fa fa-sitemap">按人员分配</i>&nbsp;
                        </li>
                        <li class="operate" @click="distributionDpm">
                            <i class="fa fa-sitemap">按部门分配</i>&nbsp;
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--表格-->
        <div>
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead class="text-center">
                    <tr>
                        <th class="text-center">
                            <input id="allCheck" type="checkbox" v-model="allCheck" @click="pickedAll($event)">
                            <label for="allCheck"></label>
                        </th>
                        <th class="text-center">标记</th>
                        <th class="text-center">合同编号</th>
                        <th class="text-center">上传时间</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">租客姓名</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">手机号码</th>
                        <th class="text-center">合同到期时间</th>
                        <th class="text-center">资料补齐时间</th>
                        <th class="text-center">过期情况</th>
                        <th class="text-center">回访情况</th>
                        <th class="text-center">审核状态</th>
                        <!--<th class="text-center">锁定</th>-->
                        <th class="text-center">置顶</th>
                        <th class="text-center">详情</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr class="text-center" v-for="item in contractSearchList"
                        :class="{'selected': contractSeleted.indexOf(item.id)>-1}">
                        <td><input type="checkbox" @click="picked(item,$event)"
                                   :value="item.id" v-model="checkboxModel"></td>
                        <td class=" myIcon">
                            <i class="fa fa-star" style="color: #f1c500" v-if="item.mark === 1"></i>
                        </td>
                        <td>{{item.contract_num}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.drawer}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.detailed_address}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.end_date}}</td>
                        <td>{{item.complete_date[0]}}</td>
                        <td>{{item.complete_date[2]}}</td>
                        <td>{{dictionary.reviewed[item.reviewed]}}</td>
                        <td>
                           <span class="label label-success" v-if="item.passed > 4">
                                已完成
                            </span>
                            <span class="label label-primary" v-if="item.passed === 1">
                                {{dictionary.passed[item.passed]}}
                            </span>
                            <span class="label label-default" v-if="item.passed === 2">
                                {{dictionary.passed[item.passed]}}
                            </span>
                            <span class="label label-warning" v-if="item.passed === 3">
                                {{dictionary.passed[item.passed]}}
                            </span>
                            <span class="label label-warning" v-if="item.passed === 4">
                                {{dictionary.passed[item.passed]}}
                            </span>
                        </td>
                        <!--<td class=" myIcon">-->
                        <!--<i class="fa fa-lock" v-if="item.status !== 1" ></i>-->
                        <!--<i class="fa fa-unlock" v-if="item.status === 1" ></i>-->
                        <!--</td>-->
                        <td class=" myIcon">
                            <i class="fa fa-thumb-tack" v-if="item.top === 1"></i>
                        </td>
                        <td>
                            <router-link :to="{path:'/rentingDetail',
                            query: {ContractId: item.id,flag:'detail',params:contractSearchInfo,departmentName:departmentName}}">
                                详情
                            </router-link>
                        </td>
                    </tr>
                    <tr v-if="isShow">
                        <td colspan="16" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <!--//组件-->
        <Page :pg="pages" @pag="getPage" :beforePage="contractSearchInfo.page"></Page>
        <Status :state='info'></Status>
        <Staff :configure='configure' @Staff="dpmSeleted"></Staff>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <Loading v-if='waiting'></Loading>

        <Contract :dictionary="dictionary"></Contract>
    </div>
</template>
<script>
    import Loading from  '../loading/Loading.vue'
    import Confirm from '../common/confirm.vue'
    import Page from '../common/page.vue'
    import Staff from '../common/organization/selectStaff.vue'
    import Status from '../common/status.vue';                          //提示信息
    import DatePicker from '../common/datePicker.vue'

    import Contract from './rentingAdd.vue'
    export default{
        props : ['simulate'],
        components: {DatePicker, Page, Staff, Status, Confirm, Loading ,Contract},
        data(){
            return {
                flag: true,
                flag1: false,
                start_time: "",
                end_time: '',
                dateConfigure: [{
                    range: true, // 是否选择范围
                    needHour: false // 是否需要选择小时
                }],
                currentDate: [],
                departmentName: '',
                contractSearchList: [],
                contractSearchInfo: {
                    passed: '',
                    page: '',
                    department_id: '',
                    start: '',
                    end: '',
                    keywords: '',
                    //快到期合同
                    become_due: false,
                    //最新发布
                    newest: false,
                },
                dictionary: [],
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
                configure: [],
                pages: '',
                isShow: false,
                contractSeleted: [],
                houseId: [],
                top: '',
                mark: '',
                status: '',
                confirmMsg: [],
                msgFlag: '',
                waiting: true,
                checkboxModel: [],
                staff_id: '',
                department_id: '',
                allCheck: '',
                allId: [],
                keepStatus: false,
            }
        },
        watch: {
            'contractSeleted': {
                deep: true,
                handler(val, oldVal){
                    this.checkboxModel = val;
                }
            }
        },
        mounted(){
            this.getDictionary();
            this.IsPC();
        },
        methods: {
            showFlag (){
                this.flag = !this.flag;
            },
            IsPC(){
                let userAgentInfo = navigator.userAgent;
                let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
                let flag = true;
                let flag1 = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        flag1 = false;
                        break;
                    }
                }
                this.flag = flag;
                this.flag1 = flag1;
            },
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary = res.data;

                    if (this.$route.query.Params !== undefined && this.$route.query.Params.keywords !== undefined) {
                        this.contractSearchInfo = this.$route.query.Params;
                        this.currentDate = [];
                        if (this.contractSearchInfo.start !== '' && this.contractSearchInfo.end !== '') {
                            this.currentDate.push(this.contractSearchInfo.start);
                            this.currentDate.push(this.contractSearchInfo.end);
                        }
                        this.departmentName = this.$route.query.departmentName;
                        this.keepStatus = true;
                    } else {
                        this.keepStatus = false;
                    }

                    this.searchContract();
                });
            },
            search(){
                this.contractSearchInfo.page = 1;
                this.searchContract();
            },
            searchContract(){
                this.$http.post('core/rent/contractlist ', this.contractSearchInfo).then((res) => {
                    if (res.data.code === '80010') {
                        this.contractSearchList = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                        this.waiting = false;
                        this.allId = [];
                        for (let j = 0; j < this.contractSearchList.length; j++) {
                            this.allId.push(this.contractSearchList[j].id)
                        }
                    } else {
                        this.contractSearchList = [];
                        this.pages = 1;
                        this.isShow = true;
                        this.waiting = false;
                        this.allId = [];
                    }
                })
            },
            selectDpm(){ //选择部门
                this.configureType = 'selectDpm';
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {length: 1, class: 'department', id: [9], name: '市场部'};
            },
            dpmSeleted(val){
                if (this.configureType === 'selectDpm') {
                    if (val.department.length) {
                        this.departmentName = val.department[0].name;
                        this.contractSearchInfo.department_id = val.department[0].id;
                        this.search();
                    }
                } else if (this.configureType === 'distribution') {
                    this.staff_id = val.staff[0].id;
                    this.$http.post('core/move_order/moveorder',
                        {
                            'type': 'rent',
                            'id': this.contractSeleted,
                            'staff_id': this.staff_id,
                        }).then((res) => {
                        if (res.data.code === '70020') {
                            this.search();
                            this.contractSeleted = [];
                            this.staff_id = '';
                            this.allCheck = false;
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        } else {
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                } else if (this.configureType === 'distributionDpm') {
                    this.department_id = val.department[0].id;
                    this.$http.post('core/move_order/moveOrderByDpm',
                        {
                            'type': 'rent',
                            'id': this.contractSeleted,
                            'department_id': this.department_id,
                        }).then((res) => {
                        if (res.data.code === '70020') {
                            this.search();
                            this.contractSeleted = [];
                            this.staff_id = '';
                            this.allCheck = false;
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        } else {
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }
            },
            getDate(val){
                this.contractSearchInfo.start = val.split('to')[0]
                this.contractSearchInfo.end = val.split('to')[1]
                this.search();
            },
            getPage(val){
                this.contractSearchInfo.page = val;
                this.allCheck = false;
                this.contractSeleted = [];
                this.searchContract();
            },
            isNewest(val){
                if (val) {
                    this.contractSearchInfo.newest = true;
                } else {
                    this.contractSearchInfo.newest = false;
                }
                this.searchContract();
            },
            reset(){    //清空
                this.contractSearchInfo.department_id = '';
                this.departmentName = '';
                this.searchContract();
            },
            picked (item, e){  //复选框单选并保存选中的id
                if (e.target.checked === true) {
                    this.contractSeleted.push(item.id);
                    this.houseId.push(item.house_id);
                    item.top === 2 ? this.top = 1 : this.top = 2;
                    item.mark === 2 ? this.mark = 1 : this.mark = 2;
                    item.status !== 1 ? this.status = 2 : this.status = 1;
                } else {
                    for (let i = 0; i < this.contractSeleted.length; i++) {
                        if (item.id === this.contractSeleted[i]) {
                            this.contractSeleted.splice(i, 1)
                        }
                    }
                    for (let i = 0; i < this.houseId.length; i++) {
                        if (item.id === this.houseId[i]) {
                            this.houseId.splice(i, 1)
                        }
                    }
                }
            },
            pickedAll(e){
                if (e.target.checked === true) {
                    this.contractSeleted = [];
                    this.contractSeleted = this.allId;
                } else {
                    this.contractSeleted = [];
                }
            },
            stick(){  //top
                this.$http.get('core/rent/stick/id/' + this.contractSeleted[0] + '/top/' + this.top).then((res) => {
                    if (res.data.code === '80090') {
                        this.search();
                        this.contractSeleted = [];
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            marked(){
                this.$http.get('core/rent/mark/id/' + this.contractSeleted[0] + '/mark/' + this.mark).then((res) => {
                    if (res.data.code === '80090') {
                        this.search();
                        this.contractSeleted = [];
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            deleteContract(){
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'delete';

            },
            deblocking(){  //解锁
                this.confirmMsg = {msg: '您确定解锁吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'lock';

            },
            getConfirm(){
                if (this.msgFlag === 'delete') {
                    this.$http.get('core/rent/delete/id/' + this.contractSeleted[0]).then((res) => {
                        if (res.data.code === '80030') {
                            this.search();
                            this.contractSeleted = [];
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        } else {
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                } else if (this.msgFlag === 'lock') {
                    this.$http.get('core/rent/unVillalock/house_id/' + this.houseId[0]).then((res) => {
                        if (res.data.code === '70010') {
                            this.search();
                            this.contractSeleted = [];
                            this.houseId = [];
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        } else {
                            this.info.error = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }
            },
            distribution(){
                $('#selectCustom').modal('show');
                this.configure = {length: 1, class: 'amount'};
                this.configureType = 'distribution';
            },
            distributionDpm(){
                $('#selectCustom').modal('show');
                this.configure = {length: 1, class: 'department', id: [9], name: '市场部'};
                this.configureType = 'distributionDpm';
            },
            collectAdd(){
                $('.rem_div').remove();
                $('#contractAdd').modal('show');
            },
        }
    }
</script>

<style scoped>
    .panel-body {
        padding: 8px 8px 0px 15px;
    }

    input[type=checkbox], input[type=radio] {
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
    }

    input[type=radio] {
        margin-left: 5px;
    }

    .pro-sort {
        margin-top: 10px;
    }

    .panel-body ul {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
    }

    .panel-body ul li {
        float: left;
    }

    .panel-body ul li + li:before {
        content: '|';
        margin: 0 10px;
    }

    div.pull-right {
        margin-top: 5px;
    }

    .icon i {
        font-size: 16px;
        cursor: pointer;
    }

    .icon i:nth-of-type(1) {
        color: #ccc;
    }

    .icon i + i {
        margin-left: 8px;
    }

    .operate {
        cursor: pointer;
    }

    .operate:hover {
        color: #0E90D2;
    }

    .label {
        display: inline-block;
        width: 78px;
        padding: 6px 8px;
    }

    .myIcon {
        padding: 0;
    }

    @media (max-width: 767px) {
        select {
            margin-bottom: 5px;
        }

        .pro-sort {
            margin-top: 0px;
        }
    }

    .selected {
        background: #fffcd9 !important;
    }
</style>