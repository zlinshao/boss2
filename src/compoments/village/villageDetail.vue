<template>
    <div>
        <div class="col-lg-12">
            <h3>小区信息</h3>
            <div class="col-lg-12 clearFix">
                <button class="btn btn-success pull-right" data-toggle="modal" data-target="#myModal">编辑</button>
            </div>
            <div class="info col-lg-12">
                <div class="baseInfo col-lg-6">
                    <h4>基本信息</h4>
                    <div class="infoDetail">
                        <ul>
                            <li>
                                <span>小区名称</span>
                                金马郡城
                            </li>
                            <li>
                                <span>地址</span>
                                南京市建邺区XX路XX号
                            </li>
                            <li>
                                <span>年限</span>
                                8
                            </li>
                            <li>
                                <span>栋数</span>
                                18
                            </li>
                            <li>
                                <span>房屋性质</span>
                                住宅
                            </li>
                            <li>
                                <span>物业费</span>
                                1.2元/㎡
                            </li>
                            <li>
                                <span>已售套数</span>
                                20
                            </li>
                            <li>
                                <span>空置套数</span>
                                10
                            </li>
                            <li>
                                <span>照片</span>
                                <img src="../../../src/assets/img/sm-img-1.jpg" alt="">
                                <img src="../../../src/assets/img/sm-img-1.jpg" alt="">
                                <img src="../../../src/assets/img/sm-img-1.jpg" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="perimeterInfo col-lg-6">
                    <h4>周边信息</h4>
                    <div class="infoDetail">
                        <ul>
                            <li>
                                <span>交通情况</span>
                                公交24,8路；地铁1,2号线
                            </li>
                            <li>
                                <span>生活配套</span>
                                超市，餐饮，医疗，购物
                            </li>
                        </ul>
                    </div>
                    <h4>地图</h4>
                    <div class="infoDetail">
                        <iframe src="../../../villageMap.html?center=118.803939,32.104087" frameborder="0"></iframe>
                    </div>

                </div>
            </div>
            <router-link to="/village">
                <button class="btn btn-success pull-right">返回</button>
            </router-link>
        </div>

        <!--模态框-->
        <Modal :oper="oper"></Modal>
    </div>
</template>
<style scoped>
    h3{
        background-color: #fff;
        line-height: 45px;
        padding-left: 10px;
        border-radius: 8px;
    }
    h4{
        color: #333;
        font-weight: 600;
    }
    .info{
        padding: 0 15px;
    }
    .info>div{
        /*display: inline-block;*/
        /*width: 44%;*/
        padding: 0 3%;
        vertical-align: top;
    }
    .perimeterInfo{
        /*border-left: 1px dashed #ccc;*/
    }
    .col-lg-12{
        padding-right: 0;
    }
    .infoDetail{
        width: 92%;
        margin: 20px auto;
        /*padding: 20px 20px;*/
        /*background-color: lightblue;*/
    }
    .infoDetail:nth-child(1){
        border-right: 1px dashed #ccc;
    }
    .info ul li{
        /*line-height: 40px;*/
        border-bottom: 1px solid #ccc;
        padding: 16px 10px 8px;
        color: #000;
    }
    .info ul li+li{
        /*margin-top: 16px;*/
    }
    .info ul li span{
        display: inline-block;
        width: 28%;
        text-align: left;
    }
    .info ul li img{
        width: 80px;
        margin-top: 5px;
    }
    .info ul li img+img{
        margin-left: 5px;
    }

    .infoDetail iframe{
        width: 100%;
        border: none;
        height: 300px;
    }
</style>
<script>
    import Modal from './modal.vue'

    export default{
        data(){
            return {
                oper : {
                    operName : '编辑小区信息',
                    villageId : 10
                }
            }
        },
        components: {
            Modal
        }

    }
</script>