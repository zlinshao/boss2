<template>
    <div>
        <!--<ol class="breadcrumb">
            <li>员工广场</li>
            <li>员工广场</li>
        </ol>-->

        <header>员工广场</header>

        <div class="squareContainer col-lg-12">
            <div class="bannerContainer clearFix">
                <!--轮播-->
                <div class="banner col-lg-7">
                    <img src="https://static.bootcss.com/www/assets/img/react.png?1503034592571" alt="">
                    <div class="bannerTitle">杭州，我们来了</div>
                    <div class="change">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
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
                msg: 'hello vue'
            }
        },
        methods: {}
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
    .banner img{
        width: 100%;
        height: 100%;
    }
    .banner{
        position: relative;
        /*padding-left: 0;*/
    }
    .bannerTitle{
        position: absolute;
        background-color: rgba(255,255,255,.8);
        padding: 14px 18px;
        left: 15px;
        bottom: 0;
        width: 60%;
    }

    .change{
        position: absolute;
        padding: 14px 18px;
        right: 15px;
        bottom: 0;
        text-align: center;
        width: 20%;
    }
    .change span{
        display: inline-block;
        width: 20px;
        height: 4px;
        background-color: #1caadc;
    }


    .adContainer{
        padding-right: 0;
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