<template>
    <div>
        <div class="modal fade modal-dialog-center in largePic" id="largePic" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content-wrap">
                    <!--<div class="modal-header white-bg white">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>-->
                    <div class="modal-content transPic">
                        <button type="button" class="close" id="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <div class="modal-body" id="pic">
                            <div class="imgContainer">
                                <img id="img" v-if="index!=0" :src="src[index].raw" @mousemove.prevent="">
                                <!--<img id="img" v-attr="src : index==0?'':src[index].big">-->
                            </div>

                        </div>
                    </div>
                    <div class="changePic">
                        <div @click="prev" title="上一张"><i class="fa fa-long-arrow-left"></i></div>
                        <div @click="rotateLeft" title="逆时针旋转"><i class="fa fa-rotate-left"></i></div>
                        <div title="下载图片">
                            <a v-if="index!=0" :href="src[index].raw" download="">
                                <i class="fa fa-download"></i>
                            </a>
                        </div>
                        <div @click="rotateRight" title="顺时针旋转"><i class="fa fa-rotate-right"></i></div>
                        <div @click="next" title="下一张"><i class="fa fa-long-arrow-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props : ['largePic'],
        data(){
            return {
                current : 0,
                index : 0,
                src : {},
                idArr : [],
                currentIndex : '',

                width : '',
                height : '',
            }
        },
        components: {},
        created (){
//            console.log(this.largePic);
        },
        updated (){
            this.setRem();
            this.closeModal();
//            console.log(this.largePic);

        },
        mounted(){
            $('.largePic').on('shown.bs.modal', function (e) {

                let div = this.firstChild.firstChild;
                console.log(div)
                div.onmousedown = function (ev) {
                     let oevent = ev || event;
                     let distanceX = oevent.clientX - div.offsetLeft;
                     let distanceY = oevent.clientY - div.offsetTop;

                     document.onmousemove = function (ev) {
                         let oevent = ev || event;
                         div.style.left = oevent.clientX - distanceX + 'px';
                         div.style.top = oevent.clientY - distanceY + 'px';
                     };
                     document.onmouseup = function () {
                         document.onmousemove = null;
                         document.onmouseup = null;
                     };
                 }
            })
        },

        watch :{
            deep : true,
            largePic(val){
//                console.log(val[0]);
                if (val.length!=0){
                    this.src = val[0].src;
                    this.index = val[0].i;
                    this.idArr = [];
                    console.log(this.src)
//                console.log(this.src[this.index].big)
                    for (let key in this.src){
//                    console.log(key);
                        this.idArr.push(key);
                    }
                }
//                console.log(this.idArr);
            }
        },
        methods : {
            closeModal(){
                let _this = this;
                $('.largePic').on('hidden.bs.modal', function (e) {
                    _this.rotateBack();
                })
            },
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
                let transPic = document.getElementsByClassName('transPic');
                for (let i = 0;i<transPic.length;i++){
                    transPic[i].style.transform = 'rotate('+this.current+'deg)';
                }

                console.log(this.current)
//                document.getElementsByClassName('transPic').style.transform = 'rotate('+this.current+'deg)';
//                $(ev.currentTarget).css('transform' , 'rotate(90deg)');
//                console.log(this.current)
                this.closePosition();
            },
            rotateLeft(){   // 逆时针旋转
//                console.log(ev.currentTarget);
                this.current = (this.current-90)%360;
                let transPic = document.getElementsByClassName('transPic');
                for (let i = 0;i<transPic.length;i++){
                    transPic[i].style.transform = 'rotate('+this.current+'deg)';
                }
                console.log(this.current)

//                document.getElementById('transPic').style.transform = 'rotate('+this.current+'deg)';
//                $(ev.currentTarget).css('transform' , 'rotate(90deg)');
                this.closePosition();
            },
            prev(){
                /*console.log(this.current);
                document.getElementById('img').style.transform = 'rotate('+(Math.abs(this.current)-360)+'deg)';
                console.log(Math.abs(this.current)-360);*/
                if (this.idArr.length==1){
                    return;
                }
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
                if (this.idArr.length==1){
                    return;
                }
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
                let transPic = document.getElementsByClassName('transPic');
                for (let i = 0;i<transPic.length;i++){
                    transPic[i].style.transform = 'rotate('+(-this.current)+'deg)';
                }
//                document.getElementById('transPic').style.transform = 'rotate('+(-this.current)+'deg)';
                this.closePosition();
            },
            closePosition(){
                let close = $('.close');
                if (this.current==0||this.current==-0){
                    close.css('top','12px');
                    close.css('right','23px');
                    close.css('bottom','auto');
                    close.css('left','auto');
                } else if (this.current==90||this.current==-270){
                    close.css('top','12px');
                    close.css('right','auto');
                    close.css('bottom','auto');
                    close.css('left','23px');
                } else if (this.current==180||this.current==-180){
                    close.css('top','auto');
                    close.css('right','auto');
                    close.css('bottom','26px');
                    close.css('left','23px');
                } else if (this.current==270||this.current==-90){
                    close.css('top','auto');
                    close.css('right','23px');
                    close.css('bottom','26px');
                    close.css('left','auto');
                }
            },
        }
    }
</script>
<style scoped>
    a{
        color: inherit;
    }
    .modal-content-wrap{
        position: relative;
        /*background-color: white;*/
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
    .modal{
        z-index: 999999999;
    }

    .modal-content{
        overflow: visible;
    }
    .modal-lg{
        /*width: auto !important;*/
    }
    .close{
        position: absolute;
        right: 23px;
        top: 12px;
        z-index: 1000;
        /* background-color: white; */
        width: 30px;
        height: 30px;
        font-size: 40px;
        color: #ddd;
        opacity: .7;
    }
    .close:hover{
        color: #999;
    }

</style>