<template>
    <div>
        <!--日志/提醒/放入客户池-->
        <div class="modal fade " id="remindDaily" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!--新增日志-->
                    <div v-if="daily_state" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">增加日志</h4>
                    </div>

                    <!--增加提醒-->
                    <!--<div v-if="inter_state" class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>-->
                        <!--<h4 class="modal-title">增加提醒</h4>-->
                    <!--</div>-->

                    <!--放入客户池-->
                    <div v-if="pool" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">放入客户池</h4>
                    </div>

                    <!--放入客户池-->
                    <div v-if="pool" class="modal-body">
                        <h5>确定放入客户池吗？</h5>
                    </div>

                    <!--新增日志-->
                    <div v-if="daily_state" class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 col-sm-2 control-label">跟进方式</label>
                                <div class="col-sm-10" style="padding-left: 0;">
                                    <div class="col-sm-4">
                                        <select class="form-control" v-model="follow_w">
                                            <option v-for="(way,index) in select_list.follow_way" :value="index">
                                                {{way}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <textarea class="form-control" v-model="follow_up"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!--新增提醒-->
                    <!--<div v-if="inter_state" class="modal-body">-->
                        <!--<form class="form-horizontal" role="form">-->
                            <!--<div class="form-group">-->
                                <!--<label class="col-lg-2 col-sm-2 control-label">提醒内容</label>-->
                                <!--<div class="col-lg-10">-->
                                    <!--<textarea class="form-control"></textarea>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group">-->
                                <!--<label class="col-lg-2 col-sm-2 control-label">提醒时间</label>-->
                                <!--<div class="col-lg-10">-->
                                    <!--<div class="form-group street">-->
                                        <!--<div class="col-sm-3">-->
                                            <!--<select class="form-control">-->
                                                <!--<option value="1">1</option>-->
                                            <!--</select>-->
                                        <!--</div>-->
                                        <!--<div class="col-sm-3">-->
                                            <!--<label class="control-label" @click="senior"><a-->
                                                    <!--class=" text-primary">高级选项+</a></label>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group" v-if="senior_a">-->
                                <!--<label class="col-lg-2 col-sm-2 control-label">提醒时间</label>-->
                                <!--<div class="col-lg-10">-->
                                    <!--<div class="form-group street">-->
                                        <!--<div class="col-sm-6">-->
                                            <!--<input @click="remindData" type="text"-->
                                                   <!--class="form-control form_datetime" id="addtime"-->
                                                   <!--name="addtime" value="" placeholder="请选择时间" readonly>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</form>-->
                    <!--</div>-->
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button" @click="follow_up_take">取消
                        </button>
                        <button class="btn btn-success" type="button" @click="confirm_ok"> 确定</button>
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
        props: ['state', 'msg'],
        components: {Status},
        data (){
            return {
                select_list: {},            //字典

                daily_state: false,         //增加日志
                follow_w: '1',              //沟通日志类型
                follow_up: '',              //沟通日志内容
//                resetting: true,          //沟通日志内容

//                inter_state: false,       //提醒内容

                pool: false,                //放入客户池
                senior_a: false,            //高级选项
//                dataTime: '',             //提醒时间
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
        mounted (){
            this.$http.get('core/customer/dict').then((res) => {
                this.select_list = res.data;
            });
        },
        updated (){
            this.remindData();
        },
        methods: {
//            确定
            confirm_ok (){
                if (this.pool === true) {
                    this.$http.post('core/customer/putInPool', {
                        id: this.msg
                    }).then((res) => {
                        $('#remindDaily').modal('hide');
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.$emit('pitches');
                    });
                }
//                新增跟进记录
                if (this.daily_state === true) {
                    this.$http.post('core/customer_talk_log/savetalklog', {
                        follow_way: this.follow_w,
                        remarks: this.follow_up,
                        customer_id: String(this.msg),
                    }).then((res) => {
                        if (res.data.code === '70090') {
                            $('#remindDaily').modal('hide');
                            //成功信息 ***
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;

                            this.follow_up = '';
                            this.follow_w = '1';
                        } else {
                            //关闭成功信息(可选)
                            this.info.state_success = false;
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    });
                }
            },
            follow_up_take (){
//                取消跟进
                if (this.daily_state === true) {
                    this.follow_up = '';
                    this.follow_w = '1';
                }
            },
//            跟进方式
            follow_way_s (val){
                this.follow_w = val.target.value;
                this.$emit('pitches')
            },
//            时间选择
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "day",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:00',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    this.dataTime = ev.target.value;
                }.bind(this));
            },

//            高级选项
            senior (){
                this.senior_a = !this.senior_a;
            },
        },
        watch: {
            state(val) {
                if (val === 'daily') {
                    this.daily_state = true;      //增加日志
//                    this.inter_state = false;     //提醒内容
                    this.pool = false;            //放入客户池

                }
//                if (val === 'inter') {
//                    this.inter_state = true;        //提醒内容
//                    this.daily_state = false;       //增加日志
//                    this.pool = false;              //放入客户池
//                }
                if (val === 'pool') {
                    this.pool = true;               //放入客户池
                    this.daily_state = false;       //增加日志
//                    this.inter_state = false;       //提醒内容
                }
                if (val === 'distribute') {
                    this.daily_state = false;       //增加日志
//                    this.inter_state = false;       //提醒内容
                    this.pool = false;              //放入客户池
                }
            }
//                myResult(val){
//                    //xxcanghai 小小沧海 博客园
//                    this.$emit("on-result-change", val);//③组件内对myResult变更后向外部发送事件通知
//                }
        },

    }
</script>

<style scoped>

</style>
