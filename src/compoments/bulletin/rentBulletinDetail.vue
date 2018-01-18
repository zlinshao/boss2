<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报管理</li>
            <li>
                <router-link to="rentBulletin">租房喜报</router-link>
            </li>
            <li>租房喜报详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header class="top">
                    <h4>
                        <i class="fa fa-file-text-o"></i>&nbsp;喜报详情
                        <span>炸</span>
                        <span>充</span>
                        <span>款</span>
                        <span>调</span>
                    </h4>
                </header>
                <div class="panel-body table-responsive">
                    <header class="bulletin">
                        <h4>喜报</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">喜报时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">已收：</span>
                            <span>支付宝（2000）/银行卡（1000）</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">截图：</span>
                            <a class="big" v-for="(pic,index) in photos"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index)">
                                <img :src="pic.small">
                            </a>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">地址：</span>
                            <span>积善公寓2-302</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">签合同时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">合同照片：</span>
                            <a class="big" v-for="(pic,index) in photos"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index)">
                                <img :src="pic.small">
                            </a>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">房型：</span>
                            <span>两室一厅一卫</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">尾款补齐时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">备注：</span>
                            <span>雷神之锤</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">租房月数：</span>
                            <span>12</span>
                        </div>

                        <div class="col-sm-4">
                            <span class="text-primary">物业费：</span>
                            <span>2000</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">开单人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">付款方式：</span>
                            <span>押1付6</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">客户来源：</span>
                            <span>中介（800）</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">定金：</span>
                            <span>3000</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">客户姓名：</span>
                            <span>赵启涵</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">所属部门：</span>
                            <span>百万一组</span>
                        </div>

                        <div class="col-sm-4">
                            <span class="text-primary">月单价：</span>
                            <span>3033</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">手机号：</span>
                            <span>1232222222</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <header class="bulletin">
                        <h4>调房</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">报备时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">原付款方式：</span>
                            <span>押1付12</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">签约人：</span>
                            <span>赵梦涵</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">原地址：</span>
                            <span>积善公寓2-304</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">原价格：</span>
                            <span>2000</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">备注：</span>
                            <span>无</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">所属部门：</span>
                            <span>百万一组</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <header class="bulletin">
                        <h4>充公</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">报备时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">充公原因：</span>
                            <span>超出市场价</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">备注：</span>
                            <span>无</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">所属部门：</span>
                            <span>百万一组</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <header class="bulletin">
                        <h4>炸单</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">报备时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">退款金额：</span>
                            <span>1000</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">退款方式：</span>
                            <span>银行卡</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">收款银行：</span>
                            <span>南京银行</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">收款人户名：</span>
                            <span>赵梦涵</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">账户：</span>
                            <span>123456789</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">备注：</span>
                            <span>月单价偏高</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">所属部门：</span>
                            <span>百万一组</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <header class="bulletin">
                        <h4>款项</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">报备时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">款项类型：</span>
                            <span>中介费</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">备注：</span>
                            <span>多付一个月押金</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">付款金额：</span>
                            <span>800</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">付款方式：</span>
                            <span>银行卡</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">收款银行：</span>
                            <span>南京银行</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">收款人户名：</span>
                            <span>赵梦涵</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">账户：</span>
                            <span>123456789</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">所属部门：</span>
                            <span>百万一组</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!--查看大图-->
        <PicModal :largePic="largePic"></PicModal>

    </div>
</template>

<script>
    import PicModal from '../common/largePic.vue'               //查看大图
    export default {
        name: "collect-detail",
        components: {PicModal},
        data() {
            return {
                photos: {},                 //图片
                largePic: [],               //点击放大图片
            }
        },
        mounted() {

        },
        watch: {},
        methods: {
//            查看大图
//             this.photos = res.data.data.album.id_pic;
            showLargePic(num) {
                this.largePic = [{
                    src: this.photos,
                    i: num
                }];
                $('#largePic').modal('show');
            },
        },
    }
</script>

<style scoped>
    .bulletin h4 {
        padding: 0 10px;
        border-left: 3px solid red;
        margin: 0;
    }

    header.top > h4 span {
        display: inline-block;
        padding: 2px 4px;
        -webkit-border-radius: 24%;
        -moz-border-radius: 24%;
        border-radius: 24%;
        color: #ffffff;
        margin: 0 0 3px 3px;
    }

    header.top > h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    header.top > h4 > span:first-of-type {
        background: #FF0000;
    }

    header.top > h4 > span:nth-of-type(2) {
        background: #0099CC;
    }

    header.top > h4 > span:nth-of-type(3) {
        background: #009933;
    }

    header.top > h4 > span:last-of-type {
        background: #FF9933;
    }

    div.detail {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-wrap: wrap;
    }

    div.detail > div {
        margin: 12px 0;
        display: flex;
        display: -webkit-flex;
        align-items: center;
    }

    div.detail > div > span:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 140px;
    }

    a.big {
        margin: 10px 10px 0 0;
        display: inline-block;
        width: 50px;
        height: 50px;
    }

    a.big img {
        width: 100%;
        height: 100%;
    }
</style>
