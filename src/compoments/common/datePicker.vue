<template>
    <div class="datePickerContainer input-group">
        <div v-if="range">
            <div v-show="isPC">
                <input @focus="datePicker" type="text" name="reservation" id="reservation" placeholder="选择日期"
                       v-model="dateRange" class="reservation form-control" readonly>
            </div>

            <div class="input-group mobileTimePicker" v-show="!isPC">
                <input type="text" class="form-control" placeholder="选择日期" v-model="mobilePickerDate"
                       @click="showPicker = !showPicker" readonly>
                <div class="mobileTime" v-show="showPicker">
                    <ul>
                        <li @click="selectDay(0)">清空</li>
                        <li @click="selectDay(1)" :class="{'active' : isActive==1}">今天</li>
                        <li @click="selectDay(2)" :class="{'active' : isActive==2}">昨天</li>
                        <li @click="selectDay(3)" :class="{'active' : isActive==3}">最近7天</li>
                        <li @click="selectDay(4)" :class="{'active' : isActive==4}">最近30天</li>
                        <li @click="selectDay(5)" :class="{'active' : isActive==5}">上月</li>
                        <li @click="selectDay(6)" :class="{'active' : isActive==6}">本月</li>
                        <li @click="selectDay(7)" :class="{'active' : isActive==7}">上季度</li>
                        <li @click="selectDay(8)" :class="{'active' : isActive==8}">本季度</li>
                        <li @click="selectDay(9)" :class="{'active' : isActive==9}">上一年</li>
                        <li @click="selectDay(10)" :class="{'active' : isActive==10}">本年</li>
                        <li @click="selectDay(12)" :class="{'active' : isActive==10}">未来一个月</li>
                        <li @click="selectDay(13)" :class="{'active' : isActive==10}">未来一年</li>
                        <li @click="selectDay(14)" :class="{'active' : isActive==10}">未来一百年</li>
                        <li @click="selectDay(11)" :class="{'active' : isActive==11}">自定义</li>
                    </ul>
                    <div v-show="isCustom">
                        <div class="form-group clearFix">
                            <label class="control-label">起始时间</label>
                            <input type="date" class="form-control" v-model="from">
                        </div>
                        <div class="form-group clearFix">
                            <label class="control-label">结束时间</label>
                            <input type="date" class="form-control" v-model="to">
                        </div>
                        <div class="btns">
                            <button type="button" class="btn btn-success" @click="saveMobilePicker">确定</button>
                            <button type="button" class="btn btn-default" @click="hide">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else="range">
            <!--<div class="input-group">-->
            <!--<label>-->
            <input @click="remindData" type="text" name="addtime" placeholder="选择时间" v-model="date"
                   :id="idName"
                   class="form-control" readonly>
            <!--</label>-->
            <!--</div>-->
        </div>
        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue'
    export default{
        props: ['dateConfigure', 'currentDate','idName'],
        data(){
            return {
                dateId: '',
                dateRange: '',
                isPC: true,
                from: '',
                to: '',
                date: '',
                range: '',
                hour: '',
                isCustom: false,
                showPicker: false,
                mobilePickerDate: '',

                monthDates: '',        // 距离月初多少天
                quarterlyDates: '',    // 距离本季度初多少天
                yearDates: '',         // 距离1月1号多少天
                lastMonthDays: '',     // 上月天数
                lastYearDays: '',      // 去年天数
                lastQuarterlyDays: '', // 上季度天数

                isActive: '',
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
        components: { Status },
        created () {
//            判断是否pc
            this.isPC = this.IsPC();
            this.range = this.dateConfigure[0].range;
            this.hour = this.dateConfigure[0].needHour;
            this.dateId = this.dateConfigure[0].date_id;
            this.setDate();
//            this.ifNeedHour();
        },
        watch: {
            dateConfigure(val){
                console.log(val[0]);
                this.range = val[0].range;
                this.hour = val[0].needHour;
//                this.ifNeedHour();
            },
            currentDate(val){
                console.log(val);
                this.setDate();
            },
            date(val){
//                document.getElementsByClassName('form_datetime').value = val;
//                document.getElementsByClassName('form_datetimeNeedHour').value = val;
//                $('.form_datetime').val(val);
//                $('.form_datetimeNeedHour').val(val);
            }
        },
        updated (){
            this.remindData();
        },
        methods: {
            remindData (){
                $('#' + this.idName).datetimepicker({
                    minView: this.hour?'day':'month',                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: this.hour?'yyyy-mm-dd hh:00':'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    endDate: new Date(),
                    pickerPosition: this.dateConfigure[0].position
                }).on('changeDate', function (ev) {
                    this.date = ev.target.value;
                    this.$emit('sendDate', ev.target.value);
                }.bind(this));

                /*$('.' + this.dateId).datetimepicker({
                    minView: "hour",                     //选择日期后，再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:00',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    endDate: new Date(),
                    pickerPosition: this.dateConfigure[0].position
                }).on('changeDate', function (ev) {
                    this.date = ev.target.value;
                    this.$emit('sendDate', ev.target.value);
//                    console.log(this.startDataTime);
                }.bind(this));*/
            },
            datePicker(){
                let _this = this;
                this.getDates();
                //时间插件
                $('.reservation').daterangepicker({
                    format: 'YYYY-MM-DD',
                    showDropdowns: true,
                    autoApply: true,
                    separator: '至',
//                    maxDate : moment(), //最大时间
                    ranges: {
                        '清空': [null, null],
                        //'最近1小时': [moment().subtract('hours',1), moment()],
                        '今天': [moment().startOf('day'), moment()],
                        '昨天': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
                        '最近7天': [moment().subtract('days', 6), moment()],
                        '最近30天': [moment().subtract('days', 29), moment()],
                        '上月': [moment().subtract('days', this.lastMonthDays + this.monthDates), moment().subtract('days', this.monthDates+1)],
                        '本月': [moment().subtract('days', this.monthDates), moment()],
                        '上季度': [moment().subtract('days', this.lastQuarterlyDays + this.quarterlyDates), moment().subtract('days', this.quarterlyDates + 1)],
                        '本季度': [moment().subtract('days', this.quarterlyDates), moment()],
                        '上一年': [moment().subtract('days', this.lastYearDays + this.yearDates), moment().subtract('days', this.yearDates + 1)],
                        '本年': [moment().subtract('days', this.yearDates), moment()],
                        '未来一个月': [moment(),moment().add('months', 1)],
                        '未来一年': [moment(),moment().add('years', 1)],
                        '未来一百年': [moment(),moment().add('years', 100)],
                    },
                    locale: {
                        applyLabel: '确定',
                        cancelLabel: '取消',
                        fromLabel: '起始时间',
                        toLabel: '结束时间',
                        customRangeLabel: '自定义',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                            '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    },
                    linkedCalendars: false,
                    autoUpdateInput: false,

//                    "startDate": "07/11/2017",
//                    "endDate": "07/17/2017"
                }, function (start, end, label) {
                    if (start.format('YYYY-MM-DD') == 'Invalid date') {
//                        alert(1)
                        _this.dateRange = '';
                        $('#reservation').val('');
                        _this.$emit('sendDate', '');
                    } else {
                        _this.dateRange = start.format('YYYY-MM-DD') + "至" + end.format('YYYY-MM-DD');
                        _this.$emit('sendDate', start.format('YYYY-MM-DD') + "to" + end.format('YYYY-MM-DD'));
                    }
                });
            },
            IsPC(){
                let userAgentInfo = navigator.userAgent;
                let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            sendDate(){
                this.$emit('sendDate', this.from + 'to' + this.to);
            },
            selectDay(num){
                this.getDates();
                let date;
                let from;
                let to;
                if (num == 11) {
                    this.isCustom = true;
//                    return;
                } else {
                    this.isActive = num;
//                console.log(this.isActive);
                    if (num == 0) {
                        date = '';
                        this.$emit('sendDate', '');
                    } else {
                        this.isCustom = false;
                        if (num == 1) {
                            // 今天
//                        console.log(moment().startOf('day').format('YYYY-MM-DD')+"to"+moment().format('YYYY-MM-DD'));
                            from = moment().startOf('day').format('YYYY-MM-DD');
                            to = moment().format('YYYY-MM-DD');
//                            date = moment().startOf('day').format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 2) {
                            // 昨天
//                        console.log(moment().subtract('days', 1).startOf('day').format('YYYY-MM-DD')+"to"+moment().subtract('days', 1).endOf('day').format('YYYY-MM-DD'));
                            from = moment().subtract('days', 1).startOf('day').format('YYYY-MM-DD');
                            to = moment().subtract('days', 1).startOf('day').format('YYYY-MM-DD');
//                            date = moment().subtract('days', 1).startOf('day').format('YYYY-MM-DD') + "至" + moment().subtract('days', 1).endOf('day').format('YYYY-MM-DD');
                        } else if (num == 3) {
                            // 近7天
//                        console.log(moment().subtract('days', 6).format('YYYY-MM-DD')+"to"+moment().format('YYYY-MM-DD'));
                            from = moment().subtract('days', 6).format('YYYY-MM-DD');
                            to = moment().format('YYYY-MM-DD');
//                            date = moment().subtract('days', 6).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 4) {
                            // 近一个月
//                        console.log(moment().subtract('days', 29).format('YYYY-MM-DD')+"to"+moment().format('YYYY-MM-DD'));
                            from = moment().subtract('days', 29).format('YYYY-MM-DD');
                            to = moment().format('YYYY-MM-DD');
//                            date = moment().subtract('days', 29).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 5) {
                            // 上月
                            from = moment().subtract('days', this.lastMonthDays + this.monthDates).format('YYYY-MM-DD');
                            to = moment().subtract('days', this.monthDates + 1).format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.lastMonthDays + this.monthDates).format('YYYY-MM-DD') + "至" + moment().subtract('days', this.monthDates + 1).format('YYYY-MM-DD');
                        } else if (num == 6) {
                            // 本月
                            from = moment().subtract('days', this.monthDates).format('YYYY-MM-DD');
                            to = moment().format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.monthDates).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 7) {
                            // 上季度
                            from = moment().subtract('days', this.lastQuarterlyDays + this.quarterlyDates).format('YYYY-MM-DD');
                            to = moment().subtract('days', this.quarterlyDates + 1).format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.lastQuarterlyDays + this.quarterlyDates).format('YYYY-MM-DD') + "至" + moment().subtract('days', this.quarterlyDates + 1).format('YYYY-MM-DD');
                        } else if (num == 8) {
                            // 本季度
                            from = moment().subtract('days', this.quarterlyDates).format('YYYY-MM-DD');
                            to = moment().format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.quarterlyDates).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 9) {
                            // 上一年
                            from = moment().subtract('days', this.lastYearDays + this.yearDates).format('YYYY-MM-DD');
                            to = moment().subtract('days', this.yearDates + 1).format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.lastYearDays + this.yearDates).format('YYYY-MM-DD') + "至" + moment().subtract('days', this.yearDates + 1).format('YYYY-MM-DD');
                        } else if (num == 10) {
                            // 本年
                            from = moment().subtract('days', this.yearDates).format('YYYY-MM-DD');
                            to = moment().format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.yearDates).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 12) {
                            // 未来一个月
                            from = moment().format('YYYY-MM-DD');
                            to = moment().add('months', 1).format('YYYY-MM-DD');
//                            date = from + "至" + to;
                        } else if (num == 13) {
                            // 未来一年
                            from = moment().format('YYYY-MM-DD');
                            to = moment().add('years', 1).format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.yearDates).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        } else if (num == 14) {
                            // 未来一百年
                            from = moment().format('YYYY-MM-DD');
                            to = moment().add('years', 100).format('YYYY-MM-DD');
//                            date = moment().subtract('days', this.yearDates).format('YYYY-MM-DD') + "至" + moment().format('YYYY-MM-DD');
                        }
                        date = from + "至" + to;
                        this.$emit('sendDate', from + "to" + to);
                    }
                    this.mobilePickerDate = date;
                    this.showPicker = false;
                }
            },
            saveMobilePicker(){
//                console.log(this.from+'to'+this.to);
                let startTime = new Date(Date.parse(this.from));
                let endTime = new Date(Date.parse(this.to));
//                console.log(startTime>=endTime)
//                console.log(CompareDate(this.from,this.to))
                if (this.from == '' || this.to == '') {
                    this.info.error = '请选择日期';
                    //关闭失败弹窗 ***
                    this.info.state_error = true;
                    //显示成功弹窗 ***
                    this.info.state_success = false;
                } else if (startTime > endTime) {
                    this.info.error = '请选择正确的起止时间';
                    //关闭失败弹窗 ***
                    this.info.state_error = true;
                    //显示成功弹窗 ***
                    this.info.state_success = false;
                } else {
                    this.mobilePickerDate = this.from + '至' + this.to;
                    this.showPicker = false;
                    this.from = '';
                    this.to = '';
                    this.$emit('sendDate', this.from + 'to' + this.to);
                }
            },
            showToggle(){
                this.showPicker = !this.showPicker
            },
            hide(){
                this.showPicker = false;
                this.isCustom = false;
                this.from = '';
                this.to = '';
            },
            getDates(){
                let currentDate = new Date();
                let year = currentDate.getFullYear();
                let month = currentDate.getMonth() + 1;
                let day = currentDate.getDate();

                let lastQuarterlyEnd;  // 上季度初
                let thisQuarterlyStart;  // 上季度末
                if (month <= 3) {
                    lastQuarterlyEnd = moment([year - 1, 10, 1]);
                    thisQuarterlyStart = moment([year, 1, 1]);
                } else if (month > 3 && month <= 6) {
                    lastQuarterlyEnd = moment([year, 1, 1]);
                    thisQuarterlyStart = moment([year, 4, 1]);
                } else if (month > 6 && month <= 9) {
                    lastQuarterlyEnd = moment([year, 4, 1]);
                    thisQuarterlyStart = moment([year, 7, 1]);
                } else if (month > 9 && month <= 12) {
                    lastQuarterlyEnd = moment([year, 7, 1]);
                    thisQuarterlyStart = moment([year, 10, 1]);
                }
//                let thisQuarterlyStart = moment([year,])

                let thisDay = moment([year, month, day]);

                let lastMonth = moment([year, month - 1, 1]);
                console.log('lastMonth========'+lastMonth.format('YYYY-MM-DD'));
                let thisMonth = moment([year, month, 1]);
                console.log('thisMonth========'+thisMonth.format('YYYY-MM-DD'));

                let lastYear = moment([year - 1, 1, 1]);
                let thisYear = moment([year, 1, 1]);

                this.monthDates = thisDay.diff(thisMonth, 'days');
                console.log('this.monthDates====='+this.monthDates)
                this.lastMonthDays = thisMonth.diff(lastMonth, 'days');
                console.log('this.lastMonthDays====='+this.lastMonthDays)

                this.quarterlyDates = thisDay.diff(thisQuarterlyStart, 'days');
                this.lastQuarterlyDays = thisQuarterlyStart.diff(lastQuarterlyEnd, 'days') - 1;

                this.yearDates = thisDay.diff(thisYear, 'days');
                this.lastYearDays = thisYear.diff(lastYear, 'days');
            },
            setDate(){
                if (this.currentDate != undefined) {
                    if (this.currentDate.length == 1) {
                        this.date = this.currentDate[0];
                        this.mobilePickerDate = this.currentDate[0];
                    } else if (this.currentDate.length == 2) {
                        if (this.IsPC()) {
                            this.dateRange = this.currentDate[0] + "至" + this.currentDate[1];
                        } else {
                            this.mobilePickerDate = this.currentDate[0] + "至" + this.currentDate[1];
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #reservation {
        width: 100%;
        border-radius: 4px;
    }

    /*input.form_datetimeNeedHour, input.form_datetime{
        margin-bottom: -6px;
    }*/
    .datePickerContainer {
        padding-top: 0;
        display: inline-block;
        width: 100%;
    }

    .mobileTimePicker {
        width: 250px;
        position: relative;
        /*padding-left: 13px;*/
    }

    .mobileTime {
        padding: 12px;
        position: absolute;
        width: 200px;
        background: white;
        z-index: 10;
        border-radius: 4px;
        top: 35px;
        left: 0;
        border: 1px solid #ddd;
        box-shadow: 1px 1px 2px #ddd;
    }

    .mobileTime:before {
        position: absolute;
        top: -7px;
        left: 9px;
        display: inline-block;
        border-right: 7px solid transparent;
        border-bottom: 7px solid rgba(0, 0, 0, 0.2);
        border-left: 7px solid transparent;
        /*border-bottom-color: rgba(0, 0, 0, 0.2);*/
        content: '';
    }

    .mobileTime:after {
        position: absolute;
        top: -6px;
        left: 10px;
        display: inline-block;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
        border-left: 6px solid transparent;
        content: '';
    }

    .mobileTime ul {
        margin: 0;
        padding: 0;
    }

    .mobileTime ul li {
        font-size: 13px;
        background: #f5f5f5;
        border: 1px solid #f5f5f5;
        color: #08c;
        padding: 3px 12px;
        margin-bottom: 8px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .control-label {
        padding-left: 12px;
        /*margin-top: 8px;*/
    }

    div.btns {
        /*text-align: right;*/
        margin-top: 10px;
    }

    .mobileTime ul li.active {
        background: #08c;
        border: 1px solid #08c;
        color: #fff;
    }

</style>