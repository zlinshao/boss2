<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
        </ol>
        <section class="panel">
            <div class="panel-body clearFix">

                <div v-show="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
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
                            <input type="text" class="form-control" placeholder="业务员姓名/地址" v-model="params.staff_name"
                                   @keydown.enter.prevent="search(remark_term.tabs, 1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button"
                                        @click="search(remark_term.tabs, 1)">搜索</button>
                            </span>
                        </div>
                        <div class="input-group">
                            <a :href="address_url + 'export/salary/searchByStaff?generate_date='+ this.params.generate_date + '&staff_name=' + this.params.staff_name + '&department_id=' +this.params.department_id"
                               class="btn btn-success">导出</a>
                        </div>
                        <div class="pull-right" style="margin-left: 10px;">
                            <a class="btn btn-success" @click="time_choose">生成工资</a>
                        </div>
                        <div class="pull-right">
                            <router-link class="btn btn-success"
                                         :to="{path:'/periodicDetail',query: {sear: params, department: selected}}">详情
                            </router-link>
                        </div>
                    </form>
                </div>
                <!--生成工资-->
                <div role="dialog" class="modal fade bs-example-modal-sm" id="time_choose">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                                <h4 class="modal-title">月份选择</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <DatePicker :dateConfigure="dateConfigures" :currentDate="currentDates"
                                                @sendDate="getDates" :idName="'code'"></DatePicker>
                                </div>
                            </div>
                            <div class="modal-footer text-right">
                                <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                                <button class="btn btn-primary btn-md" @click="generating_ok">确认</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--选中-->
                <div class="col-lg-12 remind" v-show="pitch.length > 0">
                    <ul class="pull-left" style="margin-bottom: 0;">
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5 @click="add_remark"><a>增加备注</a></h5>
                        </li>
                    </ul>
                    <div class="pull-right">
                        <a class="btn btn-success" @click="time_choose">生成工资</a>
                    </div>
                </div>
            </div>
        </section>
        <div class="col-xs-12" style="padding: 0;margin: 15px 0;">
            <section class="panel">
                <header class="panel-heading tab-bg-dark-navy-blue ">
                    <ul class="nav nav-tabs">
                        <!--<li :class="{'active': remark_term.tabs == 1}">-->
                        <!--<a data-toggle="tab" href="#company" @click="empty_search(1, 1)">-->
                        <!--公司-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li :class="{'active': remark_term.tabs == 2}">-->
                        <!--<a data-toggle="tab" href="#area" @click="empty_search(2, 1)">-->
                        <!--区域-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li :class="{'active': remark_term.tabs == 3}">-->
                        <!--<a data-toggle="tab" href="#group" @click="empty_search(3, 1)">-->
                        <!--小组-->
                        <!--</a>-->
                        <!--</li>-->
                        <li :class="{'active': remark_term.tabs == 4}">
                            <a data-toggle="tab" href="#personal"> <!--@click="empty_search(4, 1)"-->
                                个人
                            </a>
                        </li>
                    </ul>
                </header>
                <div class="panel-body">
                    <div class="tab-content">
                        <!--<div id="company" class="tab-pane" :class="{'active': remark_term.tabs == 1}">-->
                        <!--&lt;!&ndash;公司&ndash;&gt;-->
                        <!--<section class="panel table table-responsive roll has-js">-->
                        <!--<table class="table table-advance table-hover">-->
                        <!--<thead>-->
                        <!--<tr>-->
                        <!--<th></th>-->
                        <!--<th class="text-center width100">名称</th>-->
                        <!--<th class="text-center width100">收房(套)</th>-->
                        <!--<th class="text-center width100">租房(套)</th>-->
                        <!--<th class="text-center width80">实际业绩</th>-->
                        <!--<th class="text-center width80">溢出业绩</th>-->
                        <!--<th class="text-center width100">所属部门</th>-->
                        <!--<th class="text-center width50">备注</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr class="text-center" v-for="item in company">-->
                        <!--<td>-->
                        <!--<label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,-->
                        <!--'c_off':pitch.indexOf(item.id)==-1}"-->
                        <!--@click.prevent="checked_id(item.id, $event, item.name, item.target_id)">-->
                        <!--<input type="checkbox" class="pull-left"-->
                        <!--:checked="pitch.indexOf(item.id) > -1">-->
                        <!--</label>-->
                        <!--</td>-->
                        <!--<td>{{item.name}}</td>-->
                        <!--<td>{{item.collect_count}}</td>-->
                        <!--<td>{{item.rent_count}}</td>-->
                        <!--<td>{{item.sum_real}}</td>-->
                        <!--<td>{{item.sum_overflow}}</td>-->
                        <!--<td>{{item.department}}</td>-->
                        <!--<td>-->
                        <!--<i class="fa fa-book" @click="lookRemarks(item.name, item.target_id)"-->
                        <!--v-if="target_show.indexOf(item.target_id) > -1"></i>-->
                        <!--</td>-->
                        <!--</tr>-->
                        <!--<tr class="text-center" v-if="com_show">-->
                        <!--<td colspan="12" style="font-size: 22px;">暂无数据......</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                        <!--</table>-->
                        <!--</section>-->
                        <!--</div>-->
                        <!--<div id="area" class="tab-pane" :class="{'active': remark_term.tabs == 2}">-->
                        <!--&lt;!&ndash;区域&ndash;&gt;-->
                        <!--<section class="panel table table-responsive roll has-js">-->
                        <!--<table class="table table-advance table-hover">-->
                        <!--<thead>-->
                        <!--<tr>-->
                        <!--<th></th>-->
                        <!--<th class="text-center width100">名称</th>-->
                        <!--<th class="text-center width100">收房(套)</th>-->
                        <!--<th class="text-center width100">租房(套)</th>-->
                        <!--<th class="text-center width80">实际业绩</th>-->
                        <!--<th class="text-center width80">溢出业绩</th>-->
                        <!--<th class="text-center width100">所属部门</th>-->
                        <!--<th class="text-center width50">备注</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr class="text-center" v-for="item in area">-->
                        <!--<td>-->
                        <!--<label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,-->
                        <!--'c_off':pitch.indexOf(item.id)==-1}"-->
                        <!--@click.prevent="checked_id(item.id, $event, item.name, item.target_id)">-->
                        <!--<input type="checkbox" class="pull-left"-->
                        <!--:checked="pitch.indexOf(item.id) > -1">-->
                        <!--</label>-->
                        <!--</td>-->
                        <!--<td>{{item.name}}</td>-->
                        <!--<td>{{item.collect_count}}</td>-->
                        <!--<td>{{item.rent_count}}</td>-->
                        <!--<td>{{item.sum_real}}</td>-->
                        <!--<td>{{item.sum_overflow}}</td>-->
                        <!--<td>{{item.department}}</td>-->
                        <!--<td>-->
                        <!--<i class="fa fa-book" @click="lookRemarks(item.name, item.target_id)"-->
                        <!--v-if="target_show.indexOf(item.target_id) > -1"></i>-->
                        <!--</td>-->
                        <!--</tr>-->
                        <!--<tr class="text-center" v-if="area_show">-->
                        <!--<td colspan="11" style="font-size: 22px;">暂无数据......</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                        <!--</table>-->
                        <!--</section>-->
                        <!--</div>-->
                        <!--<div id="group" class="tab-pane" :class="{'active': remark_term.tabs == 3}">-->
                        <!--&lt;!&ndash;小组&ndash;&gt;-->
                        <!--<section class="panel table table-responsive roll has-js">-->
                        <!--<table class="table table-advance table-hover">-->
                        <!--<thead>-->
                        <!--<tr>-->
                        <!--<th></th>-->
                        <!--<th class="text-center width100">名称</th>-->
                        <!--<th class="text-center width100">收房(套)</th>-->
                        <!--<th class="text-center width100">租房(套)</th>-->
                        <!--<th class="text-center width80">实际业绩</th>-->
                        <!--<th class="text-center width80">溢出业绩</th>-->
                        <!--<th class="text-center width100">所属部门</th>-->
                        <!--<th class="text-center width50">备注</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr class="text-center" v-for="item in group">-->
                        <!--<td>-->
                        <!--<label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,-->
                        <!--'c_off':pitch.indexOf(item.id)==-1}"-->
                        <!--@click.prevent="checked_id(item.id, $event, item.name, item.target_id)">-->
                        <!--<input type="checkbox" class="pull-left"-->
                        <!--:checked="pitch.indexOf(item.id) > -1">-->
                        <!--</label>-->
                        <!--</td>-->
                        <!--<td>{{item.name}}</td>-->
                        <!--<td>{{item.collect_count}}</td>-->
                        <!--<td>{{item.rent_count}}</td>-->
                        <!--<td>{{item.sum_real}}</td>-->
                        <!--<td>{{item.sum_overflow}}</td>-->
                        <!--<td>{{item.department}}</td>-->
                        <!--<td>-->
                        <!--<i class="fa fa-book" @click="lookRemarks(item.name, item.target_id)"-->
                        <!--v-if="target_show.indexOf(item.target_id) > -1"></i>-->
                        <!--</td>-->
                        <!--</tr>-->
                        <!--<tr class="text-center" v-if="group_show">-->
                        <!--<td colspan="11" style="font-size: 22px;">暂无数据......</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                        <!--</table>-->
                        <!--</section>-->
                        <!--</div>-->
                        <div id="personal" class="tab-pane" :class="{'active': remark_term.tabs == 4}">
                            <!--个人-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center width100">名称</th>
                                        <th class="text-center width100">收房(套)</th>
                                        <th class="text-center width100">租房(套)</th>
                                        <th class="text-center width80">实际业绩</th>
                                        <th class="text-center width80">溢出业绩</th>
                                        <th class="text-center width100">所属部门</th>
                                        <th class="text-center width50">备注</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center" v-for="item in personal">
                                        <td>
                                            <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                            'c_off':pitch.indexOf(item.id)==-1}"
                                                   @click.prevent="checked_id(item.id, $event, item.name, item.target_id)">
                                                <input type="checkbox" class="pull-left"
                                                       :checked="pitch.indexOf(item.id) > -1">
                                            </label>
                                        </td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.collect_count}}</td>
                                        <td>{{item.rent_count}}</td>
                                        <td>{{item.sum_real}}</td>
                                        <td>{{item.sum_overflow}}</td>
                                        <td>{{item.department}}</td>
                                        <td>
                                            <i class="fa fa-book" @click="lookRemarks(item.name, item.target_id)"
                                               v-if="target_show.indexOf(item.target_id) > -1"></i>
                                        </td>
                                    </tr>
                                    <tr class="text-center" v-if="per_show">
                                        <td colspan="11" style="font-size: 22px;">暂无数据......</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!--查看备注-->
        <lookRemark @Remark="search" :msg="remark_term"></lookRemark>

        <!--人资筛选-->
        <Organization :configure="configure" @Staff="selectDateSend" :msg="msg"></Organization>

        <!--分页-->
        <Page @pag="search_page" :pg="paging" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'                               //时间
    import lookRemark from './lookRemark.vue'                                       //备注
    import Organization from  '../finance/organization/organization_choose.vue'     //部门搜索
    import Status from '../common/status.vue'
    import Page from '../common/page.vue'
    export default {
        components: {DatePicker, Organization, lookRemark, Page,Status},
        data (){
            return {
                address_url: globalConfig.server,
                generating: '',                     //月份选择
                pitch: [],                          //选中ID
                remark_info: [],                    //备注信息
                targetId: [],                       //备注ID
                target_show: [],                    //有无备注
                params: {
                    generate_date: '',              //日期
                    staff_name: '',                 //模糊搜索
                    city_id: '',                    //公司
                    region_id: '',                  //区域
                    district_id: '',                //小组
                    department_id: '',              //部门
                    page: '',                       //分页
                },
                selected: [],                       //部门名称
                configure: {},                      //部门组件参数
                paging: '',                         //总页数
                beforePage: 1,
//                查看备注
                remark_term: {
                    range: '',                      //当月时间
                    tabs: 4,                        //标签页切换
                    addRemark: '',                  //增加备注
                    remark_obj: '',                 //备注对象
                    remark_con: '',                 //备注内容
                    remark_targetId: '',            //新增备注ID
                },
                currentDate: [],                    //日期组件参数
                dateConfigure: [
                    {
                        range: true,                //日期组件参数
                        needHour: false
                    }
                ],
                currentDates: [],                    //月份选择
                dateConfigures: [
                    {
                        range: false,                //月份选择
                        needHour: false
                    }
                ],
                company: [],                        //公司
                com_show: false,
                area: [],                           //区域
                area_show: false,
                group: [],                          //小组
                group_show: false,
                personal: [],                       //个人
                per_show: false,
                msg: {
                    period: '',             //周期
                    time: '',               //时间
                },
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
        mounted (){
            this.personalList(4, 1);
            this.times();
        },
        methods: {
//            月份选择
            time_choose (){
                this.generating = '';
                this.currentDates = [];
                $('#time_choose').modal({backdrop: 'static',});
            },
//            当月时间
            times (){
                this.$http.get('periodic/current').then((res) => {
                    this.remark_term.range = res.data;
                });
            },
//            日期搜索
            getDate(data){
                if (data === '') {
                    this.times();
                }
                this.remark_term.range = data;
                this.params.generate_date = data;
                this.search(this.remark_term.tabs, 1);
            },
//            月份选择
            getDates(data){
                this.generating = data;
            },
//            生成工资
            generating_ok (){
                this.$http.get('salary/view/generate/' + this.generating).then((res) => {
                    if (res.data.code === '70010') {
                        $('#time_choose').modal('hide');
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            search (val){
                this.personalList(val, this.beforePage);
            },
//            分页
            search_page (val){
                this.personalList(this.remark_term.tabs, val);
            },

//            清空搜索
            empty_search (val){
                this.params.staff_name = '';
                this.params.city_id = '';
                this.params.region_id = '';
                this.params.district_id = '';
                this.params.department_id = '';
                this.personalList(val, 1);
                this.times();
            },
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
//            列表
            personalList (val, page){
                this.pitch = [];
                this.remark_term.tabs = val;
                this.params.page = page;
                this.beforePage = page;
                this.paging = '';
//                if (val === 1) {
////                公司
//                    this.$http.get('salary/periodic/searchByCity', {
//                        params: this.params
//                    }).then((res) => {
//                        this.targetId = [];
//                        if (res.data.code === '70010') {
//                            this.company = res.data.data.data;
//                            this.paging = res.data.data.pages;
//                            this.com_show = false;
//
//                            for (let i = 0; i < this.company.length; i++) {
//                                this.targetId.push(this.company[i].target_id);
//                            }
//                            this.$http.get('salary/periodic_remark', {
//                                params: {
//                                    scope: val,
//                                    range: this.params.generate_date,
//                                    target_id: this.targetId,
//                                }
//                            }).then((res) => {
//                                this.target_show = [];
//                                this.remark_info = res.data.data;
//                                if (res.data.code === '70010') {
//                                    for (let i = 0; i < res.data.data.length; i++) {
//                                        this.target_show.push(res.data.data[i].target_id);
//                                    }
//                                }
//                            })
//                        } else {
//                            this.company = [];
//                            this.com_show = true;
//                        }
//                    });
//                }
//                if (val === 2) {
////                小组
//                    this.$http.get('salary/periodic/searchByRegion', {
//                        params: this.params
//                    }).then((res) => {
//                        this.targetId = [];
//                        if (res.data.code === '70010') {
//                            this.area = res.data.data.data;
//                            this.paging = res.data.data.pages;
//                            this.area_show = false;
//
//                            for (let i = 0; i < this.area.length; i++) {
//                                this.targetId.push(this.area[i].target_id);
//                            }
//                            this.$http.get('salary/periodic_remark', {
//                                params: {
//                                    scope: val,
//                                    range: this.params.generate_date,
//                                    target_id: this.targetId,
//                                }
//                            }).then((res) => {
//                                this.target_show = [];
//                                this.remark_info = res.data.data;
//                                if (res.data.code === '70010') {
//                                    for (let i = 0; i < res.data.data.length; i++) {
//                                        this.target_show.push(res.data.data[i].target_id);
//                                    }
//                                }
//                            })
//                        } else {
//                            this.area = [];
//                            this.area_show = true;
//                        }
//                    });
//                }
//                if (val === 3) {
////                区域
//                    this.$http.get('salary/periodic/searchByDistrict', {
//                        params: this.params
//                    }).then((res) => {
//                        this.targetId = [];
//                        if (res.data.code === '70010') {
//                            this.group = res.data.data.data;
//                            this.paging = res.data.data.pages;
//                            this.group_show = false;
//
//                            for (let i = 0; i < this.group.length; i++) {
//                                this.targetId.push(this.group[i].target_id);
//                            }
//                            this.$http.get('salary/periodic_remark', {
//                                params: {
//                                    scope: val,
//                                    range: this.params.generate_date,
//                                    target_id: this.targetId,
//                                }
//                            }).then((res) => {
//                                this.target_show = [];
//                                this.remark_info = res.data.data;
//                                if (res.data.code === '70010') {
//                                    for (let i = 0; i < res.data.data.length; i++) {
//                                        this.target_show.push(res.data.data[i].target_id);
//                                    }
//                                }
//                            })
//                        } else {
//                            this.group = [];
//                            this.group_show = true;
//                        }
//                    });
//                }
                if (val === 4) {
//                个人
                    this.$http.get('salary/periodic/searchByStaff', {
                        params: this.params
                    }).then((res) => {
                        this.targetId = [];
                        if (res.data.code === '70010') {
                            this.personal = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.per_show = false;

                            for (let i = 0; i < this.personal.length; i++) {
                                this.targetId.push(this.personal[i].target_id);
                            }
                            this.$http.get('salary/periodic_remark', {
                                params: {
                                    scope: val,
                                    range: this.params.generate_date,
                                    target_id: this.targetId,
                                }
                            }).then((res) => {
                                this.target_show = [];
                                this.remark_info = res.data.data;
                                if (res.data.code === '70010') {
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        this.target_show.push(res.data.data[i].target_id);
                                    }
                                }
                            })
                        } else {
                            this.personal = [];
                            this.per_show = true;
                        }
                    });
                }
            },
//            部门搜索
            select (){
                this.$http.get('salary/calendar/current').then((res) => {
                    this.msg.time = res.data.data.month;
                    this.msg.period = res.data.data.rank;
                    $('.OrganizationChoose:eq(0)').modal({backdrop: 'static',});
                    this.configure = {type: 'department', length: 1};
                });
            },

//            部门搜索
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected = val.department[i].name;
                    this.params.city_id = val.department[i].id;
                    this.params.region_id = val.department[i].id;
                    this.params.district_id = val.department[i].id;
                    this.params.department_id = val.department[i].id;
                }
                this.search(this.remark_term.tabs, 1);
            },

//            重置部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.city_id = '';
                this.params.region_id = '';
                this.params.district_id = '';
                this.params.department_id = '';
                this.selected = [];
                this.search(this.remark_term.tabs, 1);
            },

//            增加备注
            add_remark (){
                $('#lookRemark').modal({backdrop: 'static',});
            },
//            查看新增备注
            lookRemarks (name, val){
                this.achieve_remark(name, val);
                $('#lookRemark').modal({backdrop: 'static',});
            },
//            获取备注信息
            achieve_remark (name, val){
                for (let i = 0; i < this.remark_info.length; i++) {
                    if (this.remark_info[i].target_id === val) {
                        this.remark_term.remark_targetId = val;
                        this.$http.get('periodic/remark/' + this.remark_info[i].id).then((res) => {
                            this.remark_term.addRemark = '';
                            this.remark_term.remark_obj = name + ' @ ' + this.remark_term.range;
                            this.remark_term.remark_con = res.data.data.content;
                        });
                    }
                }
            },
//            选中
            checked_id (rul, ev, name, val){
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
                this.remark_term.addRemark = 'add';
                this.remark_term.remark_targetId = val;
                this.remark_term.remark_obj = name + ' @ ' + this.remark_term.range;
            },
        }
    }
</script>

<style scoped>
    .panel, .table {
        margin-bottom: 0;
    }
</style>
