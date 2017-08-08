<template>
    <div class="loading-box">
        <!--header start-->
        <header class="header white-bg">
            <div class="sidebar-toggle-box">
                <div data-original-title="" data-placement="right" class="fa fa-bars tooltips"></div>
            </div>
            <!--logo start-->
            <router-link to="/index" class="logo">B<span>OSS</span></router-link>
            <!--logo end-->
            <!--<div class="nav notify-row" id="top_menu">-->
            <!--&lt;!&ndash;  notification start &ndash;&gt;-->
            <!--<ul class="nav top-menu">-->
            <!--&lt;!&ndash; settings start &ndash;&gt;-->
            <!--<li class="dropdown">-->
            <!--<a data-toggle="dropdown" class="dropdown-toggle" href="#">-->
            <!--<i class="fa fa-tasks"></i>-->
            <!--<span class="badge bg-success">6</span>-->
            <!--</a>-->
            <!--<ul class="dropdown-menu extended tasks-bar">-->
            <!--<div class="notify-arrow notify-arrow-green"></div>-->
            <!--<li>-->
            <!--<p class="green">You have 6 pending tasks</p>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<div class="task-info">-->
            <!--<div class="desc">Dashboard v1.3</div>-->
            <!--<div class="percent">40%</div>-->
            <!--</div>-->
            <!--<div class="progress progress-striped">-->
            <!--<div class="progress-bar progress-bar-success" role="progressbar"-->
            <!--aria-valuenow="40"-->
            <!--aria-valuemin="0" aria-valuemax="100" style="width: 40%">-->
            <!--<span class="sr-only">40% Complete (success)</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<div class="task-info">-->
            <!--<div class="desc">Database Update</div>-->
            <!--<div class="percent">60%</div>-->
            <!--</div>-->
            <!--<div class="progress progress-striped">-->
            <!--<div class="progress-bar progress-bar-warning" role="progressbar"-->
            <!--aria-valuenow="60"-->
            <!--aria-valuemin="0" aria-valuemax="100" style="width: 60%">-->
            <!--<span class="sr-only">60% Complete (warning)</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<div class="task-info">-->
            <!--<div class="desc">Iphone Development</div>-->
            <!--<div class="percent">87%</div>-->
            <!--</div>-->
            <!--<div class="progress progress-striped">-->
            <!--<div class="progress-bar progress-bar-info" role="progressbar"-->
            <!--aria-valuenow="20"-->
            <!--aria-valuemin="0" aria-valuemax="100" style="width: 87%">-->
            <!--<span class="sr-only">87% Complete</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<div class="task-info">-->
            <!--<div class="desc">Mobile App</div>-->
            <!--<div class="percent">33%</div>-->
            <!--</div>-->
            <!--<div class="progress progress-striped">-->
            <!--<div class="progress-bar progress-bar-danger" role="progressbar"-->
            <!--aria-valuenow="80"-->
            <!--aria-valuemin="0" aria-valuemax="100" style="width: 33%">-->
            <!--<span class="sr-only">33% Complete (danger)</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<div class="task-info">-->
            <!--<div class="desc">Dashboard v1.3</div>-->
            <!--<div class="percent">45%</div>-->
            <!--</div>-->
            <!--<div class="progress progress-striped active">-->
            <!--<div class="progress-bar" role="progressbar" aria-valuenow="45"-->
            <!--aria-valuemin="0"-->
            <!--aria-valuemax="100" style="width: 45%">-->
            <!--<span class="sr-only">45% Complete</span>-->
            <!--</div>-->
            <!--</div>-->

            <!--</a>-->
            <!--</li>-->
            <!--<li class="external">-->
            <!--<a href="#">See All Tasks</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</li>-->
            <!--&lt;!&ndash; settings end &ndash;&gt;-->
            <!--&lt;!&ndash; inbox dropdown start&ndash;&gt;-->
            <!--<li id="header_inbox_bar" class="dropdown">-->
            <!--<a data-toggle="dropdown" class="dropdown-toggle" href="#">-->
            <!--<i class="fa fa-envelope-o"></i>-->
            <!--<span class="badge bg-important">5</span>-->
            <!--</a>-->
            <!--<ul class="dropdown-menu extended inbox">-->
            <!--<div class="notify-arrow notify-arrow-red"></div>-->
            <!--<li>-->
            <!--<p class="red">You have 5 new messages</p>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="photo"><img alt="avatar"-->
            <!--src="./../../assets/img/avatar-mini.jpg"></span>-->
            <!--<span class="subject">-->
            <!--<span class="from">Jonathan Smith</span>-->
            <!--<span class="time">Just now</span>-->
            <!--</span>-->
            <!--<span class="message">-->
            <!--Hello, this is an example msg.-->
            <!--</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="photo"><img alt="avatar"-->
            <!--src="./../../assets/img/avatar-mini2.jpg"></span>-->
            <!--<span class="subject">-->
            <!--<span class="from">Jhon Doe</span>-->
            <!--<span class="time">10 mins</span>-->
            <!--</span>-->
            <!--<span class="message">-->
            <!--Hi, Jhon Doe Bhai how are you ?-->
            <!--</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="photo"><img alt="avatar"-->
            <!--src="./../../assets/img/avatar-mini3.jpg"></span>-->
            <!--<span class="subject">-->
            <!--<span class="from">Jason Stathum</span>-->
            <!--<span class="time">3 hrs</span>-->
            <!--</span>-->
            <!--<span class="message">-->
            <!--This is awesome dashboard.-->
            <!--</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="photo"><img alt="avatar"-->
            <!--src="./../../assets/img/avatar-mini4.jpg"></span>-->
            <!--<span class="subject">-->
            <!--<span class="from">Jondi Rose</span>-->
            <!--<span class="time">Just now</span>-->
            <!--</span>-->
            <!--<span class="message">-->
            <!--Hello, this is metrolab-->
            <!--</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">See all messages</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</li>-->
            <!-- inbox dropdown end -->
            <!-- notification dropdown start-->
            <!--<li id="header_notification_bar" class="dropdown">-->
            <!--<a data-toggle="dropdown" class="dropdown-toggle" href="#">-->
            <!--<i class="fa fa-bell-o"></i>-->
            <!--<span class="badge bg-warning">7</span>-->
            <!--</a>-->
            <!--<ul class="dropdown-menu extended notification">-->
            <!--<div class="notify-arrow notify-arrow-yellow"></div>-->
            <!--<li>-->
            <!--<p class="yellow">You have 7 new notifications</p>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="label label-danger"><i class="fa fa-bolt"></i></span>-->
            <!--Server #3 overloaded.-->
            <!--<span class="small italic">34 mins</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="label label-warning"><i class="fa fa-bell"></i></span>-->
            <!--Server #10 not respoding.-->
            <!--<span class="small italic">1 Hours</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="label label-danger"><i class="fa fa-bolt"></i></span>-->
            <!--Database overloaded 24%.-->
            <!--<span class="small italic">4 hrs</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="label label-success"><i class="fa fa-plus"></i></span>-->
            <!--New user registered.-->
            <!--<span class="small italic">Just now</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">-->
            <!--<span class="label label-info"><i class="fa fa-bullhorn"></i></span>-->
            <!--Application error.-->
            <!--<span class="small italic">10 mins</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a href="#">See all notifications</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</li>-->
            <!-- notification dropdown end -->
            <!--</ul>-->
            <!--</div>-->
            <div class="top-nav">
                <div class="nav notify-row" id="top_menu" style="display: inline-block;width: 26px;margin-top: 8px;">
                    <ul>
                        <li id="header_notification_bar" class="dropdown">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#" style="font-size: 20px;">
                                <i class="fa fa-bell-o"></i>
                                <span class="badge bg-warning" style="top: -6px;right: -12px;">{{new_info.count}}</span>
                            </a>
                            <ul class="dropdown-menu extended notification roll"
                                style="top: 30px;left: -88px;">
                                <div class="notify-arrow notify-arrow-yellow" style="left: 88px;"></div>
                                <li>
                                    <p class="yellow">您有 {{new_info.count}} 条新消息</p>
                                </li>
                                <li>
                                    <router-link :to="{path:'/messageCenter',query: {nameId: 'sys_mess'}}">
                                        <span class="label label-success" style="padding: 2px 4px;"><i
                                                class="fa fa-volume-up"></i></span>
                                        您有&nbsp;<span class="text-danger">{{new_info.sys_mess}}</span>&nbsp;条系统公告未读
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{path:'/messageCenter',query: {nameId: 'appr_mess'}}">
                                        <span class="label label-success" style="padding: 2px 4px;"><i
                                                class="fa fa-volume-up"></i></span>
                                        您有&nbsp;<span class="text-danger">{{new_info.appr_mess}}</span>&nbsp;条审批提醒未读
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{path:'/messageCenter',query: {nameId: 'remind_mess'}}">
                                        <span class="label label-success" style="padding: 2px 4px;"><i
                                                class="fa fa-volume-up"></i></span>
                                        您有&nbsp;<span class="text-danger">{{new_info.remind_mess}}</span>&nbsp;条待办提醒未读
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{path:'/messageCenter',query: {nameId: 'secre_mess'}}">
                                        <span class="label label-success" style="padding: 2px 4px;"><i
                                                class="fa fa-volume-up"></i></span>
                                        您有&nbsp;<span class="text-danger">{{new_info.secre_mess}}</span>&nbsp;条BOSS小秘书未读
                                    </router-link>
                                    <!--{{info.message.data.object}}-->
                                    <!--<span class="small italic">{{info.message.create_time}}</span>-->
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul class="nav pull-right top-menu">
                    <!--<li>-->
                    <!--<input type="text" class="form-control search" placeholder="">-->
                    <!--</li>-->
                    <!-- user login dropdown start-->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <img alt="" :src="Card" style="width: 30px;height: 30px;border-radius:50% ">
                            <span class="username">{{Name}}</span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu extended logout">
                            <div class="log-arrow-up"></div>
                            <li><a @click="addReminds"><i class="fa fa-plus"></i>增加提醒</a></li>
                            <li><a @click="lookRemind"><i class="fa fa-eye"></i>查看提醒</a></li>
                            <li><router-link to="/HeaderMemorandum"><i class="fa fa-book"></i>备忘录</router-link></li>
                            <li><a @click="lock_screen(lockScreen,1)"><i class="fa fa fa-lock"></i>锁屏</a></li>
                            <li><a @click="lock_state"><i class="fa fa-key"></i>修改锁屏密码</a></li>
                            <li v-show="!isPc" @click="saveCheckIn"><a><i class="fa fa-map-marker"></i>签到</a></li>
                            <li><a @click="logOut"><i class="fa  fa-sign-out"></i>退出登录</a></li>
                        </ul>
                    </li>
                    <!-- user login dropdown end -->
                    <li class="sb-toggle-right" v-if="false">
                        <i class="fa  fa-align-right"></i>
                    </li>
                </ul>
            </div>
        </header>
        <!--header end-->
        <!--sidebar start-->
        <aside>
            <div id="sidebar" class="nav-collapse ">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion">
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-user"></i>
                            <span>客户管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 1}" @click='pitch_on(1)'>
                                <router-link to='/custom'>客户</router-link>
                            </li>
                            <li :class="{'active': isActive == 2}" @click='pitch_on(2)'>
                                <router-link to='/customerPool'>客户池</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-home"></i>
                            <span>房源管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 3}" @click='pitch_on(3)'>
                                <router-link to='/okCollect'>公司房源</router-link>
                            </li>
                            <li :class="{'active': isActive == 4}" @click='pitch_on(4)'>
                                <router-link to='/noCollect'>待收房源</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-file-text"></i>
                            <span>合同管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 24}" @click='pitch_on(24)'>
                                <router-link to="/collectContract">
                                    <span>收房合同</span>
                                </router-link>
                            </li>
                            <li :class="{'active': isActive == 25}" @click='pitch_on(25)'>
                                <router-link to="/rentingContract">
                                    <span>租房合同</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-envelope"></i>
                            <span>片区经理报备</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 34}" @click='pitch_on(34)'>
                                <router-link to='/reportedCollect'>收房报备</router-link>
                            </li>
                            <li :class="{'active': isActive == 35}" @click='pitch_on(35)'>
                                <router-link to='/reportedRenting'>租房报备</router-link>
                            </li>
                            <li :class="{'active': isActive == 36}" @click='pitch_on(36)'>
                                <router-link to='/reportedOther'>其余款项报备</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>财务账本</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 'clientManage'}" @click='pitch_on("clientManage")'>
                                <router-link to="/clientManage">
                                    <span>客户管理</span>
                                </router-link>
                            </li>
                            <li :class="{'active': isActive == 24}" @click='pitch_on(24)'>
                                <router-link to="/account">
                                    <span>账户管理</span>
                                </router-link>
                            </li>

                            <li :class="{'active': isActive == 25}" @click='pitch_on(25)'>
                                <router-link to="/subject">
                                    <span>科目管理</span>
                                </router-link>
                            </li>
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>科目管理</span>
                                </a>
                                <ul class="sub">
                                    <li>
                                        <router-link to="/subject">科目</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/classify">归类</router-link>
                                    </li>
                                </ul>
                            </li>-->
                            <!--<li>
                                <router-link to="/jurisdiction">
                                    <span>权限管理</span>
                                </router-link>
                            </li>-->
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>收支流水</span>
                                </a>
                                <ul class="sub">
                                    <li>
                                        <router-link to="/collectFlow">应收</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/payFlow">应付</router-link>
                                    </li>
                                </ul>
                            </li>-->

                            <li :class="{'active': isActive == 26}" @click='pitch_on(26)'>
                                <router-link to="/payPayment">
                                    <span>应付款项</span>
                                </router-link>
                            </li>
                            <li :class="{'active': isActive == 27}" @click='pitch_on(27)'>
                                <router-link to="/collectPayment">
                                    <span>应收款项</span>
                                </router-link>
                            </li>

                            <li :class="{'active': isActive == 28}" @click='pitch_on(28)'>
                                <router-link to="/incomeFlow">
                                    <span>收支流水</span>
                                </router-link>
                            </li>
                            <li :class="{'active': isActive == 29}" @click='pitch_on(29)'>
                                <router-link to="/generalRecord">
                                    <span>转账操作记录</span>
                                </router-link>
                            </li>
                            <li :class="{'active': isActive == 30}" @click='pitch_on(30)'>
                                <router-link to="/pendingItem">
                                    <span>待处理项</span>
                                </router-link>
                            </li>
                            <!--<li>
                                <router-link to="/generalOperation">
                                    <span>总账操作</span>
                                </router-link>
                            </li>-->

                            <!--<li>
                                <router-link to="/chart">
                                    <span>可视报表</span>
                                </router-link>
                            </li>-->
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-bar-chart-o"></i>
                            <span>业绩管理</span>
                        </a>
                        <ul class="sub">
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>喜报管理</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 14}" @click='pitch_on(14)'>
                                        <router-link to="/gNCollect">收房</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 15}" @click='pitch_on(15)'>
                                        <router-link to="/gNRenting">租房</router-link>
                                    </li>
                                </ul>
                            </li>-->
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>公司业绩</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 16}" @click='pitch_on(16)'>
                                        <router-link to="/cACollect">收房</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 17}" @click='pitch_on(17)'>
                                        <router-link to="/cARenting">租房</router-link>
                                    </li>
                                </ul>
                            </li>-->
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>业务员工资</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 16}" @click='pitch_on(16)'>
                                        <router-link to="/dream">梦想包</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 17}" @click='pitch_on(17)'>
                                        <router-link to="/drumstick">鸡腿包</router-link>
                                    </li>
                                </ul>
                            </li>-->
                            <li class="sub-menu">
                                <a href="javascript:;">
                                    <span>周期表</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 18}" @click='pitch_on(18)'>
                                        <router-link to="/periodicForGroup">小组</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 19}" @click='pitch_on(19)'>
                                        <router-link to="/periodicForPeople">个人</router-link>
                                    </li>
                                </ul>
                            </li>
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>每单工资</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 20}" @click='pitch_on(20)'>
                                        <router-link to="/wACollect">收房</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 21}" @click='pitch_on(21)'>
                                        <router-link to="/wARenting">租房</router-link>
                                    </li>
                                </ul>
                            </li>-->
                            <!--<li class="sub-menu">
                                <a href="javascript:;">
                                    <span>中介费申请</span>
                                </a>
                                <ul class="sub">
                                    <li>
                                        <router-link to="/aFACollect">收房</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/aFARenting">租房</router-link>
                                    </li>
                                </ul>
                            </li>-->
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-sitemap"></i>
                            <span>人资管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 8}" @click='pitch_on(8)'>
                                <router-link to='/user'>用户管理</router-link>
                            </li>
                            <li class="sub-menu">
                                <a href="javascript:;">
                                    <span>订单迁移</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 22}" @click='pitch_on(22)'>
                                        <router-link to='/orderManage'>收房</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 23}" @click='pitch_on(23)'>
                                        <router-link to="/rentingOrder">租房</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li :class="{'active': isActive == 9}" @click='pitch_on(9)'>
                                <router-link to='/role'>角色管理</router-link>
                            </li>
                            <li :class="{'active': isActive == 10}" @click='pitch_on(10)'>
                                <router-link to='/power'>权限管理</router-link>
                            </li>
                        </ul>
                    </li>
                    <!--<li :class="{'active': isActive == 13}" @click='pitch_on(13)'>-->
                    <!--<router-link to="/village">-->
                    <!--<i class="fa fa-dashboard"></i>-->
                    <!--<span>小区管理</span>-->
                    <!--</router-link>-->
                    <!--</li>-->


                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-pencil-square-o"></i>
                            <span>日志管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 31}" @click='pitch_on(31)'>
                                <router-link to='/logRecord'>操作记录</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa  fa-share-square-o"></i>
                            <span>导出管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 36}" @click='pitch_on(36)'>
                                <router-link to='/leadingOut'>客户导出</router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="{'active': isActive == 32}" @click='pitch_on(32)'>
                        <router-link to='/messageCenter'>
                            <i class="fa fa-bell-o"></i>
                            <span>消息中心</span>
                        </router-link>
                    </li>
                    <li :class="{'active': isActive == 33}" @click='pitch_on(33)'>
                        <router-link to="/checkIn">
                            <i class="fa fa-map-marker"></i>
                            <span>带看打卡</span>
                        </router-link>
                    </li>
                    <li :class="{'active': isActive == 37}" @click='pitch_on(37)'>
                        <router-link to="/punchRecord">
                            <i class="fa fa-map-marker"></i>
                            <span>打卡记录</span>
                        </router-link>
                    </li>
                </ul>
                <!-- sidebar menu end-->
            </div>
        </aside>
        <!--sidebar end-->
        <!-- Right Slidebar start -->
        <div class="sb-slidebar sb-right sb-style-overlay">
            <h5 class="side-title">Online Customers</h5>
            <ul class="quick-chat-list">
                <li class="online">
                    <div class="media">
                        <a href="#" class="pull-left media-thumb">
                            <img alt="" src="../../assets/img/chat-avatar2.jpg" class="media-object">
                        </a>
                        <div class="media-body">
                            <strong>John Doe</strong>
                            <small>Dream Land, AU</small>
                        </div>
                    </div><!-- media -->
                </li>
                <li class="online">
                    <div class="media">
                        <a href="#" class="pull-left media-thumb">
                            <img alt="" src="../../assets/img/chat-avatar.jpg" class="media-object">
                        </a>
                        <div class="media-body">
                            <div class="media-status">
                                <span class=" badge bg-important">3</span>
                            </div>
                            <strong>Jonathan Smith</strong>
                            <small>United States</small>
                        </div>
                    </div><!-- media -->
                </li>

                <li class="online">
                    <div class="media">
                        <a href="#" class="pull-left media-thumb">
                            <img alt="" src="../../assets/img/pro-ac-1.png" class="media-object">
                        </a>
                        <div class="media-body">
                            <div class="media-status">
                                <span class=" badge bg-success">5</span>
                            </div>
                            <strong>Jane Doe</strong>
                            <small>ABC, USA</small>
                        </div>
                    </div><!-- media -->
                </li>
                <li class="online">
                    <div class="media">
                        <a href="#" class="pull-left media-thumb">
                            <img alt="" src="../../assets/img/avatar1.jpg" class="media-object">
                        </a>
                        <div class="media-body">
                            <strong>Anjelina Joli</strong>
                            <small>Fockland, UK</small>
                        </div>
                    </div><!-- media -->
                </li>
                <li class="online">
                    <div class="media">
                        <a href="#" class="pull-left media-thumb">
                            <img alt="" src="../../assets/img/mail-avatar.jpg" class="media-object">
                        </a>
                        <div class="media-body">
                            <div class="media-status">
                                <span class=" badge bg-warning">7</span>
                            </div>
                            <strong>Mr Tasi</strong>
                            <small>Dream Land, USA</small>
                        </div>
                    </div><!-- media -->
                </li>
            </ul>
            <h5 class="side-title"> pending Task</h5>
            <ul class="p-task tasks-bar">
                <li>
                    <a href="#">
                        <div class="task-info">
                            <div class="desc">Dashboard v1.3</div>
                            <div class="percent">40%</div>
                        </div>
                        <div class="progress progress-striped">
                            <div style="width: 40%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="40"
                                 role="progressbar" class="progress-bar progress-bar-success">
                                <span class="sr-only">40% Complete (success)</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="task-info">
                            <div class="desc">Database Update</div>
                            <div class="percent">60%</div>
                        </div>
                        <div class="progress progress-striped">
                            <div style="width: 60%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60"
                                 role="progressbar" class="progress-bar progress-bar-warning">
                                <span class="sr-only">60% Complete (warning)</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="task-info">
                            <div class="desc">Iphone Development</div>
                            <div class="percent">87%</div>
                        </div>
                        <div class="progress progress-striped">
                            <div style="width: 87%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="20"
                                 role="progressbar" class="progress-bar progress-bar-info">
                                <span class="sr-only">87% Complete</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="task-info">
                            <div class="desc">Mobile App</div>
                            <div class="percent">33%</div>
                        </div>
                        <div class="progress progress-striped">
                            <div style="width: 33%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="80"
                                 role="progressbar" class="progress-bar progress-bar-danger">
                                <span class="sr-only">33% Complete (danger)</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="task-info">
                            <div class="desc">Dashboard v1.3</div>
                            <div class="percent">45%</div>
                        </div>
                        <div class="progress progress-striped active">
                            <div style="width: 45%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="45"
                                 role="progressbar" class="progress-bar">
                                <span class="sr-only">45% Complete</span>
                            </div>
                        </div>

                    </a>
                </li>
                <li class="external">
                    <a href="#">See All Tasks</a>
                </li>
            </ul>
        </div>

        <div role="dialog" class="modal fade bs-example-modal-sm" id="lock_screen">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">设置密码</h4>
                    </div>
                    <div class="modal-body">
                        <div v-if="lock_status" class="form-group">
                            <input type="text" class="form-control" v-model="lockScreen"
                                   @keyup.enter.prevent="set_password"
                                   placeholder="请输入密码">
                        </div>
                        <div v-if="!lock_status" class="form-group">
                            <input type="text" class="form-control" v-model="lockScreen"
                                   @keyup.enter.prevent="revise_password(lockScreen)"
                                   placeholder="请输入密码">
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-default btn-md" @click="lock_empty">取消</button>
                        <button v-if="lock_status" class="btn btn-primary btn-md" @click="set_password">确认</button>
                        <button v-if="!lock_status" class="btn btn-primary btn-md" @click="revise_password(lockScreen)">
                            修改
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>

        <!-- 查看提醒-->
        <LookRemind @delete_rem="lookRemind" :msg="remind_info"></LookRemind>

        <!--增加提醒-->
        <AddRemind></AddRemind>
    </div>
