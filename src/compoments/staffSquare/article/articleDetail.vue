<template>
    <div>
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>
                <router-link to="/article">发布文章</router-link>
            </li>
            <li>文章详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <header>
                    <h4>
                        乐伽公寓荣获南京公寓行业优秀奖
                        <!--编辑-->
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li><router-link to="/modifyArticle">编辑</router-link></li>
                                <li><a>发布</a></li>
                                <li><a>下架</a></li>
                                <li><a>删除</a></li>
                            </ul>
                        </div>
                    </h4>
                </header>
                <div class="time">
                    2017/10/01
                    &emsp;
                    王梦园
                </div>

                <div class="articleContainer col-lg-12">
                    豫章故郡， 洪都新府。 星分翼轸， 地接衡庐。 襟三江而带五湖， 控蛮荆而引瓯越。 物华天宝， 龙光射牛斗之墟； 人杰地灵， 徐孺下陈蕃之榻。 雄州雾列， 俊采星驰。 台隍枕夷夏之交， 宾主尽东南之美。 都督阎公之雅望， 棨戟遥临； 宇文新州之懿范， 襜帷暂驻。 十旬休假， 胜友如云； 千里逢迎， 高朋满座。 腾蛟起凤， 孟学士之词宗； 紫电青霜， 王将军之武库。 家君作宰， 路出名区； 童子何知， 躬逢胜饯。
                    <br>
                    豫章故郡， 洪都新府。 星分翼轸， 地接衡庐。 襟三江而带五湖， 控蛮荆而引瓯越。 物华天宝， 龙光射牛斗之墟； 人杰地灵， 徐孺下陈蕃之榻。 雄州雾列， 俊采星驰。 台隍枕夷夏之交， 宾主尽东南之美。 都督阎公之雅望， 棨戟遥临； 宇文新州之懿范， 襜帷暂驻。 十旬休假， 胜友如云； 千里逢迎， 高朋满座。 腾蛟起凤， 孟学士之词宗； 紫电青霜， 王将军之武库。 家君作宰， 路出名区； 童子何知， 躬逢胜饯。
                    <br>
                    滕王高阁临江渚， 佩玉鸣鸾罢歌舞。<br>
                    画栋朝飞南浦云， 珠帘暮卷西山雨。<br>
                    闲云潭影日悠悠， 物换星移几度秋。<br>
                    阁中帝子今何在？ 槛外长江空自流。
                </div>

                <div class="commentContainer col-lg-12">
                    <h5>评论</h5>
                    <div class="comment">
                        <!--评论-->
                        <div class="commentItem">
                            <div class="commentItemContainer">
                                <img src="http://static.dingtalk.com/media/lADOxQDkO80C7s0C7g_750_750.jpg" alt="">
                                <div class="com">
                                    <div>
                                        <span class="name">哈哈</span>
                                        <span class="pull-right">
                                        <i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>
                                    </span>
                                    </div>
                                    <div class="commentContent">
                                        说两点卡萨丁就看
                                    </div>
                                    <div class="time">
                                        2017/10/01&ensp;
                                        11:05&ensp;
                                        <a @click="showToggle($event)">
                                            2条回复
                                            <i class="fa fa-angle-down"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!--回复-->
                            <div class="commentReply">
                                <div class="commentReplyItem">
                                    <img src="http://static.dingtalk.com/media/lADOxQDkO80C7s0C7g_750_750.jpg" alt="">
                                    <div class="com">
                                        <div>
                                            <span class="name">哈哈</span>
                                            <span class="pull-right">
                                        <i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>
                                    </span>
                                        </div>
                                        <div class="commentContent">
                                            说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看
                                        </div>
                                    </div>
                                </div>
                                <div class="commentReplyItem">
                                    <img src="http://static.dingtalk.com/media/lADOxQDkO80C7s0C7g_750_750.jpg" alt="">
                                    <div class="com">
                                        <div>
                                            <span class="name">哈哈</span>
                                            <span class="pull-right">
                                        <i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>
                                    </span>
                                        </div>
                                        <div class="commentContent">
                                            说两点卡萨丁就看
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="commentItem">
                            <div class="commentItemContainer">
                                <img src="http://static.dingtalk.com/media/lADOxQDkO80C7s0C7g_750_750.jpg" alt="">
                                <div class="com">
                                    <div>
                                        <span class="name">哈哈</span>
                                        <span class="pull-right">
                                        <i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>
                                    </span>
                                    </div>
                                    <div class="commentContent">
                                        说两点卡萨丁就看
                                    </div>
                                    <div class="time">
                                        2017/10/01&ensp;
                                        11:05&ensp;
                                        <a @click="showToggle($event)">
                                            2条回复
                                            <i class="fa fa-angle-down"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!--回复-->
                            <div class="commentReply">
                                <div class="commentReplyItem">
                                    <img src="http://static.dingtalk.com/media/lADOxQDkO80C7s0C7g_750_750.jpg" alt="">
                                    <div class="com">
                                        <div>
                                            <span class="name">哈哈</span>
                                            <span class="pull-right">
                                        <i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>
                                    </span>
                                        </div>
                                        <div class="commentContent">
                                            说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看说两点卡萨丁就看
                                        </div>
                                    </div>
                                </div>
                                <div class="commentReplyItem">
                                    <img src="http://static.dingtalk.com/media/lADOxQDkO80C7s0C7g_750_750.jpg" alt="">
                                    <div class="com">
                                        <div>
                                            <span class="name">哈哈</span>
                                            <span class="pull-right">
                                        <i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>
                                    </span>
                                        </div>
                                        <div class="commentContent">
                                            说两点卡萨丁就看
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            showToggle(ev){
                let next = ev.target.parentNode.parentNode.parentNode.nextElementSibling;
                let i = $(ev.target).children('i');
//                console.log(i);
                if (next.style.display=='block'){
                    next.style.display='none';
                    i.removeClass('fa-angle-up').addClass('fa-angle-down');
                } else {
                    next.style.display='block';
                    i.removeClass('fa-angle-down').addClass('fa-angle-up');
                }
//                console.log()
            }
        }
    }
</script>
<style scoped>
    .panel-body header h4 {
        text-align: center;
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }
    .panel-body .time{
        text-align: center;
    }
    .articleContainer{
        margin: 20px auto;
        padding-bottom: 30px;
        line-height: 30px;
        font-size: 14px;
        border-bottom: 1px solid #aaaaaa;
    }

    .commentItem+.commentItem{
        margin-top: 12px;
    }
    .commentItem img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
        vertical-align: top;
    }
    .commentItem .com{
        display: inline-block;
    }

    .commentItem .commentContent{
        line-height: 30px;
    }

    .commentItem .time{
        font-size: 12px;
        color: #aaa;
        line-height: 24px;
        text-align: right;
    }
    .commentItem .commentItemContainer{
        border-bottom: 1px dashed #aaaaaa;
    }


    .commentReply{
        padding: 8px 0 8px 40px;
        display: none;
        user-select: none;
    }
    .commentReply .commentReplyItem{
        background-color: #F2F2F2;
        padding: 5px;
        /*display: inline-block;*/
        /*border-bottom: 1px dashed #aaaaaa;*/
    }
    .commentReply .commentReplyItem+.commentReplyItem{
        margin-top: 2px;
    }
</style>