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
                        <span v-show="myData.dataLose != null">炸</span>
                        <span v-show="myData.dataRefund != null">款</span>
                        <span v-show="myData.dataRedistribution != null">调</span>
                    </h4>
                </header>
                <div class="panel-body table-responsive" v-for="(key,index) in dataBulletin" v-if="!isShow">
                    <header class="bulletin">
                        <h4>喜报</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="">
                            <span class="text-primary">喜报时间：</span>
                            <span>{{key.bulletin_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">已收：</span>
                            <span>{{key.received}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">截图：</span>
                            <a class="big" v-for="(pic,index) in key.screenshot"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index,1)">
                                <img :src="pic">
                            </a>
                        </div>
                        <div class="">
                            <span class="text-primary">地址：</span>
                            <span>{{key.detailed_address}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">签合同时间：</span>
                            <span>{{key.sign_contract_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">合同照片：</span>
                            <a class="big" v-for="(pic,index) in key.contract_photo"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index,2)">
                                <img :src="pic">
                            </a>
                        </div>
                        <div class="">
                            <span class="text-primary">房型：</span>
                            <span>{{key.rooms.rooms}}室{{key.rooms.hall}}厅{{key.rooms.toilet}}卫</span>
                        </div>
                        <div class="">
                            <span class="text-primary">尾款补齐时间：</span>
                            <span>{{key.retainage_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">备注：</span>
                            <span>{{key.remark}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">租房月数：</span>
                            <span>{{key.rent_month}}</span>
                        </div>

                        <div class="">
                            <span class="text-primary">物业费：</span>
                            <span>{{key.property_status}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">开单人：</span>
                            <span>{{staff[key.staff_id]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款方式：</span>
                            <span>{{key.pay_way_together}}</span>
                        </div>
                        <div class="">
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
                        <div class="">
                            <span class="text-primary">报备人：</span>
                            <span>{{staff[key.bulletin_staff_id]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">定金：</span>
                            <span>{{key.deposit_or_full}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">客户姓名：</span>
                            <span>{{key.customer_name}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">所属部门：</span>
                            <span>{{dict.department_all[department_id]}}</span>
                        </div>

                        <div class="">
                            <span class="text-primary">月单价：</span>
                            <span>{{key.price_per_month_together}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">手机号：</span>
                            <span>{{key.customer_mobile}}</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive" v-if="myData.dataLose != null" v-for="(key,index) in dataLose">
                    <header class="bulletin">
                        <h4>炸单</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="">
                            <span class="text-primary">报备时间：</span>
                            <span>{{key.bulletin_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">退款金额：</span>
                            <span>{{key.lose_money}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">退款方式：</span>
                            <span>{{values[key.lose_way - 1]}}</span>
                        </div>
                        <div class="" v-if="key.lose_way == 1 || key.lose_way == 4">
                            <span class="text-primary">收款银行：</span>
                            <span>{{dict.bank[key.lose_bank]}}</span>
                        </div>
                        <div class="" v-if="key.lose_way != 3">
                            <span class="text-primary">收款人户名：</span>
                            <span>{{key.lose_name}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">账户：</span>
                            <span>{{key.lose_account}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">备注：</span>
                            <span>{{key.remark}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">报备人：</span>
                            <span>{{staff[key.bulletin_staff_id]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">所属部门：</span>
                            <span>{{dict.department_all[department_id]}}</span>
                        </div>
                    </div>
                </div>

                <div class="panel-body table-responsive" v-for="(key,index) in dataRefund" v-if="dataRefund != null">
                    <header class="bulletin">
                        <h4>款项</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="">
                            <span class="text-primary">报备时间：</span>
                            <span>{{key.bulletin_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">款项类型：</span>
                            <span v-if="key.refund_cate == 1">中介费</span>
                            <span v-if="key.refund_cate == 2">房租退款</span>
                        </div>
                        <div class="">
                            <span class="text-primary">备注：</span>
                            <span>{{key.remark}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款金额：</span>
                            <span>{{key.refund_amount}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款方式：</span>
                            <span>{{values[key.refund_way - 1]}}</span>
                        </div>
                        <div class="" v-if="key.refund_way == 1 || key.refund_way == 4">
                            <span class="text-primary">收款银行：</span>
                            <span>{{dict.bank[key.refund_bank]}}</span>
                        </div>
                        <div class="" v-if="key.refund_way != 3">
                            <span class="text-primary">收款人户名：</span>
                            <span>{{key.refund_customer_name}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">账户：</span>
                            <span>{{key.refund_account}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">报备人：</span>
                            <span>{{staff[key.bulletin_staff_id]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">所属部门：</span>
                            <span>{{dict.department_all[department_id]}}</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive" v-if="myData.dataOldRent != null" v-for="(key,index) in dataOldRent">
                    <header class="bulletin">
                        <h4>调房</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="">
                            <span class="text-primary">报备时间：</span>
                            <span>{{key.bulletin_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">原付款方式：</span>
                            <span>{{key.pay_way_together}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">签约人：</span>
                            <span>{{key.sname}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">原地址：</span>
                            <span>{{key.detailed_address}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">原价格：</span>
                            <span>{{key.price_per_month_together}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">备注：</span>
                            <span>{{key.remark}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">报备人：</span>
                            <span>{{staff[key.bulletin_staff_id]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">所属部门：</span>
                            <span>{{dict.department_all[department_id]}}</span>
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
                values: ['银行卡', '支付宝', '微信', '存折'],
                department_id: '',
                myData: {},
                dataBulletin: [],           //喜报
                dataLose: [],               //炸单
                dataOldRent: [],     //调房
                dataRefund: [],             //款项
                screenshots: {},            //截图
                contract_photo: {},         //合同照片
                largePic: [],               //点击放大图片
                staff: {},
                dict: {},
            }
        },
        mounted() {
            this.$http.get('core/customer/dict').then((res) => {
                this.dict = res.data;

                this.$http.get('revenue/glee_collect/staff_id').then((res) => {
                    this.staff = res.data;

                    this.$http.get('bulletin/rent/rentBulletinDetail?id=' + this.$route.query.ids + '&mark=1').then((res) => {
                        if (res.data.code === '80010') {
                            this.isShow = false;
                            this.myData = res.data.data;
                            this.dataBulletin = res.data.data.dataBulletin;
                            this.dataLose = res.data.data.dataLose;
                            this.dataRefund = res.data.data.dataRefund;
                            this.dataOldRent = res.data.data.dataOldRent;
                            this.screenshots = res.data.data.dataBulletin[0].screenshot;
                            this.contract_photo = res.data.data.dataBulletin[0].contract_photo;
                            this.department_id = res.data.data.dataBulletin[0].department_id;
                        }else{
                            this.isShow = true;
                            this.myData = {};
                            this.dataBulletin = [];           //喜报
                            this.dataLose = null;             //炸单
                            this.dataOldRent = null;          //调房
                            this.dataRefund = null;           //款项
                            this.contract_photo = {};         //合同照片
                            this.largePic = [];               //点击放大图片
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
                        src: this.screenshots,
                        i: num
                    }];
                } else {
                    this.largePic = [{
                        src: this.contract_photo,
                        i: num
                    }];
                }
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
        width: 33.3333%;
    }

    div.detail > div > span:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 140px;
    }
    div.detail > div > span:last-of-type{
        word-break: break-all;
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
