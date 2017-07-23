<template>
    <div>
        <div class="modal fade" id="checkRemind">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title">提醒内容</h5>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div v-for="info in remind_info">
                                    <div class="row">
                                        <h5 class="col-sm-2 text-right">
                                            <i class="fa fa-times-circle"
                                               @click="delete_remind(info.mess_id)"></i>
                                        </h5>
                                        <h5 class="col-sm-2">提醒内容:</h5>
                                        <h5 class="col-sm-7">{{info.data.content}}&nbsp; &nbsp;</h5>
                                    </div>
                                    <div class="row">
                                        <h5 class="col-sm-2 "></h5>
                                        <h5 class="col-sm-2">提醒时间:</h5>
                                        <h5 class="col-sm-7">{{info.remind_time}}&nbsp; &nbsp;</h5>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" v-if="false" @click="all_delete">删除</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    export default{
        props: ['msg'],
        data(){
            return {
                remind_info: [],
            }
        },
        watch: {
            msg (val){
                this.remind_info = val;
            }
        },
        methods: {
            all_delete (){

            },
            delete_remind (val){
                this.$http.post('message/remind/delete_remind', {
                    mess_id: val
                }).then((res) => {
                    this.$emit('delete_rem');
//                    console.log(res.data.code)
                });
            },
//            rem (){
//                this.$http.post('message/remind/index', {
//                    not_remind: '1'
//                }).then((res) => {
//                    this.remind_info = res.data.data.data;
//                });
//            }
        }
    }
</script>

<style scoped>
    .fa-times-circle {
        font-size: 20px;
        cursor: pointer;
    }
</style>