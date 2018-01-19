<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报</li>
            <li>特殊请款报备</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">

                        <div class="input-group">
                            <select class="form-control" v-model="params.collect_or_rent" @change="rent(1)">
                                <option value="1">收房</option>
                                <option value="2">租房</option>
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
                                   v-model="params.keywords" @keydown.enter.prevent="special(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="special(1)">搜索</button>
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
                            <h5><a><i class="fa fa-book"></i>&nbsp;增加备注</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;标记</a></h5>
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
                            <th class="text-center width80">租房状态</th>
                            <th class="text-center width100">地址</th>
                            <th class="text-center width100">房型</th>
                            <th class="text-center width80">租房月数</th>
                            <th class="text-center width80">付款方式</th>
                            <th class="text-center width80">定金</th>
                            <th class="text-center width80">月单价</th>
                            <th class="text-center width150">报备事项</th>
                            <th class="text-center width80">开单人</th>
                            <th class="text-center width80">所属部门</th>
                            <th class="text-center width130">备注</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!--:class="{'color_red': item.lose == 1}"-->
                        <tr class="text-center" v-for="(item,index) in bulletin">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1, 'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex($event,item.id)">
                                    <input type="checkbox" :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>
                                <span @click="historyTime" style="cursor: pointer;">
                                    <i class="fa fa-clock-o" style="font-size: 20px;"></i>
                                </span>
                            </td>
                            <td>{{item.bulletin_time}}</td>
                            <td>{{item.cate_id}}</td>
                            <td>{{item.detailed_address}}</td>
                            <td>{{item.rooms_together}}</td>
                            <td>{{item.month}}</td>
                            <td>{{item.pay_way_together}}</td>
                            <td>{{item.deposit}}</td>
                            <td>{{item.price_per_month_together}}</td>
                            <td>{{item.content}}</td>
                            <td>{{item.sname}}</td>
                            <td>{{item.dname}}</td>
                            <td>{{item.remark}}</td>
                            <td>
                                <router-link :to="{path:'/specialDetail',query: {special: item.id, num: item.collect_or_rent}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="19" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="special" :beforePage="params.page"></Page>

        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--历史记录-->
        <History></History>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import STAFF from '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    import History from './detailed/history.vue'

    export default {
        components: {Page, Status, STAFF, DatePicker, History},
        data() {
            return {
                dict: {},                   //字典
                pitch: [],                  //ID
                paging: '',                 //总页数
                isShow: false,              //暂无数据
                params: {
                    keywords: '',
                    department_id: '',
                    staff_id: '',
                    date_range: '',
                    collect_or_rent: 1,
                    page: 1,
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

                this.special(1)
            })
        },
        methods: {
            // 历史记录
            historyTime() {
                $('#history').modal({backdrop: 'static'});
            },
            search() {
                this.special(this.params.page);
            },

            special (val){
                this.params.page = val;
                this.$http.get('bulletin/special/specialBulletinIndex', {
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '80010') {
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
//            日期筛选
            getDate(date) {
                this.params.date_range = date;
                this.special(1);
            },
//            部门搜索
            select() {
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {length: 1};
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
                this.special(1);
            },
//            清空部门
            clearSelect() {
                this.params.department_id = '';
                this.params.staff_id = '';
                this.selected = '';
                this.special(1);
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
                this.params.search = '';
                this.params.department_id = '';
                this.params.staff_id ='';
                this.params.page = 1;
                this.collect_or_rent = 1;
                this.selected ='';
                this.currentDate = [];
                this.pitch = [];
                this.special(1);
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

</style>
