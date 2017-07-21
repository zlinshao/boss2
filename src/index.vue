<template>
    <div>
        <div class="row">
            <div class="col-md-9">
                <section class="panel">
                    <div class="panel-body" style="padding-bottom: 0;">
                        <div class="row">
                            <div class="col-md-12">
                                <section class="panel table-responsive">
                                    <table class="top table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th>简报</th>
                                            <th>新增客户</th>
                                            <th>新增房屋</th>
                                            <th>新增沟通日志</th>
                                            <th>空置房屋</th>
                                            <th>已收房屋</th>
                                            <th>已租房屋</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>南京</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                        </tr>
                                        <tr>
                                            <td>苏州</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-body roll" style="height: 354px;overflow: auto;">
                        <header class="panel-heading">
                            本月寿星
                        </header>
                        <div class="row product-list" style="margin-top: 16px;">
                            <div class="col-xs-6 col-sm-3 col-lg-2" v-for="a in 10">
                                <section class="panel">
                                    <div class="pro-img-box padding15" data-toggle="tooltip" data-placement="bottom"
                                         title="苏州二区—区长">
                                        <img src="./lADPACOG812Jq3XNAoDNAn4_638_640.jpg"
                                             style="border-radius: 50%;"/>
                                    </div>
                                    <div class="panel-body text-center padding15">
                                        <h5>杨乐乐</h5>
                                        <h5>2017-12-12</h5>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="row product-list" style="margin-top: 12px;">
                    <div class="col-md-4">
                        <section class="panel">
                            <div class="panel-body text-center">
                                <!--入住-->
                                <div id="check_in" style="height: 310px;"></div>
                            </div>
                        </section>
                    </div>
                    <div class="col-md-4">
                        <section class="panel">
                            <div class="panel-body text-center">
                                <!--收租-->
                                <div id="collect_rents" style="height: 310px;"></div>
                            </div>
                        </section>
                    </div>
                    <div class="col-md-4">
                        <section class="panel">
                            <div class="panel-body text-center">
                                <!--客户来源-->
                                <div id="custom" style="height: 310px;"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-md-3">

                <section class="panel">
                    <header class="panel-heading">
                        龙虎榜
                    </header>
                    <div class="panel-body" style="padding-top: 0;">
                        <div class="row">
                            <div class="col-md-12">
                                <section class="panel table-responsive">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th>排名</th>
                                            <th>姓名</th>
                                            <th>部门</th>
                                            <th>当月业绩升降</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(a,index) in 10">
                                            <td style="min-width: 60px;">{{index + 1}}</td>
                                            <td style="min-width: 80px;">欧阳琳少</td>
                                            <td style="min-width: 110px;">南京西区一组</td>
                                            <td style="min-width: 110px;">
                                                10000万
                                                <span class="text-danger"><i class="fa fa-arrow-up"></i></span>
                                                <span class="text-success"><i class="fa  fa-arrow-down"></i></span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="panel roll" style="height: 340px;overflow: auto;">
                    <header class="panel-heading">
                        公告
                    </header>
                    <div class="panel-body" style="padding-top: 0;">
                        <div class="row">
                            <div class="col-md-12">
                                <section class="panel table-responsive">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th ref="mybox">时间</th>
                                            <th>标题</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(a,index) in 10">
                                            <td style="min-width: 60px;">2017-07-07</td>
                                            <td style="min-width: 80px;">
                                                <router-link to=""> 《国庆放假》</router-link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                myChart: [],
                check_inData: [],              //入住
                collect_rentsData: [],         //收租
                customData: [],                //客户来源
            }
        },
        mounted (){
            this.home_index ();
            this.myChart[0] = this.$echarts.init(document.getElementById('check_in'));
            this.myChart[1] = this.$echarts.init(document.getElementById('collect_rents'));
            this.myChart[2] = this.$echarts.init(document.getElementById('custom'));
            this.aaaa();
            this.bbbb();
            this.cccc();
        },
        updated (){
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            })
        },
        methods: {
            home_index (){
                this.$http.post('home/index/index').then((res) => {
                    console.log(res.data);
                });
            },
            aaaa (){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                            ]
                        }
                    ]
                };
                this.myChart[0].setOption(option);
            },
            bbbb (){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                            ]
                        }
                    ]
                };
                this.myChart[1].setOption(option);
            },
            cccc (){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                            ]
                        }
                    ]
                };
                this.myChart[2].setOption(option);
            }
        }
    }
</script>


<style scoped>
    .panel > div > div {
        width: 100%;
        margin: auto;
    }

    .top.table > tbody > tr > td {
        border: 0;
    }

    .padding15 {
        padding: 0 15px;
    }

    tr td, tr th {
        text-align: center;
    }

    .roll::-webkit-scrollbar {
        width: 8px;
    }

    .roll::-webkit-scrollbar-button {
        background-color: #ffff;
    }

    .roll::-webkit-scrollbar-track {
        background: #ffffff;
    }

    .roll::-webkit-scrollbar-thumb {
        background: rgba(121, 121, 121, .2);
        border-radius: 10px;
    }
</style>
