<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报管理</li>
            <li>
                <router-link to="special">特殊请款报备</router-link>
            </li>
            <li>特殊请款报备详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header class="top">
                    <h4>
                        <i class="fa fa-file-text-o"></i>&nbsp;报备详情
                    </h4>
                </header>
                <div class="panel-body table-responsive">
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">报备时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备事项：</span>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eaque eveniet ipsa magnam natus, numquam, odit officiis possimus quo sit, suscipit voluptatum! Alias at, ducimus ipsum itaque natus nesciunt optio.</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">组长同意截图：</span>
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
                            <span class="text-primary">客户来源：</span>
                            <span>中介（800）</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">开单人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">房型：</span>
                            <span>两室一厅一卫</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">租房月数：</span>
                            <span>12</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">客户手机号：</span>
                            <span>18052001111</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">定金：</span>
                            <span>2121</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">月单价：</span>
                            <span>2000</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">付款方式：</span>
                            <span>押1付6</span>
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
                            <span class="text-primary">截图：</span>
                            <a class="big" v-for="(pic,index) in photos"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index)">
                                <img :src="pic.small">
                            </a>
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
    header.top > h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
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
        min-width: 120px;
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
