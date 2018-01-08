<template>
    <div id="content">
        <div class="modal fade" id="meetingAdd" role="dialog" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-body">
                        <h3 style="font-weight: bold;text-align: center;margin-top: 40px;margin-bottom: 15px">
                            {{detailInfo.title}}
                        </h3>
                        <h5 style="text-align: center;color: #0ea1d8;">请扫描签到</h5>
                        <div class="erWeiMa">
                            <div style="width: 240px; height:240px;background: #efefef;padding:10px">
                                <img style="width: 220px;height: 220px" :src="detailInfo.qrcode_pic_url">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mainContent row" style="margin: 0">
            <!--名片-->
            <div class='visiting_card'>
                <div class="card_top"></div>
                <div class="card_head">
                    <img v-if="signInfo.staff_avatar" :src="signInfo.staff_avatar">
                    <img v-else="" src="../../assets/img/head.png">
                </div>
                <div class="staff_info">
                    <span style="color: #84bfc6">{{signInfo.staff_name}}</span> · <span
                        style="color: #fd8b9e">{{signInfo.staff_position}}</span>
                </div>

                <div class="attendance_info">
                    <div class="department">
                        <div>{{signInfo.staff_department}}</div>
                        <p>{{signInfo.staff_position}}</p>
                    </div>
                    <div class="seat">
                        <div>{{signInfo.seat_number}}</div>
                        <p>座位号</p>
                    </div>
                    <div class="time">
                        <div>{{signInfo.qrcode_time}}</div>
                        <p>签到时间</p>
                    </div>
                </div>
            </div>

            <div  class="content_right" :class="actual_num? 'col-lg-9':'col-lg-12'">
                <!--nav-->
                <div class="nav">
                    <div class="row">
                        <div class="col-lg-2" style="width: 265px;">

                        </div>
                        <div class="col-lg-5">
                            <h4 style="margin-top: 30px;font-weight: 600">企业文化</h4>
                            <div class="slogan">
                                <div class="border_1"></div>
                                <div>
                                    <h5>尊重个性而不迁就个性；&nbsp;坚持团队精神而达到目的；</h5>
                                    <h5>为集体创造价值；&nbsp;为员工创造机会；&nbsp;追求集体和个人共同进步。</h5>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-4">
                            <h4 style="margin-top: 30px;font-weight: 600">企业价值观</h4>
                            <div class="slogan">
                                <div class="border_1"></div>
                                <div>
                                    <h5>自信、 责任、 正直、 热血、 高效、 创新</h5>
                                    <h5>分享、&nbsp;执着。</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2" style="width: 265px"></div>
                        <div class="col-lg-5">
                            <h4 style="margin-top: 30px;font-weight: 600">企业使命</h4>
                            <div class="slogan">
                                <div class="border_1"></div>
                                <div>
                                    <h5>聚焦客户、&nbsp;立足市场、&nbsp;提供专业租赁服务。</h5>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-4">
                            <h4 style="margin-top: 30px;font-weight: 600">企业愿景</h4>
                            <div class="slogan">
                                <div class="border_1"></div>
                                <div>
                                    <h5>打造中国最具竞争力的公寓运营商。</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!--主体-->
                <div class="content_right_middle">
                    <div class="two-dimension_code" v-if="unActual_num&&!starCount">
                        <div style="padding: 10px">
                            <img style="width: 230px;height: 230px" :src="detailInfo.qrcode_pic_url" alt="">
                        </div>
                    </div>
                    <div class="content_right_middle_right">
                        <h4 style="padding: 0 15px;font-size: 24px">
                            <span style="margin-right: 10px">{{detailInfo.start_time}}</span>
                            <span>{{detailInfo.title}}</span>
                            <span class="pull-right" v-if="!isStart && !isFinish && !noStart">
                                <span>倒计时</span>
                                <span style="color: #fc647d;">
                                    <span v-if="hour<10">0</span>{{hour}}:<span
                                        v-if="minute<10">0</span>{{minute}}:<span v-if="second<10">0</span>{{second}}
                                </span>
                            </span>
                            <span class="pull-right" v-if="isStart">
                                <span style="color: #fc647d;">
                                    会议已开始
                                </span>
                            </span>
                            <span class="pull-right" v-if="isFinish">
                                <span style="color: #fc647d;">
                                    已结束
                                </span>
                            </span>
                            <span class="pull-right" v-if="noStart">
                                <span style="color: #fc647d;">
                                    倒计时未开始
                                </span>
                            </span>
                        </h4>
                        <p style="padding: 0 15px;font-size: 12px">乐伽商业管理有限公司</p>

                        <div class="meetingDetail">
                            <div>
                                <div>会议类型</div>
                                <div v-if="detailInfo.type">
                                    {{dictionary.type[detailInfo.type]}}
                                </div>
                            </div>
                            <div>
                                <div>主持人</div>
                                <div>{{detailInfo.compere_name}}</div>
                            </div>
                            <div>
                                <div>会议记录</div>
                                <div>{{detailInfo.recorder_name}}</div>
                            </div>
                            <div>
                                <div>应到人数</div>
                                <div v-if="detailInfo.attendee">{{detailInfo.attendee.length}}</div>
                            </div>
                            <div>
                                <div>实到人数</div>
                                <div>{{actual_num}}</div>
                            </div>
                            <div>
                                <div>未到人数</div>
                                <div>{{unActual_num}}</div>
                            </div>
                        </div>
                        <div class="lead">

                            <p style="padding:0 15px;font-size: 14px;color: #999;">与会领导</p>
                            <div class="lead_item" v-for="item in detailInfo.attendee" v-if="item.is_leader == 1">
                                <div>
                                    <div class="lead_item_head">
                                        <img v-if="item.staff_avatar" :src="item.staff_avatar" :class="item.qrcode_time?'':'gray'">
                                        <img v-else="" src="../../assets/img/head.png" :class="item.qrcode_time?'':'gray'">
                                    </div>
                                    <div class="lead_item_name">
                                        <h5 style="color: #333">{{item.staff_name}}</h5>
                                    </div>
                                    <div class="lead_item_department">
                                        <h5>{{item.staff_department}} - {{item.staff_position}}</h5>
                                    </div>
                                    <div class="lead_item_time">
                                        <h5 style="color: #333">
                                            <span v-if="item.qrcode_time">{{item.qrcode_time}}</span>
                                            <span v-else>未签到</span>
                                        </h5>
                                    </div>
                                    <div class="corner"></div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div class="unAttendance">
                    <h4 style="margin-top: 50px;font-weight: 600">未签到人员</h4>
                    <div style="border: 1px solid #eee"></div>
                    <div class="unAttendance_item_group scroll_bar">
                        <div class="unAttendance_item" v-for="item in detailInfo.attendee" v-if="!item.qrcode_time">
                            <div class="unAttendance_header">
                                <img v-if="item.staff_avatar" :src="item.staff_avatar" class="gray">
                                <img v-else="" src="../../assets/img/head.png" class="gray">
                            </div>
                            <div class="attendance_content">
                                <h5 style="margin-bottom: 13px;margin-top: 7px;font-weight: bold;color: #333">
                                    <span>{{item.staff_name}}</span>
                                </h5>
                                <div>
                                    <span>{{item.staff_department}} - {{item.staff_position}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--right-->
            <div class="content_left col-lg-3" v-if="actual_num">
                <h4 class="leJia" style="margin-top: 20px;font-weight: 600">乐伽签到榜</h4>
                <h5 style="text-align: center" v-if="signList.length<1">暂无数据...</h5>
                <div class="attendance first" v-if="signList.length>0">
                    <div class="attendance_header">
                        <div>
                            <img v-if="signList[0].staff_avatar" :src="signList[0].staff_avatar">
                            <img v-else="" src="../../assets/img/head.png">
                            <div class="shadow"></div>
                        </div>

                    </div>
                    <div class="attendance_content">
                        <h5 style="margin-bottom: 15px;margin-top: 5px;font-weight: bold;color: #333">
                            <span>{{signList[0].staff_name}}</span> <span style="color: gold;margin-left: 10px">1</span>
                            <span class="pull-right" style="color: gold">{{signList[0].qrcode_time}}</span>
                        </h5>
                        <div>
                            <span> <span>{{signList[0].staff_department}} - {{signList[0].staff_position}}</span></span>
                            <span class="pull-right">座位号&nbsp;
                                <span v-if="signList[0].seat_number">{{signList[0].seat_number}}</span>
                                <span v-else>暂无</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="attendance second" v-if="signList.length>1">
                    <div class="attendance_header">
                        <div>
                            <img v-if="signList[1].staff_avatar" :src="signList[1].staff_avatar">
                            <img v-else="" src="../../assets/img/head.png">
                            <div class="shadow"></div>
                        </div>
                    </div>
                    <div class="attendance_content">
                        <h5 style="margin-bottom: 15px;margin-top: 5px;font-weight: bold;color: #333">
                            <span>{{signList[1].staff_name}}</span> <span
                                style="color: #fc647d;margin-left: 10px">2</span>
                            <span class="pull-right" style="color: #fc647d">{{signList[1].qrcode_time}}</span>
                        </h5>
                        <div>
                            <span><span> <span>{{signList[1].staff_department}} - {{signList[1].staff_position}}</span></span></span>
                            <span class="pull-right">座位号&nbsp;
                                <span v-if="signList[1].seat_number">{{signList[1].seat_number}}</span>
                                <span v-else>暂无</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="attendance third" v-if="signList.length>2">
                    <div class="attendance_header">
                        <div>
                            <img v-if="signList[1].staff_avatar" :src="signList[2].staff_avatar">
                            <img v-else="" src="../../assets/img/head.png">
                            <div class="shadow "></div>
                        </div>
                    </div>
                    <div class="attendance_content">
                        <h5 style="margin-bottom: 15px;margin-top: 5px;font-weight: bold;color: #333">
                            <span>{{signList[2].staff_name}}</span> <span
                                style="color: #48a6b1;margin-left: 10px">3</span>
                            <span class="pull-right" style="color: #48a6b1">{{signList[2].qrcode_time}}</span>
                        </h5>
                        <div>
                            <span><span> <span>{{signList[2].staff_department}} - {{signList[2].staff_position}}</span></span></span>
                            <span class="pull-right">座位号&nbsp;
                                <span v-if="signList[2].seat_number">{{signList[2].seat_number}}</span>
                                <span v-else>暂无</span>
                            </span>
                        </div>
                    </div>
                </div>
                <h4 style="margin-top: 20px;font-weight: 600">已签到人员</h4>
                <h5 style="text-align: center" v-if="!actual_num">暂无数据...</h5>
                <div class="scroll_bar" style="height: 495px; background:#fff;overflow: auto;width: 100%"
                     v-if="actual_num">
                    <div class="attendance" style="margin-bottom: 0;border-bottom: 1px solid #eee"
                         v-for="item in detailInfo.attendee" v-if="item.qrcode_time">
                        <div class="attendance_header">
                            <div>
                                <img v-if="item.staff_avatar" :src="item.staff_avatar">
                                <img v-else="" src="../../assets/img/head.png">
                            </div>
                        </div>
                        <div class="attendance_content">
                            <h5 style="margin-bottom: 15px;margin-top: 5px;font-weight: bold;color: #333">
                                <span>{{item.staff_name}}</span>
                                <span class="pull-right">{{item.qrcode_time}}</span>
                            </h5>
                            <div>
                                <span>{{item.staff_department}} - {{item.staff_position}}</span>
                                <span class="pull-right">座位号&nbsp;
                                    <span v-if="item.seat_number">{{item.seat_number}}</span>
                                    <span v-else>暂无</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                hour: 0,
                minute: 0,
                second: 0,
                detailInfo: {},
                dictionary: [],
                isShow: false,
                count: '',
                actual_num: '',
                unActual_num: '',
                signList: [],
                signInfoArray: [],
                signInfo: {},
                signInfoList:[],
                signInfoLength : '',
                changeCount: false,
                start_time: '',
                interval: null,
                isStart:false,
                noStart:false,
                isFinish : false,
                starCount:false,

            }
        },
        mounted(){
            this.getDictionary();
            $('.mainContent').css({'height':window.innerHeight-30+'px','background':'#fff'});
            window.onresize = function(){
                $('.mainContent').css('height',window.innerHeight-30+'px');
                if(window.innerHeight>950){
                    $('.unAttendance_item_group').css('height','290px')
                }else {
                    $('.unAttendance_item_group').css('height','160px')
                }
            };
        },
        watch: {
            start_time(val, oldValue){
                this.countDown();
            },
            starCount(val){
                if(val){
                    $('#meetingAdd').modal('show');
                }
            },
            signInfoList(val){
                if(val.length>0){
                    this.carousel();
                }
            },
            unActual_num(val){
                if(val<1){
                    $('#meetingAdd').modal('hide');
                }
            }
        },
        methods: {
            getDictionary(){
                this.$http.get('oa/conference/dict').then((res) => {
                    this.dictionary = res.data.conference;
                    this.getMeetingDetail();
                    this.searchAttendance();
                    this.countDown();
                    setInterval(() => {
                        this.getMeetingDetail();
                        this.searchAttendance();
                    },2000);

                    setInterval(() => {
                        this.countDown();
                    }, 300000);

                })
            },

            carousel(){

                this.signInfo ={};
                this.signInfo = this.signInfoList[0];
                new Promise((resolve, reject) => {
                    $('.visiting_card').css('right', '10px');

                    setTimeout(()=>{
                        resolve('');
                    },500);
                }).then((data) => {
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            $('.visiting_card').css('right', '-430px');
                            resolve('');
                        }, 2000)

                    }).then((data) =>{
                        setTimeout( ()=> {
                            if(this.signInfoList.length>0){
                                this.signInfoList.splice(0,1);
                            }else {
                                this.signInfoList =[];
                            }
                        },500)
                    })
                })
            },
            searchAttendance(){
                this.$http.get('oa/conference/sign/id/' + this.$route.query.meetingId).then((res) => {
                    if (res.data.code === '50080') {
//                        this.signInfo = {};
                        res.data.data.forEach((item) => {
                            this.signInfoList.push(item)
                        });
//                        this.signInfo = res.data.data[0];
//                        $('.visiting_card').css('right', '10px');
//                        new Promise((resolve, reject) => {
//                            setTimeout(() => {
//                                $('.visiting_card').css('right', '-430px');
//                                resolve('clear');
//                            }, 4000)
//                        }).then((data) => {
//
//                        });
                    } else {

                    }
                })
            },
            getMeetingDetail(){
                this.$store.dispatch('hideLoading');
                this.$http.get('oa/conference/conferenceread/id/' + this.$route.query.meetingId+/order/+1).then((res) => {
                    if (res.data.code === '50020') {
                        this.detailInfo = res.data.data;
                        this.start_time = res.data.data.start_time;
                        let actual = [];
                        let unActual = [];
                        this.signList = [];
                        if (this.detailInfo.attendee) {
                            this.detailInfo.attendee.forEach((item) => {
                                if (item.qrcode_time) {
                                    actual.push(item);
                                    if (item.is_leader == 2) {
                                        this.signList.push(item)
                                    }
                                } else {
                                    unActual.push(item)
                                }
                            });
                            this.actual_num = actual.length;
                            this.unActual_num = unActual.length;
                        }
                    }
                });
            },

            countDown(){
                this.$http.get('oa/conference/count_down/id/' + this.$route.query.meetingId).then((res) => {
                    if (res.data.code === '50090') {
                        this.starCount = true;
                        this.count = '';
                        if (this.interval) {
                            clearInterval(this.interval)
                        }
                        this.count = res.data.data;
                        this.interval = setInterval(() => {
                            if (this.count < 1) {
                                clearInterval(this.interval);
                                $('#meetingAdd').modal('hide');
                                this.isStart = true;
                                this.starCount = false;
                            } else {
                                this.count--;
                                this.hour = parseInt(this.count / 3600);
                                this.minute = parseInt(this.count % 3600 / 60);
                                this.second = parseInt(this.count % 3600 % 60);
                            }
                        }, 1000);
                    } else if(res.data.code === '50091'){
                        this.isStart = true;
                        this.noStart = false;
                        this.isFinish = false;
                        this.starCount = false;
                    }else if (res.data.code === '50092'){
                        this.noStart = true;
                        this.isFinish = false;
                        this.isStart = false;
                        this.starCount = false;
                    }else {
                        this.isFinish = true;
                        this.isStart = false;
                        this.noStart = false;
                        this.starCount = false;
                    }
                });
            },
            fullScreen(){
                let el =document.getElementById('content');
                let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
                if (typeof rfs !== "undefined" && rfs) {
                    rfs.call(el);
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body,html{
        margin:0;
        padding: 0;
        width: 1920px;
        overflow: hidden;
    }
    .nav h5{
        font-size: 16px;
    }
    .mainContent {
        box-shadow: 0 2px 6px 0 rgba(89, 77, 235, 0.2), 0 0 8px 0 rgba(90, 97, 235, 0.1);
    }
    .content_right {
        display: inline-block;
        background: #ffffff;
    }

    .content_left {
        display: inline-block;
    }

    .nav {
        width: 100%;
        height: 235px;
        background-image: url("../../assets/img/background.png");
        background-size: 100% 100%;
        border-bottom: 1px solid #ddd;
    }

    .leJia {
        margin-bottom: 15px;
    }

    .slogan {
        display: flex;
        align-items: flex-start;
    }

    .border_1 {
        width: 30px;
        border-top: 2px solid #59ace2;
        margin: 15px 40px 0 0;
    }

    .attendance {
        width: 99%;
        margin-bottom: 10px;
        height: 100px;
        border-radius: 5px;
        background: #ffffff;
        display: flex;
        align-items: center;
    }

    .attendance_header {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
    }

    .attendance_header > div {
        width: 60px;
        height: 76px;
        margin-top: -16px;
        position: relative;
    }

    .shadow {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        opacity: .2;
        position: absolute;
        top: 19px;
        left: 3px;

    }

    .first .shadow {
        background: #ffc95f;
    }

    .second .shadow {
        background: #fc647d;
    }

    .third .shadow {
        background: #48a6b1;
    }

    .first .attendance_header > div {
        background: url("../../assets/img/lALPBbCc1Unzi5FMPA_60_76.png") no-repeat;
    }

    .second .attendance_header > div {
        background: url("../../assets/img/lALPBbCc1Unzi5JMPA_60_76.png") no-repeat;
    }

    .third .attendance_header > div {
        background: url("../../assets/img/lALPBbCc1Unzi5NMPA_60_76.png") no-repeat;
    }

    .attendance_header img {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        margin-top: 19px;
        margin-left: 3px;
    }

    .attendance_content {
        height: 60px;
        padding-right: 15px;
        flex-grow: 1
    }

    .attendance_content > div:first-child {
        height: 50%;
    }

    .attendance_content > div:last-child {
        height: 50%;
    }

    .scroll_bar::-webkit-scrollbar {
        width: 4px;
    }

    .scroll_bar::-webkit-scrollbar-button {
        height: 0;
        background-color: #ccc;
    }

    .scroll_bar::-webkit-scrollbar-track {
        background: #ccc;
    }

    .scroll_bar::-webkit-scrollbar-thumb {
        background: #999;
        border-radius: 1px;
    }

    .content_right_middle {
        margin-top: 40px;
        display: flex;
    }

    .two-dimension_code {
        width: 250px;
    }

    .two-dimension_code > div {
        width: 250px;
        height: 250px;
        background: #f1f1f1;
    }

    .content_right_middle_right {
        flex-grow: 1
    }

    .meetingDetail {
        margin-top: 40px;
        display: flex;
        margin-left: 15px;
    }

    .meetingDetail div {
        display: flex;
        margin-right: 13px;
    }

    .meetingDetail div > div:first-child {
        color: #999;
        line-height: 30px;
    }

    .meetingDetail div > div:last-child {
        background: #f4f3f6;
        border-radius: 4px;
        width: 90px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lead {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }

    .lead_item > div {
        width: 180px;
        height: 180px;
        margin: 0 10px 10px;
        border: 1px solid #dddddd;
        border-radius: 5px;
    }

    .lead_item > div > div {
        display: flex;
        justify-content: center;
    }

    .lead_item_head img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 20px;
    }

    .lead_item_name h5 {
        font-weight: bold;
        margin-bottom: 0;
    }

    .lead_item_department h5 {
        margin-bottom: 0;
    }

    .lead_item_time h5 {
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 0;
    }

    .unAttendance_item_group {
        width: 100%;
        height: 160px;
        overflow: auto;
        margin: 15px 0;
        display: flex;
        flex-wrap: wrap;
    }

    .unAttendance_item {
        width: 19%;
        height: 80px;
        margin: 0 10px 10px 0;
        background: #f4f3f6;
        display: flex;
        align-items: center;
    }

    .unAttendance_header {
        padding: 0 10px;
        position: relative;
    }

    .unAttendance_header img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .gray {
        -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
        filter: grayscale(100%);
    }

    .visiting_card {
        z-index: 9999;
        width: 430px;
        height: 350px;
        background: #fff;
        position: fixed;
        top: 0;
        right: -430px;
        border-radius: 5px;
        box-shadow: 0 2px 6px 0 rgba(10, 219, 244, .2), 0 0 8px 0 rgba(10, 219, 244, .1);
        transition: all .5s;
    }

    .card_top {
        height: 100px;
        width: 100%;
        border-radius: 5px 5px 0 0;
        background-image: url("../../assets/img/lALPBbCc1Us-ZMNkzQGr_427_100.png");
    }

    .card_head {
        position: absolute;
        top: 60px;
        left: 30px;
    }

    .card_head img {
        width: 130px;
        height: 130px;
        border-radius: 5px;
    }

    .staff_info {
        font-size: 20px;
        margin-left: 190px;
        padding-top: 40px;
        height: 100px;
    }

    .attendance_info {
        height: 150px;
        padding: 0 35px;
        display: flex;
        align-items: center;
    }

    .attendance_info > div {
        width: 120px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .attendance_info div > div {
        width: 66px;
        height: 66px;
        font-size: 16px;
        padding: 15px 0 0 0;
        text-align: center;
        font-weight: 900;
        background-size: 100% 100%;
    }

    .attendance_info div > p {
        width: 140px;
        text-align: center;
    }

    .attendance_info .department > div {
        color: #ffc95f;
        background-image: url("../../assets/img/attendance_3.png");
    }

    .attendance_info .seat > div {
        color: #48a6b1;
        background-image: url("../../assets/img/attendance3.png");
    }

    .attendance_info .time > div {
        color: #fc647d;
        background-image: url("../../assets/img/attendance_1.png");
    }

    .mainContent {
        margin-top: 0;
    }

    .lead_item {
        position: relative;
    }

    .corner {
        width: 30px;
        height: 30px;
        border-radius: 0 0 0 100%;
        background: #33c2dc;
        position: absolute;
        top: 1px;
        right: 11px;
    }

    .modal-body {
        width: 400px;
        height: 400px;
        padding: 0;
    }

    .erWeiMa {
        padding: 20px;
        width: 280px;
        height: 280px;
        margin:0 auto ;
        /*background: #efefef;*/
        background: url("../../assets/img/组22.png") no-repeat;
        background-size: 100% 100%;
    }

    .modal-dialog {
        width: 400px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -200px 0 0 -200px;
    }

</style>