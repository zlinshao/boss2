<template>
    <div>
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>
                <router-link to="/article">发布文章</router-link>
            </li>
            <li>文章详情</li>
            <li class="pull-right" v-show="typeof params!='string'">
                <router-link :to="{path:'/article',query:{myParam:params,page:page}}"><i class="fa fa-angle-double-left"></i> 返回上一步</router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body" v-if="msg!=''">
                <header>
                    <h4>
                        {{msg.title}}
                        <!--编辑-->
                        <div class="btn-group pull-right"
                             v-if="simulate.indexOf('StaffSquare/editArticle')>-1||simulate.indexOf('StaffSquare/offArticle')>-1||
                             simulate.indexOf('StaffSquare/publicArticle')>-1||simulate.indexOf('StaffSquare/deleteArticle')>-1||isSuper">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li v-if="msg.status!=2&&(simulate.indexOf('StaffSquare/editArticle')>-1||isSuper)"><router-link :to="{path : '/modifyArticle',query:{articleId : msg.id}}">编辑</router-link></li>
                                <li @click="oper(1)" v-if="msg.status==2&&(simulate.indexOf('StaffSquare/offArticle')>-1||isSuper)"><a>下架</a></li>
                                <li @click="oper(2)" v-if="msg.status==1&&(simulate.indexOf('StaffSquare/publicArticle')>-1||isSuper)"><a>发布</a></li>
                                <li @click="oper(3)" v-if="msg.status!=2&&(simulate.indexOf('StaffSquare/deleteArticle')>-1||isSuper)"><a>删除</a></li>
                            </ul>
                        </div>
                    </h4>
                </header>
                <div class="time">
                    {{msg.create_time}}
                    &emsp;
                    {{dict.staff_id[msg.publicer_id]}}
                </div>

                <div class="articleContainer col-lg-12">
                    <div class="coverPicContainer">
                        <h4>封面</h4>
                        <img :src="key.raw" alt="" style="width: 30%" v-for="(key,value) in coverImg">
                    </div>
                    <h4>正文</h4>
                    <div class="vedioContainer col-lg-12">
                        <video width="100%" :src="key.raw" controls="controls" v-for="(key,value) in vedioArr">
                            <!--<source :src="item" type="video/mp4">-->
                        </video>
                        <!--<video controls="controls" :src="url">
                            <source :src="url" type="video/mp4">
                        </video>-->
                    </div>
                    <div class="content col-lg-12 ql-editor" v-html="msg.content"></div>

                    <div class="thumbs pull-right">
                        <i class="fa fa-thumbs-o-up"></i>
                        {{msg.thumbs}}
                    </div>
                </div>

                <div class="commentContainer col-lg-12">
                    <h5>评论</h5>
                    <div class="comment">
                        <!--评论-->
                        <div class="commentItem" v-for="item in msg.comments">
                            <div class="commentItemContainer">
                                <img :src="item.pic_url" alt="">
                                <div class="com">
                                    <div>
                                        <span class="name">{{item.user_name}}</span>
                                        <span class="pull-right">
                                        <!--<i class="fa fa-thumbs-o-up"></i>
                                        <sup>15</sup>-->
                                    </span>
                                    </div>
                                    <div class="commentContent">
                                        {{item.comment}}
                                    </div>
                                    <div class="time">
                                        {{item.create_time}}
                                        <a @click="showToggle($event)">
                                            {{item.reply.length}}条回复
                                            <i class="fa fa-angle-down" v-show="item.reply.length>0"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!--回复-->
                            <div class="commentReply">
                                <div class="commentReplyItem" v-for="reply in item.reply">
                                    <img :src="reply.pic_url" alt="">
                                    <div class="com">
                                        <div>
                                            <span class="name">{{reply.user_name}}</span>
                                            <!--<span class="pull-right">
                                                <i class="fa fa-thumbs-o-up"></i>
                                                <sup>15</sup>
                                            </span>-->
                                        </div>
                                        <div class="commentContent">
                                            {{reply.comment}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-muted" v-show="msg.comments.length==0">
                        <h4>暂无评论....</h4>
                    </div>
                </div>

            </div>
        </section>


        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Confirm from '../../common/confirm.vue'
    import Status from '../../common/status.vue';

    export default{
        props : ['simulate','isSuper'],
        components: {Confirm,Status},
        data(){
            return {
                dict: {},
                articleId : 0,
                msg : '',

                coverImg : {},
                vedioArr : {},

                confirmMsg: {
                    oper : 0,
                    msg: '',
                },

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
                params : {},
                page : ''
            }
        },
        mounted(){
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;

            this.articleId = this.$route.query.articleId;
            this.$http.get('code/Staff_Square/dict').then((res)=>{
//                console.log(res.data);
                this.dict = res.data;
                this.getDeatils();
            });
        },
        methods: {
            getDeatils(){
                this.$http.get('code/Staff_Square/showDetails?id='+this.articleId).then((res)=>{
//                    console.log(res.data);
                    this.msg = res.data.data[0];

                    if (this.msg.album!=undefined){
                        this.coverImg = this.msg.album.staff_pic;
                        this.vedioArr = this.msg.album.vedio_pic;
//                        console.log(this.msg.album.vedio_pic);
                        /*for (let i = 0;i<this.msg.album.length;i++){
                            this.$http.post('/picture/'+this.msg.album[i]).then((res)=>{
//                            console.log(res.data.data);
                                this.vedioArr.push(res.data.data);
                            })
                        }*/
                    }
//                    $('.articleContainer .content img').css('width','100%');
                })
            },
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
            },


            oper(num){
                this.confirmMsg.oper = num;
                if (num==1){
                    // 下架
                    this.confirmMsg.msg = '确定下架该条新闻吗？';
                } else if (num==2){
                    // 发布
                    this.confirmMsg.msg = '确定发布该条新闻吗？';
                } else if (num==3){
                    // 删除
                    this.confirmMsg.msg = '确定删除该条新闻吗？';
                }
                $('#confirm').modal('show');
            },
            getConfirm(){
                let url = '';
                if (this.confirmMsg.oper==1){
                    // 下架
                    url = 'code/Staff_Square/offArticle';
                    this.$http.get(url+'?id='+this.articleId).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==30025){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.getDeatils()
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                } else if (this.confirmMsg.oper==2){
                    // 发布
                    url = 'code/Staff_Square/publicArticle';
                    this.$http.post(url+'?id='+this.articleId).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==30022){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.getDeatils();
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }

                    })
                } else if (this.confirmMsg.oper==3){
                    // 删除
                    url = 'code/Staff_Square/deleteArticle';
                    this.$http.get(url,{params : {
                        id : [this.articleId]
                    }}).then((res)=>{
                        console.log(res.data);
                        if (res.data.code==30016){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.$router.replace({ path: '/article'});
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }


            },
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
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
    .articleContainer{
        margin: 20px auto;
        padding-bottom: 30px;
        line-height: 30px;
        font-size: 14px;
        border-bottom: 1px solid #aaaaaa;
    }
    .articleContainer h4{
        /*text-align: center;*/
        padding-left: 20px;
        line-height: 30px;
        border-left: 5px solid #fcb322;;
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
        /*user-select: none;*/
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
    .articleContainer .content img{
        width: 100%;
    }


</style>