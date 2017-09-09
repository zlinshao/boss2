<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li>订单迁移</li>
            <li class="active">收房订单</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div v-if="contractSeleted.length === 0">
                    <div v-if="flag">
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" @change="search" v-model="contractSearchInfo.passed">
                                    <option value="">合同状态</option>
                                    <option v-for="(value,key) in dictionary.passed" :value="key">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort padd">
                            <!--<label>-->
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                            <!--</label>-->
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
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 " style="padding: 0;">
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
            <section class="panel table table-responsive roll">
                <table class="table table-striped table-advance table-hover">
                    <thead class="text-center">
                    <tr>
                        <th class="text-center">
                            <input id="allCheck" type="checkbox" v-model="allCheck" @click="pickedAll($event)">
                            <label for="allCheck"></label>
                        </th>
                        <th class="text-center width100">合同编号</th>
                        <th class="text-center width100">上传时间</th>
                        <th class="text-center width80">业主姓名</th>
                        <th class="text-center width110">地址</th>
                        <th class="text-center width110">手机号码</th>
                        <th class="text-center width80">开单人</th>
                        <th class="text-center width80">负责人</th>
                        <th class="text-center width110">所属部门</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr class="text-center" v-for="item in params"
                        :class="{'selected': contractSeleted.indexOf(item.id)>-1}">
                        <td>
                            <input type="checkbox" @click="picked(item,$event)"
                                   v-model="checkboxModel" :value="item.id">
                        </td>
                        <td>{{item.contract_num}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.detailed_address}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.drawer}}</td>
                        <td>{{item.leader_Name}}</td>
                        <td>{{item.dpm_Name}}</td>
                    </tr>
                    <tr v-if="isShow">
                        <td colspan="9" class="text-center text-muted">
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
        <Loading v-if='Waiting'></Loading>
    </div>
</template>
<script>
    import Loading from '../loading/Loading.vue'
    import Page from '../common/page.vue'
    import Staff from '../common/oraganization.vue'
    import Status from '../common/status.vue';                          //提示信息
    import DatePicker from '../common/datePicker.vue'
    export default{
        components: {DatePicker, Page, Staff, Status, Loading},
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
                params: [],
                contractSearchInfo: {
                    passed: '',
                    page: '',
                    department_id: '',
                    start: '',
                    end: '',
                    keywords: '',
                    //最新发布
                    newest: false,
                    //快到期合同
                    become_due: false,
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
                configureType: '',
                pages: '',
                isShow: false,
                contractSeleted: [],
                top: '',
                mark: '',
                status: '',
                msgFlag: '',
                Waiting: true,
                checkboxModel: [],
                staff_id: '',
                allCheck: '',
                allId: [],
            }
        },
        watch: {
            'contractSeleted': {
                deep: true,
                handler(val, oldVal){
                    this.checkboxModel = val;
                }
            },

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
                    this.searchContract();

                });
            },
            search(){
                this.contractSearchInfo.page = 1;
                this.searchContract();
            },
            searchContract(){
                this.$http.post('core/collect/contractlist ', this.contractSearchInfo).then((res) => {
                    if (res.data.code === '70010') {
                        this.params = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                        this.Waiting = false;
                        this.allId = [];
                        for (let j = 0; j < this.params.length; j++) {
                            this.allId.push(this.params[j].id)
                        }
                    } else {
                        this.params = [];
                        this.allId = [];
                        this.pages = 1;
                        this.isShow = true;
                        this.Waiting = false;
                    }
                })
            },
            selectDpm(){ //选择部门
                $('.selectCustom:eq(0)').modal('show');
                this.configureType = 'selectDpm';
                this.configure = {type:'department',length: 1};
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
                            'type': 'collect',
                            'id': this.contractSeleted,
                            'staff_id': this.staff_id,
                        }).then((res) => {
                        if (res.data.code === '70020') {
                            this.search();
                            this.contractSeleted = [];
                            this.allCheck = false;
                            this.staff_id = '';
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
                            'type': 'collect',
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
                this.contractSearchInfo.start = val.split('to')[0];
                this.contractSearchInfo.end = val.split('to')[1];
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
                } else {
                    for (let i = 0; i < this.contractSeleted.length; i++) {
                        if (item.id === this.contractSeleted[i]) {
                            this.contractSeleted.splice(i, 1)
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
            distribution(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {type:'staff',length: 1};
                this.configureType = 'distribution';
            },
            distributionDpm(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {type:'department',length: 1};
                this.configureType = 'distributionDpm';
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