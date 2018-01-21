<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报管理</li>
            <li>
                <router-link to="collectBulletin">收房喜报</router-link>
            </li>
            <li>收房喜报详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header class="top">
                    <h4>
                        <i class="fa fa-file-text-o"></i>&nbsp;喜报详情
                        <span v-show="dataLose != null">炸</span>
                        <span v-show="dataConfiscation != null">充</span>
                        <span v-show="dataRefund != null">款</span>
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
                            <span class="text-primary">押金：</span>
                            <span>{{key.bet_money}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">电话号码：</span>
                            <span>{{key.collect_owner_mobile}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">收房类型：</span>
                            <span v-if="key.cate_id == 1">收房</span>
                            <span v-if="key.cate_id == 2">续约</span>
                        </div>
                        <div class="">
                            <span class="text-primary">月单价：</span>
                            <span>{{key.price_per_month_together}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">收款人与业主关系：</span>
                            <span>{{key.payee_owner_relationship}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">地址：</span>
                            <span>{{key.detailed_address}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">第一次付款时间：</span>
                            <span>{{key.pay_time_first}}</span>
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
                            <span class="text-primary">房型：</span>
                            <span>{{key.rooms}}室{{key.hall}}厅{{key.toilet}}卫</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款方式：</span>
                            <span>{{values[key.collect_purchase_way - 1]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">合同照片：</span>
                            <a class="big" v-for="(pic,index) in key.contract_photo"
                               style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index)">
                                <img :src="pic">
                            </a>
                        </div>
                        <div class="">
                            <span class="text-primary">收房月数：</span>
                            <span>{{key.collect_month}}</span>
                        </div>
                        <div class="" v-if="key.collect_purchase_way != 3">
                            <span class="text-primary">收款人户名：</span>
                            <span>{{key.collect_payee_name}}</span>
                        </div>
                        <div class="" v-else>
                            <span class="text-primary">账户：</span>
                            <span>{{key.collect_account}}</span>
                        </div>

                        <div class="">
                            <span class="text-primary">备注：</span>
                            <span>{{key.remark}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">保修期(月)：</span>
                            <span>{{key.warranty_month}}</span>
                        </div>

                        <div class="" v-if="key.collect_purchase_way == 1 || key.collect_purchase_way == 4">
                            <span class="text-primary">收款银行(支行)：</span>
                            <span>{{dict.bank[key.collect_bank]}}</span>
                        </div>
                        <div class="" v-else></div>

                        <div class="">
                            <span class="text-primary">开单人：</span>
                            <span>{{staff[key.staff_id]}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">空置期：</span>
                            <span>{{key.vacant_day}}</span>
                        </div>
                        <div class="" v-if="key.collect_purchase_way != 3">
                            <span class="text-primary">账户：</span>
                            <span>{{key.collect_account}}</span>
                        </div>
                        <div class="" v-else></div>

                        <div class="">
                            <span class="text-primary">报备人：</span>
                            <span>{{key.bulletin_staff_id}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款方式：</span>
                            <span>{{key.pay_way_together}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">房东姓名：</span>
                            <span>{{key.collect_owner_name}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">所属部门：</span>
                            <span>{{dict.department_all[department_id]}}</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive" v-if="dataLose != null" v-for="(key,index) in dataLose">
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
                        <div class="" v-if="key.collect_purchase_way == 1 || key.collect_purchase_way == 4">
                            <span class="text-primary">收款银行：</span>
                            <span>{{dict.bank[key.lose_bank]}}</span>
                        </div>
                        <div class=""  v-if="key.collect_purchase_way != 3">
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
                            <span>{{dict.department_all[key.department_id]}}</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive" v-for="(key,index) in dataConfiscation" v-if="dataConfiscation != null">
                    <header class="bulletin">
                        <h4>充公</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="">
                            <span class="text-primary">报备时间：</span>
                            <span>{{key.bulletin_time}}</span>
                        </div>
                        <div class="">
                            <span class="text-primary">充公原因：</span>
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
                <div class="panel-body table-responsive" v-if="dataRefund != null" v-for="(key,index) in dataRefund">
                    <header class="bulletin">
                        <h4>款项</h4>
                    </header>
                    <div class="col-md-12 detail">
                        <div class="">
                            <span class="text-primary">报备时间：</span>
                            <span>2017-02-17</span>
                        </div>
                        <div class="">
                            <span class="text-primary">款项类型：</span>
                            <span>中介费</span>
                        </div>
                        <div class="">
                            <span class="text-primary">备注：</span>
                            <span>多付一个月押金</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款金额：</span>
                            <span>800</span>
                        </div>
                        <div class="">
                            <span class="text-primary">付款方式：</span>
                            <span>银行卡</span>
                        </div>
                        <div class="">
                            <span class="text-primary">收款银行：</span>
                            <span>南京银行</span>
                        </div>
                        <div class="">
                            <span class="text-primary">收款人户名：</span>
                            <span>赵梦涵</span>
                        </div>
                        <div class="">
                            <span class="text-primary">账户：</span>
                            <span>123456789</span>
                        </div>
                        <div class="">
                            <span class="text-primary">报备人：</span>
                            <span>李彬彬</span>
                        </div>
                        <div class="">
                            <span class="text-primary">所属部门：</span>
                            <span>百万一组</span>
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
                dict: {},
                values: ['银行卡', '支付宝', '微信', '存折'],
                myData: {},
                dataBulletin: [],           //喜报
                dataLose: [],               //炸单
                dataConfiscation: [],       //充公
                dataRefund: [],             //款项
                contract_photo: {},         //合同照片
                largePic: [],               //点击放大图片
                staff: {},
                department_id: '',
            }
        },
        mounted() {
            this.$http.get('core/customer/dict').then((res) => {
                this.dict = res.data;

                this.$http.get('revenue/glee_collect/staff_id').then((res) => {
                    this.staff = res.data;

                    this.$http.get('bulletin/collect/collectBulletinDetail?id=' + this.$route.query.ids + '&mark=1').then((res) => {
                        if (res.data.code === '90010') {
                            this.isShow = false;
                            this.myData = res.data.data;
                            this.dataBulletin = res.data.data.dataBulletin;
                            this.dataLose = res.data.data.dataLose;
                            this.dataRefund = res.data.data.dataRefund;
                            this.dataConfiscation = res.data.data.dataConfiscation;
                            this.contract_photo = res.data.data.dataBulletin[0].contract_photo;
                            this.department_id = res.data.data.dataBulletin[0].department_id;
                        } else {
                            this.isShow = true;
                            this.myData = {};
                            this.dataBulletin = [];           //喜报
                            this.dataLose = null;             //炸单
                            this.dataConfiscation = null;     //充公
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
            showLargePic(num) {
                this.largePic = [{
                    src: this.contract_photo,
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

    header.top > h4 > span:last-of-type {
        background: #009933;
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
