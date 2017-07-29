<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="announceDetail">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" style="text-align: center">公告详情
                        </h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="row">
                                    <b class="col-sm-2 col-xs-5">标题：</b>
                                    <div class="col-sm-4 col-xs-6">
                                        {{msg.get_title}}
                                    </div>
                                    <b class="col-sm-2 col-xs-5">选择部门：</b>
                                    <div class="col-sm-4 col-xs-6">
                                        {{msg.get_department_name}}
                                    </div>
                                </div>
                                <div class="row">
                                    <b class="col-sm-2 col-xs-5">发布时间：</b>
                                    <div class="col-sm-4 col-xs-6">
                                        {{msg.get_create_time}}
                                    </div>
                                    <b class="col-sm-2 col-xs-5">发布人：</b>
                                    <div class="col-sm-4 col-xs-6">
                                        {{msg.get_release_name}}
                                    </div>
                                </div>
                                <hr>
                                <p>
                                    {{msg.get_content}}
                                </p>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="receive" class="btn btn-success" data-dismiss="modal">收到</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    export default {
        props: ['msg'],
        data(){
            return {}
        },
        methods: {
            receive (){
                if (this.msg.get_read === '未读') {
                    this.$http.post('message/message/read_mess', {
                        id: this.msg.get_id,
                    }).then((res) => {
                        this.$emit('receive');
                    });
                }
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .row {
        padding-bottom: 10px;
    }
</style>