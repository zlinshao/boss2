<template>
    <div>
        <div class="modal fade " id="remindDaily" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!--新增-->
                    <div v-if="daily_state" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">增加日志</h4>
                    </div>

                    <!--修改-->
                    <div v-if="inter_state" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">增加提醒</h4>
                    </div>

                    <!--放入客户池-->
                    <div v-if="pool" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">放入客户池</h4>
                    </div>

                    <!--客户派发-->
                    <div v-if="distribute_state" class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">客户派发</h4>
                    </div>

                    <!--放入客户池-->
                    <div v-if="pool" class="modal-body">
                        <h4>确定放入客户池吗？</h4>
                    </div>

                    <!--客户派发-->
                    <div v-if="distribute_state" class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled :value="cus_distribute">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">派发对象</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" placeholder="请输入姓名">
                                </div>
                            </div>
                        </form>
                    </div>

                    <!--新增/编辑-->
                    <div v-if="daily_state" class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <textarea class="form-control"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!--新增中介-->
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
                                <label class="col-lg-2 col-sm-2 control-label"></label>
                                <div class="col-lg-10">
                                    <div class="form-group street">
                                        <div class="col-sm-5">
                                            <input type="text" class="form-control" placeholder="日期">
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" placeholder="时间">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button class="btn btn-success" type="button"> 确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['state', 'cus_name'],
        data (){
            return {
                cus_distribute: '',
                daily_state: false,         //增加日志
                inter_state: false,         //提醒内容
                pool: false,                //放入客户池
                senior_a: false,            //高级选项
                distribute_state: false     //客户派发
            }
        },
        methods: {
            senior (){
                this.senior_a = !this.senior_a;
            }
        },
        watch: {
            cus_name (val){
                this.cus_distribute = this.cus_name.join(',');
            },
            state(val) {
                if (val === 'daily') {
                    this.daily_state = true;      //增加日志
                    this.inter_state = false;     //提醒内容
                    this.pool = false;            //放入客户池
                    this.distribute_state = false;//分配客户

                }
                if (val === 'inter') {
                    this.daily_state = false;       //增加日志
                    this.inter_state = true;        //提醒内容
                    this.pool = false;              //放入客户池
                    this.distribute_state = false;  //分配客户
                }
                if (val === 'pool') {
                    this.daily_state = false;       //增加日志
                    this.inter_state = false;       //提醒内容
                    this.pool = true;               //放入客户池
                    this.distribute_state = false;  //分配客户
                }
                if (val === 'distribute') {
                    this.daily_state = false;       //增加日志
                    this.inter_state = false;       //提醒内容
                    this.pool = false;              //放入客户池
                    this.distribute_state = true;   //分配客户
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
