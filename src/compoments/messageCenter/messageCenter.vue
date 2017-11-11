<template>
    <div>
        <section id="main-content" style="margin-top:0;">
            <section class="wrapper">
                <div class="mail-box">
                    <aside class="sm-side">
                        <div class="user-head" style="padding: 10px 20px;">
                            <div class="user-name">
                                <h3>我的消息</h3>
                            </div>
                        </div>
                        <ul class="inbox-nav inbox-divider" style="border-bottom: 0;">
                            <li @click="System(1)" v-if="simulate.indexOf('System/index')>-1||isSuper">
                                <!--:class="{active: act === 'sys_mess'}"-->
                                <a href="#">
                                    <i class="fa fa-volume-up"></i>系统公告
                                </a>
                            </li>
                            <li @click="Examine(1)" v-if="simulate.indexOf('Approval/index')>-1||isSuper">
                                <!--:class="{active: act === 'appr_mess'}"-->
                                <a href="#">
                                    <i class="fa fa-user"></i>审批提醒
                                </a>
                            </li>
                            <li @click="Substitute(1)" v-if="simulate.indexOf('Remind/index')>-1||isSuper">
                                <!--:class="{active: act === 'remind_mess'}"-->
                                <a href="#">
                                    <i class="fa fa-bell"></i>待办提醒
                                </a>
                            </li>
                            <li @click="Secretary(1)" v-if="simulate.indexOf('Secretary/index')>-1||isSuper">
                                <!--:class="{active: act === 'secre_mess'}"-->
                                <a href="#">
                                    <i class=" fa fa-github"></i>BOSS小秘书
                                </a>
                            </li>
                            <li @click="new1(1)" v-if="simulate.indexOf('Message/self_message')>-1||isSuper">
                                <!--:class="{active: act === 'secre_mess'}"-->
                                <a href="#">
                                    <i class=" fa fa-male"></i>个人发件箱
                                </a>
                            </li>
                            <li @click="new2(1)" v-if="simulate.indexOf('Message/department_message')>-1||isSuper">
                                <!--:class="{active: act === 'secre_mess'}"-->
                                <a href="#">
                                    <i class=" fa fa-users"></i>部门发件箱
                                </a>
                            </li>
                            <li @click="Message(1)" v-if="simulate.indexOf('Favourite/index')>-1||isSuper">
                                <a href="#">
                                    <i class=" fa fa-heart"></i>收藏
                                </a>
                            </li>
                            <li @click="phone_remind(1)" v-if="simulate.indexOf('Sms/smsList')>-1||isSuper">
                                <a href="#">
                                    <i class=" fa fa-heart"></i>短信提醒
                                </a>
                            </li>
                        </ul>
                    </aside>
                    <aside class="lg-side">
                        <div class="inbox-head" style="padding: 18px;">
                            <h3 style="font-size: 20px;padding-top: 10px;margin-bottom: 12px;">
                                <i :class="[fa,font]"></i>&nbsp;&nbsp;{{message}}
                            </h3>
                            <form class="pull-right position" action="#"
                                  v-if="this.simulate.indexOf('System/index')>-1||this.isSuper">
                                <div class="input-append" v-if="isSystem">
                                    <button type="button" class="btn btn-primary" @click="addAnnouncement"
                                            style="padding: 11px 12px;">
                                        <i class="fa fa-plus-square"></i>&nbsp;添加公告
                                    </button>
                                </div>
                            </form>

                            <!--部门发件箱-->
                            <form class="pull-right position" action="#"
                                  v-if="simulate.indexOf('Message/department_message')>-1||isSuper">
                                <div class="input-append pull-right" v-if="isNew2">
                                    <button type="button" class="btn btn-primary" @click="resetting"
                                            style="background-color: #00A6B2;margin: 4px 0 0 15px;">重置
                                    </button>
                                </div>
                            </form>
                            <div v-if="isNew2&&simulate.indexOf('Message/department_message')>-1||isSuper"
                                 class="pull-right col-xs-12 col-md-4 col-lg-2"
                                 style="margin-top: 4px;">
                                <div class="form-group pull-right" style="margin-bottom: 0;">
                                    <input title="请点击选择" type="text" class="form-control" readonly
                                           style="margin-bottom: 0;"
                                           v-model="params.staff" @click="selectStaff" placeholder='选择收件人'>
                                </div>
                            </div>
                            <div v-if="isNew2&&simulate.indexOf('Message/department_message')>-1||isSuper"
                                 class="pull-right col-xs-12 col-md-4"
                                 style="margin-top: 4px;">
                                <div class="form-group">
                                    <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                @sendDate="getDate"></DatePicker>
                                </div>
                            </div>
                        </div>
                        <div class="inbox-body panel table table-responsive roll">
                            <!--系统公告-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isSystem&&(simulate.indexOf('System/index')>-1||isSuper)">
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
                                <tr class="unread" v-for="sys in systems" @click="announceDetail(
                                    sys.message.type,
                                    sys.message.data.title,
                                    sys.message.department_name,
                                    sys.message.create_time,
                                    sys.message.release_name,
                                    sys.id,
                                    sys.message.data.content,
                                    sys.read_time)">
                                    <td class="text-center width180">{{sys.message.create_time}}</td>
                                    <td class="text-center width80">{{sys.message.release_name}}</td>
                                    <td class="text-center width180">{{sys.message.data.title}}</td>
                                    <td class="text-center more_info">
                                        {{sys.message.data.content}}
                                    </td>
                                    <td class="text-center width180">{{sys.read_time}}</td>
                                    <td class="text-center width60">
                                        <i class="fa fa-folder"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart"
                                           v-if="sys.favourite_status === '已收藏'&&(simulate.indexOf('Message/favourite')>-1||isSuper)"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o"
                                           v-if="sys.favourite_status === '未收藏'&&(simulate.indexOf('Message/favourite')>-1||isSuper)"
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
                            <!--审批提醒-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isExamine&&(simulate.indexOf('Approval/index')>-1||isSuper)">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">申请时间</th>
                                    <th class="text-center">申请人</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">审批项目</th>
                                    <th class="text-center">审批人</th>
                                    <th class="text-center">审批状态</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in Examines" @click="receive(sys.id,sys.read_time)">
                                    <td class="text-center width180">{{sys.message.create_time}}</td>
                                    <td class="text-center width80">{{sys.message.release_name}}</td>
                                    <td class="text-center width80">{{sys.message.data.category}}</td>
                                    <td class="text-center width180">{{sys.message.data.content}}</td>
                                    <td class="text-center width80">{{sys.message.data.approval_name}}</td>
                                    <td class="text-center width60">
                                        <span v-if="sys.message.data.approval_status > 4"
                                              class="label label-success">已完成</span>
                                        <span v-if="sys.message.data.approval_status == 4" class="label label-warning">
                                            {{select_list.passed[sys.message.data.approval_status]}}
                                        </span>
                                        <span v-if="sys.message.data.approval_status == 3" class="label label-warning">
                                            待组长审核
                                        </span>
                                        <span v-if="sys.message.data.approval_status == 2" class="label label-default">
                                            未提交
                                        </span>
                                        <span v-if="sys.message.data.approval_status == 1" class="label label-primary">
                                            新订单
                                        </span>
                                    </td>
                                    <td class="text-center" style="min-width: 60px;">
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
                                <tr v-show="Examines_s">
                                    <td colspan="7" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--待办提醒-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isSubstitute&&(simulate.indexOf('Remind/index')>-1||isSuper)">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">提醒时间</th>
                                    <th class="text-center">提醒人</th>
                                    <th class="text-center">提醒内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in Substitutes" @click="receive(sys.id,sys.read_time)">
                                    <td class="text-center width180">{{sys.remind_time}}</td>
                                    <td class="text-center width80">{{sys.send_name}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== sys.id, phone: isActive === sys.id  }"
                                        @click="more_content(sys.id)">
                                        {{sys.data.content}}
                                    </td>
                                    <td class="text-center width60">
                                        <i class="fa fa-folder"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart"
                                           v-if="sys.favourite_status === '已收藏'&&(simulate.indexOf('Message/favourite')>-1||isSuper)"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o"
                                           v-if="sys.favourite_status === '未收藏'&&(simulate.indexOf('Message/favourite')>-1||isSuper)"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                <tr v-show="Substitutes_s">
                                    <td colspan="4" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--BOSS小秘书-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isSecretary&&(simulate.indexOf('Secretary/index')>-1||isSuper)">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">时间</th>
                                    <th class="text-center">发信人</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">提醒内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in Secretarys" @click="receive(sys.id,sys.read_time)">
                                    <td class="text-center width180">{{sys.message.create_time}}</td>
                                    <td class="text-center width80">{{sys.message.data.send_name}}</td>
                                    <td class="text-center width90">{{sys.message.type}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== sys.id, phone: isActive === sys.id  }"
                                        @click="more_content(sys.id)">
                                        {{sys.message.data.content}}
                                    </td>
                                    <td class="text-center width60">
                                        <i class="fa fa-folder"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart"
                                           v-if="sys.favourite_status === '已收藏'&&(simulate.indexOf('Message/favourite')>-1||isSuper)"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o"
                                           v-if="sys.favourite_status === '未收藏'&&(simulate.indexOf('Message/favourite')>-1||isSuper)"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                <tr v-show="Secretarys_s">
                                    <td colspan="5" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--个人发件箱-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isNew1&&(simulate.indexOf('Message/self_message')>-1||isSuper)">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">发件时间</th>
                                    <th class="text-center">收件人</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">内容</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="(sys,index) in news1">
                                    <td class="text-center width180">{{sys.create_time}}</td>
                                    <td class="text-center width80">{{sys.receive_name}}</td>
                                    <td class="text-center width90">{{sys.data.category}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== index, phone: isActive === index }"
                                        @click="more_content(index)">
                                        {{sys.data.content}}
                                    </td>
                                </tr>
                                <tr v-show="New1">
                                    <td colspan="4" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--部门发件箱-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isNew2&&(simulate.indexOf('Message/department_message')>-1||isSuper)">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">发件时间</th>
                                    <th class="text-center">发件人</th>
                                    <th class="text-center">收件人</th>
                                    <th class="text-center">职位</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">内容</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="(sys,index) in news2">
                                    <td class="text-center width180">{{sys.create_time}}</td>
                                    <td class="text-center width80">({{sys.department_name}}){{sys.send_name}}</td>
                                    <td class="text-center width80">{{sys.receive_name}}</td>
                                    <td class="text-center width90">{{sys.position_name}}</td>
                                    <td class="text-center width90">{{sys.data.category}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== index, phone: isActive === index }"
                                        @click="more_content(index)">
                                        {{sys.data.content}}
                                    </td>
                                </tr>
                                <tr v-show="New2">
                                    <td colspan="6" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--收藏-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isMessage&&(simulate.indexOf('Favourite/index')>-1||isSuper)">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">收藏时间</th>
                                    <th class="text-center">相关对象</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in Messages"
                                    @click="receive(sys.read.id,sys.read.read_time)">
                                    <td class="text-center width180">{{sys.create_time}}</td>
                                    <td class="text-center width80">{{sys.release_name}}</td>
                                    <td class="text-center width90">{{sys.type}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== sys.id, phone: isActive === sys.id }"
                                        @click="more_content(sys.id)">
                                        {{sys.content}}
                                    </td>
                                    <td class="text-center width60">
                                        <i class="fa fa-folder"
                                           v-if="sys.read.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read.read_time != '未读'"></i>

                                        <i class="fa fa-heart" style="color: #e4393c"
                                           v-show="simulate.indexOf('Message/favourite')>-1||isSuper"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                <tr v-show="Messages_s">
                                    <td colspan="5" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <!--收藏-->
                            <table class="table table-striped table-advance table-hover"
                                   v-if="isPhone">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">短信生成时间</th>
                                    <th class="text-center">发送人</th>
                                    <th class="text-center">接收人手机</th>
                                    <th class="text-center">类型</th>
                                    <th class="text-center">结果</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread text-center" v-for="key in phones">
                                    <td>{{key.create_time}}</td>
                                    <td>{{key.real_name}}</td>
                                    <td>{{key.receive_id}}</td>
                                    <td>{{dict.message.type[key.type]}}</td>
                                    <td>
                                        <span v-show="key.result != 1"
                                              class="text-primary">{{dict.message.result[key.result]}}</span>
                                        <span v-show="key.result == 1" @click="repeatSms(key.id)"
                                              class="btn btn-danger btn-sm">{{dict.message.result[key.result]}}</span>
                                    </td>
                                </tr>
                                <tr v-show="ShowPhone">
                                    <td colspan="5" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </aside>
                </div>
                <!--mail inbox end-->
            </section>
        </section>

        <div class="col-xs-12">
            <Page @pag="system_page" :pg="paging" :beforePage="beforePage"></Page>
        </div>
        <STAFF :configure="configure" @Staff="selectDateSendAdd"></STAFF>

        <Status :state='info'></Status>

        <!--增加系统公告-->
        <AnnouncementAdd @success_system="System(1)"></AnnouncementAdd>

        <AnnouncementDetail @receive="System(beforePage)" :msg="info_details"></AnnouncementDetail>
    </div>
