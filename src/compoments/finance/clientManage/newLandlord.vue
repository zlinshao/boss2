<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>客户管理</li>
            <li>房东管理</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div v-if="pitch.length === 0">
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 10px;">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="params.selecteds" @click='select' readonly>
                            <span class="input-group-btn">
                            <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                        </span>
                        </div>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-3" style="padding: 0;margin-right: 10px;">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="params.search" placeholder="房屋地址/客户名"
                                   @keyup.enter="search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search">搜索</button>
                            </span>
                        </div>
                    </div>

                    <div class="pro-sort pull-right">
                        <button class="btn btn-success" type="button" @click="newAddClient">
                            <i class="fa fa fa-plus-square"></i>
                            新增客户
                        </button>
                    </div>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li v-if="pitch.length === 1">
                            <h5><a @click="reviseLand">编辑</a></h5>
                        </li>
                        <li>
                            <h5><a @click="deleteClient">删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="panel table table-responsive roll">
            <table class="table table-striped table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th></th>
                    <th class="text-center width100">生成时间</th>
                    <th class="text-center width100">房屋地址</th>
                    <th class="text-center width80">客户姓名</th>
                    <th class="text-center width80">收房月数</th>
                    <th class="text-center width100">付款方式</th>
                    <th class="text-center width100">月单价</th>
                    <th class="text-center width100">待签约日期</th>
                    <th class="text-center" style="min-width: 130px;">第一次打房租日期</th>
                    <th class="text-center width100">客户付款方式</th>
                    <th class="text-center width150">账号</th>
                    <th class="text-center width80">签约人</th>
                    <th class="text-center width80">状态</th>
                    <th class="text-center width50">详情</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr class="text-center" v-for="item in LandlordList"
                    :class="{'selected': pitch.indexOf(item.id) > -1}">
                    <td>
                        <input type="checkbox" :checked="pitch.indexOf(item.id) > -1"
                               @click="pitchId(item.id, $event)">
                    </td>
                    <td class="text-center">{{item.create_time}}</td>
                    <td class="text-center">{{item.address}}</td>
                    <td class="text-center">{{item.customer_name}}</td>
                    <td class="text-center">{{item.months}}</td>
                    <td class="text-center">
                        <span v-if="item.pay_types.length !== 0">
                            {{LandlordDict.pay_type[item.pay_types[0]]}}
                        </span>
                        <span class="text-primary" v-if="item.pay_types.length > 1">
                            变化
                        </span>
                        <span v-if="item.pay_types.length === 0">
                            —
                        </span>
                    </td>
                    <td class="text-center">
                        <span v-if="item.prices.length !== 0">
                            {{item.prices[0]}}
                        </span>
                        <span class="text-primary" v-if="item.prices.length > 1">
                            变化
                        </span>
                        <span v-if="item.prices.length === 0">
                            —
                        </span>
                    </td>
                    <td class="text-center">{{item.deal_date}}</td>
                    <td class="text-center">{{item.first_pay_date}}</td>
                    <td class="text-center">{{LandlordDict.payment[item.account_type]}}</td>
                    <td class="text-center">
                        <span v-if="item.account_num !== ''">{{item.account_num}}</span>
                        <span v-if="item.account_num === ''">—</span>
                    </td>
                    <td class="text-center">
                        <span v-if="item.staff != null">{{item.staff.real_name}}</span>
                        <span v-if="item.staff == null">—</span>
                    </td>
                    <td class="text-center">
                        <label class="label label-default" v-if="item.status === 1">
                            {{LandlordDict.customer_status[item.status]}}
                        </label>
                        <label class="label label-success" v-if="item.status === 2">
                            {{LandlordDict.customer_status[item.status]}}
                        </label>
                        <label class="label label-warning" v-if="item.status === 3">
                            {{LandlordDict.customer_status[item.status]}}
                        </label>
                    </td>
                    <td class="text-center">
                        <router-link :to="{path:'/newLandlordDetail',query: {nameId: item.id, sea: params, cus: 1}}">
                            详情
                        </router-link>
                    </td>
                </tr>
                <tr v-if="isShow">
                    <td colspan="14" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--NEW新增客户-->
        <NewClientAdd :list="myLandlordList" @success_="search"></NewClientAdd>

        <!--删除-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--人资-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>

        <Page :pg="paging" @pag="getLandlordList" :beforePage="params.beforePage"></Page>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Department from '../../common/organization/selectStaff.vue'
    import NewClientAdd from  './newLandlordAdd.vue'
    import Page from  '../../common/page.vue'
    import Confirm from '../../common/confirm.vue'
    import DatePicker from '../../common/datePicker.vue'
    export default{
        components: {Department, Page, Status, NewClientAdd, Confirm, DatePicker},
        data(){
            return {
                confirmMsg: '',                     //删除信息
                pitch: [],
                LandlordDict: {},                   //字典
                LandlordList: [],                   //列表
                myLandlordList: {},                 //房东详情
                params: {
                    beforePage: 1,
                    department_id: [],              //部门ID
                    range: '',                      //时间搜索
                    search: '',                     //关键字
                    selecteds: [],                  //部门名称
                },
                configure: [],
                currentDate: [],
                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                        position: 'top-right',
                    }
                ],
                isShow: false,
                paging: '',
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
            }
        },
        mounted(){
            if(this.$route.query.land === 1){
                this.params = this.$route.query.sea;
                this.getLandlordList(1);
            }else{
                this.getLandlordList(1);
            }
        },
        methods: {
//            选中
            pitchId (rul, ev){
                if (ev.target.checked === true) {
                    this.pitch.push(rul);

                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
//            编辑
            reviseLand (){
                $('#newClientAdd').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
                this.$http.get('finance/customer/collect/' + this.pitch).then((res) => {
                    if (res.data.code === '90010') {
                        this.myLandlordList = res.data.data;
                    }
                })
            },
//            搜索
            search(){
                this.getLandlordList(1);
            },
//              时间搜索
            getDate(data){
                this.params.range = data;
                this.search();
            },
            getLandlordList(val){
                this.params.beforePage = val;
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.LandlordDict = res.data;
                    this.paging = '';
                    this.$http.get('finance/customer/collect?page=' + val, {
                        params: this.params
                    }).then((res) => {
                        if (res.data.code === '90010') {
                            this.LandlordList = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.isShow = false;
                        } else {
                            this.LandlordList = [];
                            this.isShow = true;
                        }
                    })
                })
            },
//            人资管理
            select(){
                $('.selectCustom:eq(1)').modal({backdrop: 'static',});
                this.configure = {type: 'department', class: 'selectType'};
            },
//            人资管理
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.params.selecteds.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                this.search();
            },
            clearSelect(){
                if (this.params.selecteds.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.selecteds = [];
                this.search();
            },

//            new新增客户
            newAddClient (){
                this.myLandlordList = {};
                $('#newClientAdd').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },

//            删除模态框
            deleteClient(){
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            删除回调
            getConfirm(){
                this.$http.post('finance/customer/collect/delete',{
                    ids: this.pitch
                }).then((res) => {
                    if(res.data.code === '90010'){
                        this.pitch = [];
                        this.getLandlordList(1);
                    }
                })
            },
        }
    }
</script>

<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    input, select {
        margin-bottom: 0;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }

    .label {
        display: inline-block;
        width: 80px;
    }

    .selected {
        background: #FFFF6F !important;
    }

</style>
