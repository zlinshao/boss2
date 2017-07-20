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
                            <li @click="System">
                                <a href="#">
                                    <i class="fa fa-volume-up"></i> 系统公告
                                </a>
                            </li>
                            <li @click="Examine">
                                <a href="#">
                                    <i class="fa fa-user"></i> 审批提醒
                                </a>
                            </li>
                            <li @click="Substitute">
                                <a href="#">
                                    <i class="fa fa-bell"></i> 代办提醒
                                </a>
                            </li>
                            <li @click="Secretary">
                                <a href="#">
                                    <i class=" fa fa-github"></i> boss小秘书
                                </a>
                            </li>
                            <li @click="Message">
                                <a href="#">
                                    <i class=" fa fa-heart"></i> 收藏
                                </a>
                            </li>
                        </ul>
                    </aside>
                    <aside class="lg-side">
                        <div class="inbox-head">
                            <h3>
                                <i :class="[fa,font]"></i>&nbsp;&nbsp;{{message}}
                            </h3>
                            <form class="pull-right position" action="#">
                                <div class="input-append" v-if="isSystem">
                                    <button type="button" class="btn btn-primary" @click="addAnnouncement">
                                        <i class="fa fa-plus-square"></i> 添加公告
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
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center"  @click.stop="isCollect">
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                            <i class=" fa fa-heart-o"></i>
                                        </td>
                                    </tr>
                                    <tr class="unread" @click="announceDetail">
                                        <td class="text-center" >2017/07/07</td>
                                        <td class="text-center">张三丰</td>
                                        <td class="text-center">《年会》</td>
                                        <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                        <td class="text-center">2017/07/09</td>
                                        <td class="text-center">
                                            <i class=" fa fa-heart" style="color: #e4393c"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!--审批提醒-->
                            <table class="table table-striped table-advance table-hover" v-if="isExamine">
                                <thead class="text-center"ead>
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
                                <tr class="unread" @click="announceDetail">
                                    <td class="text-center" >2017/07/07</td>
                                    <td class="text-center">张三丰</td>
                                    <td class="text-center">《年会》</td>
                                    <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                    <td class="text-center">2017/07/09</td>
                                    <td class="text-center">
                                        <span class="label label-success ">已通过</span>
                                    </td>
                                    <td class="text-center" @click.stop="isCollect">
                                        <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                        <i class=" fa fa-heart-o"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--代办提醒-->
                            <table class="table table-striped table-advance table-hover" v-if="isSubstitute">
                                <thead class="text-center"ead>
                                <tr>
                                    <th class="text-center">提醒时间</th>
                                    <th class="text-center">提醒人</th>
                                    <th class="text-center">提醒内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" @click="announceDetail">
                                    <td class="text-center" >2017/07/07</td>
                                    <td class="text-center">张三丰</td>
                                    <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                    <td class="text-center"  @click.stop="isCollect">
                                        <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                        <i class=" fa fa-heart-o"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--BOSS小秘书-->
                            <table class="table table-striped table-advance table-hover" v-if="isSecretary">
                                <thead class="text-center"ead>
                                <tr>
                                    <th class="text-center">时间</th>
                                    <th class="text-center">发信人</th>
                                    <th class="text-center">类别</th>
                                    <th class="text-center">提醒内容</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" @click="announceDetail">
                                    <td class="text-center" >2017/07/07</td>
                                    <td class="text-center">张三丰</td>
                                    <td class="text-center">合同</td>
                                    <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                    <td class="text-center"  @click.stop="isCollect">
                                        <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                        <i class=" fa fa-heart-o"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--收藏-->
                            <table class="table table-striped table-advance table-hover" v-if="isMessage">
                                <thead class="text-center"ead>
                                    <tr>
                                        <th class="text-center">收藏时间时间</th>
                                        <th class="text-center">相关对象</th>
                                        <th class="text-center">类别</th>
                                        <th class="text-center">内容</th>
                                        <th class="text-center">收藏</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" @click="announceDetail">
                                    <td class="text-center" >2017/07/07</td>
                                    <td class="text-center">张三丰</td>
                                    <td class="text-center">合同</td>
                                    <td class="text-center">请大家今天9:30在创意中央总部集合</td>
                                    <td class="text-center"  @click.stop="isCollect">
                                        <i class=" fa fa-heart" v-if="false" style="color: #e4393c"></i>
                                        <i class=" fa fa-heart-o"></i>
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
        components:{
            AnnouncementAdd,
            AnnouncementDetail,
        },
        data(){
            return{
                isSystem:true,
                isExamine:false,
                isSubstitute:false,
                isSecretary:false,
                isMessage:false,
                message:'',
                fa:'fa',
                font:''
            }
        },
        mounted(){
           this.System();
        },
        methods:{
            addAnnouncement(){
                $('#announcementAdd').modal('show');
            },
            announceDetail(){
                $('#announceDetail').modal('show');
            },
            System(){
                this.isSystem = true;
                this.isExamine =false;
                this.isSubstitute=false;
                this.isSecretary=false;
                this.isMessage=false;
                this.message='系统公告';
                this.font='fa-volume-up';
            },
            Examine(){
                this.isSystem = false;
                this.isExamine =true;
                this.isSubstitute=false;
                this.isSecretary=false;
                this.isMessage=false;
                this.message='审批提醒';
                this.font='fa-user';
            },
            Substitute(){
                this.isSystem = false;
                this.isExamine =false;
                this.isSubstitute=true;
                this.isSecretary=false;
                this.isMessage=false;
                this.message='代办提醒';
                this.font='fa-bell';
            },
            Secretary(){
                this.isSystem = false;
                this.isExamine =false;
                this.isSubstitute=false;
                this.isSecretary=true;
                this.isMessage=false;
                this.message='BOSS小秘书';
                this.font='fa-github';
            },
            Message(){
                this.isSystem = false;
                this.isExamine =false;
                this.isSubstitute=false;
                this.isSecretary=false;
                this.isMessage=true;
                this.message='收藏';
                this.font='fa-heart';
            },
            isCollect(){
                alert(1);
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