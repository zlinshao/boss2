<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>业绩计算器</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <header>
                    <span>计算条件</span>
                </header>
                <div class="has-js formula">
                    <div class="form-group">
                        <label class="titles">是否为杭州&nbsp;<span class="text-danger">*</span></label>
                        <div class="labelRadio">
                            <label :class="{'label_radio':true,'r_on':city == 1,'r_off':city != 1}">
                                <input type="radio" name="city" value="1"
                                       class="pull-left" v-model="city">是
                            </label>
                            <label :class="{'label_radio':true,'r_on':city == 2,'r_off':city != 2}">
                                <input type="radio" name="city" value="2"
                                       class="pull-left" v-model="city">否
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="titles">充公方&nbsp;<span class="text-danger">*</span></label>
                        <div class="labelRadio">
                            <label :class="{'label_radio':true,'r_on':confiscate == 0,'r_off':confiscate != 0}">
                                <input type="radio" name="gender" value="0"
                                       class="pull-left" v-model="confiscate">无
                            </label>
                            <label :class="{'label_radio':true,'r_on':confiscate == 1,'r_off':confiscate != 1}">
                                <input type="radio" name="gender" value="1"
                                       class="pull-left" v-model="confiscate">收房人
                            </label>
                            <label :class="{'label_radio':true,'r_on':confiscate == 2,'r_off':confiscate != 2}">
                                <input type="radio" name="gender" value="2"
                                       class="pull-left" v-model="confiscate">租房人
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="titles">收房条件&nbsp;<span class="text-danger">*</span></label>
                        <div class="col-sm-12">
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">签约日期&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                :idName="'collect'" @sendDate="collectDate"></DatePicker>
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">签约时长&nbsp;
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请输入月数"
                                           v-model="collectDuration">
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">月单价&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请选择月单价"
                                           v-if="isShow" v-model="collectPrice[0]">
                                    <label v-if="!isShow" style="cursor:pointer;" class="text-primary"
                                           @click="priceModule">{{collectContent}}</label>
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">付款方式&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请输入付款方式"
                                           v-model="collectPay">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">第一次付款时间&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                :idName="'first'" @sendDate="firstDate"></DatePicker>
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">中介费&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请输入金额"
                                           v-model="collectFree">
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">保修期(月)&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请输入月数"
                                           v-model="guarantee" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="titles">租房条件&nbsp;<span class="text-danger">*</span></label>
                        <div class="col-sm-12">
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">签约日期&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                :idName="'rent'" @sendDate="rentDate"></DatePicker>
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">月单价&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请选择月单价"
                                           v-model="rentPrice">
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">付款方式&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请输入付款方式"
                                           v-model="rentPay">
                                </div>
                            </div>
                            <div class="col-sm-3 main">
                                <label class="col-sm-4" style="padding: 0;">中介费&nbsp;<span class="text-danger">*</span></label>
                                <div class="form-group col-sm-8">
                                    <input type="number" class="form-control" placeholder="请输入金额"
                                           v-model="rentFree">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" style="border-top: 1px solid #ddd">
                            <div class="main pull-right" style="margin: 10px 30px 0 0;">
                                <button class="btn btn-primary pull-right" @click="sure">计算业绩</button>
                            </div>
                        </div>
                    </div>
                </div>

                <header>
                    <span>计算结果</span>
                </header>
                <div class="has-js formula">
                    <div class="top">
                        当月总溢出业绩<10万--提点: 0.01
                        &nbsp; <span class="text-danger">|</span>&nbsp;
                        10万≤溢出<15万--提点: 0.02
                        &nbsp; <span class="text-danger">|</span>&nbsp;
                        15万≤溢出<20万--提点: 0.025
                        &nbsp; <span class="text-danger">|</span>&nbsp;
                        20万≤溢出<25万--提点: 0.03
                        &nbsp; <span class="text-danger">|</span>&nbsp;
                        溢出≥25万--提点: 0.035
                    </div>
                    <div>
                        <section class="panel table table-responsive roll has-js">
                            <table class="table table-advance table-hover">
                                <!--table-bordered-->
                                <thead>
                                <tr style="background-color: #9acfea">
                                    <th colspan="10" class="text-center" style="color: #ffffff;">
                                        收&nbsp;&nbsp;&nbsp;房
                                    </th>
                                </tr>
                                <tr>
                                    <th class="text-center">当月总溢出业绩</th>
                                    <th class="text-center">提成</th>
                                    <th class="text-center">空置期奖励</th>
                                    <th class="text-center">价格差奖励</th>
                                    <th class="text-center">收方付款方式奖励</th>
                                    <th class="text-center">收房年限奖励</th>
                                    <th class="text-center">保修期奖励</th>
                                    <th class="text-center">年限涨价扣款</th>
                                    <th class="text-center">空置期扣款</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="(key,index) in counter1">
                                    <td><10万</td>
                                    <td>{{key.collect.commission}}</td>
                                    <td>{{key.collect.bonus_vacancy}}</td>
                                    <td>{{key.collect.bonus_price}}</td>
                                    <td>{{key.collect.bonus_pay_type}}</td>
                                    <td>{{key.collect.bonus_year}}</td>
                                    <td>{{key.collect.bonus_warrenty}}</td>
                                    <td>{{key.collect.punish_year}}</td>
                                    <td>{{key.collect.punish_vacancy}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter2">
                                    <td>10万≤溢出<15万</td>
                                    <td>{{key.collect.commission}}</td>
                                    <td>{{key.collect.bonus_vacancy}}</td>
                                    <td>{{key.collect.bonus_price}}</td>
                                    <td>{{key.collect.bonus_pay_type}}</td>
                                    <td>{{key.collect.bonus_year}}</td>
                                    <td>{{key.collect.bonus_warrenty}}</td>
                                    <td>{{key.collect.punish_year}}</td>
                                    <td>{{key.collect.punish_vacancy}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter3">
                                    <td>15万≤溢出<20万</td>
                                    <td>{{key.collect.commission}}</td>
                                    <td>{{key.collect.bonus_vacancy}}</td>
                                    <td>{{key.collect.bonus_price}}</td>
                                    <td>{{key.collect.bonus_pay_type}}</td>
                                    <td>{{key.collect.bonus_year}}</td>
                                    <td>{{key.collect.bonus_warrenty}}</td>
                                    <td>{{key.collect.punish_year}}</td>
                                    <td>{{key.collect.punish_vacancy}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter4">
                                    <td>20万≤溢出<25万</td>
                                    <td>{{key.collect.commission}}</td>
                                    <td>{{key.collect.bonus_vacancy}}</td>
                                    <td>{{key.collect.bonus_price}}</td>
                                    <td>{{key.collect.bonus_pay_type}}</td>
                                    <td>{{key.collect.bonus_year}}</td>
                                    <td>{{key.collect.bonus_warrenty}}</td>
                                    <td>{{key.collect.punish_year}}</td>
                                    <td>{{key.collect.punish_vacancy}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter5">
                                    <td>≥25万</td>
                                    <td>{{key.collect.commission}}</td>
                                    <td>{{key.collect.bonus_vacancy}}</td>
                                    <td>{{key.collect.bonus_price}}</td>
                                    <td>{{key.collect.bonus_pay_type}}</td>
                                    <td>{{key.collect.bonus_year}}</td>
                                    <td>{{key.collect.bonus_warrenty}}</td>
                                    <td>{{key.collect.punish_year}}</td>
                                    <td>{{key.collect.punish_vacancy}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                    <div>
                        <section class="panel table table-responsive roll has-js">
                            <table class="table table-advance table-hover">
                                <!--table-bordered-->
                                <thead>
                                <tr style="background-color: #F1C4C4">
                                    <th colspan="4" class="text-center " style="color: #ffffff;">
                                        租&nbsp;&nbsp;&nbsp;房
                                    </th>
                                </tr>
                                <tr>
                                    <th class="text-center">当月总溢出业绩</th>
                                    <th class="text-center">提成</th>
                                    <th class="text-center">空置期奖励</th>
                                    <th class="text-center">价格差奖励</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="(key,index) in counter1">
                                    <td><10万</td>
                                    <td>{{key.rent.commission}}</td>
                                    <td>{{key.rent.bonus_vacancy}}</td>
                                    <td>{{key.rent.bonus_price}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter2">
                                    <td>10万≤溢出<15万</td>
                                    <td>{{key.rent.commission}}</td>
                                    <td>{{key.rent.bonus_vacancy}}</td>
                                    <td>{{key.rent.bonus_price}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter3">
                                    <td>15万≤溢出<20万</td>
                                    <td>{{key.rent.commission}}</td>
                                    <td>{{key.rent.bonus_vacancy}}</td>
                                    <td>{{key.rent.bonus_price}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter4">
                                    <td>20万≤溢出<25万</td>
                                    <td>{{key.rent.commission}}</td>
                                    <td>{{key.rent.bonus_vacancy}}</td>
                                    <td>{{key.rent.bonus_price}}</td>
                                </tr>
                                <tr class="text-center" v-for="(key,index) in counter5">
                                    <td>≥25万</td>
                                    <td>{{key.rent.commission}}</td>
                                    <td>{{key.rent.bonus_vacancy}}</td>
                                    <td>{{key.rent.bonus_price}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </section>

        <div role="dialog" class="modal fade bs-example-modal-sm" id="counter">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group main" v-for="(key,index) in collectPrice">
                            <label class="col-sm-2">第{{index + 1}}年&nbsp;<span class="text-danger">*</span></label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="请输入金额"
                                       v-model="collectPrice[index]">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                        <button data-dismiss="modal" class="btn btn-primary btn-md" @click="monthPrice">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import Status from '../common/status.vue'

    export default {
        name: "achievement-counter",
        components: {DatePicker,Status},
        data() {
            return {
                confiscate: 0,                  //充公方
                city: 2,                        //城市
                isShow: true,

                collectRange: '',               //签约日期 收
                collectDuration: '',            //签约时长 收
                collectPrice: [],               //月单价 收
                collectContent: '月单价',       //月单价 收
                collectPay: '',                 //付款方式 收
                firstRange: '',                 //第一次付款时间 收
                collectFree: '',                //中介费 收
                guarantee: 0,                   //保修期 收

                rentRange: '',                  //签约日期 租
                rentPrice: '',                  //月单价 租
                rentPay: '',                    //付款方式 租
                rentFree: '',                   //中介费 租

                dateConfigure: [
                    {
                        range: false,            //日期组件参数
                        needHour: false,
                        position: 'bottom',
                    }
                ],
                currentDate: [],                //日期组件参数

                counter1: [],
                counter2: [],
                counter3: [],
                counter4: [],
                counter5: [],
                info: {                             //提示信息
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
            }
        },
        mounted() {
        },
        watch: {
            collectDuration(val) {
                this.collectPrice = [];
                this.collectContent = '月单价';
                let year = Math.ceil(val / 12);
                if (year > 1) {
                    this.isShow = false;
                    for (let i = 0; i < year; i++) {
                        this.collectPrice.push('');
                    }
                } else {
                    this.isShow = true;
                }
            },
        },
        methods: {
            collectDate(data) {
                this.collectRange = data;
            },
            firstDate(data) {
                this.firstRange = data;
            },
            rentDate(data) {
                this.rentRange = data;
            },
            priceModule() {
                $('#counter').modal({backdrop: 'static'});
            },
            monthPrice() {
                this.collectContent = '';
                for (let i = 0; i < this.collectPrice.length; i++) {
                    this.collectContent += '第' + (i + 1) + '年' + this.collectPrice[i] + '/';
                }
                $('#counter').modal('hide');
            },
            sure() {
                this.counter1 = [];
                this.counter2 = [];
                this.counter3 = [];
                this.counter4 = [];
                this.counter5 = [];
                this.$http.get('/salary/calculator', {
                    params: {
                        hangzhou: this.city,
                        confiscate: this.confiscate,
                        collect_deal_date: this.collectRange,           //签约日期 收
                        collect_years: this.collectDuration,            //签约时长 收
                        collect_prices: this.collectPrice,              //月单价 收
                        collect_pay_type: this.collectPay,              //付款方式 收
                        collect_first_pay_date: this.firstRange,        //第一次付款时间 收
                        collect_medi_cost: this.collectFree,            //中介费 收
                        warrenty: this.guarantee,                       //保修期 收

                        rent_deal_date: this.rentRange,                 //签约日期 租
                        rent_price: this.rentPrice,                     //月单价 租
                        rent_pay_type: this.rentPay,                    //付款方式 租
                        rent_medi_cost: this.rentFree,                  //中介费 租
                    }
                }).then((res) => {
                    if (res.data.code !== '10039') {
                        this.counter1.push(res.data['10万以下']);
                        this.counter2.push(res.data['10万 ~ 15万']);
                        this.counter3.push(res.data['15万 ~ 20万']);
                        this.counter4.push(res.data['20万 ~ 25万']);
                        this.counter5.push(res.data['25万以上']);
                        // this.errorMsg('计算成功');
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            successMsg(msg){
                //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){
                //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        },
    }
</script>

<style scoped>
    header {
        padding: 10px;
        font-size: 18px;
        border-bottom: 1px solid #dddddd;
    }

    .formula {
        padding: 12px;
    }

    .formula .top {
        padding: 12px 0;
        font-size: 14px;
    }

    .labelRadio label {
        width: 80px;
    }

    .form-group, .main {
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
    }

    .form-control, .form-group.col-sm-8 {
        margin: 0;
    }

    .main {
        align-items: center;
        height: 34px;
        margin-bottom: 18px;
    }

    label.titles {
        width: 100px;
        font-size: 16px;
        color: #59ace2;
    }

    .text-center > td:first-of-type {
        width: 170px;
    }
</style>