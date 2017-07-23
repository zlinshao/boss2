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
                                            <td>{{bulletin_nanjin.client}}</td>
                                            <td>{{bulletin_nanjin.house}}</td>
                                            <td>{{bulletin_nanjin.log}}</td>
                                            <td>{{bulletin_nanjin.vacancy}}</td>
                                            <td>{{bulletin_nanjin.received}}</td>
                                            <td>{{bulletin_nanjin.rent}}</td>
                                        </tr>
                                        <tr>
                                            <td>苏州</td>
                                            <td>{{bulletin_suzhou.client}}</td>
                                            <td>{{bulletin_suzhou.house}}</td>
                                            <td>{{bulletin_suzhou.log}}</td>
                                            <td>{{bulletin_suzhou.vacancy}}</td>
                                            <td>{{bulletin_suzhou.received}}</td>
                                            <td>{{bulletin_suzhou.rent}}</td>
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
                            <div class="col-xs-6 col-sm-3 col-lg-2" v-for="birth in main_birthday">
                                <section class="panel">
                                    <div class="pro-img-box padding15" data-toggle="tooltip" data-placement="bottom"
                                         :title="birth.position">
                                        <img src="./lADPACOG812Jq3XNAoDNAn4_638_640.jpg"
                                             style="border-radius: 50%;"/>
                                    </div>
                                    <div class="panel-body text-center padding15">
                                        <h5>{{birth.name}}</h5>
                                        <h5>{{birth.birthday}}</h5>
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
                                <h3>入住率</h3>
                                <div id="check_in" style="height: 310px;"></div>
                            </div>
                        </section>
                    </div>
                    <div class="col-md-4">
                        <section class="panel">
                            <div class="panel-body text-center">
                                <!--收租-->
                                <h3>收房比例</h3>
                                <div id="collect_rents" style="height: 310px;"></div>
                            </div>
                        </section>
                    </div>
                    <div class="col-md-4">
                        <section class="panel">
                            <div class="panel-body text-center">
                                <!--客户来源-->
                                <h3>客户来源</h3>
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
                                        <tr v-for="(ran,index) in main_ranking">
                                            <td style="min-width: 60px;">{{index + 1}}</td>
                                            <td style="min-width: 80px;">{{ran.name}}</td>
                                            <td style="min-width: 110px;">{{ran.department}}</td>
                                            <td style="min-width: 110px;">
                                                {{ran.money}}
                                                <span class="text-danger" v-if="ran.rank_id === 1"><i class="fa fa-arrow-up"></i></span>
                                                <span class="text-success" v-if="ran.rank_id === 2"><i class="fa  fa-arrow-down"></i></span>
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
                select_list: [],                //字典
                bulletin_nanjin: {},            //南京
                bulletin_suzhou: {},            //苏州
                main_birthday: [],              //寿星
                main_ranking: [],               //龙虎榜
                main_customer: [],              //图表
                myChart: [],
                check_inData: [],               //入住
                collect_rentsData: [],          //收租
                customData: [],                 //客户来源
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
//                字典
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;

                    this.$http.post('home/index/index').then((res) => {
                        this.bulletin_nanjin = res.data.data.bulletin.nanjin;           //简报
                        this.bulletin_suzhou = res.data.data.bulletin.suzhou;           //简报
                        this.main_birthday = res.data.data.birthday;                    //寿星
                        this.main_ranking = res.data.data.ranking;                      //龙虎榜
                        this.main_customer = res.data.data.customer;                    //charts
                    });
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
                        data: ['已收', '空置']
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
                                        fontWeight: 'bold',
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '已收'},
                                {value: 310, name: '空置'},
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
                        data: ['收房', '租房']
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
                                {value: 335, name: '收房'},
                                {value: 310, name: '租房'},
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
                        data: ['网络', '客户推荐', '偶遇', '中介']
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
                                {value: 335, name: '网络'},
                                {value: 310, name: '客户推荐'},
                                {value: 234, name: '偶遇'},
                                {value: 135, name: '中介'},
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
