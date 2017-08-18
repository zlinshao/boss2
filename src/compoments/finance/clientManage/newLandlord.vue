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
                <div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px">
                        <div class="input-group">
                            <input type="text" readonly class="form-control" @click="selectDpm" placeholder="点击选择部门">
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="reset">清空</button>
                            </span>
                        </div>

                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="房屋地址/客户名" @keyup.center="search">
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
                <!--<div class="col-lg-12 remind">-->
                <!--<ul>-->
                <!--<li>-->
                <!--<h5><a>已选中&nbsp;  &nbsp;项</a></h5>-->
                <!--</li>-->
                <!--<li>-->
                <!--<h5><a></a></h5>-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
            </div>
        </section>
        <section class="panel table table-responsive">
            <table class="table table-striped table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th class="text-center">生成时间</th>
                    <th class="text-center">房屋地址</th>
                    <th class="text-center">客户姓名</th>
                    <th class="text-center">收房月数</th>
                    <th class="text-center">付款方式</th>
                    <th class="text-center">月单价</th>
                    <th class="text-center">待签约日期</th>
                    <th class="text-center">第一次打房租日期</th>
                    <th class="text-center">客户付款方式</th>
                    <th class="text-center">账号</th>
                    <th class="text-center">签约人</th>
                    <th class="text-center">状态</th>
                    <th class="text-center">详情</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr class="text-center" v-for="item in LandlordList">
                    <!--<td><input type="checkbox"></td>-->
                    <td class="text-center">{{item.create_time}}</td>
                    <td class="text-center">{{item.address}}</td>
                    <td class="text-center">{{item.customer_name}}</td>
                    <td class="text-center">{{item.months}}</td>
                    <td class="text-center">
                        <!--<span v-if="item.pay_types.length !== 0">-->
                            <!--{{LandlordDict.pay_type[item.pay_types]}}-->
                        <!--</span>-->
                        <!--<span class="text-primary" v-if="item.pay_types.length > 1">-->
                            <!--变化-->
                        <!--</span>-->
                        <!--<span v-if="item.pay_types.length === 0">-->
                            <!--—-->
                        <!--</span>-->
                    </td>
                    <td class="text-center">
                        <span>
                            {{item.prices[0]}}
                        </span>
                        <span class="text-primary" v-if="item.prices.length > 0">
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
                        <router-link to=''>
                            详情
                        </router-link>
                    </td>
                </tr>
                <tr v-if="isShow">
                    <td colspan="13" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--NEW新增客户-->
        <NewClientAdd></NewClientAdd>

        <Department :configure='configure' @Staff="dpmSelected"></Department>

        <Page :pg="paging" @pag="getLandlordList" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Department from '../../common/organization/selectStaff.vue'
    import NewClientAdd from  './newLandlordAdd.vue'
    import Page from  '../../common/page.vue'
    export default{
        components: {Department, Page, Status, NewClientAdd},
        data(){
            return {
                LandlordDict: {},                   //字典
                LandlordList: [],                   //列表
                configure: [],
                isShow: false,
                paging: '',
                beforePage: 1,
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
            this.getLandlordList(1);
        },
        methods: {
//            搜索
            search(){
                //                if (val % 12 === 0) {
//                    let year = parseInt(val / 12);
//                    this.flexDatas = year;
//                    if (year < this.moreYears) {
//                        this.moreYears = year;
//                        this.sendData();
//                    }
//                } else {
//                    let year = parseInt(val / 12 + 1);
//                    this.flexDatas = year;
//                    if (year < this.moreYears) {
//                        this.moreYears = year;
//                        this.sendData();
//                    }
//                }
                this.getLandlordList(1);
            },
            getLandlordList(val){
                this.beforePage = val;
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.LandlordDict = res.data;
                    this.paging = '';
                    this.$http.get('finance/customer/collect?page=' + val).then((res) => {
                        if (res.data.code === '90010') {
                            this.LandlordList = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.isShow = false;
                        } else {
                            this.isShow = true;
                        }
                    })
                })
            },
//            人资管理
            selectDpm(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {length: 1, class: 'department', id: []};
            },
//            人资管理
            dpmSelected(val){
//                this.searchInformation.department_id = val.department[0].id;
//                this.departmentName = val.department[0].name;
                this.search();
            },

//            new新增客户
            newAddClient (){
                $('#newClientAdd').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },

            pageSearch(val){
                this.searchInformation.pages = val;
                this.getClientList();
            },
            reset(){    //清空
//                this.searchInformation.department_id = '';
//                this.departmentName = '';
                this.search();
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
</style>