</template>
<script>
    import Status from '../common/status.vue';
    import Page from '../common/page.vue';
    import AnnouncementAdd from './announcementAdd.vue'
    import AnnouncementDetail from './announcemeDetail.vue'
    import STAFF from  '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    export default{
        props: ['simulate', 'isSuper'],
        components: {
            AnnouncementAdd,
            AnnouncementDetail,
            Status,
            Page,
            STAFF,
            DatePicker
        },
        data(){
            return {
                dateConfigure: [{
                    range: true, // 是否选择范围
                    needHour: false // 是否需要选择小时
                }],
                currentDate: [],
                time: '',
                select_list: {},
                isActive: 1,
                beforePage: 1,
                paging: '',                 //总页数
                info_details: {             //信息详情
                    get_title: '',
                    get_department_name: '',
                    get_create_time: '',
                    get_release_name: '',
                    get_content: '',
                    get_id: '',
                    get_read: ''
                },
                systems: [],                //公告信息
                Examines: [],               //审批提醒
                Substitutes: [],            //代办提醒
                Secretarys: [],             //BOSS小秘书
                news1: [],                  //个人发件箱
                news2: [],                  //部门发件箱
                Messages: [],               //收藏
                phones: [],                 //短信提醒
                dict: {},

                isSystem: true,             //系统公告
                isSystem_s: false,          //系统公告暂无数据
                isExamine: false,           //审批提醒
                Examines_s: false,          //审批提醒暂无数据
                isSubstitute: false,        //待办提醒
                Substitutes_s: false,       //待办提醒暂无数据
                isSecretary: false,         //BOSS小秘书
                Secretarys_s: false,        //BOSS小秘书暂无数据
                isMessage: false,           //收藏
                Messages_s: false,          //收藏暂无数据
                isNew1: false,              //个人发件箱
                New1: false,                //个人发件箱暂无数据
                isNew2: false,              //部门发件箱
                New2: false,                //部门发件箱暂无数据
                isPhone: false,             //短信提醒
                ShowPhone: false,           //短信提醒暂无数据
                configure: [],              //人资
                time_status: true,
                params: {
                    staff: '',                  //收件人
                    staffId: '',                //收件人ID
                    start_time: '',            //开始时间
                    end_time: '',              //结束时间
                },
                message: '',
                fa: 'fa',
                font: '',
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        mounted (){
            let sys = this.simulate.indexOf('System/index') > -1 || this.isSuper;                       // 系统公告
            let approval = this.simulate.indexOf('Approval/index') > -1 || this.isSuper;                // 审批
            let remind = this.simulate.indexOf('Remind/index') > -1 || this.isSuper;                    // 待办提醒
            let boss = this.simulate.indexOf('Secretary/index') > -1 || this.isSuper;                   // boss小秘书
            let self = this.simulate.indexOf('Msessage/self_message') > -1 || this.isSuper;             // 个人发件箱
            let depart = this.simulate.indexOf('Message/department_message') > -1 || this.isSuper;      // 部门发件箱
            let fav = this.simulate.indexOf('Favourite/index') > -1 || this.isSuper;                    // 收藏

            if (sys) {
                this.System(1);
            } else if (approval) {
                this.Examine(1);
            } else if (remind) {
                this.Substitute(1);
            } else if (boss) {
                this.Secretary(1);
            } else if (self) {
                this.new1(1);
            } else if (depart) {
                this.new2(1);
            } else if (fav) {
                this.Message(1);
            } else {
                // 没有查看收藏权限
                this.isMessage = false;
                this.message = '';
                this.font = '';
            }
        },
        computed: {
            act () {
                return this.$route.query.nameId;
            }
        },
        watch: {
            'params.start_time': {
                deep: true,
                handler(val, oldVal){
                    this.new2(1);
                }
            },
            'params.end_time': {
                deep: true,
                handler(val, oldVal){
                    this.new2(1);
                }
            },
            act(val, oldVal){
                if (val === 'sys_mess') {
                    this.System(1);
                }
                if (val === 'appr_mess') {
                    this.Examine(1);
                }
                if (val === 'remind_mess') {
                    this.Substitute(1);
                }
                if (val === 'secre_mess') {
                    this.Secretary(1);
                }
//                if (val === 'is_phone') {
//                    this.phone_remind(1);
//                }
            }
        },
        methods: {
//            详细内容
            more_content (val){
                this.isActive = val;
            },
//            阅读
            receive (val, read){
                if (read === '未读') {
                    this.$http.post('message/message/read_mess', {
                        id: val,
                    }).then((res) => {
                        this.system_page(this.beforePage);
                    });
                }
            },
//            跳转
//            status_info (val){
//                if (val === 'sys_mess') {
//                    this.act = val;
//                    this.System(1);
//                }
//                if (val === 'appr_mess') {
//                    this.act = val;
//                    this.Examine(1);
//                }
//                if (val === 'remind_mess') {
//                    this.act = val;
//                    this.Substitute(1);
//                }
//                if (val === 'secre_mess') {
//                    this.act = val;
//                    this.Secretary(1);
//                }
//            },

//            分页
            system_page (val){
                if (this.isSystem === true) {
                    this.System(val);
                }

                if (this.isExamine === true) {
                    this.Examine(val);
                }

                if (this.isSubstitute === true) {
                    this.Substitute(val);
                }

                if (this.isSecretary === true) {
                    this.Secretary(val);
                }

                if (this.isNew1 === true) {
                    this.new1(val);
                }

                if (this.isNew2 === true) {
                    this.new2(val);
                }

                if (this.isPhone === true) {
                    this.phone_remind(val);
                }

                if (this.isMessage === true) {
                    if (this.Messages.length === 1) {
                        this.Message(val - 1);
                    } else {
                        this.Message(val);
                    }
                }
            },
            addAnnouncement(){
                $('#announcementAdd').modal({
                    backdrop: 'static',         //空白处不消失
                });

            },
            announceDetail(val7, val1, val2, val3, val4, val5, val6, val8){
                if (val7 === '系统公告' && this.simulate.indexOf('System/content') > -1) {
                    this.info_details.get_title = val1;
                    this.info_details.get_department_name = val2;
                    this.info_details.get_create_time = val3;
                    this.info_details.get_release_name = val4;
                    this.info_details.get_id = val5;
                    this.info_details.get_content = val6;
                    this.info_details.get_read = val8;
                    $('#announceDetail').modal({
                        backdrop: 'static',         //空白处不消失
                    });
                } else {
                    this.info.error = '您无权查看消息详情';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },

//            系统公告
            System(val){
                this.paging = '';
                this.$http.post('message/system/index/pages/' + val).then((res) => {
                    if (res.data.code === '100000') {
                        this.systems = res.data.data.list;
                        this.paging = res.data.data.pages;
                        this.isSystem_s = false;
                    } else {
                        this.systems = [];
                        this.isSystem_s = true;
                    }
                });
                this.beforePage = val;
                this.isSystem = true;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = false;
                this.isNew1 = false;
                this.isNew2 = false;
                this.isPhone = false;
                this.message = '系统公告';
                this.font = 'fa-volume-up';
            },
//            审批提醒
            Examine(val){
                this.paging = '';
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;

                    this.$http.post('message/approval/index/pages/' + val).then((res) => {
                        if (res.data.code === '100070') {
                            this.Examines = res.data.data.list;
                            this.paging = res.data.data.pages;
                            this.Examines_s = false;
                        } else {
                            this.Examines = [];
                            this.Examines_s = true;
                        }
                    });
                    this.beforePage = val;
                    this.isSystem = false;
                    this.isExamine = true;
                    this.isSubstitute = false;
                    this.isSecretary = false;
                    this.isMessage = false;
                    this.isNew1 = false;
                    this.isNew2 = false;
                    this.isPhone = false;
                    this.message = '审批提醒';
                    this.font = 'fa-user';
//
                });
            },
//            待办提醒
            Substitute(val){
                this.paging = '';
                this.$http.post('message/remind/index/pages/' + val).then((res) => {
                    if (res.data.code === '100020') {
                        this.Substitutes = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.Substitutes_s = false;
                    } else {
                        this.Substitutes = [];
                        this.Substitutes_s = true;
                    }
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = true;
                this.isSecretary = false;
                this.isMessage = false;
                this.isNew1 = false;
                this.isNew2 = false;
                this.isPhone = false;
                this.message = '待办提醒';
                this.font = 'fa-bell';
            },
//            BOSS小秘书
            Secretary(val){
                this.paging = '';
                this.$http.post('message/secretary/index/pages/' + val).then((res) => {
                    if (res.data.code === '100030') {
                        this.Secretarys = res.data.data.list;
                        this.paging = res.data.data.pages;
                        this.Secretarys_s = false;
                    } else {
                        this.Secretarys = [];
                        this.Secretarys_s = true;
                    }
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = true;
                this.isMessage = false;
                this.isNew1 = false;
                this.isNew2 = false;
                this.isPhone = false;
                this.message = 'BOSS小秘书';
                this.font = 'fa-github';
            },
//            个人发件
            new1(val){
                this.paging = '';
                this.$http.post('message/message/self_message/pages/' + val, {
                    create_time: '',
                }).then((res) => {
                    if (res.data.code === '100070') {
                        this.news1 = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.New1 = false;
                    } else {
                        this.news1 = [];
                        this.New1 = true;
                    }
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = false;
                this.isNew1 = true;
                this.isNew2 = false;
                this.isPhone = false;
                this.message = '个人发件箱';
                this.font = 'fa-male';
            },
//            收件人
            selectStaff(){
                this.configure = {length: 1, type: 'staff'};
                $('.selectCustom:eq(0)').modal('show');
            },
//            收件人ID
            selectDateSendAdd(data){
                this.params.staff = data.staff[0].name;
                this.params.staffId = data.staff[0].id;
                this.new2(1);
            },
//            时间搜索
            getDate(val){
                console.log(val);
                this.time = val;
                this.new2(1);
            },
//            重置
            resetting (){
                this.params.start_time = '';
                this.params.end_time = '';
                this.params.staffId = '';
                this.params.staff = '';
                this.new2(1);
            },
//            部门发件
            new2(val){
                this.paging = '';
                this.$http.post('message/message/department_message/pages/' + val, {
                    time: this.time,
                    receive_id: this.params.staffId,
                }).then((res) => {
                    if (res.data.code === '100080') {
                        this.news2 = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.New2 = false;
                    } else {
                        this.news2 = [];
                        this.New2 = true;
                    }
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = false;
                this.isNew1 = false;
                this.isNew2 = true;
                this.isPhone = false;
                this.message = '部门发件箱';
                this.font = 'fa-users';
            },
//            收藏
            Message(val){
                this.paging = '';
                this.$http.post('message/favourite/index/pages/' + val).then((res) => {
                    if (res.data.code === '100040') {
                        this.Messages = res.data.data.data;
                        this.paging = res.data.data.count;
                        this.Messages_s = false;
                    } else {
                        this.Messages_s = true;
                        this.Messages = [];
                    }
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = true;
                this.isNew1 = false;
                this.isNew2 = false;
                this.isPhone = false;
                this.message = '收藏';
                this.font = 'fa-heart';
            },
//            短信提醒
            phone_remind(val){
                this.$http.get('message/message/dict').then((res) => {
                    this.dict = res.data;

                    this.paging = '';
                    this.$http.get('message/sms/smsList?pages=' + val).then((res) => {
                        if (res.data.code === '20000') {
                            this.phones = res.data.data.list;
                            this.paging = res.data.data.pages;
                            this.ShowPhone = false;
                        } else {
                            this.ShowPhone = true;
                            this.phones = [];
                        }
                    });
                    this.beforePage = val;
                    this.isSystem = false;
                    this.isExamine = false;
                    this.isSubstitute = false;
                    this.isSecretary = false;
                    this.isMessage = false;
                    this.isNew1 = false;
                    this.isNew2 = false;
                    this.isPhone = true;
                    this.message = '短信提醒';
                    this.font = 'fa-heart';
                });
            },
//            重新发送
            repeatSms (val){
                if (this.simulate.indexOf('Sms/smsList') > -1 || this.isSuper) {
                    this.$http.get('message/sms/repeatSms?id=' + val).then((res) => {
                        if (res.data.code === '20010') {
                            this.successMsg(res.data.msg);
                            this.phone_remind(this.beforePage);
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    });
                }
            },
            isCollect(val){
                this.$http.post('message/message/favourite', {
                    mess_id: val
                }).then((res) => {
                    if (res.data.code === '100054' || res.data.code === '100052') {
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.system_page(this.beforePage);
                    }
                });
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>

<style scoped>

    @media screen and (max-width: 767px) {
        .table.table-responsive > .table > tbody > tr > td.phone {
            min-width: 360px;
            max-width: 466px;
            white-space: normal;
            word-wrap: break-word;
        }
    }

    #main-content {
        margin-left: 0;
    }

    .more_info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 300px;
        cursor: pointer
    }

    .width60 {
        min-width: 60px;
    }

    .width80 {
        min-width: 80px;
    }

    .width90 {
        min-width: 90px;
    }

    .width180 {
        min-width: 180px;
    }

    .wrapper {
        margin-top: 0;
    }

    .user-head .user-name {
        text-align: left;
    }

    ul.inbox-nav li a {
        line-height: 60px;
    }

    ul.inbox-nav li {
        line-height: 60px;
    }

    .label {
        display: inline-block;
        width: 78px;
    }
</style>