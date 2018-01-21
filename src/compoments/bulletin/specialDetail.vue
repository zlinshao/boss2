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
                <div class="panel-body table-responsive" v-for="(key,index) in dataBulletin" v-if="!isShow">
                    <div class="col-md-12 detail">
                        <div class="col-sm-4">
                            <span class="text-primary">报备时间：</span>
                            <span>{{key.bulletin_time}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备事项：</span>
                            <span>{{key.content}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">截图：</span>
                            <a class="big" v-for="(pic,index) in key.contract_photo"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index,1)">
                                <img :src="pic">
                            </a>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">地址：</span>
                            <span>{{key.detailed_address_special}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">客户来源：</span>
                            <span>
                                <span v-if="key.customer_from == 2">
                                    中介({{key.agent_money}})
                                </span>
                                <span v-else>
                                    个人
                                </span>
                            </span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">开单人：</span>
                            <span>{{staff[key.staff_id]}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">房型：</span>
                            <span>{{key.rooms_together}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">租房月数：</span>
                            <span>{{key.month}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">客户手机号：</span>
                            <span>{{key.customer_mobile}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">定金：</span>
                            <span>{{key.deposit}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">月单价：</span>
                            <span>{{key.price_per_month_together}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">报备人：</span>
                            <span>{{staff[key.bulletin_staff_id]}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">付款方式：</span>
                            <span>{{key.pay_way_together}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">客户姓名：</span>
                            <span>{{key.customer_name}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">所属部门：</span>
                            <span>{{dict.department_all[department_id]}}</span>
                        </div>
                        <div class="col-sm-4">
                            <span class="text-primary">截图：</span>
                            <a class="big" v-for="(pic,index) in key.screenshot"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index,2)">
                                <img :src="pic">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive" v-if="isShow" style="text-align: center">无相关数据</div>
            </div>
        </section>

        <!--查看大图-->
        <PicModal :msg="'bulletin'" :largePic="largePic"></PicModal>

    </div>
</template>

<script>
    import PicModal from '../common/largePic.vue'               //查看大图
    export default {
        name: "collect-detail",
        components: {PicModal},
        data() {
            return {
                isShow: false,
                department_id: '',
                myData: {},
                dataBulletin: [],           //报备
                screenshots: {},            //截图
                contract_photo: {},         //组长同意截图
                largePic: [],               //点击放大图片
                staff: {},
                dict: {},
            }
        },
        mounted() {
            let router = this.$route.query;
            this.$http.get('core/customer/dict').then((res) => {
                this.dict = res.data;

                this.$http.get('revenue/glee_collect/staff_id').then((res) => {
                    this.staff = res.data;

                    this.$http.get('bulletin/special/specialBulletinDetail?id=' + router.ids + '&collect_or_rent=' + router.num).then((res) => {
                        if (res.data.code === '80010') {
                            this.isShow = false;
                            this.dataBulletin = res.data.data;
                            this.screenshots = res.data.data[0].screenshot;
                            this.contract_photo = res.data.data[0].allow_screenshot;
                            this.department_id = res.data.data[0].department_id;
                        }else{
                            this.isShow = true;
                            this.dataBulletin = [];
                        }
                    })
                });
            });
        },
        watch: {},
        methods: {
//            查看大图
            showLargePic(num, val) {
                if (val === 1) {
                    this.largePic = [{
                        src: this.contract_photo,
                        i: num
                    }];
                } else {
                    this.largePic = [{
                        src: this.screenshots,
                        i: num
                    }];
                }
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
