<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>房东/租客管理</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-if="pitch.length === 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="params.selecteds" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" v-model="params.search" placeholder="房屋地址/客户名"
                                   @keyup.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                    </form>
                </div>

                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <!--房东-->
                    <ul v-if="landRenter === 'landlord'">
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="reviseLand('finance/customer/collect/')"><i
                                    class="fa fa-book"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a @click="deleteClient('finance/customer/collect/delete')"><i
                                    class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>

                    <!--租客-->
                    <ul v-if="landRenter === 'renter'">
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="reviseLand('finance/customer/rent/')"><i class="fa fa-book"></i>&nbsp;编辑</a>
                            </h5>
                        </li>
                        <li>
                            <h5><a @click="deleteClient('finance/customer/rent/delete')"><i
                                    class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel table table-responsive roll has-js">
            <table class="table table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th class="width50 text-danger">房东</th>
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
                    :class="{'selected': pitch.indexOf(item.id) > -1 && landRenter === 'landlord','freeze': item.freeze === 1}">
                    <td>
                        <label v-if="item.freeze !== 1"
                               :class="{'label_check':true,
                               'c_on':pitch.indexOf(item.id) > -1 && landRenter === 'landlord',
                               'c_off':pitch.indexOf(item.id)==-1}"
                               @click.prevent="pitchId(item.id, $event, 'landlord')">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.indexOf(item.id) > -1 && landRenter === 'landlord'">
                        </label>
                        <span v-if="item.freeze === 1" @click="recover(item.id, 1)"
                              class="fa fa-rotate-left" style="cursor:pointer;margin-right: 8px;"></span>
                    </td>
                    <td class="text-center">{{item.create_time}}</td>
                    <td class="text-center">
                        {{item.address}}&nbsp;
                        <span v-if="item.liquidation === 1" class="fa fa-jpy text-warning"></span>
                    </td>
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
                        <router-link
                                :to="{path:'/newLandlordDetail',query: {nameId: item.id, sea: params, cus: 1,freeze: item.freeze}}">
                            详情
                        </router-link>
                    </td>
                </tr>
                <tr v-if="land_isShow">
                    <td colspan="14" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
        <Page :pg="paging1" @pag="land_page" :beforePage="params.collect_page"></Page>

        <section class="panel table table-responsive roll has-js">
            <table class="table table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th class="width50 text-danger">租客</th>
                    <th class="text-center width100">生成时间</th>
                    <th class="text-center width100">房屋地址</th>
                    <th class="text-center width80">客户姓名</th>
                    <th class="text-center width80">租房月数</th>
                    <th class="text-center" style="min-width: 110px;">付款方式</th>
                    <th class="text-center" style="min-width: 90px;">月单价</th>
                    <th class="text-center width80">租房类型</th>
                    <th class="text-center width80">租房状态</th>
                    <th class="text-center width100">待签约日期</th>
                    <th class="text-center width80">签约人</th>
                    <th class="text-center width80">状态</th>
                    <th class="text-center" style="min-width: 50px;">详情</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr class="text-center" v-for="item in RenterList"
                    :class="{'selected': pitch.indexOf(item.id) > -1 && landRenter === 'renter','freeze': item.freeze === 1}">
                    <td>
                        <label v-if="item.freeze !== 1"
                               :class="{'label_check':true,
                               'c_on':pitch.indexOf(item.id) > -1 && landRenter === 'renter',
                               'c_off':pitch.indexOf(item.id)==-1}"
                               @click.prevent="pitchId(item.id, $event, 'renter', item.name)">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.indexOf(item.id) > -1 && landRenter === 'renter'">
                        </label>
                        <span v-if="item.freeze === 1" @click="recover(item.id, 2)"
                              class="fa fa-rotate-left" style="cursor:pointer;margin-right: 8px;"></span>
                    </td>
                    <td class="text-center">{{item.create_time}}</td>
                    <td class="text-center">
                        {{item.address}}&nbsp;
                        <span v-if="item.liquidation === 1" class="fa fa-jpy text-warning"></span>
                    </td>
                    <td class="text-center">{{item.customer_name}}</td>
                    <td class="text-center">{{item.months}}</td>
                    <td class="text-center">
                        押{{item.bet}}付
                        <span v-if="item.pay.length !== 0">
                            {{item.pay[0]}}
                        </span>
                        <span class="text-primary" v-if="item.pay.length > 1">
                            变化
                        </span>
                        <span v-if="item.pay.length === 0">
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
                    <td class="text-center">{{LandlordDict.shared_house[item.is_shared]}}</td>
                    <td class="text-center">{{LandlordDict.rent_type[item.rent_type]}}</td>
                    <td class="text-center">{{item.deal_date}}</td>
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
                        <router-link :to="{path:'/newRenterDetail',query: {nameId: item.id, sea: params, cus: 1}}">
                            详情
                        </router-link>
                    </td>
                </tr>
                <tr v-if="rent_isShow">
                    <td colspan="14" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
        <!--分页-->
        <Page :pg="paging2" @pag="renter_page" :beforePage="params.rent_page"></Page>

        <!--部门搜索-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>

        <!--房东-->
        <NewClientAdd :list="detailLand" @success_="search"></NewClientAdd>

        <!--租客-->
        <NewRenterAdd :list="detailRenter" @success_="search"></NewRenterAdd>

        <!--删除-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import DatePicker from '../../common/datePicker.vue'
    import Department from '../../common/oraganization.vue'
    import NewClientAdd from  './newLandlordAdd.vue'
    import NewRenterAdd from  './newRenterAdd.vue'
    import Confirm from '../../common/confirm.vue'
    import Page from  '../../common/page.vue'
    export default{
        components: {DatePicker, Department, NewClientAdd, NewRenterAdd, Confirm, Status, Page},
        data(){
            return {
                paging1: '',                    //房东总页数
                paging2: '',                    //租客总页数
                confirmMsg: '',                 //删除信息
                deleteAddr: '',                 //删除url地址
                pitch: [],                      //选中ID
                LandlordDict: {},               //字典
                LandlordList: [],               //房东
                detailLand: {},                 //房东详情
                detailRenter: {},               //租客详情
                rent_isShow: false,
                land_isShow: false,
                RenterList: [],                 //租客
                landRenter: '',                 //判断房东 / 租客
                configure: {},                  //部门搜索
                dateConfigure: [
                    {
                        range: true,            //日期组件参数
                        needHour: false
                    }
                ],
                currentDate: [],                //日期组件参数
                params: {
                    collect_page: 1,                //房东
                    rent_page: 1,                   //租客
                    department_id: [],              //部门ID
                    range: '',                      //时间搜索
                    search: '',                     //关键字
                    selecteds: [],                  //部门名称
                },
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
            this.getLandlordList();
        },
        methods: {
//            恢复
            recover (val, num){
                let identity = num;
                this.$http.post('account/pending/recover', {
                    customer_id: val,
                    identity: identity,
                }).then((res) => {
                    if (res.data.code === '18810') {
                        this.search();
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
//            列表
            getLandlordList(){
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.LandlordDict = res.data;

                    this.pitch = [];
                    this.LandlordList = [];
                    this.RenterList = [];
                    this.paging1 = '';
                    this.paging2 = '';
                    this.$http.get('finance/customer_base', {
                        params: this.params
                    }).then((res) => {
                        if (res.data.code === '90010') {
                            if (res.data.data.customer_collect.length !== 0) {
                                this.LandlordList = res.data.data.customer_collect;         //房东
                                this.paging1 = res.data.data.collect_pages;
                                this.land_isShow = false;
                            } else {
                                this.land_isShow = true;
                            }
                            if (res.data.data.customer_rent.length !== 0) {
                                this.RenterList = res.data.data.customer_rent;              //租客
                                this.paging2 = res.data.data.rent_pages;
                                this.rent_isShow = false;
                            } else {
                                this.rent_isShow = true;
                            }
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                })
            },
//            房东分页
            land_page(val){
                this.params.collect_page = val;
                this.getLandlordList();
            },
//            租客分页
            renter_page(val){
                this.params.rent_page = val;
                this.getLandlordList();
            },
//            模糊搜索
            search (){
                this.params.collect_page =1;
                this.params.rent_page = 1;
                this.getLandlordList();
            },
//            部门搜索
            select(){
                $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                this.configure = {type: 'department'};
            },
//            部门搜索回调
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.params.selecteds.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                this.search();
            },
//            清空部门搜索
            clearSelect(){
                if (this.params.selecteds.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.selecteds = [];
                this.search();
            },
//            日期搜索
            getDate(data){
                this.params.range = data;
                this.search();
            },
//            选中列表ID
            pitchId (rul, ev, val){
                this.landRenter = val;
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch = [];
                if (evInput.checked) {
                    this.pitch.push(rul);
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
//            房东 / 租客编辑
            reviseLand (val){
                if (val === 'finance/customer/collect/') {
                    $('#newClientAdd').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
                if (val === 'finance/customer/rent/') {
                    $('#newRenterAdd').modal({
                        backdrop: 'static',         //空白处模态框不消失
                    });
                }
                this.$http.get(val + this.pitch).then((res) => {
                    if (res.data.code === '90010') {
                        if (val === 'finance/customer/collect/') {
                            this.detailLand = res.data.data;
                        }
                        if (val === 'finance/customer/rent/') {
                            this.detailRenter = res.data.data;
                        }
                    }
                })
            },
//            删除模态框
            deleteClient(val){
                this.deleteAddr = val;
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            删除回调
            getConfirm(){
                this.$http.post(this.deleteAddr, {
                    ids: this.pitch
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.pitch = [];
                        // 成功
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.search();
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
        }
    }
</script>

<style scoped>

    .selected {
        background: #FFFF6F !important;
    }

    .freeze {
        background-color: #D6D6D6;
        color: #E4393C;
    }
</style>
