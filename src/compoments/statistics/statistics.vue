<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <div class="input-group">
                        <select class="form-control" @change="search" v-model="types">
                            <option value="week">最近八周</option>
                            <option value="day">最近八天</option>
                        </select>
                    </div>
                    <div class="padd" v-if="isSuper">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                    @sendDate="getDate"></DatePicker>
                    </div>
                </form>
            </div>
        </section>

        <div class="col-md-12 tongji" v-if="isSuper">
            <div class="col-md-6 info" style="padding: 0">
                <div>
                    <span class="text-primary">最大空置期天数：</span>
                    <span v-if="deal_date_max != '无'">{{deal_date_max.diff}}</span>
                    <span v-else>无</span>
                </div>
                <div>
                    <span class="text-primary">平均空置期天数：</span>
                    <span>{{vacancy_period.deal_date_avg}}</span>
                </div>
                <div>
                    <span class="text-primary">超出空置期天数：</span>
                    <span>{{vacancy_period.deal_date_overtop_avg}}</span>
                </div>
                <div>
                    <span class="text-primary">最大空置期：</span>
                    <span v-if="deal_date_max != '无'">{{deal_date_max.city}}&nbsp;>&nbsp;{{deal_date_max.detailed_address}}&nbsp;>&nbsp;{{deal_date_max.real_name}}</span>
                    <span v-else>无</span>
                </div>
                <div>
                    <span class="text-primary">超出最大空置期：</span>
                    <span v-if="overtop != '无'">{{overtop.city}}&nbsp;>&nbsp;{{overtop.detailed_address}}&nbsp;>&nbsp;{{overtop.real_name}}</span>
                    <span v-else>无</span>
                </div>
                <div>
                    <span class="text-primary">总收房中介费：</span>
                    <span>{{agency_fee.collect_agency_fee}}</span>
                </div>
                <div>
                    <span class="text-primary">最大收房中介费：</span>
                    <span>{{collect_max.medi_cost}}</span>
                </div>
                <div>
                    <span class="text-primary">总租房中介费：</span>
                    <span>{{agency_fee.rent_agency_fee}}</span>
                </div>
                <div>
                    <span class="text-primary">最大租房中介费：</span>
                    <span>{{rent_max.medi_cost}}</span>
                </div>
            </div>
            <div class="col-md-6 info">
                <div>
                    <span class="text-primary">平均收房月数：</span>
                    <span>{{deal_date_avg.months_avg}}</span>
                </div>
                <div>
                    <span class="text-primary">最大收房月数：</span>
                    <span>{{months_max.months}}</span>
                </div>
                <div>
                    <span class="text-primary">最高溢价：</span>
                    <span>{{differences.price_differences}}</span>
                </div>
                <div>
                    <span class="text-primary">平均溢价：</span>
                    <span>{{number_premium.price_differences_avg}}</span>
                </div>
                <div>
                    <span class="text-primary">最高溢价收：</span>
                    <span v-if="differences != '无'">{{differences.city}}&nbsp;>&nbsp;{{differences.detailed_address}}&nbsp;>&nbsp;{{differences.collect_name}}</span>
                    <span v-else>无</span>
                </div>
                <div>
                    <span class="text-primary">最高溢价租：</span>
                    <span v-if="differences != '无'">{{differences.city}}&nbsp;>&nbsp;{{differences.detailed_address}}&nbsp;>&nbsp;{{differences.rent_name}}</span>
                    <span v-else>无</span>
                </div>
                <div>
                    <span class="text-primary">离职总人数：</span>
                    <span>{{dis_count.dismiss_count}}</span>
                </div>
                <div>
                    <span class="text-primary">入职总人数：</span>
                    <span>{{enr_count.enroll_count}}</span>
                </div>
            </div>
        </div>

        <!--人事入职离职率-->
        <div class="static" v-if="simulate.indexOf('Statistics/manager') > -1 || isSuper">
            <div id="resourceChat" style="height: 400px;"></div>
        </div>

        <!--平均空置期/空置率-->
        <div class="static" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="yearAvg" style="height: 400px;"></div>
        </div>

        <!--平均租房价格-->
        <div class="static" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="rentPrice" style="height: 400px;"></div>
        </div>

        <!--业绩-->
        <div class="static" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="achievement" style="height: 400px;"></div>
        </div>

        <!--平均出租时间-->
        <div class="static" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="rent_day_avg" style="height: 400px;"></div>
        </div>

        <!--平均收房年限-->
        <div class="static" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="year_svg" style="height: 400px;"></div>
        </div>

        <!--客户来源-->
        <div class="static customerChat" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="customerChat" style="height: 400px;"></div>
        </div>

        <!--<div class="main" v-if="simulate.indexOf('Statistics/customer_center') > -1 || isSuper">-->
        <!--<iframe :src="addr" id="myiframe"-->
        <!--scrolling="yes" frameborder="0"></iframe>-->
        <!--</div>-->

    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    export default {
        props: ['simulate', 'isSuper'],
        components: {DatePicker},
        data (){
            return {
                isShow: false,
                vacancy_period: {},         //空置期
                deal_date_max: {},          //空置期最大
                overtop: {},                //空置期超出
                deal_date_avg: {},          //收房月数
                months_max: {},             //最大收房月数
                number_premium: {},         //平均溢价
                differences: {},            //溢价
                agency_fee: {},             //中介费
                collect_max: {},            //最大收中介费
                rent_max: {},               //最大租中介费
                dis_count: {},              //离职人数
                enr_count: {},              //入职人数

                currentDate: [],
                dateConfigure: [                    //日期范围选择
                    {
                        range: true,
                        needHour: true,
                    }
                ],
                addr: '',
                types: 'week',
                myChart: [],                                //pushHTML
                source: [],
                rate1: [],                                  //客户来源
                rate2: [],
                rate3: [],
                rate4: [],
                rate5: [],
                rate6: [],
                rate7: [],
                rate8: [],

                times: [],                                  //日期
                dismiss_rate: [],                           //离职率
                dismiss_count: [],                          //离职人数
                enroll_rate: [],                            //入职人数

                customer_source_count: [],                  //客户数量

                year_avg: [],                               //平均年限
                deal_date: [],                              //平均空置期
                vacancy_rate: [],                           //空置率
                rent_price_avg: [],                         //平均租房价格
                collect_price_avg: [],                      //平均客单价
                number_premium_rooms: [],                   //溢价房数量
                achievement: [],                            //业绩
                rent_day_avg: [],                           //平均租出时间
                screenWidth: document.body.clientWidth,     // 页面宽度
            }
        },
        mounted (){
            this.$http.get('core/customer/dict').then((res) => {
                this.source.push('客户数量');
                for (let key in res.data.source) {
                    this.source.push(res.data.source[key]);
                }
            });
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    this.screenWidth = window.screenWidth;
                })();
            };
            this.check('week');
            this.houseMonth('');
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val;
                    this.timer = true;
