<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报管理</li>
            <li>收房喜报</li>
            <li>收房喜报详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-user"></i>&nbsp;客户信息
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
                            <span class="text-primary">押金：</span>
                            <span>2000</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">证件照片：</span>
                            <a class="big">
                                <img src="http://image-homeinn.b0.upaiyun.com/web/image/aee8226e-bbcd-4df4-9b1b-2f834772da06.jpg">
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
    .bulletin h4 {
        padding: 0 10px;
        border-left: 3px solid red;
        margin-bottom: 20px;
    }

    .panel-body > h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    a.big {
        margin: 10px 10px 0 0;
        display: inline-block;
    }

    div.detail > div > span:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
</style>
