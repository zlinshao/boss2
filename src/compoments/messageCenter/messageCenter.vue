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
                        <div class="user-head">
                            <div class="user-name">
                                <h3>我的消息</h3>
                            </div>
                        </div>
                        <ul class="inbox-nav inbox-divider">
                            <li>
                                <a href="#">
                                    <i class="fa fa-volume-up"></i> 系统公告
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-user"></i> 审批提醒
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-bell"></i> 代办提醒
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class=" fa fa-github"></i> boss小秘书
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class=" fa  fa-heart"></i> 收藏
                                </a>
                            </li>
                        </ul>
                    </aside>
                    <aside class="lg-side">
                        <div class="inbox-head">
                            <h3>
                                <i class="fa fa-volume-up"></i>&nbsp;&nbsp; 系统公告
                            </h3>
                            <form class="pull-right position" action="#">
                                <div class="input-append">
                                    <button type="button" class="btn btn-primary" @click="addAnnouncement">
                                        <i class="fa fa-plus-square"></i> 添加公告
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="inbox-body panel table table-responsive">
                            <table class="table table-striped table-advance table-hover">
                                <thead>
                                    <tr>
                                        <th>发布时间</th>
                                        <th>发布人</th>
                                        <th>标题</th>
                                        <th>主要内容</th>
                                        <th>阅读时间</th>
                                        <th>收藏</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td >2017/07/07</td>
                                        <td>张三丰</td>
                                        <td>《年会》</td>
                                        <td>请大家今天9:30在创意中央总部集合</td>
                                        <td>2017/07/09</td>
                                        <td>
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
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
        <AnnouncementAdd></AnnouncementAdd>
        <AnnouncementDetail></AnnouncementDetail>
    </div>
</template>
<script>
    import AnnouncementAdd from './announcementAdd.vue'
    import AnnouncementDetail from './announcemeDetail.vue'
    export default{
        components:{AnnouncementAdd,AnnouncementDetail},
        data(){
            return{

            }
        },
        methods:{
            addAnnouncement(){
                $('#announcementAdd').modal('show');
            },
            announceDetail(){
                $('#announceDetail').modal('show');
            }
        }
    }
</script>

<style scoped>
    #main-content {
        margin-left:0;
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