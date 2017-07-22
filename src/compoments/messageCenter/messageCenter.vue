<template>
    <div>
        <!--<ol class="breadcrumb">-->
        <!--<li><a href="#">Home</a></li>-->
        <!--<li><a href="#">Library</a></li>-->
        <!--<li class="active">Data</li>-->
        <!--</ol>-->
        <section id="main-content" style="margin-top:0;">
            <section class="wrapper">
                <div class="mail-box">
                    <aside class="sm-side">
                        <div class="user-head" style="padding: 10px 20px;">
                            <div class="user-name">
                                <h3>我的消息</h3>
                            </div>
                        </div>
                        <ul class="inbox-nav inbox-divider">
                            <li @click="System(1)"><!--:class="{active: act === 'sys_mess'}"-->
                                <a href="#">
                                    <i class="fa fa-volume-up"></i>系统公告
                                </a>
                            </li>
                            <li @click="Examine(1)"><!--:class="{active: act === 'appr_mess'}"-->
                                <a href="#">
                                    <i class="fa fa-user"></i>审批提醒
                                </a>
                            </li>
                            <li @click="Substitute(1)"><!--:class="{active: act === 'remind_mess'}"-->
                                <a href="#">
                                    <i class="fa fa-bell"></i>代办提醒
                                </a>
                            </li>
                            <li @click="Secretary(1)"><!--:class="{active: act === 'secre_mess'}"-->
                                <a href="#">
                                    <i class=" fa fa-github"></i>BOSS小秘书
                                </a>
                            </li>
                            <li @click="Message(1)">
                                <a href="#">
                                    <i class=" fa fa-heart"></i>收藏
                                </a>
                            </li>
                        </ul>
                    </aside>
                    <aside class="lg-side">
                        <div class="inbox-head">
                            <h3 style="font-size: 20px;padding-top: 10px;">
                                <i :class="[fa,font]"></i>&nbsp;&nbsp;{{message}}
                            </h3>
                            <form class="pull-right position" action="#">
                                <div class="input-append" v-if="isSystem">
                                    <button type="button" class="btn btn-primary" @click="addAnnouncement"
                                            style="padding: 11px 12px;">
                                        <i class="fa fa-plus-square"></i>&nbsp;添加公告
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="inbox-body panel table table-responsive">
                            <!--系统公告-->
                            <table class="table table-striped table-advance table-hover" v-if="isSystem">
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
                                <tr class="unread" v-for="sys in systems" @click="announceDetail(sys)">
                                    <td class="text-center">{{sys.message.create_time}}</td>
                                    <td class="text-center">{{sys.message.release_name}}</td>
                                    <td class="text-center">{{sys.message.data.title}}</td>
                                    <td class="text-center">{{sys.message.data.content}}</td>
                                    <td class="text-center">{{sys.read_time}}</td>
                                    <td class="text-center">
                                        <i class="fa fa-folder" @click.stop="receive(sys.id)"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" v-if="sys.favourite_status === '已收藏'"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--审批提醒-->
                            <table class="table table-striped table-advance table-hover" v-if="isExamine">
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
                                <tr class="unread" v-for="sys in Examines">
                                    <td class="text-center">{{sys.message.create_time}}</td>
                                    <td class="text-center">{{sys.message.release_name}}</td>
                                    <td class="text-center">{{sys.message.data.category}}</td>
                                    <td class="text-center">{{sys.message.data.content}}</td>
                                    <td class="text-center">{{sys.receive_name}}</td>
                                    <td class="text-center">
                                        <span class="label label-success ">{{sys.message.data.approval_type}}</span>
                                    </td>
                                    <td class="text-center">
                                        <i class="fa fa-folder" @click.stop="receive(sys.id)"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" v-if="sys.favourite_status === '已收藏'"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"
                                           @click.stop="isCollect(sys.mess_id)"></i>


                                        <!--<i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"></i>-->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--代办提醒-->
                            <table class="table table-striped table-advance table-hover" v-if="isSubstitute">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">提醒时间</th>
                                    <th class="text-center">提醒人</th>
                                    <th class="text-center">提醒内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in Substitutes">
                                    <td class="text-center">{{sys.message.create_time}}</td>
                                    <td class="text-center">{{sys.message.release_name}}</td>
                                    <td class="text-center">{{sys.message.data.content}}</td>
                                    <td class="text-center">
                                        <i class="fa fa-folder" @click.stop="receive(sys.id)"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" v-if="sys.favourite_status === '已收藏'"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--BOSS小秘书-->
                            <table class="table table-striped table-advance table-hover" v-if="isSecretary">
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
                                <tr class="unread" v-for="sys in Secretarys">
                                    <td class="text-center">{{sys.message.create_time}}</td>
                                    <td class="text-center">{{sys.message.data.send_name}}</td>
                                    <td class="text-center">{{sys.message.type}}</td>
                                    <td class="text-center">{{sys.message.data.content}}</td>
                                    <td class="text-center">
                                        <i class="fa fa-folder" @click.stop="receive(sys.id)"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" v-if="sys.favourite_status === '已收藏'"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--收藏-->
                            <table class="table table-striped table-advance table-hover" v-if="isMessage">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">收藏时间时间</th>
                                    <th class="text-center">相关对象</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" @click="announceDetail(sys)" v-for="sys in Messages">
                                    <td class="text-center">{{sys.create_time}}</td>
                                    <td class="text-center">{{sys.release_name}}</td>
                                    <td class="text-center">{{sys.type}}</td>
                                    <td class="text-center">{{sys.content}}</td>
                                    <td class="text-center" @click.stop="isCollect(sys.mess_id)">
                                        <i class="fa fa-folder" @click.stop="receive(sys.id)"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" style="color: #e4393c"></i>
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

        <Page @pag="system_page" :pg="paging" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>

        <!--增加系统公告-->

        <AnnouncementAdd></AnnouncementAdd>

        <AnnouncementDetail @receive="System(beforePage)" :msg="info_details"></AnnouncementDetail>
    </div>
