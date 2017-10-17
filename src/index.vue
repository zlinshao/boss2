<template>
    <div>

        <div class="row">
            <div class="col-md-9">
                <section class="panel"
                         v-show="simulate.indexOf('Customer/customerList')>-1||simulate.indexOf('CustomerPool/customerPool')>-1
                         ||simulate.indexOf('Villa/receivedVillaList')>-1||simulate.indexOf('Villa/villaList')>-1
                         ||simulate.indexOf('User/searchUser')>-1||simulate.indexOf('Manager/index')>-1
                         ||simulate.indexOf('System/index')>-1||simulate.indexOf('Approval/index')>-1
                         ||simulate.indexOf('Remind/index')>-1||simulate.indexOf('Secretary/index')>-1
                         ||simulate.indexOf('Msessage/self_message')>-1||simulate.indexOf('Message/department_message')>-1
                         ||simulate.indexOf('Favourite/index')>-1||isSuper">
                    <div class="panel-body">
                        <a class="btn">快捷入口：</a>
                        <router-link class="btn btn-link" to="/custom" v-show="simulate.indexOf('Customer/customerList')>-1||isSuper">客户</router-link>  <!--客户-->
                        <router-link class="btn btn-link" to="/customerPool" v-show="simulate.indexOf('CustomerPool/customerPool')>-1||isSuper">客户池</router-link>  <!--客户池-->
                        <router-link class="btn btn-link" to="/OkCollect" v-show="simulate.indexOf('Villa/receivedVillaList')>-1||isSuper">公司房源</router-link>  <!--公司房源-->
                        <router-link class="btn btn-link" to="/noCollect" v-show="simulate.indexOf('Villa/villaList')>-1||isSuper">待收房源</router-link>  <!--待收房源-->
                        <!--<router-link class="btn btn-link" to="/reportedRenting">租房报备</router-link>  &lt;!&ndash;租房报备&ndash;&gt;-->
                        <!--<router-link class="btn btn-link" to="/reportedCollect">收房报备</router-link>  &lt;!&ndash;收房报备&ndash;&gt;-->
                        <router-link class="btn btn-link" to="/user" v-show="simulate.indexOf('User/searchUser')>-1||isSuper">员工管理</router-link>  <!--用户管理-->
                        <!--<router-link class="btn btn-link" to="/periodicForGcompany">公司业绩</router-link>  &lt;!&ndash;公司业绩&ndash;&gt;-->
                        <!--<router-link class="btn btn-link" to="/periodicForGroup">小组业绩</router-link>  &lt;!&ndash;小组业绩&ndash;&gt;-->
                        <!--<router-link class="btn btn-link" to="/periodicForPeople">个人业绩</router-link>  &lt;!&ndash;个人业绩&ndash;&gt;-->
                        <router-link class="btn btn-link" to="/leadingOut" v-show="simulate.indexOf('Manager/index')>-1||isSuper">客户导出</router-link>  <!--客户导出-->
                        <router-link class="btn btn-link" to="/messageCenter"
                                     v-show="simulate.indexOf('System/index')>-1||simulate.indexOf('Approval/index')>-1
                                    ||simulate.indexOf('Remind/index')>-1||simulate.indexOf('Secretary/index')>-1
                                    ||simulate.indexOf('Msessage/self_message')>-1||simulate.indexOf('Message/department_message')>-1
                                    ||simulate.indexOf('Favourite/index')>-1||isSuper">消息中心</router-link>  <!--消息中心-->
                    </div>
                </section>
                <!--<section class="panel">-->
                <!--<div class="panel-body" style="padding-bottom: 0;">-->
                <!--<div class="row">-->
                <!--<div class="col-md-12">-->
                <!--<section class="panel table-responsive roll">-->
                <!--<table class="top table table-advance table-hover">-->
                <!--<thead>-->
                <!--<tr>-->
                <!--<th class="bor0">简报</th>-->
                <!--<th class="bor0">新增客户</th>-->
                <!--<th class="bor0">新增房屋</th>-->
                <!--<th class="bor0">新增沟通日志</th>-->
                <!--<th class="bor0">空置房屋</th>-->
                <!--<th class="bor0">已收房屋</th>-->
                <!--<th class="bor0">已租房屋</th>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<th class="top0"></th>-->
                <!--<th class="top0">{{bulletin_nanjin.client + bulletin_suzhou.client}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.house + bulletin_suzhou.house}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.log + bulletin_suzhou.log}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.vacancy + bulletin_suzhou.vacancy}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.received + bulletin_suzhou.received}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.rent + bulletin_suzhou.rent}}</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr>-->
                <!--<td>南京</td>-->
                <!--<td>{{bulletin_nanjin.client}}</td>-->
                <!--<td>{{bulletin_nanjin.house}}</td>-->
                <!--<td>{{bulletin_nanjin.log}}</td>-->
                <!--<td>{{bulletin_nanjin.vacancy}}</td>-->
                <!--<td>{{bulletin_nanjin.received}}</td>-->
                <!--<td>{{bulletin_nanjin.rent}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<td>苏州</td>-->
                <!--<td>{{bulletin_suzhou.client}}</td>-->
                <!--<td>{{bulletin_suzhou.house}}</td>-->
                <!--<td>{{bulletin_suzhou.log}}</td>-->
                <!--<td>{{bulletin_suzhou.vacancy}}</td>-->
                <!--<td>{{bulletin_suzhou.received}}</td>-->
                <!--<td>{{bulletin_suzhou.rent}}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
                <!--</table>-->
                <!--</section>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</section>-->
                <section class="panel">
                    <div class="panel-body">
                        <header class="panel-heading">
                            系统公告
                        </header>
                        <div class="table table-responsive roll">
                            <!--系统公告-->
                            <table class="table table-advance table-hover">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">发布时间</th>
                                    <th class="text-center">发布人</th>
                                    <th class="text-center">标题</th>
                                    <th class="text-center">主要内容</th>
                                    <th class="text-center">阅读时间</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in systems" @click="receive(sys.id, sys.read_time)">
                                    <td class="text-center width180">{{sys.message.create_time}}</td>
                                    <td class="text-center width80">{{sys.message.release_name}}</td>
                                    <td class="text-center width180">{{sys.message.data.title}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== sys.id, phone: isActive === sys.id }"
                                        @click="more_content(sys.id)">
                                        {{sys.message.data.content}}
                                    </td>
                                    <td class="text-center width180">{{sys.read_time}}</td>
                                    <td class="text-center width60">
                                        <i class="fa fa-folder"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" v-if="sys.favourite_status === '已收藏'"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                <tr v-show="isSystem_s">
                                    <td colspan="6" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-body">
                        <header class="panel-heading">
                            本月寿星
                            <a class="pull-right" @click="birth_show_more" v-show="main_birthday.length > 6">更多</a>
                        </header>
                        <div class="row product-list" style="margin-top: 16px;">
                            <div class="col-xs-6 col-sm-3 col-lg-2" v-for="(birth,index) in main_birthday">
                                <section class="panel" v-show="index < birth_show">
                                    <div class="pro-img-box margin10" style="max-height: 70px;"
                                         :title="birth.position">
                                        <img :src="birth.avatar" v-if="birth.avatar !== ''"
                                             style="border-radius: 50%;height: 100%;"/>
                                        <img src="./assets/img/head.png" v-if="birth.avatar === ''"
                                             style="border-radius: 50%;height: 100%;"/>
                                    </div>
                                    <div class="panel-body text-center padding15">
                                        <h5>{{birth.position}}</h5>
                                        <h5>{{birth.name}}</h5>
                                    </div>
                                </section>
                            </div>
                            <div class="col-xs-12" v-if="main_birthday.length === 0">
                                <section class="panel text-center" style="margin-bottom: 0;font-size: 16px;">
                                    本月暂无寿星
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <!--<div class="row product-list" style="margin-top: 12px;">-->
                <!--<div class="col-md-4">-->
                <!--<section class="panel">-->
                <!--<div class="panel-body text-center">-->
                <!--&lt;!&ndash;入住&ndash;&gt;-->
                <!--<h3>入住率</h3>-->
                <!--<div id="check_in" style="height: 310px;"></div>-->
                <!--</div>-->
                <!--</section>-->
                <!--</div>-->
                <!--<div class="col-md-4">-->
                <!--<section class="panel">-->
                <!--<div class="panel-body text-center">-->
                <!--&lt;!&ndash;收租&ndash;&gt;-->
                <!--<h3>收房比例</h3>-->
                <!--<div id="collect_rents" style="height: 310px;"></div>-->
                <!--</div>-->
                <!--</section>-->
                <!--</div>-->
                <!--<div class="col-md-4">-->
                <!--<section class="panel">-->
                <!--<div class="panel-body text-center">-->
                <!--&lt;!&ndash;客户来源&ndash;&gt;-->
                <!--<h3>客户来源</h3>-->
                <!--<div id="custom" style="height: 310px;"></div>-->
                <!--</div>-->
                <!--</section>-->
                <!--</div>-->
                <!--</div>-->
            </div>

            <div class="col-md-3">
                <!--在线人数-->
                <section class="panel">
                    <header class="panel-heading">
                        在线人数

                        <a style="font-size: 12px;color: #000" class="pull-right" @click="click_more"
                           v-if="mores > 9 && more_status">
                            展开({{allLine}})
                        </a>
                        <a style="font-size: 12px;color: #000" class="pull-right" @click="click_more"
                           v-if="mores > 9 && !more_status">
                            收起({{allLine}})
                        </a>
                    </header>
                    <div class="panel-body" style="padding-top: 0;padding-bottom: 0;">
                        <div class="row">
                            <div class="col-md-12" style="padding: 0;">
                                <section class="panel table-responsive roll" style="height: 543px; overflow: auto">
                                    <table class="table table-advance table-hover" id="panel">
                                        <thead>
                                        <tr>
                                            <th>姓名</th>
                                            <th>部门</th>
                                            <th>操作时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(line, index) in onlines" v-if="index < more">
                                            <td class="width120" style="text-align: left;">
                                                <img src="./assets/img/head.png" v-if="line.avatar === ''"
                                                     style="width: 35px;height: 35px;border-radius:50%;"/>

                                                <img :src="line.avatar" alt="" v-if="line.avatar != ''"
                                                     style="width: 35px;height: 35px;border-radius:50%;">
                                                {{line.real_name}}
                                            </td>
                                            <td class="width80">{{line.department_name}}</td>
                                            <td class="width100">{{line.operating_time}}</td>
                                        </tr>
                                        <tr v-show="onlines.length === 0">
                                            <td colspan="7" class="text-center text-muted">
                                                <h4>暂无数据....</h4>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <!--功能排期表-->
                <section class="panel roll" style="height: 255px;overflow: hidden;">
                    <header class="panel-heading" style="margin-bottom: 2px;">
                        功能排期表 <span class="pull-right add" @click="line_up">+</span>
                    </header>
                    <div class="roll" style="overflow: auto; height: 90%;">
                        <header class="panel-heading tab-bg-dark-navy-blue">
                            <ul class="nav nav-tabs">
                                <li class="active" style="width: 50%;">
                                    <a data-toggle="tab" href="#carry_on" aria-expanded="true">
                                        进行中
                                    </a>
                                </li>
                                <li class="" style="width: 50%;">
                                    <a data-toggle="tab" href="#complete" aria-expanded="false">
                                        已完成
                                    </a>
                                </li>
                            </ul>
                        </header>
                        <div class="panel-body">
                            <div class="tab-content">
                                <div id="carry_on" class="tab-pane active" style="overflow: auto;">
                                    <section class="panel table-responsive roll">
                                        <table class="table table-advance table-hover">
                                            <thead>
                                            <tr>
                                                <th class="text-center width100">结束日期</th>
                                                <th class="text-center width100">功能名称</th>
                                                <th class="text-center width80">进度</th>
                                                <th class="text-center width100">相关部门</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="text-center" v-for="key in line_list_way">
                                                <td>{{key.finish_time}}</td>
                                                <td>{{key.function_name}}</td>
                                                <td>
                                                    <div class="progress progress-striped active">
                                                        <div aria-valuemax="100" aria-valuemin="0"
                                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                                             :style="{ width: key.process + '%'}">
                                                            <span class="sr-only">{{key.process}}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-for="item in key.applicant_id">
                                                <span v-for="list in item.department">
                                                    {{list.name}}
                                                </span>
                                                </td>
                                            </tr>
                                            <tr v-if="way">
                                                <td colspan="4" class="text-center text-muted">
                                                    <h4>暂无数据....</h4>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </div>

                                <div id="complete" class="tab-pane">
                                    <section class="panel table-responsive roll">
                                        <table class="table table-advance table-hover">
                                            <thead>
                                            <tr>
                                                <th class="text-center width100">结束日期</th>
                                                <th class="text-center width100">功能名称</th>
                                                <th class="text-center width80">进度</th>
                                                <th class="text-center width100">相关部门</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="text-center" v-for="key in line_list_finish">
                                                <td>{{key.finish_time}}</td>
                                                <td>{{key.function_name}}</td>
                                                <td>
                                                    <div class="progress progress-striped active">
                                                        <div aria-valuemax="100" aria-valuemin="0"
                                                             aria-valuenow="100" role="progressbar" class="progress-bar"
                                                             style="width: 100%">
                                                            <span class="sr-only">100%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-for="item in key.applicant_id">
                                                <span v-for="list in item.department">
                                                    {{list.name}}
                                                </span>
                                                </td>
                                            </tr>
                                            <tr v-if="fin">
                                                <td colspan="4" class="text-center text-muted">
                                                    <h4>暂无数据....</h4>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!--排期申请-->
                <div class="modal fade full-width-modal-right" id="Apply" tabindex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content-wrap">
                            <div class="modal-content roll">
                                <div class="modal-header">
                                    <button type="button" class="close" @click="close_" aria-hidden="true">×</button>
                                    <h4 class="modal-title">排期申请</h4>
                                </div>

                                <div class="modal-body has-js">
                                    <form class="form-horizontal" role="form">

                                        <!--功能名称-->
                                        <div class="form-group">
                                            <label class="col-lg-2 col-sm-2 control-label">功能名称</label>
                                            <div class="col-lg-10">
                                                <input type="text" v-model="fun_name" class="form-control"
                                                       placeholder="">
                                            </div>
                                        </div>

                                        <!--期望完成日期-->
                                        <div class="form-group">
                                            <label class="col-lg-2 col-sm-2 control-label">期望完成日期</label>
                                            <div class="col-lg-10">
                                                <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                            :idName="'want'" @sendDate="getDate"></DatePicker>
                                            </div>
                                        </div>

                                        <!--需求描述-->
                                        <div class="form-group">
                                            <label class="col-lg-2 col-sm-2 control-label">需求描述</label>
                                            <div class="col-lg-10">
                                                <input type="text" v-model="describe" class="form-control"
                                                       placeholder="">
                                            </div>
                                        </div>

                                        <!--申请人-->
                                        <div class="form-group">
                                            <label class="col-lg-2 col-sm-2 control-label">申请人</label>
                                            <div class="col-lg-10">
                                                <input type="text" v-model="proposer" class="form-control"
                                                       placeholder="" readonly>
                                            </div>
                                        </div>

                                        <!--申请部门-->
                                        <div class="form-group">
                                            <label class="col-lg-2 col-sm-2 control-label">申请部门</label>
                                            <div class="col-lg-10">
                                                <input type="text" v-model="department"
                                                       class="form-control" placeholder="" readonly>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-default" type="button" @click="close_">取消</button>
                                    <button class="btn btn-primary" type="button" @click="application">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--龙虎榜-->
                <!--<section class="panel">-->
                <!--<header class="panel-heading">-->
                <!--龙虎榜-->
                <!--</header>-->
                <!--<div class="panel-body" style="padding-top: 0;">-->
                <!--<div class="row">-->
                <!--<div class="col-md-12" style="padding: 0;">-->
                <!--<section class="panel table-responsive roll">-->
                <!--<table class="table table-advance table-hover">-->
                <!--<thead>-->
                <!--<tr>-->
                <!--<th>排名</th>-->
                <!--<th>姓名</th>-->
                <!--<th>部门</th>-->
                <!--<th>当月业绩</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--&lt;!&ndash;<tr v-for="(ran, index) in main_ranking">&ndash;&gt;-->
                <!--&lt;!&ndash;<td style="min-width: 60px;">{{index + 1}}</td>&ndash;&gt;-->
                <!--&lt;!&ndash;<td style="min-width: 80px;">{{ran.name}}</td>&ndash;&gt;-->
                <!--&lt;!&ndash;<td style="min-width: 110px;">{{ran.department}}</td>&ndash;&gt;-->
                <!--&lt;!&ndash;<td style="min-width: 100px;">&ndash;&gt;-->
                <!--&lt;!&ndash;{{ran.money}}&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<span class="text-danger" v-if="ran.rank_id === 1"><i&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;class="fa fa-arrow-up"></i></span>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<span class="text-success" v-if="ran.rank_id === 2"><i&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;class="fa  fa-arrow-down"></i></span>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;</td>&ndash;&gt;-->
                <!--&lt;!&ndash;</tr>&ndash;&gt;-->
                <!--<tr v-show="main_ranking.length === 0">-->
                <!--<td colspan="7" class="text-center text-muted">-->
                <!--<h4>暂无数据....</h4>-->
                <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
                <!--</table>-->
                <!--</section>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</section>-->
            </div>
        </div>
        <Question :questionId='questionId' @success="successVote"></Question>
        <Status :state='info'></Status>
        <AllNoWrite :allNoWriteList="allNoWriteList"></AllNoWrite>
    </div>
</template>

<script>
    import Question from './compoments/questionnaire/questionnaire.vue'
    import DatePicker from './compoments/common/datePicker.vue'
    import Status from './compoments/common/status.vue';              //提示信息
    import AllNoWrite from './compoments/questionnaire/allNoWrite.vue'
    export default {
        components: {DatePicker, Status, Question,AllNoWrite},
        props: ['id','simulate','isSuper'],
        data (){
            return {
                birth_show: 6,
                line_list_way: [],              //排期列表  进行中
                way: false,
                line_list_finish: [],           //排期列表  已完成
                fin: false,
                currentDate: [],                //日期组件参数
                dateConfigure: [
                    {
                        range: false,            //日期组件参数
                        needHour: false
                    }
                ],

                fun_name: '',               //功能名称
                end_time: '',               //期望结束时间
                describe: '',               //需求描述
                proposer: '',               //申请人
                proposer_id: '',            //申请人ID
                department: '',             //申请部门
                department_id: '',          //部门ID

                more: 9,
                mores: '',
                more_status: true,
                onlines: [],
                allLine: '',
//                screenWidth: document.body.clientWidth,      // 页面宽度
                systems: [],                    //公告
                isSystem_s: false,
                isActive: -1,

                select_list: [],                //字典
                bulletin_nanjin: {},            //南京
                bulletin_suzhou: {},            //苏州
                main_birthday: [],              //寿星
                main_ranking: [],               //龙虎榜
                main_message: [],               //公告
                questionId: '',                 //问卷调查
                main_customer: [],              //图表
                myChart: [],
                check_inData: [],               //入住
                collect_rentsData: [],          //收租
                customData: [],                 //客户来源
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

                allNoWriteList : [],        // 未填写的调查问卷
            }
        },
//        mounted (){
//            this.myChart[0] = this.$echarts.init(document.getElementById('check_in'));
//            this.myChart[1] = this.$echarts.init(document.getElementById('collect_rents'));
//            this.myChart[2] = this.$echarts.init(document.getElementById('custom'));
//
//            window.onresize = () => {
//                return (() => {
//                    window.screenWidth = document.body.clientWidth;
//                    this.screenWidth = window.screenWidth;
//                })()
//            }
//        },
//        watch: {
//            screenWidth (val) {
//                if (!this.timer) {
//                    this.screenWidth = val;
//                    this.timer = true;
////                    let that = this;
//                    setTimeout(() => {
//                        // that.screenWidth = that.$store.state.canvasWidth
////                        console.log(that.screenWidth);
//                        for (let i = 0; i < this.myChart.length; i++) {
//                            (() => {
//                                this.myChart[i].resize();
//                            })(i)
//                        }
//                        this.timer = false;
//                    }, 200)
//                }
//            }
//        },
        created (){
            this.home_index();
            this.home_system();
            this.line_list();
            this.online();
            this.isDone();
        },
        methods: {
//            问卷
            isDone(){
                alert(1111)
                this.$http.get('code/Mission/checkIsWrite').then((res) => {
                    if (res.data.code === '30080') {
//                        console.log(res.data.data);
                        this.allNoWriteList = res.data.data;
                        if (this.allNoWriteList.length==1){
                            this.questionId = this.allNoWriteList[0].id;
                            $('.questionnaire:eq(0)').modal('show');
                        } else {
                            $('.allNoWrite').modal('show');
                        }

                    }
                })
            },
            successVote(val){
                this.info.success = val;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
//            生日
            birth_show_more (){
                if (this.birth_show === 6) {
                    this.birth_show = this.main_birthday.length;
                } else if (this.birth_show === this.main_birthday.length) {
                    this.birth_show = 6;
                }
            },
//            用户信息
            line_list (){
                this.$http.get('staff/info').then((res) => {
                    this.proposer = res.data.name;
                    this.proposer_id = res.data.id;

                    this.$http.get('finance/staff_info/' + res.data.id).then((res) => {
                        this.department = res.data.data.departmnet_name;
                        this.department_id = res.data.data.department_id;
                    });
                });

//            排期列表  进行中
                this.$http.get('code/Functional_Schedule/smallPage?status=2').then((res) => {
                    if (res.data.code === '30040') {
                        this.line_list_way = res.data.data;
                        this.way = false;
                    } else {
                        this.way = true;
                    }
                });
//            排期列表  已完成
                this.$http.get('code/Functional_Schedule/smallPage?status=3').then((res) => {
                    if (res.data.code === '30040') {
                        this.line_list_finish = res.data.data;
                        this.fin = false;
                    } else {
                        this.fin = true;
                    }
                })
            },

//            排期申请
            line_up (){
                $('#Apply').modal({backdrop: 'static'});
            },
            getDate (val){
                this.end_time = val;
            },
//            排期申请
            application (){
                this.$http.post('code/Functional_Schedule/edit', {
                    is_index: 1,
                    function_name: this.fun_name,
                    expected_finish_time: this.end_time,
                    requirement_description: this.describe,
                    applicant_id: this.proposer_id,
                    department_id: this.department_id,
                }).then((res) => {
                    if (res.data.code === '30008') {
                        this.line_list();
                        $('#Apply').modal('hide');
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.close_();
                    } else {
                        this.info.error = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = true;
                        //显示成功弹窗 ***
                        this.info.state_success = false;
                    }
                })
            },
            close_ (){
                $('#Apply').modal('hide');
                this.fun_name = '';               //功能名称
                this.end_time = '';               //期望结束时间
                this.describe = '';               //需求描述
//                this.proposer = '';               //申请人
//                this.proposer_id = '';            //申请人ID
//                this.department = '';             //申请部门
//                this.department_id = '';          //申请部门ID
                this.currentDate = [];
            },
//            更多
            click_more (){
                $('#panel').scroll();
                if (this.more === 9) {
                    this.more = this.mores;
                } else {
                    this.more = 9;
                }
                this.more_status = !this.more_status
            },
//            详细内容
            more_content (val){
                this.isActive = val;
            },
//            在线人数
            online (){
                this.$http.post('clock/memo/member').then((res) => {
                    this.onlines = res.data.data.data;
                    this.mores = res.data.data.data.length;
                    this.allLine = res.data.data.count;
                });
            },
//            系统公告
            home_system (){
                this.$http.post('message/system/index/pages/1').then((res) => {
                    if (res.data.code === '100000') {
                        this.systems = res.data.data.list;
                        this.isSystem_s = false;
                    } else {
                        this.isSystem_s = true;
                    }
                });
            },
//            阅读公告
            isCollect(val,){
                this.$http.post('message/message/favourite', {
                    mess_id: val
                }).then((res) => {
                    if (res.data.code === '100054' || res.data.code === '100052') {
                        this.home_system()
                    }
                });
            },
//            已读
            receive (val, read){
                if (read === '未读') {
                    this.$http.post('message/message/read_mess', {
                        id: val,
                    }).then(() => {
                        this.home_system();
                    });
                }
            },
            home_index (){
//                字典
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;

                    this.$http.post('home/index/index').then((res) => {
//                        this.bulletin_nanjin = res.data.data.bulletin.nanjin;           //简报南京
//                        this.bulletin_suzhou = res.data.data.bulletin.suzhou;           //简报苏州
                        this.main_birthday = res.data.data.birthday;                    //寿星
//                        this.main_ranking = res.data.data.ranking;                      //龙虎榜
//                        this.check_inData = res.data.data.uprate;                       //入住率
//                        this.collect_rentsData = res.data.data.collect_rent;            //收房比列
//                        this.main_customer = res.data.data.customer;                    //客户来源

//                        this.check();
//                        this.collect();
//                        this.customer();
                    });
                });
            },
//            check (){
//                let option = {
//                    tooltip: {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
//                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['已租', '空置']
//                    },
//                    series: [
//                        {
//                            name: '访问来源',
//                            type: 'pie',
//                            radius: ['50%', '70%'],
//                            avoidLabelOverlap: false,
//                            label: {
//                                normal: {
//                                    show: false,
//                                    position: 'center'
//                                },
//                                emphasis: {
//                                    show: true,
//                                    textStyle: {
//                                        fontSize: '20',
//                                        fontWeight: 'bold',
//                                    }
//                                }
//                            },
//                            labelLine: {
//                                normal: {
//                                    show: false
//                                }
//                            },
//                            data: [
//                                {value: this.check_inData.rent, name: '已租'},
//                                {value: this.check_inData.vacancy, name: '空置'},
//                            ]
//                        }
//                    ]
//                };
//                this.myChart[0].setOption(option);
//            },
//            collect (){
//                let option = {
//                    tooltip: {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
//                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['收房', '租房']
//                    },
//                    series: [
//                        {
//                            name: '访问来源',
//                            type: 'pie',
//                            radius: ['50%', '70%'],
//                            avoidLabelOverlap: false,
//                            label: {
//                                normal: {
//                                    show: false,
//                                    position: 'center'
//                                },
//                                emphasis: {
//                                    show: true,
//                                    textStyle: {
//                                        fontSize: '20',
//                                        fontWeight: 'bold'
//                                    }
//                                }
//                            },
//                            labelLine: {
//                                normal: {
//                                    show: false
//                                }
//                            },
//                            data: [
//                                {value: this.collect_rentsData.received, name: '收房'},
//                                {value: this.collect_rentsData.rent, name: '租房'},
//                            ]
//                        }
//                    ]
//                };
//                this.myChart[1].setOption(option);
//            },
//            customer (){
//                let option = {
//                    tooltip: {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
//                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['网络', '客户推荐', '偶遇', '中介']
//                    },
//                    series: [
//                        {
//                            name: '访问来源',
//                            type: 'pie',
//                            radius: ['50%', '70%'],
//                            avoidLabelOverlap: false,
//                            label: {
//                                normal: {
//                                    show: false,
//                                    position: 'center'
//                                },
//                                emphasis: {
//                                    show: true,
//                                    textStyle: {
//                                        fontSize: '20',
//                                        fontWeight: 'bold'
//                                    }
//                                }
//                            },
//                            labelLine: {
//                                normal: {
//                                    show: false
//                                }
//                            },
//                            data: [
//                                {value: this.main_customer.wl, name: '网络'},
//                                {value: this.main_customer.khtj, name: '客户推荐'},
//                                {value: this.main_customer.oy, name: '偶遇'},
//                                {value: this.main_customer.zj, name: '中介'},
//                            ]
//                        }
//                    ]
//                };
//                this.myChart[2].setOption(option);
//            },
//            getData(){
//                for (let i = 0; i < this.myChart.length; i++) {
//                    (() => {
//                        this.myChart[i].showLoading({
//                            text: '正在努力的读取数据中...',    //loading话术
//                        });
//                    })(i)
//                }
//            }
        }
    }
</script>


<style scoped>
    .bor0 {
        border: 0;
    }

    .top0 {
        font-weight: normal;
        border-top: 0;
    }

    .panel > div > div {
        width: 100%;
        margin: auto;
    }

    @media screen and (max-width: 767px) {
        .table.table-responsive > .table > tbody > tr > td.phone {
            min-width: 360px;
            max-width: 466px;
            white-space: normal;
            word-wrap: break-word;
        }
    }

    .more_info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 300px;
        cursor: pointer
    }

    .top.table > tbody > tr > td {
        border: 0;
    }

    .padding15 {
        padding: 0;
    }

    .margin10 {
        width: 70px;
        height: 70px;
        margin: 10px auto 0;
    }

    tr td, tr th {
        text-align: center;
    }

    .width60 {
        min-width: 60px;
    }

    .width80 {
        min-width: 80px;
    }

    .width180 {
        min-width: 180px;
    }

    .add {
        font-size: 24px;
        font-weight: bold;
        margin-top: -6px;
        cursor: pointer;
    }

    .progress.progress-striped.active {
        margin-bottom: 0;
        height: 10px;
    }
</style>