//                    let that = this;
                    setTimeout(() => {
                        // that.screenWidth = that.$store.state.canvasWidth
//                        console.log(that.screenWidth);
                        for (let i = 0; i < this.myChart.length; i++) {
                            (() => {
                                this.myChart[i].resize();
                            })(i)
                        }
                        this.timer = false;
                    }, 200)
                }
            }
        },
        methods: {
            getDate(data){
//                this.params.range = data;
                this.houseMonth(data);
            },
            search (){
                this.check(this.types);
            },
            houseMonth (date){
                this.vacancy_period = {};       //空置期
                this.deal_date_avg = {};        //收房月数
                this.number_premium = {};       //平均溢价
                this.agency_fee = {};           //中介费
                this.dis_count = {};            //离职人数
                this.enroll_count = {};         //入职人数
//                空置期
                this.$http.get('statistics/market/vacancy_period?time=' + date).then((res) => {
                    if (res.data.code === '200110') {
                        this.vacancy_period = res.data.data;
//                    最大空置期天数
                        this.deal_date_max = res.data.data.deal_date_max;
                        this.overtop = res.data.data.deal_date_overtop_max;
                    } else {
                        this.vacancy_period.deal_date_avg = '无';
                        this.vacancy_period.deal_date_overtop_avg = '无';
                    }
                });
//                收房月数
                this.$http.get('statistics/market/deal_date_avg?time=' + date).then((res) => {
                    if (res.data.code === '200110') {
                        this.deal_date_avg = res.data.data;
                        this.months_max = res.data.data.months_max;
                    } else {
                        this.months_max.months = '无';
                        this.deal_date_avg.months_avg = '无'
                    }
                });
//                平均溢价
                this.$http.get('statistics/market/number_premium?time=' + date).then((res) => {
                    if (res.data.code === '200120') {
                        this.number_premium = res.data.data;
                        this.differences = res.data.data.price_differences_max;
                    }
                });
//                中介费
                this.$http.get('statistics/market/agency_fee?time=' + date).then((res) => {
                    if (res.data.code === '200130') {

                        this.agency_fee = res.data.data;
                        if (res.data.data.collect_agency_fee_max !== '无') {
                            this.collect_max = res.data.data.collect_agency_fee_max;
                        } else {
                            this.collect_max.medi_cost = '无'
                        }
                        if (res.data.data.rent_agency_fee_max !== '无') {
                            this.rent_max = res.data.data.rent_agency_fee_max;
                        } else {
                            this.rent_max.medi_cost = '无'
                        }
                    }
                });
//                离职人数
                this.$http.get('statistics/Manager/dismiss_count?time=' + date).then((res) => {
                    if (res.data.code === '10020') {
                        this.dis_count = res.data.data;
                    } else {
                        this.dis_count.dismiss_count = '无'
                    }
                });
//                入职总人数
                this.$http.get('statistics/Manager/enroll_count?time=' + date).then((res) => {
                    if (res.data.code === '10030') {
                        this.enr_count = res.data.data;
                    } else {
                        this.enr_count.enroll_count = '无'
                    }
                });
            },
            check (val){
                this.times = [];
//
//                入职人数/离职率
                this.$http.get('statistics/manager/dismiss?type=' + val).then((res) => {
                    this.dismiss_rate = [];
                    this.dismiss_count = [];
                    if (res.data.code === '10000') {
                        this.times = res.data.data.times;
                        this.dismiss_rate = res.data.data.dismiss_rate;
                        this.dismiss_count = res.data.data.dismiss_count;
//                        入职人数
                        this.$http.get('statistics/manager/enroll?type=' + val).then((res) => {
                            this.enroll_rate = [];
                            if (res.data.code === '10000') {
                                this.times = res.data.data.times;
                                this.enroll_rate = res.data.data.enroll_rate;
                                this.resourceChat();
                            }
                        });
                    }
                });

//                平均收房年限
                this.$http.get('statistics/market/year_avg?type=' + val).then((res) => {
                    this.year_avg = [];
                    if (res.data.code === '20020') {
                        this.times = res.data.data.times;
                        this.year_avg = res.data.data.year_avg;
                        this.yearSvg();
                    }
                });

//                平均空置期/空置率
                this.$http.get('statistics/market/deal_date?type=' + val).then((res) => {
                    this.deal_date = [];
                    if (res.data.code === '20030') {
                        this.times = res.data.data.times;
                        this.deal_date = res.data.data.deal_date;
//                                空置率
                        this.$http.get('statistics/market/vacancy_rate?type=' + val).then((res) => {
                            this.vacancy_rate = [];
                            if (res.data.code === '20040') {
                                this.vacancy_rate = res.data.data.vacancy_rate;
                                this.yearAvg();
                            }
                        });
                    }
                });

//                平均租房价格/平均收房价格/溢价房数量
                this.$http.get('statistics/market/rent_price_avg?type=' + val).then((res) => {
                    this.rent_price_avg = [];
                    if (res.data.code === '20050') {
                        this.rent_price_avg = res.data.data.rent_price_avg;
                        this.times = res.data.data.times;
//                        平均客单价
                        this.$http.get('statistics/market/collect_price_avg?type=' + val).then((res) => {
                            this.collect_price_avg = [];
                            if (res.data.code === '20070') {
                                this.collect_price_avg = res.data.data.collect_price_avg;
//                                溢价房数量
                                this.$http.get('statistics/market/number_premium_rooms?type=' + val).then((res) => {
                                    this.number_premium_rooms = [];
                                    if (res.data.code === '20060') {
                                        this.number_premium_rooms = res.data.data.number_premium_rooms;
                                        this.rentPrice();
                                    }
                                });
                            }
                        });
                    }
                });

//                业绩
                this.$http.get('statistics/market/achievement?type=' + val).then((res) => {
                    this.achievement = [];
                    if (res.data.code === '20010') {
                        this.achievement = res.data.data.achievement;
                        this.times = res.data.data.times;
                        this.achiev();
                    }
                });

//                平均出租时间
                this.$http.get('statistics/market/rent_day_avg?type=' + val).then((res) => {
                    this.rent_months_avg = [];
                    if (res.data.code === '20080') {
                        this.rent_months_avg = res.data.data.rent_months_avg;
                        this.times = res.data.data.times;
                        this.rent_day();
                    }
                });

//                客户来源
                this.$http.get('statistics/market/customer?type=' + val).then((res) => {
                    this.customer_source_count = [];
                    this.rate1 = [];
                    this.rate2 = [];
                    this.rate3 = [];
                    this.rate4 = [];
                    this.rate5 = [];
                    this.rate6 = [];
                    this.rate7 = [];
                    this.rate8 = [];
                    if (res.data.code === '20000') {
                        this.times = res.data.data.times;
                        this.customer_source_count = res.data.data.customer_source_count;
                        let rates = res.data.data.customer_source_rate;
                        for (let key in rates) {
                            let rate = rates[key];
                            for (let i in rate) {
                                if (i === '1') {
                                    this.rate1.push(rate[i]);
                                }
                                if (i === '2') {
                                    this.rate2.push(rate[i]);
                                }
                                if (i === '3') {
                                    this.rate3.push(rate[i]);
                                }
                                if (i === '4') {
                                    this.rate4.push(rate[i]);
                                }
                                if (i === '5') {
                                    this.rate5.push(rate[i]);
                                }
                                if (i === '6') {
                                    this.rate6.push(rate[i]);
                                }
                                if (i === '7') {
                                    this.rate7.push(rate[i]);
                                }
                                if (i === '8') {
                                    this.rate8.push(rate[i]);
                                }
                            }
                        }
                    }
                    this.customerChats();
                });

//                客服
//                this.$http.get('statistics/customer_center/call_quality').then((res) => {
//                    if (res.data.code === '10000') {
//                        this.addr = res.data.data.data;
//                    } else {
//                        this.addr = '';
//                    }
//                });
            },

//            人事入职离职
            resourceChat (){
                let option = {
                    title: {
                        text: '人事入职离职'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['入职人数', '离职人数', '离职率'],
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
//                        x: 40,
//                        y: 80,
//                        x2: 100,
                        y2: 100// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '入职人数',
                            min: 0,
//                            max: 100,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value} 人'
                            },

                        },
                        {
                            type: 'value',
                            name: '离职率',
                            min: 0,
//                            max: 100,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '入职人数',
                            type: 'bar',
//                            barWidth: 10,
                            data: this.enroll_rate
                        },
                        {
                            name: '离职人数',
                            type: 'bar',
                            data: this.dismiss_count
                        },
                        {
                            name: '离职率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.dismiss_rate
                        },
                    ]
                };
                this.myChart[0] = this.$echarts.init(document.getElementById('resourceChat'));
                //使用制定的配置项和数据显示图表
                this.myChart[0].setOption(option);
            },

