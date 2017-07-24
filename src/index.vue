<template>
    <div>
        <div class="row">
            <div class="col-md-9">
                <section class="panel">
                    <div class="panel-body" style="padding-bottom: 0;">
                        <div class="row">
                            <div class="col-md-12">
                                <section class="panel table-responsive roll">
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
                    <div class="panel-body roll" style="height: 337px;overflow: auto;">
                        <header class="panel-heading">
                            本月寿星
                        </header>
                        <div class="row product-list" style="margin-top: 16px;">
                            <div class="col-xs-6 col-sm-3 col-lg-2" v-for="birth in main_birthday">
                                <section class="panel">
                                    <div class="pro-img-box margin10" data-toggle="tooltip" data-placement="bottom"
                                         :title="birth.position">
                                        <img :src="birth.avatar" v-if="birth.avatar !== ''"
                                             style="border-radius: 50%;"/>
                                        <img src="./assets/img/head.png" v-if="birth.avatar === ''"
                                             style="border-radius: 50%;" />
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
                                <section class="panel table-responsive roll">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th>排名</th>
                                            <th>姓名</th>
                                            <th>部门</th>
                                            <!--<th>当月业绩升降</th>-->
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(ran,index) in main_ranking">
                                            <td style="min-width: 60px;">{{index + 1}}</td>
                                            <td style="min-width: 80px;">{{ran.name}}</td>
                                            <td style="min-width: 110px;">{{ran.department}}</td>
                                            <!--<td style="min-width: 110px;">-->
                                                <!--{{ran.money}}-->
                                                <!--<span class="text-danger" v-if="ran.rank_id === 1"><i-->
                                                        <!--class="fa fa-arrow-up"></i></span>-->
                                                <!--<span class="text-success" v-if="ran.rank_id === 2"><i-->
                                                        <!--class="fa  fa-arrow-down"></i></span>-->
                                            <!--</td>-->
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="panel" style="height: 394px;">
                    <header class="panel-heading">
                        公告
                    </header>
                    <div class="panel-body" style="padding-top: 0;">
                        <div class="row">
                            <div class="col-md-12">
                                <section class="panel table-responsive roll">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th ref="mybox">时间</th>
                                            <th>标题</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(mess, index) in main_message">
                                            <td style="min-width: 160px;">{{mess.create_time}}</td>
                                            <td style="min-width: 100px;" class="more_info">
                                                <router-link :to="{path:'/messageCenter',query: {nameId: 'sys_mess'}}">
                                                    {{mess.data.title}}
                                                </router-link>
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
                screenWidth: document.body.clientWidth,      // 页面宽度
//
//                meet_with: '',                  //偶遇
//                network: '',                    //网络
//                recommend: '',                  //客户推荐
//                meet_with: '',                  //偶遇

                select_list: [],                //字典
                bulletin_nanjin: {},            //南京
                bulletin_suzhou: {},            //苏州
                main_birthday: [],              //寿星
                main_ranking: [],               //龙虎榜
                main_message: [],               //公告
                main_customer: [],              //图表
                myChart: [],
                check_inData: [],               //入住
                collect_rentsData: [],          //收租
                customData: [],                 //客户来源
            }
        },
        mounted (){
            this.myChart[0] = this.$echarts.init(document.getElementById('check_in'));
            this.myChart[1] = this.$echarts.init(document.getElementById('collect_rents'));
            this.myChart[2] = this.$echarts.init(document.getElementById('custom'));

            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    this.screenWidth = window.screenWidth;
                })()
            }
        },
        updated (){
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            })
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
        created (){
            this.home_index();
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
                        this.main_message = res.data.data.message;                      //公告
                        this.check_inData = res.data.data.uprate;                       //入住率
                        this.collect_rentsData = res.data.data.collect_rent;            //收房比列
                        this.main_customer = res.data.data.customer;                    //客户来源

                        this.check();
                        this.collect();
                        this.customer();
                    });
                });
            },
            check (){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['已租', '空置']
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
                                {value: this.check_inData.rent, name: '已租'},
                                {value: this.check_inData.vacancy, name: '空置'},
                            ]
                        }
                    ]
                };
                this.myChart[0].setOption(option);
            },
            collect (){
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
                                {value: this.collect_rentsData.received, name: '收房'},
                                {value: this.collect_rentsData.rent, name: '租房'},
                            ]
                        }
                    ]
                };
                this.myChart[1].setOption(option);
            },
            customer (){
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
                                {value: this.main_customer.wl, name: '网络'},
                                {value: this.main_customer.khtj, name: '客户推荐'},
                                {value: this.main_customer.oy, name: '偶遇'},
                                {value: this.main_customer.zj, name: '中介'},
                            ]
                        }
                    ]
                };
                this.myChart[2].setOption(option);
            },
            getData(){
                // 过渡---------------------
//
                for (let i = 0; i < this.myChart.length; i++) {
                    (() => {
                        this.myChart[i].showLoading({
                            text: '正在努力的读取数据中...',    //loading话术
                        });
                    })(i)
                }
            }
        }
    }
</script>


<style scoped>
    .panel > div > div {
        width: 100%;
        margin: auto;
    }

    .more_info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer
    }

    .top.table > tbody > tr > td {
        border: 0;
    }

    .padding15 {
        padding: 0 15px;
    }
    .margin10 {
        width: 70px;
        height: 70px;
        margin: 10px auto 0;
    }

    tr td, tr th {
        text-align: center;
    }

    .roll::-webkit-scrollbar {
        width: 8px;
        height: 8px;
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
