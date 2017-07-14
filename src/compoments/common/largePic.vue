<template>
    <div>
        <div class="modal fade modal-dialog-center in" id="largePic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header white-bg white">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body" id="pic">
                            <img id="img" v-if="index!=0" :src="src[index].big">
                            <!--<img id="img" v-attr="src : index==0?'':src[index].big">-->
                            <div class="changePic">
                                <div @click="prev" title="上一张"><i class="fa fa-long-arrow-left"></i></div>
                                <div @click="rotateLeft" title="逆时针旋转"><i class="fa fa-rotate-left"></i></div>
                                <div title="下载图片">
                                    <a v-if="index!=0" :href="src[index].raw" download="">
                                        <i class="fa fa-download"></i>
                                    </a>
                                </div>
                                <div @click="rotateRight" title="顺时针旋转"><i class="fa fa-rotate-right"></i></div>
                                <div @click="next" title="下一站"><i class="fa fa-long-arrow-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    a{
        color: inherit;
    }
    .modal-body{
        position: relative;
    }
    .modal-body img{
        width: 100%;
    }
    .changePic{
        position: absolute;
        font-size: 0;
        background-color: rgba(0,0,0,.4);
        /*bottom: 1.5rem;*/
        bottom: 30px;
        left: 50%;
        /*right: 0;*/
        /*left: 50%;*/
        /*margin-left: -6.25rem;*/
        margin-left: -125px;
        border-radius: 1rem;
    }
    .changePic div{
        display: inline-block;
        /*font-size: 2rem;*/
        font-size: 32px;
        /*width: 2.5rem;*/
        width: 50px;
        color: #ddd;
        text-align: center;
        /*line-height: 2.5rem;*/
        line-height: 50px;
    }
    .changePic div:hover{
        color: white;
        cursor: pointer;
    }
    /*.prev , .next{
        position: absolute;
        background-color: rgba(255,255,255,.2);
        text-align: center;
        padding: 20px 12px;
        font-size: 24px;
    }*/
    .prev{
        left: 0;
    }

</style>
<script>
    export default{
        props : ['largePic'],
        data(){
            return {
                current : 0,
                index : 0,
                src : {},
                idArr : [],
                currentIndex : ''
            }
        },
        components: {},
        created (){
//            console.log(this.largePic);
        },
        updated (){
            this.setRem();
//            console.log(this.largePic);

        },

        watch :{
            deep : true,
            largePic(val){
//                console.log(val[0]);
                this.src = val[0].src;
                this.index = val[0].i;
//                console.log(this.src[this.index].big)
                for (let key in this.src){
//                    console.log(key);
                    this.idArr.push(key);
                }
//                console.log(this.idArr);
            }
        },
        methods : {
            setRem(){
                let browser={
                    versions:function(){
                        let u = navigator.userAgent, app = navigator.appVersion;
                        return {//移动终端浏览器版本信息
                            trident: u.indexOf('Trident') > -1, //IE内核
                            presto: u.indexOf('Presto') > -1, //opera内核
                            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                            iPad: u.indexOf('iPad') > -1, //是否iPad
                            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                        };
                    }(),
                    language:(navigator.browserLanguage || navigator.language).toLowerCase()
                };

                if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                    browser.versions.iPhone || browser.versions.iPad){
                    (function(){
                        let colCount = 20;
                        //  设置列宽
                        let colWidth =  document.documentElement.clientWidth / colCount;//;document.documentElement;
                        //  确定基本的font-size
                        document.querySelector('html').style.fontSize = colWidth + 'px';
                    })();
                    $('.changePic').css({
                        'bottom': '1.5rem',
                        'margin-left': '-6.25rem',
                    });
                    $('.changePic div').css({
                        'font-size': '2rem',
                        'width' : '2.5rem',
                        'line-height' : '2.5rem'
                    })
                }
            },
            rotateRight(){  // 顺时针旋转
//                console.log(ev.currentTarget);
                this.current = (this.current+90)%360;
                document.getElementById('img').style.transform = 'rotate('+this.current+'deg)';
//                $(ev.currentTarget).css('transform' , 'rotate(90deg)');
            },
            rotateLeft(){   // 逆时针旋转
//                console.log(ev.currentTarget);
                this.current = (this.current-90)%360;
                document.getElementById('img').style.transform = 'rotate('+this.current+'deg)';
//                $(ev.currentTarget).css('transform' , 'rotate(90deg)');
            },
            prev(){
                /*console.log(this.current);
                document.getElementById('img').style.transform = 'rotate('+(Math.abs(this.current)-360)+'deg)';
                console.log(Math.abs(this.current)-360);*/
                this.rotateBack();
                this.currentIndex = this.idArr.indexOf(this.index);
//                console.log(this.idArr.indexOf(this.index));

                if (this.currentIndex == 0){
                    this.currentIndex = this.idArr.length-1;
                } else {
                    this.currentIndex--;
                }
                this.index = this.idArr[this.currentIndex];
            },
            next(){
                this.rotateBack();

                this.currentIndex = this.idArr.indexOf(this.index);
//                console.log(this.idArr.indexOf(this.index));

                if (this.currentIndex == this.idArr.length-1){
                    this.currentIndex = 0;
                } else {
                    this.currentIndex++;
                }
                this.index = this.idArr[this.currentIndex];

            },
            rotateBack(){
                this.current = 0;
                document.getElementById('img').style.transform = 'rotate('+(-this.current)+'deg)';
            }

        }
    }
</script>