//            平均空置期/空置率
            yearAvg (){
                let option = {
                    title: {
                        text: '平均空置期/空置率'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['平均空置期', '空置率']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: {
//                        left: '3%',
//                        right: '4%',
//                        bottom: '3%',
                        y2: 100,
//                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: ['平均空置期'],
                            min: 0,
//                            max: 100,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                        {
                            type: 'value',
                            name: '空置率',
                            min: 0,
//                            max: 100,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '平均空置期',
                            type: 'bar',
                            barWidth: 36,
                            data: this.deal_date,
                        },
                        {
                            name: '空置率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.vacancy_rate,
                        },
                    ]
                };
                this.myChart[1] = this.$echarts.init(document.getElementById('yearAvg'));
                //使用制定的配置项和数据显示图表
                this.myChart[1].setOption(option);
            },

//            平均租房价格/平均收房价格/溢价房数量
            rentPrice (){
                let option = {
                    title: {
                        text: '平均价格/溢价房数量'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['平均租房价格', '平均收房价格', '溢价房数量'],
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
//                        x: 40,
//                        y: 80,
//                        x2: 100,
                        y2: 100// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: ['平均租房价格', '平均收房价格'],
                            min: 0,
//                            max: 100,
                            interval: 500,
                            axisLabel: {
                                formatter: '{value} 元'
                            },

                        },
                        {
                            type: 'value',
                            name: '溢价房数量',
                            min: 0,
//                            max: 100,
                            interval: 100,
                            axisLabel: {
                                formatter: '{value} 套'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '平均租房价格',
                            type: 'bar',
//                            barWidth: 10,
                            data: this.rent_price_avg
                        },
                        {
                            name: '平均收房价格',
                            type: 'bar',
                            data: this.collect_price_avg
                        },
                        {
                            name: '溢价房数量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.number_premium_rooms
                        },
                    ]
                };
                this.myChart[2] = this.$echarts.init(document.getElementById('rentPrice'));
                //使用制定的配置项和数据显示图表
                this.myChart[2].setOption(option);
            },