</template>
<script>
    import Status from '../common/status.vue';
    import Page from '../common/page.vue';
    import AnnouncementAdd from './announcementAdd.vue'
    import AnnouncementDetail from './announcemeDetail.vue'
    export default{
        components: {
            AnnouncementAdd,
            AnnouncementDetail,
            Status,
            Page
        },
        created (){
            this.System(1);
            this.status_info(this.$route.query.nameId);
        },
        data(){
            return {
                act: '',
                beforePage: 1,
                paging: '',                 //总页数
                info_details: {},           //信息详情
                systems: [],                //公告信息
                Examines: [],               //审批提醒
                Substitutes: [],            //代办提醒
                Secretarys: [],             //BOSS小秘书
                Messages: [],               //收藏

                isSystem: true,
                isExamine: false,
                isSubstitute: false,
                isSecretary: false,
                isMessage: false,
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
        methods: {
            receive (val){
                this.$http.post('message/message/read_mess', {
                    id: val,
                }).then((res) => {
                    this.system_page(this.beforePage);
                });
            },
//            跳转
            status_info (val){
                if (val === 'sys_mess') {
                    this.act = val;
                    this.System(1);
                }
                if (val === 'appr_mess') {
                    this.act = val;
                    this.Examine(1);
                }
                if (val === 'remind_mess') {
                    this.act = val;
                    this.Substitute(1);
                }
                if (val === 'secre_mess') {
                    this.act = val;
                    this.Secretary(1);
                }
            },

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

                if (this.isMessage === true) {
                    this.Message(val);
                }
            },
            addAnnouncement(){
                $('#announcementAdd').modal('show');
            },
            announceDetail(val){
                this.info_details = val;
                $('#announceDetail').modal('show');
            },

//            系统公告
            System(val){
                this.$http.post('message/system/index/pages/' + val).then((res) => {
                    this.systems = res.data.data.list;
                    this.paging = res.data.data.pages;
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        this.info_details = res.data.data.list[0];
                    }
                });
                this.beforePage = val;
                this.isSystem = true;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = false;
                this.message = '系统公告';
                this.font = 'fa-volume-up';
            },
//            审批提醒
            Examine(val){
                this.$http.post('message/approval/index/pages/' + val).then((res) => {
                    this.Examines = res.data.data.list;
                    this.paging = res.data.data.pages;
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = true;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = false;
                this.message = '审批提醒';
                this.font = 'fa-user';
            },
//            代办提醒
            Substitute(val){
                this.$http.post('message/remind/index/pages/' + val).then((res) => {
                    this.Substitutes = res.data.data.list;
                    this.paging = res.data.data.pages;
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = true;
                this.isSecretary = false;
                this.isMessage = false;
                this.message = '代办提醒';
                this.font = 'fa-bell';
            },
//            BOSS小秘书
            Secretary(val){
                this.$http.post('message/secretary/index/pages/' + val).then((res) => {
                    this.Secretarys = res.data.data.list;
                    this.paging = res.data.data.pages;
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = true;
                this.isMessage = false;
                this.message = 'BOSS小秘书';
                this.font = 'fa-github';
            },
//            收藏
            Message(val){
                this.$http.post('message/favourite/index/pages/' + val).then((res) => {
                    this.Messages = res.data.data.data;
                    this.paging = res.data.data.count;
                });
                this.beforePage = val;
                this.isSystem = false;
                this.isExamine = false;
                this.isSubstitute = false;
                this.isSecretary = false;
                this.isMessage = true;
                this.message = '收藏';
                this.font = 'fa-heart';
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
            }
        }
    }
</script>

<style scoped>
    #main-content {
        margin-left: 0;
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
</style>