<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <div class="pro-sort">
                    <input @click="reminds_month()" type="text" placeholder='选择日期'
                           v-model="Times" class="form-control remindMonth" readonly>
                </div>
                <div class="pro-sort">
                    <a class="btn btn-success" @click="add_mem">
                        <i class="fa fa-plus-square"></i>&nbsp;新增备忘录
                    </a>
                </div>
            </div>
        </section>
        <div class="row">
            <aside class="col-lg-12">
                <section class="panel">
                    <div class="panel-body">
                        <div id="calendar" class="has-toolbar"></div>
                    </div>
                </section>
            </aside>
        </div>
        <div class="modal fade " id="remindDaily" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="clear_info">
                            ×
                        </button>
                        <h4 class="modal-title">新增备忘录</h4>
                    </div>

                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">内容：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="titles">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">开始：</label>
                                <div class="col-sm-10">
                                    <input @click="reminds()" type="text" placeholder='开始时间'
                                           v-model="start_time" class="form-control remindTimes" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">结束：</label>
                                <div class="col-sm-10">
                                    <input @click="reminds()" type="text" placeholder='结束时间'
                                           v-model="end_time" class="form-control remindTimes" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">描述：</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" v-model="contents"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">标记：</label>
                                <div class="col-sm-10">
                                    <div class="color_block" @click="select_color(1)">
                                        <span v-if="isShow === 1" class="fa fa-check"></span>
                                    </div>
                                    <div class="color_block" @click="select_color(2)">
                                        <span v-if="isShow === 2" class="fa fa-check"></span>
                                    </div>
                                    <div class="color_block" @click="select_color(3)">
                                        <span v-if="isShow === 3" class="fa fa-check"></span>
                                    </div>
                                    <div class="color_block" @click="select_color(4)">
                                        <span v-if="isShow === 4" class="fa fa-check"></span>
                                    </div>
                                    <div class="color_block" @click="select_color(5)">
                                        <span v-if="isShow === 5" class="fa fa-check"></span>
                                    </div>
                                    <div class="color_block" @click="select_color(6)">
                                        <span v-if="isShow === 6" class="fa fa-check"></span>
                                    </div>
                                    <div class="color_block" @click="select_color(7)">
                                        <span v-if="isShow === 7" class="fa fa-check"></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button" @click="clear_info">取消
                        </button>
                        <button class="btn btn-success" v-if="mem_status" type="button" @click="add_memorandum">确定
                        </button>

                        <button class="btn btn-warning" v-if="!mem_status" @click="mem_revise" type="button">修改</button>
                        <button class="btn btn-danger pull-left" @click="mem_delete" v-if="!mem_status" type="button">
                            删除
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--提醒-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default {
        components: {Status},
        data (){
            return {
                revise_info: {},
                colour: {
                    1: "#6883A3",
                    2: "#46BE8A",
                    3: "#57C7D4",
                    4: "#F2A654",
                    5: "#F96868",
                    6: "#526069",
                    7: "#926DDE"
                },
                mem_id: '',
                mem_status: true,
                memorandum: [],         //备忘录列表
                isShow: 1,
                Times: '',              //时间搜索
                sea_year: '',
                sea_month: '',
                sea_day: '',
                titles: '',             //内容
                contents: '',           //描述
                start_time: '',
                end_time: '',
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        updated (){

        },
        created (){
            this.memorandum_list(1);
        },
        methods: {
//            选择颜色
            select_color (val){
                this.isShow = val;
            },
//            打开模态框
            add_mem (){
                $('#remindDaily').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
                this.clear_info();
            },
//            清楚内容
            clear_info (){
                this.mem_status = true;
                this.isShow = 1;
                this.titles = '';          //内容
                this.contents = '';        //描述
                this.start_time = '';
                this.end_time = '';
            },
//            增加备忘录
            add_memorandum (){
                this.$http.post('clock/memo/write', {
                    title: this.titles,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    content: this.contents,
                    colour: this.isShow,
                }).then((res) => {
                    if (res.data.code === '30030') {
                        $('#remindDaily').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        $('#calendar').fullCalendar('renderEvent', {
                            title: this.titles,
                            start: this.start_time,
                            end: this.end_time,
                            content: this.contents,
                            color: this.colour[this.isShow],
                            color_id: this.isShow,
                            id: res.data.data,
                        }, true);

                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
//            删除备忘录
            mem_delete (){
                this.$http.post('clock/memo/delete', {
                    id: this.mem_id,
                }).then((res) => {
                    $('#remindDaily').modal('hide');
                    //成功信息 ***
                    this.info.success = res.data.msg;
                    //关闭失败弹窗 ***
                    this.info.state_error = false;
                    //显示成功弹窗 ***
                    this.info.state_success = true;

                    $('#calendar').fullCalendar('removeEvents', this.mem_id);
                });
            },
//            修改备忘录
            mem_revise (){
                this.$http.post('clock/memo/update', {
                    id: this.mem_id,
                    title: this.titles,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    content: this.contents,
                    colour: this.isShow,
                }).then((res) => {
                    if (res.data.code === '30028') {
                        $('#remindDaily').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.revise_info.title = this.titles;
                        this.revise_info.start = this.start_time;
                        this.revise_info.end = this.end_time;
                        this.revise_info.content = this.contents;
                        this.revise_info.color = this.colour[this.isShow];
                        this.revise_info.color_id = this.isShow;
                        $('#calendar').fullCalendar('updateEvent', this.revise_info);
                    } else if (res.data.code === '30029') {
                        $('#remindDaily').modal('hide');
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }

                });
            },
//            备忘录列表
            memorandum_list (){
                this.$http.post('clock/memo/index', {
                    start_time: '',
                    end_time: '',
                }).then((res) => {
                    this.$nextTick(() => {
                        this.reminds();
                        this.reminds_month();
                    });
                    if (res.data.code === '30020') {
                        this.colour = res.data.data.color;
                        let mem = res.data.data.data;
                        let color = res.data.data.color;
                        this.list_info(mem, color);
                    } else {
                        this.list_info();
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            //            日期搜索
            reminds_month (){
                $('.remindMonth').datetimepicker({
                    minView: 'month',
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    initialDate: new Date(),
                    pickerPosition: 'bottom-right',
                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    this.Times = ev.target.value;
                    let year = ev.target.value.split('-')[0];
                    let month = ev.target.value.split('-')[1];
                    let day = ev.target.value.split('-')[2];
                    $('#calendar').fullCalendar('gotoDate', year, month - 1, day);
                }.bind(this));
            },
//            选择日期
            reminds (){
                $('.remindTimes').datetimepicker({
                    minView: 'day',                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:00',
                    todayBtn: 1,
                    autoclose: 1,
                    initialDate: new Date(),
                    pickerPosition: 'bottom-right',
                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    if (ev.target.placeholder === '开始时间') {
                        this.start_time = ev.target.value;
                    }
                    if (ev.target.placeholder === '结束时间') {
                        this.end_time = ev.target.value;
                    }
                }.bind(this));
            },

//            列表数据
            list_info (mem, color){
                let _this = this;
                let memorandum = [];
                if (mem) {
                    for (let i = 0; i < mem.length; i++) {
                        memorandum.push(
                            {
                                id: mem[i].memo_id,
                                title: mem[i].title,
                                start: mem[i].start,
                                end: mem[i].end,
                                content: mem[i].content,
                                color: color[mem[i].color],
                                color_id: mem[i].color,
                            }
                        )
                    }
                }
                $('#calendar').fullCalendar({
                    buttonText: {
                        today: '今天',
                        month: '月视图',
//                        week: '周视图',
//                        day: '日视图'
                    },
                    allDayText: "全天",
                    timeFormat: {
                        '': 'H:mm{-H:mm}'
                    },
                    weekMode: "variable",
                    columnFormat: {
                        month: 'dddd',
                        week: 'dddd M-d',
                        day: 'dddd M-d'
                    },
                    titleFormat: {
                        month: 'yyyy年 MMMM月',
                        week: "[yyyy年] MMMM月d日 { '&#8212;' [yyyy年] MMMM月d日}",
                        day: 'yyyy年 MMMM月d日 dddd'
                    },
                    monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    dayNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month'
                    },

                    eventClick (calEvent, jsEvent, view) {
                        _this.revise_info = calEvent;
                        _this.mem_status = false;
                        _this.mem_id = calEvent.id;
                        _this.isShow = calEvent.color_id;
                        _this.titles = calEvent.title;              //内容
                        _this.contents = calEvent.content;          //描述
                        _this.start_time = _this.format(calEvent.start, 'yyyy-MM-dd HH:mm');
                        _this.end_time = _this.format(calEvent.end, 'yyyy-MM-dd HH:mm');
                        $('#remindDaily').modal({
                            backdrop: 'static',         //空白处模态框不消失
                        });
//                        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//                        console.log('View: ' + view.name);
                    },
//                    editable: true,           //拖动
//                    droppable: true,                    // this allows things to be dropped onto the calendar !!!
//                    drop: function (date, allDay) {     // this function is called when something is dropped
//                        // retrieve the dropped element's stored Event Object
//
//                        let originalEventObject = $(this).data('eventObject');
//
//                        // we need to copy it, so that multiple events don't have a reference to the same object
//                        let copiedEventObject = $.extend({}, originalEventObject);
//
//                        // assign it the date that was reported
//                        copiedEventObject.start = date;
//                        copiedEventObject.allDay = allDay;
//
//                        // render the event on the calendar
//                        // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
//                        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
//
//                        // is the "remove after drop" checkbox checked?
//                        if ($('#drop-remove').is(':checked')) {
//                            // if so, remove the element from the "Draggable Events" list
//                            $(this).remove();
//                        }
//
//                    },
                    events: memorandum,
                });

            },

//            转换时间格式
            format (time, format){
                let t = new Date(time);
                let tf = function (i) {
                    return (i < 10 ? '0' : '')
                        + i
                };
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                        case 'yyyy':
                            return tf(t.getFullYear());
                            break;
                        case 'MM':
                            return tf(t.getMonth() + 1);
                            break;
                        case 'mm':
                            return tf(t.getMinutes());
                            break;
                        case 'dd':
                            return tf(t.getDate());
                            break;
                        case 'HH':
                            return tf(t.getHours());
                            break;
                        case 'ss':
                            return tf(t.getSeconds());
                            break;
                    }
                });
            },
        }
    }
</script>


<style scoped>
    input {
        margin-bottom: 0;
    }

    .pro-sort {
        margin-right: 20px;
        height: 39px;
    }

    .color_block {
        position: relative;
        display: inline-block;
        margin: 10px 10px 0 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 50%;
    }

    .color_block:first-child {
        background-color: #6883A3;
    }

    .color_block:nth-child(2) {
        background-color: #46BE8A;
    }

    .color_block:nth-child(3) {
        background-color: #57C7D4;
    }

    .color_block:nth-child(4) {
        background-color: #F2A654;
    }

    .color_block:nth-child(5) {
        background-color: #F96868;
    }

    .color_block:nth-child(6) {
        background-color: #526069;
    }

    .color_block:nth-child(7) {
        background-color: #926DDE;
    }

    .fa-check {
        position: absolute;
        top: 7px;
        left: 6px;
        font-size: 18px;
        color: #FFFFFF;
    }
</style>
