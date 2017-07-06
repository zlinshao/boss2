<template>
    <div class="loading-box">
        <!--header start-->
        <header class="header white-bg">
            <div class="sidebar-toggle-box">
                <div data-original-title="" data-placement="right" class="fa fa-bars tooltips"></div>
            </div>
            <!--logo start-->
            <a class="logo">B<span>OSS</span></a>
            <!--logo end-->
            <div class="nav notify-row" id="top_menu">
                <!--  notification start -->
                <ul class="nav top-menu">
                    <!-- settings start -->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-tasks"></i>
                            <span class="badge bg-success">6</span>
                        </a>
                        <ul class="dropdown-menu extended tasks-bar">
                            <div class="notify-arrow notify-arrow-green"></div>
                            <li>
                                <p class="green">You have 6 pending tasks</p>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="task-info">
                                        <div class="desc">Dashboard v1.3</div>
                                        <div class="percent">40%</div>
                                    </div>
                                    <div class="progress progress-striped">
                                        <div class="progress-bar progress-bar-success" role="progressbar"
                                             aria-valuenow="40"
                                             aria-valuemin="0" aria-valuemax="100" style="width: 40%">
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
                                        <div class="progress-bar progress-bar-warning" role="progressbar"
                                             aria-valuenow="60"
                                             aria-valuemin="0" aria-valuemax="100" style="width: 60%">
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
                                        <div class="progress-bar progress-bar-info" role="progressbar"
                                             aria-valuenow="20"
                                             aria-valuemin="0" aria-valuemax="100" style="width: 87%">
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
                                        <div class="progress-bar progress-bar-danger" role="progressbar"
                                             aria-valuenow="80"
                                             aria-valuemin="0" aria-valuemax="100" style="width: 33%">
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
                                        <div class="progress-bar" role="progressbar" aria-valuenow="45"
                                             aria-valuemin="0"
                                             aria-valuemax="100" style="width: 45%">
                                            <span class="sr-only">45% Complete</span>
                                        </div>
                                    </div>

                                </a>
                            </li>
                            <li class="external">
                                <a href="#">See All Tasks</a>
                            </li>
                        </ul>
                    </li>
                    <!-- settings end -->
                    <!-- inbox dropdown start-->
                    <li id="header_inbox_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-envelope-o"></i>
                            <span class="badge bg-important">5</span>
                        </a>
                        <ul class="dropdown-menu extended inbox">
                            <div class="notify-arrow notify-arrow-red"></div>
                            <li>
                                <p class="red">You have 5 new messages</p>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar"
                                                             src="./../../assets/img/avatar-mini.jpg"></span>
                                    <span class="subject">
                                    <span class="from">Jonathan Smith</span>
                                    <span class="time">Just now</span>
                                    </span>
                                    <span class="message">
                                        Hello, this is an example msg.
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar"
                                                             src="./../../assets/img/avatar-mini2.jpg"></span>
                                    <span class="subject">
                                    <span class="from">Jhon Doe</span>
                                    <span class="time">10 mins</span>
                                    </span>
                                    <span class="message">
                                     Hi, Jhon Doe Bhai how are you ?
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar"
                                                             src="./../../assets/img/avatar-mini3.jpg"></span>
                                    <span class="subject">
                                    <span class="from">Jason Stathum</span>
                                    <span class="time">3 hrs</span>
                                    </span>
                                    <span class="message">
                                        This is awesome dashboard.
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="photo"><img alt="avatar"
                                                             src="./../../assets/img/avatar-mini4.jpg"></span>
                                    <span class="subject">
                                    <span class="from">Jondi Rose</span>
                                    <span class="time">Just now</span>
                                    </span>
                                    <span class="message">
                                        Hello, this is metrolab
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">See all messages</a>
                            </li>
                        </ul>
                    </li>
                    <!-- inbox dropdown end -->
                    <!-- notification dropdown start-->
                    <li id="header_notification_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">

                            <i class="fa fa-bell-o"></i>
                            <span class="badge bg-warning">7</span>
                        </a>
                        <ul class="dropdown-menu extended notification">
                            <div class="notify-arrow notify-arrow-yellow"></div>
                            <li>
                                <p class="yellow">You have 7 new notifications</p>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                    Server #3 overloaded.
                                    <span class="small italic">34 mins</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-warning"><i class="fa fa-bell"></i></span>
                                    Server #10 not respoding.
                                    <span class="small italic">1 Hours</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                    Database overloaded 24%.
                                    <span class="small italic">4 hrs</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-success"><i class="fa fa-plus"></i></span>
                                    New user registered.
                                    <span class="small italic">Just now</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="label label-info"><i class="fa fa-bullhorn"></i></span>
                                    Application error.
                                    <span class="small italic">10 mins</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">See all notifications</a>
                            </li>
                        </ul>
                    </li>
                    <!-- notification dropdown end -->
                </ul>
            </div>
            <div class="top-nav ">
                <ul class="nav pull-right top-menu">
                    <li>
                        <input type="text" class="form-control search" placeholder="">
                    </li>
                    <!-- user login dropdown start-->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <img alt="" :src="Card" style="width: 29px;height: 29px;">
                            <span class="username">{{Name}}</span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu extended logout">
                            <div class="log-arrow-up"></div>
                            <li><a href="#"><i class=" fa fa-suitcase"></i>Profile</a></li>
                            <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                            <li><a href="#"><i class="fa fa-bell-o"></i> Notification</a></li>
                            <li><a><i class="fa fa-key"></i> Log Out</a></li>
                            <!--@click="logout"-->
                        </ul>
                    </li>

                    <!-- user login dropdown end -->
                    <li class="sb-toggle-right">
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
                            <i class="fa fa-book"></i>
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
                            <i class="fa fa-book"></i>
                            <span>房屋管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 3}" @click='pitch_on(3)'>
                                <router-link to='/okCollect'>已收房源</router-link>
                            </li>
                            <li :class="{'active': isActive == 4}" @click='pitch_on(4)'>
                                <router-link to='/noCollect'>未收房源</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu" :class="{'active': isActive == 5}" @click='pitch_on(5)'>
                        <router-link to='/yi'>
                            <i class="fa fa-th"></i>
                            <span>合同管理</span>
                        </router-link>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>财务管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 6}" @click='pitch_on(6)'>
                                <router-link to='/'>业绩管理</router-link>
                            </li>
                            <li :class="{'active': isActive == 7}" @click='pitch_on(7)'>
                                <router-link to='/'>账本</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-tasks"></i>
                            <span>人资管理</span>
                        </a>
                        <ul class="sub">
                            <li :class="{'active': isActive == 8}" @click='pitch_on(8)'>
                                <router-link to='/user'>用户管理</router-link>
                            </li>
                            <li :class="{'active': isActive == 9}" @click='pitch_on(9)'>
                                <router-link to='/role'>角色管理</router-link>
                            </li>
                            <li :class="{'active': isActive == 10}" @click='pitch_on(10)'>
                                <router-link to='/power'>权限管理</router-link>
                            </li>
                        </ul>
                    </li>
                    <li :class="{'active': isActive == 13}" @click='pitch_on(13)'>
                        <router-link to="/village">
                            <i class="fa fa-dashboard"></i>
                            <span>小区管理</span>
                        </router-link>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>业绩管理</span>
                        </a>
                        <ul class="sub">
                            <li class="sub-menu">
                                <a href="javascript:;">
                                    <span>喜报录入</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 14}" @click='pitch_on(14)'>
                                        <router-link to="/gNCollect">收房</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 15}" @click='pitch_on(15)'>
                                        <router-link to="/gNRenting">租房</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="sub-menu">
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
                            </li>
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
                            <li class="sub-menu">
                                <a href="javascript:;">
                                    <span>工资业绩</span>
                                </a>
                                <ul class="sub">
                                    <li :class="{'active': isActive == 20}" @click='pitch_on(20)'>
                                        <router-link to="/wACollect">收房</router-link>
                                    </li>
                                    <li :class="{'active': isActive == 21}" @click='pitch_on(21)'>
                                        <router-link to="/wARenting">租房</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>财务账本</span>
                        </a>
                        <ul class="sub">
                            <li>
                                <router-link to="/account">
                                    <span>账号管理</span>
                                </router-link>
                            </li>
                            <li class="sub-menu">
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
                            </li>
                            <li>
                                <router-link to="/jurisdiction">
                                    <span>权限管理</span>
                                </router-link>
                            </li>
                            <li class="sub-menu">
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
                            </li>
                            <!--<li>
                                <router-link to="/incomeFlow">
                                    <span>收支流水</span>
                                </router-link>
                            </li>-->
                            <li>
                                <router-link to="/pendingItem">
                                    <span>待处理项</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/generalOperation">
                                    <span>总账操作</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/generalRecord">
                                    <span>总账操作记录</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/chart">
                                    <span>可视报表</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>合同管理</span>
                        </a>
                        <ul class="sub">
                            <li>
                                <router-link to="/collectContract">
                                    <span>收房合同</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/rentingContract">
                                    <span>租房合同</span>
                                </router-link>
                            </li>
                            <li>
                                <a href="">
                                    <span>打印合同</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sub-menu">
                        <a href="javascript:;">
                            <i class="fa fa-book"></i>
                            <span>日志管理</span>
                        </a>
                        <ul class="sub">
                            <li>
                                <router-link to='/logRecord'>操作记录</router-link>
                            </li>
                        </ul>
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
        <!-- Right Slidebar end -->
    </div>
</template>

<script>
    export default {
        props:['Name','Card'],
        data(){
            return {
                isActive: 0,
            }
        },
        methods: {
            pitch_on (n){
                this.isActive = n;
            },
        }
    }
</script>


<style scoped>

</style>