//            业绩
            achiev (){
                let option = {
                    title: {
                        text: '业绩'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['业绩'],
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
//                        x: 40,
//                        y: 80,
//                        x2: 100,
                        y2: 100// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '业绩',
                            min: 0,
//                            max: 100,
                            interval: 500000,
                            axisLabel: {
                                formatter: '{value} 元'
                            },

                        },
                    ],
                    series: [
                        {
                            name: '业绩',
                            type: 'bar',
                            barWidth: 36,
                            data: this.achievement
                        },
                    ]
                };
                this.myChart[3] = this.$echarts.init(document.getElementById('achievement'));
                //使用制定的配置项和数据显示图表
                this.myChart[3].setOption(option);
            },

//            平均出租时间
            rent_day (){
                let option = {
                    title: {
                        text: '平均出租时间'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['平均出租时间'],
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
//                        x: 40,
//                        y: 80,
//                        x2: 100,
                        y2: 100// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '平均出租时间',
                            min: 0,
//                            max: 100,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value} 月'
                            },

                        },
                    ],
                    series: [
                        {
                            name: '平均出租时间',
                            type: 'bar',
                            barWidth: 36,
                            data: this.rent_months_avg
                        },
                    ]
                };
                this.myChart[4] = this.$echarts.init(document.getElementById('rent_day_avg'));
                //使用制定的配置项和数据显示图表
                this.myChart[4].setOption(option);
            },

