<template>
    <div>
        <!--人事入职离职率-->
        <div class="static" v-if="simulate.indexOf('Statistics/manager') > -1 || isSuper">
            <div id="resourceChat" style="height: 400px;"></div>
        </div>

        <!--平均年限-->
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

        <!--平均租出时间-->
        <div class="static" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="rent_day_avg" style="height: 400px;"></div>
        </div>

        <!--客户来源-->
        <div class="static customerChat" v-if="simulate.indexOf('Statistics/market') > -1 || isSuper">
            <div id="customerChat" style="height: 400px;"></div>
        </div>

        <div class="main" v-if="simulate.indexOf('Statistics/customer_center') > -1 || isSuper">
            <iframe src="https://insight.udesk.cn/site/shared-dashboard/36?token=171220213328gaVzjhDN" id="myiframe"
                    scrolling="yes" frameborder="0"></iframe>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['simulate', 'isSuper'],
        data (){
            return {
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
            this.check();
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
            check (){
//                入职人数/离职率
                this.$http.get('statistics/manager/dismiss').then((res) => {
                    if (res.data.code === '10000') {
                        this.times = res.data.data.times;
                        this.dismiss_rate = res.data.data.dismiss_rate;
                        this.dismiss_count = res.data.data.dismiss_count;
//                        入职人数
                        this.$http.get('statistics/manager/enroll').then((res) => {
                            if (res.data.code === '10000') {
                                this.times = res.data.data.times;
                                this.enroll_rate = res.data.data.enroll_rate;
                                this.resourceChat();
                            } else {
                                this.enroll_rate = [];
                            }
                        });
                    } else {
                        this.dismiss_rate = [];
                        this.dismiss_count = [];
                    }
                });

//                平均年限/平均空置期/空置率
                this.$http.get('statistics/market/year_avg').then((res) => {
                    if (res.data.code === '20020') {
                        this.year_avg = res.data.data.year_avg;
//                        平均空置期
                        this.$http.get('statistics/market/deal_date').then((res) => {
                            if (res.data.code === '20030') {
                                this.deal_date = res.data.data.deal_date;
//                                空置率
                                this.$http.get('statistics/market/vacancy_rate').then((res) => {
                                    if (res.data.code === '20040') {
                                        this.vacancy_rate = res.data.data.vacancy_rate;
                                        this.yearAvg();
                                    } else {
                                        this.vacancy_rate = [];
                                    }
                                });
                            } else {
                                this.deal_date = [];
                            }
                        });
                    } else {
                        this.year_avg = [];
                    }
                });

//                平均租房价格/平均客单价/溢价房数量
                this.$http.get('statistics/market/rent_price_avg').then((res) => {
                    if (res.data.code === '20050') {
                        this.rent_price_avg = res.data.data.rent_price_avg;
//                        平均客单价
                        this.$http.get('statistics/market/collect_price_avg').then((res) => {
                            if (res.data.code === '20070') {
                                this.collect_price_avg = res.data.data.collect_price_avg;
//                                溢价房数量
                                this.$http.get('statistics/market/number_premium_rooms').then((res) => {
                                    if (res.data.code === '20060') {
                                        this.number_premium_rooms = res.data.data.number_premium_rooms;
                                        this.rentPrice();
                                    } else {
                                        this.number_premium_rooms = [];
                                    }
                                });
                            } else {
                                this.collect_price_avg = [];
                            }
                        });
                    } else {
                        this.rent_price_avg = [];
                    }
                });

//                业绩
                this.$http.get('statistics/market/achievement').then((res) => {
                    if (res.data.code === '20010') {
                        this.achievement = res.data.data.achievement;
                        this.achiev();
                    }
                });

//                平均租出时间
                this.$http.get('statistics/market/rent_day_avg').then((res) => {
                    if (res.data.code === '20080') {
                        this.rent_months_avg = res.data.data.rent_months_avg;
                        this.rent_day();
                    }
                });

//                客户来源
                this.$http.get('statistics/market/customer').then((res) => {
                    if (res.data.code === '20000') {
                        this.times = res.data.data.times;
                        this.customer_source_count = res.data.data.customer_source_count;
                        let rates = res.data.data.customer_source_rate;
                        for (let key in rates[0]) {
                            this.rate1.push(rates[0][key]);
                        }
                        for (let key in rates[1]) {
                            this.rate2.push(rates[1][key]);
                        }
                        for (let key in rates[2]) {
                            this.rate3.push(rates[2][key]);
                        }
                        for (let key in rates[3]) {
                            this.rate4.push(rates[4][key]);
                        }
                        for (let key in rates[5]) {
                            this.rate5.push(rates[5][key]);
                        }
                        for (let key in rates[6]) {
                            this.rate6.push(rates[6][key]);
                        }
                        for (let key in rates[7]) {
                            this.rate7.push(rates[7][key]);
                        }
                        for (let key in rates[8]) {
                            this.rate8.push(rates[8][key]);
                        }
                    } else {
                        this.customer_source_count = [];
                        this.source = [];
                        this.rate1 = [];
                        this.rate2 = [];
                        this.rate3 = [];
                        this.rate4 = [];
                        this.rate5 = [];
                        this.rate6 = [];
                        this.rate7 = [];
                        this.rate8 = [];
                    }
                    this.customerChats();
                });

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

//            平均年限/平均空置期/空置率
            yearAvg (){
                let option = {
                    title: {
                        text: '平均年限'
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
                        data: ['平均年限(年)', '平均空置期(天)', '空置率']
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
                            name: ['平均年限(年)', '平均空置期(天)'],
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
                            name: '平均年限(年)',
                            type: 'bar',
                            data: this.year_avg,
                        },
                        {
                            name: '平均空置期(天)',
                            type: 'bar',
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

//            平均租房价格/平均客单价/溢价房数量
            rentPrice (){
                let option = {
                    title: {
                        text: '平均租房价格'
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
                        data: ['平均租房价格', '平均客单价', '溢价房数量'],
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
                            name: ['平均租房价格', '平均客单价'],
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
                            name: '平均客单价',
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

//            平均租出时间
            rent_day (){
                let option = {
                    title: {
                        text: '平均租出时间'
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
                        data: ['平均租出时间'],
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
                            name: '平均租出时间',
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
                            name: '平均租出时间',
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
                            max: 10,
                            interval: 2,
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
                            data: this.rate1
                        },
                        {
                            name: this.source[2],
                            type: 'line',
                            data: this.rate2
                        },
                        {
                            name: this.source[3],
                            type: 'line',
                            data: this.rate3
                        },
                        {
                            name: this.source[4],
                            type: 'line',
                            data: this.rate4
                        },
                        {
                            name: this.source[5],
                            type: 'line',
                            data: this.rate5
                        },
                        {
                            name: this.source[6],
                            type: 'line',
                            data: this.rate6
                        },
                        {
                            name: this.source[7],
                            type: 'line',
                            data: this.rate7
                        },
                        {
                            name: this.source[8],
                            type: 'line',
                            data: this.rate8
                        },
                    ]
                };
                this.myChart[5] = this.$echarts.init(document.getElementById('customerChat'));
                //使用制定的配置项和数据显示图表
                this.myChart[5].setOption(option);
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
        height: 1200px;
    }

    .main iframe {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
