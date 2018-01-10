<template>
    <div>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div style="margin: 0 0 6px 2px;">
                    收租地址不符：<span class="text-danger">{{unrelated_num}}</span>&nbsp;条
                </div>
                <div v-if="col_pitch.length == 0 && ren_pitch.length == 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="form-group">
                            <select class="form-control" v-model="url_address" @change="search(1)">
                                <option value="candidate">全部</option>
                                <option value="unrelated">未关联</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="selecteds" @click='select(1)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect(1)">清空</button>
                            </span>
                        </div>
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="params.search" placeholder="房屋地址/客户名"
                                   @keyup.enter="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="input-group has-js" style="height: 39px;">
                            <label style="margin: 11px;padding-left: 25px;"
                                   :class="{'label_check':true,'c_on':params.unmarked == 1,'c_off':params.unmarked != 1}"
                                   @click.prevent="mismatching($event, 1)">
                                <input type="checkbox" :value="params.unmarked" :checked="params.unmarked == 1">标记不匹配
                            </label>
                        </div>

                        <div class="input-group has-js" style="height: 39px;">
                            <label style="margin: 11px;padding-left: 25px;"
                                   :class="{'label_check':true,'c_on':params.mark_cg == 1,'c_off':params.mark_cg != 1}"
                                   @click.prevent="mismatching($event, 2)">
                                <input type="checkbox" :value="params.mark_cg" :checked="params.mark_cg == 1">已充公
                            </label>
                        </div>

                        <div class="input-group has-js" style="height: 39px;">
                            <label style="margin: 11px;padding-left: 25px;"
                                   :class="{'label_check':true,'c_on':params.mark_2nd == 1,'c_off':params.mark_2nd != 1}"
                                   @click.prevent="mismatching($event, 3)">
                                <input type="checkbox" :value="params.mark_2nd" :checked="params.mark_2nd == 1">二次出租
                            </label>
                        </div>

                        <div class="input-group has-js" style="height: 39px;">
                            <label style="margin: 11px;padding-left: 25px;"
                                   :class="{'label_check':true,'c_on':params.mark_jt == 1,'c_off':params.mark_jt != 1}"
                                   @click.prevent="mismatching($event, 4)">
                                <input type="checkbox" :value="params.mark_jt" :checked="params.mark_jt == 1">鸡腿包
                            </label>
                        </div>

                        <!--<div class="input-group pull-right">-->
                        <!--<router-link :to="{path: '/flatShare', query: {id: 1}}" class="btn btn-warning">合租房</router-link>-->
                        <!--<router-link :to="{path: '/noPerformance', query: {id: 1}}" class="btn btn-warning"-->
                        <!--style="margin-left: 10px;">未生成业绩-->
                        <!--</router-link>-->
                        <!--</div>-->
                    </form>
                </div>

                <!--选中一个以上-->
                <div v-if="col_pitch.length > 0 || ren_pitch.length > 0" class="col-lg-12 remind">
                    <div class="pull-right">
                        <button class="btn btn-success" @click="empty_pitch">重置</button>
                    </div>
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{col_pitch.length + ren_pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="revise_staff">编辑</a></h5>
                        </li>
                        <li>
                            <h5><a @click="not_generate">不生成业绩</a></h5>
                        </li>
                        <li>
                            <h5><a @click="closeUnmark">清除部门标记</a></h5>
                        </li>
                        <li v-if="col_pitch.length == 1 || ren_pitch.length == 1">
                            <h5><a @click="badge(2)">充公</a></h5>
                        </li>
                        <li>
                            <h5><a @click="badge(3)">二次出租</a></h5>
                        </li>
                        <li>
                            <h5><a @click="badge(1)">鸡腿包</a></h5>
                        </li>
                        <li>
                            <h5><a @click="unbadge()">取消</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--取消标记-->
        <div role="dialog" class="modal fade bs-example-modal-sm has-js" id="unbadge">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">取消标记</h4>
                    </div>
                    <div class="modal-body badges">
                        <div @click="active(2)" :class="{'text-primary':isActive == 2}">充公</div>
                        <div @click="active(3)" :class="{'text-primary':isActive == 3}">二次出租</div>
                        <div @click="active(1)" :class="{'text-primary':isActive == 1}">鸡腿包</div>
                    </div>
                    <div class="modal-footer text-right">
                        <button @click="unmark" class="btn btn-primary btn-md">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <section class="panel table table-responsive roll has-js">
            <table class="table table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th class="width80"></th>
                    <th class="text-center width100" style="padding-right: 0">生成日期</th>
                    <th style="padding-left: 0"></th>
                    <th class="text-center width100">房屋地址</th>
                    <th class="text-center width80">收租状态</th>
                    <th class="text-center width80">收房月数</th>
                    <th class="text-center width80">付款方式</th>
                    <th class="text-center width80">月单价</th>
                    <th class="text-center width80">已收金额</th>
                    <th class="text-center width80">签约人</th>
                    <th class="text-center width100">部门</th>
                    <th class="text-center width100">负责人</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-for="item in ach_create" :class="{'red': item.salary_candidate == 2}">
                    <td class="text-left">
                        <!--房东-->
                        <label v-if="item.identity == 1 && item.salary_candidate != 2"
                               :class="{'label_check':true,'c_on':col_pitch.indexOf(item.id) > -1,'c_off':col_pitch.indexOf(item.id)==-1}"
                               @click.prevent="pitchId(item.id, $event,item.identity)">
                            <input type="checkbox" class="pull-left"
                                   :checked="col_pitch.indexOf(item.id) > -1">
                        </label>
                        <!--租客-->
                        <label v-if="item.identity == 2 && item.salary_candidate != 2"
                               :class="{'label_check':true,'c_on':ren_pitch.indexOf(item.id) > -1,'c_off':ren_pitch.indexOf(item.id)==-1}"
                               @click.prevent="pitchId(item.id, $event,item.identity)">
                            <input type="checkbox" class="pull-left"
                                   :checked="ren_pitch.indexOf(item.id) > -1">
                        </label>

                        <label v-if="(item.identity == 1 || 2) && item.salary_candidate == 2 && item.generate_time == null"
                               @click="create_generate(item.id, item.identity)">
                            <i class="fa fa-rotate-left" style="padding-left: 3px;font-size: 16px;"></i>
                        </label>

                        <div class="handle" v-if="item.freeze == 1">待</div>
                    </td>
                    <td style="padding-right: 0">{{item.create_time}}</td>
                    <td style="padding-left: 0">
                        <label v-if="(item.identity != 1 || 2) && item.generate_time != null" style="margin-top: 1px;float: right;">
                            <i class="fa fa-check-circle" style="font-size: 22px; color: #0EC641;"></i>
                        </label>
                    </td>
                    <td>
                        {{item.address}}
                        <span v-if="item.related == 2" class="fa fa-home text-danger" style="cursor: pointer"
                              @click="selectHouse(item.id)"></span>
                        <span style="line-height: 9px;" v-if="item.identity == 1"
                              class="btn btn-danger btn-xs" @click="look_detail(item.id, 'land')">F</span>
                        <span style="line-height: 9px;" v-if="item.identity == 2"
                              class="btn btn-danger btn-xs" @click="look_detail(item.id, 'renter')">Z</span>
                        <span class="text-primary" v-if="item.mark_2nd == 1">二次出租</span>
                        <span class="text-danger" v-if="item.mark_jt == 1">鸡腿包</span>
                        <span class="text-info" v-if="item.mark_cg == 1">已充公</span>
                    </td>

                    <td>{{dict.typical[item.typical]}}</td>
                    <td>{{item.months}}</td>
                    <td>{{item.pay_types}}</td>
                    <td>{{item.prices}}</td>
                    <td>
                        <span v-if="item.received != null">
                            {{item.received}}
                        </span>
                        <span v-else="">
                            /
                        </span>
                    </td>
                    <td>{{item.real_name}}</td>
                    <td><i class="fa fa-chain-broken text-danger"
                           v-show="item.collect_unmarked == 1"></i>&nbsp;
                        {{item.salary_department_name}}
                    </td>
                    <td>{{item.salary_leader_name}}</td>
                </tr>
                <tr v-if="isShow">
                    <td colspan="14" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
        <div role="dialog" class="modal fade bs-example-modal-sm" id="revise">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">选择</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group" style="margin-bottom: 16px;">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="department_name" @click='select(2)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect(2)">清空</button>
                            </span>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择负责人"
                                   v-model="staff_name" @click='select(3)' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect(3)">清空</button>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                        <button class="btn btn-primary btn-md" @click="branch_tab">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <!--人资筛选-->
        <Organization :configure="configure" @Staff="selectDateSend" :msg="msg"></Organization>

        <!--人资选择部门-->
        <Organization :configure="configure" @Staff="selectDateSend" :msg="msg"></Organization>

        <!--人资选择负责人-->
        <Department :configure="configure" @Staff="selectDateSend"></Department>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="params.page"></Page>

        <!--租客-->
        <NewRenterAdd :list="myRentlordList" @success_="house_search" :house="house_status"></NewRenterAdd>

        <Status :state='info'></Status>

        <!--查看详情-->
        <DetailInfo :msg="detail_info" :dict="detailInfo" :detail="detail"></DetailInfo>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Organization from './organization_choose.vue'
    import Department from '../../common/oraganization.vue'
    import Page from  '../../common/page.vue'
    import DatePicker from '../../common/datePicker.vue'
    import Confirm from '../../common/confirm.vue'
    import NewClientAdd from  '../../finance/clientManage/newLandlordAdd.vue'               //房东
    import NewRenterAdd from  '../../finance/clientManage/newRenterAdd.vue'                 //租客
    import DetailInfo from '../../finance/payment/detail_info.vue'
    export default{
        props: ['msg', 'scope_time'],
        components: {
            Organization,
            Page,
            Status,
            Department,
            DatePicker,
            NewClientAdd,
            NewRenterAdd,
            Confirm,
            DetailInfo
        },
        data(){
            return {
                isActive: '',
                confiscate: '',                 //充公
                detail_info: [],
                detail: '',
                detailInfo: {},
                house_status: '',                   //房屋新增不显示
                unrelated_num: '',
                url_address: 'candidate',           //关联/未关联筛选
                myRentlordList: {},
                dict: {},
                tabs: '',
                ach_create: [],
                paging: '',
                isShow: false,
                col_pitch: [],
                ren_pitch: [],
                params: {
                    unmarked: '',
                    search: '',                     //关键字
                    salary_department_id: '',       //部门ID
                    range: '',                      //时间筛选
                    mark_2nd: '',
                    mark_jt: '',
                    mark_cg: '',
                    page: 1
                },
                selecteds: '',                      //部门名称
                configure: {},                      //部门组件
                department_id: '',                  //部门ID
                department_name: '',                //部门名称
                leader_id: '',                       //负责人ID
                staff_name: '',                     //负责人名称

                currentDate: [],
                dateConfigure: [                    //日期范围选择
                    {
                        range: true,
                        needHour: true,
                    }
                ],
//                confirmMsg: [],                     //删除
                info: {                             //提示信息
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
            this.$http.get('salary/Commission/dict').then((res) => {
                this.dict = res.data;
                this.create_ach(1);
            });
            this.$http.get('revenue/glee_collect/dict').then((res) => {
                this.detailInfo = res.data;
            });
        },
        watch: {
            scope_time (val){
                this.params.range = val;
                this.currentDate = [];
                this.currentDate.push(val.split('to')[0]);
                this.currentDate.push(val.split('to')[1]);
                this.search(1);
            },
        },
        methods: {
//            取消部门标记
            closeUnmark (){
                this.$http.post('finance/customer/unmark', {
                    collect: this.col_pitch,
                    rent: this.ren_pitch,
                }).then((res) => {
                    if (res.data.code === '90000') {
                        this.successMsg(res.data.msg);
                        this.search(this.params.page);
                        this.empty_pitch();
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },

//            取消标记
            unbadge (){
                $('#unbadge').modal({backdrop: 'static'});
                this.isActive = '';
            },
            unmark (){
                this.$http.post('finance/customer/unmark_extra', {
                    type: this.isActive,
                    collect: this.col_pitch,
                    rent: this.ren_pitch,
                }).then((res) => {
                    if (res.data.code === '90000') {
                        this.successMsg(res.data.msg);
                        this.search(this.params.page);
                        this.empty_pitch();
                        $('#unbadge').modal('hide');
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            active(val){
                this.isActive = val;
            },
//            标记
            badge (val){
                if (val === 1 || val === 3) {
                    this.$http.post('finance/customer/mark_extra', {
                        type: val,
                        collect: this.col_pitch,
                        rent: this.ren_pitch,
                    }).then((res) => {
                        if (res.data.code === '90000') {
                            this.successMsg(res.data.msg);
                            this.search(this.params.page);
                            this.empty_pitch();
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    })
                }
                if (val === 2) {
                    let type;
                    if (this.confiscate === 1) {
                        type = this.col_pitch[0];
                    } else {
                        type = this.ren_pitch[0];
                    }
                    this.$http.post('finance/customer/confiscate', {
                        type: this.confiscate,
                        id: type,
                    }).then((res) => {
                        if (res.data.code === '90010') {
                            this.successMsg(res.data.msg);
                            this.search(this.params.page);
                            this.empty_pitch();
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    })
                }
            },
//            查看收租详情
            look_detail (val, del){
                this.detail_info = [];
                if (del === 'land') {
                    this.$http.get('finance/customer/collect/' + val).then((res) => {
                        if (res.data.code === '90010') {
                            this.detail_info.push(res.data.data);
                            this.detail = del;
                            $('#detail_info').modal({backdrop: 'static',});
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    });
                } else if (del === 'renter') {
                    this.$http.get('finance/customer/rent/' + val).then((res) => {
                        if (res.data.code === '90010') {
                            this.detail_info.push(res.data.data);
                            this.detail = del;
                            $('#detail_info').modal({backdrop: 'static',});
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    });
                }

            },
//            标记不匹配
            mismatching (ev, val){
                let evInput = ev.target.getElementsByTagName('input')[0];
                if (val === 1) {
                    evInput.checked = !evInput.checked;
                    if (evInput.checked && val === 1) {
                        this.params.unmarked = 1;
                    } else {
                        this.params.unmarked = '';
                    }
                }
                if (val === 2) {
                    evInput.checked = !evInput.checked;
                    if (evInput.checked && val === 2) {
                        this.params.mark_cg = 1;
                    } else {
                        this.params.mark_cg = '';
                    }
                }
                if (val === 3) {
                    evInput.checked = !evInput.checked;
                    if (evInput.checked && val === 3) {
                        this.params.mark_2nd = 1;
                    } else {
                        this.params.mark_2nd = '';
                    }
                }
                if (val === 4) {
                    evInput.checked = !evInput.checked;
                    if (evInput.checked && val === 4) {
                        this.params.mark_jt = 1;
                    } else {
                        this.params.mark_jt = '';
                    }
                }
                this.search(1);
            },
//            搜索
            search(val){
                this.create_ach(val);
            },
            house_search (){
                this.create_ach(this.params.page);
            },
//            列表
            create_ach (val){
                this.params.page = val;
                this.ach_create = [];
                this.paging = '';
                this.$http.get('finance/customer/' + this.url_address, {
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.ach_create = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                        this.$http.get('finance/customer/urc', {
                            params: this.params,
                        }).then((res) => {
                            if (res.data.code === '90010') {
                                this.unrelated_num = res.data.data;
                            }
                        })
                    } else {
                        this.isShow = true;
                    }
                })
            },
//            选中
            pitchId (rul, ev, val){
                this.confiscate = val;
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (val === 1) {
                    if (evInput.checked) {
                        this.col_pitch.push(rul);
                    } else {
                        let index = this.col_pitch.indexOf(rul);
                        if (index > -1) {
                            this.col_pitch.splice(index, 1);
                        }
                    }
                } else if (val === 2) {
                    if (evInput.checked) {
                        this.ren_pitch.push(rul);
                    } else {
                        let index = this.ren_pitch.indexOf(rul);
                        if (index > -1) {
                            this.ren_pitch.splice(index, 1);
                        }
                    }
                }
            },
//            清空pitch
            empty_pitch (){
                this.col_pitch = [];
                this.ren_pitch = [];
            },
//            清空部门标记ID
            close_ (){
                this.department_id = '';
                this.department_name = '';
                this.staff_name = '';
                this.leader_id = '';
            },
//            部门标记
            branch_tab (){
                this.$http.post('finance/customer/mark', {
                    department_id: this.department_id,
                    leader_id: this.leader_id,
                    collect: this.col_pitch,
                    rent: this.ren_pitch
                }).then((res) => {
                    if (res.data.code === '90000') {
                        $('#revise').modal('hide');
                        this.search(this.params.page);
                        this.successMsg(res.data.msg);
                        this.empty_pitch();
                    } else {
                        this.errorMsg(res.data.msg);
                        this.close_();
                    }
                })
            },
//            不生成业绩
            not_generate (){
                this.$http.post('finance/customer/unstage', {
                    collect: this.col_pitch,
                    rent: this.ren_pitch,
                }).then((res) => {
                    if (res.data.code === '90000') {
                        this.search(this.params.page);
                        this.successMsg(res.data.msg);
                        this.empty_pitch();
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            重新生成业绩
            create_generate (id, iden){
                let iden1 = [];
                let iden2 = [];
                if (iden === 1) {
                    iden1.push(id);
                } else if (iden === 2) {
                    iden2.push(id);
                }
                this.$http.post('finance/customer/stage', {
                    collect: iden1,
                    rent: iden2
                }).then((res) => {
                    if (res.data.code === '90000') {
                        this.successMsg(res.data.msg);
                        this.search(this.params.page);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            编辑
            revise_staff (){
                this.close_();
                $('#revise').modal({backdrop: 'static',});
            },
//            编辑房屋
            selectHouse (id){
                this.$http.get('finance/customer/rent/' + id).then((res) => {
                    if (res.data.code === '90010') {
                        $('#newRenterAdd').modal({backdrop: 'static',});
                        this.house_status = 1;
                        this.myRentlordList = res.data.data;
                    }
                })
            },

//            时间搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },
//            筛选部门选择
            select(val){
                this.tabs = val;
                if (val === 1) {
                    $('.OrganizationChoose:eq(0)').modal({backdrop: 'static',});
                    this.configure = {type: 'department', length: 1};
                } else if (val === 2) {
                    $('.OrganizationChoose:eq(1)').modal({backdrop: 'static',});
                    this.configure = {type: 'department', length: 1};
                } else if (val === 3) {
                    $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                    this.configure = {type: 'staff', length: 1};
                }
            },
//            筛选部门选择
            selectDateSend (val){
                if (val.department.length > 0 || val.staff.length > 0) {
                    if (this.tabs === 1) {
                        this.selecteds = val.department[0].name;
                        this.params.salary_department_id = val.department[0].id;
                        this.search(1);
                    } else if (this.tabs === 2) {
                        this.department_name = val.department[0].name;
                        this.department_id = val.department[0].id;
                        this.$http.get('achv/department/' + val.department[0].id).then((res) => {
                            if (res.data.data.leader !== null) {
                                this.staff_name = res.data.data.leader.real_name;
                                this.leader_id = res.data.data.leader.id;
                            }
                        });
                    } else if (this.tabs === 3) {
                        this.staff_name = val.staff[0].name;
                        this.leader_id = val.staff[0].id;
                    }
                }
            },
//            筛选清空部门
            clearSelect(val){
                if (val === 1) {
                    if (this.selecteds.length === 0) {
                        return;
                    }
                    this.params.salary_department_id = [];
                    this.selecteds = [];
                    this.search(1);

                } else if (val === 2) {
                    this.department_id = '';
                    this.department_name = '';

                } else if (val === 3) {
                    this.staff_name = '';
                    this.leader_id = '';
                }
            },
////            删除
//            delete_info (){
//                this.confirmMsg = {msg: '确定删除吗？'};
//                $('#confirm').modal('show');
//            },
////            确定删除
//            getConfirm (){
//                this.$http.post('').then((res) => {
//
//                })
//            },
            successMsg(msg){
                //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){
                //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
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

    .badges {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
    }

    .badges div {
        cursor: pointer;
        margin: 12px 0;
    }

    .badges div:nth-of-type(even) {
        margin: 12px 60px;
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

    .selected {
        background: #FFFF6F !important;
    }

    .red {
        color: #e4393c;
        background: #CCCCCC;
    }

    .handle {
        float: right;
        padding: 4px 6px;
        background: #bbb;
        border-radius: 50%;
    }
</style>
