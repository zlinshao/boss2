<template>
    <div>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <form class="form-inline clearFix" role="form">
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                    @sendDate="getDate"></DatePicker>
                    </div>
                </form>
            </div>
        </section>
        <div id="statistics" style="height: 700px;"></div>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    export default {
        components: {DatePicker},
        data (){
            return {
                dateConfigure: [
                    {
                        range: true,
                        needHour: true
                    }
                ],
                currentDate: [],
                params: {
                    time: '2017-10-23to2017-12-19',
                },
                times: [],
                dismiss_rate: [],
                enroll_rate: [],
                myChart: [],
                screenWidth: document.body.clientWidth,      // 页面宽度
            }
        },
        mounted (){
            this.check();
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    this.screenWidth = window.screenWidth;
                })()
            }
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
                    }, 100)
                }
            }
        },
        methods: {
            getDate (val){
                this.params.time = val;
                this.check ();
            },
            check (){
                this.$http.get('statistics/manager/dismiss', {
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '10000') {
                        this.times = res.data.data.times;
                        this.dismiss_rate = res.data.data.dismiss_rate;
                        this.$http.get('statistics/manager/enroll', {
                            params: this.params,
                        }).then((res) => {
                            if (res.data.code === '10000') {
                                this.times = res.data.data.times;
                                this.enroll_rate = res.data.data.enroll_rate;
                                this.chats();
                            }
                        });
                    }
                });

            },
            chats (){
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
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
                        name: ['人数', '百分比'],
//                        data: ['人数', '百分比']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLabel: {
                                interval: 0,
                                rotate: -45,
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
//                        x2: 100,
                        y2: 120// /y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '人数',
                            min: 0,
                            max: 100,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value} 人'
                            },

                        },
                        {
                            type: 'value',
                            name: '百分比',
                            min: 0,
                            max: 100,
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
                            name: '离职率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.dismiss_rate
                        }
                    ]
                };

                this.myChart[0] = this.$echarts.init(document.getElementById('statistics'));

                //使用制定的配置项和数据显示图表
                this.myChart[0].setOption(option);
            }
        }
    }
</script>


<style scoped>

</style>