</template>

<script>
    import LookRemind from '../common/remind/checkRemind.vue';
    import AddRemind from  '../common/remind/addRemind.vue'
    import Status from '../common/status.vue';
    export default {
        components: {AddRemind, Status, LookRemind},
        props: ['Name', 'Card'],
        data(){
            return {

                remind_info: [],            //查看提醒
                isActive: 0,
                new_info: {},               //未读信息
                lock_status: true,
                lockScreen: '',             //锁屏
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
                isPc: '',
                mapMsg: {
                    province: '',
                    city: '',
                    district: '',
                    street: '',
                    township: '',
                    streetNumber: '',
                    location: ''
                }
            }
        },
        mounted(){
            this.isPc = this.IsPC();
            this.new_infos();
            setInterval(function () {
                $.ajax({
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    url: globalConfig.server + 'message/message/self_mess',
                    success: (data) => {
                        this.new_info = data.data;
                    }
                })
            }.bind(this), 60000);
        },
        methods: {
//            新消息提醒
            new_infos (){
                this.$http.post('message/message/self_mess').then((res) => {
                    this.new_info = res.data.data;
                })
            },
//            清空密码锁
            lock_empty (){
                this.lockScreen = '';
            },
//            左侧栏点击颜色
            pitch_on (n){
                this.isActive = n;
            },
            logOut (){
                this.$http.post('staff/logout').then(() => {
                    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (keys) {
                        for (let i = keys.length; i--;)
                            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                    }
                    window.location.href = "login.html";
                })
            },
            clearCookie(){

            },
//            查看提醒
            lookRemind(){
                $('#checkRemind').modal({
                    backdrop: 'static',         //空白处不消失
                });
                this.$http.post('message/remind/index', {
                    not_remind: '1'
                }).then((res) => {
                    if (res.data.code === '100020') {
                        this.remind_info = res.data.data.data;
                    } else {
                        this.remind_info = [];
                    }
                });
            },
//            增加提醒
            addReminds(){
                $('#addRemind').modal({
                    backdrop: 'static',         //空白处不消失
                });
            },
//            修改锁屏密码
            lock_state (){
                $('#lock_screen').modal({
                    backdrop: 'static',         //空白处不消失
                });
                this.lock_status = false;
            },
//            锁屏
            lock_screen (val, lock){
                this.lock_status = true;
                this.$http.post('auth/auth/lock_screen_status', {
                    set_pwd_lock: val,
                    lock_status: lock
                }).then((res) => {
                    if (res.data.code === '80034') {
                        $('#lock_screen').modal({
                            backdrop: 'static',         //空白处不消失
                        });
                    }
                    if (res.data.code === '80035') {
                        this.$router.push({path: 'lockScreen'});
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }
                    if (res.data.code === '80030') {
                        $('#lock_screen').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.lockScreen = ''
                    }
                });
            },
//            设置密码
            set_password (){
                this.lock_screen(this.lockScreen);
            },
//            修改密码
            revise_password (val){
                if (this.lockScreen === '') {
                    //失败信息 ***
                    this.info.error = '密码不能为空';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
                this.$http.post('auth/auth/lock_screen_status', {
                    set_pwd_lock: val,
                }).then((res) => {
                    if (res.data.code === '80035') {
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }
                    if (res.data.code === '80030') {
                        $('#lock_screen').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.lockScreen = ''
                    }
                    if (res.data.code === '80031') {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            saveCheckIn(){
                let _this = this;

                let map, geolocation;
                //加载地图，调用浏览器定位服务
                map = new AMap.Map('aa', {
                    resizeEnable: true
                });
                map.plugin('AMap.Geolocation', function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        buttonPosition: 'RB'
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
                });
                //解析定位结果
                function onComplete(data) {
                    console.log(data);
                    _this.mapMsg.location = data.position.getLng() + ',' + data.position.getLat();
                    _this.mapMsg.province = data.addressComponent.province;
                    _this.mapMsg.city = data.addressComponent.city;
                    _this.mapMsg.district = data.addressComponent.district;
                    _this.mapMsg.street = data.addressComponent.street;
                    _this.mapMsg.township = data.addressComponent.township;
                    _this.mapMsg.streetNumber = data.addressComponent.streetNumber;
//                    console.log(typeof _this.mapMsg.location);
//                    alert(_this.mapMsg.location);

                    _this.$http.post('amap/signin/saveSignin', _this.mapMsg)
                        .then(
                            (res) => {
                                if (res.data.code == 20020) {
                                    _this.info.success = '签到成功';
                                    //关闭失败弹窗 ***
                                    _this.info.state_error = false;
                                    //显示成功弹窗 ***
                                    _this.info.state_success = true;
                                } else {
//                                    _this.info.error = res.data.msg;
                                    _this.info.error = '签到失败';
                                    //关闭失败弹窗 ***
                                    _this.info.state_error = true;
                                    //显示成功弹窗 ***
                                    _this.info.state_success = false;
                                }
                            }
                        )
                }

                function onError(data) {
                    alert('定位失败');
//                    alert(data);
//                    console.log(data);
                }
            },
            IsPC(){
                let userAgentInfo = navigator.userAgent;
                let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            }
        }
    }
</script>


<style scoped>
    ul.top-menu > li > a {
        border: none !important;
    }

    .modal-body textarea {
        max-width: 100%;
    }

    .sub-menu i {
        width: 21px;
    }
</style>