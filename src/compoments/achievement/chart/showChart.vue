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
                myChart1 : '',
                mtChart2 : '',
                mtChart3 : '',
                mtChart4 : ''
            }
        },
        components: {},
        created : function () {
            console.log(macarons);

        },
        mounted : function () {
            this.myChart1 = this.$echarts.init(document.getElementById('collect'),shine);
            this.myChart2 = this.$echarts.init(document.getElementById('renting'));
            this.myChart3 = this.$echarts.init(document.getElementById('goal'),macarons);
            this.myChart4 = this.$echarts.init(document.getElementById('finish'),macarons);

            this.getCurrentMonth();
            this.collect();
            this.renting();
            this.goal();
            this.finish();
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
                        that.myChart1.resize();
                        that.myChart2.resize();
                        that.myChart3.resize();
                        that.myChart4.resize();
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
                // 过渡---------------------
                this.myChart1.showLoading({
                    text: '正在努力的读取数据中...',    //loading话术
                });
                // ajax getting data...............

                // ajax callback
                this.myChart1.hideLoading();

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
                            data:[6, 11, 15, 13, 25, 13],
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
                this.myChart1.setOption(option);
            },
            renting(){
                // 过渡---------------------
                this.myChart2.showLoading({
                    text: '正在努力的读取数据中...',    //loading话术
                });
                // ajax getting data...............

                // ajax callback
                this.myChart2.hideLoading();

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
                            data:[6, 11, 15, 13, 25, 13],
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
                this.myChart2.setOption(option);
            },
            goal(){
                // 过渡---------------------
                this.myChart3.showLoading({
                    text: '正在努力的读取数据中...',    //loading话术
                });
                // ajax getting data...............

                // ajax callback
                this.myChart3.hideLoading();

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
                            data:[6, 11, 15, 13, 25, 13],
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
                this.myChart3.setOption(option);
            },
            finish(){
                // 过渡---------------------
                this.myChart4.showLoading({
                    text: '正在努力的读取数据中...',    //loading话术
                });
                // ajax getting data...............

                // ajax callback
                this.myChart4.hideLoading();

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
                            data:[6, 11, 15, 13, 25, 13],
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
                this.myChart4.setOption(option);
            },

        }
    }
</script>