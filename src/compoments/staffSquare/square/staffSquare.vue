<template>
    <div>
        <!--<ol class="breadcrumb">
            <li>员工广场</li>
            <li>员工广场</li>
        </ol>-->

        <header>员工广场</header>

        <div class="squareContainer">
            <div class="bannerContainer clearFix">
                <!--轮播-->
                <div class="banner col-lg-7" @mouseenter="stop" @mouseleave="playBanner">
                    <div class="bannerCon">
                        <img :src="image" v-for='(image,index) in img' :key='index' v-show='index===mark'>
                    </div>
                    <div class="bannerTitle">{{title[mark]}}</div>
                    <div class="change">
                        <span v-for='(item,index) in img.length' :class="{'active':index===mark}" @click='change(index)'></span>
                    </div>
                </div>
                <!--广告-->
                <div class="adContainer col-lg-5">
                    <div class="adItem"></div>
                    <div class="adItem"></div>
                </div>
            </div>


            <div class="mainContainer col-lg-12">
                <div class="col-lg-3 padd0"></div>
                <div class="col-lg-5"></div>
                <div class="col-lg-4 padd0"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                mark: 0,
                timer: null,
                img: [
                    'http://upload-images.jianshu.io/upload_images/3360875-5625658440cb542d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                    'http://upload-images.jianshu.io/upload_images/3360875-b70e9d81d26e2a27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                    'http://upload-images.jianshu.io/upload_images/3360875-dc724649454c2ddc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                    'http://upload-images.jianshu.io/upload_images/3360875-d2148a1bb7ea9d21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
                ],
                title : [
                    '杭州，我们来了',
                    '苏州，我们来了',
                    '无锡，我们来了',
                    '常州，我们来了',
                ],
                play : '',
            }
        },
        mounted() {
            this.playBanner();
        },
        destroyed(){
            this.stop();
        },
        methods: {
            change(i) {
                this.mark = i
            },
            autoPlay() {
                this.mark++;
                if (this.mark === 4) {
                    this.mark = 0;
                    return
                }
            },
            playBanner() {
                this.play = setInterval(this.autoPlay, 3000)
            },
            stop(){
                clearInterval(this.play)
            }
        }
    }
</script>
<style scoped>
    header{
        text-align: center;
        font-size: 28px;
        font-weight:500;
        letter-spacing: 3px;
        font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
        line-height: 2;
        border-bottom: 2px solid #ddd;
    }

    .bannerContainer{
        height: 420px;
    }
    .bannerContainer .banner{
        height: 100%;
    }
    .bannerContainer>div{
        margin-top: 14px;
        margin-bottom: 20px;
    }

    .banner{
        position: relative;
        /*padding-left: 0;*/
    }
    .banner .bannerCon{
        width: 100%;
        height: 100%;
    }
    .banner .bannerCon img{
        width: 100%;
        height: 100%;
    }
    .bannerTitle{
        position: absolute;
        background-color: rgba(255,255,255,.8);
        padding: 14px 18px;
        left: 15px;
        bottom: 0;
        width: 55%;
    }

    .change{
        position: absolute;
        padding: 14px 18px;
        right: 15px;
        bottom: 0;
        text-align: right;
        width: 40%;
    }
    .change span{
        display: inline-block;
        width: 20px;
        height: 4px;
        background-color: #ffffff;
    }
    .change span+span{
        margin-left: 3px;
    }
    .change span.active{
        background-color: black;
    }

    .adItem{
        background-color: #aec5dc;
        height: 200px;
        box-sizing: border-box;
    }
    .adItem+.adItem{
        margin-top: 20px;
    }



    .padd0{
        padding-left: 0;
        padding-right: 0;
    }
</style>