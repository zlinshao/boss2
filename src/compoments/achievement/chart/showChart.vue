<template>
    <div class="clearFix">
        <!--<div>this is template body</div>-->
        <div>
            <div class="row">
                <div class="col-lg-6">
                    <section class="panel">
                        <header class="panel-heading">
                            每月收房套数
                        </header>
                        <div class="panel-body text-center">
                            <canvas id="collect" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
                        </div>

                    </section>
                </div>
                <div class="col-lg-6">
                    <section class="panel">
                        <header class="panel-heading">
                            每月租房套数
                        </header>
                        <div class="panel-body text-center">
                            <canvas id="renting" height="300" width="450" style="width: 450px; height: 300px;"></canvas>
                        </div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <section class="panel">
                        <header class="panel-heading">
                            每月收房套数
                        </header>
                        <div class="panel-body text-center">
                            <canvas id="goal" height="300" width="400" style="width: 400px; height: 300px;"></canvas>
                        </div>
                    </section>
                </div>
                <div class="col-lg-6">
                    <section class="panel">
                        <header class="panel-heading">
                            每月租房套数
                        </header>
                        <div class="panel-body text-center">
                            <canvas id="finish" height="300" width="450" style="width: 450px; height: 300px;"></canvas>
                        </div>
                    </section>
                </div>
            </div>


        </div>
    </div>
</template>
<style scoped>
    .charts{
        padding-top: 8px;
        width: 100%;
        height: 90%;
    }
    .panel-heading{
        background-color: #A9D86E;
        color: #333;
        font-weight: 500;
    }
    .panel:hover{
        cursor: pointer;
    }
    .row:nth-child(1){
        margin-top: 20px;
    }

</style>
<script>
    import Chart from '../../../assets/js/Chart.min'
    export default{
        data(){
            return {
                x : []      // 横坐标
            }
        },
        components: {},
        mounted : function () {
            this.collect();
            this.renting();
            this.goal();
            this.finish();
        },
        methods : {
            getCurrentMonth(){
                // 获取当前月
                return(new Date().getMonth()+1);
//                console.log(date.getMonth());
            },
            collect(){
//                每月收房套数
                var ctx = document.getElementById('collect').getContext('2d');
                var month = this.getCurrentMonth();
                for (var i = 1 ; i <= month ; i++){
                    this.x.push(i+'月');
                }
                var data = {

                    labels: this.x,

                    datasets: [{
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(0,102,51,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#339933",
                            pointHighlightFill: "#339933",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [2300, 2000, 3600, 5000, 1520, 6030]
                        }]

                };

                // var salesVolumeChart = new Chart(ctx).Line(data);

                var salesVolumeChart = new Chart(ctx).Line(data, {

                    // 小提示的圆角

                    // tooltipCornerRadius: 0,

                    // 折线的曲线过渡，0是直线，默认0.4是曲线

                    bezierCurveTension: 0,

                    // bezierCurveTension: 0.4,

                    // 关闭曲线功能

                    bezierCurve: false,

                    // 背景表格显示

                    // scaleShowGridLines : false,

                    // 点击的小提示

                    tooltipTemplate: "<%if (label){%><%=label%> 收房：<%}%><%= value %>套",

                    //自定义背景小方格、y轴每个格子的单位、起始坐标

                    scaleOverride: true,

                    scaleSteps: 9.5,

                    // scaleStepWidth: Math.ceil(Math.max.apply(null,data.datasets[0].data) / 0.1),

                    scaleStepWidth: 600,

                    scaleStartValue: 1000

                });
                this.x = [];    // 清空横坐标
            },
            renting(){
//                每月租房套数
                var ctx = document.getElementById('renting').getContext('2d');
                var month = this.getCurrentMonth();
                for (var i = 1 ; i <= month ; i++){
                    this.x.push(i+'月');
                }
                var data = {
                    labels: this.x,
                    datasets: [{
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(0,102,51,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#339933",
                        pointHighlightFill: "#339933",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [2300, 2000, 3600, 5000, 1520, 6030]
                    }]
                };
                var salesVolumeChart = new Chart(ctx).Line(data, {
                    bezierCurveTension: 0,
                    bezierCurve: false,
                    tooltipTemplate: "<%if (label){%><%=label%> 收房：<%}%><%= value %>套",
                    scaleOverride: true,
                    scaleSteps: 9.5,
                    scaleStepWidth: 600,
                    scaleStartValue: 1000

                });
                this.x = [];    // 清空横坐标
            },
            goal(){
//                每月目标业绩
                var ctx = document.getElementById('goal').getContext('2d');
                var month = this.getCurrentMonth();
                for (var i = 1 ; i <= month ; i++){
                    this.x.push(i+'月');
                }
                var data = {
                    labels: this.x,
                    datasets: [{
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(0,102,51,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#339933",
                        pointHighlightFill: "#339933",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [2300, 2000, 3600, 5000, 1520, 6030]
                    }]
                };
                var salesVolumeChart = new Chart(ctx).Line(data, {
                    bezierCurveTension: 0,
                    bezierCurve: false,
                    tooltipTemplate: "<%if (label){%><%=label%> 收房：<%}%><%= value %>套",
                    scaleOverride: true,
                    scaleSteps: 9.5,
                    scaleStepWidth: 600,
                    scaleStartValue: 1000

                });
                this.x = [];    // 清空横坐标
            },
            finish(){
//                每月完成的业绩
                var ctx = document.getElementById('finish').getContext('2d');
                var month = this.getCurrentMonth();
                for (var i = 1 ; i <= month ; i++){
                    this.x.push(i+'月');
                }
                var data = {
                    labels: this.x,
                    datasets: [{
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(0,102,51,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#339933",
                        pointHighlightFill: "#339933",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [2300, 2000, 3600, 5000, 1520, 6030]
                    }]
                };
                var salesVolumeChart = new Chart(ctx).Line(data, {
                    bezierCurveTension: 0,
                    bezierCurve: false,
                    tooltipTemplate: "<%if (label){%><%=label%> 收房：<%}%><%= value %>套",
                    scaleOverride: true,
                    scaleSteps: 9.5,
                    scaleStepWidth: 600,
                    scaleStartValue: 1000

                });
                this.x = [];    // 清空横坐标
            }
        }
    }
</script>