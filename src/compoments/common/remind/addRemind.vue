<template>
    <div>
        <div class="modal fade" id="addRemind">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="revise">&times;</span>
                        </button>
                        <h5 class="modal-title">添加提醒</h5>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label col-sm-2">提醒内容</label>
                                        <div class="col-sm-10 ">
                                            <textarea class="form-control" v-model="remind_info" name="editor1"
                                                      rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-sm-2">提醒时间</label>
                                        <div class="col-sm-4 ">
                                            <select class="form-control" v-model="remindTimes">
                                                <option value="">请选择时间</option>
                                                <option v-for="(a, index) in remind_select" :value="index">{{a}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4 ">
                                            <a class="btn btn-white" v-if="remindTimes === ''" style="border: none"
                                               @click="Advanced">高级选项+</a>
                                        </div>
                                    </div>
                                    <div class="row" v-if="isAdvanced && remindTimes === ''">
                                        <label class="col-sm-2 control-label col-sm-2"></label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'remind'" @sendDate="getDate"></DatePicker>
                                            <!--<input @click="remind_time" type="text" placeholder="选择时间"
                                                   v-model="remindTime" class="form-control remind_datetime" readonly>-->
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="revise">取消</button>
                        <button type="button" class="btn btn-primary" @click="add_notice">添加</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import DatePicker from '../datePicker.vue'
    import Status from '../status.vue';
    export default{
        components: {
            Status, DatePicker
        },
        props: ['remindId'],

        data(){
            return {
                isAdvanced: false,
                remindTimes: '',        //提醒时间
                remindTime: '',         //提醒时间 高级
                remind_info: '',        //提醒内容
                remind_select: [],      //提醒小时
//                dateConfigure: [
//                    {
//                        range: false,               // 是否选择范围
//                        needHour: true,             // 是否需要选择小时
//                        position: 'bottom-left'     // 在上面显示
//                    }
//                ],
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
                dateConfigure : [
                    {
                        range : false,
                        needHour : true,
                    }
                ],
            }
        },

        updated (){
            this.remind_time();
        },

        mounted (){
            this.$http.get('message/message/dict').then((res) => {
                this.remind_select = res.data.time;
            });
        },

        methods: {
            times (val){
                this.remindTimes = val;
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
//            选择时间
            remind_time (){
                $('.remind_datetime').datetimepicker({
                    minView: "day",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:00',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: this.IsPC()?'bottom-left':'top-right',
                }).on('changeDate', function (ev) {
                    this.remindTime = ev.target.value;
                }.bind(this));
            },
//            取消
            revise (){
                this.remindTimes = '';        //提醒时间
                this.remindTime = '';         //提醒时间 高级
                this.remind_info = '';        //提醒内容
                this.isAdvanced = false;
            },
            Advanced(){
                this.isAdvanced = !this.isAdvanced;
            },
//            日期组件
            getDate (val){
                this.remindTime = val;
            },
//            增加个人提示信息
            add_notice (){
                if (this.remindTimes !== '') {
                    this.remindTime = '';
                }
                this.$http.post('message/remind/write', {
                    content: this.remind_info,
                    remind_time: this.remindTimes,
                    remind_times: this.remindTime
                }).then((res) => {
                    if (res.data.code === '100018') {
                        $('#addRemind').modal('hide');
                        this.$emit('add_seccess');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;

                        this.remindTimes = '';        //提醒时间
                        this.remindTime = '';         //提醒时间 高级
                        this.remind_info = '';        //提醒内容
                        this.isAdvanced = false;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
        }
    }
</script>