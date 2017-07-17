<template>
    <div class="datePickerContainer" v-if="range">
        <div class="input-group" v-show="isPC">
            <input @focus="datePicker" type="text" name="reservation" id="reservation" placeholder="选择日期" v-model="dateRange" class="form-control" style="width:300px;">
        </div>

        <div class="input-group" v-show="!isPC">
            <input type="date" class="form-control" @change="sendDate" v-model="from">
        </div>

        <div class="input-group" v-show="!isPC">
            <input type="date" class="form-control" @change="sendDate" v-model="to">
        </div>
    </div>
    <div class="datePickerContainer" v-else="range">
        <div class="form-group datetime" v-show="hour">
            <label>
                <input @focus="remindData" type="text" name="addtime" value="" placeholder="选择时间" v-model="date" class="form-control form_datetimeNeedHour">
            </label>
        </div>
        <div class="form-group datetime" v-show="!hour">
            <label>
                <input @focus="remindData" type="text" name="addtime" value="" placeholder="选择日期" v-model="date" class="form-control form_datetime">
            </label>
        </div>
    </div>
</template>
<style scoped>
    .datePickerContainer{
        display: inline-block;
    }
    .input-group {
        margin-bottom: 18px
    }
</style>
<script>
    export default{
        props : ['dateConfigure'],
        data(){
            return {
                dateRange : '',
                isPC : true,
                from : '',
                to : '',
                date : '',
                range : '',
                hour : ''
            }
        },
        components: {},
        created () {
//            判断是否pc
//            console.log(this.IsPC());
            this.isPC = this.IsPC();
//            console.log(this.dateConfigure[0]);
            this.range = this.dateConfigure[0].range;
            this.hour = this.dateConfigure[0].needHour;
//            console.log(this.hour);

//            this.ifNeedHour();

        },
        watch : {
            dateConfigure(val){
//                console.log(val[0]);
                this.range = val[0].range;
                this.hour = val[0].needHour;
                console.log(this.hour);
//                this.ifNeedHour();
            }
        },
        methods: {
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    endDate: new Date(),
                }).on('changeDate', function (ev) {
                    this.date = ev.target.value;
                    this.$emit('sendDate',ev.target.value);
//                    console.log(this.startDataTime);
                }.bind(this));

                $('.form_datetimeNeedHour').datetimepicker({
                    minView: "hour",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
//                    endDate: new Date(),
                }).on('changeDate', function (ev) {
                    this.date = ev.target.value;
                    this.$emit('sendDate',ev.target.value);
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            datePicker(){
                let _this = this;
                //时间插件
                $('#reservation').daterangepicker({
                    format: 'YYYY-MM-DD',
                    showDropdowns: true,
                    autoApply: true,
                    separator : ' to ',

                    ranges : {
                        //'最近1小时': [moment().subtract('hours',1), moment()],
                        '今天': [moment().startOf('day'), moment()],
                        '昨天': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
                        '最近7天': [moment().subtract('days', 6), moment()],
                        '最近30天': [moment().subtract('days', 29), moment()]
                    },
                    locale : {
                        applyLabel : '确定',
                        cancelLabel : '取消',
                        fromLabel : '起始时间',
                        toLabel : '结束时间',
                        customRangeLabel : '自定义',
                        daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                            '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                        firstDay : 1
                    },
                    linkedCalendars: false,
                    autoUpdateInput: false,

//                    "startDate": "07/11/2017",
//                    "endDate": "07/17/2017"
                }, function(start, end, label) {
                    _this.dateRange = start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD');
                    _this.$emit('sendDate',_this.dateRange);
//                    console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
                });
            },
            IsPC(){
                let userAgentInfo = navigator.userAgent;
                let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
                }
                return flag;
            },
            sendDate(){
//                alert(this.from+'&&'+this.to);
                this.$emit('sendDate',this.from+' to '+this.to);
            },
            ifNeedHour(){
//                    alert(this.needHour);
                if (this.needHour){
                    $('.form_datetime').datetimepicker({
                        minView: "hour",                     //选择日期后，不会再跳转去选择时分秒
                        language: 'zh-CN',
                        format: 'yyyy-mm-dd hh',
                        todayBtn: 1,
                        autoclose: 1,
                        clearBtn: true,                     //清除按钮
//                    endDate: new Date(),
                    })
                } else {
                    $('.form_datetime').datetimepicker({
                        minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                        language: 'zh-CN',
                        format: 'yyyy-mm-dd',
                        todayBtn: 1,
                        autoclose: 1,
                        clearBtn: true,                     //清除按钮
//                    endDate: new Date(),
                    })
                }

            }
        }
    }
</script>