//            平均收房年限
            yearSvg (){
                let option = {
                    title: {
                        text: '平均收房年限'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['平均收房年限'],
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
//                        x: 40,
//                        y: 80,
//                        x2: 100,
                        y2: 100// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '平均收房年限',
                            min: 0,
//                            max: 100,
                            interval: 1,
                            axisLabel: {
                                formatter: '{value} 年'
                            },

                        },
                    ],
                    series: [
                        {
                            name: '平均收房年限',
                            type: 'bar',
                            barWidth: 36,
                            data: this.year_avg
                        },
                    ]
                };
                this.myChart[5] = this.$echarts.init(document.getElementById('year_svg'));
                //使用制定的配置项和数据显示图表
                this.myChart[5].setOption(option);
            },

//            客户来源
            customerChats (){
                let option = {
                    color: ['#D53A35', '#334B5C', '#61A0A8', '#CA8622', '#D48265', '#91C7AE', '#BDA29A', '#C4CCD3'],
                    title: {
                        text: '客户来源'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999',
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: this.source,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: 36,
                                margin: 10,
                                textStyle: {
                                    color: "#222"
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            data: this.times
                        },
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
//                        x: 40,
//                        y: 80,
//                        x2: 100,
                        y2: 100// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '客户数量',
                            min: 0,
//                            max: 100,
                            interval: 100,
                            axisLabel: {
                                formatter: '{value} 人'
                            },

                        },
                        {
                            type: 'value',
                            name: this.source,
                            min: 0,
//                            max: 10,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '客户数量',
                            type: 'bar',
                            barWidth: 36,
                            data: this.customer_source_count
                        },
                        {
                            name: this.source[1],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate1
                        },
                        {
                            name: this.source[2],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate2
                        },
                        {
                            name: this.source[3],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate3
                        },
                        {
                            name: this.source[4],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate4
                        },
                        {
                            name: this.source[5],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate5
                        },
                        {
                            name: this.source[6],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate6
                        },
                        {
                            name: this.source[7],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate7
                        },
                        {
                            name: this.source[8],
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.rate8
                        },
                    ]
                };
                this.myChart[6] = this.$echarts.init(document.getElementById('customerChat'));
                //使用制定的配置项和数据显示图表
                this.myChart[6].setOption(option);
            },
        }
    }
</script>


<style scoped>
    .static {
        float: left;
        width: 49%;
        margin-right: 1%;
        padding: 20px;
        background: #fff;
        box-shadow: 0 4px 12px #aaaaaa;
        margin-bottom: 1%;
    }

    .customerChat {
        width: 100%;
    }

    .main {
        width: 100%;
        height: 1700px;
    }

    .main iframe {
        display: block;
        width: 100%;
        height: 100%;
    }

    .info > div {
        margin-bottom: 20px;
    }

    .info > div > span:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 130px;
    }

    .tongji {
        background: #ffffff;
        padding: 30px 0 10px 36px;
        margin-bottom: 20px;
        border-radius: 6px;
    }
</style>
