<template>
    <div>
        <div class="modal fade modal-dialog-center in" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header white-bg white">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body" id="pic">
                            <img id="img" :src="src[index]">
                            <!--<img :src="item" alt="" v-for="item in src" @click="rotate($event)">-->
                            <div class="changePic">
                                <div @click="prev" title="上一张"><i class="fa fa-long-arrow-left"></i></div>
                                <div @click="rotateLeft" title="逆时针旋转"><i class="fa fa-rotate-left"></i></div>
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
        bottom: 50px;
        left: 50%;
        margin-left: -160px;
        border-radius: 30px;
    }
    .changePic div{
        display: inline-block;
        font-size: 32px;
        width: 80px;
        color: #ddd;
        text-align: center;
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
        props : ['src'],
        data(){
            return {
                current : 0,
                index : 0
            }
        },
        components: {},
        methods : {
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
                if (this.index == 0){
                    this.index = this.src.length-1;
                } else {
                    this.index--;
                }
            },
            next(){
                if (this.index == this.src.length-1){
                    this.index = 0;
                } else {
                    this.index++;
                }
            }
        }
    }
</script>