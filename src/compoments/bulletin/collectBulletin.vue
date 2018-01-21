<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报</li>
            <li>收房喜报</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">

                        <div class="input-group">
                            <select class="form-control" v-model="params.mark" @change="collect(1)">
                                <option value="0">标记筛选</option>
                                <option value="1">炸单</option>
                                <option value="2">充公</option>
                                <option value="3">款项</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <select class="form-control" v-model="params.operation_id" @change="collect(1)">
                                <option value="0">收房状态</option>
                                <option value="1">收房</option>
                                <option value="2">续约</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="地址/开单人"
                                   v-model="params.keywords" @keydown.enter.prevent="collect(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button"
                                        @click="collect(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="close_()">重置</a>
                        </div>

                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="leading_out">导出</a>
                        </div>
                    </form>
                </div>

                <div v-show="pitch.length > 0" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;标记</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times"></i>&nbsp;取消标记</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-advance">
                        <thead>
                        <tr>
                            <th></th>
                            <!--<th class="text-center">-->
                            <!--<label :class="{'label_check':true,'c_on':pitch.length == 12,'c_off':pitch.length != 12}"-->
                            <!--style="margin: 0;" @click.prevent="chooseAll($event)">-->
                            <!--<input type="checkbox" class="pull-left" :checked="pitch.length == 12">-->
                            <!--</label>-->
                            <!--</th>-->
                            <th></th>
                            <th class="text-center width100">喜报时间</th>
                            <th class="text-center width50">收房状态</th>
                            <th class="text-center width100">地址</th>
                            <th class="text-center width100">房型</th>
                            <th class="text-center width50">收房类型</th>
                            <th class="text-center width50">收房月数</th>
                            <th class="text-center width50">空置期</th>
                            <th class="text-center width80">付款方式</th>
                            <th class="text-center width80">押金</th>
                            <th class="text-center width80">月单价</th>
                            <th class="text-center width100">第一次付款时间</th>
                            <th class="text-center width80">付款方式</th>
                            <th class="text-center width100">收款人户名</th>
                            <th class="text-center width150">账户</th>
                            <th class="text-center width80">开单人</th>
                            <th class="text-center width80">所属部门</th>
                            <th class="text-center width130">备注</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="(item,index) in bulletin" :class="{'color_red': item.lose == 1}">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1, 'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex($event,item.id)">
                                    <input type="checkbox" :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>
                                <span @click="historyTime(item.rent_id, item.house_id)" style="cursor: pointer;">
                                    <i class="fa fa-clock-o" style="font-size: 20px;"></i>
                                </span>
                            </td>
                            <td>{{item.bulletin_time }}</td>
                            <td>
                                <span v-if="item.cate_id == 1">收房</span>
                                <span v-if="item.cate_id == 2">续约</span>
                            </td>
                            <td class="detail">
                                <div>{{item.detailed_address}}
                                    <!--<span v-show="item.lose == 1" @click="friedBill(1)">炸</span>-->
                                    <!--<span v-show="item.confiscation == 1" @click="friedBill(2)">充</span>-->
                                    <!--<span v-show="item.refund == 1" @click="friedBill(3)">款</span>-->
                                    <span @click="friedBill(1,item.id)">炸</span>
                                    <span @click="friedBill(2,item.id)">充</span>
                                    <span @click="friedBill(3,item.id)">款</span>
                                </div>
                            </td>
                            <td>{{item.rooms}}室{{item.hall}}厅{{item.toilet}}卫</td>
                            <td>
                                <span v-if="item.collect_type == 1">整租</span>
                                <span v-if="item.collect_type == 2">合租</span>
                            </td>
                            <td>{{item.collect_month}}</td>
                            <td>{{item.vacant_day}}</td>
                            <td>{{dict.pay_type[item.pay_way_together]}}</td>
                            <td>{{item.bet_money}}</td>
                            <td>
                                <span v-for="(key,index) in item.price_per_month_together" v-if="index == 0">
                                    {{key}}
                                </span>
                            </td>
                            <td>{{item.pay_time_first}}</td>
                            <td>{{dict.money_type[item.collect_purchase_way]}}</td>
                            <td>{{item.collect_payee_name}}</td>
                            <td>{{item.collect_account}}</td>
                            <td>{{item.sname}}</td>
                            <td>{{item.dname}}</td>
                            <!--<td @click="look_tag(item.tags, item.customer.address,item.id)"-->
                            <!--style="cursor: pointer;">-->
                            <!--<span v-for="(key, index) in item.tags" v-show="index < 1 && item.tags.length > 0">-->
                            <!--<span style="color: #aaaaaa;font-size: 10px;">{{key.create_time}}</span><br>-->
                            <!--{{key.content}}-->
                            <!--</span>-->
                            <!--</td>-->
                            <td></td>
                            <td>
                                <router-link :to="{path:'/collectBulletinDetail',query:{ids: item.id}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="20" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="collect" :beforePage="params.page"></Page>

        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--炸单详情-->
        <FriedBill :dict="dict" :title="titles" :detail="details"></FriedBill>

        <!--历史记录-->
        <History :msg="histories" :urls="urls" :status="''"></History>

        <!--新增备注-->
        <AddRemark @add="lookRemark" :remark="remark"></AddRemark>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import STAFF from '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    import History from './detailed/history.vue'

    import FriedBill from './detailed/friedBill.vue'            //炸单详情
    import AddRemark from '../common/addRemark.vue'

    export default {
        components: {Page, Status, STAFF, DatePicker, FriedBill, History, AddRemark},
        data() {
            return {
                urls: '',
                histories: [],
                details: [],
                titles: '',                 //炸单/充公详情
                dict: {},                   //字典
                pitch: [],                  //ID
                paging: '',                 //总页数
                isShow: false,              //暂无数据
                params: {
                    keywords: '',
                    department_id: '',
                    staff_id: '',
                    date_range: '',
                    page: 1,
                    mark: '0',
                    operation_id: '0',
                },
                selected: '',               //部门名称
                configure: {},              //部门筛选条件

                dateConfigure: [
                    {                       //日期
                        range: true,
                        needHour: true
                    }
                ],
                currentDate: [],

                bulletin: [],               //收房喜报

                remark: {
                    look_remark: [],                        //备注内容
                    addRemark: '',                          //新增备注
                    address_remark: '',                     //头部信息
                    remark_id: '',                          //备注id
                    urls: 'account/receivable/tag_v2/'      //新增接口
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
        mounted() {
            this.$http.get('core/customer/dict').then((res) => {
                this.dict = res.data;

                this.collect(1);
            })
        },
        methods: {
            // 历史记录
            historyTime(rent, house) {
                this.
                this.$http.get('bulletin/collect/bulletinHistory?rent_id=' + rent + '&house_id=' + house).then((res) => {
                    if(res.data.code === '90020'){
                        this.histories = res.data.data;
                        this.urls = '/collectBulletinDetail'
                    }
                });
                $('#history').modal({back: 'static'});
            },
            search() {
                this.collect(this.params.page)
            },
//            日期筛选
            getDate(date) {
                this.params.date_range = date;
                this.collect(1);
            },
//            部门搜索
            select() {
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {length: 1};
            },

            collect(val) {
                this.params.page = val;
                this.$http.get('bulletin/collect/collectBulletinIndex', {
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.isShow = false;
                        this.paging = res.data.data.pages;
                        this.bulletin = res.data.data.current_page;
                    } else {
                        this.isShow = true;
                        this.paging = '';
                        this.bulletin = [];
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            部门搜索
            selectDateSend(val) {
                if (val.department.length > 0) {
                    this.selected = val.department[0].name;
                    this.params.department_id = val.department[0].id;
                }
                if (val.staff.length > 0) {
                    this.selected = val.staff[0].name;
                    this.params.staff_id = val.staff[0].id;
                }
                this.collect(1);
            },
//            清空部门
            clearSelect() {
                this.params.department_id = '';
                this.params.staff_id = '';
                this.selected = '';
                this.collect(1);
            },

//            导出
            leading_out() {
                this.$http.get('', {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '18410') {
                    }
                })
            },
//            重置
            close_() {
                this.params.keywords = '';
                this.params.department_id = '';
                this.params.staff_id = '';
                this.params.page = 1;
                this.params.mark = '0';
                this.params.operation_id = '0';
                this.selected = '';
                this.currentDate = '';
                this.pitch = [];
                this.collect(1);
            },

//            查看备注
            look_tag(val, urls, id) {
                this.remark.look_remark = val;
                this.remark.address_remark = urls;
                this.remark.remark_id = id;
                $('#addRemarks').modal({backdrop: 'static'});    //空白处模态框不消失
            },
            lookRemark() {
                this.search();
            },

//             全选
            chooseAll(ev) {
                this.pitch = [];
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    for (let i = 0; i < this.bulletin.length; i++) {
                        this.pitch.push(this.bulletin[i].id);
                    }
                }
            },
//            复选框
            changeIndex(ev, id) {
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(id);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
//            炸单/充公/款项
            friedBill(val, id) {
                this.$http.get('bulletin/collect/collectBulletinDetail?id=' + id + '&mark=1').then((res) => {
                    if (res.data.code === '90010') {
                        if (val === 1) {
                            this.titles = '炸单详情';
                            this.details = res.data.data.dataLose[0];
                        } else if (val === 2) {
                            this.titles = '充公详情';
                            this.details = res.data.data.dataConfiscation[0];
                        } else {
                            this.titles = '款项详情';
                            this.details = res.data.data.dataRefund[0];
                        }
                        $('#friedBill').modal({backdrop: 'static'});
                    } else {
                        this.details = null;             //炸单
                    }
                });
            },
            successMsg(msg) {    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg) {      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>

<style scoped>
    .detail span {
        cursor: pointer;
        display: inline-block;
        padding: 2px 4px;
        -webkit-border-radius: 24%;
        -moz-border-radius: 24%;
        border-radius: 24%;
        color: #ffffff;
        margin: 0 0 3px 3px;
    }

    .color_red {
        color: #E43;
    }

    .detail div span:first-of-type {
        background: #FF0000;
    }

    .detail div span:nth-of-type(2) {
        background: #0099CC;
    }

    .detail div span:last-of-type {
        background: #009933;
    }
</style>
