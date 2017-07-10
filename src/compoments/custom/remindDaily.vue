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
                    <div v-if="inter_state" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">增加提醒</h4>
                    </div>

                    <!--放入客户池-->
                    <div v-if="pool" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">放入客户池</h4>
                    </div>

                    <!--放入客户池-->
                    <div v-if="pool" class="modal-body">
                        <h4>确定放入客户池吗？</h4>
                    </div>

                    <!--新增日志-->
                    <div v-if="daily_state" class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!--新增提醒-->
                    <div v-if="inter_state" class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">提醒内容</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">提醒时间</label>
                                <div class="col-lg-10">
                                    <div class="form-group street">
                                        <div class="col-sm-3">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="control-label" @click="senior"><a
                                                    class=" text-primary">高级选项</a></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="senior_a">
                                <label class="col-lg-2 col-sm-2 control-label">提醒时间</label>
                                <div class="col-lg-10">
                                    <div class="form-group street">
                                        <div class="col-sm-6">
                                            <input @click="remindData" type="text"
                                                   class="form-control form_datetime" id="addtime"
                                                   name="addtime" value="" placeholder="请选择时间">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button class="btn btn-success" type="button" @click="confirm_ok"> 确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['state', 'msg'],
        data (){
            return {
                daily_state: false,         //增加日志
                inter_state: false,         //提醒内容
                pool: false,                //放入客户池
                senior_a: false,            //高级选项
                dataTime: '',               //提醒时间
                info:{
                    //成功状态 ***
                    state_success: false,
                    //成功信息 ***
                    success: '',
                }
            }
        },
        updated (){
//            时间选择
            this.remindData();
        },
        methods: {
//            确定
            confirm_ok (){
                if(this.pool === true){
                    this.$http.post('core/customer/putInPool',{
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
                if(this.inter_state === true){
                    alert(this.inter_state);
                }
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
                    this.inter_state = false;     //提醒内容
                    this.pool = false;            //放入客户池

                }
                if (val === 'inter') {
                    this.inter_state = true;        //提醒内容
                    this.daily_state = false;       //增加日志
                    this.pool = false;              //放入客户池
                }
                if (val === 'pool') {
                    this.pool = true;               //放入客户池
                    this.daily_state = false;       //增加日志
                    this.inter_state = false;       //提醒内容
                }
                if (val === 'distribute') {
                    this.daily_state = false;       //增加日志
                    this.inter_state = false;       //提醒内容
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
