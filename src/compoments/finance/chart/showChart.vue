<template>
    <div class="clearFix">
        <!--<div>this is template body</div>-->
        <div>
            <div class="row">
                <div class="col-lg-6">
                    <section class="panel">
                        <div class="panel-body text-center">
                            <div id="collect"></div>
                        </div>

                    </section>
                </div>
                <div class="col-lg-6">
                    <section class="panel">
                        <div class="panel-body text-center">
                            <div id="renting"></div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <section class="panel">
                        <div class="panel-body text-center">
                            <div id="goal"></div>
                        </div>
                    </section>
                </div>
                <div class="col-lg-6">
                    <section class="panel">
                        <div class="panel-body text-center">
                            <div id="finish"></div>
                        </div>
                    </section>
                </div>
            </div>


        </div>
    </div>
</template>
<style scoped>
    .panel>div>div{
        width: 80%;
        height: 300px;
        margin: auto;
    }
    .panel-heading{
        background-color: #A9D86E;
        color: #333;
        font-weight: 500;
    }

    .row:nth-child(1){
        margin-top: 20px;
    }

</style>
<script>
    import macarons from 'echarts/theme/macarons'
    import shine from 'echarts/theme/shine'
//    var macarons = require('echarts/theme/macarons')
//        var macarons = require('echarts/theme/macarons');
//    import roma from 'echarts/theme/roma'
    export default{
        data(){
            return {
                x : [],      // 横坐标
                screenWidth: document.body.clientWidth,      // 页面宽度
                myChart : [],
                collectData : [],
                rentingData : [],
                goalData : [],
                finishData : []
            }
        },
        components: {},
        created (){
        },
        mounted : function () {
            this.myChart[0] = this.$echarts.init(document.getElementById('collect'));
            this.myChart[1] = this.$echarts.init(document.getElementById('renting'));
            this.myChart[2] = this.$echarts.init(document.getElementById('goal'));
            this.myChart[3] = this.$echarts.init(document.getElementById('finish'));

            this.getData();
            this.getCurrentMonth();



            let that = this;
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    that.screenWidth = window.screenWidth;
                })()
            }
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val;
                    this.timer = true;
                    let that = this;
                    setTimeout(function () {
                        // that.screenWidth = that.$store.state.canvasWidth
//                        console.log(that.screenWidth);
                        for (let i = 0 ; i < that.myChart.length ; i++){
                            (function () {
                                that.myChart[i].resize();
                            })(i)
                        }
                        that.timer = false;
                    }, 200)
                }
            }
        },
        methods : {
            getCurrentYear(){
                // 获取当前年份
                this.currentYear = new Date().getFullYear();
            },
            getCurrentMonth(){
                // 获取当前月
                var month = new Date().getMonth()+1;
//                console.log(date.getMonth());
                for (var i = 1 ; i<=month ; i++){
                    this.x.push(i+'月');
                }
            },
            collect(){
                var option = {
                    title : {
                        text: '每月收房套数',
                        //subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.x
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value}套'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'收房套数',
                            type:'line',
                            data:this.collectData,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
//                console.log(this.myChart);
                this.myChart[0].setOption(option);
            },
            renting(){
                var option = {
                    title : {
                        text: '每月租房套数',
                        //subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.x
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value}套'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'收房套数',
                            type:'line',
                            data:this.rentingData,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                this.myChart[1].setOption(option);
            },
            goal(){
                var option = {
                    title : {
                        text: '每月目标业绩',
                        //subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.x
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value}套'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'收房套数',
                            type:'line',
                            data:this.goalData,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                this.myChart[2].setOption(option);
            },
            finish(){
                var option = {
                    title : {
                        text: '每月完成的业绩',
                        //subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.x
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value}套'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'收房套数',
                            type:'line',
                            data:this.finishData,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                this.myChart[3].setOption(option);
            },
            getData(){
                // 过渡---------------------
//                console.log(this.myChart.length);
                var that = this;
                for (let i = 0 ; i < this.myChart.length ; i++){
                    (function () {
                        that.myChart[i].showLoading({
                            text: '正在努力的读取数据中...',    //loading话术
                        });
                    })(i)
                }

                // ajax getting data...............

                this.$http.get('json/chartData.json').then((res) => {
//                    console.log(res.data);
                    for (let i = 0 ; i < that.myChart.length ; i++){
                        (function () {
                            that.myChart[i].hideLoading();
                        })(i)
                    }

                    that.collectData = res.data.data.collect;
//                    console.log(that.collectData);
                    that.rentingData = res.data.data.renting;
                    that.goalData = res.data.data.goal;
                    that.finishData = res.data.data.finish;


                    that.collect();
                    that.renting();
                    that.goal();
                    that.finish();
                })
                // ajax callback
//                this.myChart2.hideLoading();

            }

        }
    }
</script>