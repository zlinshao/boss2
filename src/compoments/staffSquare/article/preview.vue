<template>
    <div class="preview">
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>
                <router-link to="/article">发布文章</router-link>
            </li>
            <li>预览</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <header>
                    <h4>
                        {{title}}
                    </h4>
                </header>
                <div class="time">
                    {{year}}/{{month}}/{{day}}
                    &emsp;
                    {{staff}}
                </div>

                <div class="articleContainer">
                    <div class="vedioContainer col-lg-12" v-if="vedioArr.length>0">
                        <video width="100%" :src="item" controls="controls" v-for="item in vedioArr">
                            <!--<source :src="item" type="video/mp4">-->
                        </video>
                        <!--<video controls="controls" :src="url">
                            <source :src="url" type="video/mp4">
                        </video>-->
                    </div>

                    <div class="col-lg-12 content" v-html="content"></div>
                </div>

                <div class="buttons">
                    <button class="btn btn-default" @click="cancel">取消</button>
                    <!--<button class="btn btn-warning">保存</button>-->
                    <!--<button class="btn btn-primary">发布</button>-->
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    export default{
        props : ['title','content','type','vedioArr'],
        components: {},
        data(){
            return {
                year : '',
                month : '',
                day : '',
                staff : ''
            }
        },
        watch:{
            content(val){
                $('.articleContainer .content img').attr('width','100%')
            }
        },
        mounted(){
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
            this.day = date.getDate()<10?'0'+date.getDate():date.getDate();

            this.$http.get('staff/info').then((res)=>{
//                console.log(res.data.name);
                this.staff = res.data.name;
            })
        },
        methods: {
            cancel(){
                $('.preview').hide()
            }
        }
    }
</script>
<style scoped>
    .preview{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        display: none;
    }
    .preview .panel{
        z-index: 1000000000;

    }
    /*.vedioContainer vedio{
        width: 100%;
    }*/
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
        border-bottom: 1px solid #aaaaaa;
        min-height: 1000px;
        /*background-color: #CCCCCC;*/

    }
    .buttons{
        text-align: right;
        padding-top: 12px;
    }
    .articleContainer .content img{
        /*width: 100% !important;*/
    }
</style>