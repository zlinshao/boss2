<template>
    <div>

        <div class="row">
            <div class="col-md-9">
                <section class="panel">
                    <div class="panel-body">
                        <a class="btn">快捷入口：</a>
                        <router-link class="btn btn-link" to="/custom">客户</router-link>  <!--客户-->
                        <router-link class="btn btn-link" to="/customerPool">客户池</router-link>  <!--客户池-->
                        <router-link class="btn btn-link" to="/OkCollect">公司房源</router-link>  <!--公司房源-->
                        <router-link class="btn btn-link" to="/noCollect">待收房源</router-link>  <!--待收房源-->
                        <router-link class="btn btn-link" to="/reportedRenting">租房报备</router-link>  <!--租房报备-->
                        <router-link class="btn btn-link" to="/reportedCollect">收房报备</router-link>  <!--收房报备-->
                        <router-link class="btn btn-link" to="/user">员工管理</router-link>  <!--用户管理-->
                        <router-link class="btn btn-link" to="/periodicForGcompany">公司业绩</router-link>  <!--公司业绩-->
                        <router-link class="btn btn-link" to="/periodicForGroup">小组业绩</router-link>  <!--小组业绩-->
                        <router-link class="btn btn-link" to="/periodicForPeople">个人业绩</router-link>  <!--个人业绩-->
                        <router-link class="btn btn-link" to="/leadingOut">客户导出</router-link>  <!--客户导出-->
                        <router-link class="btn btn-link" to="/messageCenter">消息中心</router-link>  <!--消息中心-->
                    </div>
                </section>
                <!--<section class="panel">-->
                <!--<div class="panel-body" style="padding-bottom: 0;">-->
                <!--<div class="row">-->
                <!--<div class="col-md-12">-->
                <!--<section class="panel table-responsive roll">-->
                <!--<table class="top table table-advance table-hover">-->
                <!--<thead>-->
                <!--<tr>-->
                <!--<th class="bor0">简报</th>-->
                <!--<th class="bor0">新增客户</th>-->
                <!--<th class="bor0">新增房屋</th>-->
                <!--<th class="bor0">新增沟通日志</th>-->
                <!--<th class="bor0">空置房屋</th>-->
                <!--<th class="bor0">已收房屋</th>-->
                <!--<th class="bor0">已租房屋</th>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<th class="top0"></th>-->
                <!--<th class="top0">{{bulletin_nanjin.client + bulletin_suzhou.client}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.house + bulletin_suzhou.house}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.log + bulletin_suzhou.log}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.vacancy + bulletin_suzhou.vacancy}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.received + bulletin_suzhou.received}}</th>-->
                <!--<th class="top0">{{bulletin_nanjin.rent + bulletin_suzhou.rent}}</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr>-->
                <!--<td>南京</td>-->
                <!--<td>{{bulletin_nanjin.client}}</td>-->
                <!--<td>{{bulletin_nanjin.house}}</td>-->
                <!--<td>{{bulletin_nanjin.log}}</td>-->
                <!--<td>{{bulletin_nanjin.vacancy}}</td>-->
                <!--<td>{{bulletin_nanjin.received}}</td>-->
                <!--<td>{{bulletin_nanjin.rent}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<td>苏州</td>-->
                <!--<td>{{bulletin_suzhou.client}}</td>-->
                <!--<td>{{bulletin_suzhou.house}}</td>-->
                <!--<td>{{bulletin_suzhou.log}}</td>-->
                <!--<td>{{bulletin_suzhou.vacancy}}</td>-->
                <!--<td>{{bulletin_suzhou.received}}</td>-->
                <!--<td>{{bulletin_suzhou.rent}}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
                <!--</table>-->
                <!--</section>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</section>-->
                <section class="panel">
                    <div class="panel-body">
                        <header class="panel-heading">
                            系统公告
                        </header>
                        <div class="table table-responsive roll">
                            <!--系统公告-->
                            <table class="table table-advance table-hover">
                                <thead class="text-center">
                                <tr>
                                    <th class="text-center">发布时间</th>
                                    <th class="text-center">发布人</th>
                                    <th class="text-center">标题</th>
                                    <th class="text-center">主要内容</th>
                                    <th class="text-center">阅读时间</th>
                                    <th class="text-center">收藏</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="unread" v-for="sys in systems" @click="receive(sys.id, sys.read_time)">
                                    <td class="text-center width180">{{sys.message.create_time}}</td>
                                    <td class="text-center width80">{{sys.message.release_name}}</td>
                                    <td class="text-center width180">{{sys.message.data.title}}</td>
                                    <td class="text-center"
                                        :class="{ more_info: isActive !== sys.id, phone: isActive === sys.id }"
                                        @click="more_content(sys.id)">
                                        {{sys.message.data.content}}
                                    </td>
                                    <td class="text-center width180">{{sys.read_time}}</td>
                                    <td class="text-center width60">
                                        <i class="fa fa-folder"
                                           v-if="sys.read_time === '未读'"></i>
                                        <i class="fa fa-folder-open-o" v-if="sys.read_time != '未读'"></i>

                                        <i class="fa fa-heart" v-if="sys.favourite_status === '已收藏'"
                                           @click.stop="isCollect(sys.mess_id)"
                                           style="color: #e4393c"></i>
                                        <i class="fa fa-heart-o" v-if="sys.favourite_status === '未收藏'"
                                           @click.stop="isCollect(sys.mess_id)"></i>
                                    </td>
                                </tr>
                                <tr v-show="isSystem_s">
                                    <td colspan="6" class="text-center text-muted">
                                        <h4>暂无数据....</h4>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-body">
                        <header class="panel-heading">
                            本月寿星
                            <router-link v-if="main_birthday.length > 6" to="/user" class="pull-right">更多&gt;&gt;
                            </router-link>
                        </header>
                        <div class="row product-list" style="margin-top: 16px;">
                            <div class="col-xs-6 col-sm-3 col-lg-2" v-for="(birth,index) in main_birthday">
                                <section class="panel" v-show="index < 6">
                                    <div class="pro-img-box margin10" style="max-height: 70px;"
                                         :title="birth.position">
                                        <img :src="birth.avatar" v-if="birth.avatar !== ''"
                                             style="border-radius: 50%;height: 100%;"/>
                                        <img src="./assets/img/head.png" v-if="birth.avatar === ''"
                                             style="border-radius: 50%;height: 100%;"/>
                                    </div>
                                    <div class="panel-body text-center padding15">
                                        <h5>{{birth.position}}</h5>
                                        <h5>{{birth.name}}</h5>
                                    </div>
                                </section>
                            </div>
                            <div class="col-xs-12" v-if="main_birthday.length === 0">
                                <section class="panel text-center" style="margin-bottom: 0;font-size: 16px;">
                                    本月暂无寿星
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <!--<div class="row product-list" style="margin-top: 12px;">-->
                <!--<div class="col-md-4">-->
                <!--<section class="panel">-->
                <!--<div class="panel-body text-center">-->
                <!--&lt;!&ndash;入住&ndash;&gt;-->
                <!--<h3>入住率</h3>-->
                <!--<div id="check_in" style="height: 310px;"></div>-->
                <!--</div>-->
                <!--</section>-->
                <!--</div>-->
                <!--<div class="col-md-4">-->
                <!--<section class="panel">-->
                <!--<div class="panel-body text-center">-->
                <!--&lt;!&ndash;收租&ndash;&gt;-->
                <!--<h3>收房比例</h3>-->
                <!--<div id="collect_rents" style="height: 310px;"></div>-->
                <!--</div>-->
                <!--</section>-->
                <!--</div>-->
                <!--<div class="col-md-4">-->
                <!--<section class="panel">-->
                <!--<div class="panel-body text-center">-->
                <!--&lt;!&ndash;客户来源&ndash;&gt;-->
                <!--<h3>客户来源</h3>-->
                <!--<div id="custom" style="height: 310px;"></div>-->
                <!--</div>-->
                <!--</section>-->
                <!--</div>-->
                <!--</div>-->
            </div>

            <div class="col-md-3">
                <!--在线人数-->
                <section class="panel">
                    <header class="panel-heading">
                        在线人数

                        <a style="font-size: 12px;color: #000" class="pull-right" @click="click_more" v-if="mores > 9 && more_status">
                            展开({{allLine}})
                        </a>
                        <a style="font-size: 12px;color: #000" class="pull-right" @click="click_more" v-if="mores > 9 && !more_status">
                            收起({{allLine}})
                        </a>
                    </header>
                    <div class="panel-body" style="padding-top: 0;padding-bottom: 0;">
                        <div class="row">
                            <div class="col-md-12" style="padding: 0;">
                                <section class="panel table-responsive roll" style="height: 580px; overflow: auto">
                                    <table class="table table-advance table-hover" id="panel">
                                        <thead>
                                        <tr>
                                            <th>姓名</th>
                                            <th>部门</th>
                                            <th>操作时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(line, index) in onlines" v-if="index < more">
                                            <td  class="width120" style="text-align: left;">
                                                <img src="./assets/img/head.png" v-if="line.avatar === ''"
                                                     style="width: 35px;height: 35px;border-radius:50%;"/>

                                                <img :src="line.avatar" alt="" v-if="line.avatar != ''"
                                                     style="width: 35px;height: 35px;border-radius:50%;">
                                                {{line.real_name}}
                                            </td>
                                            <td class="width80">{{line.department_name}}</td>
                                            <td class="width100">{{line.operating_time}}</td>
                                        </tr>
                                        <tr v-show="onlines.length === 0">
                                            <td colspan="7" class="text-center text-muted">
                                                <h4>暂无数据....</h4>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <!--龙虎榜-->
                <section class="panel">
                    <header class="panel-heading">
                        龙虎榜
                    </header>
                    <div class="panel-body" style="padding-top: 0;">
                        <div class="row">
                            <div class="col-md-12" style="padding: 0;">
                                <section class="panel table-responsive roll">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th>排名</th>
                                            <th>姓名</th>
                                            <th>部门</th>
                                            <th>当月业绩</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <!--<tr v-for="(ran, index) in main_ranking">-->
                                        <!--<td style="min-width: 60px;">{{index + 1}}</td>-->
                                        <!--<td style="min-width: 80px;">{{ran.name}}</td>-->
                                        <!--<td style="min-width: 110px;">{{ran.department}}</td>-->
                                        <!--<td style="min-width: 100px;">-->
                                        <!--{{ran.money}}-->
                                        <!--&lt;!&ndash;<span class="text-danger" v-if="ran.rank_id === 1"><i&ndash;&gt;-->
                                        <!--&lt;!&ndash;class="fa fa-arrow-up"></i></span>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<span class="text-success" v-if="ran.rank_id === 2"><i&ndash;&gt;-->
                                        <!--&lt;!&ndash;class="fa  fa-arrow-down"></i></span>&ndash;&gt;-->
                                        <!--</td>-->
                                        <!--</tr>-->
                                        <tr v-show="main_ranking.length === 0">
                                            <td colspan="7" class="text-center text-muted">
                                                <h4>暂无数据....</h4>
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
        <Question :questionId = 'questionId' @success="successVote"></Question>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Question from './compoments/questionnaire/questionnaire.vue'
    import Status from './compoments/common/status.vue'
    export default {
        components : {Question,Status},
        data (){
            return {
                more: 9,
                mores: '',
                more_status: true,
                onlines: [],
                allLine: '',
//                screenWidth: document.body.clientWidth,      // 页面宽度
                systems: [],                    //公告
                isSystem_s: false,
                isActive: -1,

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
                questionId : '',
                info: {
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
//        mounted (){
//            this.myChart[0] = this.$echarts.init(document.getElementById('check_in'));
//            this.myChart[1] = this.$echarts.init(document.getElementById('collect_rents'));
//            this.myChart[2] = this.$echarts.init(document.getElementById('custom'));
//
//            window.onresize = () => {
//                return (() => {
//                    window.screenWidth = document.body.clientWidth;
//                    this.screenWidth = window.screenWidth;
//                })()
//            }
//        },
//        watch: {
//            screenWidth (val) {
//                if (!this.timer) {
//                    this.screenWidth = val;
//                    this.timer = true;
////                    let that = this;
//                    setTimeout(() => {
//                        // that.screenWidth = that.$store.state.canvasWidth
////                        console.log(that.screenWidth);
//                        for (let i = 0; i < this.myChart.length; i++) {
//                            (() => {
//                                this.myChart[i].resize();
//                            })(i)
//                        }
//                        this.timer = false;
//                    }, 200)
//                }
//            }
//        },
        mounted (){
            this.isDone();
            this.home_index();
            this.home_system();
            this.online();
        },
        methods: {
            isDone(){
                this.$http.get('index/Mission/checkIsWrite').then((res) => {
                    if(res.data.code === '30080'){
                        this.questionId = res.data.data;
                        $('.questionnaire').modal('show');
                    }
                })
            },
            successVote(val){
                this.info.success = val;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
//            更多
            click_more (){
                $('#panel').scroll();
                if(this.more === 9){
                    this.more = this.mores;
                }else{
                    this.more = 9;
                }
                this.more_status = !this.more_status
            },
//            详细内容
            more_content (val){
                this.isActive = val;
            },
//            在线人数
            online (){
                this.$http.post('clock/memo/member').then((res) => {
                    this.onlines = res.data.data.data;
                    this.mores = res.data.data.data.length;
                    this.allLine = res.data.data.count;
                });
            },
//            系统公告
            home_system (){
                this.$http.post('message/system/index/pages/1').then((res) => {
                    if (res.data.code === '100000') {
                        this.systems = res.data.data.list;
                        this.isSystem_s = false;
                    } else {
                        this.isSystem_s = true;
                    }
                });
            },
//            阅读公告
            isCollect(val,){
                this.$http.post('message/message/favourite', {
                    mess_id: val
                }).then((res) => {
                    if (res.data.code === '100054' || res.data.code === '100052') {
                        this.home_system()
                    }
                });
            },
//            已读
            receive (val, read){
                if (read === '未读') {
                    this.$http.post('message/message/read_mess', {
                        id: val,
                    }).then(() => {
                        this.home_system();
                    });
                }
            },
            home_index (){
//                字典
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;

                    this.$http.post('home/index/index').then((res) => {
//                        this.bulletin_nanjin = res.data.data.bulletin.nanjin;           //简报南京
//                        this.bulletin_suzhou = res.data.data.bulletin.suzhou;           //简报苏州
                        this.main_birthday = res.data.data.birthday;                    //寿星
//                        this.main_ranking = res.data.data.ranking;                      //龙虎榜
//                        this.check_inData = res.data.data.uprate;                       //入住率
//                        this.collect_rentsData = res.data.data.collect_rent;            //收房比列
//                        this.main_customer = res.data.data.customer;                    //客户来源

//                        this.check();
//                        this.collect();
//                        this.customer();
                    });
                });
            },
//            check (){
//                let option = {
//                    tooltip: {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
//                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['已租', '空置']
//                    },
//                    series: [
//                        {
//                            name: '访问来源',
//                            type: 'pie',
//                            radius: ['50%', '70%'],
//                            avoidLabelOverlap: false,
//                            label: {
//                                normal: {
//                                    show: false,
//                                    position: 'center'
//                                },
//                                emphasis: {
//                                    show: true,
//                                    textStyle: {
//                                        fontSize: '20',
//                                        fontWeight: 'bold',
//                                    }
//                                }
//                            },
//                            labelLine: {
//                                normal: {
//                                    show: false
//                                }
//                            },
//                            data: [
//                                {value: this.check_inData.rent, name: '已租'},
//                                {value: this.check_inData.vacancy, name: '空置'},
//                            ]
//                        }
//                    ]
//                };
//                this.myChart[0].setOption(option);
//            },
//            collect (){
//                let option = {
//                    tooltip: {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
//                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['收房', '租房']
//                    },
//                    series: [
//                        {
//                            name: '访问来源',
//                            type: 'pie',
//                            radius: ['50%', '70%'],
//                            avoidLabelOverlap: false,
//                            label: {
//                                normal: {
//                                    show: false,
//                                    position: 'center'
//                                },
//                                emphasis: {
//                                    show: true,
//                                    textStyle: {
//                                        fontSize: '20',
//                                        fontWeight: 'bold'
//                                    }
//                                }
//                            },
//                            labelLine: {
//                                normal: {
//                                    show: false
//                                }
//                            },
//                            data: [
//                                {value: this.collect_rentsData.received, name: '收房'},
//                                {value: this.collect_rentsData.rent, name: '租房'},
//                            ]
//                        }
//                    ]
//                };
//                this.myChart[1].setOption(option);
//            },
//            customer (){
//                let option = {
//                    tooltip: {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b}: {c} ({d}%)"
//                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['网络', '客户推荐', '偶遇', '中介']
//                    },
//                    series: [
//                        {
//                            name: '访问来源',
//                            type: 'pie',
//                            radius: ['50%', '70%'],
//                            avoidLabelOverlap: false,
//                            label: {
//                                normal: {
//                                    show: false,
//                                    position: 'center'
//                                },
//                                emphasis: {
//                                    show: true,
//                                    textStyle: {
//                                        fontSize: '20',
//                                        fontWeight: 'bold'
//                                    }
//                                }
//                            },
//                            labelLine: {
//                                normal: {
//                                    show: false
//                                }
//                            },
//                            data: [
//                                {value: this.main_customer.wl, name: '网络'},
//                                {value: this.main_customer.khtj, name: '客户推荐'},
//                                {value: this.main_customer.oy, name: '偶遇'},
//                                {value: this.main_customer.zj, name: '中介'},
//                            ]
//                        }
//                    ]
//                };
//                this.myChart[2].setOption(option);
//            },
//            getData(){
//                for (let i = 0; i < this.myChart.length; i++) {
//                    (() => {
//                        this.myChart[i].showLoading({
//                            text: '正在努力的读取数据中...',    //loading话术
//                        });
//                    })(i)
//                }
//            }
        }
    }
</script>


<style scoped>
    .bor0 {
        border: 0;
    }

    .top0 {
        font-weight: normal;
        border-top: 0;
    }

    .panel > div > div {
        width: 100%;
        margin: auto;
    }

    @media screen and (max-width: 767px) {
        .table.table-responsive > .table > tbody > tr > td.phone {
            min-width: 360px;
            max-width: 466px;
            white-space: normal;
            word-wrap: break-word;
        }
    }

    .more_info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 300px;
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

    .width60 {
        min-width: 60px;
    }

    .width80 {
        min-width: 80px;
    }

    .width180 {
        min-width: 180px;
    }
</style>
